import SHA256 from "crypto-js/sha256";

export const generateUsername = (name: string) => {
  const salt = SHA256(Date.now().toString() + Math.random().toString())
    .toString()
    .slice(0, 6);

  return (
    name
      .toLowerCase()
      .replaceAll(/\s\s*/g, "_")
      .split("")
      .filter((c) => /[a-z0-9_]/.test(c))
      .join("") + salt
  );
};
