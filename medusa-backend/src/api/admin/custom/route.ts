import { Router } from "express";
import timesaleRoutes from "./timesale";

export default (): Router => {
  const router = Router();

  // GET 요청이 /로 들어왔을 때 실행
  router.get("/", (req, res) => {
    res.json({ message: "Welcome to custom admin routes" });
  });

  // 타임 세일과 관련된 라우트, 현재 router 인스턴스에 추가
  timesaleRoutes(router);

  return router;
};
