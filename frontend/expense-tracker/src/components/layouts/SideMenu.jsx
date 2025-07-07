import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const SideMenu = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const activeMenuItem = SIDE_MENU_DATA.find(
    (item) => item.path.toLowerCase() === location.pathname.toLowerCase()
  );
  const activeMenu = activeMenuItem ? activeMenuItem.label : "";

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };
  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 bg-slate-400 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 bg-slate-400 rounded-full flex items-center justify-center text-white text-xl font-semibold">
            {user?.fullName
              ? user.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : "?"}
          </div>
        )}
        <h5 className="text-gray-950 font-medium leading-6">
          {user?.fullName || ""}
        </h5>
      </div>
      {SIDE_MENU_DATA.map((item, index) => {
        console.log(
          "Comparing activeMenu vs item.label:",
          `"${activeMenu}"`,
          `"${item.label}"`,
          activeMenu?.toLowerCase().trim() === item.label.toLowerCase().trim()
        );
        return (
          <button
            key={`menu_${index}`}
            onClick={() => handleClick(item.path)}
            className={`
        w-full 
        flex 
        items-center 
        gap-4 
        text-[15px] 
        ${
          (activeMenu || "").toLowerCase().trim() ===
          (item.label || "").toLowerCase().trim()
            ? "text-white bg-primary"
            : ""
        } 
        py-3 
        px-6 
        rounded-lg 
        mb-3
      `}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default SideMenu;
