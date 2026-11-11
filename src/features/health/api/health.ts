import { z } from "zod";
import { http } from "@/lib/axios";

const healthSchema = z.object({ status: z.literal("ok") });

// GET /api/v1/health. Responses are validated, so a changed backend shape fails loudly here.
export async function getHealth() {
  const { data } = await http.get("/health");
  return healthSchema.parse(data);
}
