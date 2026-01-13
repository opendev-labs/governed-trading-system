import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/auth/signin",
    },
});

export const config = {
    matcher: [
        "/master/:path*",
        "/screeners/:path*",
        "/leo/:path*",
        "/google-sheets/:path*",
        "/discord/:path*",
    ],
};
