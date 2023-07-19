

import { Outlet } from "react-router-dom";

import "./MainLayout.css"

export const MainLayout = () =>{
    return(<>
      <div id="mainLayout">
        <Outlet />
      </div>
    </>)
}