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
 * var polygon = turf.polygon([[[125, -15], [113, -22], [154, -27], [144, -15], [125, -15]]]);
 *
 * var area = turf.area(polygon);
 *
 * //addToMap
 * var addToMap = [polygon]
 * polygon.properties.area = area
 */
export function area(geojson, area) {
    return turf.area(geojson, area);
}

/**
 * Takes two Point|points and finds the geographic bearing between them,
 * i.e. the angle measured in degrees from the north line (0 degrees)
 *
 * @param {Coord} start starting Point
 * @param {Coord} end ending Point
 * @param {Object} [options={}] Optional parameters
 * @param {boolean} [options.final=false] calculates the final bearing if true
 * @returns {number} bearing in decimal degrees, between -180 and 180 degrees (positive clockwise)
 * @example
 * var point1 = turf.point([-75.343, 39.984]);
 * var point2 = turf.point([-75.534, 39.123]);
 *
 * var bearing = turf.bearing(point1, point2);
 *
 * //addToMap
 * var addToMap = [point1, point2]
 * point1.properties['marker-color'] = '#f00'
 * point2.properties['marker-color'] = '#0f0'
 * point1.properties.bearing = bearing
 */
export function bearing(start, end, parameters) {
    return turf.bearing(start, end, parameters);
}

/**
 * Takes a Feature or FeatureCollection and returns the absolute center point of all features.
 *
 * @param {GeoJSON} geojson GeoJSON to be centered
 * @param {Object} [options={}] Optional parameters
 * @param {Object} [options.properties={}] an Object that is used as the Feature's properties
 * @returns {Feature<Point>} a Point feature at the absolute center point of all input features
 * @example
 * var features = turf.featureCollection([
 *   turf.point( [-97.522259, 35.4691]),
 *   turf.point( [-97.502754, 35.463455]),
 *   turf.point( [-97.508269, 35.463245])
 * ]);
 *
 * var center = turf.center(features);
 *
 * //addToMap
 * var addToMap = [features, center]
 * center.properties['marker-size'] = 'large';
 * center.properties['marker-color'] = '#000';
 */
export function center(geojson, parameters) {
    return turf.center(geojson, parameters);
}

/**
 * Takes any Feature or a FeatureCollection and returns its [center of mass](https://en.wikipedia.org/wiki/Center_of_mass) using this formula: [Centroid of Polygon](https://en.wikipedia.org/wiki/Centroid#Centroid_of_polygon).
 *
 * @param {GeoJSON} geojson GeoJSON to be centered
 * @param {Object} [properties={}] an Object that is used as the Feature's properties
 * @returns {Feature<Point>} the center of mass
 * @example
 * var polygon = turf.polygon([[[-81, 41], [-88, 36], [-84, 31], [-80, 33], [-77, 39], [-81, 41]]]);
 *
 * var center = turf.centerOfMass(polygon);
 *
 * //addToMap
 * var addToMap = [polygon, center]
 */
export function centerOfMass(geojson, parameters) {
    return turf.centerOfMass(geojson, parameters);
}

/**
 * Takes one or more features and calculates the centroid using the mean of all vertices.
 * This lessens the effect of small islands and artifacts when calculating the centroid of a set of polygons.
 *
 * @param {GeoJSON} geojson GeoJSON to be centered
 * @param {Object} [properties={}] an Object that is used as the Feature's properties
 * @returns {Feature<Point>} the centroid of the input features
 * @example
 * var polygon = turf.polygon([[[-81, 41], [-88, 36], [-84, 31], [-80, 33], [-77, 39], [-81, 41]]]);
 *
 * var centroid = turf.centroid(polygon);
 *
 * //addToMap
 * var addToMap = [polygon, centroid]
 */
export function centroid(geojson, parameters) {
    return turf.centroid(geojson, parameters);
}

/**
 * Takes a Point and calculates the location of a destination point given a distance in degrees, radians, miles, or kilometers; and bearing in degrees. This uses the [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula) to account for global curvature.
 *
 * @param {Coord} origin starting point
 * @param {number} distance distance from the origin point
 * @param {number} bearing ranging from -180 to 180
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units='kilometers'] miles, kilometers, degrees, or radians
 * @param {Object} [options.properties={}] Translate properties to Point
 * @returns {Feature<Point>} destination point
 * @example
 * var point = turf.point([-75.343, 39.984]);
 * var distance = 50;
 * var bearing = 90;
 * var options = {units: 'miles'};
 *
 * var destination = turf.destination(point, distance, bearing, options);
 *
 * //addToMap
 * var addToMap = [point, destination]
 * destination.properties['marker-color'] = '#f00';
 * point.properties['marker-color'] = '#0f0';
 */
