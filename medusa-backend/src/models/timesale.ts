import { Entity, PrimaryColumn, Column, BeforeInsert } from "typeorm";
import { v4 as uuidv4 } from "uuid";

// time_sales 테이블과 매핑되는 TimeSale 엔티티 정의
@Entity("time_sales")
export class TimeSale {
  @PrimaryColumn("uuid") // 기본 키임을 나타냄
  id: string;

  @BeforeInsert() //이 메서드가 데이터베이스에 레코드를 삽입하기 전에 호출됨을 나타냄
  createId() {
    this.id = uuidv4();
  }

  @Column()
  title: string;

  @Column({ type: "timestamp" })
  start_date: Date;

  @Column({ type: "timestamp" })
  end_date: Date;

  @Column({ default: true })
  is_active: boolean;

  // 최대 5자리 숫자, 소수점 이하 2자리까지 저장
  @Column("decimal", { precision: 5, scale: 2, default: 0 })
  discount_rate: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
}
