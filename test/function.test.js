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
