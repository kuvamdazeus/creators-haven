import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Sidebar from "~/components/Sidebar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <section className="flex h-screen bg-black text-white">
      <Sidebar />

      <Component {...pageProps} />
    </section>
  );
};

export default api.withTRPC(MyApp);
