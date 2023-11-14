
/*vvvvvvvvvv react*/
import { useNavigate } from "react-router-dom"
import { useState } from "react";
/*^^^^^^^^^^ react*/

/*vvvvvvvvvv api*/
import { RequestStatus, RequestResponseError } from "../api/axios"
import { registerUser, RegisterRequestError, RegisterPayload, initialRegisterPayload} from "../api/user/registerUser"
/*^^^^^^^^^^ api*/

// registerPage page component
export const RegisterPage = () =>{

    // navigate method, used to redirect
    const navigate = useNavigate();

    // registerPayload, registerStatus and registerResponeError used to try register user and show callback
    const [registerPayload, setRegisterPayload] = useState<RegisterPayload>(initialRegisterPayload);
    const [registerStatus, setRegisterStatus] = useState<RequestStatus>(RequestStatus.Idle);
    const [registerResponeError, setRegisterResponeError] = useState<RequestResponseError<RegisterRequestError>>(null);

    // update registerPayload when input data in register form
    const registerValuesHook = (param:{namme:string, value:string}) => {
        setRegisterPayload({
            email: param.namme == "email" ? param.value : registerPayload.email,
            firstName: param.namme == "firstName" ? param.value : registerPayload.firstName,
            lastName: param.namme == "lastName" ? param.value : registerPayload.lastName,
            password: param.namme == "password" ? param.value : registerPayload.password,
        });
    }

    // method when click "register" button
    const clickRegisterButtton = async () =>{

        // reset values
        setRegisterStatus(RequestStatus.Idle);
        setRegisterResponeError(null);

        // try register user
        const resoult = await registerUser(registerPayload, setRegisterStatus);

        // if error while downloading data
        if(resoult.status == false){
            setRegisterResponeError(resoult.data);
            return;
        }

        // if register success
        navigate("/");
    }

    // render page
    return(<>
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label label-text">Email</label>
                            <input type="text" placeholder="email" className="input input-bordered" value={registerPayload.email} onChange={(e)=>registerValuesHook({namme: "email" ,value: e.target.value})}/>
                            <span className="text-error">{registerResponeError?.error?.message.email}</span>
                        </div>
                        <div className="form-control">
                            <label className="label label-text">Password</label>
                            <input type="password" placeholder="password" className="input input-bordered" value={registerPayload.password} onChange={(e)=>registerValuesHook({namme: "password" ,value: e.target.value})}/>
                            <span className="text-error">{registerResponeError?.error?.message.password}</span>
                        </div>
                        <div className="form-control">
                            <label className="label label-text">Imie</label>
                            <input type="text" placeholder="imie" className="input input-bordered" value={registerPayload.firstName} onChange={(e)=>registerValuesHook({namme: "firstName" ,value: e.target.value})}/>
                            <span className="text-error">{registerResponeError?.error?.message.firstName}</span>
                        </div>
                        <div className="form-control">
                            <label className="label label-text">Nazwisko</label>
                            <input type="text" placeholder="nazwisko" className="input input-bordered" value={registerPayload.lastName} onChange={(e)=>registerValuesHook({namme: "lastName" ,value: e.target.value})}/>
                            <span className="text-error">{registerResponeError?.error?.message.password}</span>
                        </div>
                        <div className="form-control mt-6">
                            <span className="text-error">{registerResponeError?.baseError}</span>
                            <button className={`btn btn-primary ${registerStatus == RequestStatus.Pending && "btn-disabled"}`} onClick={()=>clickRegisterButtton()}>
                                {registerStatus == RequestStatus.Pending && <span className="loading loading-spinner"/>}
                                Register
                            </button>
                            <label className="label label-text-alt">
                                <span>
                                    <span>Do you have accout ? </span>
                                    <a href="#" className="link link-hover" onClick={()=>navigate("/")}>Login now</a>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}