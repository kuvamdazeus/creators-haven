import SHA256 from "crypto-js/sha256";

export const generateRandomImageName = (file: File) => {
  return SHA256(
    `${file.name}-${file.size}-${Date.now()}-${Math.random()}`
  ).toString();
};

export const getImageDataUrl = (file: File) => {
  return new Promise<string>((resolve, _) => {
    const reader = new FileReader();
    reader.readAsDataURL(file as any);
    reader.onload = () => {
      resolve(reader.result as string);
    };
  });
};
