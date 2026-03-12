import { createClient } from "@supabase/supabase-js";

export async function GET() {

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data, error } = await supabase
    .from("contacts")
    .update({ status: "inactive" })
    .lt("last_contacted", "2025-01-01");

  return Response.json({ success: true });
}