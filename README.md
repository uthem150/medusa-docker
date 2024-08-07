# MedusaJS Project

어플리케이션 실행을 위한 구성
* node >= 16.x.x 설치
* Docker Desktop
* git

<br>

프로젝트 구성
* Medusa 백엔드 + 관리 포털
* Next.js 스토어프론트

<br>

## 시작하기

1. 루트 디렉토리에서 Docker 명령어로, PostgreSQL 컨테이너 생성 및 실행
    ```
    docker-compose up --build -d
    ```

2. medusa-backend 폴더로 이동하고 종속성 설치
    ```
    npm i
    ```

3. medusa-storefront 폴더로 이동하고 종속성 설치
    ```
    npm i
    ```

4. 동시에, 프론트와 백엔드를 실행시키고 싶다면, 루트 폴더로 이동하고 명령어 실행
    ```
    npm i
    npm run start
    ```
<br>

---
## medusa 처음부터 시작하는 법
1. 루트 디렉토리에 Docker Compose 파일 작성
   
3. Docker 명령어로, PostgreSQL 컨테이너 생성 및 실행
    ```
    docker-compose up --build -d
    ```
4. Medusa 프로젝트 생성(front & back)
    ```
    npx create-medusa-app@latest --seed --db-url postgres://yourusername:yourpassword@localhost:5432/medusa_db
    ```
---
## 공식 문서
* [MedusaJS 웹사이트](https://medusajs.com/)
* [MedusaJS 설정 가이드](https://docs.medusajs.com/create-medusa-app)
