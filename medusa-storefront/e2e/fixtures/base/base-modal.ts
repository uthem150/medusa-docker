import { Page, Locator } from "@playwright/test"

// 모달 창 관련된 동작 정의
export class BaseModal {
  page: Page
  container: Locator
  closeButton: Locator

  constructor(page: Page, container: Locator) {
    this.page = page
    this.container = container
    this.closeButton = this.container.getByTestId("close-modal-button")
  }

  // 모달 창을 닫는 동작 수행
  async close() {
    const button = this.container.getByTestId("close-modal-button")
    await button.click()
  }

  // 모달 창 열려 있는지 여부  확인
  async isOpen() {
    return await this.container.isVisible()
  }
}
