import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 1. Initialize the Supabase client for Middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    },
  );

  // 2. Check if the user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();

  // 3. LOGIC: If logged in and trying to go to LOGIN, send to DASHBOARD
  if (user && url.pathname === "/login") {
    const pkg = url.searchParams.get("package") || "standard";
    url.pathname = "/dashboard";
    url.searchParams.set("package", pkg);
    return NextResponse.redirect(url);
  }

  // 4. LOGIC: If NOT logged in and trying to go to DASHBOARD, send to LOGIN
  if (
    !user &&
    (url.pathname.startsWith("/dashboard") || url.pathname.startsWith("/order"))
  ) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return response;
}

// 5. This tells Next.js which pages to trigger this code on
export const config = {
  matcher: ["/login", "/dashboard", "/order"],
};
