import { Locator, Page } from "@playwright/test"
import { BasePage } from "../base/base-page"

//BasePage 클래스 상속
export class LoginPage extends BasePage {
  container: Locator
  emailInput: Locator
  passwordInput: Locator
  signInButton: Locator
  registerButton: Locator
  errorMessage: Locator

  //constructor는 Page 객체를 인자로 받아 BasePage 클래스의 constructor에 전달
  constructor(page: Page) {
    super(page)
    // 각 요소는 페이지 내에서 data-testid 속성을 사용하여 식별
    this.container = page.getByTestId("login-page") // 로그인 페이지의 전체 컨테이너
    this.emailInput = this.container.getByTestId("email-input") // 이메일 입력 필드
    this.passwordInput = this.container.getByTestId("password-input")
    this.signInButton = this.container.getByTestId("sign-in-button")
    this.registerButton = this.container.getByTestId("register-button")
    this.errorMessage = this.container.getByTestId("login-error-message")
  }

  // 로그인 페이지로 이동하는 동작
  async goto() {
    await this.page.goto("/account")
    await this.container.waitFor({ state: "visible" })
  }
}
