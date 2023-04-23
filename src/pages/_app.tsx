import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Sidebar from "~/components/Sidebar";
import { NextUIProvider } from "@nextui-org/react";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <NextUIProvider>
      <section className="flex h-screen">
        <Sidebar />

        <Component {...pageProps} />
      </section>
    </NextUIProvider>
  );
};

export default api.withTRPC(MyApp);
