/**
 * Functions for working with geojson models.
 */

/**
 * Models contain features.
 */

import * as fs from "fs";

//  ===============================================================================================================
//  Model Constructors ===========================================================================================
//  ===============================================================================================================

/**
 * Creates a new empty model.
 *
 * @returns New model empty.
 */
export function create(): any {
    return {
        type: "FeatureCollection",
        crs: {
            type: "name",
            properties: {
                "name": "EPSG:4326",
            },
        },
        features: [],
    };
}

/**
 * Reads geojson data from a file. ONLY WORKS ON SERVER.
 * @param filename The path to the file that cntains the geojson data.
 * @returns Model
 */
export function read(filename: string): any {
    const str_data: string = fs.readFileSync(filename).toString();
    return JSON.parse(str_data);
}

/**
 * Get CRS from geojson data.
 * @param data The geojson data..
 * @returns The CRS or null
 */
export function getCRS(data: any): string {
    if (data.hasOwnProperty("crs")) {
        return data.crs.properties["name"];
    }
    return null;
}

/**
 * Set CRS from geojson data.
 * @param data The geojson data..
 */
export function setCRS(data: any, crs: string): void {
    data.crs = {
        type: "name",
        properties: {name: crs},
    };
}

/**
 * Get points from geojson data.
 * @param data The geojson data..
 * @returns An array of features
 */
export function getPoints(data: any): any {
    const points: any[] = [];
    // loop through all features
    for (const feature of data.features) {
        if (feature.geometry.type === "Point") {
            points.push(feature);
        }
    }
    // return data
    return points;
}

/**
 * Get Linestrings from geojson data.
 * @param data The geojson data..
 * @returns An array of features
 */
export function getLinestrings(data: any): any {
    const linestrings: any[] = [];
    // loop through all features
    for (const feature of data.features) {
        if (feature.geometry.type === "LineString") {
            linestrings.push(feature);
        }
    }
    // return data
    return linestrings;
}

/**
 * Get Polygons from geojson data.
 * @param data The geojson data..
 * @returns An array of features
 */
export function getPolygons(data: any): any {
    const polygons: any[] = [];
    // loop through all features
    for (const feature of data.features) {
        if (feature.geometry.type === "Polygon") {
            polygons.push(feature);
        }
    }
    // return data
    return polygons;
}

/**
 * Get Polygons with holes from geojson data.
 * @param data The geojson data..
 * @returns An array of features
 */
export function getPolygonsHoles(data: any): any {
    const polygons_holes: any[] = [];
    // loop through all features
    for (const feature of data.features) {
        if (feature.geometry.type === "Polygon") {
            if (feature.geometry.coordinates > 1) {
                polygons_holes.push(feature);
            }
        }
    }
    // return data
    return polygons_holes;
}

/**
 * Get MultiPoints from geojson data.
 * @param data The geojson data..
 * @returns An array of features
 */
export function getMultiPoints(data: any): any {
    const multipoints: any[] = [];
    // loop through all features
    for (const feature of data.features) {
        if (feature.geometry.type === "MultiPoint") {
            multipoints.push(feature);
        }
    }
    // return data
    return multipoints;
}

/**
 * Get MultiLinestrings from geojson data.
 * @param data The geojson data..
 * @returns An array of features
 */
export function getMultiLinestrings(data: any): any {
    const multilinestrings: any[] = [];
    // loop through all features
    for (const feature of data.features) {
        if (feature.geometry.type === "MultiLineString") {
            multilinestrings.push(feature);
        }
    }
    // return data
    return multilinestrings;
}

/**
 * Get MultiPolygons from geojson data.
 * @param data The geojson data..
 * @returns An array of features
 */
export function getMultiPolygons(data: any): any {
    const multipolygons: any[] = [];
    // loop through all features
    for (const feature of data.features) {
        if (feature.geometry.type === "MultiPolygon") {
            multipolygons.push(feature);
        }
    }
    // return data
    return multipolygons;
}

/**
 * Get MultiPolygons with holes from geojson data.
 * @param data The geojson data..
 * @returns An array of features
 */
export function getMultiPolygonsHoles(data: any): any {
    const multipolygons_holes: any[] = [];
    // loop through all features
    for (const feature of data.features) {
        if (feature.geometry.type === "MultiPolygon") {
            let has_holes: boolean = false;
            for (const face of feature.geometry.coordinates) {
                if (face.length > 1) {has_holes = true; break;}
            }
            if (has_holes) {
                multipolygons_holes.push(feature);
            }
        }
    }
    // return data
    return multipolygons_holes;
}

/**
 * Get property names and types
 * @param data The geojson data..
 * @returns A map of property names -> property types
 */
export function getPropertyTypes(data: any): any {
    const properties: Map<string, string> = new Map();
    // loop through all features
    for (const feature of data.features) {
        const propos: any = feature.properties;
        for (const key of Object.keys(propos)) {
            if (!properties.has(key)) {
                if (isNaN(propos[key])) {
                    properties.set(key, "string");
                } else {
                    properties.set(key, "number");
                }
            }
        }
    }
    // return data
    return properties;
}

/**
 * Add a feature to the model.
 * @param data The geojson data..
 * @param feature The feature to add.
 */
export function addFeature(data: any, feature: any): void {
    data.features.push(feature);
}

/**
 * Del a feature in the model.
 * @param data The geojson data..
 * @param feature The feature to del.
 * @returns Ture if the feature was deleted, false if the feature with that id was not found.
 */
export function delFeature(data: any, feature: any): boolean {
    let counter: number = 0;
    for (const feature2 of data.features) {
        if (feature.id === feature2.id) {
            data.features.splice(counter, 1);
            // delete data.features[counter]; //TODO not sure which is better
            return true;
        }
        counter++;
    }
    return false;
}
