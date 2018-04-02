/**
 * Import geojson files.
 */

/*
    "geometry": {
        "type": "LineString",
        "coordinates": [
            [30, 10], [10, 30], [40, 40]
        ]
    }
*/

/*
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [[35, 10], [45, 45], [15, 40], [10, 20], [35, 10]],
            [[20, 30], [35, 35], [30, 20], [20, 30]]
        ]
    }
*/

/*
    "geometry": {
        "type": "MultiLineString",
        "coordinates": [
            [[10, 10], [20, 20], [10, 40]],
            [[40, 40], [30, 30], [40, 20], [30, 10]]
        ]
    }
*/

/*
    "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
            [
                [[40, 40], [20, 45], [45, 30], [40, 40]]
            ],
            [
                [[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]],
                [[30, 20], [20, 15], [20, 25], [30, 20]]
            ]
        ]
    }
*/

import * as filesys from "../../libs/filesys/filesys";

const path: string = "../turf-modelling/src/assets/geojson/";

/**
 * Converts geojson to a gs model.
 * @param filename The path to the file that cntains the geojson data.
 * @returns Model
 */
export function geojson(filename: string): any {
    const str_data: string = filesys.readFromJSONFile(filename);
    const obj_data = JSON.parse(str_data);
    return obj_data;
}

//  ===============================================================================================================

/**
 * Execute using NPM, models get saved in the /src/assets/ folder.
 * "npm run geojson"
 */
if (require.main === module) {


}
