/**
 * Turf bbox functions.
 * http://turfjs.org/docs/
 */

/**
 *
 */
import * as turf from "@turf/turf";

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
export function polygon(bbox: turf.BBox): turf.Feature {
    return turf.bboxPolygon(bbox);
}

/**
 * Takes a bounding box and calculates the minimum square bounding box that
 * would contain the input.
 *
 * @param {BBox} bbox extent in [west, south, east, north] order
 * @returns {BBox} a square surrounding `bbox`
 * @example
 * var bbox = [-20, -20, -15, 0];
 * var squared = geo.bbox.square(bbox);
 *
 */
export function square(bbox: turf.BBox): turf.BBox {
    return turf.square(bbox);
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
export function clip(feature: turf.LineString|turf.MultiLineString|turf.Polygon|turf.MultiPolygon, bbox: turf.BBox): turf.Feature {
    return turf.bboxClip(feature, bbox);
}

/**
 * Takes a set of features, calculates the bbox of all input features, and returns a bounding box.
 *
 * @param {GeoJSON} features any GeoJSON object
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * var line = geo.create.lineString([[-74, 40], [-78, 42], [-82, 35]]);
 * var bbox = geo.create.bbox(line);
 * var bboxPolygon = geo.bbox.polygon(bbox);
 */
export function bbox(features: turf.AllGeoJSON): turf.BBox {
    return turf.bbox(features);
}