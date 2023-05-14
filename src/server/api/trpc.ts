import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "~/server/db";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

type CreateContextOptions = {
  req: CreateNextContextOptions["req"];
  res: CreateNextContextOptions["res"];
};

const createInnerTRPCContext = ({ req, res }: CreateContextOptions) => {
  const { userId } = getAuth(req);

  return {
    prisma,
    userId: userId as string,
    res,
    req,
  };
};

export const createTRPCContext = (_opts: CreateNextContextOptions) => {
  return createInnerTRPCContext({
    req: _opts.req,
    res: _opts.res,
  });
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const procedure = t.procedure;
export const middleware = t.middleware;
