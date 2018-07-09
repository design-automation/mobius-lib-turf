/**
 * Turf HELPER functions.
 * http://turfjs.org/docs/
 */

/**
 *
 */
 import * as turf from "@turf/turf";

 /**
 * Takes one or more features and returns their area in square meters.
 *
 * @param {GeoJSON} features input GeoJSON feature(s)
 * @returns {number} area in square meters
 * @example
 * var polygon = geo.create.polygon([[[125, -15], [113, -22], [154, -27], [144, -15], [125, -15]]]);
 *
 * var area = geo.calc.area(polygon);
 */
export function area(features: turf.AllGeoJSON): number {
    return turf.area(features);
}

/**
 * Takes two Point|points and finds the geographic bearing between them,
 * i.e. the angle measured in degrees from the north line (0 degrees)
 *
 * @param {Coord} point1 starting Point
 * @param {Coord} point2 ending Point
 * @param {Object} options Optional parameters
 * (final: Calculates the final bearing if true)
 * @returns {number} angle in decimal degrees, between -180 and 180 degrees (positive clockwise)
 * @example
 * var point1 = geo.create.point([-75.343, 39.984]);
 * var point2 = geo.create.point([-75.534, 39.123]);
 *
 * var bearing = geo.calc.bearing(point1, point2);
 */
export function bearing(point1: turf.Point, point2: turf.Point, options: {final: boolean}): number {
    return turf.bearing(point1, point2, options);
}

/**
 * Returns True if the second geometry is completely contained by the first geometry.
 * The interiors of both geometries must intersect and, the interior and boundary of the secondary (geometry b)
 * must not intersect the exterior of the primary (geometry a).
 * (Opposite result of within.)
 *
 * @param {Geometry|Feature<any>} feature1 GeoJSON Feature or Geometry
 * @param {Geometry|Feature<any>} feature2 GeoJSON Feature or Geometry
 * @returns {boolean} true/false
 * @example
 * var line = geo.create.lineString([[1, 1], [1, 2], [1, 3], [1, 4]]);
 * var point = geo.create.point([1, 2]);
 *
 * geo.compare.contains(line, point);
 * //=true
 */
export function contains(feature1: turf.Feature, feature2: turf.Feature): boolean {
    return turf.booleanContains(feature1, feature2);
}

/**
 * Returns true if the intersection results in a geometry whose dimension is one less than
 * the maximum dimension of the two source geometries and the intersection set is interior to
 * both source geometries.
 *
 * Returns true for only multipoint/polygon, multipoint/linestring, linestring/linestring, linestring/polygon, and linestring/multipolygon comparisons.
 *
 * @param {Geometry|Feature<any>} feature1 GeoJSON Feature or Geometry
 * @param {Geometry|Feature<any>} feature2 GeoJSON Feature or Geometry
 * @returns {boolean} true/false
 * @example
 * var line1 = geo.create.lineString([[-2, 2], [4, 2]]);
 * var line2 = geo.create.lineString([[1, 1], [1, 2], [1, 3], [1, 4]]);
 *
 * var cross = geo.compare.crosses(line1, line2);
 * //=true
 */
export function crosses(feature1: turf.Feature, feature2: turf.Feature): boolean {
    return turf.booleanCrosses(feature1, feature2);
}

/**
 * Returns true if the intersection of the two geometries is an empty set.
 *
 * @param {Geometry|Feature<any>} feature1 GeoJSON Feature or Geometry
 * @param {Geometry|Feature<any>} feature2 GeoJSON Feature or Geometry
 * @returns {boolean} true/false
 * @example
 * var point = geo.create.point([2, 2]);
 * var line = geo.create.lineString([[1, 1], [1, 2], [1, 3], [1, 4]]);
 *
 * geo.compare.disjoint(line, point);
 * //=true
 */
export function disjoint(feature1: turf.Feature, feature2: turf.Feature): boolean {
    return turf.booleanDisjoint(feature1, feature2);
}

/**
 * Calculates the distance between two points in degrees, radians,
 * miles, or kilometers. This uses the
 * [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula)
 * to account for global curvature.
 *
 * @param {Coord} point1 origin point
 * @param {Coord} point2 destination point
 * @param {Object} options Optional parameters
 * (units: "miles", "kilometers", "degrees", or "radians")
 * @returns {number} distance between the two points
 * @example
 * var from = geo.create.point([-75.343, 39.984]);
 * var to = geo.create.point([-75.534, 39.123]);
 * var options = {units: 'miles'};
 *
 * var distance = geo.calc.distance(from, to, options);
 */
export function distance(point1: turf.Point, point2: turf.Point/*, options: {units: turf.Units}*/): number {
    return (turf.distance(point1, point2/*, options*/))*1000;
}

