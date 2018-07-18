/**
 * Turf feature functions.
 * http://turfjs.org/docs/
 */

/**
 *
 */

import * as turf from "@turf/turf";

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
export function collect(polygons: turf.FeatureCollection<turf.Polygon>,points: turf.FeatureCollection<turf.Point>,inProperty: string,outProperty: string): turf.FeatureCollection<turf.Polygon> {
    return turf.collect(polygons,points,inProperty,outProperty);
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
export function tesselate(poly: turf.Feature<turf.Polygon>): turf.FeatureCollection<turf.Polygon> {
    return turf.tesselate(poly);
}