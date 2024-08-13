import { BaseEntity } from "@medusajs/medusa";
import { Column, Entity } from "typeorm";

@Entity() //이 클래스가 TypeORM의 엔티티임을 나타내는 데코레이터
export class OnboardingState extends BaseEntity {
  //클래스의 속성을 데이터베이스 테이블의 컬럼으로 매핑
  @Column({ nullable: true })
  current_step: string; //현재 단계의 상태

  @Column()
  is_complete: boolean;

  @Column({ nullable: true })
  product_id: string;
}
