/**
 * Turf measurement functions.
 * http://turfjs.org/docs/
 */

/**
 *
 */
import * as turf from "@turf/turf";

/**
 * Takes one or more features and returns their area in square meters.
 *
 * @param {GeoJSON} geojson input GeoJSON feature(s)
 * @returns {number} area in square meters
 * @example
 * var polygon = geo.create.polygon([[[125, -15], [113, -22], [154, -27], [144, -15], [125, -15]]]);
 *
 * var area = geo.calc.area(polygon);
 */
export function area(geojson: turf.AllGeoJSON): number {
    return turf.area(geojson);
}

/**
 * Takes two Point|points and finds the geographic bearing between them,
 * i.e. the angle measured in degrees from the north line (0 degrees)
 *
 * @param {Coord} start starting Point
 * @param {Coord} end ending Point
 * @param {Object} options Optional parameters
 * (final: Calculates the final bearing if true)
 * @returns {number} angle in decimal degrees, between -180 and 180 degrees (positive clockwise)
 * @example
 * var point1 = geo.create.point([-75.343, 39.984]);
 * var point2 = geo.create.point([-75.534, 39.123]);
 *
 * var bearing = geo.calc.bearing(point1, point2);
 */
export function bearing(start: turf.Point, end: turf.Point, options: {final: boolean}): number {
    return turf.bearing(start, end, options);
}

/**
 * Takes a Feature or FeatureCollection and returns the absolute center point of all features.
 *
 * @param {GeoJSON} geojson GeoJSON to be centered
 * @param {Object} options Optional parameters
 * (properties: an Object that is used as the Feature's properties)
 * @returns {Feature<Point>} a Point feature at the absolute center point of all input features
 * @example
 * var features = geo.create.featureCollection([
 *   geo.create.point( [-97.522259, 35.4691]),
 *   geo.create.point( [-97.502754, 35.463455]),
 *   geo.create.point( [-97.508269, 35.463245])
 * ]);
 *
 * var center = geo.calc.center(features);
 */
export function center(geojson: turf.AllGeoJSON, options: {properties: object}): turf.Feature<turf.Point> {
    return turf.center(geojson, options);
}

/**
 * Takes any Feature or a FeatureCollection and returns its [center of mass](https://en.wikipedia.org/wiki/Center_of_mass) using this formula: [Centroid of Polygon](https://en.wikipedia.org/wiki/Centroid#Centroid_of_polygon).
 *
 * @param {GeoJSON} geojson GeoJSON to be centered
 * @param {Object} properties Optional object to be used as the Feature's properties
 * @returns {Feature<Point>} the center of mass
 * @example
 * var polygon = geo.create.polygon([[[-81, 41], [-88, 36], [-84, 31], [-80, 33], [-77, 39], [-81, 41]]]);
 *
 * var center = geo.calc.centerOfMass(polygon);
 */
export function centerOfMass(geojson: turf.AllGeoJSON, properties: object): turf.Feature<turf.Point> {
    return turf.centerOfMass(geojson, properties);
}

/**
 * Takes one or more features and calculates the centroid using the mean of all vertices.
 * This lessens the effect of small islands and artifacts when calculating the centroid of a set of polygons.
 *
 * @param {GeoJSON} geojson GeoJSON to be centered
 * @param {Object} properties Optional object to be used as the Feature's properties
 * @returns {Feature<Point>} the centroid of the input features
 * @example
 * var polygon = geo.create.polygon([[[-81, 41], [-88, 36], [-84, 31], [-80, 33], [-77, 39], [-81, 41]]]);
 *
 * var centroid = geo.calc.centroid(polygon);
 */
export function centroid(geojson: turf.AllGeoJSON, properties: object): turf.Feature<turf.Point> {
    return turf.centroid(geojson, properties);
}

