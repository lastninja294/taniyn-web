import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.then((cookies) => cookies.get(name)?.value);
        },
      },
    }
  );

  try {
    const body = await request.json();
    const { social_link_id } = body;

    // Get user agent and IP from headers
    const user_agent = request.headers.get("user-agent") || "Unknown";
    const forwarded = request.headers.get("x-forwarded-for");
    const ip_address = forwarded
      ? forwarded.split(",")[0].trim()
      : request.headers.get("cf-connecting-ip") || "127.0.0.1";

    const { data, error } = await supabase
      .from("click_stats")
      .insert([{ social_link_id, user_agent, ip_address }])
      .select()
      .single();

    if (error) {
      console.error("Error tracking click:", error);
      return NextResponse.json(
        { error: "Failed to track click" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.then((cookies) => cookies.get(name)?.value);
        },
      },
    }
  );

  try {
    const { data: stats, error } = await supabase
      .from("click_stats")
      .select(
        `
        social_link_id,
        social_links!inner(title),
        clicked_at
      `
      )
      .order("clicked_at", { ascending: false });

    if (error) {
      console.error("Error fetching click stats:", error);
      return NextResponse.json(
        { error: "Failed to fetch click stats" },
        { status: 500 }
      );
    }

    // Group stats by social link
    const groupedStats = stats.reduce((acc: any, stat: any) => {
      const linkId = stat.social_link_id;
      if (!acc[linkId]) {
        acc[linkId] = {
          social_link_id: linkId,
          title: stat.social_links.title,
          total_clicks: 0,
          recent_clicks: [],
        };
      }
      acc[linkId].total_clicks++;
      acc[linkId].recent_clicks.push(stat.clicked_at);
      return acc;
    }, {});

    return NextResponse.json(Object.values(groupedStats));
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
