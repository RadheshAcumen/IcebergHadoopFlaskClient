import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/forms/inputFiled';
import GoogleLoginButton from '../../components/forms/GoogleLoginButton';
import logo from "../../assets/icons/acumenVelocityLogo.svg";
import { useDispatch } from 'react-redux';

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirm_passsword: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirm_passsword: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

    const handleSubmit = (values) => {
        setLoading(true);
    };

    return (
        <div className="flex flex-col items-center h-screen bg-authBg relative">
            {/* Fixed Header at the Top */}
            <div className="fixed top-0 w-full p-3  flex  items-center">
                <img src={logo} alt="Logo" className="w-16 h-auto mr-3" />
                <h2 className="text-2xl font-bold">Acumen Vega</h2>
            </div>

            {/* Form Container with Margin to Avoid Overlapping Header */}
            <div className="mt-20 p-6 w-full max-w-md bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Signup</h2>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ values, setFieldValue }) => (
                        <Form className="space-y-4">
                            <InputField label="Name:" name="name" type="text" placeholder="Enter your name" />
                            <InputField label="Email:" name="email" type="email" placeholder="Enter your email" />
                            <InputField label="Password:" name="password" type="password" placeholder="Enter your password" />
                            <InputField label="Confirm Password:" name="confirm_passsword" type="password" placeholder="Enter your password" />

                            <button
                                type="submit"
                                className="w-full bg-primary text-secondaryText text-xl py-2 px-4 rounded-lg hover:bg-hover transition-all duration-300"
                            >
                                {loading ? 'Signing Up...' : 'Signup'}
                            </button>
                        </Form>
                    )}
                </Formik>

                <div className="mt-4">
                    <GoogleLoginButton />
                </div>

                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-500 text-sm font-medium">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <div className="mt-4 text-center">
                    <span className="text-gray-600">
                        Already have an account?{" "}
                        <button
                            onClick={() => navigate("/")}
                            className="text-blue-500 hover:text-blue-600"
                        >
                            Login
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Signup;
