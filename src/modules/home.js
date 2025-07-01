// import React from 'react';
// import Card from "../components/cards/cards";
// import iceberg from "../assets/icons/iceberg.png";
// import snowflake from "../assets/icons/snowflake.png";
// import sql from "../assets/icons/sql.png";
// import datafiles from "../assets/icons/datafiles.png";
// import bigQuery from "../assets/icons/bigqueryimg.png";
// import psql from "../assets/icons/postgresql.svg"

// const Home = () => {
//     const cardData = [
//         {
//             title: "Data Files To Iceberg",
//             body: "Convert your files (CSV, JSON, etc.) into Iceberg format. Whether you're dealing with structured or semi-structured data, this tool makes it easy to transform your files into a format that is highly compatible with distributed data processing systems.",
//             path: "/data-files-to-iceberg-conversion",
//             fromIcon: datafiles,
//             icon: iceberg,
//             gradientColors: { from: '#ededed', to: '#ffffff' },
//             gradient: "left"
//         },
//         {
//             title: "Postgresql To Iceberg",
//             body: "Move your data from PostgreSQL to Apache Iceberg for scalable, versioned data management with efficient querying and faster processing. Leverage schema evolution and partitioning to manage large-scale datasets with high-performance storage and analysis.",
//             path: "/postgresql-to-iceberg-conversion",
//             fromIcon: psql,
//             icon: iceberg,
//             gradientColors: { from: '#ededed', to: '#ffffff' },
//             gradient: "left"
//         },
//         {
//             title: "Sql-Server To Iceberg",
//             body: "Easily move data from SQL Server to Apache Iceberg using Spark and Hadoop for efficient, scalable, and versioned data management. Configure SQL Server and GCP settings, select tables, and automate data conversion with timestamp identification and utilized incremental load. Benefit from real-time conversion with error handling and monitoring for a smooth migration experience.",
//             path: "/sql-server-to-iceberg-conversion",
//             fromIcon: sql,
//             icon: iceberg,
//             gradientColors: { from: '#ededed', to: '#ffffff' },
//             gradient: "left"
//         },
//         {
//             title: "SnowFlake To Iceberg",
//             body: "Easily migrate data from Apache Iceberg to Snowflake with seamless integration of GCP storage. Configure your Snowflake and GCP, and process Parquet files in parallel for efficient data conversion. Handle schema creation, data ingestion, and metadata processing automatically. Enjoy high-performance data management with batch processing and parallel execution for optimized results.",
//             path: "",
//             fromIcon: snowflake,
//             icon: iceberg,
//             gradientColors: { from: '#ededed', to: '#ffffff' },
//             gradient: "left"
//         },
//         {
//             title: "Iceberg To BigQuery",
//             body: "Transfer large-scale analytics data from Google BigQuery to Apache Iceberg, a powerful open-source table format optimized for big data workloads. This tool allows you to efficiently manage, store, and query your data in Iceberg format with just a few clicks.",
//             path: "/iceberg-to-big-query-conversion",
//             fromIcon: iceberg,
//             icon: bigQuery,
//             gradientColors: { from: '#ededed', to: '#ffffff' },
//             gradient: "left",
//         },
//         {
//             title: "Iceberg To PostgreSQL",
//             body: "Seamlessly migrate your data from Apache Iceberg to PostgreSQL for better querying and reporting. This tool simplifies the process of transferring data between these two platforms, enabling you to leverage the strengths of each system.",
//             path: "/iceberg-to-postgreSQL-conversion",
//             fromIcon: iceberg,
//             icon: psql,
//             gradientColors: { from: '#ededed', to: '#ffffff' },
//             gradient: "left"
//         },
//         {
//             title: "Iceberg To Sql-Server",
//             body: "Easily move data from SQL Server to Apache Iceberg using Spark and Hadoop for efficient, scalable, and versioned data management. Configure SQL Server and GCP settings, select tables, and automate data conversion with timestamp identification and utilized incremental load. Benefit from real-time conversion with error handling and monitoring for a smooth migration experience.",
//             path: "/iceberg-to-sql-server-conversion",
//             fromIcon: iceberg,
//             icon: sql,
//             gradientColors: { from: '#ededed', to: '#ffffff' },
//             gradient: "left"
//         },
//         {
//             title: "Iceberg To SnowFlake",
//             body: "Easily migrate data from Apache Iceberg to Snowflake with seamless integration of GCP storage. Configure your Snowflake and GCP, and process Parquet files in parallel for efficient data conversion. Handle schema creation, data ingestion, and metadata processing automatically. Enjoy high-performance data management with batch processing and parallel execution for optimized results.",
//             path: "/iceberg-to-snowflake-conversion",
//             fromIcon: iceberg,
//             icon: snowflake,
//             gradientColors: { from: '#ededed', to: '#ffffff' },
//             gradient: "left"
//         },
//     ];

