const UINT8_MASK = 0b00000000000000000000000011111111;

/**
 * Dreame stores all three configurables of their mop docks in a single PIID as one int
 * This int consists of three ints like so (represented here as an 32 bit int because js bitwise operations use those):
 *
 * XXXXXXXXWWWWWWWWPPPPPPPPOOOOOOOO
 *
 * where
 * - X is nothing
 * - W is the water grade (wetness of the mop pads)
 * - P is the pad cleaning frequency (apparently in m² plus 0 for "after each segment")
 * - O is the operation mode (mop, vacuum & mop, vacuum)
 *
 */

class DreameUtils {
    /**
     *
     * @param {number} input
     * @return {MOP_DOCK_SETTINGS}
     */
    static DESERIALIZE_MOP_DOCK_SETTINGS(input) {
        return {
            operationMode: input >>> 0 & UINT8_MASK,
            padCleaningFrequency: input >>> 8 & UINT8_MASK,
            waterGrade: input >>> 16 & UINT8_MASK
        };
    }

    /**
     *
     * @param {MOP_DOCK_SETTINGS} settings
     * @return {number}
     */
    static SERIALIZE_MOP_DOCK_SETTINGS(settings) {
        let result = 0 >>> 0;

        result |= (settings.waterGrade & UINT8_MASK);
        result <<= 8;

        result |= (settings.padCleaningFrequency & UINT8_MASK);
        result <<= 8;

        result |= (settings.operationMode & UINT8_MASK);

        return result;
    }

    /**
     * 
     * @param {string} str
     * @return {MISC_TUNABLES}
     */
    static DESERIALIZE_MISC_TUNABLES(str) {
        const arr = JSON.parse(str);
        const result = {};

        arr.forEach(elem => {
            result[elem.k] = elem.v;
        });

        return result;
    }

    /**
     *
     * @param {MISC_TUNABLES} obj
     * @return {string}
     */
    static SERIALIZE_MISC_TUNABLES_SINGLE_TUNABLE(obj) {
        const arr = [];

        Object.entries(obj).forEach(([k, v]) => {
            arr.push({k: k, v: v});
        });

        return JSON.stringify(arr[0]);
    }
}


/**
 * @typedef {object} MOP_DOCK_SETTINGS
 * @property {number} padCleaningFrequency
 * @property {number} operationMode
 * @property {number} waterGrade
 */

/**
 * @typedef {object} MISC_TUNABLES
 *
 * @property {number} [AutoDry]
 * @property {number} [CleanType]
 * @property {number} [FillinLight]
 * @property {number} [FluctuationConfirmResult]
 * @property {number} [FluctuationTestResult]
 * @property {number} [HotWash]
 * @property {number} [LessColl] 
 * @property {number} [MaterialDirectionClean]
 * @property {number} [MeticulousTwist]
 * @property {number} [MonitorHumanFollow]
 * @property {number} [MopScalable]
 * @property {number} [PetPartClean]
 * @property {number} [SmartAutoMop]
 * @property {number} [SmartAutoWash]
 * @property {number} [SmartCharge]
 * @property {number} [SmartDrying]
 * @property {number} [SmartHost]
 * @property {number} [StainIdentify]
 * @property {number} [SuctionMax]
 * 
 */

module.exports = DreameUtils;
