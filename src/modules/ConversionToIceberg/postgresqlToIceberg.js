import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/forms/inputFiled';
import FileUpload from '../../components/forms/fileUpload';
import errorToast from '../../components/toasts/errorToast';
import successToast from '../../components/toasts/successToast';
import LogViewer from '../../components/formatResult';
import { useDispatch } from 'react-redux';
import { postgresToIceberg } from '../../redux/actions/conversionAction';

const PostgresqlToIceberg = () => {
    const dispatch = useDispatch();
    const initialValues = {
        postgres_host: '',
        postgres_db: '',
        postgres_user: '',
        postgres_password: '',
        gcs_bucket_name: '',
        gcp_key_file: null,
    };

    const validationSchema = Yup.object({
        postgres_host: Yup.string().required('Required!'),
        postgres_db: Yup.string().required('Required!'),
        postgres_user: Yup.string().required('Required!'),
        postgres_password: Yup.string().required('Required!'),
        gcs_bucket_name: Yup.string().required('Required!'),
        gcp_key_file: Yup.mixed()
            .required('Required!')
            .test('fileType', 'Only JSON files are allowed!', (value) =>
                value ? value.type === 'application/json' : false
            ),
    });

    const [conversionResult, setConversionResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const onSuccess = (data) => {
        setIsSuccess(true);
        setConversionResult(data.data.data);
        successToast(data.data.message);
        setLoading(false);
    };

    const onError = (error, resetForm) => {
        setLoading(false);
        setIsSuccess(false);
        const message = error?.data?.message || 'Something went wrong!';
        setConversionResult(message);
        errorToast(message);
    };

    const handleSubmit = async (values, resetForm) => {
        const formData = new FormData();
        formData.append('postgres_host', values.postgres_host);
        formData.append('postgres_db', values.postgres_db);
        formData.append('postgres_user', values.postgres_user);
        formData.append('postgres_password', values.postgres_password);
        formData.append('gcs_bucket_name', values.gcs_bucket_name);
        if (values.gcp_key_file instanceof File) {
            formData.append('gcp_key_file', values.gcp_key_file);
        }
        setLoading(true);
        setConversionResult(null);
        setIsSuccess(false);
        dispatch(postgresToIceberg(formData, onSuccess, (error) => onError(error, resetForm)));
    };

    return (
        <div className="flex justify-center items-start w-full h-full py-5 px-4">
            <div className="w-full">
                {loading && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-10 flex justify-center items-center">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-primary h-12 w-12 animate-spin"></div>
                    </div>
                )}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
                >
                    {({ values, setFieldValue }) => (
                        <Form className="space-y-1">
                            <section>
                                <h2 className="text-xl text-start font-medium text-gray-700 mb-2">PostgreSQL Configuration</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                                    <InputField label="PostgreSQL Host:" name="postgres_host" type="text" placeholder="Enter Postgres Host" value={values.postgres_host} />
                                    <InputField label="PostgreSQL Database:" name="postgres_db" type="text" placeholder="Enter Database" value={values.postgres_db} />
                                    <InputField label="PostgreSQL User:" name="postgres_user" type="text" placeholder="Enter User" value={values.postgres_user} />
                                    <InputField label="PostgreSQL Password:" name="postgres_password" type="password" placeholder="Enter Password" value={values.postgres_password} />
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl text-start font-medium text-gray-700 mb-2">GCP Configuration</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                                    <InputField label="GCS Bucket Name:" name="gcs_bucket_name" type="text" placeholder="Enter GCS Bucket Name" value={values.gcs_bucket_name} />
                                    <FileUpload
                                        label="Upload JSON Key File:"
                                        name="gcp_key_file"
                                        accept=".json"
                                        value={values.gcp_key_file}
                                        onChange={(e) => {
                                            const file = e.currentTarget.files[0];
                                            if (file && file.type === 'application/json') {
                                                setFieldValue('gcp_key_file', file);
                                            } else {
                                                alert('Only JSON files are allowed!');
                                            }
                                        }}
                                    />
                                </div>
                            </section>

                            <button
                                type="submit"
                                className={`w-full text-white py-2 px-4 rounded-lg transition-colors duration-200 
                                    ${loading ? "bg-primary/50 cursor-not-allowed" : "bg-primary hover:bg-primaryHover"}`}
                                disabled={loading}
                            >
                                {loading ? "Converting..." : "Convert to Iceberg"}
                            </button>

                            {conversionResult && (
                                <div
                                    className={`mt-6 p-4 text-sm text-start rounded-md border-l-4
                                    ${isSuccess
                                            ? 'bg-green-50 border-green-400 text-green-800'
                                            : 'bg-red-50 border-red-400 text-red-800'
                                        }`}
                                >
                                    <div className="flex items-center mb-2">
                                        <span className={`text-lg font-semibold ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                                            {isSuccess ? '✅ Conversion Result:' : '❌ Error:'}
                                        </span>
                                    </div>
                                    <LogViewer log={conversionResult} />
                                </div>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default PostgresqlToIceberg;
