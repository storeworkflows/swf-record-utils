export function recordWrapper (record) {
    return {
        ...record,
        _getKeyInformation: function (keys, valueKey) {
            const keysArr = keys.split(".");

            if (keysArr.length === 1) {
                if (!this[keys]) return "";
                if (!this[keys][valueKey]) return "";
                return this[keys][valueKey]
            }

            let currentObjectKeyValue = null;

            for (let index = 0, length = keysArr.length; index < length; index ++ ) {
                const currentKey = keysArr[index];
                const self = index === 0 ? this : currentObjectKeyValue;

                if (!self[currentKey]) return "";

                currentObjectKeyValue = self[currentKey];

                if (index === length - 1) {
                    if (!currentObjectKeyValue ) return "";

                    return currentObjectKeyValue[valueKey];
                }

            }

        },
        getValue: function (key) {
            return this._getKeyInformation(key, "value");
        },
        getDisplayValue: function (key) {
            return this._getKeyInformation(key, "display_value")
        }
    }
}