import * as tm from "../../_export";
import * as td from "../../test_data";
import {} from "jasmine";

describe("Tests for Measure Module", () => {
    it("test_measure_centroid", () => {
        expect( test_measure_centroid() ).toBe(true);
    });
});

export function test_measure_centroid(): boolean {
    const model: any = td.testData1();
    const polys: any = tm.model.getPolygons(model);
    for (const poly of polys) {
        const centroid: any = tm.measure.centroid(poly);
        //console.log(centroid);
    }
    return true;
}
