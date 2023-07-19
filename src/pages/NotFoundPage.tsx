

import { useNavigate } from "react-router-dom"


export const NotFoundPAge = () => {
    const navigate = useNavigate();

    return (<>
    <div className="flex flex-col justify-center items-center" style={{height: "100%"}}>
        <div className="text-8xl text-center">404 Not Found</div>
        <button type="button" className="btn btn-primary mt-8" onClick={() => navigate(-1) }>Return Back</button>
    </div>
    </>)
}