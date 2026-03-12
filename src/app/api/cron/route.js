import { createClient } from "@supabase/supabase-js";

export async function GET(request) {

  // 🔐 Protect the cron endpoint
  const auth = request.headers.get("authorization");

  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    console.log("Cron started");

    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .limit(5);

    if (error) throw error;

    console.log("Cron finished");

    return Response.json({
      success: true,
      data
    });

  } catch (err) {

    console.error("Cron error:", err);

    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}