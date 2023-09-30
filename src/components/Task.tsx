import { FC, useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import { ITask } from "../models/ITask"
import { useDispatch } from "react-redux"
import { removeTaskAction } from "../redux/columnsReducer"
import { deleteTaskAction, editTaskDescriptionAction, editTaskTitleAction, setPriorityAction } from "../redux/tasksReducer"
import Comment from "./Comment"
import AddSubTask from "./AddSubTask"
import SubTask from "./SubTask"

interface TaskProps{
    task: ITask | undefined
    index: number
}

const Task: FC<TaskProps> = ({task, index}) => {

    const dispatch = useDispatch()
   
    const [editingTaskTitleText, setEditingTaskTitleText] = useState(task!.title)
    const [editingTaskTitle, setEditingTaskTitle] = useState(false)
    
    const [editingTaskDescriptionText, setEditingTaskDescriptionText] = useState(task!.description)
    const [editingTaskDescription, setEditingTaskDescription] = useState(false)

    const [isAddingSubTask, setIsAddingSubTask] = useState(false)

    const deleteTask = () => {
        dispatch(removeTaskAction(task!.id))
        dispatch(deleteTaskAction(task!.id))
    }

    const closeModal = () => {
        setIsAddingSubTask(false)
    }

    const editTaskTitle = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setEditingTaskTitle(false)
        dispatch(editTaskTitleAction(task!.id, editingTaskTitleText))
    }

    const editTaskDescription = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setEditingTaskDescription(false)
        dispatch(editTaskDescriptionAction(task!.id, editingTaskDescriptionText))
    }

    return(
        <div>

        {isAddingSubTask ? <AddSubTask taskId={task!.id} closeModal={closeModal}/> : null}
        <Draggable draggableId={task!.id} key={task!.id} index={index}>
            {(provided) => (
                <div className={`task ${task!.priority}`}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                >
                    <div className="title">
                        <span>
                        {editingTaskTitle ? 
                        <form className="editTitle" onSubmit={editTaskTitle}>
                            <input value={editingTaskTitleText} onChange={(e) => {
                                const newTitle = e.target.value.trimStart()
                                setEditingTaskTitleText(newTitle)}}></input>
                        </form> : task!.title === "" ? <span style={{color: "gray", textDecoration: "underline", cursor: "pointer"}} onClick={() => setEditingTaskTitle(true)}>add title</span> :
                        <span onClick={() => setEditingTaskTitle(true)}>{task!.title}</span>
                        }
                        </span>
                        <svg onClick={deleteTask} style={{cursor: "pointer"}} width="21px" height="21px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#0F0F0F"/> 
                            </g>
                        </svg>
                    </div>
                    <div className="description">{editingTaskDescription ? 
                        <form onSubmit={editTaskDescription}>
                            <textarea rows={3} cols={40} value={editingTaskDescriptionText} onChange={(e) => {
                                const newDescription = e.target.value.trimStart()
                                setEditingTaskDescriptionText(newDescription)}}></textarea>
                            <div className="editDescription">
                                <button>Accept</button>
                                <button onClick={() => setEditingTaskDescription(false)}>Close</button>
                            </div>
                        </form> : task!.description === "" ? <span style={{color: "gray", textDecoration: "underline", cursor: "pointer"}} onClick={() => setEditingTaskDescription(true)}>add description</span> :
                        <span onClick={() => setEditingTaskDescription(true)}>{`${task!.description}   `}</span>
                        }
                    </div>
                    <div className="status-container">
                        <div className={`status status-${task!.status}`}>
                            {`${task!.status}`}
                        </div>
                        <div>
                        <select value={task!.priority} onChange={(e) => dispatch(setPriorityAction(task!.id, e.target.value))}>
                            <option value="low">Low priority</option>
                            <option value="normal">Normal priority</option>
                            <option value="high">High priority</option>
                        </select>
                        </div>
                        <div className="date">
                            {`${task!.dateOfCreation}`}
                        </div>
                    </div>
                    <div className="addSubtask">
                        <button onClick={() => setIsAddingSubTask(true)}>ADD SUBTASK</button>
                    </div>
                    {task!.subTasks.map((subTask) => (
                        <SubTask key={subTask.id} taskId={task!.id} subTaskId={subTask.id} subTask={subTask.task} isDone={subTask.status}/>
                    ))}

                    <Comment comment={task!.comments} taskId={task!.id}></Comment>
                </div>
            )}
        </Draggable>
        </div>
    )

}

export default Task

