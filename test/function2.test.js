const { isEven, calculateTotalPrice, processPurchase, sendNotification, generatePassword } = require("./../src/function.js");


describe('Is this number even ?', () => {
    test("Test number with a string",() =>{
        expect(() => isEven('5')).toThrowError("Input must be a number")
    });
    test("Test number is not even", () => {
        expect(isEven(5)).toBe(false)
    })
    test("Test number is even", () => {
        expect(isEven(4)).toBe(true)
    })
})

describe('Calculate total price of a cart, with tax added', () => {
    test("Test prices are not an array",() =>{
        expect(() => calculateTotalPrice(5, 10, 0.2)).toThrowError("Prices must be an array")
    });
    test("Test prices are an array",() =>{
        expect(calculateTotalPrice([5, 10], 0.2)).toBe(18)
    });
    test("Test tax rate is not a number",() =>{
        expect(() => calculateTotalPrice([5, 10], '0.2')).toThrowError("Tax rate must be a number")
    });
    test("Test tax rate is a number",() =>{
        expect(calculateTotalPrice([5, 10], 0.2)).toBe(18)
    });
    test("Test each prices are not a number",() =>{
        expect(() => calculateTotalPrice(['5', '10'], 0.2)).toThrowError("Each price must be a non-negative number")
    });
    test("Test each prices are negative",() =>{
        expect(() => calculateTotalPrice([-5, -10], 0.2)).toThrowError("Each price must be a non-negative number")
    });
    test("Test each prices are non-negative number", () => {
        expect(calculateTotalPrice([5, 10], 0.2)).toBe(18)
    });

    describe('Process purchase of cart after calculating total price and notificate it in the console', () => {
        test("Send a notification after calculating total price of purchase",() =>{
            console.log = jest.fn();
            const cart = [5, 10];
            const taxRate = 0.2;
            const totalPrice = calculateTotalPrice(cart, taxRate);
            processPurchase(cart, taxRate);

            expect(console.log).toHaveBeenCalledWith(`Notification envoyée : Votre total est de ${totalPrice.toFixed(2)} €`);
        });
    });
})

test("Send a notification in the console", () => {
    console.log = jest.fn();
    const message = "Hello world";
    
    sendNotification(message);

    expect(console.log).toHaveBeenCalledWith(`Notification envoyée : ${message}`);
});