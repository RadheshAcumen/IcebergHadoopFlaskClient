import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/forms/inputFiled';
import FileUpload from '../../components/forms/fileUpload';
import { useLocation, useNavigate } from 'react-router-dom';
import back from "../../assets/icons/back.png"
import { formatString } from '../../components/helper/helper';
import errorToast from '../../components/toasts/errorToast';
import successToast from '../../components/toasts/successToast';
import { dataFilesToIceberg } from '../../redux/actions/conversionAction';
import { useDispatch } from 'react-redux';
import LogViewer from '../../components/formatResult';


const DataFilesToIceberg = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const currentPath = location.pathname.split('/')[1] || "Acumen Vega";
    const navigate = useNavigate();
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
                'Only files of type CSV, AVRO, PARQUET, ORC, or JSON are allowed!',
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
        console.log(data.data.data, ' on success');

        setIsSuccess(true);
        setConversionResult(data.data.data);
        successToast(data.data.message);
        setLoading(false);
    };

    const onError = (error, resetForm) => {
        console.log(error, 'error-------------------------', error?.data?.message, 'error?.data?.message');
        setLoading(false);
        setIsSuccess(false);
        const message = error?.data?.message;
        setConversionResult(message);
        errorToast(message);
    };


    const handleSubmit = async (values, resetForm) => {
        console.log("form values", values);
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
        <div className="flex w-full justify-center items-center h-[91.5vh] px-5">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form className="p-5 md:p-10 lg:p-10 w-full md:w-2/3 bg-white rounded-md shadow-2xl max-h-[80vh] overflow-auto">
                        <div className="flex items-center gap-4 pb-6">
                            < img
                                src={back}
                                alt="Icon"
                                className="w-4 cursor-pointer"
                                onClick={() => navigate(-1)}
                            />
                            <h1 className="text-2xl">{formatString(currentPath)}</h1>
                        </div>

                        <InputField label="GCS Bucket Name:" name="gcs_bucket" type="text" placeholder="Enter GCS Bucket Name" value={values?.gcs_bucket} />

                        <FileUpload
                            label="Upload Service Account JSON Key File:"
                            name="json_key"
                            accept=".json"
                            value={values?.json_key}
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
                            value={values?.data_file}
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
                            className={`w-full ${loading ? "bg-blue-300" : "bg-primary"} text-white py-2 px-4 rounded-lg hover:bg-primaryHover mt-4`}
                            disabled={loading}
                        >
                            {loading ? "Converting..." : "Convert to IceBerg"}
                        </button>

                        {/* Enhanced Result Display */}
                        {conversionResult && (
                            <div className={`mt-5 mb-6 p-4 text-start rounded-md border-l-4 ${isSuccess
                                ? 'bg-green-50 border-green-400 text-green-800'
                                : 'bg-red-50 border-red-400 text-red-800'
                                }`}>
                                <div className="flex items-center mb-2">
                                    <span className={`text-lg font-semibold ${isSuccess ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {isSuccess ? '✅ Conversion Result:' : '❌ Error:'}
                                    </span>
                                </div>
                                {/* <LogViewer log={conversionResult} /> */}
                                <div className="mt-5 mb-6 p-3 text-start text-black max-h-90 overflow-y-auto bg-gray-100 rounded">
                                    {(Array.isArray(conversionResult)
                                        ? conversionResult
                                        : [conversionResult] // wrap in array if it's a string
                                    ).map((line, index) => (
                                        <p key={index} className="mb-1">{line}</p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default DataFilesToIceberg;
