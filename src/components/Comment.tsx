import { FC, useEffect, useRef, useState } from "react"
import Action from "./Action"
import { IComment } from "../models/IComment"
import { useDispatch } from "react-redux"
import { addCommentAction, deleteCommentAction, editCommentAction } from "../redux/tasksReducer"

interface CommentProps{
    taskId: string
    comment: IComment | undefined
}

const Comment: FC<CommentProps> = ({comment, taskId}) => {

    const [input, setInput] = useState("")

    const [isEditing, setIsEditing] = useState(false)
    const [isReplying, setIsReplying] = useState(false)

    const dispatch = useDispatch()
    
    const inputRef = useRef<any>(null)
    
        useEffect(() => {
            inputRef?.current?.focus()
        }, [isEditing])
    
    const onAddComment = () => {
        if(isEditing){
            dispatch(editCommentAction(taskId, comment!.id, inputRef.current.innerText))
        }
        else{
            if(input === "") return
            dispatch(addCommentAction(taskId, comment!.id, input))
            setIsReplying(false)
            setInput("")
        }

        if(isEditing) setIsEditing(false)
    }

    const handleDelete = () => {
        dispatch(deleteCommentAction(taskId, comment!.id))
    }

    const handleNewComment = () => {
        setIsReplying(true)
    }
    
    return(
        <div>
            <div className={comment!.isRoot ? "inputContainer" : "commentContainer"}>
                {comment!.isRoot ? 
                <>
                    <input spellCheck="false" placeholder="Leave a comment" value={input} onChange={(e) => setInput(e.target.value)}></input>
                    <Action type="COMMENT" handleClick={onAddComment}/>
                </> :
                <>
                    <span spellCheck="false" contentEditable={isEditing} suppressContentEditableWarning={isEditing} ref={inputRef} style={{wordWrap: "break-word"}}>{comment!.name}</span>
                    <div style={{display: "flex", marginTop: "5px"}}>
                        {isEditing ?
                        <>
                            <Action type="SAVE" handleClick={onAddComment}/>
                            <Action type="CANCEL" handleClick={() => {
                                if(inputRef.current){
                                    inputRef.current.innerText = comment!.name
                                }
                                setIsEditing(false)}}/>
                        </> :
                        <>
                            <Action type="REPLY" handleClick={handleNewComment}/>
                            <Action type="EDIT" handleClick={() => setIsEditing(true)}/>
                            <Action type="DELETE" handleClick={handleDelete}/>
                        </>
                        }
                    </div>
                </> 
                }
            </div>
            <div style={{ paddingLeft: 25}}>
                {isReplying ? 
                <div className="inputContainer">
                    <input spellCheck="false" autoFocus onChange={(e) => setInput(e.target.value)}></input>
                    <Action type="REPLY" handleClick={onAddComment}/>
                    <Action type="CANCEL" handleClick={() => setIsReplying(false)}/>
                </div> : null}
                {comment!.items.map((cmnt) => {
                    return <Comment key={cmnt.id} comment={cmnt} taskId={taskId}/>
                })}
            </div>
        </div>
    )

}

export default Comment