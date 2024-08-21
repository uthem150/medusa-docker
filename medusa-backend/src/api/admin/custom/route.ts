import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export async function GET(
  req: MedusaRequest, //MedusaRequest 타입의 req
  res: MedusaResponse //MedusaResponse 타입의 res
): Promise<void> {
  res.sendStatus(200);
}
