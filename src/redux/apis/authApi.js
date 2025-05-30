import { api } from "./api";

export const googleLoginApi = (params) => {
    return api.post(`/auth/google-login`, JSON.stringify(params));
};

export const emailLoginApi = (params) => {
    return api.post(`/auth/email-login`, JSON.stringify(params));
};

export const signupApi = (params) => {
    return api.post(`/auth/signup`, JSON.stringify(params));
};