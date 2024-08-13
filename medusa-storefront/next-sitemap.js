const excludedPaths = ["/checkout", "/account/*"] //사이트맵, robots.txt에서 제외될 경로

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_VERCEL_URL, // 사이트 기본 URL 지정 (환경 변수 NEXT_PUBLIC_VERCEL_URL에서 가져옴)
  generateRobotsTxt: true, //프로젝트에서 자동으로 robots.txt 파일이 생성
  exclude: excludedPaths + ["/[sitemap]"], // 사이트맵 생성에서 제외할 경로 지정
  robotsTxtOptions: {
    // 검색 엔진 크롤러의 행동을 정의하는 규칙
    policies: [
      {
        userAgent: "*", //모든 사용자 에이전트(userAgent: "*")에 대해
        allow: "/", //사이트의 모든 경로("/") 허용
      },
      {
        userAgent: "*",
        disallow: excludedPaths, //excludedPaths에 정의된 경로들 (/checkout, /account/*)에 대한 접근 금지
      },
    ],
  },
}
