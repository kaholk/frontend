
import { NavLink } from "react-router-dom";

import { Icon } from "@mdi/react"
import { 
    mdiHomeOutline, mdiHome, 
    mdiChatProcessing, mdiChatProcessingOutline,
    mdiAccountMultiple, mdiAccountMultipleOutline,
    mdiCog, mdiCogOutline,
    mdiHelp,
} from '@mdi/js'


import logo from "../../assets/favicon.ico"



export const Tnavigation = () =>{
    return (<>
        <nav>
          <ul className="menu menu-horizontal bg-base-200 rounded-box items-center justify-between w-full">
            <li className="menu-title ">
              <div className="chat-image avatar !bg-transparent">
                <div className="w-12 rounded-full" style={{backgroundColor: "#8cb3ff"}}>
                  <img src={logo}/>
                </div>
              </div>
            </li>
            <li>
              <NavLink 
                to="/" className="tooltip" data-tip="Home" 
                children={ ({ isActive }) => <Icon path={isActive ? mdiHome : mdiHomeOutline} size={1.5} className={ isActive ? "text-primary" : 'text-base-content'}/> }
              />
            </li>
            <li>
              <NavLink 
                to="/chats" className="tooltip" data-tip="Chats" 
                children={ ({ isActive }) => <Icon path={isActive ? mdiChatProcessing : mdiChatProcessingOutline} size={1.5} className={ isActive ? "text-primary" : 'text-base-content'}/> }
              />
            </li>
            <li>
              <NavLink 
                to="/friends" className="tooltip" data-tip="Friens" 
                children={ ({ isActive }) => <Icon path={isActive ? mdiAccountMultiple : mdiAccountMultipleOutline} size={1.5} className={ isActive ? "text-primary" : 'text-base-content'}/> }
              />
            </li>
            <li>
              <NavLink 
                to="/settings" className="tooltip" data-tip="Settings" 
                children={ ({ isActive }) => <Icon path={isActive ? mdiCog : mdiCogOutline} size={1.5} className={ isActive ? "text-primary" : 'text-base-content'}/> }
              />
            </li>
            {/* <li>
              <NavLink 
                to="/helpers" className="tooltip" data-tip="Helpers"
                children={ ({ isActive }) => <Icon path={mdiHelp} size={1.5} className={ isActive ? "text-primary" : 'text-base-content'}/> }
              />
            </li> */}
          </ul>
        </nav>
    </>)
}