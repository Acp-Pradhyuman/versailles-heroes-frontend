import { URL } from "./_urls";
import { get } from "lodash";
import { http } from "../core";

const apiGetRate = async (currencyType) => {
    const response = await http.get(URL.GET_RATES(currencyType));
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data", "");
        throw new Error(errorMessage || "Something went wrong!");
    }
    return response || null;
}

export { apiGetRate }