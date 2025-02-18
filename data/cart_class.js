// Import the delivery options data from the deliveryOptions module
import { deliveryOptions } from "./deliveryOptions.js";

// Define a class named 'Cart' to manage cart-related operations
class Cart {

    // Class-level variables to store cart items and the local storage key
    cartItems = undefined;
    localStorageKey = undefined;

    // Constructor function to initialize the cart with a local storage key
    constructor(localStorageKey) {
        this.localStorage = localStorageKey; // Assign the given key to the localStorageKey property
    }

    // Method to load cart items from local storage
    loadFromStorage() {
        // Retrieve cart data from local storage and parse it into an object
        this.cartItems = JSON.parse(localStorage.getItem("localStorageKey"));

        // If no cart data exists, initialize with default cart items
        if (!this.cartItems) {
            this.cartItems = [
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", // Product ID
                    quantity: 2, // Quantity of the product
                    deliveryOptionId: "1", // Default delivery option
                },
                {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity: 1,
                    deliveryOptionId: "2",
                },
            ];
        }
    }

    // Method to save cart items to local storage
    saveToStorage() {
        // Convert cartItems to a JSON string and save it in local storage
        localStorage.setItem("localStorageKey", JSON.stringify(this.cartItems));
    }

    // Method to add a product to the cart
    addToCart(productId) {
        let matchingItem; // Variable to track if the product is already in the cart

        // Loop through cart items to check if the product already exists
        this.cartItems.forEach((item) => {
            if (productId == item.productId) {
                matchingItem = item;
            }
        });

        // If the product exists, increase the quantity
        if (matchingItem) {
            matchingItem.quantity += 1;
        } 
        // If the product does not exist, add it to the cart with default values
        else {
            this.cartItems.push({
                productId: productId,
                quantity: 1,
                deliveryOptionsId: "1", // Default delivery option
            });
        }

        // Save updated cart data to local storage
        this.saveToStorage();
    }

    // Method to remove a product from the cart
    removeFromCart(productId) {
        const newCart = []; // Create a new array to store remaining items

        // Loop through the cart items and add only those that do not match the given product ID
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });

        // Update the cart with the filtered items
        this.cartItems = newCart;

        // Save updated cart data to local storage
        this.saveToStorage();
    }

    // Method to update the delivery option for a specific product
    updateDeliveryOptions(productId, deliveryOptionsId) {
        let matchingItem; // Variable to store the product found in the cart

        // Loop through the cart items to find the matching product
        this.cartItems.forEach((item) => {
            if (productId == item.productId) {
                matchingItem = item;
            }
        });

        // Update the delivery option for the matching item
        matchingItem.deliveryOptionsId = deliveryOptionsId;

        // Save updated cart data to local storage
        this.saveToStorage();
    }

}

// OBJECT CREATION
// Creating instances of the Cart class with different local storage keys
const amazonNormalCart = new Cart('cart-oops'); // Cart for normal users
const buisnessCart = new Cart('cart-buisness'); // Cart for business users

// Log both cart instances to the console for debugging
console.log(amazonNormalCart);
console.log(buisnessCart);
