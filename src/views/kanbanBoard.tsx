import '../App.css'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import Column from '../components/Column'
import { IColumn } from '../models/IColumn'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { ITask } from '../models/ITask'
import {  moveTaskAction } from '../redux/columnsReducer'
import { setStatusAction } from '../redux/tasksReducer';
import { useState } from 'react';
import AddTask from '../components/AddTask';

function KanbanBoard() {

    
    const dispatch = useDispatch()
    const tasks: ITask[] = useSelector((state: any) => state.tasks)
    const columns: IColumn[] = useSelector((state: any) => state.columns)

    const [isAddingTask, setIsAddingTask] = useState(false)
    
    const closeModal = () => {
        setIsAddingTask(false)
    }

    const handleDragEnd = (result: DropResult) => {
        
        const { destination, source } = result
    
        if(!destination) {
            return
        }
        
        if(destination.droppableId === source.droppableId && destination.index === source.index){
            return
        }

        const reordered = [...columns]
        const sourceIndex = source.index
        const destinationIndex = destination.index

        if(destination.droppableId === source.droppableId){
            const columnIndex = columns.findIndex((column) => column.id === destination.droppableId)
            const [deletedTask] = reordered[columnIndex].taskIds.splice(sourceIndex, 1)
            reordered[columnIndex].taskIds.splice(destinationIndex, 0, deletedTask)

        }
        else{
            const startTaskIndex = columns.findIndex((column) => column.id === source.droppableId)
            const finishTaskIndex = columns.findIndex((column) => column.id === destination.droppableId)
            const [deletedTask] = reordered[startTaskIndex].taskIds.splice(sourceIndex, 1)
            reordered[finishTaskIndex].taskIds.splice(destinationIndex, 0, deletedTask)
            dispatch(setStatusAction(deletedTask, destination.droppableId))
        }
        dispatch(moveTaskAction(reordered))
    }

  return (
    <div className='kanbanBoard'>
        {isAddingTask ? <AddTask closeModal={closeModal}/> : null}
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className='columnContainer'>
                {columns.map((column) => {
                    const columnTasks: (ITask | undefined)[] = column.taskIds.map((taskId) => {
                        return tasks.find((task) => task.id === taskId)
                    })
                    return <Column id={column.id} title={column.title} tasks={columnTasks} key={column.id}></Column>
                })}
            </div>
        </DragDropContext>
        <div className='addTask'>
            <button onClick={() => setIsAddingTask(true)}>ADD TASK</button>
        </div>
    </div>
    )
}

export default KanbanBoard
