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
 * @param {number} minPoints Minimum number of points to generate a single cluster, points which do not meet this requirement will be classified as an 'edge' or 'noise'
 * @returns {FeatureCollection<Point>} Clustered Points with an additional two properties associated to each Feature:
 * - {number} cluster - the associated clusterId
 * - {string} dbscan - type of point it has been classified as ('core'|'edge'|'noise')
 * @example
 * // create random points with random z-values in their properties
 * var points = geo.random.point(100, {bbox: [0, 30, 20, 50]});
 * var maxDistance = 100;
 * var clustered = geo.cluster.dbscan(points, maxDistance);
 */
export function dbscan(points: turf.FeatureCollection<turf.Point>, maxDistance: number, minPoints: number): turf.FeatureCollection<turf.Point> {
    return turf.clustersDbscan(points, maxDistance/1000, {minPoints: minPoints});
}

/**
 * Takes a set of Point|points and partition them into clusters using the k-mean .
 * It uses the [k-means algorithm](https://en.wikipedia.org/wiki/K-means_clustering)
 *
 * @param {FeatureCollection<Point>} points to be clustered
 * @param {Object} options Optional parameters
 * (numberOfClusters: numberOfClusters that will be generated,
 * mutate: allows GeoJSON input to be mutated if true (significant performance increase))
 * @param {number} num number of clusters that will be generated
 * @returns {FeatureCollection<Point>} Clustered Points with an additional two properties associated to each Feature:
 * - {number} cluster - the associated clusterId
 * - {[number, number]} centroid - Centroid of the cluster [Longitude, Latitude]
 * @example
 * // create random points with random z-values in their properties
 * var points = geo.random.point(100, {bbox: [0, 30, 20, 50]});
 * var options = {numberOfClusters: 7};
 * var clustered = geo.cluster.kmeans(points, options);
 */
export function kmeans(points: turf.FeatureCollection<turf.Point>, num: number): turf.FeatureCollection<turf.Point> {
    return turf.clustersKmeans(points, {numberOfClusters:num, mutate:true});
}

/**
 * Get Cluster
 *
 * @param {FeatureCollection} geojson GeoJSON Features
 * @param {*} filter Filter used on GeoJSON properties to get Cluster
 * @returns {FeatureCollection} Single Cluster filtered by GeoJSON Properties
 * @example
 * var geojson = geo.create.featureCollection([
 *     turf.point([0, 0], {'marker-symbol': 'circle'}),
 *     turf.point([2, 4], {'marker-symbol': 'star'}),
 *     turf.point([3, 6], {'marker-symbol': 'star'}),
 *     turf.point([5, 1], {'marker-symbol': 'square'}),
 *     turf.point([4, 2], {'marker-symbol': 'circle'})
 * ]);
 *
 * // Create a cluster using K-Means (adds `cluster` to GeoJSON properties)
 * var clustered = geo.cluster.kmeans(geojson);
 *
 * // Retrieve first cluster (0)
 * var cluster = geo.cluster.get(clustered, {cluster: 0});
 * //= cluster
 *
 * // Retrieve cluster based on custom properties
 * geo.cluster.get(clustered, {'marker-symbol': 'circle'}).length;
 * //= 2
 * geo.cluster.get(clustered, {'marker-symbol': 'square'}).length;
 * //= 1
 */
export function get(fcoll: turf.FeatureCollection<turf.GeometryObject>, filter: any): turf.FeatureCollection<turf.GeometryObject> {
    return turf.getCluster(fcoll, filter);
}
