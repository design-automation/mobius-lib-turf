/**
 * Turf HELPER functions.
 * http://turfjs.org/docs/
 */

/**
 *
 */
import * as turf from "@turf/turf";

/**
 * Returns a cloned copy of the passed GeoJSON Object, including possible 'Foreign Members'.
 * ~3-5x faster than the common JSON.parse + JSON.stringify combo method.
 *
 * @param {GeoJSON} features GeoJSON Object
 * @returns {GeoJSON} cloned GeoJSON Object
 * @example
 * var line = geo.create.lineString([[-74, 40], [-78, 42], [-82, 35]], {color: 'red'});
 *
 * var lineCloned = geo.feature.clone(line);
 */
export function featureByClone(features: turf.AllGeoJSON): turf.AllGeoJSON {
    return turf.clone(features);
}

// http://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
/**
 * Takes a FeatureCollection and returns a FeatureCollection with given number of features at random.
 *
 * @param {FeatureCollection} fcoll FeatureCollection of input features
 * @param {number} num number of features to select
 * @returns {FeatureCollection} a FeatureCollection with `n` features
 * @example
 * var points = geo.random.point(100, {bbox: [-80, 30, -60, 60]});
 *
 * var sample = geo.misc.sample(points, 5);
 */
export function featuresBySample(fcoll: turf.FeatureCollection<turf.GeometryObject>,
                                 num: number): turf.FeatureCollection<turf.GeometryObject> {
    return turf.sample(fcoll, num);
}

/**
 * Takes a Feature and a bbox and clips the feature to the bbox using [lineclip] (https://github.com/mapbox/lineclip).
 * May result in degenerate edges when clipping Polygons.
 *
 * @param {Feature<LineString|MultiLineString|Polygon|MultiPolygon>} feature feature to clip to the bbox
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @returns {Feature<LineString|MultiLineString|Polygon|MultiPolygon>} clipped Feature
 * @example
 * var bbox = [0, 0, 10, 10];
 * var poly = geo.create.polygon([[[2, 2], [8, 4], [12, 8], [3, 7], [2, 2]]]);
 *
 * var clipped = geo.bbox.clip(poly, bbox);
 *
 */
