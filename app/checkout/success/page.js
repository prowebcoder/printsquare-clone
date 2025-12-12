// app/checkout/success/page.js
import { Suspense } from "react";
import CheckoutSuccessContent from "../success-content";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
