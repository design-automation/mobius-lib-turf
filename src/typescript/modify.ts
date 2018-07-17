/**
 * Turf HELPER functions.
 * http://turfjs.org/docs/
 */

/**
 *
 */
 import * as turf from "@turf/turf";

/**
 * Removes redundant coordinates from any GeoJSON Geometry.
 *
 * @param {Geometry|Feature} feature Feature or Geometry
 * @param {Object} options Optional parameters
 * (mutate: allows GeoJSON input to be mutated if true)
 * @returns {Geometry|Feature} the cleaned input Feature/Geometry
 * @example
 * var line = geo.create.lineString([[0, 0], [0, 2], [0, 5], [0, 8], [0, 8], [0, 10]]);
 * var multiPoint = geo.create.multiPoint([[0, 0], [0, 0], [2, 2]]);
 *
 * geo.coords.cleanCoords(line).geometry.coordinates;
 * //= [[0, 0], [0, 10]]
 *
 * geo.coords.cleanCoords(multiPoint).geometry.coordinates;
 * //= [[0, 0], [2, 2]]
 */
export function coordsClean(feature: turf.Feature|turf.GeometryObject/*, options: {mutate: boolean}*/): void/*turf.Feature|turf.GeometryObject*/ {
    turf.cleanCoords(feature, {mutate: true});
    return void;
}

/**
 * Takes input features and flips all of their coordinates from `[x, y]` to `[y, x]`.
 *
 * @param {GeoJSON} features input features
 * @param {Object} options Optional parameters
 *(mutate: allows GeoJSON input to be mutated if true (significant performance increase))
 * @returns {GeoJSON} a feature or set of features of the same type as `input` with flipped coordinates
 * @example
 * var serbia = geo.create.point([20.566406, 43.421008]);
 *
 * var saudiArabia = geo.coords.flip(serbia);
 */
export function coordsFlip(features: turf.AllGeoJSON/*, options: {mutate: boolean}*/): void/*turf.AllGeoJSON*/ {
    turf.flip(features, {mutate: true});
    return void;
}

/**
 * Rewind (Multi)LineString or (Multi)Polygon outer ring counterclockwise and inner rings clockwise (http://en.wikipedia.org/wiki/Shoelace_formula|Shoelace Formula).
 *
 * @param {GeoJSON} features input GeoJSON Polygon
 * @param {Object} options Optional parameters
 * (reverse: enable reverse winding,
 * mutate: allows GeoJSON input to be mutated if true (significant performance increase))
 * @returns {GeoJSON} rewind Polygon
 * @example
 * var polygon = geo.create.polygon([[[121, -29], [138, -29], [138, -18], [121, -18], [121, -29]]]);
 *
 * var rewind = geo.coords.rewind(polygon);
 */
export function coordsRewind(features: turf.AllGeoJSON/*, options: {reverse: boolean, mutate: boolean}*/): void/*turf.AllGeoJSON*/ {
    turf.rewind(features, {mutate: true});
    return void;
}

/**
 * Takes a GeoJSON Feature or FeatureCollection and truncates the precision of the geometry.
 *
 * @param {GeoJSON} features any GeoJSON Feature, FeatureCollection, Geometry or GeometryCollection.
 * @param {Object} options Optional parameters
 * (precision: coordinate decimal precision,
 * coordinates: maximum number of coordinates (primarly used to remove z coordinates),
 * mutate: allows GeoJSON input to be mutated if true (significant performance increase))
 * @param {number} precision coordinate decimal precision
 * @returns {GeoJSON} layer with truncated geometry
 * @example
 * var point = geo.create.point([
 *     70.46923055566859,
 *     58.11088890802906,
 *     1508
 * ]);
 * var options = {precision: 3, coordinates: 2};
 * var truncated = geo.coords.truncate(point, options);
 * //=truncated.geometry.coordinates => [70.469, 58.111]
 */
export function coordsTruncate(features: turf.AllGeoJSON, precision: number): void/*turf.AllGeoJSON*/ {
    turf.truncate(features, {precision: precision, mutate: true});
    return void;
}

/**
 * Takes a set of Point|points and partition them into clusters using the k-mean .
 * It uses the [k-means algorithm](https://en.wikipedia.org/wiki/K-means_clustering)
 *
 * @param {FeatureCollection<Point>} points to be clustered
 * @param {Object} options Optional parameters
 * (numberOfClusters: numberOfClusters that will be generated,
 * mutate: allows GeoJSON input to be mutated if true (significant performance increase))
 * @param {number} num number of clusters that will be generated
 * @returns {FeatureCollection<Point>} Clustered Points with an additional two properties associated to each Feature:
 * - {number} cluster - the associated clusterId
 * - {[number, number]} centroid - Centroid of the cluster [Longitude, Latitude]
 * @example
 * // create random points with random z-values in their properties
 * var points = geo.random.point(100, {bbox: [0, 30, 20, 50]});
 * var options = {numberOfClusters: 7};
 * var clustered = geo.cluster.kmeans(points, options);
 */
export function pointsClusterKmeans(points: turf.FeatureCollection<turf.Point>, num: number): void/*turf.FeatureCollection<turf.Point>*/ {
    turf.clustersKmeans(points, {numberOfClusters:num, mutate:true});
    return void;
}

