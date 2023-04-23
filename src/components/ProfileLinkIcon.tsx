import { Link } from "@nextui-org/react";
import { FaBlogger } from "react-icons/fa";
import {
  FiDribbble,
  FiGithub,
  FiInstagram,
  FiLink2,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";

interface Props {
  icon:
    | "github"
    | "twitter"
    | "linkedin"
    | "instagram"
    | "dribbble"
    | "blog"
    | "website";
  href: string;
}

export default function ProfileLinkIcon({ icon, href }: Props) {
  if (icon === "github")
    return (
      <Link
        className="m-1.5 rounded-full bg-black p-2"
        href={`https://github.com/${href}`}
      >
        <FiGithub className="text-white" />
      </Link>
    );

  if (icon === "twitter")
    return (
      <Link
        className="m-1.5 rounded-full bg-blue-400 p-2"
        href={`https://twitter.com/${href}`}
      >
        <FiTwitter className="text-white" />
      </Link>
    );

  if (icon === "instagram")
    return (
      <Link
        className="m-1.5 rounded-full bg-red-600 p-2"
        href={`https://instagram.com/${href}`}
      >
        <FiInstagram className="text-white" />
      </Link>
    );

  if (icon === "linkedin")
    return (
      <Link
        className="m-1.5 rounded-full bg-blue-600 p-2"
        href={`https://linkedin.com/in/${href}`}
      >
        <FiLinkedin className="text-white" />
      </Link>
    );

  if (icon === "dribbble")
    return (
      <Link
        className="m-1.5 rounded-full bg-pink-500 p-2"
        href={`https://dribbble.com/${href}`}
      >
        <FiDribbble className="text-white" />
      </Link>
    );

  if (icon === "blog")
    return (
      <Link className="m-1.5 rounded-full bg-red-400 p-2" href={href}>
        <FaBlogger className="text-white" />
      </Link>
    );

  if (icon === "website")
    return (
      <Link className="m-1.5 rounded-full bg-gray-500 p-2" href={href}>
        <FiLink2 className="text-white" />
      </Link>
    );

  return <></>;
}
