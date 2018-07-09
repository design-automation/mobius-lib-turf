/**
 * Turf BOOLEANS functions.
 * http://turfjs.org/docs/
 */

/**
 *
 */

 import * as turf from "@turf/turf";

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
export function parallel(line1: turf.LineString, line2: turf.LineString): boolean {
    return turf.booleanParallel(line1, line2);
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
