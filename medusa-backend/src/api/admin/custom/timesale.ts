import { Router, Request, Response, NextFunction } from "express";
import TimeSaleService from "../../../services/timesale-service"; // TimeSale 비즈니스 로직 서비스 모듈

// 에러 핸들링 미들웨어
// 비동기 라우트 핸들러 감싸서, 에러 발생하면 next 함수 호출해 에러 핸들링
const handleAsync =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    // fn의 실행 결과를 Promise로 감쌈
    // Promise 체인에서 발생하는 모든 에러는 next 함수로 전달
    // Express는 next 함수에 인자가 전달되면 이를 에러로 인식하고, 에러 처리 미들웨어로
    Promise.resolve(fn(req, res, next)).catch(next); // 에러 next로 전달
  };

// TimeSale 관련 요청 처리하는 핸들러 정의
// 라우트 내에서 try-catch 하지 않도록
export default (router: Router) => {
  const route = Router(); // Router 인스턴스 생성
  router.use("/timesales", route); // timesales 경로로 라우트 설정

  // 새로운 타임 세일 생성
  route.post(
    "/",
    handleAsync(async (req: Request, res: Response) => {
      // 요청 객체에서 timeSaleService 가져옴
      const timeSaleService: TimeSaleService =
        req.scope.resolve("timeSaleService");
      // req.body에서 타임 세일 데이터 추출
      console.log("Raw request body:", req.body);
      const { title, start_date, end_date, is_active, discount_rate } =
        req.body;
      const timeSaleData = {
        title,
        start_date,
        end_date,
        is_active,
        discount_rate,
      };
      console.log("Parsed TimeSale data:", timeSaleData);

      // timeSaleService.create 메서드로 타임 세일 생성
      const created = await timeSaleService.create(timeSaleData);
      res.json(created);
    })
  );

  route.get(
    "/",
    handleAsync(async (req: Request, res: Response) => {
      const timeSaleService: TimeSaleService =
        req.scope.resolve("timeSaleService");
      const timeSales = await timeSaleService.list(); //모든 타임 세일을 가져와 JSON 형식으로 반환
      res.json(timeSales);
    })
  );

  // ID로 타임세일 업데이트
  route.put(
    "/:id",
    handleAsync(async (req: Request, res: Response) => {
      const timeSaleService: TimeSaleService =
        req.scope.resolve("timeSaleService");

      // req.params.id에서 타임 세일 ID 가져오고, req.body 데이터로 타임 세일 업데이트
      const updated = await timeSaleService.update(req.params.id, req.body);
      res.json(updated);
    })
  );

  // ID로 타임세일 삭제
  route.delete(
    "/:id",
    handleAsync(async (req: Request, res: Response) => {
      const timeSaleService: TimeSaleService =
        req.scope.resolve("timeSaleService");
      await timeSaleService.delete(req.params.id);
      res.status(204).send();
    })
  );

  // 활성화된 타임 세일 목록 조회
  route.get(
    "/active",
    handleAsync(async (req: Request, res: Response) => {
      const timeSaleService: TimeSaleService =
        req.scope.resolve("timeSaleService");
      const activeSales = await timeSaleService.listActiveSales();
      res.json(activeSales);
    })
  );

  // ID로 특정 타임세일 조회(검색)
  route.get(
    "/:id",
    handleAsync(async (req: Request, res: Response) => {
      const timeSaleService: TimeSaleService =
        req.scope.resolve("timeSaleService");
      const timeSale = await timeSaleService.retrieve(req.params.id);
      res.json(timeSale);
    })
  );

  // 최종 에러 처리 미들웨어
  route.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Unhandled error in timesale routes:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message }); // 클라이언트에 에러 메시지 반환
  });
};
