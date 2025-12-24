// app/api/uploadthing/route.ts
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "@/server/uploadthing";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  // ixtiyoriy config qo‘shishingiz mumkin
});
