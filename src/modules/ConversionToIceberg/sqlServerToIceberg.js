import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/forms/inputFiled';
import FileUpload from '../../components/forms/fileUpload';
import { useLocation, useNavigate } from 'react-router-dom';
import back from "../../assets/icons/back.png"
import { formatString } from '../../components/helper/helper';

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
    const currentPath = location.pathname.split('/')[1] || "Acumen Vega";
    const navigate = useNavigate()

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
        setDisplayedLogs([]); // Reset logs before starting
        setStartLogging(true);
    };

    return (
        <div className="flex w-full justify-center items-center h-[91.5vh] px-5">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form ref={scrollRef} className="p-5 md:p-10 lg:p-10 w-full md:w-2/3 bg-white rounded-md shadow-2xl max-h-[88vh] overflow-auto">

                        <div className="flex items-center gap-4 pb-6">
                            < img
                                src={back}
                                alt="Icon"
                                className="w-4 cursor-pointer"
                                onClick={() => navigate(-1)}
                            />
                            <h1 className="text-2xl">{formatString(currentPath)}</h1>
                        </div>

                        <h6 className="pb-1 text-2xl text-start">SQL Server Settings</h6>
                        <InputField label="Server Address:" name="server_address" type="text" placeholder="Enter Server Address (e.g., localhost:1433)" value={values?.server_address} />
                        <InputField label="Username:" name="username" type="text" placeholder="Enter Username" value={values?.username} />
                        <InputField label="Password:" name="password" type="password" placeholder="Enter Password" value={values?.password} />

                        <h6 className="pb-1 text-2xl text-start">GCP and Iceberg Configuration</h6>
                        <FileUpload
                            label="Upload GCP JSON Key File:"
                            name="jsonFile"
                            accept=".json"
                            value={values?.jsonFile}
                            onChange={(e) => {
                                const file = e.currentTarget.files[0];
                                if (file && file.type === 'application/json') {
                                    setFieldValue('jsonFile', file);
                                } else {
                                    alert('Only JSON files are allowed!');
                                }
                            }}
                        />

                        <button type="submit" className={`w-full ${startLogging ? "bg-blue-300" : "bg-primary"} text-white py-2 px-4 rounded-lg hover:bg-primary-hover mt-4`} disabled={startLogging}>
                            {startLogging ? "Converting..." : "Convert to IceBerg"}
                        </button>

                        <div className="mt-5 mb-6 p-3 text-start text-black max-h-90">
                            {displayedLogs.map((log, index) => (
                                <p key={index} className="mb-1">{log}</p>
                            ))}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SQLServerToIceberg;
