/**
 * Turf GRIDS functions.
 * http://turfjs.org/docs/
 */

/**
 *
 */

import * as turf from "@turf/turf";

/**
 * Takes a bounding box and the diameter of the cell and returns a FeatureCollection of flat-topped
 * hexagons or triangles (Polygon features) aligned in an "odd-q" vertical grid as
 * described in [Hexagonal Grids](http://www.redblobgames.com/grids/hexagons/).
 *
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @param {number} cellSide length of the side of the the hexagons or triangles, in units. It will also coincide with the
 * radius of the circumcircle of the hexagons.
 * @param {Object} options Optional parameters
 * (units: used in calculating cell size, can be "degrees", "radians", "miles", or "kilometers",
 * properties: passed to each hexagon or triangle of the grid,
 * maskpoly: if passed a Polygon or MultiPolygon, the grid Points will be created only inside it,
 * triangle: whether to return as triangles instead of hexagons)
 * @returns {FeatureCollection<Polygon>} a hexagonal grid
 * @example
 * var bbox = [-96,31,-84,40];
 * var cellSide = 50;
 * var options = {units: 'miles'};
 *
 * var hexgrid = turf.hexGrid(bbox, cellSide, options);
 */
export function hexGrid(bbox: turf.BBox,cellSide: number,options: {units: turf.Units, properties: object, maskpoly: turf.Feature<turf.Polygon|turf.MultiPolygon>, triangles: boolean}): turf.FeatureCollection<turf.Polygon> {
    return turf.hexGrid(bbox,cellSide,options);
}

/**
 * Creates a Point grid from a bounding box (with optional polygon mask).
 *
 * @name pointGrid
 * @param {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 * @param {number} cellSide the distance between points, in units
 * @param {Object} options Optional parameters
 * (units: used in calculating cellSide, can be degrees, radians, miles, or kilometers,
 * maskpoly: if passed a Polygon or MultiPolygon, the grid Points will be created only inside it,
 * properties: passed to each point of the grid)
 * @returns {FeatureCollection<Point>} grid of points
 * @example
 * var extent = [-70.823364, -33.553984, -70.473175, -33.302986];
 * var cellSide = 3;
 * var options = {units: 'miles'};
 *
 * var grid = turf.pointGrid(extent, cellSide, options);
 */
export function pointGrid(bbox: turf.BBox,cellSide: number,options: {units: turf.Units, maskpoly: turf.Feature<turf.Polygon|turf.MultiPolygon>, properties: object}): turf.FeatureCollection<turf.Point> {
    return turf.pointGrid(bbox,cellSide,options);
}

/**
 * Creates a square grid from a bounding box (with optional polygon mask).
 *
 * @param {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 * @param {number} cellSide of each cell, in units
 * @param {Object} options Optional parameters
 * (units: used in calculating cellSide, can be degrees, radians, miles, or kilometers,
 * maskpoly: if passed a Polygon or MultiPolygon, the grid Points will be created only inside it,
 * properties: passed to each point of the grid)
 * @returns {FeatureCollection<Polygon>} grid a grid of polygons
 * @example
 * var bbox = [-95, 30 ,-85, 40];
 * var cellSide = 50;
 * var options = {units: 'miles'};
 *
 * var squareGrid = turf.squareGrid(bbox, cellSide, options);
 */
export function squareGrid(bbox: turf.BBox,cellSide: number,options: {units: turf.Units, maskpoly: turf.Feature<turf.Polygon|turf.MultiPolygon>, properties: object}): turf.FeatureCollection<turf.Polygon> {
    return turf.squareGrid(bbox,cellSide,options);
}

/**
 * Takes a bounding box and a cell depth and returns a set of triangular polygons in a grid.
 *
 * @param {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 * @param {number} cellSide dimension of each cell
 * @param {Object}  options Optional parameters
 * (units: used in calculating cellSide, can be degrees, radians, miles, or kilometers,
 * maskpoly: if passed a Polygon or MultiPolygon, the grid Points will be created only inside it,
 * properties: passed to each point of the grid)
 * @returns {FeatureCollection<Polygon>} grid of polygons
 * @example
 * var bbox = [-95, 30 ,-85, 40];
 * var cellSide = 50;
 * var options = {units: 'miles'};
 *
 * var triangleGrid = turf.triangleGrid(bbox, cellSide, options);
 */
export function triangleGrid(bbox: turf.BBox,cellSide: number,options: {units: turf.Units, maskpoly: turf.Feature<turf.Polygon|turf.MultiPolygon>, properties: object}): turf.FeatureCollection<turf.Polygon> {
    return turf.triangleGrid(bbox,cellSide,options);
}
