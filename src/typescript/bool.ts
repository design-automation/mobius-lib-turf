/**
 * Turf graphical boolean functions.
 * http://turfjs.org/docs/
 */

/**
 *
 */
import * as turf from "@turf/turf";

/**
 * Finds the difference between two polygons by clipping the second polygon from the first.
 *
 * @param {Feature<Polygon|MultiPolygon>} poly1 input Polygon feature
 * @param {Feature<Polygon|MultiPolygon>} poly2 Polygon feature to difference from polygon1
 * @returns {Feature<Polygon|MultiPolygon>|null} a Polygon or MultiPolygon feature showing the area of `polygon1` excluding the area of `polygon2` (if empty returns `null`)
 * @example
 * var polygon1 = turf.polygon([[
 *   [128, -26],
 *   [141, -26],
 *   [141, -21],
 *   [128, -21],
 *   [128, -26]
 * ]], {
 *   "fill": "#F00",
 *   "fill-opacity": 0.1
 * });
 * var polygon2 = turf.polygon([[
 *   [126, -28],
 *   [140, -28],
 *   [140, -20],
 *   [126, -20],
 *   [126, -28]
 * ]], {
 *   "fill": "#00F",
 *   "fill-opacity": 0.1
 * });
 *
 * var difference = turf.difference(polygon1, polygon2);
 *
 */
export function difference(poly1: turf.Polygon|turf.MultiPolygon, poly2: turf.Polygon|turf.MultiPolygon): turf.Feature|null {
    return turf.difference(poly1, poly2);
}

/**
 * Takes two Polygon and finds their intersection. If they share a border, returns the border; if they don't intersect, returns undefined.
 *
 * @param {Feature<Polygon>} poly1 the first polygon
 * @param {Feature<Polygon>} poly2 the second polygon
 * @returns {Feature|null} returns a feature representing the point(s) they share (in case of a Point  or MultiPoint), the borders they share (in case of a LineString or a MultiLineString), the area they share (in case of Polygon or MultiPolygon). If they do not share any point, returns `null`.
 * @example
 * var poly1 = turf.polygon([[
 *   [-122.801742, 45.48565],
 *   [-122.801742, 45.60491],
 *   [-122.584762, 45.60491],
 *   [-122.584762, 45.48565],
 *   [-122.801742, 45.48565]
 * ]]);
 *
 * var poly2 = turf.polygon([[
 *   [-122.520217, 45.535693],
 *   [-122.64038, 45.553967],
 *   [-122.720031, 45.526554],
 *   [-122.669906, 45.507309],
 *   [-122.723464, 45.446643],
 *   [-122.532577, 45.408574],
 *   [-122.487258, 45.477466],
 *   [-122.520217, 45.535693]
 * ]]);
 *
 * var intersection = turf.intersect(poly1, poly2);
 *
 */
export function intersect(poly1: turf.Polygon, poly2: turf.Polygon): turf.Feature|null {
    return turf.intersect(poly1, poly2);
}

/**
 * Takes two or more Polygon and returns a combined polygon. If the input polygons are not contiguous, this function returns a MultiPolygon feature.
 *
 * @param {Feature<Polygon>[]} polys An array of polygons to combine
 * @returns {Feature<(Polygon|MultiPolygon)>} a combined Polygon or MultiPolygon feature
 * @example
 * var poly1 = turf.polygon([[
 *     [-82.574787, 35.594087],
 *     [-82.574787, 35.615581],
 *     [-82.545261, 35.615581],
 *     [-82.545261, 35.594087],
 *     [-82.574787, 35.594087]
 * ]], {"fill": "#0f0"});
 * var poly2 = turf.polygon([[
 *     [-82.560024, 35.585153],
 *     [-82.560024, 35.602602],
 *     [-82.52964, 35.602602],
 *     [-82.52964, 35.585153],
 *     [-82.560024, 35.585153]
 * ]], {"fill": "#00f"});
 *
 * var union = turf.union([poly1, poly2]);
 *
 */
export function union(polys: Array<turf.Feature<turf.Polygon>>): turf.Feature<turf.Polygon|turf.MultiPolygon> {
    return turf.union(...polys);
}
