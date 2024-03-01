import { auth } from "./auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  console.log(`User is logged in: ${isLoggedIn}`);
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}