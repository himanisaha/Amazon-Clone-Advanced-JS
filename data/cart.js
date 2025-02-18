// Import delivery options data from the deliveryOptions module
import { deliveryOptions } from "./deliveryOptions.js";

// Declare a variable to store the cart data
export let cart;

// Load the cart data from local storage when the script runs
loadFromStorage();

// Function to load cart data from local storage
export function loadFromStorage() {
  // Retrieve cart data from local storage and parse it into an object
  cart = JSON.parse(localStorage.getItem('cart'));

  // If no cart data exists, initialize with default cart items
  if (!cart) {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", // Product ID
        quantity: 1, // Default quantity
        deliveryOptionsId: '1', // Default delivery option
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 2,
        deliveryOptionsId: '2',
      }
    ];
  }
}

// Function to save cart data to local storage
function saveToStorage() {
  // Convert cart array to JSON and store it in local storage
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to add a product to the cart
export function addToCart(productId) {
  let matchingItem; // Variable to store if the product already exists in the cart

  // Loop through cart items to find a match
  cart.forEach((item) => {
    if (productId == item.productId) {
      matchingItem = item;
    }
  });

  // If the product exists, increase its quantity
  if (matchingItem) {
    matchingItem.quantity += 1;
  } 
  // If the product does not exist, add it to the cart
  else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionsId: '1' // Default delivery option
    });
  }

  // Save updated cart data to local storage
  saveToStorage();
}

// Function to remove a product from the cart
export function removeFromCart(productId) {
  const newCart = []; // Create a new array to store remaining items

  // Loop through the cart items and add only those that do not match the given product ID
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  // Update the cart with the filtered items
  cart = newCart;

  // Save updated cart data to local storage
  saveToStorage();
}

// Function to update the delivery option for a specific product
export function updateDeliveryOptions(productId, deliveryOptionsId) {
  let matchingItem; // Variable to store the matching product

  // Loop through cart items to find the matching product
  cart.forEach((item) => {
    if (productId == item.productId) {
      matchingItem = item;
    }
  });

  // Update the delivery option for the matching product
  matchingItem.deliveryOptionsId = deliveryOptionsId;

  // Save updated cart data to local storage
  saveToStorage();
}
