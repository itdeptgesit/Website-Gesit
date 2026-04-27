const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function checkNewsVideos() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data, error } = await supabase.from('news').select('*');
    if (error) {
        console.error('Error:', error);
    } else {
        data.forEach(item => {
            console.log(`ID: ${item.id}, Title: ${item.title}`);
            console.log(`  video_url: "${item.video_url}"`);
            console.log(`  video: "${item.video}"`);
            console.log('---');
        });
    }
}

checkNewsVideos();
