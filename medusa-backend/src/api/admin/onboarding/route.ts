import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm"; //데이터베이스 트랜잭션 관리하는 데 사용

// 온보딩 관련 로직 처리하는 서비스
import OnboardingService from "../../../services/onboarding";

// 온보딩 상태 조회
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  // OnboardingService의 인스턴스 가져옴
  const onboardingService: OnboardingService =
    req.scope.resolve("onboardingService");

  // 조회된 상태를 JSON 형식으로 클라이언트에게 응답
  const status = await onboardingService.retrieve();

  res.status(200).json({ status });
}

// 온보딩 상태 업데이트
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  // onboardingService와 manager(엔터티 매니저)를 요청 스코프에서 가져옴
  const onboardingService: OnboardingService =
    req.scope.resolve("onboardingService");
  const manager: EntityManager = req.scope.resolve("manager");

  // 데이터베이스 트랜잭션 시작
  const status = await manager.transaction(async (transactionManager) => {
    // 온보딩 상태 업데이트
    return await onboardingService
      .withTransaction(transactionManager)
      .update(req.body);
  });

  res.status(200).json({ status });
}
