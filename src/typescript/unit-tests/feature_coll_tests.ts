import * as tm from "../_export";
import * as td from "../test_data";
import * as turf from "@turf/turf";
import {} from "jasmine";

describe("Tests for Model Module", () => {
    it("test_feature_coll_create", () => {
        expect( test_feature_coll_create() ).toBe(true);
    });
    it("test_feature_coll_getPolygons", () => {
        expect( test_feature_coll_getPolygons() ).toBe(true);
    });
    it("test_feature_coll_addFeature", () => {
        expect( test_feature_coll_addFeature() ).toBe(true);
    });
});

export function test_feature_coll_create(): boolean {
    const m: turf.FeatureCollection = tm.feature_coll.create();
    return true;
}

export function test_feature_coll_getPolygons(): boolean {
    const m: turf.FeatureCollection = td.testData1();
    if(tm.feature_coll.getPolygons(m).length !== 1) {return false;}
    if(tm.feature_coll.getPoints(m).length !== 0) {return false;}
    return true;
}

export function test_feature_coll_addFeature(): boolean {
    const m: turf.FeatureCollection = td.testData1();
    const polys: Array<turf.Feature<turf.Polygon>> = tm.feature_coll.getPolygons(m);
    const m2: turf.FeatureCollection = tm.feature_coll.create();
    tm.feature_coll.addFeature(m2, polys[0]);
    if(tm.feature_coll.getPolygons(m2).length !== 1) {return false;}
    //console.log(m2);
    return true;
}
