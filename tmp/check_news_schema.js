const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://bbntlrtozsdqvelsxlhz.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJibnRscnRvenNkcXZlbHN4bGh6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzAxMzY1OCwiZXhwIjoyMDkyNTg5NjU4fQ.ysU88XINQ-XfHDY9lRgI75rozL0xSa6IR6ESyKOlknY';

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function check() {
    try {
        const { data, error } = await supabase.from('news').select('*').limit(1);
        if (error) {
            console.error("Error:", error.message);
        } else {
            console.log("Columns:", Object.keys(data[0] || {}));
        }
    } catch (err) {
        console.error("Exception:", err);
    }
}

check();
