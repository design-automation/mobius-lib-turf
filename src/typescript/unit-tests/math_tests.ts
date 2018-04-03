import * as tm from "../_export";
import * as td from "../test_data";
import {} from "jasmine";

describe("Tests for Math Module", () => {
    it("test_math_sigmoid", () => {
        expect( test_math_sigmoid() ).toBe(true);
    });
    it("test_math_gaussian2", () => {
        expect( test_math_gaussian2() ).toBe(true);
    });
    it("test_math_gaussian3", () => {
        expect( test_math_gaussian2() ).toBe(true);
    });
});

export function test_math_sigmoid(): boolean {
    tm.math.sigmoid(20);
    return true;
}

export function test_math_gaussian2(): boolean {
    tm.math.gaussian2(20);
    return true;
}

export function test_math_gaussian3(): boolean {
    tm.math.gaussian3(20);
    return true;
}
