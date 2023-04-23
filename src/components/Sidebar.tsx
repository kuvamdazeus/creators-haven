import { useRouter } from "next/router";
import { FiHome, FiSearch, FiCompass } from "react-icons/fi";

export default function Sidebar() {
  const router = useRouter();

  const noSidebarRoutes = ["/login", "/register", "/", "/[username]"];

  if (!noSidebarRoutes.includes(router.pathname))
    return (
      <div className="flex h-screen flex-col items-center justify-center border border-gray-800 px-3">
        <div
          style={{ borderWidth: router.asPath === "/feed" ? 1 : 0 }}
          onClick={() => router.push("/feed")}
          className="mb-5 cursor-pointer rounded-full border-black p-3 transition-all duration-300 hover:bg-gray-100"
        >
          <FiHome className="text-2xl" />
        </div>

        <div
          style={{ borderWidth: router.asPath === "/search" ? 1 : 0 }}
          onClick={() => router.push("/search")}
          className="mb-5 cursor-pointer rounded-full border-black p-3 transition-all duration-300 hover:bg-gray-100"
        >
          <FiSearch className="text-2xl" />
        </div>

        <div
          style={{ borderWidth: router.asPath === "/discover" ? 1 : 0 }}
          onClick={() => router.push("/discover")}
          className="mb-5 cursor-pointer rounded-full border-black p-3 transition-all duration-300 hover:bg-gray-100"
        >
          <FiCompass className="text-2xl" />
        </div>
      </div>
    );

  return null;
}
