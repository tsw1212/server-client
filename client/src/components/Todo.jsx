import { useState } from 'react'
import { putInformetion, deleteInformetion } from '../JS/request'
import { Outlet } from 'react-router-dom';
import './css/todo.css'
export default function Todo({ todo, setTodos, deleteFromTodos, setLoad }) {
    const [upDate, setUpDate] = useState(false);
    let detailsTodo = { title: todo.title, completed: todo.completed ? true : false };
    const [addTodoParams, setaddTodoParams] = useState(detailsTodo);
    function handleTodoChange(e) {
        e.preventDefault();
        let { name, value } = e.target;
        if (name == "completed") {
            value = e.target.checked
            Changechecked();
        }
        setaddTodoParams({
            ...addTodoParams,
            [name]: value
        })

    }
    async function Changechecked() {
        let updateTodo = { id: todo.id, title: addTodoParams.title, completed: !addTodoParams.completed, userId: todo.userId }
        let afterPutTodo = await putInformetion(todo.id, updateTodo, setLoad, "todos");
        if (afterPutTodo)
            setTodos(todo.id, updateTodo);
    }
    async function deleteTodoFunc() {
        let afterDeleteRequ = await deleteInformetion(todo.id, "todos");
        if (afterDeleteRequ)
            deleteFromTodos(todo.id);
    }
    function updateTodoTitle() {
        let updatetodo = {
            userId: todo.userId,
            id: todo.id,
            title: addTodoParams.title,
            completed: addTodoParams.completed ? true : false
        };
        let afterPutTodo = putInformetion(todo.id, updatetodo, setLoad, "todos");
        if (afterPutTodo) {
            setTodos(todo.id, updatetodo);
            setUpDate(false);
        }
    }
    return (
        <>
            <form style={{ width: "12vw" }}>
                <div className='todo'>
                    <p>id:{todo.id}</p>
                    {!upDate ? <p className='pUpdate' >{todo.title}</p> : <textarea type="text" name="title" className='inputUpdat' value={addTodoParams.title} onChange={(e) => handleTodoChange(e)} />}
                    <input id="checked" type="checkbox" checked={addTodoParams.completed} name="completed" onChange={(e) => handleTodoChange(e)} />
                    <div className='buttons' style={{ display: "flex", justifyContent: "center" }}>{!upDate ? <button className="buttonSearchAdd" onClick={(e) => { setUpDate(true); e.preventDefault(); }} style={{}}>🖋️</button>
                        : <button onClick={(e) => { updateTodoTitle(); e.preventDefault(); }}>ok</button>}
                        <button className="buttonSearchAdd" onClick={(e) => { e.preventDefault(); deleteTodoFunc() }}>🗑️</button>
                    </div>
                </div>
            </form>

        </>
    )
}


