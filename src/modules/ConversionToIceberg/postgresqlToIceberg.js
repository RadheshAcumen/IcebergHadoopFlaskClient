import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/forms/inputFiled';
import FileUpload from '../../components/forms/fileUpload';
import { useLocation, useNavigate } from 'react-router-dom';

const PostgresqlToIceberg = () => {
    const initialValues = {
        postgres_host: '',
        postgres_database: '',
        postgres_user: '',
        postgres_password: '',
        gcs_name: '',
        jsonFile: null,
    };

    const validationSchema = Yup.object({
        postgres_host: Yup.string().required('Required!'),
        postgres_database: Yup.string().required('Required!'),
        postgres_user: Yup.string().required('Required!'),
        postgres_password: Yup.string().required('Required!'),
        gcs_name: Yup.string().required('Required!'),
        jsonFile: Yup.mixed()
            .required('Required!')
            .test('fileType', 'Only JSON files are allowed!', (value) =>
                value ? value.type === 'application/json' : false
            ),
    });

    const logMessages = [
        "Processing tables in PostgreSQL database...",
        "Table 'department' does not exist. Creating new table...",
        "Table 'department' created and data loaded successfully.",
        "Total processing time: 3.0 seconds",
        "Table 'employees' does not exist. Creating new table...",
        "Table 'employees' created and data loaded successfully.",
        "Total processing time: 9.0 seconds",
        "Table 'productsupplies' does not exist. Creating new table...",
        "Table 'productsupplies' created and data loaded successfully.",
        "Total processing time: 10.0 seconds",
        "Table 'suppliers' does not exist. Creating new table...",
        "Table 'suppliers' created and data loaded successfully.",
        "Total processing time: 20.0 seconds",
        "Memory usage: 50.0 MB",
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

    const location = useLocation();
    const currentPath = location.pathname.split('/')[1] || "Acumen Vega";
    const navigate = useNavigate();

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
                                <h2 className="text-xl text-start font-medium text-gray-700 mb-2">PostgreSQL Configuration</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                                    <InputField label="PostgreSQL Host:" name="postgres_host" type="text" placeholder="Enter Postgres Host" value={values.postgres_host} />
                                    <InputField label="PostgreSQL Database:" name="postgres_database" type="text" placeholder="Enter Database" value={values.postgres_database} />
                                    <InputField label="PostgreSQL User:" name="postgres_user" type="text" placeholder="Enter User" value={values.postgres_user} />
                                    <InputField label="PostgreSQL Password:" name="postgres_password" type="password" placeholder="Enter Password" value={values.postgres_password} />
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl text-start font-medium text-gray-700 mb-2">GCP Configuration</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                                    <InputField label="GCS Bucket Name:" name="gcs_name" type="text" placeholder="Enter GCS Bucket Name" value={values.gcs_name} />
                                    <FileUpload
                                        label="Upload JSON Key File:"
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
                                </div>
                            </section>

                            <button
                                type="submit"
                                className={`w-full text-white py-2 px-4 rounded-lg transition-colors duration-200 
                                    ${startLogging ? "bg-primary/50 cursor-not-allowed" : "bg-primary hover:bg-primaryHover"}`}
                                disabled={startLogging}
                            >
                                {startLogging ? "Converting..." : "Convert to Iceberg"}
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

export default PostgresqlToIceberg;
