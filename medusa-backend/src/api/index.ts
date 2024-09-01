import { Router } from "express";
import customRoutes from "./admin/custom/route";
import bodyParser from "body-parser";

export default (
  rootDirectory: string,
  options: Record<string, unknown>
): Router | Router[] => {
  const router = Router();

  router.use(bodyParser.json()); // 들어오는 요청의 본문 JSON 형식으로 파싱
  router.use(bodyParser.urlencoded({ extended: true })); // 들어오는 요청의 본문 URL-encoded 형식으로 파싱

  // admin 라우트 추가
  router.use("/admin/custom", customRoutes());

  return router;
};
