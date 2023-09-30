export interface IComment{
    id: string
    name: string
    isRoot: boolean
    items: IComment[]
}