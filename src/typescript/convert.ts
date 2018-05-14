/**
 * Turf FEATURE CONVERSION functions.
 * http://turfjs.org/docs/
 */

/**
 *
 */

 import * as turf from "@turf/turf";

/**
 * Combines a FeatureCollection of Point, LineString, or Polygon features
 * into MultiPoint, MultiLineString, or MultiPolygon features.
 *
 * @param {FeatureCollection<Point|LineString|Polygon>} fcoll a FeatureCollection of any type
 * @returns {FeatureCollection<MultiPoint|MultiLineString|MultiPolygon>} a Feature of corresponding type to input
 * @example
 * var fc = geo.create.featureCollection([
 *   geo.create.point([19.026432, 47.49134]),
 *   geo.create.point([19.074497, 47.509548])
 * ]);
 *
 * var combined = geo.convert.combine(fc);
 */
export function combine(fcoll: turf.FeatureCollection<turf.Point|turf.LineString|turf.Polygon>): turf.Feature {
    return turf.combine(fcoll);
}

/**
 * Takes a feature or set of features and returns all positions as Point|points.
 * Throws an error if it encounters an unknown geometry type
 *
 * @param {GeoJSON} geojson input features
 * @returns {FeatureCollection<point>} points representing the exploded input features
 * @example
 * var polygon = geo.create.polygon([[[-81, 41], [-88, 36], [-84, 31], [-80, 33], [-77, 39], [-81, 41]]]);
 *
 * var explode = geo.convert.explode(polygon);
 */
export function explode(geojson: turf.AllGeoJSON): turf.FeatureCollection<turf.Point> {
    return turf.explode(geojson);
}


/**
 * Flattens any GeoJSON to a FeatureCollection inspired by [geojson-flatten](https://github.com/tmcw/geojson-flatten).
 *
 * @param {GeoJSON} geojson any valid GeoJSON Object
 * @returns {FeatureCollection<any>} all Multi-Geometries are flattened into single Features
 * @example
 * var multiGeometry = geo.create.multiPolygon([
 *   [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]],
 *   [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
 *   [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]]
 * ]);
 *
 * var flatten = geo.convert.flatten(multiGeometry);
 */
export function flatten(geojson: turf.AllGeoJSON): turf.FeatureCollection {
    return turf.flatten(geojson);
}

/**
 * Converts (Multi)LineString(s) to Polygon(s).
 *
 * @param {FeatureCollection|Feature<LineString|MultiLineString>} lines Features to convert
 * @param {Object} [options={}] Optional parameters
 * @param {Object} [options.properties={}] translates GeoJSON properties to Feature
 * @param {boolean} [options.autoComplete=true] auto complete linestrings (matches first & last coordinates)
 * @param {boolean} [options.orderCoords=true] sorts linestrings to place outer ring at the first position of the coordinates
 * @returns {Feature<Polygon|MultiPolygon>} converted to Polygons
 * @example
 * var line = geo.create.lineString([[125, -30], [145, -30], [145, -20], [125, -20], [125, -30]]);
 *
 * var polygon = geo.convert.lineToPolygon(line);
 */
export function lineToPolygon(lines: turf.FeatureCollection<turf.LineString|turf.MultiLineString>, options: {properties: object, autoComplete: boolean, orderCoords: boolean}): turf.Feature<turf.Polygon|turf.MultiPolygon> {
    return turf.lineToPolygon(lines, options);
}

/**
 * Polygonizes LineString or MultiLineString(s) into Polygons.
 *
 * Implementation of GEOSPolygonize function (`geos::operation::polygonize::Polygonizer`).
 *
 * Polygonizes a set of lines that represents edges in a planar graph. Edges must be correctly
 * noded, i.e., they must only meet at their endpoints.
 *
 * The implementation correctly handles:
 *
 * - Dangles: edges which have one or both ends which are not incident on another edge endpoint.
 * - Cut Edges (bridges): edges that are connected at both ends but which do not form part of a polygon.
 *
 * Throws an error is geoJson is invalid.
 *
 * @param {FeatureCollection|Geometry|Feature<LineString|MultiLineString>} lines Lines in order to polygonize
 * @returns {FeatureCollection<Polygon>} Polygons created
 */
export function polygonize(lines: turf.FeatureCollection<turf.LineString|turf.MultiLineString>): turf.FeatureCollection<turf.Polygon> {
    return turf.polygonize(lines);
}

/**
 * Converts a Polygon to LineString|(Multi)LineString or MultiPolygon to a FeatureCollection of LineString|(Multi)LineString.
 *
 * @param {Feature<Polygon|MultiPolygon>} polygon Feature to convert
 * @param {Object} options Optional parameters
 * (properties: an Object that is used as the Feature's propertiese)
 * @returns {FeatureCollection|Feature<LineString|MultiLinestring>} converted (Multi)Polygon to (Multi)LineString
 * @example
 * var poly = geo.create.polygon([[[125, -30], [145, -30], [145, -20], [125, -20], [125, -30]]]);
 *
 * var line = geo.convert.polygonToLine(poly);
 */
export function polygonToLine(polygon: turf.Polygon|turf.MultiPolygon, options: {properties: object}): turf.FeatureCollection|turf.Feature<turf.LineString|turf.MultiLineString> {
    return turf.polygonToLine(polygon, options);
}
