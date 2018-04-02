/**
 * Math functions.
 */

/**
 * Various functions for doing basic maths.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/
 */


/**
 * Rounds a number to the nearest integer.
 *
 * @param num Number.
 * @returns A number representing the smallest integer more than or equal to the specified number.
 *
 * <h3>Example:</h3>
 * <code>
 * num = Math.ceiling(4.5)</code><br/><br/>
 * Expected value of num is 4.
 */
export function round(num: number): number {
    if (num === undefined) {throw new Error("Invalid arg: num must be defined.");}
    return Math.round(num);
}

/**
 * Rounds a number up to the nearest integer.
 *
 * @param num Number.
 * @returns A number representing the smallest integer more than or equal to the specified number.
 *
 * <h3>Example:</h3>
 * <code>
 * num = Math.ceiling(4.3)</code><br/><br/>
 * Expected value of num is 5.
 */
export function ceiling(num: number): number {
    if (num === undefined) {throw new Error("Invalid arg: num must be defined.");}
    return Math.ceil(num);
}

/**
 * Rounds a number down to the nearest integer.
 *
 * @param num Number.
 * @returns A number representing the largest integer less than or equal to the specified number.
 *
 * <h3>Example:</h3>
 * <code>
 * num = Math.floor(4.3)</code><br/><br/>
 * Expected value of num is 4.
 */
export function floor(num: number): number {
    if (num === undefined) {throw new Error("Invalid arg: num must be defined.");}
    return Math.floor(num);
}

/**
 * Returns the absolute value of a number.
 *
 * Returns num if num is positive, -num if num is negative and 0 if num=0<br/>
 *
 * @param num Number.
 * @returns A number representing the absolute value of the specified number.
 *
 * <h3>Example:</h3>
 * <code>
 * num1 = Math.abs(-1.234)
 * num2 = Math.abs(2.345)<br/>
 * </code><br/><br/>
 * Expected value of num1 is 1.234, and of num2 is 2.345.
 */
export function abs(num: number): number {
    if (num === undefined) {throw new Error("Invalid arg: num must be defined.");}
    return Math.abs(num);
}

/**
 * Returns the largest number in a list of numbers.
 *
 * @param nums List of numbers.
 * @returns A number representing the largest number in specified list of numbers.
 *
 * <h3>Example:</h3>
 * <code>
 * list = [8,9,6,1,3]<br/>
 * num = Math.max(list)</code><br/><br/>
 * Expected value of num is 9.
 */
export function max(nums: number[]): number {
    if (nums === undefined) {throw new Error("Invalid arg: nums must be defined.");}
    let maximum = Number.NEGATIVE_INFINITY;
    for (const num of nums) {
        if(num > maximum) {
            maximum = num;
        }
    }
    return maximum;
}

/**
 * Returns the smallest number in a list of numbers.
 *
 * @param num List of numbers.
 * @returns A number representing the smallest number in specified list of numbers.
 *
 * <h3>Example:</h3>
 * <code>
 * list = [8,9,6,1,3]<br/>
 * num = Math.max(list)</code><br/><br/>
 * Expected value of num is 1.
 */
export function min(nums: number[]): number {
    if (nums === undefined) {throw new Error("Invalid arg: nums must be defined.");}
    let minimum = Number.POSITIVE_INFINITY;
    for (const num of nums) {
        if(num < minimum) {
            minimum = num;
        }
    }
    return minimum;
}

/**
 * Returns a pseudo-random number between 0 (inclusive) and 1 (exclusive).
 *
 * @returns A pseudo-random number.
 */
export function rand(): number {
    return Math.random();
}

/**
 * Returns a pseudo-random integer number between two numbers.
 *
 * Lower bound number is inclusive and upper bound number is exclusive.
 * @param min Lower bound of range.
 * @param max Upper bound of range.
 * @returns A pseudo-random integer number.
 */
export function randInt(min: number, max: number): number {
    if (min === undefined) {throw new Error("Invalid arg: min must be defined.");}
    if (max === undefined) {throw new Error("Invalid arg: max must be defined.");}
    const lower = Math.ceil(min);
    const upper = Math.floor(max);
    return Math.floor(Math.random() * (upper - lower)) + lower;
}

/**
 * Returns a pseudo-random floating point number between two numbers.
 *
 * @param min Lower bound of range.
 * @param max Upper bound of range.
 * @returns A pseudo-random floating point number.
 */
export function randFloat(min: number, max: number): number {
    if (min === undefined) {throw new Error("Invalid arg: min must be defined.");}
    if (max === undefined) {throw new Error("Invalid arg: max must be defined.");}
    return (Math.random() * (max - min)) + min;
}
