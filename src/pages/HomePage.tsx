
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { useAtom } from "jotai"

import { LoginPayload, initialLoginPayload, LoginRequestResponseError, userLogin} from "./../api/user/loginUser"
import { RequestStatus, RequestBaseError, RequestResponseError } from "../api/axios"

import { 
    currentUserAtom, 
} from "../stores/currentUserAtoms"

export const HomePage = () =>{
    const navigate = useNavigate()

    const [loginPayload, setLoginPayload] = useState<LoginPayload>(initialLoginPayload)
    const [loginStatus, setloginStatus] = useState<RequestStatus>(RequestStatus.Idle);
    const [loginResponeError, setLoginResponeError] = useState<RequestResponseError<LoginRequestResponseError>>(null)
    const [loginBaseError, setLoginBaseError] = useState<RequestBaseError>(null)
    const [_currentUser, setCurrentUser] = useAtom(currentUserAtom)


    const loginValuesHook = (param:{namme:string, value:string}) => {
        setLoginPayload({
            email: param.namme == "email" ? param.value : loginPayload.email,
            password:  param.namme == "password" ? param.value : loginPayload.password,
        });
    }

    const loginHook = async () =>{
        setLoginResponeError(null);
        setLoginBaseError(null);

        const resoult = await userLogin(loginPayload, setloginStatus)
        if(resoult.status == false){
            setLoginResponeError(resoult.responseError);
            setLoginBaseError(resoult.baseError);
            return;
        }
        setCurrentUser(resoult.data)

        navigate("chats")
    }

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
                            <span className="text-error">{typeof loginResponeError?.message == "object" && loginResponeError.message.email}</span>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" value={loginPayload.password} onChange={(e)=>loginValuesHook({namme: "password", value: e.target.value})}/>
                            <span className="text-error">{typeof loginResponeError?.message === "string" && loginResponeError.message}</span>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <span className="text-error">{loginBaseError}</span>
                            <button className={`btn btn-primary ${loginStatus == RequestStatus.Pending && "btn-disabled"}`} onClick={()=>loginHook()}>
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