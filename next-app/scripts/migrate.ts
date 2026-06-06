import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Or service role key if available
const supabase = createClient(supabaseUrl, supabaseKey);

// We need to import the data using require since it's TS, or we can just read the file.
// Since it's a TS file with ES modules, let's use dynamic import or ts-node.
import { poems } from '../src/data/dataPoem.ts';
import { musicPlaylist } from '../src/data/dataMusic.ts';

async function migrate() {
  console.log('Migrating poems...');
  for (const poem of poems) {
    const { error } = await supabase.from('poems').insert([{
      title: poem.title,
      preview: poem.preview,
      content: poem.content,
      insight: poem.insight,
      tags: poem.tags,
      date: poem.date
    }]);
    if (error) console.error('Error inserting poem:', error.message);
  }
  console.log(`Migrated ${poems.length} poems.`);

  console.log('Migrating music...');
  for (const track of musicPlaylist) {
    const { error } = await supabase.from('music_tracks').insert([{
      title: track.title,
      artist: track.artist,
      cover_url: track.cover,
      src_url: track.src,
      lyrics_url: track.lyrics
    }]);
    if (error) console.error('Error inserting track:', error.message);
  }
  console.log(`Migrated ${musicPlaylist.length} tracks.`);

  console.log('Migration complete!');
}

migrate();
