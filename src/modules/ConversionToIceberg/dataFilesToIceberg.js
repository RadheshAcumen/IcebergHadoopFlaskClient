import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/forms/inputFiled';
import FileUpload from '../../components/forms/fileUpload';
import { useDispatch } from 'react-redux';
import { dataFilesToIceberg } from '../../redux/actions/conversionAction';
import successToast from '../../components/toasts/successToast';
import errorToast from '../../components/toasts/errorToast';
import LogViewer from '../../components/formatResult';

const DataFilesToIceberg = () => {
    const dispatch = useDispatch();
    const initialValues = {
        gcs_bucket: '',
        json_key: null,
        data_file: null,
    };

    const validationSchema = Yup.object({
        gcs_bucket: Yup.string().required('Required!'),
        json_key: Yup.mixed()
            .required('Required!')
            .test('fileType', 'Only JSON files are allowed!', (value) =>
                value ? value.type === 'application/json' : false
            ),
        data_file: Yup.mixed()
            .required('Required!')
            .test(
                'fileType',
                'Only CSV, AVRO, PARQUET, ORC, or JSON files are allowed!',
                (value) => {
                    if (!value) return false;
                    const allowedTypes = [
                        'text/csv',
                        'application/json',
                        'application/vnd.apache.avro',
                        'application/parquet',
                        'application/orc',
                    ];
                    const allowedExtensions = ['.csv', '.json', '.avro', '.parquet', '.orc'];
                    const fileExtension = value.name?.slice(value.name.lastIndexOf('.')).toLowerCase();
                    return (
                        allowedTypes.includes(value.type) ||
                        allowedExtensions.includes(fileExtension)
                    );
                }
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
        formData.append('gcs_bucket', values.gcs_bucket);
        if (values.json_key instanceof File) {
            formData.append('json_key', values.json_key);
        }
        if (values.data_file instanceof File) {
            formData.append('data_file', values.data_file);
        }

        setLoading(true);
        setConversionResult(null);
        setIsSuccess(false);

        dispatch(dataFilesToIceberg(formData, onSuccess, (error) => onError(error, resetForm)));
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
                        <Form className="space-y-4">
                            <InputField
                                label="GCS Bucket Name:"
                                name="gcs_bucket"
                                type="text"
                                placeholder="Enter GCS Bucket Name"
                                value={values.gcs_bucket}
                            />

                            <FileUpload
                                label="Upload Service Account JSON Key File:"
                                name="json_key"
                                accept=".json"
                                value={values.json_key}
                                onChange={(e) => {
                                    const file = e.currentTarget.files[0];
                                    if (file && file.type === 'application/json') {
                                        setFieldValue('json_key', file);
                                    } else {
                                        alert('Only JSON files are allowed!');
                                    }
                                }}
                            />

                            <FileUpload
                                label="Choose A Data File:"
                                name="data_file"
                                accept=".csv,.json,.avro,.parquet,.orc"
                                value={values.data_file}
                                placeholder="(.CSV, AVRO, PARQUET, ORC, JSON)"
                                onChange={(e) => {
                                    const file = e.currentTarget.files[0];
                                    if (file) {
                                        const allowedTypes = [
                                            'text/csv',
                                            'application/json',
                                            'application/vnd.apache.avro',
                                            'application/parquet',
                                            'application/orc',
                                        ];
                                        const allowedExtensions = ['.csv', '.json', '.avro', '.parquet', '.orc'];
                                        const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

                                        if (
                                            allowedTypes.includes(file.type) ||
                                            allowedExtensions.includes(fileExtension)
                                        ) {
                                            setFieldValue('data_file', file);
                                        } else {
                                            alert('Only CSV, AVRO, PARQUET, ORC, or JSON files are allowed!');
                                        }
                                    }
                                }}
                            />

                            <button
                                type="submit"
                                className={`w-full text-white py-2 px-4 rounded-lg mt-4 transition-colors duration-200 
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

export default DataFilesToIceberg;
