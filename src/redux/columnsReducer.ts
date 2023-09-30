import { IColumn } from "../models/IColumn"

const defaultState: IColumn[] = [
    {id: "Queue", title: "Queue", taskIds: []},
    {id: "Development", title: "Development", taskIds: []},
    {id: "Done", title: "Done", taskIds: []},
]

const MOVE_TASK = "MOVE_TASK"
const ADD_TASK = "ADD_TASK"
const REMOVE_TASK = "REMOVE_TASK"

export const columnsReducer = (state = defaultState, action: any) => {
    switch (action.type){
        case MOVE_TASK:
            return action.payload
        case ADD_TASK:
            let newArray = [...state]
            newArray[0].taskIds.push(action.payload)
            return newArray
        case REMOVE_TASK:
            return state.map((column) => {
                return {...column, taskIds: column.taskIds.filter((taskId) => taskId != action.payload)}
            })
        default: 
            return state
    }
}

export const moveTaskAction = (payload: IColumn[]) => ({type: MOVE_TASK, payload})
export const addTaskAction = (payload: string) => ({type: ADD_TASK, payload})
export const removeTaskAction = (payload: string) => ({type: REMOVE_TASK, payload})
