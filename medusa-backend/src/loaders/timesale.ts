import { AwilixContainer } from "awilix"; // 의존성 주입 라이브러리
import { asClass, asValue } from "awilix";
import TimeSaleService from "../services/timesale-service";
import TimeSaleRepository from "../repositories/timesale";

export default async (
  container: AwilixContainer,
  config: Record<string, unknown>
): Promise<void> => {
  try {
    // TimeSaleService, TimeSaleRepository를 container에 등록
    container.register({
      timeSaleService: asClass(TimeSaleService).singleton(), // 클래스를 컨테이너에 싱글톤으로 등록 (서비스 요청할 때마다 동일한 인스턴스 반환)
      timeSaleRepository: asValue(TimeSaleRepository), // 특정 값 컨테이너에 등록
    });
    console.log(
      "TimeSaleService and TimeSaleRepository have been registered successfully."
    );
  } catch (error) {
    console.error("Failed to register TimeSale dependencies:", error);
    throw error;
  }
};
