-- CSR Gallery Table
CREATE TABLE IF NOT EXISTS csr_gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CSR Ongoing Programs Table
CREATE TABLE IF NOT EXISTS csr_ongoing_programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CSR Initiatives Table
CREATE TABLE IF NOT EXISTS csr_initiatives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE csr_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE csr_ongoing_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE csr_initiatives ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view csr_gallery" ON csr_gallery FOR SELECT USING (true);
CREATE POLICY "Public can view csr_ongoing_programs" ON csr_ongoing_programs FOR SELECT USING (true);
CREATE POLICY "Public can view csr_initiatives" ON csr_initiatives FOR SELECT USING (true);

-- Create policies for admin full access (assuming authenticated users are admins)
CREATE POLICY "Admins can manage csr_gallery" ON csr_gallery USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage csr_ongoing_programs" ON csr_ongoing_programs USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage csr_initiatives" ON csr_initiatives USING (auth.role() = 'authenticated');

-- Insert initial data for Ongoing Programs
INSERT INTO csr_ongoing_programs (description, display_order) VALUES
('Training and improving teacher’s teaching capacity in Sansat village, Sanggau (on-site training start in August, req photo to Saka Guru)', 1),
('Collaborating with DoctorShare to provide medical treatment for 20 children with club foot (photo requested to doctor share)', 2),
('Supporting and or/ providing scholarship for 6 undergraduate students', 3),
('Continuing collaboration with Solar Chapter in constructing clean water facilities in 2 villages in NTT with Solar Chapter', 4),
('Supporting online classes for elementary school children in 6 villages in Asmat, Papua', 5),
('Supporting Federasi Kempo Indonesia program', 6);

-- Insert initial data for Initiatives
INSERT INTO csr_initiatives (title, content_json, display_order) VALUES
('Education', '[
    {
        "items": [
            "Pilot project with holistic approach to improve teacher capacity and student readiness to learn in SDN 08 Mentawak, Sanggau with Saka Guru Pratama",
            {
                "text": "Building, renovating, and providing school facilities for:",
                "subItems": [
                    "North Sumatera: Sekolah Mitra Inalum",
                    "Jakarta: Down Syndrome & Deaf School of Cempaka Putih",
                    "Jakarta: School of Yayasan Penyandang Anak Cacat",
                    "Fujian: Primary, Secondary School, Sport and Library in Normal University",
                    "Bogor: SD Sinar Kasih",
                    "Kupang: PAUD Berkat Tuamnanu",
                    "Sanggau: SDN 08 Mentawak"
                ]
            },
            "Providing over 300 university scholarships per year",
            "Supporting online classes to reach students and children in frontier area",
            "Providing laptop to SMP Adulam in collaboration with PINTU",
            "Train and equip teachers with improved teaching skills",
            "Supporting Program Pendidikan Kesetaraan Paket C"
        ]
    }
]'::jsonb, 1),
('Healthcare', '[
    {
        "subtitle": "Pandemic",
        "items": [
            "Distributing more than 200 ventilators and ten thousands of PPE to 60 hospitals across Indonesia",
            "Distributing food aid to people affected by COVID in 5 provinces in Indonesia",
            "Supporting Covid Vaccination"
        ]
    },
    {
        "subtitle": "Natural Disaster",
        "items": [
            "Rebuilding healthcare facilities and hospitals",
            "Donating food and other resources to victims of natural disasters, such as the volcanic eruption at Mount Merapi, Mentawai, the landslide at Puncak and the floods in Jakarta and Meliau "
        ]
    },
    {
        "subtitle": "Medical Support",
        "items": [
            "Collaboration to provide medical treatment for club-footed children with DoctorShare",
            "Distributing 29 ventilators to 14 hospital to support their ICU capacity",
            "Donating speedboat ambulances in West Kalimantan",
            "Providing ambulances for DKI Jakarta Region, in partnership with Red Cross Indonesia"
        ]
    }
]'::jsonb, 2),
('Social & Environment', '[
    {
        "subtitle": "Environment",
        "items": [
            "Constructing clean water facilities in remote areas with Solar Chapter",
            "Sponsoring Indonesia Climate Change Forum 2025",
            "Creating and maintaining roads and open road access in some districts in Indonesia",
            "Collaborating with Yayasan Kebun Raya Indonesia in the conservation of endangered and rare botanical species in Kebun Raya Cibodas and Kebun Raya Bedugul, Bali",
            "Planting 1,000 trees in West Kalimantan Deforestation Areas"
        ]
    },
    {
        "subtitle": "Social Outreach",
        "items": [
            "Supporting Indonesia sport development through Federasi Kempo Indonesia and sponsoring sport events (IFSC Climbing World Cup 2022)",
            "Holding charitable concerts in partnership with foreign embassies to gather donations for disaster victims",
            "Contributed to the construction of a mosque in Ciloto-Puncak as well as renovation of local churches and temples",
            "Supporting Indonesia sport development through Federasi Kempo Indonesia and sponsoring sport events (IFSC Climbing World Cup 2022)"
        ]
    }
]'::jsonb, 3);

-- Insert initial data for Gallery
INSERT INTO csr_gallery (image_url, display_order) VALUES
('/csr/gallery/Gallery 1_WVI PAUD.webp', 1),
('/csr/gallery/Gallery 2_water for nansean.webp', 2),
('/csr/gallery/Gallery 4_SD Mentawak.webp', 3),
('/csr/gallery/Gallery 5_SD Mentawak.webp', 4),
('/csr/gallery/Gallery 12_Laptop untuk sekolah Adulam.webp', 5),
('/csr/gallery/Gallery 14_RS Cakra Medika, Cepu.webp', 6),
('/csr/gallery/Gallery 15_RS Wisma Prashanti, Bali.webp', 7),
('/csr/gallery/Gallery 16_RS Cakra Husada Klaten.webp', 8),
('/csr/gallery/Gallery 17_SMTK Setia.webp', 9),
('/csr/gallery/Gallery 18_Ragats.webp', 10),
('/csr/gallery/gallery1.webp', 11),
('/csr/gallery/gallery2.webp', 12),
('/csr/gallery/gallery3.webp', 13),
('/csr/gallery/gallery4.webp', 14),
('/csr/gallery/gallery5.webp', 15),
('/csr/gallery/gallery6.webp', 16),
('/csr/gallery/gallery7.webp', 17),
('/csr/gallery/gallery8.webp', 18),
('/csr/gallery/gallery9.webp', 19),
('/csr/gallery/gallery10.webp', 20),
('/csr/gallery/gallery11.webp', 21),
('/csr/gallery/gallery12.webp', 22),
('/csr/gallery/gallery13.webp', 23),
('/csr/gallery/gallery14.webp', 24),
('/csr/gallery/gallery15.webp', 25),
('/csr/gallery/gallery17.webp', 26),
('/csr/gallery/gallery18.webp', 27),
('/csr/gallery/gallery19.webp', 28),
('/csr/gallery/gallery20.webp', 29);

