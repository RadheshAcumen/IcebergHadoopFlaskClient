import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/forms/inputFiled';
import FileUpload from '../../components/forms/fileUpload';
import { useLocation, useNavigate } from 'react-router-dom';

const SQLServerToIceberg = () => {
    const initialValues = {
        server_address: '',
        username: '',
        password: '',
        jsonFile: null,
    };

    const validationSchema = Yup.object({
        server_address: Yup.string().required('Required!'),
        username: Yup.string().required('Required!'),
        password: Yup.string().required('Required!'),
        jsonFile: Yup.mixed()
            .required('Required!')
            .test('fileType', 'Only JSON files are allowed!', (value) =>
                value ? value.type === 'application/json' : false
            ),
    });

    const logMessages = [
        "Connecting to SQL Server...",
        "Connection established successfully.",
        "Fetching table data...",
        "Total records fetched: 2,456,789",
        "Processing data...",
        "Data transformation completed.",
        "Uploading to Google Cloud Storage...",
        "Upload successful.",
        "Loading data into Iceberg...",
        "Table creation and data loading completed.",
        "Total processing time: 300.12 seconds",
        "Memory usage: 92.40 MB",
        "Conversion complete!"
    ];

    const [displayedLogs, setDisplayedLogs] = useState([]);
    const [startLogging, setStartLogging] = useState(false);
    const scrollRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

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
                        <Form className="space-y-6">
                            {/* SQL Server Configuration */}
                            <section>
                                <h2 className="text-xl text-start font-medium text-gray-700 mb-2">SQL Server Configuration</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                                    <InputField label="Server Address:" name="server_address" type="text" placeholder="e.g., localhost:1433" value={values.server_address} />
                                    <InputField label="Username:" name="username" type="text" placeholder="Enter Username" value={values.username} />
                                    <InputField label="Password:" name="password" type="password" placeholder="Enter Password" value={values.password} />
                                </div>
                            </section>

                            {/* GCP / Iceberg Configuration */}
                            <section>
                                <h2 className="text-xl text-start font-medium text-gray-700 mb-2">GCP & Iceberg Configuration</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                                    <FileUpload
                                        label="Upload GCP JSON Key File:"
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

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`w-full text-white py-2 px-4 rounded-lg transition-colors duration-200 
                                    ${startLogging ? "bg-primary/50 cursor-not-allowed" : "bg-primary hover:bg-primaryHover"}`}
                                disabled={startLogging}
                            >
                                {startLogging ? "Converting..." : "Convert to Iceberg"}
                            </button>

                            {/* Logs Display */}
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

export default SQLServerToIceberg;
