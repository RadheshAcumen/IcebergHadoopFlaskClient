import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch } from "react-redux";
import { googleClientId } from '../../redux/config';
import { googleLoginAction } from '../../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = ({ width = 400 }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSuccess = (data) => {
        localStorage.setItem('oAuthToken', data.credential);
        setLoading(true);
        // dispatch(googleLoginAction({ access_token: data.credential },
        //     (data) => {
        //         setLoading(false);
        //         // localStorage.setItem('accessToken', data.data.data.accessToken);
        //         localStorage.setItem('user_id', data.data.data.user.id);
        //         localStorage.setItem('email', data.data.data.user.email);
        //         navigate('/multi-factor-auth', { state: { email: data.data.data.user.email } });
        //     },
        //     (data) => {
        //         alert("Google Login Failed");
        //         setLoading(false);
        //     }));

        setTimeout(() => {
            localStorage.setItem('accessToken', 'kjdchsdc');
            navigate('/dashboard');
            setLoading(false);
        }, 2000);
    };


    return (
        <GoogleOAuthProvider clientId={googleClientId}>
            <div className="flex justify-center">
                {loading ? (
                    <span className="text-gray-500">Loading...</span>
                ) : (
                    <GoogleLogin
                        width={width}
                        text="continue_with"
                        onSuccess={onSuccess}
                        onError={() => alert("Login Failed")}
                    />
                )}
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton;