/**
 * Determine whether two geometries of the same type have identical X,Y coordinate values.
 * See http://edndoc.esri.com/arcsde/9.0/general_topics/understand_spatial_relations.htm
 *
 * @param {Geometry|Feature} feature1 GeoJSON input
 * @param {Geometry|Feature} feature2 GeoJSON input
 * @returns {boolean} true if the objects are equal, false otherwise
 * @example
 * var pt1 = geo.create.point([0, 0]);
 * var pt2 = geo.create.point([0, 0]);
 * var pt3 = geo.create.point([1, 1]);
 *
 * geo.compare.equal(pt1, pt2);
 * //= true
 * geo.compare.equal(pt2, pt3);
 * //= false
 */
export function equal(feature1: turf.Feature, feature2: turf.Feature): boolean {
    return turf.booleanEqual(feature1, feature2);
}

/**
 * Get all coordinates from any GeoJSON object.
 *
 * @param {FeatureCollection|Feature|Geometry} features any GeoJSON object
 * @returns {Array<Array<number>>} coordinate position array
 * @example
 * var features = geo.create.featureCollection([
 *   geo.create.point([26, 37], {foo: 'bar'}),
 *   geo.create.point([36, 53], {hello: 'world'})
 * ]);
 *
 * var coords = geo.coords.getCoords(features);
 * //= [[26, 37], [36, 53]]
 */
export function getCoordsAll(features: turf.AllGeoJSON): number[][] {
    return turf.coordAll(features);
}

/**
 * Get Cluster
 *
 * @param {FeatureCollection} geojson GeoJSON Features
 * @param {*} filter Filter used on GeoJSON properties to get Cluster
 * @returns {FeatureCollection} Single Cluster filtered by GeoJSON Properties
 * @example
 * var geojson = geo.create.featureCollection([
 *     turf.point([0, 0], {'marker-symbol': 'circle'}),
 *     turf.point([2, 4], {'marker-symbol': 'star'}),
 *     turf.point([3, 6], {'marker-symbol': 'star'}),
 *     turf.point([5, 1], {'marker-symbol': 'square'}),
 *     turf.point([4, 2], {'marker-symbol': 'circle'})
 * ]);
 *
 * // Create a cluster using K-Means (adds `cluster` to GeoJSON properties)
 * var clustered = geo.cluster.kmeans(geojson);
 *
 * // Retrieve first cluster (0)
 * var cluster = geo.cluster.get(clustered, {cluster: 0});
 * //= cluster
 *
 * // Retrieve cluster based on custom properties
 * geo.cluster.get(clustered, {'marker-symbol': 'circle'}).length;
 * //= 2
 * geo.cluster.get(clustered, {'marker-symbol': 'square'}).length;
 * //= 1
 */
export function getCluster(fcoll: turf.FeatureCollection<turf.GeometryObject>, filter: any): turf.FeatureCollection<turf.GeometryObject> {
    return turf.getCluster(fcoll, filter);
}

/**
 * Takes a ring and return true or false whether or not the ring is clockwise or counter-clockwise.
 *
 * @param {Feature<LineString>} line to be evaluated
 * @returns {boolean} true/false
 * @example
 * var clockwiseRing = geo.create.lineString([[0,0],[1,1],[1,0],[0,0]]);
 * var counterClockwiseRing = geo.create.lineString([[0,0],[1,0],[1,1],[0,0]]);
 *
 * geo.misc.isClockwise(clockwiseRing)
 * //=true
 * geo.misc.isClockwise(counterClockwiseRing)
 * //=false
 */
export function clockwise(line: turf.Feature<turf.LineString>): boolean {
    return turf.booleanClockwise(line);
}

/**
 * Returns True if each segment of `line1` is parallel to the correspondent segment of `line2`
 *
 * @param {Geometry|Feature<LineString>} line1 GeoJSON Feature or Geometry
 * @param {Geometry|Feature<LineString>} line2 GeoJSON Feature or Geometry
 * @returns {boolean} true/false if the lines are parallel
 * @example
 * var line1 = geo.create.lineString([[0, 0], [0, 1]]);
 * var line2 = geo.create.lineString([[1, 0], [1, 1]]);
 *
 * geo.compare.parallel(line1, line2);
 * //=true
 */
export function Parallel(line1: turf.LineString, line2: turf.LineString): boolean {
    return turf.booleanParallel(line1, line2);
}

/**
 * Takes a GeoJSON and measures its length in the specified units, (Multi)Point's distance are ignored.
 *
 * @param {GeoJSON} features GeoJSON to measure
 * @param {Object} options Optional parameters
 * (units: "miles", "kilometers", "degrees", or "radians")
 * @returns {number} length of GeoJSON
 * @example
 * var line = geo.create.lineString([[115, -32], [131, -22], [143, -25], [150, -34]]);
 * var length = geo.calc.length(line, {units: 'miles'});
 */
export function len(features: turf.AllGeoJSON/*, options: {units: turf.Units}*/): number {
    return (turf.length(features/*, options*/))*1000;
}

