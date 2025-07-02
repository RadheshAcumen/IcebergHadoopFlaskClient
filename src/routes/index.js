import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "../components/layouts/appLayout";
import Home from "../modules/home";
import DataFilesToIceberg from "../modules/ConversionToIceberg/dataFilesToIceberg";
import PostgresqlToIceberg from "../modules/ConversionToIceberg/postgresqlToIceberg";
import SQLServerToIceberg from "../modules/ConversionToIceberg/sqlServerToIceberg";
import IcebergToPostgreSQL from "../modules/ConversionFromIceberg/icebergtoPostgreSQL";
import IcebergToSnowflake from "../modules/ConversionFromIceberg/icebergtoSnowflake";
import Signup from "../modules/auth/signup";
import Login from "../modules/auth/emailLogin";
import ProtectedRoute from "./protectedRoute";
import PrivateRoute from "./privateRoute";
import IcebergToBigQuery from "../modules/ConversionFromIceberg/icebergtoBigquery";
import Dashbaord from "../modules/dashboard";

function MainRoute() {
    return (
        <Router>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<Login />} />
                </Route>

                <Route element={<PrivateRoute />}>
                 <Route path="/dashboard" element={<Dashbaord />} />
                    {/* <Route element={<AppLayout />}>
                        <Route path="/iceberg-to-big-query-conversion" element={<IcebergToBigQuery />} />
                        <Route path="/data-files-to-iceberg-conversion" element={<DataFilesToIceberg />} />
                        <Route path="/postgresql-to-iceberg-conversion" element={<PostgresqlToIceberg />} />
                        <Route path="/sql-server-to-iceberg-conversion" element={<SQLServerToIceberg />} />
                        <Route path="/iceberg-to-postgreSQL-conversion" element={<IcebergToPostgreSQL />} />
                        <Route path="/iceberg-to-snowflake-conversion" element={<IcebergToSnowflake />} />
                        <Route path="/iceberg-to-sql-server-conversion" element={<SQLServerToIceberg />} />
                    </Route> */}
                </Route>
            </Routes>
        </Router>
    );
}

export default MainRoute;