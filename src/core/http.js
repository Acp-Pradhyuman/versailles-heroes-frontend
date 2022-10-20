import { handleApiError } from "./error-handler";

import Axios from "./axios-wrapper";

const transformAxiosResponse = async _axios => await _axios.then(async res => await Promise.resolve(res.data)).catch(async err => await handleApiError(err.response));

const requestGetDelete = async (method, url, extras = {}) => await transformAxiosResponse(Axios.Client[method](url, extras));

const requestPutPatchPost = async (method, url, data, extras = {}) => await transformAxiosResponse(Axios.Client[method](url, data, extras));

const get = async (url, extras = {}) => await requestGetDelete("get", url, extras);
const del = async (url, extras = {}) => await requestGetDelete("delete", url, extras);
const put = async (url, data, extras = {}) => await requestPutPatchPost("put", url, data, extras);
const post = async (url, data, extras = {}) => await requestPutPatchPost("post", url, data, extras);
const patch = async (url, data, extras = {}) => await requestPutPatchPost("patch", url, data, extras);

// eslint-disable-next-line import/no-anonymous-default-export
export default { get, put, post, patch, delete: del };
