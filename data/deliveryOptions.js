// Function to get a delivery option based on the provided deliveryOptionId
export function getDeliveryOption(deliveryOptionId) {
    let selectedOption = deliveryOptions[0]; // Default to the first option in the list

    // Iterate through the delivery options array to find the matching option
    deliveryOptions.forEach((option) => {
        if (option.id == deliveryOptionId) {
            selectedOption = option; // Assign the matched delivery option to selectedOption
        }
    });

    return selectedOption; // Return the matched delivery option (or the default option)
}

// Array of available delivery options
export const deliveryOptions = [
    {
        id: '1',         // Unique identifier for the delivery option
        deliveryDays: 7, // Estimated delivery time in days
        priceCents: 0    // Cost of this delivery option in cents (free shipping)
    },
    {
        id: '2',
        deliveryDays: 3,
        priceCents: 499  // Cost for faster shipping (4.99 in dollars)
    },
    {
        id: '3',
        deliveryDays: 1,
        priceCents: 999  // Cost for fastest shipping (9.99 in dollars)
    }
];
