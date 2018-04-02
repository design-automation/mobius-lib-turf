/**
 * Functions for working with geojson properties.
 */

/**
 * Features contain properties.
 */

//  ===============================================================================================================
//  Model Constructors ===========================================================================================
//  ===============================================================================================================

/**
 * Returns an object of key-value pairs, the properties of this feature.
 *
 * @param feature The feature data.
 * @returns New model empty.
 */
export function getProperties(feature: any): any {
    return feature.properties;
}

/**
 * Returns an object of key-value pairs, the properties of this feature.
 *
 * @param feature The feature data.
 * @returns An array of property names
 */
export function getPropertyNames(feature: any): string[] {
    return feature.properties.keys();
}

/**
 * Returns the number of properties in a feature.
 *
 * @param feature The feature data.
 * @returns The number of properties.
 */
export function numProperties(feature: any): number {
    return feature.properties.length;
}

/**
 * Returns true if the  feature contains a property with the specified name.
 *
 * @param feature The feature data.
 * @returns True if teh feature contains a property with the specified name.
 */
export function hasProperty(feature: any, name: string): any {
    return feature.hasOwnProperty(name);
}

/**
 * Returns the property value for the property with the specified name.
 * If the property does not exist, returns undefined.
 *
 * @param feature The feature data.
 * @param name The name of the property, a string.
 * @returns The property value
 */
export function getProperty(feature: any, name: string): any {
    if(!feature.hasOwnProperty(name)) {return undefined};
    return feature[name];
}

/**
 * Returns the property value for the property with the specified name.
 * If the property does not exist, returns undefined.
 *
 * @param feature The feature data.
 * @param name The name of the property, a string.
 * @param value The value of the property, any value.
 */
export function setProperty(feature: any, name: string, value: any): void {
    feature.properties[name] = value;
}
