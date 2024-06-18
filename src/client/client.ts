import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabaseUrl = "https://evwbjquvqcsypbwbdbfc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2d2JqcXV2cWNzeXBid2JkYmZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyMDM2MDYsImV4cCI6MjAzMzc3OTYwNn0.gcjTVyD_nuMfr4onRGV5LQcyDSMbIXIYitzSpqql9nY";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
