import { z } from "zod";
import { profileSchema } from "~/schemas";
import { createTRPCRouter } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, publicProcedure } from "~/server/api/procedures";
import { clerkClient } from "@clerk/nextjs";
import { generateUsername } from "~/server/utils/strings";

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
  register: protectedProcedure
    .input(profileSchema)
    .mutation(async ({ ctx, input }) => {
      const { username } = await clerkClient.users.getUser(ctx.userId);
      const generatedUsername = generateUsername(input.name);

      console.log(username, "\n\n\n\n\n");

      if (!username) {
        await clerkClient.users.updateUser(ctx.userId, {
          username: generatedUsername,
        });
      }

      await ctx.prisma.user.create({
        data: {
          ...input,
          username: username || generatedUsername,
        },
        select: {
          username: true,
        },
      });
    }),
});
