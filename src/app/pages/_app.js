// pages/_app.js
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Auth({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Cargando...</p>;

  if (!session && router.pathname !== "/auth/login") {
    router.push("/auth/login");
    return null;
  }

  if (router.pathname === "/admin" && session?.user.role !== "admin") {
    router.push("/unauthorized");
    return null;
  }

  return children;
}

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}
