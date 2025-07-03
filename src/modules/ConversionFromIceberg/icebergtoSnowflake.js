import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/forms/inputFiled';
import FileUpload from '../../components/forms/fileUpload';
import { useLocation, useNavigate } from 'react-router-dom';

const IcebergToSnowflake = () => {
    const location = useLocation();
    const currentPath = location.pathname.split('/')[1] || "Acumen Vega";
    const navigate = useNavigate();

    const initialValues = {
        gcp_bucket_name: '',
        warehouse: '',
        snowflake_user: '',
        snowflake_password: '',
        snowflake_account: '',
        snowflake_warehouse: '',
        snowflake_database: '',
        snowflake_schema: '',
        jsonFile: null,
    };

    const validationSchema = Yup.object({
        gcp_bucket_name: Yup.string().required('Required!'),
        warehouse: Yup.string().required('Required!'),
        snowflake_user: Yup.string().required('Required!'),
        snowflake_password: Yup.string().required('Required!'),
        snowflake_account: Yup.string().required('Required!'),
        snowflake_warehouse: Yup.string().required('Required!'),
        snowflake_database: Yup.string().required('Required!'),
        snowflake_schema: Yup.string().required('Required!'),
        jsonFile: Yup.mixed()
            .required('Required!')
            .test('fileType', 'Only JSON files are allowed!', (value) =>
                value ? value.type === 'application/json' : false
            ),
    });

    const logMessages = [
        "Initializing Iceberg to Snowflake conversion...",
        "Connecting to GCP bucket...",
        "Fetching Iceberg metadata...",
        "Processing table structures...",
        "Establishing connection with Snowflake...",
        "Snowflake authentication successful.",
        "Transforming data format...",
        "Uploading data to Snowflake...",
        "Executing Snowflake SQL scripts...",
        "Data successfully migrated to Snowflake.",
        "Total processing time: 412.45 seconds",
        "Memory usage: 129.37 MB",
        "Conversion complete!"
    ];

    const [displayedLogs, setDisplayedLogs] = useState([]);
    const [startLogging, setStartLogging] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (startLogging) {
            let index = 0;
            const interval = setInterval(() => {
                setDisplayedLogs((prevLogs) => [...prevLogs, logMessages[index]]);
                index++;
                if (scrollRef.current) {
                    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
                }
                if (index === logMessages.length) {
                    clearInterval(interval);
                    setStartLogging(false);
                }
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [startLogging]);

    const handleSubmit = (values) => {
        console.log('Form values:', values);
        setDisplayedLogs([]);
        setStartLogging(true);
    };

    return (
        <div className="flex justify-center items-start w-full h-full py-5 px-4">
            <div className="w-full">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue }) => (
                        <Form className="space-y-1">
                            <section>
                                <h2 className="text-xl text-start font-medium text-gray-700 mb-2">Iceberg Configuration</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                                    <InputField label="GCP Bucket Name:" name="gcp_bucket_name" type="text" placeholder="Enter GCP Bucket Name" value={values.gcp_bucket_name} />
                                    <InputField label="Warehouse:" name="warehouse" type="text" placeholder="Enter Warehouse (root folder)" value={values.warehouse} />
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl text-start font-medium text-gray-700 mb-2">Snowflake Configuration</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                                    <InputField label="Snowflake User:" name="snowflake_user" type="text" placeholder="Enter Snowflake User" value={values.snowflake_user} />
                                    <InputField label="Snowflake Password:" name="snowflake_password" type="password" placeholder="Enter Snowflake Password" value={values.snowflake_password} />
                                    <InputField label="Snowflake Account:" name="snowflake_account" type="text" placeholder="Enter Snowflake Account" value={values.snowflake_account} />
                                    <InputField label="Snowflake Warehouse:" name="snowflake_warehouse" type="text" placeholder="Enter Snowflake Warehouse" value={values.snowflake_warehouse} />
                                    <InputField label="Snowflake Database:" name="snowflake_database" type="text" placeholder="Enter Snowflake Database" value={values.snowflake_database} />
                                    <InputField label="Snowflake Schema:" name="snowflake_schema" type="text" placeholder="Enter Snowflake Schema" value={values.snowflake_schema} />
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl text-start font-medium text-gray-700 mb-2">Service Account Key</h2>
                                <FileUpload
                                    label="Upload Service Account Key File:"
                                    name="jsonFile"
                                    accept=".json"
                                    value={values.jsonFile}
                                    onChange={(e) => {
                                        const file = e.currentTarget.files[0];
                                        if (file && file.type === 'application/json') {
                                            setFieldValue('jsonFile', file);
                                        } else {
                                            alert('Only JSON files are allowed!');
                                        }
                                    }}
                                />
                            </section>

                            <button
                                type="submit"
                                className={`w-full text-white py-2 px-4 rounded-lg transition-colors duration-200 
                                    ${startLogging ? "bg-primary/50 cursor-not-allowed" : "bg-primary hover:bg-primaryHover"}`}
                                disabled={startLogging}
                            >
                                {startLogging ? "Converting..." : "Convert to Snowflake"}
                            </button>

                            {displayedLogs.length > 0 && (
                                <div
                                    ref={scrollRef}
                                    className="mt-6 p-4 rounded-md bg-gray-100 max-h-80 overflow-y-auto text-sm text-gray-800"
                                >
                                    {displayedLogs.map((log, index) => (
                                        <p key={index} className="mb-1">{log}</p>
                                    ))}
                                </div>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default IcebergToSnowflake;
