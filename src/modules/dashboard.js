import MainLayout from "../components/layouts/MainLayout";
import DataFilesToIceberg from "../modules/ConversionToIceberg/dataFilesToIceberg";
import PostgresqlToIceberg from "../modules/ConversionToIceberg/postgresqlToIceberg";
import SQLServerToIceberg from "../modules/ConversionToIceberg/sqlServerToIceberg";
import IcebergToPostgreSQL from "../modules/ConversionFromIceberg/icebergtoPostgreSQL";
import IcebergToSnowflake from "../modules/ConversionFromIceberg/icebergtoSnowflake";
import IcebergToBigQuery from "./ConversionFromIceberg/icebergtoBigquery";
import { useEffect, useState } from "react";
import SnowflakeToIceberg from "./ConversionToIceberg/snowflakeToIceberg";

const sources = ['Iceberg', 'Data Files', 'PostgreSQL', 'SQL Server', 'Snowflake'];
const icebergTargets = ['BigQuery', 'PostgreSQL', 'Snowflake'];
const catalogs = ['Hadoop', 'Polarized'];

const Dashbaord = () => {
    const [source, setSource] = useState('');
    const [target, setTarget] = useState('');
    const [catalog, setCatalog] = useState('');
    const [SelectedComponent, setSelectedComponent] = useState(null);
    const [isFormReady, setIsFormReady] = useState(false);

    const componentMap = {
        'Iceberg-BigQuery': <IcebergToBigQuery />,
        'Iceberg-PostgreSQL': <IcebergToPostgreSQL />,
        'Iceberg-Snowflake': <IcebergToSnowflake />,
        'Data Files-Iceberg': <DataFilesToIceberg />,
        'PostgreSQL-Iceberg': <PostgresqlToIceberg />,
        'Iceberg-SQL Server': <SQLServerToIceberg />,
        'SQL Server-Iceberg': <SQLServerToIceberg />,
        'Snowflake-Iceberg': <SnowflakeToIceberg />,
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

    useEffect(() => {
        setIsFormReady(source && target && catalog);
    }, [source, target, catalog]);

    return (
        <MainLayout>
            <section className="h-full overflow-auto">
                <div className="container mx-auto px-4">
                    <div className={`transition-all duration-500 ease-in-out w-full mx-auto 
                        ${isFormReady ? 'sticky top-0 z-10 bg-white' : 'flex justify-center items-center max-w-4xl'}
                    `}>
                        <div className={`w-full transition-all duration-500 ease-in-out
                            transform ${isFormReady ? 'translate-y-0 opacity-100' : 'translate-y-[30vh] h-full min-h-[20rem]'}
                        `}>
                            {/* Selection Card */}
                            <div className={`bg-white shadow-lg rounded-lg p-4 w-full 
                            flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 
                            transition-all duration-900 ease-in-out
                        `}>
                                {/* Source Format */}
                                <div className="flex items-center w-full space-x-2">
                                    <label className="font-semibold text-gray-700 w-24">Source</label>
                                    <select
                                        className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        value={source}
                                        onChange={handleSourceChange}
                                    >
                                        <option value="" disabled>Select source</option>
                                        {sources.map((src) => (
                                            <option key={src} value={src}>{src}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Target Format */}
                                <div className="flex items-center w-full space-x-2">
                                    <label className="font-semibold text-gray-700 w-24">Target</label>
                                    {source === 'Iceberg' ? (
                                        <select
                                            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                                            className="border border-gray-300 p-2 rounded w-full bg-gray-100"
                                            value="Iceberg"
                                            disabled
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            className="border border-gray-300 p-2 rounded w-full bg-gray-100"
                                            placeholder="Select Target"
                                            disabled
                                        />
                                    )}
                                </div>

                                {/* Catalog */}
                                <div className="flex items-center w-full space-x-2">
                                    <label className="font-semibold text-gray-700 w-24">Catalog</label>
                                    <select
                                        className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        value={catalog}
                                        onChange={handleCatalogChange}
                                    >
                                        <option value="" disabled>Select Catalog</option>
                                        {catalogs.map((c) => (
                                            <option key={c} value={c} disabled={c === 'Polarized'}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Prompt if missing values */}
                    {!isFormReady && (
                        <p className="text-center text-gray-500 mt-2">Please select source, target, and catalog to begin.</p>
                    )}

                    {/* Component fade-in transition */}
                    <div className={`transition-opacity duration-700 ease-in-out 
                        ${isFormReady ? 'opacity-100 mt-4' : 'opacity-0 h-0 overflow-hidden'}
                    `}>
                        {SelectedComponent && <div>{SelectedComponent}</div>}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Dashbaord;
