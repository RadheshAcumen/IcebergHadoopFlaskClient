import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/forms/inputFiled';
import FileUpload from '../../components/forms/fileUpload';
import { useLocation, useNavigate } from 'react-router-dom';
import back from "../../assets/icons/back.png";
import { formatString } from '../../components/helper/helper';



const BigQueryToIceberg = () => {
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

    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append('project_id', values.project_id);
        formData.append('dataset_id', values.dataset_id);
        formData.append('gcs_bucket', values.gcs_bucket);

        if (values.key_file instanceof File) {
            formData.append('key_file', values.key_file);
        }

        setLoading(true);
        setConversionResult(null); // Clear previous result

        try {
            const response = await fetch('http://127.0.0.1:5000/iceberg-to-big-query-conversion', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                setConversionResult(result.message || JSON.stringify(result, null, 2));
            } else {
                setConversionResult(result.error || 'Something went wrong.');
            }

        } catch (error) {
            setConversionResult(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
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

                        <InputField label="GCP Project ID:" name="project_id" type="text" placeholder="Enter GCP Project ID" value={values?.project_id} />
                        <InputField label="BigQuery Dataset ID:" name="dataset_id" type="text" placeholder="Enter BigQuery Dataset ID" value={values?.dataset_id} />
                        <InputField label="GCS Bucket Name:" name="gcs_bucket" type="text" placeholder="Enter GCS Bucket Name:" value={values?.gcs_bucket} />
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
                        <button type="submit" className={`w-full ${loading ? "bg-blue-300" : "bg-primary"} text-white py-2 px-4 rounded-lg hover:bg-primaryHover mt-4`} disabled={loading}>
                            {loading ? "Converting..." : "Convert to IceBerg"}
                        </button>

                        {/* Result from Backend */}
                        {conversionResult && (
                            <div className="mt-5 mb-6 p-3 text-start text-black bg-gray-100 rounded-md whitespace-pre-wrap">
                                <strong>Result:</strong><br />
                                {conversionResult}
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default BigQueryToIceberg;
