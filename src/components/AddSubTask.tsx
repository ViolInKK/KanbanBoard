import { FC, useState } from "react"
import { useDispatch } from "react-redux"
import { addSubTaskAction } from "../redux/tasksReducer"

interface AddSubTaskProps{
    closeModal: () => void
    taskId: string
}

const AddSubTask: FC<AddSubTaskProps> = ({closeModal, taskId}) => {

    const dispatch = useDispatch()
    
    const [subTask, setSubTask] = useState("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const subTaskTrimd = subTask.trimStart()
        if(subTaskTrimd === ""){
            e.preventDefault()
            return
        }
        e.preventDefault()
        dispatch(addSubTaskAction(taskId, subTask))
        closeModal()

    }
    
    return (
        <div className="addSubTask-container">
            <div className="addSubTask-inner">
                <form onSubmit={handleSubmit}>
                    <input placeholder="SubTask" value={subTask} onChange={(e) => setSubTask(e.target.value)}></input>
                    <div className="addSubTask-buttonContainer">
                        <button>Add SubTask</button>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddSubTask