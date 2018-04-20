/**
 * Functions for measuring.
 */

/**
 *
 */

import * as turf from "@turf/turf";

/**
 * Takes one or more features and calculates the centroid using the mean of all vertices.
 * This lessens the effect of small islands and artifacts when calculating the centroid of
 * a set of polygons.
 *
 * var polygon = turf.polygon([[[-81, 41], [-88, 36], [-84, 31], [-80, 33], [-77, 39], [-81, 41]]]);
 * var centroid = turf.centroid(polygon);
 *
 * @param geojson GeoJSON to be centered.
 * @param properties An Object that is used as the Feature's properties.
 * @returns Feature <Point> - the centroid of the input features.
 */
export function centroid(geojson: turf.AllGeoJSON, properties?: turf.Properties): turf.Feature<turf.Point> {
    return turf.centroid(geojson, properties);
}
