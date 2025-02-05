const { isEven, calculateTotalPrice, processPurchase, sendNotification, generatePassword } = require("./../src/function.js");


describe('Is this number even ?', () => {
    test("Test number with a string",() =>{
        expect(() => isEven('5')).toThrowError("Input must be a number")
    });
})
