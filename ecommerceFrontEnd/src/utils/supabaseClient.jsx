import { createClient } from "@supabase/supabase-js";

let url = "https://uugkbzzvnwurlxwcxwsy.supabase.co";
let key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1Z2tienp2bnd1cmx4d2N4d3N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2ODU2NjYsImV4cCI6MjEwMjI2MTY2Nn0.RHLxHSnww8v7QJx2wKwulcRFRRZqdbDl5zoVuCGFF3U";

const supabase = createClient(
    url,
    key
);

export default supabase;