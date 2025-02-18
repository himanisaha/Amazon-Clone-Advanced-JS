import { formatCurrency } from "../../scripts/utils/money.js";

// Test suite for the formatCurrency function
describe('Test suite: formatCurrency', () => {

    // Test case for converting a price into dollars
    it('converts price into dollars', () => {
        // Calling formatCurrency with 2095 (cents) and checking if it returns '20.95' (dollars)
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    // Test case for when the price is 0 value
    it('works with price 0 value', () => {
        // Calling formatCurrency with 0 and checking if it returns '0.00'
        expect(formatCurrency(0)).toEqual('0.00');
    });

    // Test case for rounding up to the nearest value
    it('round up to the nearest value', () => {
        // Calling formatCurrency with 2000.5 (cents) and checking if it rounds to '20.01' (dollars)
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
});
