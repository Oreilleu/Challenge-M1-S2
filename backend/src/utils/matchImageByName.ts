export const matchImageByName = (
  files: Express.Multer.File[],
  nameImage: string
) => {
  const match = files.find((file) => file.originalname === nameImage);

  if (!match) return { name: "", path: "" };

  return { name: match.originalname, path: match.path.replace("public", "") };
};
