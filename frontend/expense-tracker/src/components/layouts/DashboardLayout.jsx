import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "../layouts/Navbar";
import SideMenu from "./SideMenu";
const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="dashboard-layout">
      <Navbar activeMenu="Dashboard" />
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu="Dashboard" />
          </div>
          <div className="flex-1">{children}</div>
        </div>
      )}
    </div>
  );
};
export default DashboardLayout;
