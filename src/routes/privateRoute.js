// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// const PrivateRoute = () => {
//   return localStorage.getItem("accessToken") ? (
//     <>
//       <Outlet />
//     </>
//   ) : (
//     <Navigate to="/" />
//   );
// };

// export default PrivateRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const PrivateRoute = () => {
  return localStorage.getItem("accessToken") ? (
    <main className="h-full w-full p-2">
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-2 py-2 h-[calc(100vh-5.5rem)]">
        <div className="w-full h-full">
          <Outlet />
        </div>
      </div>
    </main>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;