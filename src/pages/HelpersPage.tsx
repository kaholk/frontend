
import { Tnavigation } from "../components/Tnavigation"





export const HelpersPage = () =>{
    

    return(<>
        <Tnavigation />
        <ul className="menu w-56">
            <span>Links:</span>
            <li>
                <details open>
                    <summary>CSS</summary>
                    <ul>
                        <li><a target="_blank" href="https://daisyui.com/components/">daisyUI</a></li>
                        <li><a target="_blank" href="https://tailwindcss.com/docs/font-family">tailwindcss</a></li>
                    </ul>
                </details>
            </li>
            <li>
                <details open>
                    <summary>Scroller</summary>
                    <ul>
                        <li><a target="_blank" href="https://virtuoso.dev/">Virtuoso</a></li>
                    </ul>
                </details>
            </li>
            <li>
                <details open>
                    <summary>Store</summary>
                    <ul>
                        <li><a target="_blank" href="https://docs.pmnd.rs/zustand/getting-started/introduction">Zustand</a></li>
                        <li><a target="_blank" href="https://docs.pmnd.rs/zustand/integrations/immer-middleware">Immer midleware</a></li>
                    </ul>
                </details>
            </li>
            <li>
                <details open>
                    <summary>Icons</summary>
                    <ul>
                        <li><a target="_blank" href="https://pictogrammers.com/library/mdi/">MDI</a></li>
                        <li><a target="_blank" href="https://pictogrammers.com/docs/library/mdi/getting-started/react/">MDI doc</a></li>
                    </ul>
                </details>
            </li>
            <li>
                <details open>
                    <summary>React</summary>
                    <ul>
                        <li><a target="_blank" href="https://www.w3schools.com/REACT/default.asp">W3schools</a></li>
                        <li><a target="_blank" href="https://react.dev/reference/react">React doc</a></li>
                    </ul>
                </details>
            </li>
            <li><a target="_blank" href="https://www.figma.com/file/CwlM5T4NKX9bbbeSPdYHH4/Chat-App?type=design&node-id=301-156&mode=design&t=m5Odky2C0Xdr6jG6-0">Project Link</a></li>
        </ul>
        
    </>)
}