import { FC, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { useDispatch } from "react-redux";
import { createTaskAction } from "../redux/tasksReducer";
import { addTaskAction } from "../redux/columnsReducer";


interface AddTaskProps{
    closeModal: () => void
}

const AddTask: FC<AddTaskProps> = ({closeModal}) => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const id = uuidv4()
        const date = moment().format('DD.MM.YYYY h:mm a')
        dispatch(createTaskAction(id, title, description, date))
        dispatch(addTaskAction(id))
        setTitle("")
        setDescription("")
        closeModal()
    }

    return(
        <div className="addTask-container">
            <div className="addTask-inner">
                <form onSubmit={handleSubmit}>
                    <div className="addTask-inputContainer">
                        <input placeholder='Title' value={title} onChange={(e) => {
                            const newTitle = e.target.value.trimStart()
                            setTitle(newTitle)}}></input>
                        <input placeholder='Description' value={description} onChange={(e) => {
                            const newDescription = e.target.value.trimStart()
                            setDescription(newDescription)}}></input>
                    </div>
                    <div className="addTask-buttonContainer">
                        <button onClick={() => handleSubmit}>Add Task</button>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default AddTask