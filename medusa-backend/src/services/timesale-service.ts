import { Lifetime } from "awilix";
import { TransactionBaseService } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import { TimeSale } from "../models/timesale";

// TimeSaleService 생성자에 주입되는 의존성들
type InjectedDependencies = {
  manager: EntityManager;
  timeSaleRepository: typeof TimeSale;
};

class TimeSaleService extends TransactionBaseService {
  static LIFE_TIME = Lifetime.SCOPED; // 요청마다 새로운 인스턴스 생성되도록 (요청 간의 데이터 충돌 방지)

  protected manager_: EntityManager;
  protected timeSaleRepository_: typeof TimeSale;

  // 인스턴스 초기화하는 메서드
  constructor(
    { manager, timeSaleRepository }: InjectedDependencies,
    options: Record<string, unknown>
  ) {
    // 부모 클래스(TransactionBaseService) 생성자 호출
    // @ts-ignore
    super(...arguments);

    this.manager_ = manager;
    this.timeSaleRepository_ = timeSaleRepository;
  }

  // 새로운 TimeSale 객체 생성하고 데이터베이스에 저장
  async create(data: Partial<TimeSale>): Promise<TimeSale> {
    return await this.atomicPhase_(async (manager) => {
      const timeSaleRepo = manager.getRepository(TimeSale);
      console.log("Creating TimeSale with data:", data);
      const timeSale = timeSaleRepo.create(data);
      console.log("TimeSale object before save:", timeSale);
      return await timeSaleRepo.save(timeSale);
    });
  }

  // 모든 TimeSale 항목 데이터베이스에서 조회하고 반환
  async list(): Promise<TimeSale[]> {
    const timeSaleRepo = this.manager_.getRepository(TimeSale);
    return await timeSaleRepo.find();
  }

  // 주어진 id에 해당하는 TimeSale 항목 조회
  async retrieve(id: string): Promise<TimeSale | undefined> {
    const timeSaleRepo = this.manager_.getRepository(TimeSale);
    return await timeSaleRepo.findOne({ where: { id } });
  }

  // 특정 id를 가진 TimeSale 항목, 주어진 데이터로 업데이트
  async update(id: string, data: Partial<TimeSale>): Promise<TimeSale> {
    return await this.atomicPhase_(async (manager) => {
      const timeSaleRepo = manager.getRepository(TimeSale);
      const timeSale = await timeSaleRepo.findOne({ where: { id } });

      if (!timeSale) {
        throw new Error(`TimeSale with id ${id} not found`);
      }

      Object.assign(timeSale, data);
      return await timeSaleRepo.save(timeSale);
    });
  }

  // 특정 id를 가진 TimeSale 항목 삭제
  async delete(id: string): Promise<void> {
    return await this.atomicPhase_(async (manager) => {
      const timeSaleRepo = manager.getRepository(TimeSale);
      const timeSale = await timeSaleRepo.findOne({ where: { id } });

      if (!timeSale) {
        throw new Error(`TimeSale with id ${id} not found`);
      }

      await timeSaleRepo.remove(timeSale);
    });
  }

  // is_active가 true인 활성화된 TimeSale 항목들만 조회
  async listActiveSales(): Promise<TimeSale[]> {
    const timeSaleRepo = this.manager_.getRepository(TimeSale);
    return await timeSaleRepo.find({ where: { is_active: true } });
  }
}

export default TimeSaleService;
