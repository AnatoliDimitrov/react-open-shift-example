import constants from "./constants.js";
import { jsonRequest } from "./http.js";

async function getData() {
    try {
        let result = await jsonRequest(constants.TESTRESOURCE, 'POST', undefined, true, false);
        return result;
    } catch (err) {
        return err;
    }
}


export default {
    getData,
};