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

describe('Send a notification in the console', () => {
    test("Send a notification in the console", () => {
        console.log = jest.fn();
        const message = "Hello world";
        
        sendNotification(message);

        expect(console.log).toHaveBeenCalledWith(`Notification envoyée : ${message}`);
    });
});

describe('Generate a random password based on length and complexity required', () => {
    test("Test length is not a number",() =>{
        expect(() => generatePassword('6', { uppercase: true, numbers: true, specialChars: true })).toThrowError("Length must be a number")
    });
    test("Test length is a number",() =>{
        expect(generatePassword(6, { uppercase: true, numbers: true, specialChars: true }).length).toBe(6)
    });
    test("Test length is less than 6",() =>{
        expect(() => generatePassword(5, { uppercase: true, numbers: true, specialChars: true })).toThrowError("Length must be a number greater than or equal to 6")
    });
    test("Test length is superior or equal to 6",() =>{
        expect(generatePassword(8, { uppercase: true, numbers: true, specialChars: true }).length).toBe(8)
    });
    test("Test with uppercase, numbers and special characters",() =>{
        expect(generatePassword(6, { uppercase: true, numbers: true, specialChars: true }).match(/[A-Z]/,/[0-9]/,/[^A-Za-z0-9]/))
    });
    test("Test without uppercase, numbers and special characters",() =>{
        expect(generatePassword(6, { uppercase: false, numbers: false, specialChars: false })).not.toMatch(/[A-Z]/,/[0-9]/,/[^A-Za-z0-9]/)
    });
    test("Test without uppercase",() =>{
        expect(generatePassword(6, { uppercase: false, numbers: true, specialChars: true })).not.toMatch(/[A-Z]/)
    });
    test("Test without numbers",() =>{
        expect(generatePassword(6, { uppercase: true, numbers: false, specialChars: true })).not.toMatch(/[0-9]/)
    });
    test("Test without special characters",() =>{
        expect(generatePassword(6, { uppercase: true, numbers: true, specialChars: false })).not.toMatch(/[^A-Za-z0-9]/)
    });
    test("Test without uppercase, numbers",() =>{
        expect(generatePassword(6, { uppercase: false, numbers: false, specialChars: true })).not.toMatch(/[A-Z]/,/[0-9]/)
    });
    test("Test without uppercase, special characters",() =>{
        expect(generatePassword(6, { uppercase: false, numbers: true, specialChars: false })).not.toMatch(/[A-Z]/,/[^A-Za-z0-9]/)
    });
    test("Test without numbers, special characters",() =>{
        expect(generatePassword(6, { uppercase: true, numbers: false, specialChars: false })).not.toMatch(/[0-9]/,/[^A-Za-z0-9]/)
    });
});