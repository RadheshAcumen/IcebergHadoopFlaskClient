import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/forms/inputFiled';
import FileUpload from '../../components/forms/fileUpload';
import { useLocation, useNavigate } from 'react-router-dom';
import back from "../../assets/icons/back.png"
import { formatString } from '../../components/helper/helper';

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
        setDisplayedLogs([]); // Reset logs before starting
        setStartLogging(true);
    };

    const location = useLocation();
    const currentPath = location.pathname.split('/')[1] || "Acumen Vega";
    const navigate = useNavigate()

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

                        <h6 className="pb-1 text-2xl text-start">PostgreSQL Configuration</h6>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <InputField label="Postgres Host:" name="postgres_host" type="text" placeholder="Enter Postgres Host" value={values?.postgres_host} />
                            <InputField label="Postgres Database:" name="postgres_database" type="text" placeholder="Enter Postgres Database" value={values?.postgres_database} />
                            <InputField label="Postgres User:" name="postgres_user" type="text" placeholder="Enter Postgres User" value={values?.postgres_user} />
                            <InputField label="Postgres Password:" name="postgres_password" type="password" placeholder="Enter Postgres Password" value={values?.postgres_password} />
                        </div>

                        <h6 className="pb-1 text-2xl text-start">GCP Configuration</h6>
                        <InputField label="GCS Bucket Name:" name="gcs_name" type="text" placeholder="Enter GCS Bucket Name" value={values?.gcs_name} />

                        <FileUpload
                            label="Upload Service Account JSON Key File:"
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

export default PostgresqlToIceberg;
