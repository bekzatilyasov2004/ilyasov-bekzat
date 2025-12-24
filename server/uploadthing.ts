import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing({
  token: process.env.UPLOADTHING_TOKEN, // token server tarafda
});

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Fayl yuklandi:", file); // fileUrl to‘g‘ri
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
