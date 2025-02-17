import { cart, addToCart } from "../data/cart.js"; // Import cart data and function to add items to the cart
import { products } from "../data/products.js"; // Import list of products
import { formatCurrency } from "./utils/money.js"; // Import function to format price correctly

// Create an empty string to store the HTML for all products
let productsHTML = "";

// Loop through each product in the products list and create HTML for it
products.forEach((product) => {
  productsHTML += `<div class="product-container"> 
          <!-- Product image section -->
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>
    
          <!-- Product name -->
          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>
    
          <!-- Product rating section -->
          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"> 
            <!-- Display the rating count -->
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>
    
          <!-- Product price -->
          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>
    
          <!-- Dropdown to select quantity -->
          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
    
          <!-- Additional product details (if available) -->
          ${product.extraInfoHtml()}
           
          <div class="product-spacer"></div>
    
          <!-- Confirmation message when product is added to cart -->
          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>
    
          <!-- Button to add product to cart -->
          <button class="add-to-cart-button button-primary js-add-to-cart-button" 
            data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
});

// Insert the generated product HTML into the webpage
document.querySelector(".js-products-grid").innerHTML = productsHTML;

// Function to update cart quantity display
function updateQuantity() {
  let cartQuantity = 0;

  // Loop through each item in the cart and sum up the quantity
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  // Update the displayed cart quantity on the webpage
  document.querySelector(".js-add-to-cart-quantity").innerHTML = cartQuantity;
}

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    // Get the product ID from the button's data attribute
    const productId = button.dataset.productId;

    // Call the function to add the product to the cart
    addToCart(productId);

    // Update the cart quantity display
    updateQuantity();
  });
});
