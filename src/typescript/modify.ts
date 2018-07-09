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
export function coordsClean(feature: turf.Feature|turf.GeometryObject/*, options: {mutate: boolean}*/): turf.Feature|turf.GeometryObject {
    return turf.cleanCoords(feature, {mutate: true});
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
export function coordsFlip(features: turf.AllGeoJSON/*, options: {mutate: boolean}*/): turf.AllGeoJSON {
    return turf.flip(features, {mutate: true});
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
export function coordsRewind(features: turf.AllGeoJSON/*, options: {reverse: boolean, mutate: boolean}*/): turf.AllGeoJSON {
    return turf.rewind(features, {mutate: true});
}

/**
 * Round number to precision
 *
 * @param {number} num Number
 * @param {number} [precision=0] Precision
 * @returns {number} rounded number
 * @example
 * geo.coords.round(120.4321)
 * //=120
 *
 * geo.coords.round(120.4321, 2)
 * //=120.43
 */
export function coordsRound(num: number, precision: number): number {
    return turf.round(num, precision);
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
export function coordsTruncate(features: turf.AllGeoJSON, precision: number): turf.AllGeoJSON {
    return turf.truncate(features, {precision: precision, mutate: true});
}

 /**
 * Takes a feature or set of features and returns all positions as Point|points.
 * Throws an error if it encounters an unknown geometry type
 *
 * @param {GeoJSON} features input features
 * @returns {FeatureCollection<point>} points representing the exploded input features
 * @example
 * var polygon = geo.create.polygon([[[-81, 41], [-88, 36], [-84, 31], [-80, 33], [-77, 39], [-81, 41]]]);
 *
 * var explode = geo.convert.explode(polygon);
 */
export function explodeToPoints(features: turf.AllGeoJSON): turf.FeatureCollection<turf.Point> {
    return turf.explode(features);
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
export function lineToPolygon(lines: turf.FeatureCollection<turf.LineString|turf.MultiLineString>/*, options: {properties: object, autoComplete: boolean, orderCoords: boolean}*/): turf.Feature<turf.Polygon|turf.MultiPolygon> {
    return turf.lineToPolygon(lines/*, options*/);
}

/**
 * Merges a specified property from a FeatureCollection of points into a
 * FeatureCollection of polygons. Given an `inProperty` on points and an `outProperty`
 * for polygons, this finds every point that lies within each polygon, collects the
 * `inProperty` values from those points, and adds them as an array to `outProperty`
 * on the polygon.
 *
 * @param {FeatureCollection<Polygon>} polygons polygons with values on which to aggregate
 * @param {FeatureCollection<Point>} points points to be aggregated
 * @param {string} inProperty property to be nested from
 * @param {string} outProperty property to be nested into
 * @returns {FeatureCollection<Polygon>} polygons with properties listed based on `outField`
 * @example
 * var poly1 = geo.create.polygon([[[0,0],[10,0],[10,10],[0,10],[0,0]]]);
 * var poly2 = geo.create.polygon([[[10,0],[20,10],[20,20],[20,0],[10,0]]]);
 * var polyFC = geo.create.featureCollection([poly1, poly2]);
 * var pt1 = geo.create.point([5,5], {population: 200});
 * var pt2 = geo.create.point([1,3], {population: 600});
 * var pt3 = geo.create.point([14,2], {population: 100});
 * var pt4 = geo.create.point([13,1], {population: 200});
 * var pt5 = geo.create.point([19,7], {population: 300});
 * var pointFC = geo.create.featureCollection([pt1, pt2, pt3, pt4, pt5]);
 * var collected = geo.prop.collect(polyFC, pointFC, 'population', 'values');
 * var values = collected.features[0].properties.values
 * //=values => [200, 600]
 */
export function polygonCollect(polygons: turf.FeatureCollection<turf.Polygon>,points: turf.FeatureCollection<turf.Point>,inProperty: string,outProperty: string): turf.FeatureCollection<turf.Polygon> {
    return turf.collect(polygons,points,inProperty,outProperty);
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
 * Takes any type of polygon and an optional mask and returns a polygon exterior ring with holes.
 *
 * @param {FeatureCollection|Feature<Polygon|MultiPolygon>} polygon1 GeoJSON Polygon used as interior rings or holes.
 * @param {Feature<Polygon>} polygon2 GeoJSON Polygon used as the exterior ring (if undefined, the world extent is used)
 * @returns {Feature<Polygon>} Masked Polygon (exterior ring with holes).
 * @example
 * var polygon = geo.create.polygon([[[112, -21], [116, -36], [146, -39], [153, -24], [133, -10], [112, -21]]]);
 * var mask = geo.create.polygon([[[90, -55], [170, -55], [170, 10], [90, 10], [90, -55]]]);
 *
 * var masked = geo.misc.mask(polygon, mask);
 */
export function polygonMask(polygon1: turf.FeatureCollection<turf.Polygon|turf.MultiPolygon>|turf.Feature<turf.Polygon|turf.MultiPolygon>,polygon2: turf.Feature<turf.Polygon>): turf.Feature<turf.Polygon> {
    return turf.mask(polygon1,polygon2);
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
export function polygonToLine(polygon: turf.Polygon|turf.MultiPolygon/*, options: {properties: object}*/): turf.FeatureCollection|turf.Feature<turf.LineString|turf.MultiLineString> {
    return turf.polygonToLine(polygon/*, options*/);
}

/**
 * Takes a kinked polygon and returns a feature collection of polygons that have no kinks.
 * Uses [simplepolygon](https://github.com/mclaeysb/simplepolygon) internally.
 *
 * @param {FeatureCollection|Feature<Polygon|MultiPolygon>} polygon GeoJSON Polygon or MultiPolygon
 * @returns {FeatureCollection<Polygon>} Unkinked polygons
 * @example
 * var poly = geo.create.polygon([[[0, 0], [2, 0], [0, 2], [2, 2], [0, 0]]]);
 *
 * var result = geo.misc.unkinkPolygon(poly);
 */
export function polygonUnkink(polygon: turf.FeatureCollection<turf.Polygon|turf.MultiPolygon>|turf.Feature<turf.Polygon|turf.MultiPolygon>): turf.FeatureCollection<turf.Polygon> {
    return turf.unkinkPolygon(polygon);
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
export function simplify(features: turf.AllGeoJSON, tolerance: number): turf.AllGeoJSON {
    return turf.simplify(features,{tolerance:tolerance, mutate:true});
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
export function simplifyExact(features: turf.AllGeoJSON, tolerance: number): turf.AllGeoJSON {
    return turf.simplify(features,{tolerance:tolerance, highQuality: true, mutate:true});
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
export function rotate(features: turf.AllGeoJSON,angle: number,pivot: turf.Point): turf.AllGeoJSON {
    return turf.transformRotate(features,angle,{pivot:pivot,mutate:true});
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
export function translate(features: turf.AllGeoJSON,distance: number,direction: number/*,options: {units: turf.Units,zTranslation: number, mutate: boolean}*/): turf.AllGeoJSON {
    return turf.transformTranslate(features,distance,direction,{mutate:true});
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
export function scale(features: turf.AllGeoJSON,factor: number, origin: "sw"|"se"|"nw"|"ne"|"center"|"centroid"|turf.Feature<turf.Point>): turf.AllGeoJSON {
    return turf.transformScale(features,factor,{origin:origin,mutate:true});
}