/**
 * Takes a GeoJSON object and returns a simplified version. Internally uses
 * [simplify-js] (http://mourner.github.io/simplify-js/) to perform simplification using the Ramer-Douglas-Peucker algorithm.
 *
 * @param {GeoJSON} features object to be simplified
 * @param {Object} options Optional parameters
 * (tolerance: simplification tolerance,
 * highQuality: whether or not to spend more time to create a higher-quality simplification with a different algorithm,
 * mutate: allows GeoJSON input to be mutated (significant performance increase if true))
 * @param {number} tolerance: simplification tolerance
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
export function simplify(features: turf.AllGeoJSON, tolerance: number): void/*turf.AllGeoJSON*/ {
    turf.simplify(features,{tolerance:tolerance, mutate:true});
    return void;
}

/**
 * Takes a GeoJSON object and returns a simplified version. Internally uses
 * [simplify-js] (http://mourner.github.io/simplify-js/) to perform simplification using the Ramer-Douglas-Peucker algorithm.
 *
 * @param {GeoJSON} features object to be simplified
 * @param {Object} options Optional parameters
 * (tolerance: simplification tolerance,
 * highQuality: whether or not to spend more time to create a higher-quality simplification with a different algorithm,
 * mutate: allows GeoJSON input to be mutated (significant performance increase if true))
 * @param {number} tolerance: simplification tolerance
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
export function simplifyExact(features: turf.AllGeoJSON, tolerance: number): void/*turf.AllGeoJSON*/ {
    turf.simplify(features,{tolerance:tolerance, highQuality: true, mutate:true});
    return void;
}

/**
 * Rotates any geojson Feature or Geometry of a specified angle, around its `centroid` or a given `pivot` point;
 * all rotations follow the [right-hand rule] (https://en.wikipedia.org/wiki/Right-hand_rule)
 *
 * @param {GeoJSON} features object to be rotated
 * @param {number} angle of rotation (along the vertical axis), from North in decimal degrees, negative clockwise
 * @param {Object} options Optional parameters
 * (pivot: point around which the rotation will be performed,
 * mutate: allows GeoJSON input to be mutated (significant performance increase if true))
 * @param {Feature} pivot point around which the rotation will be performed
 * @returns {GeoJSON} the rotated GeoJSON feature
 * @example
 * var poly = geo.create.polygon([[[0,29],[3.5,29],[2.5,32],[0,29]]]);
 * var options = {pivot: [0, 25]};
 * var rotatedPoly = geo.xform.transformRotate(poly, 10, options);
 */
export function transformRotate(features: turf.AllGeoJSON,angle: number,pivot: turf.Point): void/*turf.AllGeoJSON*/ {
    turf.transformRotate(features,angle,{pivot:pivot,mutate:true});
    return void;
}

/**
 * Moves any geojson Feature or Geometry of a specified distance along a Rhumb Line
 * on the provided direction angle.
 *
 * @param {GeoJSON} features object to be translated
 * @param {number} distance length of the motion; negative values determine motion in opposite direction
 * @param {number} direction of the motion; angle from North in decimal degrees, positive clockwise
 * @param {Object} options Optional parameters
 * (units: in which `distance` will be express; miles, kilometers, degrees, or radians,
 * zTranslation: length of the vertical motion, same unit of distance,
 * mutate: allows GeoJSON input to be mutated (significant performance increase if true))
 * @returns {GeoJSON} the translated GeoJSON object
 * @example
 * var poly = geo.create.polygon([[[0,29],[3.5,29],[2.5,32],[0,29]]]);
 * var translatedPoly = geo.xform.translate(poly, 100, 35);
 */
export function transformTranslate(features: turf.AllGeoJSON,distance: number,direction: number/*,options: {units: turf.Units,zTranslation: number, mutate: boolean}*/): void/*turf.AllGeoJSON*/ {
    turf.transformTranslate(features,distance,direction,{mutate:true});
    return void;
}

/**
 * Scale a GeoJSON from a given point by a factor of scaling (ex: factor=2 would make the GeoJSON 200% larger).
 * If a FeatureCollection is provided, the origin point will be calculated based on each individual Feature.
 *
 * @param {GeoJSON} features GeoJSON to be scaled
 * @param {number} factor of scaling, positive or negative values greater than 0
 * @param {Object} options Optional parameters
 * (origin: Point from which the scaling will occur (string options: sw/se/nw/ne/center/centroid),
 * mutate: allows GeoJSON input to be mutated (significant performance increase if true))
 * @returns {GeoJSON} scaled GeoJSON
 * @example
 * var poly = geo.create.polygon([[[0,29],[3.5,29],[2.5,32],[0,29]]]);
 * var scaledPoly = geo.xform.scale(poly, 3);
 */
export function transformScale(features: turf.AllGeoJSON,factor: number, origin: "sw"|"se"|"nw"|"ne"|"center"|"centroid"|turf.Feature<turf.Point>): void/*turf.AllGeoJSON*/ {
    turf.transformScale(features,factor,{origin:origin,mutate:true});
    return void;
}