export function destination(origin, distance, bearing, parameters) {
    return turf.destination(origin, distance, bearing, parameters);
}

/**
 * Returns the distance between a point P on a segment AB.
 *
 * @param {Array<number>} point external point
 * @param {Array<number>} seg_point1 first segment point
 * @param {Array<number>} seg_point2 second segment point
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units='kilometers'] can be degrees, radians, miles, or kilometers
 * @param {boolean} [options.mercator=false] if distance should be on Mercator or WGS84 projection
 * @returns {number} distance
 */
export function distance(point, seg_point1, seg_point2) {
    return turf.distance(point, seg_point1, seg_point2);
}

/**
 * Takes any number of features and returns a rectangular Polygon that encompasses all vertices.
 *
 * @param {GeoJSON} geojson input features
 * @returns {Feature<Polygon>} a rectangular Polygon feature that encompasses all vertices
 * @example
 * var features = turf.featureCollection([
 *   turf.point([-75.343, 39.984], {"name": "Location A"}),
 *   turf.point([-75.833, 39.284], {"name": "Location B"}),
 *   turf.point([-75.534, 39.123], {"name": "Location C"})
 * ]);
 *
 * var enveloped = turf.envelope(features);
 *
 * //addToMap
 * var addToMap = [features, enveloped];
 */
export function envelope(geojson) {
    return turf.envelope(geojson);
}

/**
 * Calculate great circles routes as LineString
 *
 * @param {Coord} start source point feature
 * @param {Coord} end destination point feature
 * @param {Object} [options={}] Optional parameters
 * @param {Object} [options.properties={}] line feature properties
 * @param {number} [options.npoints=100] number of points
 * @param {number} [options.offset=10] offset controls the likelyhood that lines will
 * be split which cross the dateline. The higher the number the more likely.
 * @returns {Feature<LineString>} great circle line feature
 * @example
 * var start = turf.point([-122, 48]);
 * var end = turf.point([-77, 39]);
 *
 * var greatCircle = turf.greatCircle(start, end, {'name': 'Seattle to DC'});
 *
 * //addToMap
 * var addToMap = [start, end, greatCircle]
 */
export function greatCircle(start, end, parameters) {
    return turf.greatCircle(start, end, parameters);
}

/**
 * Takes a GeoJSON and measures its length in the specified units, (Multi)Point's distance are ignored.
 *
 * @param {GeoJSON} geojson GeoJSON to measure
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units=kilometers] can be degrees, radians, miles, or kilometers
 * @returns {number} length of GeoJSON
 * @example
 * var line = turf.lineString([[115, -32], [131, -22], [143, -25], [150, -34]]);
 * var length = turf.length(line, {units: 'miles'});
 *
 * //addToMap
 * var addToMap = [line];
 * line.properties.distance = length;
 */
export function len(geojson, parameters) {
    return turf.length(geojson, parameters);
}

/**
 * Takes two Point|points and returns a point midway between them.
 * The midpoint is calculated geodesically, meaning the curvature of the earth is taken into account.
 *
 * @param {Coord} point1 first point
 * @param {Coord} point2 second point
 * @returns {Feature<Point>} a point midway between `pt1` and `pt2`
 * @example
 * var point1 = turf.point([144.834823, -37.771257]);
 * var point2 = turf.point([145.14244, -37.830937]);
 *
 * var midpoint = turf.midpoint(point1, point2);
 *
 * //addToMap
 * var addToMap = [point1, point2, midpoint];
 * midpoint.properties['marker-color'] = '#f00';
 */
export function midpoint(point1, point2) {
    return turf.midpoint(point1, point2);
}

