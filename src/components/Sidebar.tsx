import { useRouter } from "next/router";
import { FiHome, FiSearch, FiCompass, FiVideo } from "react-icons/fi";

export default function Sidebar() {
  const router = useRouter();

  if (router.asPath !== "/login")
    return (
      <div className="h-screen w-72 border border-gray-800 px-5 pt-5">
        <div className="mb-5 flex w-full cursor-pointer items-center rounded-full p-3 hover:bg-gray-900">
          <FiHome className="mr-4 text-2xl" />
          <p className="">Home</p>
        </div>

        <div className="mb-5 flex w-full cursor-pointer items-center rounded-full p-3 hover:bg-gray-900">
          <FiSearch className="mr-4 text-2xl" />
          <p className="">Search</p>
        </div>

        <div className="mb-5 flex w-full cursor-pointer items-center rounded-full p-3 hover:bg-gray-900">
          <FiCompass className="mr-4 text-2xl" />
          <p className="">Explore</p>
        </div>

        <div className="mb-5 flex w-full cursor-pointer items-center rounded-full p-3 hover:bg-gray-900">
          <FiVideo className="mr-4 text-2xl" />
          <p className="">Reels</p>
        </div>
      </div>
    );

  return null;
}
