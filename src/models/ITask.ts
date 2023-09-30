import { IComment } from "./IComment"
import { ISubTask } from "./ISubTask"

export interface ITask {
    id: string
    title: string
    description: string
    dateOfCreation: string | Date
    priority: string
    status: string
    subTasks: ISubTask[]
    comments: IComment
}