import * as tm from "../_export";
import * as td from "../test_data";
import * as turf from "@turf/turf";
import {} from "jasmine";

describe("Tests for Measure Module", () => {
    it("test_measure_centroid", () => {
        expect( test_measure_centroid() ).toBe(true);
    });
});

export function test_measure_centroid(): boolean {
    const model: turf.FeatureCollection = td.testData1();
    const polys: Array<turf.Feature<turf.Polygon>> = model.features as Array<turf.Feature<turf.Polygon>>;
    for (const poly of polys) {
        const centroid: any = tm.calc.centroid(poly,undefined);
        //console.log(centroid);
    }
    return true;
}
