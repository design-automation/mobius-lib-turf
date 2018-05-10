/**
 * Turf RANDOM functions.
 * http://turfjs.org/docs/
 */

/**
 *
 */
import * as turf from "@turf/turf";

/**
 * Returns a random position within a bounding box.
 *
 * @param {Array<number>} [bbox=[-180, -90, 180, 90]] a bounding box inside of which positions are placed.
 * @returns {Array<number>} Position [longitude, latitude]
 * @example
 * var position = turf.randomPosition([-180, -90, 180, 90])
 * //=position
 */
export function position(bbox: turf.BBox): number[] {
    return turf.randomPosition(bbox);
}

/**
 * Returns a random point.
 *
 * @param {number} num How many geometries will be generated (if undefined, default value is 1)
 * @param {Object} options Optional parameters
 * (bbox: a bounding box inside of which geometries are placed.)
 * @returns {FeatureCollection<Point>} GeoJSON FeatureCollection of points
 * @example
 * var points = turf.randomPoint(25, {bbox: [-180, -90, 180, 90]})
 * //=points
 */
export function point(num: number,options: {bbox: turf.BBox}): turf.FeatureCollection<turf.Point> {
    return turf.randomPoint(num,options);
}

/**
 * Returns a random linestring.
 *
 * @param {number} num How many geometries will be generated (if undefined, default value is 1)
 * @param {Object} options Optional parameters
 * (bbox: a bounding box inside of which geometries are placed,
 * num_vertices: is how many coordinates each LineString will contain,
 * max_length: is the maximum number of decimal degrees that a vertex can be from its predecessor,
 * max_rotation=Math: is the maximum number of radians that a line segment can turn from the previous segment.)
 * @returns {FeatureCollection<LineString>} GeoJSON FeatureCollection of LineString
 * @example
 * var lineStrings = turf.randomLineString(25, {bbox: [-180, -90, 180, 90]})
 * //=lineStrings
 */
export function linestring(num: number,options: {bbox: turf.BBox,num_vertices: number,max_length: number, max_rotation: number}): turf.FeatureCollection<turf.LineString> {
    return turf.randomLineString(num,options);
}

/**
 * Returns a random polygon.
 *
 * @param {number} num How many geometries will be generated (if undefined, default value is 1)
 * @param {Object} options Optional parameters
 * @param {Array<number>} [options.bbox=[-180, -90, 180, 90]] a bounding box inside of which geometries are placed.
 * @param {number} [options.num_vertices=10] is how many coordinates each LineString will contain.
 * @param {number} [options.max_radial_length=10] is the maximum number of decimal degrees latitude or longitude that a vertex can reach out of the center of the Polygon.
 * @returns {FeatureCollection<LineString>} GeoJSON FeatureCollection of LineString
 * @example
 * var polygons = turf.randomPolygon(25, {bbox: [-180, -90, 180, 90]})
 * //=polygons
 */
export function polygon(num: number,options: {bbox: turf.BBox,num_vertices:number,max_radial_length:number}): turf.FeatureCollection<turf.LineString> {
    return turf.randomPolygon(num,options);
}
