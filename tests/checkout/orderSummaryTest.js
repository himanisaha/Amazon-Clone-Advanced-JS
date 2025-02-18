import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage } from "../../data/cart.js";

// Test suite for the renderOrderSummary function
describe('test suite: renderOrderSummary', () => {

    // Defining some product IDs for testing
    const product1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const product2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    const product3 = '54e0eccd-8f36-462b-b68a-8182611d9add';

    // Test case to verify that the cart is displayed correctly
    it('display the cart', () => {
        // Setting up the HTML structure in the DOM for testing
        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>;
            <div class="js-payment-summary"></div>;
        `;

        // Mocking the localStorage getItem method to simulate data retrieval
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([
                {
                    productId: product1,
                    quantity: 5,
                    deliveryOptionId: '1',
                },
                {
                    productId: product2,
                    quantity: 1,
                    deliveryOptionsId: '2',
                },
                {
                    productId: product3,
                    quantity: 1,
                    deliveryOptionsId: '2'
                }
            ]);
        });

        // Loading the cart from localStorage and rendering the order summary
        loadFromStorage();
        renderOrderSummary();

        // Verifying that the correct number of cart items are displayed
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(3);

        // Checking the displayed quantity for specific products
        expect(
            document.querySelector(`.js-product-quantity-${product2}`).innerText
        ).toContain('Quantity: 1');

        expect(
            document.querySelector(`.js-product-quantity-${product3}`).innerText
        ).toContain('Quantity: 1');

        expect(
            document.querySelector(`.js-product-quantity-${product1}`).innerText
        ).toContain('Quantity: 5');
    });

    // Test case to verify that a product can be removed from the cart
    it('removes a product', () => {
        // Setting up the HTML structure again for the remove test
        document.querySelector(
            ".js-test-container"
        ).innerHTML = `<div class="js-order-summary"></div>;
           <div class="js-payment-summary"></div>;`

        // Mocking the localStorage getItem method for a cart with two items
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([
                {
                    productId: product1,
                    quantity: 5,
                    deliveryOptionId: "1",
                },
                {
                    productId: product2,
                    quantity: 1,
                    deliveryOptionId: "2",
                }
            ]);
        });
        
        // Loading the cart from localStorage and rendering the order summary
        loadFromStorage();
        renderOrderSummary();

        // Simulating a click event to delete the first product
        document.querySelector(`.js-delete-link-${product1}`).click();

        // Verifying that the correct number of cart items remain after deletion
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

        // Verifying that the removed product is no longer displayed in the DOM
        expect(
            document.querySelector(`.js-cart-item-container-${product1}`)
        ).toEqual(null);

        // Verifying that the remaining product is still in the cart
        expect(
            document.querySelector(`.js-cart-item-container-${product2}`)
        ).not.toEqual(null);
    })
});