/**
 * Takes a Point and calculates the location of a destination point given a distance in degrees, radians, miles, or kilometers; and bearing in degrees. This uses the [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula) to account for global curvature.
 *
 * @param {Coord} origin starting point
 * @param {number} dist distance from the origin point
 * @param {number} angle bearing ranging from -180 to 180
 * @param {Object} options Optional parameters
 * (units: "miles", "kilometers", "degrees", or "radians",
 * properties: an Object that is used as the Feature's properties)
 * @returns {Feature<Point>} destination point
 * @example
 * var point = geo.create.point([-75.343, 39.984]);
 * var distance = 50;
 * var bearing = 90;
 * var options = {units: 'miles'};
 *
 * var destination = geo.calc.destination(point, distance, bearing, options);
 */
export function destination(origin: turf.Point, dist: number, angle: number, options: {units: turf.Units, properties: object}): turf.Feature<turf.Point> {
    return turf.destination(origin, dist, angle, options);
}

/**
 * Calculates the distance between two points in degrees, radians,
 * miles, or kilometers. This uses the
 * [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula)
 * to account for global curvature.
 *
 * @param {Coord} from origin point
 * @param {Coord} to destination point
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
export function distance(from: turf.Point, to: turf.Point, options: {units: turf.Units}): number {
    return turf.distance(from, to, options);
}

/**
 * Takes any number of features and returns a rectangular Polygon that encompasses all vertices.
 *
 * @param {GeoJSON} geojson input features
 * @returns {Feature<Polygon>} a rectangular Polygon feature that encompasses all vertices
 * @example
 * var features = geo.create.featureCollection([
 *   geo.create.point([-75.343, 39.984], {"name": "Location A"}),
 *   geo.create.point([-75.833, 39.284], {"name": "Location B"}),
 *   geo.create.point([-75.534, 39.123], {"name": "Location C"})
 * ]);
 *
 * var enveloped = geo.calc.envelope(features);
 */
export function envelope(geojson: turf.AllGeoJSON): turf.Feature<turf.Polygon> {
    return turf.envelope(geojson);
}

/**
 * Calculate great circles routes as LineString
 *
 * @param {Coord} start source point feature
 * @param {Coord} end destination point feature
 * @param {Object} options Optional parameters
 * (properties: an Object that is used as the Feature's properties, npoints: number of points,
 * offset: offset controls the likelyhood that lines will be split which cross the dateline. The higher the number the more likely.)
 * @returns {Feature<LineString>} great circle line feature
 * @example
 * var start = geo.create.point([-122, 48]);
 * var end = geo.create.point([-77, 39]);
 *
 * var greatCircle = geo.calc.greatCircle(start, end, {'name': 'Seattle to DC'});
 */
export function greatCircle(start: turf.Point, end: turf.Point, options: {properties: object, npoints: number, offset: number}): turf.Feature<turf.LineString> {
    return turf.greatCircle(start, end, options);
}

/**
 * Takes a GeoJSON and measures its length in the specified units, (Multi)Point's distance are ignored.
 *
 * @param {GeoJSON} geojson GeoJSON to measure
 * @param {Object} options Optional parameters
 * (units: "miles", "kilometers", "degrees", or "radians")
 * @returns {number} length of GeoJSON
 * @example
 * var line = geo.create.lineString([[115, -32], [131, -22], [143, -25], [150, -34]]);
 * var length = geo.calc.length(line, {units: 'miles'});
 */
export function len(geojson: turf.AllGeoJSON, options: {units: turf.Units}): number {
    return turf.length(geojson, options);
}

/**
 * Takes two points and returns a point midway between them.
 * The midpoint is calculated geodesically, meaning the curvature of the earth is taken into account.
 *
 * @param {Coord} point1 first point
 * @param {Coord} point2 second point
 * @returns {Feature<Point>} a point midway between `pt1` and `pt2`
 * @example
 * var point1 = geo.create.point([144.834823, -37.771257]);
 * var point2 = geo.create.point([145.14244, -37.830937]);
 *
 * var midpoint = geo.calc.midpoint(point1, point2);
 */
export function midpoint(point1: turf.Point, point2: turf.Point): turf.Feature<turf.Point> {
    return turf.midpoint(point1, point2);
}

