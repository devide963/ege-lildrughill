import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = "https://qnetwzsigictprqtfmvg.supabase.co"
const SUPABASE_ANON_KEY = "sb_publishable_TNmKlRAiWOHcKkgzkpN85A_pHuziSHZ "

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
