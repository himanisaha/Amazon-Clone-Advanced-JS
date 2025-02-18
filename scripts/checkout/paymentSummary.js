import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

// Function to render the payment summary
export function renderPaymentSummary() {
  // Initialize variables to store total prices
  let productsPrice = 0;
  let shippingPrice = 0;

  // Loop through each item in the cart to calculate total prices
  cart.forEach((cartItem) => {
    // Get the product details using the product ID
    const product = getProduct(cartItem.productId);

    // Calculate the total price for this product (price * quantity) and add to the total
    productsPrice += product.priceCents * cartItem.quantity;

    // Get the selected delivery option details using its ID
    const deliveryOptionPrice = getDeliveryOption(cartItem.deliveryOptionsId);

    // Add the delivery price to the total shipping cost
    shippingPrice += deliveryOptionPrice.priceCents;
  });

  // Calculate total cost before tax
  const totalBeforeTax = productsPrice + shippingPrice;

  // Calculate the estimated tax (assuming a 10% tax rate)
  const totalAfterTax = totalBeforeTax * 0.1;

  // Calculate the final total after adding tax
  const total = totalBeforeTax + totalAfterTax;

  // Create the payment summary HTML with calculated values
  const paymentSummaryHTML = `
    <div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$${formatCurrency(productsPrice)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingPrice)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(totalAfterTax)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(total)}</div>
    </div>

    <button class="place-order-button button-primary">
        Place your order
    </button>
  `;

  // Insert the generated payment summary HTML into the element with the class "js-payment-summary"
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}