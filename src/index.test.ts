import * as Palindrome from './index';

beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Palindrome, 'isPalindromeRecurse');
    jest.spyOn(Palindrome, 'isPalindrome');
    jest.spyOn(Palindrome, 'findLongestPalindrome');
});
describe('isPalindromeRecurse function should work as expected', () => {
    test('Should return true if leftCursor is negative', () => {
        const result = Palindrome.isPalindromeRecurse('aba', -1, 3);
        expect(result).toBe(true);
        expect(Palindrome.isPalindromeRecurse).toBeCalledTimes(1);
    });
    test('Should return false if leftCursor is GTE 0 and rightCursor LT string input length and char at both cursor is not the same', () => {
        const result = Palindrome.isPalindromeRecurse('bba', 0, 2);
        expect(result).toBe(false);
        expect(Palindrome.isPalindromeRecurse).toBeCalledTimes(1);
    });
    test('Should call isPalindromeRecurse 3 times and get true result', () => {
        const result = Palindrome.isPalindromeRecurse('aba', 1, 1);
        expect(result).toBe(true);
        expect(Palindrome.isPalindromeRecurse).toBeCalledTimes(3);
    });
});
describe('isPalindrome function should work as expected', () => {
    test('leftCursor and rightCursor must be different if the string length is even', () => {
        const result = Palindrome.isPalindrome('abba');
        expect(result).toBe(true);
        expect(Palindrome.isPalindromeRecurse).toBeCalledWith('abba', 1, 2);
        expect(Palindrome.isPalindromeRecurse).toBeCalledWith('abba', 0, 3);
        expect(Palindrome.isPalindromeRecurse).toBeCalledWith('abba', -1, 4);
        expect(Palindrome.isPalindromeRecurse).toBeCalledTimes(3);
    });
    test('leftCursor and rightCursor must be the same if the string length is odd', () => {
        const result = Palindrome.isPalindrome('aba');
        expect(result).toBe(true);
        expect(Palindrome.isPalindromeRecurse).toBeCalledWith('aba', 1, 1);
        expect(Palindrome.isPalindromeRecurse).toBeCalledWith('aba', 0, 2);
        expect(Palindrome.isPalindromeRecurse).toBeCalledWith('aba', -1, 3);
        expect(Palindrome.isPalindromeRecurse).toBeCalledTimes(3);
    });
});
describe('findLongestPalindrome function should work as expected', () => {
    test('should return empty string if input is empty string', () => {
        const result = Palindrome.findLongestPalindrome('');
        expect(result).toBe('');
        expect(Palindrome.isPalindrome).not.toBeCalled();
    });
    test('should return the single character string if input string is single character', () => {
        const result = Palindrome.findLongestPalindrome('a');
        expect(result).toBe('a');
    });
    test('should return the longest one if the longest is the first Palindrome', () => {
        const result = Palindrome.findLongestPalindrome('abcbaaca');
        expect(result).toBe('abcba');
    });
    test('should return the longest one if the longest is not the first Palindrome sample 1', () => {
        const result = Palindrome.findLongestPalindrome('babbabb');
        expect(result).toBe('babbab');
    });
    test('should return the longest one if the longest is not the first Palindrome sample 2', () => {
        const result = Palindrome.findLongestPalindrome('bbabbab');
        expect(result).toBe('babbab');
    });
});