import { URL } from "./_urls";
import { get } from "lodash";
import { http } from "../core";

const apiAccessToken = async () => {
    const response = await http.post(URL.GET_ACCESS_TOKEN());
    if (response && response.status >= 400) {
        const errorMessage = get(response, "data.message", "");
        throw new Error(errorMessage || "Something went wrong");
    }
    return response || null;

}

export { apiAccessToken }