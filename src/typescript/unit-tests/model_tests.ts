import * as tm from "../_export";
import * as td from "../test_data";
import {} from "jasmine";

describe("Tests for Model Module", () => {
    it("test_model_create", () => {
        expect( test_model_create() ).toBe(true);
    });
    it("test_model_getCRS", () => {
        expect( test_model_getCRS() ).toBe(true);
    });
    it("test_model_getPolygons", () => {
        expect( test_model_getPolygons() ).toBe(true);
    });
    it("test_model_addFeature", () => {
        expect( test_model_addFeature() ).toBe(true);
    });
});

export function test_model_create(): boolean {
    const m: any = tm.model.create();
    return true;
}

export function test_model_getCRS(): boolean {
    const m: any = td.testData1();
    if(tm.model.getCRS(m) !== "EPSG:4326") {return false;}
    return true;
}

export function test_model_getPolygons(): boolean {
    const m: any = td.testData1();
    if(tm.model.getPolygons(m).length !== 1) {return false;}
    if(tm.model.getPoints(m).length !== 0) {return false;}
    return true;
}

export function test_model_addFeature(): boolean {
    const m: any = td.testData1();
    const polys: any = tm.model.getPolygons(m);
    const m2: any = tm.model.create();
    tm.model.addFeature(m2, polys[0]);
    if(tm.model.getPolygons(m2).length !== 1) {return false;}
    //console.log(m2);
    return true;
}
