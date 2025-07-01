import React, { useState, useEffect } from 'react';

// Form components
import DataFilesToIceberg from "../modules/ConversionToIceberg/dataFilesToIceberg";
import PostgresqlToIceberg from "../modules/ConversionToIceberg/postgresqlToIceberg";
import SQLServerToIceberg from "../modules/ConversionToIceberg/sqlServerToIceberg";
import IcebergToPostgreSQL from "../modules/ConversionFromIceberg/icebergtoPostgreSQL";
import IcebergToSnowflake from "../modules/ConversionFromIceberg/icebergtoSnowflake";
import IcebergToBigQuery from "./ConversionFromIceberg/icebergtoBigquery";

const sources = ['Iceberg', 'Data Files', 'PostgreSQL', 'Sql Server'];
const icebergTargets = ['BigQuery', 'PostgreSQL', 'Snowflake'];
const catalogs = ['Hadoop', 'Polarized'];

export default function Home() {
    const [source, setSource] = useState('');
    const [target, setTarget] = useState('');
    const [catalog, setCatalog] = useState('');
    const [SelectedComponent, setSelectedComponent] = useState(null);

    const componentMap = {
        'Iceberg-BigQuery': <IcebergToBigQuery />,
        'Iceberg-PostgreSQL': <IcebergToPostgreSQL />,
        'Iceberg-Sql Server': <SQLServerToIceberg />,
        'Iceberg-Snowflake': <IcebergToSnowflake />,
        'Data Files-Iceberg': <DataFilesToIceberg />,
        'PostgreSQL-Iceberg': <PostgresqlToIceberg />,
        'Sql Server-Iceberg': <SQLServerToIceberg />,
    };

    const handleSourceChange = (e) => {
        const selectedSource = e.target.value;
        setSource(selectedSource);
        setTarget(selectedSource === 'Iceberg' ? '' : 'Iceberg');
        setSelectedComponent(null);
    };

    const handleTargetChange = (e) => {
        setTarget(e.target.value);
        setSelectedComponent(null);
    };

    const handleCatalogChange = (e) => {
        setCatalog(e.target.value);
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center py-12 px-4">
            {/* Heading */}
            {/* <h1 className="text-3xl font-bold mb-2 text-blue-800">Database Table Format Converter</h1>
            <p className="text-center text-gray-600 mb-8 max-w-2xl">
                Seamlessly export Apache Iceberg tables to modern platforms like BigQuery, Snowflake, and more — or convert data from PostgreSQL, SQL Server, and Data Files into the Iceberg format.
            </p> */}

            {/* Dropdown Card */}
            <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col md:flex-row items-center md:space-y-0 md:space-x-4 w-full max-w-5xl">
                {/* Source Format */}
                <div className="flex flex-col w-full">
                    <label className="font-semibold mb-1 text-gray-700">SOURCE</label>
                    <select
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={source}
                        onChange={handleSourceChange}
                    >
                        <option value="" disabled>Select source</option>
                        {sources.map((src) => (
                            <option key={src} value={src}>{src}</option>
                        ))}
                    </select>
                </div>

                {/* Arrow Icon */}
                <div className="text-blue-600 text-2xl hidden md:block">→</div>

                {/* Target Format */}
                <div className="flex flex-col w-full">
                    <label className="font-semibold mb-1 text-gray-700">TARGET</label>
                    {source === 'Iceberg' ? (
                        <select
                            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={target}
                            onChange={handleTargetChange}
                        >
                            <option value="" disabled>Select target</option>
                            {icebergTargets.map((tgt) => (
                                <option key={tgt} value={tgt}>{tgt}</option>
                            ))}
                        </select>
                    ) : source ? (
                        <input
                            type="text"
                            className="border border-gray-300 p-2 rounded bg-gray-100"
                            value="Iceberg"
                            disabled
                        />
                    ) : (
                        <input
                            type="text"
                            className="border border-gray-300 p-2 rounded bg-gray-100"
                            placeholder="Select Source First"
                            disabled
                        />
                    )}
                </div>

                {/* Catalog */}
                <div className="flex flex-col w-full">
                    <label className="font-semibold mb-1 text-gray-700">CATALOG</label>
                    <select
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={catalog}
                        onChange={handleCatalogChange}
                    >
                        <option value="" disabled>Select catalog type</option>
                        {catalogs.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Message */}
            {(!source || !target || !catalog) && (
                <p className="mt-4 text-gray-500">Please select source, target, and catalog to begin.</p>
            )}

            {/* Render selected component */}
            <div className="mt-10 w-full max-w-6xl">
                {SelectedComponent && catalog ? (
                    <div>{SelectedComponent}</div>
                ) : null}
            </div>
        </div>
    );
}
