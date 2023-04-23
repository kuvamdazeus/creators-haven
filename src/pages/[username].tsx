import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { User } from "@prisma/client";
import { prisma } from "~/server/db";
import Profile from "~/components/Profile";

interface Props {
  user: User;
}

export default function PersonalizedProfilePage({ user }: Props) {
  return (
    <section>
      <Profile user={user} />
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: {
      username: params?.username as string,
    },
  });

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
    },
  };
};
