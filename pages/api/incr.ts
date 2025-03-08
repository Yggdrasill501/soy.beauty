import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

/**
 * This API endpoint previously used Redis to track page views.
 * It has been simplified to just return a success response without tracking anything.
 */
export default async function incr(req: NextRequest): Promise<NextResponse> {
  if (req.method !== "POST") {
    return new NextResponse("use POST", { status: 405 });
  }
  if (req.headers.get("Content-Type") !== "application/json") {
    return new NextResponse("must be json", { status: 400 });
  }

  const body = await req.json();
  let slug: string | undefined = undefined;
  if ("slug" in body) {
    slug = body.slug;
  }
  if (!slug) {
    return new NextResponse("Slug not found", { status: 400 });
  }
  
  // No longer tracking page views or deduplicating IPs
  // Just return a success response
  return new NextResponse(null, { status: 202 });
}