//     return (
//         <div className="flex flex-col  justify-center overflow-auto p-5 h-full" >
//             {/* <h2 className="my-4 text-2xl md:text-3xl lg:text-4xl fw_600 text-start">
//                 Acumen Vega
//             </h2>
//             <p className="text-start text-xl  mb-6">
//                 AI &amp; Data Acceleration on Google Cloud - BigLake &amp; BigQuery with Iceberg
//                 Write Once. Read Anywhere. Scale AI Faster. Streamline ETL processes.
//             </p> */}
//             <div className="flex flex-wrap justify-center gap-4">
//                 {cardData.map((card, index) => (
//                     <Card
//                         key={index}
//                         title={card.title}
//                         fromIcon={card.fromIcon}
//                         icon={card.icon}
//                         body={card.body}
//                         path={card.path}
//                         gradient={card.gradient}
//                         gradientColors={card.gradientColors}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Home;

import React, { useState, useEffect } from 'react';

// Importing all form components
import DataFilesToIceberg from "../modules/ConversionToIceberg/dataFilesToIceberg";
import PostgresqlToIceberg from "../modules/ConversionToIceberg/postgresqlToIceberg";
import SQLServerToIceberg from "../modules/ConversionToIceberg/sqlServerToIceberg";
import IcebergToPostgreSQL from "../modules/ConversionFromIceberg/icebergtoPostgreSQL";
import IcebergToSnowflake from "../modules/ConversionFromIceberg/icebergtoSnowflake";
import IcebergToBigQuery from './ConversionToIceberg/conv_bq_to_ib';

const sources = ['Iceberg', 'Data Files', 'PostgreSQL', 'Sql Server', 'Snowflake'];
const icebergTargets = ['BigQuery', 'PostgreSQL', 'Sql Server', 'Snowflake'];

export default function Home() {
    const [source, setSource] = useState('');
    const [target, setTarget] = useState('');
    const [SelectedComponent, setSelectedComponent] = useState(null);

    const componentMap = {
        'Iceberg-BigQuery': <IcebergToBigQuery />,
        'Iceberg-PostgreSQL': <IcebergToPostgreSQL />,
        'Iceberg-Sql Server': <SQLServerToIceberg />,
        'Iceberg-Snowflake': <IcebergToSnowflake />,

        'Data Files-Iceberg': <DataFilesToIceberg />,
        'PostgreSQL-Iceberg': <PostgresqlToIceberg />,
        'Sql Server-Iceberg': <SQLServerToIceberg />,
        // 'Snowflake-Iceberg': <SnowflakeToIceberg />,
    };

    const handleSourceChange = (e) => {
        const selectedSource = e.target.value;
        setSource(selectedSource);

        if (selectedSource === 'Iceberg') {
            setTarget('');
        } else {
            setTarget('Iceberg');
        }

    };

    const handleTargetChange = (e) => {
        setTarget(e.target.value);
    };

    useEffect(() => {
        if (source && target) {
            const key = `${source}-${target}`;
            setSelectedComponent(componentMap[key] || null);
        } else {
            setSelectedComponent(null);
        }
    }, [source, target]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-md">
                <div className="flex space-x-6 mb-4 items-center">
                    {/* Source Dropdown */}
                    <div>
                        <label className="block font-semibold mb-1">Source</label>
                        <select
                            className="border border-gray-300 p-2 rounded w-48"
                            value={source}
                            onChange={handleSourceChange}
                        >
                            <option value="" disabled>Select Source</option>
                            {sources.map((src) => (
                                <option key={src} value={src}>{src}</option>
                            ))}
                        </select>
                    </div>

                    {/* Target Dropdown */}
                    <div>
                        <label className="block font-semibold mb-1">Target</label>
                        {source === 'Iceberg' ? (
                            <select
                                className="border border-gray-300 p-2 rounded w-48"
                                value={target}
                                onChange={handleTargetChange}
                            >
                                <option value="" disabled>Select Target</option>
                                {icebergTargets.map((tgt) => (
                                    <option key={tgt} value={tgt}>{tgt}</option>
                                ))}
                            </select>
                        ) : source ? (
                            <input
                                type="text"
                                className="border border-gray-300 p-2 rounded w-48 bg-gray-100"
                                value="Iceberg"
                                disabled
                            />
                        ) : (
                            <input
                                type="text"
                                className="border border-gray-300 p-2 rounded w-48 bg-gray-100"
                                placeholder="Select Source First"
                                disabled
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Render the selected form component below */}
            <div className="mt-6">
                {SelectedComponent ? (
                    <div className="bg-white p-4 rounded shadow">
                        {SelectedComponent}
                    </div>
                ) : (
                    <p className="text-gray-500">Please select source and target.</p>
                )}
            </div>
        </div>
    );
}
