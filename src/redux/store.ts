import { createStore, combineReducers } from "redux";
import { tasksReducer } from "./tasksReducer";
import { columnsReducer } from "./columnsReducer";
import { composeWithDevTools } from "redux-devtools-extension";


const loadState = () => {
    try{
        const serializedState = localStorage.getItem('state')
        if(serializedState === null){
            return undefined
        }
        return JSON.parse(serializedState)
    }
    catch(err) {
        return undefined
    }
}

const saveState = (state: any) => {
    try{
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch(err){
        console.log(err)
    }
    
}

const persistedState = loadState()

const rootReducer = combineReducers({
    columns: columnsReducer,
    tasks: tasksReducer,
})

export const store = createStore(rootReducer, persistedState, composeWithDevTools())

store.subscribe(() => {
    saveState({
        tasks: store.getState().tasks,
        columns: store.getState().columns,
    })
})
