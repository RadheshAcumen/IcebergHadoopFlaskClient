// import React, { useState } from 'react';
// import { Formik, Form } from 'formik';
// import * as Yup from 'yup';
// import InputField from '../../components/forms/inputFiled';
// import FileUpload from '../../components/forms/fileUpload';
// import { useLocation, useNavigate } from 'react-router-dom';
// import back from "../../assets/icons/back.png";
// import { formatString } from '../../components/helper/helper';

// const BigQueryToIceberg = () => {
//     const location = useLocation();
//     const currentPath = location.pathname.split('/')[1] || "Acumen Vega";
//     const navigate = useNavigate();

//     const initialValues = {
//         project_id: '',
//         dataset_id: '',
//         gcs_bucket: '',
//         key_file: null,
//     };

//     const validationSchema = Yup.object({
//         project_id: Yup.string().required('Required!'),
//         dataset_id: Yup.string().required('Required!'),
//         gcs_bucket: Yup.string().required('Required!'),
//         key_file: Yup.mixed()
//             .required('Required!')
//             .test('fileType', 'Only JSON files are allowed!', (value) =>
//                 value ? value.type === 'application/json' : false
//             ),
//     });

//     const [conversionResult, setConversionResult] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [isSuccess, setIsSuccess] = useState(false);

//     const handleSubmit = async (values) => {
//         const formData = new FormData();
//         formData.append('project_id', values.project_id);
//         formData.append('dataset_id', values.dataset_id);
//         formData.append('gcs_bucket', values.gcs_bucket);

//         if (values.key_file instanceof File) {
//             formData.append('key_file', values.key_file);
//         }

//         setLoading(true);
//         setConversionResult(null);
//         setIsSuccess(false);

//         try {
//             const response = await fetch(' http://192.168.29.144:5000/iceberg-to-big-query-conversion', {
//                 method: 'POST',
//                 body: formData
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 setIsSuccess(true);
//                 // Handle different possible response formats
//                 let displayResult = '';

//                 if (result.result) {
//                     // If backend returns {result: "formatted_string"}
//                     displayResult = result.result;
//                 } else if (result.message) {
//                     // If backend returns {message: "formatted_string"}
//                     displayResult = result.message;
//                 } else if (typeof result === 'string') {
//                     // If backend returns the string directly
//                     displayResult = result;
//                 } else {
//                     // Fallback to JSON display with better formatting
//                     displayResult = `CONVERSION SUMMARY:
// Tables Processed: ${result.tables_processed || 'N/A'}
// Total Rows: ${result.total_rows || 'N/A'}
// Total Time: ${result.total_time_sec || 'N/A'} seconds
// Throughput: ${result.throughput || 'N/A'} rows/second

// ✅ CONVERSION COMPLETED SUCCESSFULLY!
// All BigQuery tables have been converted to Iceberg format.`;
//                 }

//                 setConversionResult(displayResult);
//             } else {
//                 setIsSuccess(false);
//                 setConversionResult(result.error || 'Something went wrong.');
//             }

//         } catch (error) {
//             setIsSuccess(false);
//             setConversionResult(`Error: ${error.message}`);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex w-full justify-center items-center h-[91.5vh] px-5">
//             <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSubmit}
//             >
//                 {({ values, setFieldValue }) => (
//                     <Form className="p-5 md:p-10 lg:p-10 w-full md:w-2/3 bg-white rounded-md shadow-2xl max-h-[80vh] overflow-auto">
//                         <div className="flex items-center gap-4 pb-6">
//                             <img
//                                 src={back}
//                                 alt="Icon"
//                                 className="w-4 cursor-pointer"
//                                 onClick={() => navigate(-1)}
//                             />
//                             <h1 className="text-2xl">{formatString(currentPath)}</h1>
//                         </div>

//                         <InputField
//                             label="GCP Project ID:"
//                             name="project_id"
//                             type="text"
//                             placeholder="Enter GCP Project ID"
//                             value={values?.project_id}
//                         />
//                         <InputField
//                             label="BigQuery Dataset ID:"
//                             name="dataset_id"
//                             type="text"
//                             placeholder="Enter BigQuery Dataset ID"
//                             value={values?.dataset_id}
//                         />
//                         <InputField
//                             label="GCS Bucket Name:"
//                             name="gcs_bucket"
//                             type="text"
//                             placeholder="Enter GCS Bucket Name:"
//                             value={values?.gcs_bucket}
//                         />
//                         <FileUpload
//                             label="Upload Service Account JSON Key File:"
//                             name="key_file"
//                             accept=".json"
//                             value={values?.jsonFile}
//                             onChange={(e) => {
//                                 const file = e.currentTarget.files[0];
//                                 if (file && file.type === 'application/json') {
//                                     setFieldValue('key_file', file);
//                                 } else {
//                                     alert('Only JSON files are allowed!');
//                                 }
//                             }}
//                         />
//                         <button
//                             type="submit"
//                             className={`w-full ${loading ? "bg-blue-300" : "bg-primary"} text-white py-2 px-4 rounded-lg hover:bg-primaryHover mt-4`}
//                             disabled={loading}
//                         >
//                             {loading ? "Converting..." : "Convert to IceBerg"}
//                         </button>

