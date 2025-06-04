import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/forms/inputFiled';
import GoogleLoginButton from '../../components/forms/GoogleLoginButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from "../../assets/icons/acumenVelocityLogo.svg";

const Login = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const initialValues = { email: '', password: '' };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required!'),
        password: Yup.string().required('Required!'),
    });

    const handleSubmit = async (values) => {
        setLoading(true);

        // Simulating API call
        setTimeout(() => {
            localStorage.setItem('accessToken', 'kjdchsdc');
            navigate('/dashboard');
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center h-screen bg-authBg relative">
            {/* Fixed Header at the Top */}
            <div className="fixed top-0 w-full p-3 flex items-center">
                <img src={logo} alt="Logo" className="w-16 h-auto mr-3" />
                <h2 className="text-2xl font-bold">Acumen Vega</h2>
            </div>

            {/* Centered Login Form */}
            <div className="flex flex-grow justify-center items-center w-full pt-20">
                <div className="p-6 w-full max-w-md bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Login</h2>

                    {/* Form */}
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {() => (
                            <Form className="space-y-4">
                                <InputField label="Email:" name="email" type="email" placeholder="Enter your email" />
                                <InputField label="Password:" name="password" type="password" placeholder="Enter your password" />
                                <button
                                    type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-hover transition-all duration-300">
                                    {loading ? 'Logging In...' : 'Login'}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    {/* OR Separator */}
                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-gray-300" />
                        <span className="px-2 text-gray-500 text-sm font-medium">OR</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>
                    <div>
                        <GoogleLoginButton />
                    </div>

                    {/* OR Separator */}
                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-gray-300" />
                        <span className="px-2 text-gray-500 text-sm font-medium">OR</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    <div className="text-center">
                        <span className="text-gray-600">
                            Don't have an account?{" "}
                            <button
                                onClick={() => navigate("/signup")}
                                className="text-blue-500 hover:text-blue-600"
                            >
                                Signup
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
