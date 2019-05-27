'use strict'

const { JSONPath } = require('jsonpath-plus');
const safeEval = require('safe-eval');

function test() {

}

(async() => {
    const json = {
        old: {
            name: "テスト",
            lat: 1,
            lng: 2,
        },
        new: {
            name: "テスト",
            lat: 3,
            lng: 4
        }
    };

    const preQuery = "`$[?(${isInRange('$.old.lat','$.old.lng',35.000, 135.000, 500)} && ${isInRange('$.new.lat','$.new.lng',35.000, 135.000, 500)})]`";

    // eval context
    const context = {
        process: process,
        isInRange: function(latPath, lngPath, lat, lng, range) {
            console.info(`${latPath},${lngPath}, ${lat}, ${lng}, ${range}`)
            const latData = JSONPath({ path: latPath, json, wrap: false })
            const lngData = JSONPath({ path: lngPath, json, wrap: false })
                // この辺でよしなにgeofence実装
            console.info({
                latData: latData,
                lngData: lngData
            })
            return true;
        }
    }

    // eval
    const query = safeEval(preQuery, context);

    // jsonpath
    const names = JSONPath({
        path: query,
        json
    });
    console.info(names);
})();