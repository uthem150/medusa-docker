import { Metadata } from "next"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { LineItem } from "@medusajs/medusa"

import { enrichLineItems } from "@modules/cart/actions"
import Wrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { getCart } from "@lib/data"

// 브라우저 탭에 표시될 제목 지정
export const metadata: Metadata = {
  title: "Checkout",
}

const fetchCart = async () => {
  const cartId = cookies().get("_medusa_cart_id")?.value //쿠키에서 장바구니 ID를 가져옴

  //장바구니 ID가 없다면 notFound()를 호출하여 404 페이지를 반환
  if (!cartId) {
    return notFound()
  }

  //getCart 함수를 사용해 장바구니 데이터를 가져옴
  const cart = await getCart(cartId).then((cart) => cart)

  if (cart?.items.length) {
    //제품의 상세 정보, 세금 계산등 정보 추가
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id)
    cart.items = enrichedItems as LineItem[] //처리된 장바구니 데이터 반환
  }

  return cart
}

export default async function Checkout() {
  const cart = await fetchCart()

  if (!cart) {
    return notFound()
  }

  return (
    <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12">
      <Wrapper cart={cart}>
        <CheckoutForm />
      </Wrapper>
      <CheckoutSummary />
    </div>
  )
}
