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
 * @param {number} cellSide length of the side of the the hexagons or triangles, in meters. It will also coincide with the
 * radius of the circumcircle of the hexagons.
 * @param {Object} options Optional parameters
 * (units: used in calculating cell size, can be "degrees", "radians", "miles", or "kilometers",
 * properties: passed to each hexagon or triangle of the grid,
 * maskpoly: if passed a Polygon or MultiPolygon, the grid Points will be created only inside it,
 * triangle: whether to return as triangles instead of hexagons)
 * @param {Feature<Polygon|MultiPolygon>} mask if passed a Polygon or MultiPolygon, the grid Points will be created only inside it
 * @returns {FeatureCollection<Polygon>} a hexagonal grid
 * @example
 * var bbox = [-96,31,-84,40];
 * var cellSide = 50;
 * var options = {units: 'miles'};
 *
 * var hexgrid = geo.grid.hexGrid(bbox, cellSide, options);
 */
export function hexGrid(bbox: turf.BBox,cellSide: number, mask: turf.Feature<turf.Polygon|turf.MultiPolygon>): turf.FeatureCollection<turf.Polygon> {
    return turf.hexGrid(bbox,cellSide/1000,{mask:mask});
}

/**
 * Takes a bounding box and the diameter of the cell and returns a FeatureCollection of flat-topped
 * hexagons or triangles (Polygon features) aligned in an "odd-q" vertical grid as
 * described in [Hexagonal Grids](http://www.redblobgames.com/grids/hexagons/).
 *
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @param {number} cellSide length of the side of the the hexagons or triangles, in meters. It will also coincide with the
 * radius of the circumcircle of the hexagons.
 * @param {Object} options Optional parameters
 * (units: used in calculating cell size, can be "degrees", "radians", "miles", or "kilometers",
 * properties: passed to each hexagon or triangle of the grid,
 * maskpoly: if passed a Polygon or MultiPolygon, the grid Points will be created only inside it,
 * triangle: whether to return as triangles instead of hexagons)
 * @param {Feature<Polygon|MultiPolygon>} mask if passed a Polygon or MultiPolygon, the grid Points will be created only inside it
 * @returns {FeatureCollection<Polygon>} a hexagonal grid
 * @example
 * var bbox = [-96,31,-84,40];
 * var cellSide = 50;
 * var options = {units: 'miles'};
 *
 * var hexgrid = geo.grid.hexGrid(bbox, cellSide, options);
 */
export function triHexGrid(bbox: turf.BBox,cellSide: number, mask: turf.Feature<turf.Polygon|turf.MultiPolygon>): turf.FeatureCollection<turf.Polygon> {
    return turf.hexGrid(bbox,cellSide/1000,{mask: mask, triangles: true});
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
 * @param {Feature<Polygon|MultiPolygon>} mask if passed a Polygon or MultiPolygon, the grid Points will be created only inside it
 * @returns {FeatureCollection<Point>} grid of points
 * @example
 * var extent = [-70.823364, -33.553984, -70.473175, -33.302986];
 * var cellSide = 3;
 * var options = {units: 'miles'};
 *
 * var grid = geo.grid.pointGrid(extent, cellSide, options);
 */
export function pointGrid(bbox: turf.BBox,cellSide: number, mask: turf.Feature<turf.Polygon|turf.MultiPolygon>): turf.FeatureCollection<turf.Point> {
    return turf.pointGrid(bbox,cellSide/1000,{mask: mask});
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
 * @param {Feature<Polygon|MultiPolygon>} mask if passed a Polygon or MultiPolygon, the grid Points will be created only inside it
 * @returns {FeatureCollection<Polygon>} grid a grid of polygons
 * @example
 * var bbox = [-95, 30 ,-85, 40];
 * var cellSide = 50;
 * var options = {units: 'miles'};
 *
 * var squareGrid = geo.grid.squareGrid(bbox, cellSide, options);
 */
export function squareGrid(bbox: turf.BBox,cellSide: number, mask: turf.Feature<turf.Polygon|turf.MultiPolygon>): turf.FeatureCollection<turf.Polygon> {
    return turf.squareGrid(bbox,cellSide/1000,{mask: mask});
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
 * @param {Feature<Polygon|MultiPolygon>} mask if passed a Polygon or MultiPolygon, the grid Points will be created only inside it
 * @returns {FeatureCollection<Polygon>} grid of polygons
 * @example
 * var bbox = [-95, 30 ,-85, 40];
 * var cellSide = 50;
 * var options = {units: 'miles'};
 *
 * var triangleGrid = geo.grid.triangleGrid(bbox, cellSide, options);
 */
export function triangleGrid(bbox: turf.BBox,cellSide: number, mask: turf.Feature<turf.Polygon|turf.MultiPolygon>): turf.FeatureCollection<turf.Polygon> {
    return turf.triangleGrid(bbox,cellSide/1000,{mask: mask});
}
