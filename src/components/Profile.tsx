import ReactMarkdown from "react-markdown";
import ProfileLinkIcon from "./ProfileLinkIcon";
import { User } from "@prisma/client";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
  user: User;
}

export default function Profile({ user }: Props) {
  const router = useRouter();

  const isViewing = router.pathname === "/[username]";

  return (
    <div className="relative h-1/2 w-full">
      <img src={user.coverImageUrl} className="h-full w-full object-cover" />
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-white" />
      <div className="absolute z-50 -mt-48 flex items-center px-12">
        <img
          src={user.profileImageUrl}
          className="mr-10 h-56 w-56 overflow-hidden rounded-full object-cover"
        />

        <div>
          <p className="mb-1 text-[56px] font-bold leading-none">{user.name}</p>

          <p className="mb-3 text-xl">{user.tagline}</p>

          <div className="flex flex-wrap items-center">
            {Object.entries(user.profileLinks as { [key: string]: any }).map(
              ([icon, href]) =>
                href && <ProfileLinkIcon icon={icon as any} href={href} />
            )}
          </div>
        </div>
      </div>

      <div className="mt-20 overflow-x-clip px-5 pb-10">
        {isViewing && (
          <div className="">
            <Link href={router.asPath + "/ongoing"}>Ongoing Projects</Link>
            <Link href={router.asPath + "/upcoming"}>Upcoming Projects</Link>
            <Link href={router.asPath + "/ideas"}>Ideas</Link>
          </div>
        )}

        <ReactMarkdown className="markdown">{user.bio}</ReactMarkdown>
      </div>
    </div>
  );
}