//                         {/* Enhanced Result Display */}
//                         {conversionResult && (
//                             <div className={`mt-5 mb-6 p-4 text-start rounded-md border-l-4 ${isSuccess
//                                     ? 'bg-green-50 border-green-400 text-green-800'
//                                     : 'bg-red-50 border-red-400 text-red-800'
//                                 }`}>
//                                 <div className="flex items-center mb-2">
//                                     <span className={`text-lg font-semibold ${isSuccess ? 'text-green-600' : 'text-red-600'
//                                         }`}>
//                                         {isSuccess ? '✅ Conversion Result:' : '❌ Error:'}
//                                     </span>
//                                 </div>
//                                 <pre className="whitespace-pre-wrap text-sm font-mono bg-white p-3 rounded border overflow-x-auto">
//                                     {conversionResult}
//                                 </pre>
//                             </div>
//                         )}
//                     </Form>
//                 )}
//             </Formik>
//         </div>
//     );
// };

// export default BigQueryToIceberg;

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/forms/inputFiled';
import FileUpload from '../../components/forms/fileUpload';
import { useLocation, useNavigate } from 'react-router-dom';
import back from "../../assets/icons/back.png";
import { formatString } from '../../components/helper/helper';
import { useDispatch } from 'react-redux';
import { bigqueryToIceberg} from '../../redux/actions/conversionAction';
import successToast from '../../components/toasts/successToast';
import errorToast from '../../components/toasts/errorToast';
import LogViewer from '../../components/formatResult';

const BigQueryToIceberg = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const currentPath = location.pathname.split('/')[1] || "Acumen Vega";
    const navigate = useNavigate();

    const initialValues = {
        project_id: '',
        dataset_id: '',
        gcs_bucket: '',
        key_file: null,
    };

    const validationSchema = Yup.object({
        project_id: Yup.string().required('Required!'),
        dataset_id: Yup.string().required('Required!'),
        gcs_bucket: Yup.string().required('Required!'),
        key_file: Yup.mixed()
            .required('Required!')
            .test('fileType', 'Only JSON files are allowed!', (value) =>
                value ? value.type === 'application/json' : false
            ),
    });

    const [conversionResult, setConversionResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const onSuccess = (data) => {
        console.log(data, 'data on success');
        setIsSuccess(true);
        setConversionResult(data.data);
        successToast(data.data.message);
        setLoading(false);
    };

    const onError = (error) => {
        setLoading(false);
        setIsSuccess(false);

        const message = error?.data?.message || error?.message || "An unknown error occurred.";
        setConversionResult(message);
        errorToast(message);
    };


    const handleSubmit = async (values) => {
        console.log("form values", values);
        const formData = new FormData();
        formData.append('project_id', values.project_id);
        formData.append('dataset_id', values.dataset_id);
        formData.append('gcs_bucket', values.gcs_bucket);

        if (values.key_file instanceof File) {
            formData.append('key_file', values.key_file);
        }

        setLoading(true);
        setConversionResult(null);
        setIsSuccess(false);

        // Dispatch redux thunk with formData
        dispatch(bigqueryToIceberg(formData, onSuccess, onError));
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
                            <img
                                src={back}
                                alt="Icon"
                                className="w-4 cursor-pointer"
                                onClick={() => navigate(-1)}
                            />
                            <h1 className="text-2xl">{formatString(currentPath)}</h1>
                        </div>

                        <InputField
                            label="GCP Project ID:"
                            name="project_id"
                            type="text"
                            placeholder="Enter GCP Project ID"
                            value={values?.project_id}
                        />
                        <InputField
                            label="BigQuery Dataset ID:"
                            name="dataset_id"
                            type="text"
                            placeholder="Enter BigQuery Dataset ID"
                            value={values?.dataset_id}
                        />
                        <InputField
                            label="GCS Bucket Name:"
                            name="gcs_bucket"
                            type="text"
                            placeholder="Enter GCS Bucket Name:"
                            value={values?.gcs_bucket}
                        />
                        <FileUpload
                            label="Upload Service Account JSON Key File:"
                            name="key_file"
                            accept=".json"
                            value={values?.jsonFile}
                            onChange={(e) => {
                                const file = e.currentTarget.files[0];
                                if (file && file.type === 'application/json') {
                                    setFieldValue('key_file', file);
                                } else {
                                    alert('Only JSON files are allowed!');
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
                                <pre className="whitespace-pre-wrap text-sm font-mono bg-white p-3 rounded border overflow-x-auto">
                                    {typeof conversionResult === 'object' ? JSON.stringify(conversionResult, null, 2) : conversionResult}
                                </pre>
                                <LogViewer log={conversionResult?.result} />
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default BigQueryToIceberg;
