import { mkdir, writeFile } from "fs/promises";

export async function saveFile(file: any) {
  // Generate a random file name (you can use a UUID or any other method)
  const randomFileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}-${
    file.name
  }`;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const directoryPath = "public/files";
  const filePath = `${directoryPath}/${randomFileName}`;
  // Check if the directory exists, if not, create it
  await mkdir(directoryPath, { recursive: true });
  await writeFile(filePath, buffer);

  return filePath;
}
