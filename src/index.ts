import * as Palindrome from './index';
type IndexTuple = [number, number];
type ResultTuple = [boolean, string];
function findLongestPalindrome(s: string): string {
    let longestPalindromeStr = '';
    const dynamicMap = new Map<IndexTuple, ResultTuple>();
    const checkSubstrPalindromeUpdateMapWithReturnState = 
        (iIndex: number, jIndex: number, substring: string, longestPalindromeStr: string, dynamicMap: Map<IndexTuple, ResultTuple>): string => {
            const isPalindromeBool = Palindrome.isPalindrome(substring);
            dynamicMap.set([iIndex, jIndex], [isPalindromeBool, substring]);
            return isPalindromeBool ? substring : longestPalindromeStr;
        }
    for (let i = 0; i < s.length; i++) {
        for (let j = i + 1; j <= s.length; j++) {
            const substring = s.substring(i, j);
            const prevSubstrPalindromeResult = dynamicMap.get([i, j - 1]);
            const getLastChar = (s: string) => s.charAt(s.length - 1);
            // Check only if substring is longer than current longest Palindrome string
            if (substring.length > longestPalindromeStr.length) {
                // Previous substring is Palindrome
                if (prevSubstrPalindromeResult?.[0]) {
                    if (prevSubstrPalindromeResult[1].includes(getLastChar(substring)))
                        longestPalindromeStr = checkSubstrPalindromeUpdateMapWithReturnState(i, j, substring, longestPalindromeStr, dynamicMap);
                    // If previous substring is Palindrome and does not contain a new character, a new substring must not be Palindrome
                    else dynamicMap.set([i, j], [false, substring]);
                }
                // Previous substring is not Palindrome
                else 
                    longestPalindromeStr = checkSubstrPalindromeUpdateMapWithReturnState(i, j, substring, longestPalindromeStr, dynamicMap);
            }
        }
    }
    return longestPalindromeStr;
}
function isPalindrome(s: string): boolean {
    const isStringlengthEven = (s: string) => s.length % 2 === 0; 
    const middleIndex = Math.floor(s.length / 2);
    if (isStringlengthEven(s)) {
        const leftCursor = middleIndex - 1;
        const rightCursor = middleIndex;
        return Palindrome.isPalindromeRecurse(s, leftCursor, rightCursor);
    }
    else {
        const leftCursor = middleIndex;
        const rightCursor = middleIndex;
        return Palindrome.isPalindromeRecurse(s, leftCursor, rightCursor);
    }
}
function isPalindromeRecurse(s: string, leftCursor: number, rightCursor: number): boolean {
    if (leftCursor < 0 || rightCursor >= s.length) return true;
    else if (s.charAt(leftCursor) !== s.charAt(rightCursor)) return false;
    else return Palindrome.isPalindromeRecurse(s, leftCursor - 1, rightCursor + 1);
}
export {
    findLongestPalindrome,
    isPalindrome,
    isPalindromeRecurse
};
// console.log(findLongestPalindrome('bbabbbbabbbbabbbbabb'));