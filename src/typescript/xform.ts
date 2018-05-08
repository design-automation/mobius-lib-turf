/**
 * Turf TRANSFORMATION functions.
 * http://turfjs.org/docs/
 */

/**
 *
 */

import * as turf from "@turf/turf";

/**
 * Rotates any geojson Feature or Geometry of a specified angle, around its `centroid` or a given `pivot` point;
 * all rotations follow the right-hand rule: https://en.wikipedia.org/wiki/Right-hand_rule
 *
 * @param {GeoJSON} geojson object to be rotated
 * @param {number} angle of rotation (along the vertical axis), from North in decimal degrees, negative clockwise
 * @param {Object} [options={}] Optional parameters
 * @param {Coord} [options.pivot='centroid'] point around which the rotation will be performed
 * @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated (significant performance increase if true)
 * @returns {GeoJSON} the rotated GeoJSON feature
 * @example
 * var poly = turf.polygon([[[0,29],[3.5,29],[2.5,32],[0,29]]]);
 * var options = {pivot: [0, 25]};
 * var rotatedPoly = turf.transformRotate(poly, 10, options);
 */
export function rotate(geojson,angle,parameters) {
    return turf.transformRotate(geojson,angle,parameters);
}

/**
 * Moves any geojson Feature or Geometry of a specified distance along a Rhumb Line
 * on the provided direction angle.
 *
 * @param {GeoJSON} geojson object to be translated
 * @param {number} distance length of the motion; negative values determine motion in opposite direction
 * @param {number} direction of the motion; angle from North in decimal degrees, positive clockwise
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units='kilometers'] in which `distance` will be express; miles, kilometers, degrees, or radians
 * @param {number} [options.zTranslation=0] length of the vertical motion, same unit of distance
 * @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated (significant performance increase if true)
 * @returns {GeoJSON} the translated GeoJSON object
 * @example
 * var poly = turf.polygon([[[0,29],[3.5,29],[2.5,32],[0,29]]]);
 * var translatedPoly = turf.transformTranslate(poly, 100, 35);
 */
export function translate(geojson,distance,direction,parameters) {
    return turf.transformTranslate(geojson,distance,direction,parameters);
}

/**
 * Scale a GeoJSON from a given point by a factor of scaling (ex: factor=2 would make the GeoJSON 200% larger).
 * If a FeatureCollection is provided, the origin point will be calculated based on each individual Feature.
 *
 * @param {GeoJSON} geojson GeoJSON to be scaled
 * @param {number} factor of scaling, positive or negative values greater than 0
 * @param {Object} [options={}] Optional parameters
 * @param {string|Coord} [options.origin='centroid'] Point from which the scaling will occur (string options: sw/se/nw/ne/center/centroid)
 * @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated (significant performance increase if true)
 * @returns {GeoJSON} scaled GeoJSON
 * @example
 * var poly = turf.polygon([[[0,29],[3.5,29],[2.5,32],[0,29]]]);
 * var scaledPoly = turf.transformScale(poly, 3);
 */
export function scale(geojson,factor,parameters) {
    return turf.transformScale(geojson,factor,parameters);
}