import { EMAIL_LOGIN, GOOGLE_LOGIN, SIGNUP,  } from "./types";

export const emailLoginAction = (data, onSuccess, onError) => {
    return {
        type: EMAIL_LOGIN,
        data,
        onSuccess,
        onError,
    };
};

export const signupAction = (data, onSuccess, onError) => {
    return {
        type: SIGNUP,
        data,
        onSuccess,
        onError,
    };
};

export const googleLoginAction = (data, onSuccess, onError) => {
    return {
        type: GOOGLE_LOGIN,
        data,
        onSuccess,
        onError,
    };
};
