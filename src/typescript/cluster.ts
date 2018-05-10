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
 * @param {Object} options Optional parameters
 * (units: "miles", "kilometers", "degrees", or "radians", 
 * minPoints: Minimum number of points to generate a single cluster, points which do not meet this requirement will be classified as an 'edge' or 'noise'.)
 * @returns {FeatureCollection<Point>} Clustered Points with an additional two properties associated to each Feature:
 * - {number} cluster - the associated clusterId
 * - {string} dbscan - type of point it has been classified as ('core'|'edge'|'noise')
 * @example
 * // create random points with random z-values in their properties
 * var points = turf.randomPoint(100, {bbox: [0, 30, 20, 50]});
 * var maxDistance = 100;
 * var clustered = turf.clustersDbscan(points, maxDistance);
 */
export function dbscan(points: turf.FeatureCollection<turf.Point>, maxDistance: number, options: {units: turf.Units,minPoints: number}): turf.FeatureCollection<turf.Point> {
    return turf.clustersDbscan(points, maxDistance, options);
}

/**
 * Takes a set of Point|points and partition them into clusters using the k-mean .
 * It uses the [k-means algorithm](https://en.wikipedia.org/wiki/K-means_clustering)
 *
 * @param {FeatureCollection<Point>} points to be clustered
 * @param {Object} options Optional parameters
 * (numberOfClusters: numberOfClusters that will be generated,
 * mutate: allows GeoJSON input to be mutated if true (significant performance increase))
 * @returns {FeatureCollection<Point>} Clustered Points with an additional two properties associated to each Feature:
 * - {number} cluster - the associated clusterId
 * - {[number, number]} centroid - Centroid of the cluster [Longitude, Latitude]
 * @example
 * // create random points with random z-values in their properties
 * var points = turf.randomPoint(100, {bbox: [0, 30, 20, 50]});
 * var options = {numberOfClusters: 7};
 * var clustered = turf.clustersKmeans(points, options);
 */
export function kmeans(points: turf.FeatureCollection<turf.Point>, options: {numberOfClusters: number, mutate: boolean}): turf.FeatureCollection<turf.Point> {
    return turf.clustersKmeans(points, options);
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
export function get(fcoll: turf.FeatureCollection<turf.GeometryObject>, filter: any): turf.FeatureCollection<turf.GeometryObject> {
    return turf.getCluster(fcoll, filter);
}
