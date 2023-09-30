import { FC } from "react"
import { Droppable } from "react-beautiful-dnd"
import Task from "./Task"
import { ITask } from "../models/ITask"

interface ColumpProps{
    id: string
    tasks: (ITask | undefined)[]
    title: string
}

const Column: FC<ColumpProps> = ({id, tasks, title}) => {

    return(
        <div className="taskContainer">
            <div className={`tasksTitle ${id}`}>{title.toLocaleUpperCase()}</div>
            <Droppable droppableId={id}>
                {(provided) => (
                    <div
                    className="taskList"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    >
                        {tasks.map((task, index) => (<Task task={task} key={index} index={index}></Task>))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )

}


export default Column