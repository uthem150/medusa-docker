import { dataSource } from "@medusajs/medusa/dist/loaders/database"; // Medusa의 데이터베이스 연결 나타내는 객체
import { OnboardingState } from "../models/onboarding"; // 데이터베이스의 테이블 구조를 정의하는 엔티티 클래스

// dataSource 객체를 사용하여 OnboardingState 엔티티에 대한 레포지토리를 생성
const OnboardingRepository = dataSource.getRepository(OnboardingState);

export default OnboardingRepository;
