/**
 * Turf feature functions.
 * http://turfjs.org/docs/
 */

/**
 *
 */

import * as turf from "@turf/turf";

/**
 * Calculates a buffer for input features for a given radius. Units supported are miles, kilometers, and degrees.
 *
 * When using a negative radius, the resulting geometry may be invalid if
 * it's too small compared to the radius magnitude. If the input is a
 * FeatureCollection, only valid members will be returned in the output
 * FeatureCollection - i.e., the output collection may have fewer members than
 * the input, or even be empty.
 *
 * @param {FeatureCollection|Geometry|Feature<any>} features input to be buffered
 * @param {number} radius distance to draw the buffer (negative values are allowed)
 * @param {Object} options Optional parameters
 * (units: "miles", "nauticalmiles", "degrees", "radians", "inches", "yards", "meters", "kilometers",
 * steps: number of steps)
 * @returns {FeatureCollection|Feature<Polygon|MultiPolygon>|undefined} buffered features
 * @example
 * var point = geo.create.point([-90.548630, 14.616599]);
 * var buffered = geo.feature.buffer(point, 500, {units: 'miles'});
 */
export function buffer(features: turf.GeometryObject|turf.Feature,radius: number,options: {units: turf.Units,steps: number}): turf.Feature {
    return turf.buffer(features,radius,options);
}

/**
 * Returns a cloned copy of the passed GeoJSON Object, including possible 'Foreign Members'.
 * ~3-5x faster than the common JSON.parse + JSON.stringify combo method.
 *
 * @param {GeoJSON} geojson GeoJSON Object
 * @returns {GeoJSON} cloned GeoJSON Object
 * @example
 * var line = geo.create.lineString([[-74, 40], [-78, 42], [-82, 35]], {color: 'red'});
 *
 * var lineCloned = geo.feature.clone(line);
 */
export function clone(geojson: turf.AllGeoJSON): turf.AllGeoJSON {
    return turf.clone(geojson);
}

/**
 * Takes a set of points and returns a concave hull Polygon or MultiPolygon.
 * Internally, this uses [turf-tin] (https://github.com/Turfjs/turf-tin) to generate geometries.
 *
 * @param {FeatureCollection<Point>} points input points
 * @param {Object} options Optional parameters
 * (maxEdge: the length (in 'units') of an edge necessary for part of the hull to become concave.,
 * units: can be "degrees", "radians", "miles", or "kilometers")
 * @returns {Feature<(Polygon|MultiPolygon)>|null} a concave hull (null value is returned if unable to compute hull)
 * @example
 * var points = geo.create.featureCollection([
 *   geo.create.point([-63.601226, 44.642643]),
 *   geo.create.point([-63.591442, 44.651436]),
 *   geo.create.point([-63.580799, 44.648749]),
 *   geo.create.point([-63.573589, 44.641788]),
 *   geo.create.point([-63.587665, 44.64533]),
 *   geo.create.point([-63.595218, 44.64765])
 * ]);
 * var options = {units: 'miles', maxEdge: 1};
 *
 * var hull = geo.feature.concave(points, options);
 */
export function concave(points: turf.FeatureCollection<turf.Point>,options: {maxEdge: number, units: turf.Units}): turf.Feature<turf.Polygon|turf.MultiPolygon>|null {
    return turf.concave(points,options);
}

/**
 * Takes a Feature or a FeatureCollection and returns a convex hull Polygon.
 *
 * Internally this uses
 * the [convex-hull] (https://github.com/mikolalysenko/convex-hull) module that
 * implements a [monotone chain hull] (http://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain).
 *
 * @param {GeoJSON} features input Feature or FeatureCollection
 * @param {Object} options Optional parameters
 * (concavity: 1 - thin shape. Infinity - convex hull.)
 * @returns {Feature<Polygon>} a convex hull
 * @example
 * var points = geo.create.featureCollection([
 *   geo.create.point([10.195312, 43.755225]),
 *   geo.create.point([10.404052, 43.8424511]),
 *   geo.create.point([10.579833, 43.659924]),
 *   geo.create.point([10.360107, 43.516688]),
 *   geo.create.point([10.14038, 43.588348]),
 *   geo.create.point([10.195312, 43.755225])
 * ]);
 *
 * var hull = geo.feature.convex(points);
 */
export function convex(features: turf.AllGeoJSON,options: {concavity: number}): turf.Feature<turf.Polygon> {
    return turf.convex(features,options);
}

/**
 * Dissolves a FeatureCollection of polygon features, filtered by an optional property name:value.
 * Note that mulitpolygon features within the collection are not supported
 *
 * @param {FeatureCollection<Polygon>} featureCollection input feature collection to be dissolved
 * @param {Object} options Optional parameters
 * (propertyName: features with equals 'propertyName' in `properties` will be merged)
 * @returns {FeatureCollection<Polygon>} a FeatureCollection containing the dissolved polygons
 * @example
 * var features = geo.create.featureCollection([
 *   geo.create.polygon([[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]], {combine: 'yes'}),
 *   geo.create.polygon([[[0, -1], [0, 0], [1, 0], [1, -1], [0,-1]]], {combine: 'yes'}),
 *   geo.create.polygon([[[1,-1],[1, 0], [2, 0], [2, -1], [1, -1]]], {combine: 'no'}),
 * ]);
 *
 * var dissolved = geo.feature.dissolve(features, {propertyName: 'combine'});
 */
