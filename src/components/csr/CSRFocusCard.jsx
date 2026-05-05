import Image from "next/image";

export default function CSRFocusCard({ id, widgetId, title, img, text }) {
    return (
        <div className={`elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-${id} group`} data-id={id} data-element_type="column">
            <div className="elementor-widget-wrap elementor-element-populated">
                <div className={`elementor-element elementor-element-${widgetId} p-15 elementor-widget elementor-widget-thetrial_core_location_info`} data-id={widgetId} data-element_type="widget" data-widget_type="thetrial_core_location_info.default">
                    <div className="elementor-widget-container">
                        <div className="qodef-shortcode qodef-m qodef-location-info qodef-layout--text-below qodef-text-break--disabled">
                            <div className="qodef-m-image" style={{ position: 'relative' }}>
                                {/* White Connector Line Animation */}
                                <div className="qodef-location-info-line-animated" />
                                <Image src={img} alt={title} width={753} height={597} style={{ width: '100%', height: 'auto', display: 'block' }} />
                            </div>
                            <div className="qodef-m-content" style={{ backgroundColor: '#BC9C33' }}>
                                <h5 className="qodef-m-title" style={{ color: '#FFFFFF' }}>{title}</h5>
                                <p className="qodef-m-text" style={{ color: '#FFFFFF' }}>{text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}