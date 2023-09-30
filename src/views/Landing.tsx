import { FC } from "react"
import {useNavigate } from "react-router-dom"

const Landing: FC = () => {

    const navigate = useNavigate()

    const playAnimation = () => {
        const element = document.getElementById('landing-inner')
        element?.classList.add('slide-animation')
        setTimeout(() => {
            element?.classList.remove('slide-animation')
            navigate('/kanbanboard')
        }, 800)
    }

    return(
        <div className="landing">
            <div id="landing-inner" className="landing-inner" onClick={playAnimation}>
                <div className="title">
                    Review the project!
                    <svg width="21px" height="21px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#0F0F0F"/> 
                        </g>
                    </svg>
                </div>
            <div className="description">
                Need to review the project sent by Kirill Klimkin for our Junior Front-end developer position 
                <br/>
                <br/>
                <span style={{fontSize: 14}}>(click on me to continue)</span>
            </div>
            <div className="status-container">
                <div className="status status-Queue">Queue</div>
                <div>
                    <select>
                        <option>Low priority</option>
                        <option>Normal priority</option>
                        <option>High priority</option>
                    </select>
                </div>
                <div className="date">
                    NOW!
                </div>
            </div>
            </div>
        </div>
    )
}

export default Landing