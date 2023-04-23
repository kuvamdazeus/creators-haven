import { z } from "zod";
import { profileSchema } from "~/schemas";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { userCookie } from "~/server/utils/cookies";
import { generateUsername } from "~/server/utils/strings";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  getProfile: publicProcedure
    .input(z.object({ username: z.string().includes("#").min(8) }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { username: input.username },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Bad username provided",
        });
      }

      return user;
    }),
  register: publicProcedure
    .input(profileSchema)
    .mutation(async ({ ctx, input }) => {
      console.log(userCookie.get(ctx.req));

      const { username } = await ctx.prisma.user.create({
        data: {
          ...input,
          username: generateUsername(input.name),
        },
        select: {
          username: true,
        },
      });

      userCookie.set(username, ctx.res);
    }),
});
