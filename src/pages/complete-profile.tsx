import { Button, Input, Popover } from "@nextui-org/react";
import { useRef, useState } from "react";
import {
  FiDribbble,
  FiGithub,
  FiInstagram,
  FiLink2,
  FiLinkedin,
  FiTwitter,
  FiUpload,
} from "react-icons/fi";
import { FaBlogger } from "react-icons/fa";
import { profileSchema } from "~/schemas";
import { api } from "~/utils/api";
import { supabase } from "~/supabase";
import {
  generateRandomImageName,
  getImageDataUrl,
} from "~/server/utils/images";
import { useRouter } from "next/router";
import Profile from "~/components/Profile";
import { useUser } from "@clerk/nextjs";

export default function Register() {
  const { isSignedIn, user } = useUser();

  console.log(isSignedIn, user);

  const router = useRouter();

  const userMut = api.user.register.useMutation({
    onSuccess: () => {
      router.replace("/feed");
    },
  });

  const coverImageRef = useRef<HTMLInputElement>(null);
  const profileImageRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState(
    `# Introduction\n\nHello, I'm John Doe Jr. and I've been the Cheif Designer at my firm __D's Nuts__ for the past 5 years. I'm a big fan of React and Next.js and I'm currently working on a new project called __D's Sticks__.\n\n# Skills\n\n- React\n- Next.js\n- Figma\n- Adobe XD\n- Adobe Photoshop\n- Adobe Illustrator\n\n# Contact\n\n- Email: johnnydjr@example.com\n- Phone: 555-555-5555\n\n# Links\n\n- [Website](https://example.com)\n- [Twitter](https://twitter.com/example)\n- [LinkedIn](https://linkedin.com/in/example)\n- [GitHub](https://github.com/example)\n- [Dribbble](https://dribbble.com/example)\n- [Instagram](https://instagram.com/example)\n- [Blog](https://example.com/blog)`
  );
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileLinks, setProfileLinks] = useState({
    github: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    dribbble: "",
    blog: "",
    website: "",
  });

  const defaultCover =
    "https://images.unsplash.com/photo-1527066579998-dbbae57f45ce";
  const defaultProfile =
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&h=500";
  const defaultName = "Johnny D.";
  const defaultTagline = "Engineer, Developer, Designer";

  const handleCoverImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const file = e.target.files[0] as File;
    setCoverImage(file);
    setCoverImageUrl(await getImageDataUrl(file));
  };

  const handleProfileImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const file = e.target.files[0] as File;
    setProfileImage(file);
    setProfileImageUrl(await getImageDataUrl(file));
  };

  const saveProfile = async () => {
    const userData = {
      name,
      tagline,
      bio,
      coverImageUrl,
      profileImageUrl,
      profileLinks,
    };

    const userParsed = profileSchema.safeParse(userData);

    if (!userParsed.success) {
      return console.log(userParsed.error.formErrors.fieldErrors);
    }

    const imagesStorage = supabase.storage.from("media/images");

    if (!profileImage || !coverImage) return;

    const [profileImageUploadRes, coverImageUploadRes] = await Promise.all([
      imagesStorage.upload(generateRandomImageName(profileImage), profileImage),
      imagesStorage.upload(generateRandomImageName(coverImage), coverImage),
    ]);

    userMut.mutate({
      ...userData,

      coverImageUrl: imagesStorage.getPublicUrl(
        coverImageUploadRes?.data?.path as string
      ).data.publicUrl,

      profileImageUrl: imagesStorage.getPublicUrl(
        profileImageUploadRes?.data?.path as string
      ).data.publicUrl,
    });
  };

  return (
    <section className="flex h-screen w-full">
      <div className="disable-scrollbar flex w-1/3 flex-col overflow-y-scroll border-r">
        <div className="border-b p-5">
          <div
            onClick={() => coverImageRef.current?.click()}
            className="mb-5 flex cursor-pointer items-center justify-center rounded-lg border-2 border-black py-3"
          >
            <FiUpload className="mr-3" />
            <p>Upload cover image</p>
          </div>
          <input
            ref={coverImageRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleCoverImageUpload(e)}
          />

          <div
            onClick={() => profileImageRef.current?.click()}
            className="mb-5 flex cursor-pointer items-center justify-center rounded-lg border-2 border-black py-3"
          >
            <FiUpload className="mr-3" />
            <p>Upload profile image</p>
          </div>
          <input
            ref={profileImageRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleProfileImageUpload(e)}
          />

          <Input
            onChange={(e) => setName(e.target.value)}
            bordered
            placeholder="Name"
            fullWidth
            className="mb-5"
          />
          <Input
            onChange={(e) => setTagline(e.target.value)}
            bordered
            placeholder="Tagline"
            fullWidth
            className="mb-5"
          />
          <div className="flex flex-wrap items-center justify-center">
            <Popover>
              <Popover.Trigger>
                <div
                  style={{
                    backgroundColor: profileLinks.github
                      ? "rgb(34,197,94)"
                      : "black",
                  }}
                  className="m-1.5 cursor-pointer rounded-full p-2 transition-all duration-300 hover:opacity-50"
                >
                  <FiGithub className="text-white" />
                </div>
              </Popover.Trigger>

              <Popover.Content className="p-3">
                <p className="mb-2 text-sm font-semibold">
                  Enter Github username
                </p>
                <div className="flex items-center">
                  <Input
                    // value={profileLinks.github}
                    onChange={(e) =>
                      setProfileLinks((data) => ({
                        ...data,
                        github: e.target.value,
                      }))
                    }
                    bordered
                    borderWeight="light"
                    placeholder="johndoe.873"
                    autoFocus
                    className="mb-1"
                  />

                  {/* <FiCheck className="mb-1 ml-2 h-8 w-8 cursor-pointer rounded-lg bg-green-500 p-2 text-white transition-all duration-300 hover:opacity-80" /> */}
                </div>
                <p className="text-xs font-light text-gray-500">
                  e.g "johndoe.7836"
                </p>
              </Popover.Content>
            </Popover>

            <Popover>
              <Popover.Trigger>
                <div
                  style={{
                    backgroundColor: profileLinks.twitter
                      ? "rgb(34,197,94)"
                      : "black",
                  }}
                  className="m-1.5 cursor-pointer rounded-full p-2 transition-all duration-300 hover:opacity-50"
                >
                  <FiTwitter className="text-white" />
                </div>
              </Popover.Trigger>

              <Popover.Content className="p-3">
                <p className="mb-2 text-sm font-semibold">
                  Enter Twitter username
                </p>
                <div className="flex items-center">
                  <Input
                    value={profileLinks.twitter}
                    onChange={(e) =>
                      setProfileLinks((data) => ({
                        ...data,
                        twitter: e.target.value,
                      }))
                    }
                    bordered
                    borderWeight="light"
                    placeholder="johndoe.873"
                    autoFocus
                    className="mb-1"
                  />

                  {/* <FiCheck className="mb-1 ml-2 h-8 w-8 cursor-pointer rounded-lg bg-green-500 p-2 text-white transition-all duration-300 hover:opacity-80" /> */}
                </div>
                <p className="text-xs font-light text-gray-500">
                  e.g "johndoe.7836"
                </p>
              </Popover.Content>
            </Popover>

            <Popover>
              <Popover.Trigger>
                <div
                  style={{
                    backgroundColor: profileLinks.linkedin
                      ? "rgb(34,197,94)"
                      : "black",
                  }}
                  className="m-1.5 cursor-pointer rounded-full p-2 transition-all duration-300 hover:opacity-50"
                >
                  <FiLinkedin className="text-white" />
                </div>
              </Popover.Trigger>

              <Popover.Content className="p-3">
                <p className="mb-2 text-sm font-semibold">
                  Enter Linkedin username
                </p>
                <div className="flex items-center">
                  <Input
                    value={profileLinks.linkedin}
                    onChange={(e) =>
                      setProfileLinks((data) => ({
                        ...data,
                        linkedin: e.target.value,
                      }))
                    }
                    bordered
                    borderWeight="light"
                    placeholder="johndoe.873"
                    autoFocus
                    className="mb-1"
                  />

                  {/* <FiCheck className="mb-1 ml-2 h-8 w-8 cursor-pointer rounded-lg bg-green-500 p-2 text-white transition-all duration-300 hover:opacity-80" /> */}
                </div>
                <p className="text-xs font-light text-gray-500">
                  e.g "johndoe.7836"
                </p>
              </Popover.Content>
            </Popover>

            <Popover>
              <Popover.Trigger>
                <div
                  style={{
                    backgroundColor: profileLinks.instagram
                      ? "rgb(34,197,94)"
                      : "black",
                  }}
                  className="m-1.5 cursor-pointer rounded-full p-2 transition-all duration-300 hover:opacity-50"
                >
                  <FiInstagram className="text-white" />
                </div>
              </Popover.Trigger>

              <Popover.Content className="p-3">
                <p className="mb-2 text-sm font-semibold">
                  Enter Instagram username
                </p>
                <div className="flex items-center">
                  <Input
                    value={profileLinks.instagram}
                    onChange={(e) =>
                      setProfileLinks((data) => ({
                        ...data,
                        instagram: e.target.value,
                      }))
                    }
                    bordered
                    borderWeight="light"
                    placeholder="johndoe.873"
                    autoFocus
                    className="mb-1"
                  />

                  {/* <FiCheck className="mb-1 ml-2 h-8 w-8 cursor-pointer rounded-lg bg-green-500 p-2 text-white transition-all duration-300 hover:opacity-80" /> */}
                </div>
                <p className="text-xs font-light text-gray-500">
                  e.g "johndoe.7836"
                </p>
              </Popover.Content>
            </Popover>

            <Popover>
              <Popover.Trigger>
                <div
                  style={{
                    backgroundColor: profileLinks.dribbble
                      ? "rgb(34,197,94)"
                      : "black",
                  }}
                  className="m-1.5 cursor-pointer rounded-full p-2 transition-all duration-300 hover:opacity-50"
                >
                  <FiDribbble className="text-white" />
                </div>
              </Popover.Trigger>

              <Popover.Content className="p-3">
                <p className="mb-2 text-sm font-semibold">
                  Enter Dribbble username
                </p>
                <div className="flex items-center">
                  <Input
                    value={profileLinks.dribbble}
                    onChange={(e) =>
                      setProfileLinks((data) => ({
                        ...data,
                        dribbble: e.target.value,
                      }))
                    }
                    bordered
                    borderWeight="light"
                    placeholder="johndoe.873"
                    autoFocus
                    className="mb-1"
                  />

                  {/* <FiCheck className="mb-1 ml-2 h-8 w-8 cursor-pointer rounded-lg bg-green-500 p-2 text-white transition-all duration-300 hover:opacity-80" /> */}
                </div>
                <p className="text-xs font-light text-gray-500">
                  e.g "johndoe.7836"
                </p>
              </Popover.Content>
            </Popover>

            <Popover>
              <Popover.Trigger>
                <div
                  style={{
                    backgroundColor: profileLinks.blog
                      ? "rgb(34,197,94)"
                      : "black",
                  }}
                  className="m-1.5 cursor-pointer rounded-full p-2 transition-all duration-300 hover:opacity-50"
                >
                  <FaBlogger className="text-white" />
                </div>
              </Popover.Trigger>
              <Popover.Content className="p-3">
                <p className="mb-2 text-sm font-semibold">
                  Enter your blog link
                </p>
                <div className="flex items-center">
                  <Input
                    value={profileLinks.blog}
                    onChange={(e) =>
                      setProfileLinks((data) => ({
                        ...data,
                        blog: e.target.value,
                      }))
                    }
                    bordered
                    borderWeight="light"
                    placeholder="https://blog.johndoe.com"
                    autoFocus
                    className="mb-1"
                  />

                  {/* <FiCheck className="mb-1 ml-2 h-8 w-8 cursor-pointer rounded-lg bg-green-500 p-2 text-white transition-all duration-300 hover:opacity-80" /> */}
                </div>
                <p className="text-xs font-light text-gray-500">
                  e.g "https://blog.johndoe.com"
                </p>
              </Popover.Content>{" "}
            </Popover>

            <Popover>
              <Popover.Trigger>
                <div
                  style={{
                    backgroundColor: profileLinks.website
                      ? "rgb(34,197,94)"
                      : "black",
                  }}
                  className="m-1.5 cursor-pointer rounded-full p-2 transition-all duration-300 hover:opacity-50"
                >
                  <FiLink2 className="text-white" />
                </div>
              </Popover.Trigger>

              <Popover.Content className="p-3">
                <p className="mb-2 text-sm font-semibold">
                  Enter your website link
                </p>
                <div className="flex items-center">
                  <Input
                    value={profileLinks.website}
                    onChange={(e) =>
                      setProfileLinks((data) => ({
                        ...data,
                        website: e.target.value,
                      }))
                    }
                    bordered
                    borderWeight="light"
                    placeholder="https://johndoe.com"
                    autoFocus
                    className="mb-1"
                  />

                  {/* <FiCheck className="mb-1 ml-2 h-8 w-8 cursor-pointer rounded-lg bg-green-500 p-2 text-white transition-all duration-300 hover:opacity-80" /> */}
                </div>
                <p className="text-xs font-light text-gray-500">
                  e.g "https://johndoe.com"
                </p>
              </Popover.Content>
            </Popover>
          </div>
        </div>

        <div className="flex-grow">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="h-full w-full border-none bg-transparent p-3 font-mono font-medium text-gray-900 outline-none"
          />
        </div>

        <Button
          onClick={saveProfile}
          className="flex-shrink-0 rounded-none bg-green-500"
        >
          Save
        </Button>
      </div>

      <div className="w-2/3 overflow-y-scroll">
        <Profile
          user={{
            username: "",
            coverImageUrl: coverImageUrl || defaultCover,
            profileImageUrl: profileImageUrl || defaultProfile,
            name: name || defaultName,
            tagline: tagline || defaultTagline,
            profileLinks,
            bio,
          }}
        />
      </div>
    </section>
  );
}
