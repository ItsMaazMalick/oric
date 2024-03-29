import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" });

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
    pdf: { maxFileSize: "2MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ metadata, file }) => {
    return file;
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

// export const ourFileRouter = {
//   imageUploader: f({ image: { maxFileSize: "4MB" } })
//     // .middleware(async ({ req }) => {
//     //   const user = await auth(req);
//     //   if (!user) throw new UploadThingError("Unauthorized");
//     //   return { userId: user.id };
//     // })
//     .onUploadComplete(async ({ metadata, file }) => {
//       return "File Uploaded";
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;
