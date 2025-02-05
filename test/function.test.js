const { isEven, calculateTotalPrice, processPurchase, sendNotification, generatePassword } = require("./../src/function.js");


describe('Is this number even ?', () => {
    test("Test number with a string",() =>{
        expect(() => isEven('5')).toThrowError("Input must be a number")
    });
    test("Test number is not even", () => {
        expect(isEven(5)).toBe(false)
    });
    test("Test number is even", () => {
        expect(isEven(4)).toBe(true)
    });
});

test("Send a notification in the console", () => {
    console.log = jest.fn();
    const message = "Hello world";
    
    sendNotification(message);

    expect(console.log).toHaveBeenCalledWith(`Notification envoyée : ${message}`);
});

describe('Test with a generated a password', () => {

    test("Test length is not a number",() =>{
        expect(() => generatePassword('5')).toThrowError('Length must be a number greater than or equal to 6')
    });
    test("Test length is less than 6",() =>{
        expect(() => generatePassword(5)).toThrowError('Length must be a number greater than or equal to 6')
    });
    test("Test length is a number equal to 6",() =>{
        expect(generatePassword(6)).toHaveLength(6)
    });
    test("Test length is a number superior to 6",() =>{
        expect(generatePassword(7)).toHaveLength(7)
    });

    //Test with length >= 6

    test("Test with length is superior or equal to 6 and with upper case", ()=>{
        expect(generatePassword(6, {uppercase: true, numbers: false, specialChars: false})).not.toMatch(/[0-9]/, /[!@#$%^&*()_+[]{}|;:,.<>?]/)
    });
    test("Test with length is superior or equal to 6 and a number", ()=>{
    expect(generatePassword(6, {uppercase: false, numbers: true, specialChars: false})).not.toMatch(/[A-Z]/, /[!@#$%^&*()_+[]{}|;:,.<>?]/)
    });
    test("Test with length is superior or equal to 6 and with a special chars", ()=>{
        expect(generatePassword(6, {uppercase: false, numbers: false, specialChars: true})).not.toMatch(/[A-Z]/, /[0-9]/)
    });
    test("Test with length is superior or equal to 6 and without an upper case, a number and a special chars", ()=>{
        expect(generatePassword(6, {uppercase: false, numbers: false, specialChars: false})).not.toMatch(/[A-Z]/, /[0-9]/, /[!@#$%^&*()_+[]{}|;:,.<>?]/)
    });
    test("Test with length is superior or equal to 6 and with an upper case, a number and a special chars", ()=>{
        expect(generatePassword(6, {uppercase: true, numbers: true, specialChars: true}).match(/[A-Z]/, /[0-9]/, /[!@#$%^&*()_+[]{}|;:,.<>?]/))
    });
    test("Test with length is superior or equal to 6 and with an upper case and a number", ()=>{
        expect(generatePassword(6, {uppercase: true, numbers: true, specialChars: false})).not.toMatch(/[!@#$%^&*()_+[]{}|;:,.<>?]/)
    });
    test("Test with length is superior or equal to 6 and with an upper case and a special case", ()=>{
        expect(generatePassword(6, {uppercase: true, numbers: false, specialChars: true})).not.toMatch(/[0-9]/)
    });
    test("Test with length is superior or equal to 6 and with a number and a special case", ()=>{
        expect(generatePassword(6, {uppercase: false, numbers: true, specialChars: true})).not.toMatch(/[A-Z]/)
    });
})







