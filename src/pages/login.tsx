import { Button, Input, Link } from "@nextui-org/react";

export default function LoginPage() {
  return (
    <div className="flex w-full items-center justify-center border border-blue-500">
      <div className="w-96 rounded-lg border p-5">
        <p className="mb-5 text-2xl">Login</p>

        <Input fullWidth bordered placeholder="Username" className="mb-3" />
        <Input fullWidth bordered placeholder="Password" className="mb-5" />

        <center>
          <Button className="mb-5 bg-blue-500">Submit</Button>
        </center>

        <center>
          <Link className="text-xs" href="/register">
            Don't have an account? Sign up here
          </Link>
        </center>
      </div>
    </div>
  );
}
