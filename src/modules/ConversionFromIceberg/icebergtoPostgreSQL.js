import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/forms/inputFiled';
import FileUpload from '../../components/forms/fileUpload';
import { useLocation, useNavigate } from 'react-router-dom';
import back from "../../assets/icons/back.png"
import { formatString } from '../../components/helper/helper';

const IcebergToPostgreSQL = () => {
    const initialValues = {
        bucket_name: '',
        catalog_name: '',
        database_name: '',
        jsonFile: null,
        postgreSQL_host: '',
        postgreSQL_database: '',
        postgreSQL_user: '',
        postgreSQL_password: '',
        sqlFile: '',
    };

    const validationSchema = Yup.object({
        bucket_name: Yup.string().required('Required!'),
        catalog_name: Yup.string().required('Required!'),
        database_name: Yup.string().required('Required!'),
        jsonFile: Yup.mixed()
            .required('Required!')
            .test('fileType', 'Only JSON files are allowed!', (value) =>
                value ? value.type === 'application/json' : false
            ),
        postgreSQL_host: Yup.string().required('Required!'),
        postgreSQL_database: Yup.string().required('Required!'),
        postgreSQL_user: Yup.string().required('Required!'),
        postgreSQL_password: Yup.string().required('Required!'),
        sqlFile: Yup.mixed()
            .required('Required!')
            .test('fileType', 'Only SQL files are allowed!', (value) =>
                value ? value.name.split('.').pop().toLowerCase() === 'sql' : false
            ),
    });

    const logMessages = [
        "Initializing Iceberg to PostgreSQL conversion...",
        "Connecting to Iceberg catalog...",
        "Fetching metadata from Iceberg tables...",
        "Retrieved table structure and data...",
        "Connecting to PostgreSQL database...",
        "Database connection established.",
        "Transforming Iceberg data for PostgreSQL compatibility...",
        "Uploading transformed data...",
        "Executing SQL scripts...",
        "Data successfully migrated to PostgreSQL.",
        "Total processing time: 350.87 seconds",
        "Memory usage: 108.53 MB",
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
        <div className="flex w-full justify-center items-center h-[91.5vh] p-5">
            <div className="w-full md:w-3/4 h-full bg-white rounded-md shadow-2xl">

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue }) => (
                        <Form ref={scrollRef} className="p-5 lg:p-8 h-full overflow-y-auto">
                            <div className="flex items-center gap-4 pb-2">
                                < img
                                    src={back}
                                    alt="Icon"
                                    className="w-4 cursor-pointer"
                                    onClick={() => navigate(-1)}
                                />
                                <h1 className="text-2xl">{formatString(currentPath)}</h1>
                            </div>

                            <h6 className="pb-1 text-2xl text-start pt-2">Iceberg Configuration</h6>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <InputField label="Bucket Name:" name="bucket_name" type="text" placeholder="Enter Bucket Name" value={values?.bucket_name} />
                                <InputField label="Catalog Name:" name="catalog_name" type="text" placeholder="Enter Catalog Name" value={values?.catalog_name} />
                                <InputField label="Database Name:" name="database_name" type="text" placeholder="Enter Database Name" value={values?.database_name} />
                                <FileUpload
                                    label="Upload JSON Key File:"
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
                            </div>

                            <h6 className="pb-1 text-2xl text-start">PostgreSQL Configuration</h6>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <InputField label="PostgreSQL Host:" name="postgreSQL_host" type="text" placeholder="Enter PostgreSQL Host" value={values?.postgreSQL_host} />
                                <InputField label="PostgreSQL Database:" name="postgreSQL_database" type="text" placeholder="Enter PostgreSQL Database" value={values?.postgreSQL_database} />
                                <InputField label="PostgreSQL User:" name="postgreSQL_user" type="text" placeholder="Enter PostgreSQL User" value={values?.postgreSQL_user} />
                                <InputField label="PostgreSQL Password:" name="postgreSQL_password" type="password" placeholder="Enter PostgreSQL Password" value={values?.postgreSQL_password} />
                            </div>

                            <h6 className="pb-1 text-2xl text-start">SQL File Configuration</h6>
                            <FileUpload
                                label="Upload SQL File:"
                                name="sqlFile"
                                accept=".sql"
                                placeholder="(.sql)"
                                value={values?.sqlFile}
                                onChange={(e) => {
                                    const file = e.currentTarget.files[0];
                                    if (file) {
                                        const fileExtension = file.name.split('.').pop().toLowerCase();
                                        if (fileExtension === 'sql') {
                                            setFieldValue('sqlFile', file);
                                        } else {
                                            alert('Only SQL files are allowed!');
                                        }
                                    }
                                }}
                            />

                            <button type="submit" className={`w-full ${startLogging ? "bg-blue-300" : "bg-primary"} text-white py-2 px-4 rounded-lg hover:bg-hover mt-4`} disabled={startLogging}>
                                {startLogging ? "Converting..." : "Convert to PostgreSQL"}
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
        </div>
    );
};

export default IcebergToPostgreSQL;
