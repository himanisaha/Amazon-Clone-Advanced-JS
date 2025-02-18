// Import necessary functions and data from different modules
import { cart, removeFromCart, updateDeliveryOptions } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";

// Import the dayjs library for date manipulation
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

// Import the function to render the payment summary
import { renderPaymentSummary } from "./paymentSummary.js";

// Import the function to format currency values
import { formatCurrency } from "../utils/money.js";

// Function to render the order summary
export function renderOrderSummary() {
  // Initialize an empty string to store HTML content for the cart summary
  let cartSummaryHTML = "";

  // Loop through each item in the cart
  cart.forEach((cartItem) => {
    // Get the product ID from the cart item
    let productId = cartItem.productId;

    // Find the corresponding product details using the product ID
    const matchingProduct = getProduct(productId);

    // Get the selected delivery option ID for the cart item
    const deliveryOptionId = cartItem.deliveryOptionsId;

    // Find the delivery option details using the delivery option ID
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    // Get the current date using dayjs
    const today = dayjs();

    // Calculate the delivery date by adding the number of delivery days
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");

    // Format the delivery date as "Day, Month Date" (e.g., "Monday, February 20")
    const dateString = deliveryDate.format("dddd, MMMM D");

    // Construct the HTML for each cart item
    cartSummaryHTML += `<div class="cart-item-container  js-order-summary js-cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                 <span data-product-id="${matchingProduct.id}" class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>`;
  });

  // Insert the generated cart summary HTML into the element with the class "js-order-summary"
  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  // Function to generate delivery options HTML
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";

    // Loop through each available delivery option
    deliveryOptions.forEach((deliveryOptions) => {
      // Get the current date
      const today = dayjs();

      // Calculate the estimated delivery date by adding delivery days
      const deliveryDate = today.add(deliveryOptions.deliveryDays, "days");

      // Format the delivery date
      const dateString = deliveryDate.format("dddd, MMMM D");

      // Determine the price display (free or formatted price)
      const priceString =
        deliveryOptions.priceCents === 0
          ? "FREE"
          : `₹${deliveryOptions.priceCents / 100}`;

      // Check if this delivery option is the selected one
      const isChecked = deliveryOptions.id === cartItem.deliveryOptionsId;

      // Append the HTML for this delivery option
      html += `
          <div class="delivery-option js-delivery-option" data-delivery-option-id="${deliveryOptions.id}"
            data-product-id="${matchingProduct.id}">
                        <input 
                          type="radio" 
                          ${isChecked ? "checked" : ""};
                          class="delivery-option-input"
                          name="delivery-option-${matchingProduct.id}">
                        <div>
                          <div class="delivery-option-date">
                            ${dateString}
                          </div>
                          <div class="delivery-option-price">
                            ${priceString} shipping
                          </div>
                        </div>
          </div>
        `;
    });
    return html; // Return the generated delivery options HTML
  }

  // Add event listeners to all "Delete" links in the cart
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      // Get the product ID from the clicked delete link
      const productId = link.dataset.productId;

      // Remove the product from the cart
      removeFromCart(productId);

      // Find the corresponding cart item container and remove it from the UI
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();

      // Re-render the payment summary after item removal
      renderPaymentSummary();
    });
  });

  // Add event listeners to all delivery options
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      // Get the product ID and selected delivery option ID from the clicked element
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;

      // Update the selected delivery option for the product
      updateDeliveryOptions(productId, deliveryOptionId);

      // Re-render the order summary and payment summary to reflect changes
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