/**
 * Takes a reference Point|point and a FeatureCollection of Features
 * with Point geometries and returns the
 * point from the FeatureCollection closest to the reference. This calculation
 * is geodesic.
 *
 * @param {Coord} targetPoint the reference point
 * @param {FeatureCollection<Point>} points against input point set
 * @returns {Feature<Point>} the closest point in the set to the reference point
 * @example
 * var targetPoint = turf.point([28.965797, 41.010086], {"marker-color": "#0F0"});
 * var points = turf.featureCollection([
 *     turf.point([28.973865, 41.011122]),
 *     turf.point([28.948459, 41.024204]),
 *     turf.point([28.938674, 41.013324])
 * ]);
 *
 * var nearest = turf.nearestPoint(targetPoint, points);
 *
 * //addToMap
 * var addToMap = [targetPoint, points, nearest];
 * nearest.properties['marker-color'] = '#F00';
 */
export function nearestPoint(targetPoint, points) {
    return turf.nearestPoint(targetPoint, points);
}

/**
 * Takes a Point and a LineString and calculates the closest Point on the (Multi)LineString.
 *
 * @param {Geometry|Feature<LineString|MultiLineString>} lines lines to snap to
 * @param {Geometry|Feature<Point>|number[]} point point to snap from
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units='kilometers'] can be degrees, radians, miles, or kilometers
 * @returns {Feature<Point>} closest point on the `line` to `point`. The properties object will contain three values: `index`: closest point was found on nth line part, `dist`: distance between pt and the closest point, `location`: distance along the line between start and the closest point.
 * @example
 * var line = turf.lineString([
 *     [-77.031669, 38.878605],
 *     [-77.029609, 38.881946],
 *     [-77.020339, 38.884084],
 *     [-77.025661, 38.885821],
 *     [-77.021884, 38.889563],
 *     [-77.019824, 38.892368]
 * ]);
 * var pt = turf.point([-77.037076, 38.884017]);
 *
 * var snapped = turf.nearestPointOnLine(line, pt, {units: 'miles'});
 *
 * //addToMap
 * var addToMap = [line, pt, snapped];
 * snapped.properties['marker-color'] = '#00f';
 */
export function nearestPointOnLine(lines, point, parameters) {
    return turf.nearestPointOnLine(lines, point, parameters);
}

/**
 * Returns the minimum distance between a Point and a LineString, being the distance from a line the
 * minimum distance between the point and any segment of the `LineString`.
 *
 * @param {Coord} point Feature or Geometry
 * @param {Feature<LineString>} line GeoJSON Feature or Geometry
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units='kilometers'] can be degrees, radians, miles, or kilometers
 * @param {boolean} [options.mercator=false] if distance should be on Mercator or WGS84 projection
 * @returns {number} distance between point and line
 * @example
 * var pt = turf.point([0, 0]);
 * var line = turf.lineString([[1, 1],[-1, 1]]);
 *
 * var distance = turf.pointToLineDistance(pt, line, {units: 'miles'});
 * //=69.11854715938406
 */
export function pointToLineDistance(point, line, parameters) {
    return turf.pointToLineDistance(point, line, parameters);
}

/**
 * Finds the tangents of a Polygon|(Multi)Polygon from a Point.
 *
 * @param {Coord} point to calculate the tangent points from
 * @param {Feature<Polygon|MultiPolygon>} polygon to get tangents from
 * @returns {FeatureCollection<Point>} Feature Collection containing the two tangent points
 * @example
 * var polygon = turf.polygon([[[11, 0], [22, 4], [31, 0], [31, 11], [21, 15], [11, 11], [11, 0]]]);
 * var point = turf.point([61, 5]);
 *
 * var tangents = turf.polygonTangents(point, polygon)
 *
 * //addToMap
 * var addToMap = [tangents, point, polygon];
 */
export function polygonTangents(point, polygon) {
    return turf.polygonTangents(point, polygon);
}

/**
 * Takes two Point|points and finds the bearing angle between them along a Rhumb line
 * i.e. the angle measured in degrees start the north line (0 degrees)
 *
 * @param {Coord} start starting Point
 * @param {Coord} end ending Point
 * @param {Object} [options] Optional parameters
 * @param {boolean} [options.final=false] calculates the final bearing if true
 * @returns {number} bearing from north in decimal degrees, between -180 and 180 degrees (positive clockwise)
 * @example
 * var point1 = turf.point([-75.343, 39.984], {"marker-color": "#F00"});
 * var point2 = turf.point([-75.534, 39.123], {"marker-color": "#00F"});
 *
 * var bearing = turf.rhumbBearing(point1, point2);
 *
 * //addToMap
 * var addToMap = [point1, point2];
 * point1.properties.bearing = bearing;
 * point2.properties.bearing = bearing;
 */