/**
 * Takes a reference point and a FeatureCollection of Features
 * with Point geometries and returns the
 * point from the FeatureCollection closest to the reference. This calculation
 * is geodesic.
 *
 * @param {Coord} targetPoint the reference point
 * @param {FeatureCollection<Point>} points against input point set
 * @returns {Feature<Point>} the closest point in the set to the reference point
 * @example
 * var targetPoint = geo.create.point([28.965797, 41.010086], {"marker-color": "#0F0"});
 * var points = geo.create.featureCollection([
 *     geo.create.point([28.973865, 41.011122]),
 *     geo.create.point([28.948459, 41.024204]),
 *     geo.create.point([28.938674, 41.013324])
 * ]);
 *
 * var nearest = geo.calc.nearestPoint(targetPoint, points);
 */
export function nearestPoint(targetPoint: turf.Point, points: turf.FeatureCollection<turf.Point>): turf.Feature<turf.Point> {
    return turf.nearestPoint(targetPoint, points);
}

/**
 * Takes a Point and a LineString and calculates the closest Point on the (Multi)LineString.
 *
 * @param {Geometry|Feature<LineString|MultiLineString>} lines lines to snap to
 * @param {Geometry|Feature<Point>|number[]} point point to snap from
 * @param {Object}  options Optional parameters
 * (units: "miles", "kilometers"
 * "degrees", or "radians")
 * @returns {Feature<Point>} closest point on the `line` to `point`. The properties object will contain three values: `index`: closest point was found on nth line part, `dist`: distance between pt and the closest point, `location`: distance along the line between start and the closest point.
 * @example
 * var line = geo.create.lineString([
 *     [-77.031669, 38.878605],
 *     [-77.029609, 38.881946],
 *     [-77.020339, 38.884084],
 *     [-77.025661, 38.885821],
 *     [-77.021884, 38.889563],
 *     [-77.019824, 38.892368]
 * ]);
 * var pt = geo.create.point([-77.037076, 38.884017]);
 *
 * var snapped = geo.calc.nearestPointOnLine(line, pt, {units: 'miles'});
 */