/**
 * Takes a Point and a Polygon or MultiPolygon and determines if the point resides inside the polygon. The polygon can
 * be convex or concave. The function accounts for holes.
 *
 * @param {Coord} point input point
 * @param {Feature<Polygon|MultiPolygon>} polygon input polygon or multipolygon
 * @param {Object} options Optional parameters
 * (ignoreBoundary: True if polygon boundary should be ignored when determining if the point is inside the polygon otherwise false.)
 * @param {boolean} ignoreBoundary True if polygon boundary should be ignored when determining if the point is inside the polygon otherwise false.
 * @returns {boolean} `true` if the Point is inside the Polygon; `false` if the Point is not inside the Polygon
 * @example
 * var pt = geo.create.point([-77, 44]);
 * var poly = geo.create.polygon([[
 *   [-81, 41],
 *   [-81, 47],
 *   [-72, 47],
 *   [-72, 41],
 *   [-81, 41]
 * ]]);
 *
 * geo.compare.pointInPolygon(pt, poly);
 * //= true
 */
export function pointInPolygon(point: turf.Point, polygon: turf.Polygon, ignoreBoundary: boolean): boolean {
    return turf.booleanPointInPolygon(point, polygon, {ignoreBoundary: ignoreBoundary});
}

/**
 * Returns true if a point is on a line. Accepts a optional parameter to ignore the start and end vertices of the linestring.
 *
 * @param {Coord} point GeoJSON Point
 * @param {Feature<LineString>} line GeoJSON LineString
 * @param {boolean} ignoreEndVertices ignore the start and end vertices if true.
 * @param {Object} options Optional parameters
 * (ignoreEndVertices: ignore the start and end vertices if true.)
 * @returns {boolean} true/false
 * @example
 * var pt = geo.create.point([0, 0]);
 * var line = geo.create.lineString([[-1, -1],[1, 1],[1.5, 2.2]]);
 * var isPointOnLine = geo.compare.pointOnLine(pt, line);
 * //=true
 */
export function pointOnLine(point: turf.Point, line: turf.LineString, ignoreEndVertices: boolean): boolean {
    return turf.booleanPointOnLine(point, line, {ignoreEndVertices: ignoreEndVertices});
}

/**
 * Returns true if the first geometry is completely within the second geometry.
 * The interiors of both geometries must intersect and, the interior and boundary of the primary (geometry a)
 * must not intersect the exterior of the secondary (geometry b).
 * (Opposite result of the contains.)
 *
 * @param {Geometry|Feature<any>} feature1 GeoJSON Feature or Geometry
 * @param {Geometry|Feature<any>} feature2 GeoJSON Feature or Geometry
 * @returns {boolean} true/false
 * @example
 * var line = geo.create.lineString([[1, 1], [1, 2], [1, 3], [1, 4]]);
 * var point = geo.create.point([1, 2]);
 *
 * geo.compare.within(point, line);
 * //=true
 */
export function within(feature1: turf.Feature, feature2: turf.Feature): boolean {
    return turf.booleanWithin(feature1, feature2);
}


/**
 * Takes a triangular plane as a Polygon
 * and a Point within that triangle and returns the z-value
 * at that point. The Polygon should have properties `a`, `b`, and `c`
 * that define the values at its three corners. Alternatively, the z-values
 * of each triangle point can be provided by their respective 3rd coordinate
 * if their values are not provided as properties.
 *
 * @param {Coord} point the Point for which a z-value will be calculated
 * @param {Feature<Polygon>} triangle a Polygon feature with three vertices
 * @returns {number} the z-value for `interpolatedPoint`
 * @example
 * var point = geo.create.point([-75.3221, 39.529]);
 * // "a", "b", and "c" values represent the values of the coordinates in order.
 * var triangle = geo.create.polygon([[
 *   [-75.1221, 39.57],
 *   [-75.58, 39.18],
 *   [-75.97, 39.86],
 *   [-75.1221, 39.57]
 * ]], {
 *   "a": 11,
 *   "b": 122,
 *   "c": 44
 * });
 *
 * var zValue = geo.ipolate.planepoint(point, triangle);
 * point.properties.zValue = zValue;
 */
export function planepoint(point: turf.Point,triangle: turf.Feature<turf.Polygon>): number {
    return turf.planepoint(point,triangle);
}

/**
 * Returns the minimum distance between a Point and a LineString, being the distance from a line the
 * minimum distance between the point and any segment of the `LineString`.
 *
 * @param {Coord} point Feature or Geometry
 * @param {Feature<LineString>} line GeoJSON Feature or Geometry
 * @param {Object} options Optional parameters
 * (units: "miles", "kilometers", "degrees", or "radians"
 * mercerator: distance on Mercator if true or WGS84 projection if false)
 * @returns {number} distance between point and line
 * @example
 * var pt = geo.create.point([0, 0]);
 * var line = geo.create.lineString([[1, 1],[-1, 1]]);
 *
 * var distance = geo.calc.pointToLineDistance(pt, line, {units: 'miles'});
 * //=69.11854715938406
 */
export function pointToLineDistance(point: turf.Point, line: turf.LineString/*, options: {units: turf.Units, mercator: boolean}*/): number {
    return (turf.pointToLineDistance(point, line/*, options*/))*1000;
}
