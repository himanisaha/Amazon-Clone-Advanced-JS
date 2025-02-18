import { addToCart, loadFromStorage, cart } from "../../data/cart.js";

// Test suite for the addToCart function
describe("test suite: addToCart", () => {

    // Test case for adding an existing product to the cart (increases quantity)
    it("adds an existing product to the cart array", () => {
        // Spying on localStorage.setItem to track its calls
        spyOn(localStorage, "setItem");

        // Mocking the getItem method of localStorage to return a pre-defined cart
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", // First product
                    quantity: 5,
                    deliveryOptionId: "1",
                },
                {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", // Second product
                    quantity: 1,
                    deliveryOptionsId: '2'
                }
            ]);
        });

        // Loading the cart from localStorage
        loadFromStorage();

        // Adding the second product to the cart, which should increase its quantity to 2
        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');

        // Verifying that the cart has 2 items and the second product's quantity is now 2
        expect(cart.length).toEqual(2); // There should be 2 items in the cart
        expect(cart[1].quantity).toEqual(2); // The quantity of the second product should be 2
    });

    // Test case for adding a new product to the cart
    it("adds a new product to the cart array", () => {
        // Spying on localStorage.setItem to track its calls
        spyOn(localStorage, "setItem");

        // Mocking the getItem method of localStorage to return an empty cart
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([]); // Empty cart
        });

        // Loading the empty cart from localStorage
        loadFromStorage();

        // Adding a new product to the cart
        addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d");

        // Verifying that the cart now has 1 item and the new product has been added with quantity 1
        expect(cart.length).toEqual(1); // There should be 1 item in the cart
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); // setItem should be called once to save the cart
        expect(cart[0].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d"); // The product ID should be the new product's ID
        expect(cart[0].quantity).toEqual(1); // The new product should have quantity 1
    });
});
