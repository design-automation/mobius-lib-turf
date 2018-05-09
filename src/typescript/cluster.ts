/**
 * Turf AGGREGATION functions.
 * http://turfjs.org/docs/
 */

/**
 *
 */

 import * as turf from "@turf/turf";

/**
 * Takes a set of Point|points and partition them into clusters according to [DBSCAN's data clustering algorithm] (https://en.wikipedia.org/wiki/DBSCAN).
 *
 * @param {FeatureCollection<Point>} points to be clustered
 * @param {number} maxDistance Maximum Distance between any point of the cluster to generate the clusters (kilometers only)
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units=kilometers] in which `maxDistance` is expressed, can be degrees, radians, miles, or kilometers
 * @param {number} [options.minPoints=3] Minimum number of points to generate a single cluster,
 * points which do not meet this requirement will be classified as an 'edge' or 'noise'.
 * @returns {FeatureCollection<Point>} Clustered Points with an additional two properties associated to each Feature:
 * - {number} cluster - the associated clusterId
 * - {string} dbscan - type of point it has been classified as ('core'|'edge'|'noise')
 * @example
 * // create random points with random z-values in their properties
 * var points = turf.randomPoint(100, {bbox: [0, 30, 20, 50]});
 * var maxDistance = 100;
 * var clustered = turf.clustersDbscan(points, maxDistance);
 */
export function dbscan(points, maxDistance, parameters) {
    return turf.clustersDbscan(points, maxDistance, parameters);
}

/**
 * Takes a set of Point|points and partition them into clusters using the k-mean .
 * It uses the [k-means algorithm](https://en.wikipedia.org/wiki/K-means_clustering)
 *
 * @param {FeatureCollection<Point>} points to be clustered
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.numberOfClusters=Math.sqrt(numberOfPoints/2)] numberOfClusters that will be generated
 * @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated (significant performance increase if true)
 * @returns {FeatureCollection<Point>} Clustered Points with an additional two properties associated to each Feature:
 * - {number} cluster - the associated clusterId
 * - {[number, number]} centroid - Centroid of the cluster [Longitude, Latitude]
 * @example
 * // create random points with random z-values in their properties
 * var points = turf.randomPoint(100, {bbox: [0, 30, 20, 50]});
 * var options = {numberOfClusters: 7};
 * var clustered = turf.clustersKmeans(points, options);
 */
export function kmeans(points, parameters) {
    return turf.clustersKmeans(points, parameters);
}

/**
 * Get Cluster
 *
 * @param {FeatureCollection} geojson GeoJSON Features
 * @param {*} filter Filter used on GeoJSON properties to get Cluster
 * @returns {FeatureCollection} Single Cluster filtered by GeoJSON Properties
 * @example
 * var geojson = turf.featureCollection([
 *     turf.point([0, 0], {'marker-symbol': 'circle'}),
 *     turf.point([2, 4], {'marker-symbol': 'star'}),
 *     turf.point([3, 6], {'marker-symbol': 'star'}),
 *     turf.point([5, 1], {'marker-symbol': 'square'}),
 *     turf.point([4, 2], {'marker-symbol': 'circle'})
 * ]);
 *
 * // Create a cluster using K-Means (adds `cluster` to GeoJSON properties)
 * var clustered = turf.clustersKmeans(geojson);
 *
 * // Retrieve first cluster (0)
 * var cluster = turf.getCluster(clustered, {cluster: 0});
 * //= cluster
 *
 * // Retrieve cluster based on custom properties
 * turf.getCluster(clustered, {'marker-symbol': 'circle'}).length;
 * //= 2
 * turf.getCluster(clustered, {'marker-symbol': 'square'}).length;
 * //= 1
 */
export function get(geojson, filter) {
    return turf.getCluster(geojson, filter);
}
