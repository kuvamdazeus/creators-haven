import { TRPCError } from "@trpc/server";
import { procedure } from "./trpc";

export const publicProcedure = procedure;

export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  if (!ctx.userId)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this endpoint.",
    });

  return next();
});
