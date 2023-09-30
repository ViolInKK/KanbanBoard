import { FC } from "react"

interface ActionProps{
    handleClick: () => void
    type: string
}


const Action: FC<ActionProps> = ({ handleClick, type}) => {
    return(
        <div className="reply" onClick={handleClick}>{type}</div>
    )
}

export default Action