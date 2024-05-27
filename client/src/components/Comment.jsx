import { useState } from 'react'
// import { Routes, Route, NavLink, Link } from "react-router-dom"
import { putInformetion, deleteInformetion } from '../JS/request'
export default function Comment({ comment, setShowComments, deleteFromShowComment }) {
  let currentUserEmail = JSON.parse(localStorage.getItem("currentUser")).email;
  console.log(currentUserEmail);
  const [upDate, setUpDate] = useState(false);
  let detailsCommentUpdate = {
    postId: comment.post_id,
    id: comment.id,
    name: comment.name,
    email: comment.email,
    body: comment.body
  };
  const [paramsCommentUpdate, setParamsCommentUpdate] = useState(detailsCommentUpdate);

  const changeCommentUpdate = (e) => {
    const { name, value } = e.target
    setParamsCommentUpdate({
      ...paramsCommentUpdate,
      [name]: value
    })

  }
  async function updateComment() {
    let afterPutComment = await putInformetion(comment.id, paramsCommentUpdate, null, "comments");
    if (afterPutComment) {
      setShowComments(comment.id, afterPutComment);
      setUpDate(false);

    }
  }
  async function deleteCommentFunc() {
    let afterDeleteRequ = await deleteInformetion(comment.id, "comments");
    if (afterDeleteRequ)
      deleteFromShowComment(comment.id);
  }
  return (
    <>
      {<div style={{ textAlign: 'center', justifyContent: "space-between", margin: "10px", border: "2px solid white" }}><h6>Id: {comment.id}    </h6>

        {/* {!upDate ? <h7>Name: {comment.name}</h7>
        : <textarea type="text" name="name" value={paramsCommentUpdate.name} onChange={(e) => { e.preventDefault(); changeCommentUpdate(e); }} />} */}
        {!upDate ? <h6>Email: {comment.email}</h6>
          : <textarea type="email" name="email" value={paramsCommentUpdate.email} onChange={(e) => { e.preventDefault(); changeCommentUpdate(e); }} />}
        <br></br>
        {!upDate ? <h6>Content: {paramsCommentUpdate.body}</h6>
          : <textarea type="text" name="body" value={paramsCommentUpdate.body} onChange={(e) => { e.preventDefault(); changeCommentUpdate(e); }} />}
        {comment.email == currentUserEmail &&
          <div>{!upDate ? <button className="buttonSearchAdd"
            onClick={(e) => { setUpDate(true); e.preventDefault(); }}>🖋️</button>
            : <button onClick={() => updateComment()}>ok</button>}
            <button className="buttonSearchAdd" onClick={(e) => { e.preventDefault(); deleteCommentFunc() }}>🗑️</button></div>}</div>}
    </>
  )
}