export function featureByBboxClip(feature: turf.LineString|turf.MultiLineString|turf.Polygon|turf.MultiPolygon,
                                  bbox: turf.BBox): turf.Feature {
    return turf.bboxClip(feature, bbox);
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
export function featuresByFlatten(geojson: turf.AllGeoJSON): turf.FeatureCollection {
    return turf.flatten(geojson);
}

/*

Grids*******************************************************************************************************************

*/

/**
 * Takes a bounding box and the diameter of the cell and returns a FeatureCollection of flat-topped
 * hexagons or triangles (Polygon features) aligned in an "odd-q" vertical grid as
 * described in [Hexagonal Grids](http://www.redblobgames.com/grids/hexagons/).
 *
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @param {number} cellSide length of the side of the the hexagons or triangles, in meters.
 * It will also coincide with the radius of the circumcircle of the hexagons.
 * @param {Object} options Optional parameters
 * (units: used in calculating cell size, can be "degrees", "radians", "miles", or "kilometers",
 * properties: passed to each hexagon or triangle of the grid,
 * maskpoly: if passed a Polygon or MultiPolygon, the grid Points will be created only inside it,
 * triangle: whether to return as triangles instead of hexagons)
 * @param {Feature<Polygon|MultiPolygon>}
 * mask if passed a Polygon or MultiPolygon, the grid Points will be created only inside it
 * @returns {FeatureCollection<Polygon>} a hexagonal grid
 * @example
 * var bbox = [-96,31,-84,40];
 * var cellSide = 50;
 * var options = {units: 'miles'};
 *
 * var hexgrid = geo.grid.hexGrid(bbox, cellSide, options);
 */
export function polygonsByHexGrid(bbox: turf.BBox,cellSide: number, mask: turf.Feature<turf.Polygon|turf.MultiPolygon>):
turf.FeatureCollection<turf.Polygon> {
    return turf.hexGrid(bbox,cellSide/1000,{mask});
}

/**
 * Takes a bounding box and the diameter of the cell and returns a FeatureCollection of flat-topped
 * hexagons or triangles (Polygon features) aligned in an "odd-q" vertical grid as
 * described in [Hexagonal Grids](http://www.redblobgames.com/grids/hexagons/).
 *
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @param {number} cellSide length of the side of the the hexagons or triangles, in meters.
 * It will also coincide with the radius of the circumcircle of the hexagons.
 * @param {Object} options Optional parameters
 * (units: used in calculating cell size, can be "degrees", "radians", "miles", or "kilometers",
 * properties: passed to each hexagon or triangle of the grid,
 * maskpoly: if passed a Polygon or MultiPolygon, the grid Points will be created only inside it,
 * triangle: whether to return as triangles instead of hexagons)
 * @param {Feature<Polygon|MultiPolygon>} mask if passed a Polygon or MultiPolygon,
 * the grid Points will be created only inside it
 * @returns {FeatureCollection<Polygon>} a hexagonal grid
 * @example
 * var bbox = [-96,31,-84,40];
 * var cellSide = 50;
 * var options = {units: 'miles'};
 *
 * var hexgrid = geo.grid.hexGrid(bbox, cellSide, options);
 */
export function polygonsByTriHexGrid(bbox: turf.BBox,cellSide: number,
                                     mask: turf.Feature<turf.Polygon|turf.MultiPolygon>):
turf.FeatureCollection<turf.Polygon> {
    return turf.hexGrid(bbox,cellSide/1000,{mask, triangles: true});
}

/**
 * Creates a Point grid from a bounding box (with optional polygon mask).
 *
 * @name pointGrid
 * @param {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 * @param {number} cellSide the distance between points, in meters
 * @param {Object} options Optional parameters
 * (units: used in calculating cellSide, can be degrees, radians, miles, or kilometers,
 * maskpoly: if passed a Polygon or MultiPolygon, the grid Points will be created only inside it,
 * properties: passed to each point of the grid)
 * @param {Feature<Polygon|MultiPolygon>} mask if passed a Polygon or MultiPolygon,
 * the grid Points will be created only inside it
 * @returns {FeatureCollection<Point>} grid of points
 * @example
 * var extent = [-70.823364, -33.553984, -70.473175, -33.302986];
 * var cellSide = 3;
 * var options = {units: 'miles'};
 *
 * var grid = geo.grid.pointGrid(extent, cellSide, options);
 */
export function pointsBySquGrid(bbox: turf.BBox,cellSide: number, mask: turf.Feature<turf.Polygon|turf.MultiPolygon>):
turf.FeatureCollection<turf.Point> {
    return turf.pointGrid(bbox,cellSide/1000,{mask});
}

/**
 * Creates a square grid from a bounding box (with optional polygon mask).
 *
 * @param {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 * @param {number} cellSide of each cell, in meters
 * @param {Object} options Optional parameters
 * (units: used in calculating cellSide, can be degrees, radians, miles, or kilometers,
 * maskpoly: if passed a Polygon or MultiPolygon, the grid Points will be created only inside it,
 * properties: passed to each point of the grid)
 * @param {Feature<Polygon|MultiPolygon>} mask if passed a Polygon or MultiPolygon,
 * the grid Points will be created only inside it
 * @returns {FeatureCollection<Polygon>} grid a grid of polygons
 * @example
 * var bbox = [-95, 30 ,-85, 40];
 * var cellSide = 50;
 * var options = {units: 'miles'};
 *
 * var squareGrid = geo.grid.squareGrid(bbox, cellSide, options);
 */
export function polygonsBySquGrid(bbox: turf.BBox,cellSide: number, mask: turf.Feature<turf.Polygon|turf.MultiPolygon>):
turf.FeatureCollection<turf.Polygon> {
    return turf.squareGrid(bbox,cellSide/1000,{mask});
}

/**
 * Takes a bounding box and a cell depth and returns a set of triangular polygons in a grid.
 *
 * @param {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 * @param {number} cellSide dimension of each cell, in meters
 * @param {Object}  options Optional parameters
 * (units: used in calculating cellSide, can be degrees, radians, miles, or kilometers,
 * maskpoly: if passed a Polygon or MultiPolygon, the grid Points will be created only inside it,
 * properties: passed to each point of the grid)
 * @param {Feature<Polygon|MultiPolygon>} mask if passed a Polygon or MultiPolygon,
 * the grid Points will be created only inside it
 * @returns {FeatureCollection<Polygon>} grid of polygons
 * @example
 * var bbox = [-95, 30 ,-85, 40];
 * var cellSide = 50;
 * var options = {units: 'miles'};
 *
 * var triangleGrid = geo.grid.triangleGrid(bbox, cellSide, options);
 */
export function polygonsByTriGrid(bbox: turf.BBox,cellSide: number, mask: turf.Feature<turf.Polygon|turf.MultiPolygon>):
turf.FeatureCollection<turf.Polygon> {
    return turf.triangleGrid(bbox,cellSide/1000,{mask});
}

/*

Lines*******************************************************************************************************************

*/

/**
 * Creates a LineString Feature from an Array of Positions.
 *
 * @param {Array<Array<number>>} coords an array of Positions
 * @param {Object} properties Optional object of key-value pairs to add as properties
 * @param {Object} options Optional Parameters
 * (bbox: Bounding Box Array [west, south, east, north] associated with the Feature,
 * id: Identifier associated with the Feature)
 * @returns {Feature<LineString>} LineString Feature
 * @example
 * var linestring1 = geo.create.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
 * var linestring2 = geo.create.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});
 *
 * //=linestring1
 * //=linestring2
 */
export function lineByCoords(coords: number[][]): turf.Feature<turf.LineString> {
    return turf.lineString(coords);
}

/**
 * Creates a circular arc, of a circle of the given radius and center point, between bearing1 and bearing2;
 * 0 bearing is North of center point, positive clockwise.
 *
 * @param {Coord} center center point
 * @param {number} radius radius of the circle in meters
 * @param {number} bearing1 angle, in decimal degrees, of the first radius of the arc
 * @param {number} bearing2 angle, in decimal degrees, of the second radius of the arc
 * @param {Object} options Optional parameters
 * (steps: number of steps,
 * units: "miles", "kilometers", "degrees", or "radians")
 * @param {number} steps number of steps
 * @returns {Feature<LineString>} line arc
 * @example
 * var center = geo.create.point([-75, 40]);
 * var radius = 5;
 * var bearing1 = 25;
 * var bearing2 = 47;
 *
 * var arc = geo.create.arc(center, radius, bearing1, bearing2);
 */
export function lineByArc(center: turf.Point, radius: number, bearing1: number, bearing2: number,
                          steps: number): turf.Feature<turf.LineString> {
    return turf.lineArc(center, radius/1000, bearing1, bearing2, {steps});
}

/**
 * Takes a LineString and returns a curved version
 * by applying a [Bezier spline](http://en.wikipedia.org/wiki/B%C3%A9zier_spline)
 * algorithm.
 *
 * The bezier spline implementation is by [Leszek Rybicki](http://leszek.rybicki.cc/).
 *
 * @param {Feature<LineString>} line input LineString
 * @param {Object} options Optional parameters
 * (resolution: time in milliseconds between points,
 * sharpness: a measure of how curvy the path should be between splines)
 * @param {number} resolution time in milliseconds between points
 * @param {number} sharpness a measure of how curvy the path should be between splines
 * @returns {Feature<LineString>} curved line
 * @example
 * var line = geo.create.lineString([
 *   [-76.091308, 18.427501],
 *   [-76.695556, 18.729501],
 *   [-76.552734, 19.40443],
 *   [-74.61914, 19.134789],
 *   [-73.652343, 20.07657],
 *   [-73.157958, 20.210656]
 * ]);
 *
 * var curved = geo.line.bezierSpline(line);
 */
export function lineByBezier(line: turf.LineString,resolution: number,sharpness: number):
turf.Feature<turf.LineString> {
    return turf.bezierSpline(line,{resolution, sharpness});
}

/**
 * Divides a LineString into chunks of a specified length.
 * If the line is shorter than the segment length then the original line is returned.
 *
 * @param {FeatureCollection|Geometry|Feature<LineString|MultiLineString>} lines the lines to split
 * @param {number} length how long to make each segment, in meters
 * @param {Object} options Optional parameters
 * (units: units can be degrees, radians, miles, or kilometers,
 * reverse: reverses coordinates to start the first chunked segment at the end)
 * @param {boolean} reverse  reverses coordinates to start the first chunked segment at the end
 * @returns {FeatureCollection<LineString>} collection of line segments
 * @example
 * var line = geo.create.lineString([[-95, 40], [-93, 45], [-85, 50]]);
 *
 * var chunk = geo.line.chunk(line, 15, {units: 'miles'});
 */
export function linesByLenSplit(lines: turf.FeatureCollection<turf.LineString|turf.MultiLineString>|
    turf.Feature<turf.LineString|turf.MultiLineString>,
                                length: number,reverse: boolean): turf.FeatureCollection<turf.LineString> {
    return turf.lineChunk(lines,length/1000,{reverse});
}

/**
 * Calculate great circles routes as LineString
 *
 * @param {Coord} point1 source point feature
 * @param {Coord} point2 destination point feature
 * @param {Object} options Optional parameters
 * (properties: an Object that is used as the Feature's properties, npoints: number of points,
 * offset: offset controls the likelyhood that lines will be split which cross the dateline.
 * The higher the number the more likely.)
 * @returns {Feature<LineString>} great circle line feature
 * @example
 * var start = geo.create.point([-122, 48]);
 * var end = geo.create.point([-77, 39]);
 *
 * var greatCircle = geo.calc.greatCircle(start, end, {'name': 'Seattle to DC'});
 */
export function lineByGreatCircle(point1: turf.Point, point2: turf.Point,
                                  options: {properties: object, npoints: number, offset: number}):
turf.Feature<turf.LineString> {
    return turf.greatCircle(point1, point2, options);
}

/**
 * Takes a grid FeatureCollection of Point features with z-values and an array of
 * value breaks and generates [isolines](http://en.wikipedia.org/wiki/Isoline).
 *
 * @param {FeatureCollection<Point>} pointGrid input points
 * @param {Array<number>} breaks values of `zProperty` where to draw isolines
 * @param {Object} options options on output
 * (zProperty: the property name in `points` from which z-values will be pulled,
 * commonProperties: GeoJSON properties passed to ALL isobands,
 * breaksProperties: GeoJSON properties passed, in order, to the correspondent isoband (order defined by breaks))
 * @returns {FeatureCollection<MultiLineString>} a FeatureCollection of MultiLineString features representing isolines.
 * @example
 * // create a grid of points with random z-values in their properties
 * var extent = [0, 30, 20, 50];
 * var cellWidth = 100;
 * var pointGrid = geo.grid.pointGrid(extent, cellWidth, {units: 'miles'});
 *
 * for (var i = 0; i < pointGrid.features.length; i++) {
 *     pointGrid.features[i].properties.temperature = Math.random() * 10;
 * }
 * var breaks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 *
 * var lines = geo.ipolate.isolines(pointGrid, breaks, {zProperty: 'temperature'});
 */
export function linesByIso(pointGrid: turf.FeatureCollection<turf.Point>,breaks: number[],
                           options: {zProperty: string, commonProperties: object, breaksProperties: object[]}):
turf.FeatureCollection<turf.MultiLineString> {
    return turf.isolines(pointGrid,breaks,options);
}

/**
 * Takes a LineString and returns a LineString offset by the specified distance.
 *
 * @param {Geometry|Feature<LineString|MultiLineString>} line input GeoJSON
 * @param {number} distance distance to offset the line (in meters, can be of negative value)
 * @param {Object} options Optional parameters
 * (units:] can be degrees, radians, miles, kilometers, inches, yards, meters)
 * @returns {Feature<LineString|MultiLineString>} Line offset from the input line
 * @example
 * var line = geo.create.lineString([[-83, 30], [-84, 36], [-78, 41]], { "stroke": "#F00" });
 *
 * var offsetLine = geo.line.offset(line, 2, {units: 'miles'});
 */
export function lineByOffset(line: turf.Feature<turf.LineString|turf.MultiLineString>,distance: number):
turf.Feature<turf.LineString|turf.MultiLineString> {
    return turf.lineOffset(line,distance/1000/*,options*/);
}

/**
 * Takes any LineString or Polygon and returns the overlapping lines between both features.
 *
 * @param {Geometry|Feature<LineString|MultiLineString|Polygon|MultiPolygon>} line1 any LineString or Polygon
 * @param {Geometry|Feature<LineString|MultiLineString|Polygon|MultiPolygon>} line2 any LineString or Polygon
 * @param {Object} options Optional parameters
 * (tolerance: Tolerance distance to match overlapping line segments (in kilometers))
 * @param {number} tolerance Tolerance distance to match overlapping line segments (in kilometers)
 * @returns {FeatureCollection<LineString>} lines(s) that are overlapping between both features
 * @example
 * var line1 = geo.create.lineString([[115, -35], [125, -30], [135, -30], [145, -35]]);
 * var line2 = geo.create.lineString([[115, -25], [125, -30], [135, -30], [145, -25]]);
 *
 * var overlapping = geo.line.overlap(line1, line2);
 */
export function linesByOverlap(line1: turf.Feature<turf.LineString|turf.MultiLineString|turf.Polygon|turf.MultiPolygon>,
                               line2: turf.Feature<turf.LineString|turf.MultiLineString|turf.Polygon|turf.MultiPolygon>,
                               tolerance: number): turf.FeatureCollection<turf.LineString> {
    return turf.lineOverlap(line1,line2,{tolerance});
}

/**
 * Creates a FeatureCollection of 2-vertex LineString segments from a LineString or Polygon.
 *
 * @param {Geometry|FeatureCollection|Feature<LineString|MultiLineString|MultiPolygon|Polygon>}
 * feature Polygon or LineString
 * @returns {FeatureCollection<LineString>} 2-vertex line segments
 * @example
 * var polygon = geo.create.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 * var segments = geo.line.segment(polygon);
 */
export function linesBySegment(feature: turf.FeatureCollection<turf.LineString|turf.MultiLineString|turf.Polygon|
    turf.MultiPolygon>|turf.Feature<turf.LineString|turf.MultiLineString|turf.Polygon|turf.MultiPolygon>):
turf.FeatureCollection<turf.LineString> {
    return turf.lineSegment(feature);
}

/**
 * Returns the shortest LineString path from start point to end point without colliding with
 * any Feature in FeatureCollection<Polygon> obstacles
 *
 * @param {Coord} point1 point
 * @param {Coord} point2 point
 * @param {Object} options Optional parameters
 * (obstacles: areas which path cannot travel,
 * minDistance: minimum distance between shortest path and obstacles,
 * units: "miles", "kilometers", "degrees", or "radians",
 * resolution: distance between matrix points on which the path will be calculated)
 * @param {FeatureCollection<Polygon>} fcoll areas which path cannot travel
 * @param {number} minDistance minimum distance between shortest path and obstacles
 * @param {number} resolution distance between matrix points on which the path will be calculated
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
export function lineByShortestPath(point1: turf.Point, point2: turf.Point, fcoll: turf.FeatureCollection<turf.Polygon>,
                                   minDistance: number, units: turf.Units, resolution: number):
turf.Feature<turf.LineString> {
    return turf.shortestPath(point1, point2, {obstacles: fcoll, minDistance: minDistance/1000, resolution});
}

/**
 * Takes aLineString, a start Point, and a stop point
 * and returns a subsection of the line in-between those points.
 * The start & stop points don't need to fall exactly on the line.
 *
 * This can be useful for extracting only the part of a route between waypoints.
 *
 * @param {Coord} point1 starting point
 * @param {Coord} point2 stopping point
 * @param {Feature<LineString>|LineString} line line to slice
 * @returns {Feature<LineString>} sliced line
 * @example
 * var line = geo.create.lineString([
 *     [-77.031669, 38.878605],
 *     [-77.029609, 38.881946],
 *     [-77.020339, 38.884084],
 *     [-77.025661, 38.885821],
 *     [-77.021884, 38.889563],
 *     [-77.019824, 38.892368]
 * ]);
 * var start = geo.create.point([-77.029609, 38.881946]);
 * var stop = geo.create.point([-77.021884, 38.889563]);
 *
 * var sliced = geo.line.slice(start, stop, line);
 */
export function lineBySlice(point1: turf.Point,point2: turf.Point,line: turf.Feature<turf.LineString>):
turf.Feature<turf.LineString> {
    return turf.lineSlice(point1,point2,line);
}

/**
 * Takes a LineString, a specified distance along the line to a start Point,
 * and a specified  distance along the line to a stop point
 * and returns a subsection of the line in-between those points.
 *
 * This can be useful for extracting only the part of a route between two distances.
 *
 * @param {Feature<LineString>|LineString} line input line
 * @param {number} startDist distance along the line to starting point, in meters
 * @param {number} stopDist distance along the line to ending point, in meters
 * @param {Object} options Optional parameters
 * (units: can be degrees, radians, miles, or kilometers)
 * @returns {Feature<LineString>} sliced line
 * @example
 * var line = geo.create.lineString([[7, 45], [9, 45], [14, 40], [14, 41]]);
 * var start = 12.5;
 * var stop = 25;
 * var sliced = geo.line.sliceAlong(line, start, stop, {units: 'miles'});
 */
export function lineBySliceAlong(line: turf.Feature<turf.LineString>,startDist: number,stopDist: number):
turf.Feature<turf.LineString> {
    return turf.lineSliceAlong(line,startDist/1000,stopDist/1000/*,options*/);
}

/**
 * Split a LineString by another GeoJSON Feature.
 *
 * @param {Feature<LineString>} line LineString Feature to split
 * @param {Feature<any>} splitter Feature used to split line
 * @returns {FeatureCollection<LineString>} Split LineStrings
 * @example
 * var line = geo.create.lineString([[120, -25], [145, -25]]);
 * var splitter = geo.create.lineString([[130, -15], [130, -35]]);
 *
 * var split = geo.line.split(line, splitter);
 */
export function linesBySplit(line: turf.Feature<turf.LineString>,splitter: turf.Feature<turf.Point|turf.MultiPoint|
    turf.LineString|turf.MultiLineString|turf.Polygon|turf.MultiPolygon>): turf.FeatureCollection<turf.LineString> {
    return turf.lineSplit(line,splitter);
}

/**
 * Converts a Polygon to LineString|(Multi)LineString or MultiPolygon
 * to a FeatureCollection of LineString|(Multi)LineString.
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
export function linesByPolygon(polygon: turf.Polygon|turf.MultiPolygon):
turf.FeatureCollection|turf.Feature<turf.LineString|turf.MultiLineString> {
    return turf.polygonToLine(polygon);
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
 * @param {BBox} bBox a bounding box inside of which geometries are placed
 * @param {number} num_vertices is how many coordinates each LineString will contain
 * @param {number} max_length is the maximum number of decimal degrees that a vertex can be from its predecessor
 * @param {number} max_rotation is the maximum angle that a line segment can turn from the previous segment (in degrees)
 * @returns {FeatureCollection<LineString>} GeoJSON FeatureCollection of LineString
 * @example
 * var lineStrings = geo.random.linestring(25, {bbox: [-180, -90, 180, 90]})
 * //=lineStrings
 */
export function linesByRandom(num: number,bBox: turf.BBox,num_vertices: number,max_length: number,
                              max_rotation: number): turf.FeatureCollection<turf.LineString> {
    max_rotation = max_rotation/180*Math.PI;
    return turf.randomLineString(num,{bbox:bBox,num_vertices,max_length,max_rotation});
}

/**
 * Returns a random polygon.
 *
 * @param {number} num How many geometries will be generated (if undefined, default value is 1)
 * @param {Object} options Optional parameters
 * @param {Array<number>} [options.bbox=[-180, -90, 180, 90]] a bounding box inside of which geometries are placed.
 * @param {number} [options.num_vertices=10] is how many coordinates each LineString will contain.
 * @param {number} [options.max_radial_length=10] is the maximum number of decimal degrees latitude or longitude that
 * a vertex can reach out of the center of the Polygon.
 * @param {BBox} bBox a bounding box inside of which geometries are placed.
 * @param {number} num_vertices is how many coordinates each LineString will contain.
 * @param {number} max_radial_length is the maximum number of decimal degrees latitude or longitude that a vertex can
 * reach out of the center of the Polygon.
 * @returns {FeatureCollection<LineString>} GeoJSON FeatureCollection of LineString
 * @example
 * var polygons = geo.random.polygon(25, {bbox: [-180, -90, 180, 90]})
 * //=polygons
 */
export function linesByRandomPolygon(num: number,bBox: turf.BBox,num_vertices: number,max_radial_length: number):
turf.FeatureCollection<turf.LineString> {
    return turf.randomPolygon(num,{bbox:bBox,num_vertices,max_radial_length});
}

/*

Points******************************************************************************************************************

*/

/**
 * Creates a Point Feature from a Position.
 *
 * @param {Array<number>} coords longitude, latitude position (each in decimal degrees)
 * @param {Object} properties Optional object of key-value pairs to add as properties
 * @param {Object} options Optional Parameters
 * (bbox: Bounding Box Array [west, south, east, north] associated with the Feature,
 * id: Identifier associated with the Feature)
 * @returns {Feature<Point>} a Point feature
 * @example
 * var point = geo.create.point([-75.343, 39.984]);
 *
 * //=point
 */
export function pointByCoords(coords: number[]): turf.Feature<turf.Point> {
    return turf.point(coords);
}

/**
 * Takes a LineString and returns a Point at a specified distance along the line.
 *
 * @param {Feature<LineString>} line input line
 * @param {number} distance distance along the line, in meters
 * @param {Object} options Optional parameters
 * (units: can be degrees, radians, miles, or kilometers)
 * @returns {Feature<Point>} Point `distance` `units` along the line
 * @example
 * var line = geo.create.lineString([[-83, 30], [-84, 36], [-78, 41]]);
 * var options = {units: 'miles'};
 *
 * var along = geo.line.along(line, 200, options);
 */
export function pointByAlong(line: turf.LineString,distance: number,options: {units: turf.Units}):
turf.Feature<turf.Point> {
    return turf.along(line,distance/1000,options);
}

/**
 * Takes a Feature or FeatureCollection and returns the absolute center point of all features.
 *
 * @param {GeoJSON} features GeoJSON to be centered
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
export function pointByCenter(features: turf.AllGeoJSON, options: {properties: object}): turf.Feature<turf.Point> {
    return turf.center(features, options);
}

/**
 * Takes any Feature or a FeatureCollection and returns its
 * [center of mass](https://en.wikipedia.org/wiki/Center_of_mass) using this formula:
 * [Centroid of Polygon](https://en.wikipedia.org/wiki/Centroid#Centroid_of_polygon).
 *
 * @param {GeoJSON} features GeoJSON to be centered
 * @param {Object} options Optional object to be used as the Feature's properties
 * @returns {Feature<Point>} the center of mass
 * @example
 * var polygon = geo.create.polygon([[[-81, 41], [-88, 36], [-84, 31], [-80, 33], [-77, 39], [-81, 41]]]);
 *
 * var center = geo.calc.centerOfMass(polygon);
 */
export function pointByCenterOfMass(features: turf.AllGeoJSON, options: object): turf.Feature<turf.Point> {
    return turf.centerOfMass(features, options);
}

/**
 * Takes one or more features and calculates the centroid using the mean of all vertices.
 * This lessens the effect of small islands and artifacts when calculating the centroid of a set of polygons.
 *
 * @param {GeoJSON} features GeoJSON to be centered
 * @param {Object} options Optional object to be used as the Feature's properties
 * @returns {Feature<Point>} the centroid of the input features
 * @example
 * var polygon = geo.create.polygon([[[-81, 41], [-88, 36], [-84, 31], [-80, 33], [-77, 39], [-81, 41]]]);
 *
 * var centroid = geo.calc.centroid(polygon);
 */
export function pointByCentroid(features: turf.AllGeoJSON, options: object): turf.Feature<turf.Point> {
    return turf.centroid(features, options);
}

/**
 * Takes a Point and calculates the location of a destination point given a distance in degrees, radians, miles, or
 * kilometers; and bearing in degrees. This uses the [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula)
 * to account for global curvature.
 *
 * @param {Coord} originPoint starting point
 * @param {number} distance distance from the origin point in meters
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
export function pointByDestination(originPoint: turf.Point, distance: number, angle: number): turf.Feature<turf.Point> {
    return turf.destination(originPoint, distance/1000, angle);
}

/**
 * Takes any LineString GeoJSON and returns the intersecting point(s).
 *
 * @param {Geometry|FeatureCollection|Feature<LineString|MultiLineString|Polygon|MultiPolygon>} line1 any LineString
 * @param {Geometry|FeatureCollection|Feature<LineString|MultiLineString|Polygon|MultiPolygon>} line2 any LineString
 * @returns {FeatureCollection<Point>} point(s) that intersect both
 * @example
 * var line1 = geo.create.lineString([[126, -11], [129, -21]]);
 * var line2 = geo.create.lineString([[123, -18], [131, -14]]);
 * var intersects = geo.line.intersect(line1, line2);
 */
export function pointByIntersect(line1: turf.FeatureCollection<turf.LineString>|turf.Feature<turf.LineString>,
                                 line2: turf.FeatureCollection<turf.LineString>|turf.Feature<turf.LineString>):
turf.FeatureCollection<turf.Point> {
    return turf.lineIntersect(line1,line2);
}

/**
 * Takes a linestring, multi-linestring, multi-polygon, or polygon and returns points at all self-intersections.
 *
 * @param {Feature<LineString|MultiLineString|MultiPolygon|Polygon>} feature input feature
 * @returns {FeatureCollection<Point>} self-intersections
 * @example
 * var poly = geo.create.polygon([[
 *   [-12.034835, 8.901183],
 *   [-12.060413, 8.899826],
 *   [-12.03638, 8.873199],
 *   [-12.059383, 8.871418],
 *   [-12.034835, 8.901183]
 * ]]);
 *
 * var kinks = geo.misc.kinks(poly);
 */
export function pointsByKinks(feature: turf.Feature<turf.LineString|turf.MultiLineString|turf.Polygon|
    turf.MultiPolygon>): turf.FeatureCollection<turf.Point> {
    return turf.kinks(feature);
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
export function pointByMid(point1: turf.Point, point2: turf.Point): turf.Feature<turf.Point> {
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
export function pointByNearest(targetPoint: turf.Point, points: turf.FeatureCollection<turf.Point>):
turf.Feature<turf.Point> {
    return turf.nearestPoint(targetPoint, points);
}

/**
 * Takes a Feature or FeatureCollection and returns a Point guaranteed to be on the surface of the feature.
 *
 * * Given a Polygon, the point will be in the area of the polygon
 * * Given a LineString, the point will be along the string
 * * Given a Point, the point will the same as the input
 *
 * @param {GeoJSON} features any Feature or FeatureCollection
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
export function pointByOnFeature(features: turf.AllGeoJSON): turf.Feature<turf.Point> {
    return turf.pointOnFeature(features);
}

/**
 * Takes a Point and a LineString and calculates the closest Point on the (Multi)LineString.
 *
 * @param {Geometry|Feature<LineString|MultiLineString>} lines lines to snap to
 * @param {Geometry|Feature<Point>|number[]} point point to snap from
 * @param {Object}  options Optional parameters
 * (units: "miles", "kilometers"
 * "degrees", or "radians")
 * @returns {Feature<Point>} closest point on the `line` to `point`. The properties object will contain three values:
 * `index`: closest point was found on nth line part,
 * `dist`: distance between pt and the closest point,
 * `location`: distance along the line between start and the closest point.
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
export function pointByNearestOnLine(lines: turf.LineString|turf.MultiLineString, point: turf.Point):
turf.Feature<turf.Point> {
    const pt: turf.Feature<turf.Point> =  turf.nearestPointOnLine(lines, point);
    pt.properties.dist = pt.properties.dist * 1000;
    return pt;
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
export function pointsByExplode(features: turf.AllGeoJSON): turf.FeatureCollection<turf.Point> {
    return turf.explode(features);
}

/**
 * Takes a set of points and estimates their 'property' values on a grid using the
 * [Inverse Distance Weighting (IDW) method](https://en.wikipedia.org/wiki/Inverse_distance_weighting).
 *
 * @param {FeatureCollection<Point>} points with known value
 * @param {number} cellSize the distance across each grid point
 * @param {Object} options Optional parameters
 * (gridType: defines the output format based on a Grid Type (options: 'square' | 'point' | 'hex' | 'triangle'),
 * zProperty: the property name in `points` from which z-values will be pulled,
 * zValue fallbacks to 3rd coordinate if no property exists,
 * units: used in calculating cellSize, can be degrees, radians, miles, or kilometers,
 * weight: exponent regulating the distance-decay weighting)
 * @param {FeatureCollection<Polygon>} gridType defines the output format based on a Grid Type
 * (options: 'square' | 'point' | 'hex' | 'triangle')
 * @param {string} property the property name in `points` from which z-values will be pulled,
 * zValue fallbacks to 3rd coordinate if no property exists
 * @param {number} weight exponent regulating the distance-decay weighting
 * @returns {FeatureCollection<Point|Polygon>} grid of points or polygons with interpolated 'property'
 * @example
 * var points = geo.random.point(30, {bbox: [50, 30, 70, 50]});
 *
 * // add a random property to each point
 * for each points in points {
 *     point.properties.solRad = Math.random() * 50;
 * });
 * var options = {gridType: 'points', property: 'solRad', units: 'miles'};
 * var grid = geo.ipolate.interpolate(points, 100, options);
 */
export function pointsByInterp(points: turf.FeatureCollection<turf.Point>,cellSize: number, gridType: turf.Grid,
                               property: string, weight: number): turf.FeatureCollection<turf.Point|turf.Polygon> {
    return turf.interpolate(points,cellSize/1000,{gridType, property, weight});
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
export function pointsByPolygonTangents(point: turf.Point, polygon: turf.Polygon): turf.FeatureCollection<turf.Point> {
    return turf.polygonTangents(point, polygon);
}

/**
 * Returns a random point.
 *
 * @param {number} num How many geometries will be generated (if undefined, default value is 1)
 * @param {Object} options Optional parameters
 * (bbox: a bounding box inside of which geometries are placed.)
 * @returns {FeatureCollection<Point>} GeoJSON FeatureCollection of points
 * @param {BBox} bBox a bounding box inside of which geometries are placed
 * @example
 * var points = geo.random.point(25, {bbox: [-180, -90, 180, 90]})
 * //=points
 */
export function pointsByRandom(num: number,bBox: turf.BBox): turf.FeatureCollection<turf.Point> {
    return turf.randomPoint(num,{bbox:bBox});
}

/*

Polygons****************************************************************************************************************

*/

/**
 * Creates a Polygon Feature from an Array of LinearRings.
 *
 * @param {Array<Array<Array<number>>>} coords an array of LinearRings
 * @param {Object} properties Optional object of key-value pairs to add as properties
 * @param {Object} options Optional Parameters
 * (bbox: Bounding Box Array [west, south, east, north] associated with the Feature,
 * id: Identifier associated with the Feature)
 * @returns {Feature<Polygon>} Polygon Feature
 * @example
 * var polygon = geo.create.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
 *
 * //=polygon
 */
export function polygonByCoords(coords: number[][][]): turf.Feature<turf.Polygon> {
    return turf.polygon(coords);
}

/**
 * Takes a bbox and returns an equivalent Polygon.
 *
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @returns {Feature<Polygon>} a Polygon representation of the bounding box
 * @example
 * var bbox = [0, 0, 10, 10];
 *
 * var poly = geo.bbox.polygon(bbox);
 *
 */
export function polygonByBbox(bbox: turf.BBox): turf.Feature {
    return turf.bboxPolygon(bbox);
}

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
 * @param {number} radius distance to draw the buffer (in meters, negative values are allowed)
 * @param {Object} options Optional parameters
 * (units: "miles", "nauticalmiles", "degrees", "radians", "inches", "yards", "meters", "kilometers",
 * steps: number of steps)
 * @param {number} steps number of steps
 * @returns {FeatureCollection|Feature<Polygon|MultiPolygon>|undefined} buffered features
 * @example
 * var point = geo.create.point([-90.548630, 14.616599]);
 * var buffered = geo.feature.buffer(point, 500, {units: 'miles'});
 */
export function polygonByBuffer(features: turf.GeometryObject|turf.Feature,radius: number,steps: number): turf.Feature {
    return turf.buffer(features,radius/1000,{steps});
}

/**
 * Takes a Point and calculates the circle polygon given a radius in degrees, radians, miles, or kilometers; and steps
 * for precision.
 *
 * @param {Feature<Point>|number[]} center center point
 * @param {number} radius radius of the circle
 * @param {Object} options Optional parameters
 * (steps: number of steps,
 * units: "miles", "kilometers", "degrees", or "radians")
 * @param {number} steps number of steps
 * @returns {Feature<Polygon>} circle polygon
 * @example
 * var center = [-75.343, 39.984];
 * var radius = 5;
 * var options = {steps: 10, units: 'kilometers', properties: {foo: 'bar'}};
 * var circle = geo.create.circle(center, radius, options);
 */
export function polygonByCircle(center: turf.Point, radius: number, steps: number): turf.Feature<turf.Polygon> {
    return turf.circle(center, radius/1000, {steps});
}

/**
 * Takes a set of points and returns a concave hull Polygon or MultiPolygon.
 * Internally, this uses [turf-tin] (https://github.com/Turfjs/turf-tin) to generate geometries.
 *
 * @param {FeatureCollection<Point>} points input points
 * @param {Object} options Optional parameters
 * (maxEdge: the length (in 'units') of an edge necessary for part of the hull to become concave.,
 * units: can be "degrees", "radians", "miles", or "kilometers")
 * @param {number} maxEdge: the length (in meters) of an edge necessary for part of the hull to become concave.
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
export function polygonByConcave(points: turf.FeatureCollection<turf.Point>, maxEdge: number):
turf.Feature<turf.Polygon|turf.MultiPolygon>|null {
    return turf.concave(points,{maxEdge: maxEdge/1000});
}

/**
 * Takes a Feature or a FeatureCollection and returns a convex hull Polygon.
 *
 * Internally this uses
 * the [convex-hull] (https://github.com/mikolalysenko/convex-hull) module that
 * implements a [monotone chain hull]
 * (http://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain).
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
export function polygonByConvex(features: turf.AllGeoJSON,options: {concavity: number}): turf.Feature<turf.Polygon> {
    return turf.convex(features,options);
}

/**
 * Finds the difference between two polygons by clipping the second polygon from the first.
 *
 * @param {Feature<Polygon|MultiPolygon>} poly1 input Polygon feature
 * @param {Feature<Polygon|MultiPolygon>} poly2 Polygon feature to difference from polygon1
 * @returns {Feature<Polygon|MultiPolygon>|null} a Polygon or MultiPolygon feature showing the area of `polygon1`
 * excluding the area of `polygon2` (if empty returns `null`)
 * @example
 * var polygon1 = geo.create.polygon([[
 *   [128, -26],
 *   [141, -26],
 *   [141, -21],
 *   [128, -21],
 *   [128, -26]
 * ]], {
 *   "fill": "#F00",
 *   "fill-opacity": 0.1
 * });
 * var polygon2 = geo.create.polygon([[
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
 * var difference = geo.bool.difference(polygon1, polygon2);
 *
 */
export function polygonByDifference(poly1: turf.Polygon|turf.MultiPolygon, poly2: turf.Polygon|turf.MultiPolygon):
turf.Feature|null {
    return turf.difference(poly1, poly2);
}

/**
 * Takes any number of features and returns a rectangular Polygon that encompasses all vertices.
 *
 * @param {GeoJSON} features input features
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
export function polygonByEnvelope(features: turf.AllGeoJSON): turf.Feature<turf.Polygon> {
    return turf.envelope(features);
}

/**
 * Takes two Polygon and finds their intersection. If they share a border, returns the border; if they don't intersect,
 * returns undefined.
 *
 * @param {Feature<Polygon>} poly1 the first polygon
 * @param {Feature<Polygon>} poly2 the second polygon
 * @returns {Feature|null} returns a feature representing the point(s) they share (in case of a Point  or MultiPoint),
 * the borders they share (in case of a LineString or a MultiLineString), the area they share (in case of Polygon or
 * MultiPolygon). If they do not share any point, returns `null`.
 * @example
 * var poly1 = geo.create.polygon([[
 *   [-122.801742, 45.48565],
 *   [-122.801742, 45.60491],
 *   [-122.584762, 45.60491],
 *   [-122.584762, 45.48565],
 *   [-122.801742, 45.48565]
 * ]]);
 *
 * var poly2 = geo.create.polygon([[
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
 * var intersection = geo.bool.intersect(poly1, poly2);
 *
 */
export function polygonByIntersect(poly1: turf.Polygon, poly2: turf.Polygon): turf.Feature|null {
    return turf.intersect(poly1, poly2);
}

/**
 * Converts (Multi)LineString(s) to Polygon(s).
 *
 * @param {FeatureCollection|Feature<LineString|MultiLineString>} lines Features to convert
 * @param {Object} [options={}] Optional parameters
 * @param {Object} [options.properties={}] translates GeoJSON properties to Feature
 * @param {boolean} [options.autoComplete=true] auto complete linestrings (matches first & last coordinates)
 * @param {boolean} [options.orderCoords=true] sorts linestrings to place outer ring at the first position of the
 * coordinates
 * @returns {Feature<Polygon|MultiPolygon>} converted to Polygons
 * @example
 * var line = geo.create.lineString([[125, -30], [145, -30], [145, -20], [125, -20], [125, -30]]);
 *
 * var polygon = geo.convert.lineToPolygon(line);
 */
export function polygonByLines(lines: turf.FeatureCollection<turf.LineString|turf.MultiLineString>):
turf.Feature<turf.Polygon|turf.MultiPolygon> {
    return turf.lineToPolygon(lines);
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
export function polygonByMask(polygon1: turf.FeatureCollection<turf.Polygon|turf.MultiPolygon>|
    turf.Feature<turf.Polygon|turf.MultiPolygon>,
                              polygon2: turf.Feature<turf.Polygon>): turf.Feature<turf.Polygon> {
    return turf.mask(polygon1,polygon2);
}

/**
 * Takes two or more Polygon and returns a combined polygon. If the input polygons are not contiguous, this function
 * returns a MultiPolygon feature.
 *
 * @param {Feature<Polygon>[]} polys An array of polygons to combine
 * @returns {Feature<(Polygon|MultiPolygon)>} a combined Polygon or MultiPolygon feature
 * @example
 * var poly1 = geo.create.polygon([[
 *     [-82.574787, 35.594087],
 *     [-82.574787, 35.615581],
 *     [-82.545261, 35.615581],
 *     [-82.545261, 35.594087],
 *     [-82.574787, 35.594087]
 * ]], {"fill": "#0f0"});
 * var poly2 = geo.create.polygon([[
 *     [-82.560024, 35.585153],
 *     [-82.560024, 35.602602],
 *     [-82.52964, 35.602602],
 *     [-82.52964, 35.585153],
 *     [-82.560024, 35.585153]
 * ]], {"fill": "#00f"});
 *
 * var union = geo.bool.union([poly1, poly2]);
 *
 */
export function polygonByUnion(polys: Array<turf.Feature<turf.Polygon>>): turf.Feature<turf.Polygon|turf.MultiPolygon> {
    return turf.union(...polys);
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
export function polygonsByCollect(polygons: turf.FeatureCollection<turf.Polygon>,
                                  points: turf.FeatureCollection<turf.Point>,inProperty: string,outProperty: string):
turf.FeatureCollection<turf.Polygon> {
    return turf.collect(polygons,points,inProperty,outProperty);
}

/**
 * Dissolves a FeatureCollection of polygon features, filtered by an optional property name:value.
 * Note that mulitpolygon features within the collection are not supported
 *
 * @param {FeatureCollection<Polygon>} featureCollection input feature collection to be dissolved
 * @param {Object} options Optional parameters
 * (propertyName: features with equals 'propertyName' in `properties` will be merged)
 * @param {string} propertyName features with equals 'propertyName' in `properties` will be merged
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
export function polygonsByDissolve(features: turf.FeatureCollection<turf.Polygon>,propertyName: string):
turf.FeatureCollection<turf.Polygon> {
    return turf.dissolve(features,{propertyName});
}

/**
 * Takes a grid FeatureCollection of Point features with z-values and an array of
 * value breaks and generates filled contour isobands.
 *
 * @param {FeatureCollection<Point>} pointGrid input points
 * @param {Array<number>} breaks where to draw contours
 * @param {Object} options options on output
 * (zProperty: the property name in `points` from which z-values will be pulled,
 * commonProperties: GeoJSON properties passed to ALL isobands,
 * breaksProperties: GeoJSON properties passed, in order, to the correspondent isoband (order defined by breaks))
 * @returns {FeatureCollection<MultiPolygon>} a FeatureCollection of MultiPolygon features representing isobands.
 */
export function polygonsByIsobands(pointGrid: turf.FeatureCollection<turf.Point>,breaks: number[],
                                   options: {zProperty: string, commonProperties: object, breaksProperties: object[]}):
turf.FeatureCollection<turf.MultiPolygon> {
    return turf.isobands(pointGrid,breaks,options);
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
export function polygonsByLines(lines: turf.FeatureCollection<turf.LineString|turf.MultiLineString>):
turf.FeatureCollection<turf.Polygon> {
    return turf.polygonize(lines);
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
export function polygonsByTesselate(poly: turf.Feature<turf.Polygon>): turf.FeatureCollection<turf.Polygon> {
    return turf.tesselate(poly);
}

/**
 * Takes a set of points and creates a
 * [Triangulated Irregular Network](http://en.wikipedia.org/wiki/Triangulated_irregular_network),
 * or a TIN for short, returned as a collection of Polygons. These are often used
 * for developing elevation contour maps or stepped heat visualizations.
 *
 * If an optional z-value property is provided then it is added as properties called `a`, `b`,
 * and `c` representing its value at each of the points that represent the corners of the
 * triangle.
 *
 * @param {FeatureCollection<Point>} points input points
 * @param {String} [z] name of the property from which to pull z values
 * This is optional: if not given, then there will be no extra data added to the derived triangles.
 * @returns {FeatureCollection<Polygon>} TIN output
 * @example
 * // generate some random point data
 * var points = geo.random.point(30, {bbox: [50, 30, 70, 50]});
 *
 * // add a random property to each point between 0 and 9
 * for (var i = 0; i < points.features.length; i++) {
 *   points.features[i].properties.z = ~~(Math.random() * 9);
 * }
 * var tin = geo.ipolate.tin(points, 'z');
 */
export function polygonsByTin(points: turf.FeatureCollection<turf.Point>,name: string):
turf.FeatureCollection<turf.Polygon> {
    return turf.tin(points,name);
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
export function polygonsByUnkink(polygon: turf.FeatureCollection<turf.Polygon|turf.MultiPolygon>|
    turf.Feature<turf.Polygon|turf.MultiPolygon>): turf.FeatureCollection<turf.Polygon> {
    return turf.unkinkPolygon(polygon);
}

/**
 * Takes a FeatureCollection of points, and a bounding box, and returns a FeatureCollection
 * of Voronoi polygons.
 *
 * The Voronoi algorithim used comes from the d3-voronoi package.
 *
 * @param {FeatureCollection<Point>} points to find the Voronoi polygons around.
 * @param {Object} bBox Optional clipping rectangle, in [minX, minY, maxX, MaxY] order.
 * @returns {FeatureCollection<Polygon>} a set of polygons, one per input point.
 * @example
 * var options = {
 *   bbox: [-70, 40, -60, 60]
 * };
 * var points = geo.random.point(100, options);
 * var voronoiPolygons = geo.calc.voronoi(points, options);
 */
export function polygonsByVoronoi(points: turf.FeatureCollection<turf.Point>, bBox: turf.BBox):
turf.FeatureCollection<turf.Polygon> {
    return turf.voronoi(points, bBox);
}
