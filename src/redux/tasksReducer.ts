import { IComment } from "../models/IComment";
import { ITask } from "../models/ITask";
import { v4 as uuidv4 } from 'uuid';

const defaultstate: ITask[] = []

const CREATE_TASK = "CREATE_TASK"
const DELETE_TASK = "DELETE_TASK"
const EDIT_TITLE = "EDIT_TITLE"
const EDIT_DESCRIPTION = "EDIT_DESCRIPTION"
const SET_STATUS = "SET_STATUS"
const ADD_SUBTASK = "ADD_SUBTASK"
const DELETE_SUBTASK = "DELETE_SUBTASK"
const EDIT_SUBTASK_STATUS = "EDIT_SUBTASK_STATUS"
const ADD_COMMENT = "ADD_COMMENT"
const EDIT_COMMENT = "EDIT_COMMENT"
const DELETE_COMMENT = "DELETE_COMMENT"
const SET_PRIORITY = "SET_PRIORITY"

const insertComment = (tree: IComment, commentId: string, comment: string): IComment => {
    if(tree.id === commentId){
        tree.items.push({
            id: uuidv4(),
            name: comment,
            isRoot: false,
            items: [],
        })
        return tree
    }
    var latestNode = []
    latestNode = tree.items.map((ob) => {
        return insertComment(ob, commentId, comment)
    })
    return { ...tree, items: latestNode }
}

const editComment = (tree: IComment, commentId: string, comment: string) => {
    if(tree.id === commentId){
        tree.name = comment
        return tree
    }
    tree.items.map((ob) => {
        return editComment(ob, commentId, comment)
    })
    return { ...tree }
}

const deleteComment = (tree: IComment, commentId: string) => {
    for(let i = 0; i < tree.items.length; i++){
        const currentItem = tree.items[i]
        if(currentItem.id === commentId){
            tree.items.splice(i, 1)
            return tree
        }
        else{
            deleteComment(currentItem, commentId)
        }
    }
    return tree
}

export const tasksReducer = (state = defaultstate, action: { type: any; payload: any}) => {
    switch(action.type){
        case CREATE_TASK:
            return state.concat([action.payload])
        case DELETE_TASK:
            return state.filter((task) => task.id != action.payload)
        case EDIT_TITLE:
            return state.map((task) => {
                if(task.id != action.payload.id){
                    return {...task}
                }
                return {...task, title: action.payload.title}
            })
        case EDIT_DESCRIPTION:
            return state.map((task) => {
                if(task.id != action.payload.id){
                    return {...task}
                }
                return {...task, description: action.payload.description}
            })
        case SET_STATUS:
            return state.map((task) => {
                if(task.id != action.payload.taskId){
                    return {...task}
                }
                return {...task, status: action.payload.status}
            })
        case ADD_SUBTASK:
            return state.map((task) => {
                if(task.id != action.payload.taskId){
                    return {...task}
                }
                return {...task, subTasks: [...task.subTasks, action.payload.subTask]}
            })
        case DELETE_SUBTASK:
            return state.map((task) => {
                if(task.id != action.payload.taskId){
                    return {...task}
                }
                return {...task, subTasks: task.subTasks.filter((subTask) => subTask.id != action.payload.subTaskId)}
            })
        case EDIT_SUBTASK_STATUS:
            return state.map((task) => {
                if(task.id != action.payload.taskId){
                    return {...task}
                }
                return {...task, subTasks: task.subTasks.map((subTask) => {
                    if(subTask.id != action.payload.subTaskId){
                        return {...subTask}
                    }
                    return {...subTask, status: !subTask.status}
                })}
            })
        case ADD_COMMENT:
            var comments = state.filter((task) => task.id === action.payload.taskId)
            var editedComments = insertComment(comments[0].comments, action.payload.commentId, action.payload.comment)
            return state.map((task) => {
                if(task.id != action.payload.taskId){
                    return {...task}
                }
                return {...task, comments: editedComments}
            })
        case EDIT_COMMENT:
            var comments = state.filter((task) => task.id === action.payload.taskId)
            var editedComments = editComment(comments[0].comments, action.payload.commentId, action.payload.comment)
            return state.map((task) => {
                if(task.id != action.payload.taskId){
                    return {...task}
                }
                return {...task, comments: editedComments}
            })
        case DELETE_COMMENT:
            var comments = state.filter((task) => task.id === action.payload.taskId)
            var editedComments = deleteComment(comments[0].comments, action.payload.commentId)
            return state.map((task) => {
                if(task.id != action.payload.taskId){
                    return {...task}
                }
                return {...task, comments: editedComments}
            })
        case SET_PRIORITY:
            return state.map((task) => {
                if(task.id != action.payload.taskId){
                    return {...task}
                }
                return {...task, priority: action.payload.priority}
            })
        default: return state
    }
}

export const createTaskAction = (id: string, title: string, description: string, dateOfCreation: string) => {
    const payload = {
        id,
        title,
        description,
        dateOfCreation,
        priority: "normal",
        status: "Queue",
        subTasks: [],
        comments: {id: uuidv4(), name: "", isRoot: true, items: []},
    }
    return {type: CREATE_TASK, payload}
}
export const deleteTaskAction = (payload: string) => ({type: DELETE_TASK, payload})
export const editTaskTitleAction = (id: string, title: string) => {
    const payload = {
        id,
        title,
    }
    return {type: EDIT_TITLE, payload}
}
export const editTaskDescriptionAction = (id: string, description: string) => {
    const payload = {
        id,
        description,
    }
    return {type: EDIT_DESCRIPTION, payload}
}
export const setStatusAction = (taskId: string, status: string) => {
    const payload = {
        taskId,
        status,
    }
    return{type: SET_STATUS, payload}
}
export const addSubTaskAction = (taskId: string, subTask: string) => {
    const payload = {
        taskId,
        subTask: {
            id: uuidv4(),
            task: subTask,
            status: false,
        }
    }
    return {type: ADD_SUBTASK, payload}
}
export const deleteSubTaskAction = (taskId: string, subTaskId: string) => {
    const payload = {
        taskId,
        subTaskId,
    }
    return {type: DELETE_SUBTASK, payload}
}
export const changeSubTaskStatusAction = (taskId: string, subTaskId: string) => {
    const payload = {
        taskId,
        subTaskId,
    }
    return {type: EDIT_SUBTASK_STATUS, payload}
}
export const addCommentAction = (taskId: string, commentId: string, comment: string) => {
    const payload = {
        taskId,
        commentId,
        comment,
    }
    return {type: ADD_COMMENT, payload}
}
export const editCommentAction = (taskId: string, commentId: string, comment: string) => {
    const payload = {
        taskId,
        commentId,
        comment,
    }
    return{type: EDIT_COMMENT, payload}
}
export const deleteCommentAction = (taskId: string, commentId: string) => {
    const payload = {
        taskId,
        commentId,
    }
    return{type: DELETE_COMMENT, payload}
}
export const setPriorityAction = (taskId: string, priority: string) => {
    const payload = {
        taskId,
        priority,
    }
    return{type: SET_PRIORITY, payload}
}