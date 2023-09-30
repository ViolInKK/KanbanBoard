import { FC } from "react"
import { useDispatch } from "react-redux"
import { changeSubTaskStatusAction, deleteSubTaskAction } from "../redux/tasksReducer"

interface SubTaskProps{
    taskId: string
    subTaskId: string
    subTask: string
    isDone: boolean
}

const SubTask: FC<SubTaskProps> = ({taskId, subTaskId, subTask, isDone}) => {

    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deleteSubTaskAction(taskId, subTaskId))
    }

    const handleStatus = () => {
        dispatch(changeSubTaskStatusAction(taskId, subTaskId))
    }

    return(
        <div className="subTask-container">
            <div className={`subTask ${isDone ? 'crossedOut' : ''}`}>
            {subTask}
            </div>
            <div className="subTaskButtons">
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleStatus}>{isDone ? 'Undo' : 'Done'}</button>
            </div>
        </div>
    )
}

export default SubTask