export function nearestPointOnLine(lines: turf.LineString|turf.MultiLineString, point: turf.Point, options: {units: turf.Units}): turf.Feature<turf.Point> {
    return turf.nearestPointOnLine(lines, point, options);
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
export function pointToLineDistance(point: turf.Point, line: turf.LineString, options: {units: turf.Units, mercator: boolean}): number {
    return turf.pointToLineDistance(point, line, options);
}

/**
 * Finds the tangents of a Polygon|(Multi)Polygon from a Point.
 *
 * @param {Coord} point to calculate the tangent points from
 * @param {Feature<Polygon|MultiPolygon>} polygon to get tangents from
 * @returns {FeatureCollection<Point>} Feature Collection containing the two tangent points
 * @example
 * var polygon = geo.create.polygon([[[11, 0], [22, 4], [31, 0], [31, 11], [21, 15], [11, 11], [11, 0]]]);
 * var point = geo.create.point([61, 5]);
 *
 * var tangents = geo.calc.polygonTangents(point, polygon)
 */
export function polygonTangents(point: turf.Point, polygon: turf.Polygon): turf.FeatureCollection<turf.Point> {
    return turf.polygonTangents(point, polygon);
}

// /**
//  * Takes two points and finds the bearing angle between them along a Rhumb line
//  * i.e. the angle measured in degrees start the north line (0 degrees)
//  *
//  * @param {Coord} start starting Point
//  * @param {Coord} end ending Point
//  * @param {Object} options Optional parameters
//  * (final: calculates the final bearing if true)
//  * @returns {number} bearing from north in decimal degrees, between -180 and 180 degrees (positive clockwise)
//  * @example
//  * var point1 = geo.create.point([-75.343, 39.984], {"marker-color": "#F00"});
//  * var point2 = geo.create.point([-75.534, 39.123], {"marker-color": "#00F"});
//  *
//  * var bearing = geo.calc.rhumbBearing(point1, point2);
//  */
// export function rhumbBearing(start: turf.Point, end: turf.Point, options: {final: boolean}): number {
//     return turf.rhumbBearing(start, end, options);
// }

// *
//  * Returns the destination Point having travelled the given distance along a Rhumb line from the
//  * origin Point with the (varant) given bearing.
//  *
//  * @param {Coord} origin starting point
//  * @param {number} dist distance from the starting point
//  * @param {number} angle varant bearing angle ranging from -180 to 180 degrees from north
//  * @param {Object} options Optional parameters
//  * (units: "miles", "kilometers", "degrees", or "radians",
//  * properties: an Object that is used as the Feature's properties)
//  * @returns {Feature<Point>} Destination point.
//  * @example
//  * var pt = geo.create.point([-75.343, 39.984], {"marker-color": "F00"});
//  * var distance = 50;
//  * var bearing = 90;
//  * var options = {units: 'miles'};
//  *
//  * var destination = geo.calc.rhumbDestination(pt, distance, bearing, options);
 
// export function rhumbDestination(origin: turf.Point, dist: number, angle: number, options: {units: turf.Units, properties: object}): turf.Feature<turf.Point> {
//     return turf.rhumbDestination(origin, dist, angle, options);
// }

// /**
//  * Calculates the distance along a rhumb line between two Point|points in degrees, radians,
//  * miles, or kilometers.
//  *
//  * @param {Coord} from origin point
//  * @param {Coord} to destination point
//  * @param {Object} options Optional parameters
//  * (units: "miles", "kilometers", "degrees", or "radians")
//  * @returns {number} distance between the two points
//  * @example
//  * var from = geo.create.point([-75.343, 39.984]);
//  * var to = geo.create.point([-75.534, 39.123]);
//  * var options = {units: 'miles'};
//  *
//  * var distance = geo.calc.rhumbDistance(from, to, options);
//  */
// export function rhumbDistance(from: turf.Point, to: turf.Point, options: {units: turf.Units}): number {
//     return turf.rhumbDistance(from, to, options);
// }

/**
 * Returns the shortest LineString path from start point to end point without colliding with
 * any Feature in FeatureCollection<Polygon> obstacles
 *
 * @param {Coord} start point
 * @param {Coord} end point
 * @param {Object} options Optional parameters 
 * (obstacles: areas which path cannot travel, 
 * minDistance: minimum distance between shortest path and obstacles, 
 * units: "miles", "kilometers", "degrees", or "radians", 
 * resolution: distance between matrix points on which the path will be calculated)
 * @returns {Feature<LineString>} shortest path between start and end
 * @example
 * var start = [-5, -6];
 * var end = [9, -6];
 * var options = {
 *   obstacles: geo.create.polygon([[[0, -7], [5, -7], [5, -3], [0, -3], [0, -7]]])
 * };
 *
 * var path = geo.calc.shortestPath(start, end, options);
 */
export function shortestPath(start: turf.Point, end: turf.Point, options: {obstacles: turf.FeatureCollection<turf.Polygon>, minDistance: number, units: turf.Units, resolution: number}): turf.Feature<turf.LineString> {
    return turf.shortestPath(start, end, options);
}

/**
 * Takes a FeatureCollection of points, and a bounding box, and returns a FeatureCollection
 * of Voronoi polygons.
 *
 * The Voronoi algorithim used comes from the d3-voronoi package.
 *
 * @param {FeatureCollection<Point>} points to find the Voronoi polygons around.
 * @param {Object} bbox Optional clipping rectangle, in [minX, minY, maxX, MaxY] order.
 * @returns {FeatureCollection<Polygon>} a set of polygons, one per input point.
 * @example
 * var options = {
 *   bbox: [-70, 40, -60, 60]
 * };
 * var points = geo.random.point(100, options);
 * var voronoiPolygons = geo.calc.voronoi(points, options);
 */
export function voronoi(points: turf.FeatureCollection<turf.Point>, bbox: turf.BBox): turf.FeatureCollection<turf.Polygon> {
    return turf.voronoi(points, bbox);
}
