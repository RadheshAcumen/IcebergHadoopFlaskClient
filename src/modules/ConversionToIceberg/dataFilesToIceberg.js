import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/forms/inputFiled';
import FileUpload from '../../components/forms/fileUpload';
import { useLocation, useNavigate } from 'react-router-dom';
import back from "../../assets/icons/back.png"
import { formatString } from '../../components/helper/helper';


const DataFilesToIceberg = () => {
    const initialValues = {
        gcs_name: '',
        jsonFile: null,
        dataFile: null,
    };

    const validationSchema = Yup.object({
        gcs_name: Yup.string().required('Required!'),
        jsonFile: Yup.mixed()
            .required('Required!')
            .test('fileType', 'Only JSON files are allowed!', (value) =>
                value ? value.type === 'application/json' : false
            ),
        dataFile: Yup.mixed()
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
                    return allowedTypes.includes(value.type);
                }
            ),
    });

    const logMessages = [
        "Validating input files...",
        "Detected data file type: CSV",
        "File size: 31 MB",
        "Processing file: employees.csv",
        "Records read: 1000",
        // "Reading speed: 450,000 records per second",
        "Table employees does not exist. Creating new table...",
        "Records written: 1000",
        // "Writing speed: 200,000 records per second",
        "Table employees created and data loaded successfully.",
        "Total processing time: 10.50 seconds",
        "Memory usage: 60.25 MB",
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
                    <Form ref={scrollRef} className="p-5 md:p-10 lg:p-10 w-full md:w-2/3 bg-white rounded-md shadow-2xl max-h-[80vh] overflow-auto">
                        <div className="flex items-center gap-4 pb-6">
                            < img
                                src={back}
                                alt="Icon"
                                className="w-4 cursor-pointer"
                                onClick={() => navigate(-1)}
                            />
                            <h1 className="text-2xl">{formatString(currentPath)}</h1>
                        </div>

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
                        <FileUpload
                            label="Choose A Data File:"
                            name="dataFile"
                            accept=".csv,.json,.avro,.parquet,.orc"
                            value={values?.dataFile}
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
                                    if (allowedTypes.includes(file.type)) {
                                        setFieldValue('dataFile', file);
                                    } else {
                                        alert('Only CSV, AVRO, PARQUET, ORC, or JSON files are allowed!');
                                    }
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

export default DataFilesToIceberg;
