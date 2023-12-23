function longestCommonPrefix(str) {
    let result = [];

    if (str.length === 0) {
        return ''; // Return an empty string for an empty input.
    }

    for (let j = 0; j < str[0].length; j++) {
        const char = str[0][j]; // Get the character of 1st word

        for (let i = 1; i < str.length; i++) {
            if (j >= str[i].length || str[i][j] !== char) {
                return result.join(''); // If the character doesn't match OR
                // we reach the end of any word, return the result as a joined string.
            }
        }

        result.push(char); // If the character matches in all words, add it to the result.
    }

    return result.join(''); // Join the characters in the result array to form a single string.
}

console.log(longestCommonPrefix(["flower", "flow", "flight"]));
console.log(longestCommonPrefix(["dog", "racecar", "car"]));

