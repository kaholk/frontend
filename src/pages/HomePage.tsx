
/*vvvvvvvvvv react*/
import { useNavigate } from "react-router-dom"
import { useState } from "react";
/*^^^^^^^^^^ react*/

/*vvvvvvvvvv jotai*/
import { useAtom } from "jotai"
/*^^^^^^^^^^ jotai*/

/*vvvvvvvvvv api*/
import { RequestStatus, RequestResponseError } from "../api/axios"
import { userLogin, LoginPayload, initialLoginPayload, LoginRequestError } from "./../api/user/loginUser"
/*^^^^^^^^^^ api*/

/*vvvvvvvvvv import store*/
import { 
    // variables
    userAtom
} from "../stores/currentUserAtoms"
/*^^^^^^^^^^ import store*/


// homePage page compoment
export const HomePage = () =>{

    // navigate method, used to redirect
    const navigate = useNavigate();

    // loginPayload, loginStatus and loginResponseError used to try login user and show callback
    const [loginPayload, setLoginPayload] = useState<LoginPayload>(initialLoginPayload);
    const [loginStatus, setloginStatus] = useState<RequestStatus>(RequestStatus.Idle);
    const [loginResponseError, setLoginResponseError] = useState<RequestResponseError<LoginRequestError>>(null);

    // store variables
    const [_currentUser, setCurrentUser] = useAtom(userAtom);

    // update loginPayload when input login or password
    const loginValuesHook = (param:{namme:string, value:string}) => {
        setLoginPayload({
            email: param.namme == "email" ? param.value : loginPayload.email,
            password:  param.namme == "password" ? param.value : loginPayload.password,
        });
    }

    // method when click "login" buttin
    const clickLoginButton = async () =>{

        // reset values
        setloginStatus(RequestStatus.Idle);
        setLoginResponseError(null);

        // try login user
        const resoult = await userLogin(loginPayload, setloginStatus);

        // if error while downloading data
        if(resoult.status == false){
            setLoginResponseError(resoult.data);
            return;
        }

        // if login success
        setCurrentUser(resoult.data);
        navigate("chats")
    }

    // render page
    return(<>
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="email" className="input input-bordered" value={loginPayload.email} onChange={(e)=>loginValuesHook({namme: "email", value: e.target.value})}/>
                            <span className="text-error">{typeof loginResponseError?.error?.message == "object" && loginResponseError.error.message.email}</span>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" value={loginPayload.password} onChange={(e)=>loginValuesHook({namme: "password", value: e.target.value})}/>
                            <span className="text-error">{typeof loginResponseError?.error?.message === "string" && loginResponseError.error.message}</span>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <span className="text-error">{loginResponseError?.baseError}</span>
                            <button className={`btn btn-primary ${loginStatus == RequestStatus.Pending && "btn-disabled"}`} onClick={()=>clickLoginButton()}>
                            {loginStatus == RequestStatus.Pending && <span className="loading loading-spinner"/>}
                            Login
                            </button>
                            <label className="label label-text-alt">
                                <span>
                                    <span>Do not have accout ? </span>
                                    <a href="#" className="link link-hover" onClick={()=>navigate("register")}>Register now</a>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}