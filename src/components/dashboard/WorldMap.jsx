'use client';

import React, { useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Sphere,
  Graticule,
  ZoomableGroup
} from 'react-simple-maps';
import { Plus, Minus, Maximize } from 'lucide-react';

const geoUrl = "/world-map.json";

const WorldMap = ({ countries = [] }) => {
  const [mounted, setMounted] = useState(false);
  const [tooltip, setTooltip] = useState(null);
  const [position, setPosition] = useState({ coordinates: [20, 0], zoom: 1.2 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleReset = () => {
    setPosition({ coordinates: [20, 0], zoom: 1.2 });
  };

  const handleMoveEnd = (position) => {
    setPosition(position);
  };

  // Helper to get color based on visitor count
  const getCountryColor = (countryCode) => {
    const country = countries.find(c => c.country_code === countryCode);
    if (!country) return "#E2E8F0"; // Default light gray
    
    const count = country.visitor_count;
    if (count > 5000) return "#bc9c33"; // High - Gold
    if (count > 1000) return "#103065"; // Mid - Navy
    if (count > 100) return "#475569";  // Low Mid - Muted Navy
    return "#94A3B8";                   // Low - Gray
  };

  if (!mounted) return (
    <div className="w-full h-[500px] bg-[#f8fafc] rounded-3xl animate-pulse flex items-center justify-center border border-slate-200/60">
        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Generating Heatmap...</span>
    </div>
  );

  const markerMap = {
    'ID': [113.9213, -0.7893],
    'SG': [103.8198, 1.3521],
    'US': [-95.7129, 37.0902],
    'JP': [138.2529, 36.2048],
    'AU': [133.7751, -25.2744],
    'GB': [-3.4360, 55.3781],
    'DE': [10.4515, 51.1657],
    'FR': [2.2137, 46.2276],
    'CN': [104.1954, 35.8617],
    'IN': [78.9629, 20.5937],
    'DEV': [113.9213, -0.7893]
  };

  // Mapping numeric ISO IDs to our codes (Standard for world-atlas)
  const idToCode = {
    "360": "ID", "702": "SG", "840": "US", "392": "JP", "036": "AU",
    "826": "GB", "276": "DE", "250": "FR", "156": "CN", "356": "IN"
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Map Section */}
      <div className="w-full lg:w-2/3 h-[550px] bg-[#f8fafc] rounded-3xl overflow-hidden relative border border-slate-200/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
        {/* Color Legend */}
        <div className="absolute top-8 right-8 z-20 flex flex-col gap-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Density Indicator</div>
            <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-sm bg-[#bc9c33]"></div>
                <span className="text-[10px] font-bold text-slate-600">High Traffic</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-sm bg-[#103065]"></div>
                <span className="text-[10px] font-bold text-slate-600">Active Market</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-sm bg-[#94A3B8]"></div>
                <span className="text-[10px] font-bold text-slate-600">Emerging</span>
            </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-8 left-8 z-20 flex flex-col gap-2">
            <button onClick={handleZoomIn} className="w-11 h-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-[#103065] hover:bg-slate-50 shadow-sm transition-all active:scale-95">
                <Plus size={20} strokeWidth={2.5} />
            </button>
            <button onClick={handleZoomOut} className="w-11 h-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-[#103065] hover:bg-slate-50 shadow-sm transition-all active:scale-95">
                <Minus size={20} strokeWidth={2.5} />
            </button>
            <button onClick={handleReset} className="w-11 h-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-[#103065] hover:bg-slate-50 shadow-sm transition-all active:scale-95">
                <Maximize size={20} strokeWidth={2.5} />
            </button>
        </div>

        <ComposableMap
          projectionConfig={{ scale: 200 }}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
          >
            <Sphere stroke="#E2E8F0" strokeWidth={0.5} />
            <Graticule stroke="#E2E8F0" strokeWidth={0.5} opacity={0.3} />
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryCode = idToCode[geo.id] || idToCode[String(geo.id).padStart(3, '0')];
                  const fillColor = getCountryColor(countryCode);
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fillColor}
                      stroke="#FFFFFF"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none", transition: "fill 500ms" },
                        hover: { fill: "#CBD5E1", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
            
            {countries.map((c) => {
              const coords = markerMap[c.country_code];
              if (!coords) return null;
              
              return (
                <Marker 
                    key={`${c.country_code}-${c.country_name}`} 
                    coordinates={coords}
                    onMouseEnter={(e) => {
                        const markerRect = e.target.getBoundingClientRect();
                        const containerRect = e.target.closest('div').getBoundingClientRect();
                        setTooltip({
                            ...c,
                            x: markerRect.left - containerRect.left + markerRect.width / 2,
                            y: markerRect.top - containerRect.top
                        });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                >
                  <circle r={12} fill={c.visitor_count > 1000 ? "#bc9c33" : "#103065"} fillOpacity={0.2}>
                    <animate attributeName="r" from="6" to="24" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>
                  
                  <circle 
                    r={Math.min(12, 5 + c.visitor_count / 500)} 
                    fill={c.visitor_count > 1000 ? "#bc9c33" : "#103065"} 
                    stroke="white" 
                    strokeWidth={2}
                    className="cursor-pointer transition-all duration-300 hover:scale-125 shadow-2xl"
                  />
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>

        {tooltip && (
            <div className="absolute z-50 pointer-events-none -translate-x-1/2 -translate-y-full mb-4" style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}>
                <div className="bg-[#103065] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md">
                    <div className="text-[10px] font-bold text-[#bc9c33] uppercase tracking-widest mb-1">{tooltip.country_name}</div>
                    <div className="text-base font-bold">{tooltip.visitor_count.toLocaleString()} <span className="text-[10px] font-normal text-white/60">Visitors</span></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-[#103065] border-r border-b border-white/5"></div>
                </div>
            </div>
        )}

        <div className="absolute top-8 left-8">
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-200/50 shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-[#bc9c33] animate-pulse shadow-[0_0_10px_rgba(188,156,51,0.5)]"></div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#103065] uppercase tracking-[.15em] leading-none mb-1">Live Heatmap</span>
                <span className="text-[9px] text-slate-400 font-medium tracking-tight">Geographic Density Analysis</span>
              </div>
          </div>
        </div>
      </div>

      {/* Country List Section */}
      <div className="w-full lg:w-1/3 space-y-4">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-[.2em] mb-4 pl-2">Regional Ranking</div>
        <div className="divide-y divide-slate-100 bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
            {countries.map((c, i) => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-all group cursor-default">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-10 rounded-xl flex items-center justify-center border text-[10px] font-bold uppercase transition-all duration-300
                            ${c.visitor_count > 1000 ? 'bg-[#bc9c33] text-white border-[#bc9c33]' : 'bg-slate-50 text-slate-400 border-slate-100 group-hover:bg-[#103065] group-hover:text-white'}`}>
                            {c.country_code}
                        </div>
                        <div>
                            <div className="text-sm font-bold text-slate-800">{c.country_name}</div>
                            <div className="text-[10px] text-slate-400 font-medium">Market Share: {Math.round((c.visitor_count / countries.reduce((acc, curr) => acc + curr.visitor_count, 0)) * 100)}%</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-base font-bold text-[#103065]">{c.visitor_count.toLocaleString()}</div>
                        <div className="text-[9px] text-[#bc9c33] font-bold uppercase tracking-widest">Visitors</div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WorldMap;

