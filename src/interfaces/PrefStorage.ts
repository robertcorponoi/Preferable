'use strict'

/**
 * Describes the structure of the local preference storage Object.
 * 
 * Currently this is a free-form Object with any key/value permitted but it's going to be locked down later.
 */
export default interface PrefStorage {
  [key: string]: any;
}