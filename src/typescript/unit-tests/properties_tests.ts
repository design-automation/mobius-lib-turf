import * as tm from "../_export";
import * as td from "../test_data";
import * as turf from "@turf/turf";
import {} from "jasmine";

describe("Tests for Properties Module", () => {
    it("test_properties_getProperties", () => {
        expect( test_properties_getProperties() ).toBe(true);
    });
    it("test_properties_getProperty", () => {
        expect( test_properties_getProperty() ).toBe(true);
    });
    it("test_properties_setProperty", () => {
        expect( test_properties_setProperty() ).toBe(true);
    });
});

export function test_properties_getProperties(): boolean {
    const model: turf.FeatureCollection = td.testData1();
    const polys: Array<turf.Feature<turf.Polygon>> = tm.feature_coll.getPolygons(model);
    const props: turf.Properties = tm.properties.getProperties(polys[0]);
    //console.log(props);
    return true;
}

export function test_properties_getProperty(): boolean {
    const model: turf.FeatureCollection = td.testData1();
    const polys: Array<turf.Feature<turf.Polygon>> = tm.feature_coll.getPolygons(model);
    const prop1: any = tm.properties.getProperty(polys[0], "DIST_FEED");
    if (prop1 !== 3778.194) {return false;}
    const prop2: any = tm.properties.getProperty(polys[0], "PDT_OWNER");
    if (prop2 !== "Unknown") {return false;}
    return true;
}

export function test_properties_setProperty(): boolean {
    const model: any = td.testData1();
    const polys: Array<turf.Feature<turf.Polygon>> = tm.feature_coll.getPolygons(model);
    tm.properties.setProperty(polys[0], "aaa", tm.math.max([1, 12, 32, 12345, 555]));
    const props: turf.Properties = tm.properties.getProperties(polys[0]);
    //console.log(props);
    return true;
}