export function dissolve(features: turf.FeatureCollection<turf.Polygon>,options: {propertyName: string}): turf.FeatureCollection<turf.Polygon> {
    return turf.dissolve(features,options);
}

// /**
//  * Get Geometry from Feature or Geometry Object
//  * Throws an error if geojson is not a Feature or Geometry Object.
//  *
//  * @param {Feature|Geometry} feature GeoJSON Feature or Geometry Object
//  * @returns {Geometry|null} GeoJSON Geometry Object
//  * @example
//  * var point = {
//  *   "type": "Feature",
//  *   "properties": {},
//  *   "geometry": {
//  *     "type": "Point",
//  *     "coordinates": [110, 40]
//  *   }
//  * }
//  * var geom = geo.feature.getGeom(point)
//  * //={"type": "Point", "coordinates": [110, 40]}
//  */
// export function getGeom(feature: turf.Feature): turf.GeometryObject|turf.GeometryCollection|null {
//     return turf.getGeom(feature);
// }

// /**
//  * Get GeoJSON object's type, Geometry type is prioritize.
//  *
//  * @param {GeoJSON} geojson GeoJSON object
//  * @returns {string} GeoJSON type
//  * @example
//  * var point = {
//  *   "type": "Feature",
//  *   "properties": {},
//  *   "geometry": {
//  *     "type": "Point",
//  *     "coordinates": [110, 40]
//  *   }
//  * }
//  * var geom = geo.feature.getType(point)
//  * //="Point"
//  */
// export function getType(geojson: turf.AllGeoJSON): string {
//     return turf.getType(geojson);
// }

/**
 * Takes a Feature or FeatureCollection and returns a Point guaranteed to be on the surface of the feature.
 *
 * * Given a Polygon, the point will be in the area of the polygon
 * * Given a LineString, the point will be along the string
 * * Given a Point, the point will the same as the input
 *
 * @param {GeoJSON} geojson any Feature or FeatureCollection
 * @returns {Feature<Point>} a point on the surface of `input`
 * @example
 * var polygon = geo.create.polygon([[
 *   [116, -36],
 *   [131, -32],
 *   [146, -43],
 *   [155, -25],
 *   [133, -9],
 *   [111, -22],
 *   [116, -36]
 * ]]);
 *
 * var pointOnPolygon = geo.feature.pointOn(polygon);
 */
export function pointOn(geojson: turf.AllGeoJSON): turf.Feature<turf.Point> {
    return turf.pointOnFeature(geojson);
}

/**
 * Takes a GeoJSON object and returns a simplified version. Internally uses
 * [simplify-js] (http://mourner.github.io/simplify-js/) to perform simplification using the Ramer-Douglas-Peucker algorithm.
 *
 * @param {GeoJSON} geojson object to be simplified
 * @param {Object} options Optional parameters
 * (tolerance: simplification tolerance,
 * highQuality: whether or not to spend more time to create a higher-quality simplification with a different algorithm,
 * mutate: allows GeoJSON input to be mutated (significant performance increase if true))
 * @returns {GeoJSON} a simplified GeoJSON
 * @example
 * var geojson = geo.create.polygon([[
 *   [-70.603637, -33.399918],
 *   [-70.614624, -33.395332],
 *   [-70.639343, -33.392466],
 *   [-70.659942, -33.394759],
 *   [-70.683975, -33.404504],
 *   [-70.697021, -33.419406],
 *   [-70.701141, -33.434306],
 *   [-70.700454, -33.446339],
 *   [-70.694274, -33.458369],
 *   [-70.682601, -33.465816],
 *   [-70.668869, -33.472117],
 *   [-70.646209, -33.473835],
 *   [-70.624923, -33.472117],
 *   [-70.609817, -33.468107],
 *   [-70.595397, -33.458369],
 *   [-70.587158, -33.442901],
 *   [-70.587158, -33.426283],
 *   [-70.590591, -33.414248],
 *   [-70.594711, -33.406224],
 *   [-70.603637, -33.399918]
 * ]]);
 * var options = {tolerance: 0.01, highQuality: false};
 * var simplified = geo.feature.simplify(geojson, options);
 */
export function simplify(geojson: turf.AllGeoJSON,options: {tolerance: number,highQuality: boolean,mutate: boolean}): turf.AllGeoJSON {
    return turf.simplify(geojson,options);
}

/**
 * Tesselates a Polygon into a FeatureCollection of triangular polygons
 * using [earcut] (https://github.com/mapbox/earcut).
 *
 * @param {Feature<Polygon>} poly the polygon to tesselate
 * @returns {FeatureCollection<Polygon>} a geometrycollection feature
 * @example
 * var poly = geo.create.polygon([[[11, 0], [22, 4], [31, 0], [31, 11], [21, 15], [11, 11], [11, 0]]]);
 * var triangles = geo.feature.tesselate(poly);
 */
export function tesselate(poly: turf.Feature<turf.Polygon>): turf.FeatureCollection<turf.Polygon> {
    return turf.tesselate(poly);
}
