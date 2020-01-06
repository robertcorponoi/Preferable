'use strict'

/**
 * Describes the structure of a single preference added to Prefs.
 */
export default interface Pref {
  /**
   * The name of this preference.
   * 
   * @property {string}
   */
  name: string,

  /**
   * The timestamp of when this preference was created.
   * 
   * @property {number}
   */
  timestamp: number;

  /**
   * The type of preference that this preference is (bool, etc).
   * 
   * @property {string}
   */
  type: string;

  /**
   * Various data that is specific to the type of preference this is.
   * 
   * @property {*}
   */
  data: any;
}