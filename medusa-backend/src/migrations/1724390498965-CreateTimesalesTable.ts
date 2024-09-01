import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTimesalesTable1724390498965 implements MigrationInterface {
  name = "CreateTimesalesTable1724390498965";

  // time_sales 테이블 생성하는 작업
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "time_sales" (
        "id" uuid DEFAULT uuid_generate_v4() NOT NULL, 
        "title" character varying NOT NULL,
        "start_date" TIMESTAMP NOT NULL,
        "end_date" TIMESTAMP NOT NULL,
        "is_active" boolean NOT NULL DEFAULT true,
        "discount_rate" decimal(5, 2) NOT NULL DEFAULT 0.0,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_d3bfbca1eb84246e4f56e517fb8" PRIMARY KEY ("id")
      )
    `);
  }

  // up 메서드에서 수행한 작업을 되돌리는 작업
  public async down(queryRunner: QueryRunner): Promise<void> {
    // time_sales 테이블 삭제
    await queryRunner.query(`DROP TABLE "time_sales"`);
  }
}
