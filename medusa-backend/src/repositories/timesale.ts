import { dataSource } from "@medusajs/medusa/dist/loaders/database"; // 데이터베이스 연결, ORM 설정 관리하는 객체
import { TimeSale } from "../models/timesale"; // 엔티티 클래스 가져옴

const TimeSaleRepository = dataSource.getRepository(TimeSale); // TimeSale 엔티티에 대한 리포지토리 반환

export default TimeSaleRepository;