export function rhumbBearing(start, end, parameters) {
    return turf.rhumbBearing(start, end, parameters);
}

/**
 * Returns the destination Point having travelled the given distance along a Rhumb line from the
 * origin Point with the (varant) given bearing.
 *
 * @param {Coord} origin starting point
 * @param {number} distance distance from the starting point
 * @param {number} bearing varant bearing angle ranging from -180 to 180 degrees from north
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units='kilometers'] can be degrees, radians, miles, or kilometers
 * @param {Object} [options.properties={}] translate properties to destination point
 * @returns {Feature<Point>} Destination point.
 * @example
 * var pt = turf.point([-75.343, 39.984], {"marker-color": "F00"});
 * var distance = 50;
 * var bearing = 90;
 * var options = {units: 'miles'};
 *
 * var destination = turf.rhumbDestination(pt, distance, bearing, options);
 *
 * //addToMap
 * var addToMap = [pt, destination]
 * destination.properties['marker-color'] = '#00F';
 */
export function rhumbDestination(origin, distance, bearing, parameters) {
    return turf.rhumbDestination(origin, distance, bearing, parameters);
}

/**
 * Calculates the distance along a rhumb line between two Point|points in degrees, radians,
 * miles, or kilometers.
 *
 * @param {Coord} from origin point
 * @param {Coord} to destination point
 * @param {Object} [options] Optional parameters
 * @param {string} [options.units="kilometers"] can be degrees, radians, miles, or kilometers
 * @returns {number} distance between the two points
 * @example
 * var from = turf.point([-75.343, 39.984]);
 * var to = turf.point([-75.534, 39.123]);
 * var options = {units: 'miles'};
 *
 * var distance = turf.rhumbDistance(from, to, options);
 *
 * //addToMap
 * var addToMap = [from, to];
 * from.properties.distance = distance;
 * to.properties.distance = distance;
 */
export function rhumbDistance(origin, destination, parameters) {
    return turf.rhumbDistance(origin, destination, parameters);
}

/**
 * Returns the shortest LineString|path from Point|start to Point|end without colliding with
 * any Feature in FeatureCollection<Polygon>| obstacles
 *
 * @param {Coord} start point
 * @param {Coord} end point
 * @param {Object} [options={}] optional parameters
 * @param {Geometry|Feature|FeatureCollection<Polygon>} [options.obstacles] areas which path cannot travel
 * @param {number} [options.minDistance] minimum distance between shortest path and obstacles
 * @param {string} [options.units='kilometers'] unit in which resolution & minimum distance will be expressed in; it can be degrees, radians, miles, kilometers, ...
 * @param {number} [options.resolution=100] distance between matrix points on which the path will be calculated
 * @returns {Feature<LineString>} shortest path between start and end
 * @example
 * var start = [-5, -6];
 * var end = [9, -6];
 * var options = {
 *   obstacles: turf.polygon([[[0, -7], [5, -7], [5, -3], [0, -3], [0, -7]]])
 * };
 *
 * var path = turf.shortestPath(start, end, options);
 *
 * //addToMap
 * var addToMap = [start, end, options.obstacles, path];
 */
export function shortestPath(start, end, parameters) {
    return turf.shortestPath(start, end, parameters);
}

/**
 * Takes a FeatureCollection of points, and a bounding box, and returns a FeatureCollection
 * of Voronoi polygons.
 *
 * The Voronoi algorithim used comes from the d3-voronoi package.
 *
 * @param {FeatureCollection<Point>} points to find the Voronoi polygons around.
 * @param {Object} [options={}] Optional parameters
 * @param {number[]} [options.bbox=[-180, -85, 180, -85]] clipping rectangle, in [minX, minY, maxX, MaxY] order.
 * @returns {FeatureCollection<Polygon>} a set of polygons, one per input point.
 * @example
 * var options = {
 *   bbox: [-70, 40, -60, 60]
 * };
 * var points = turf.randomPoint(100, options);
 * var voronoiPolygons = turf.voronoi(points, options);
 *
 * //addToMap
 * var addToMap = [voronoiPolygons, points];
 */
export function voronoi(points, parameters) {
    return turf.voronoi(points, parameters);
}
