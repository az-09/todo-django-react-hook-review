import React from 'react'

const TodoList = props => {
    return(
        props.todos.map((todo, index) =>
            <div key={index} className="todo-wrapper flex-wrapper">
                <div onClick={() => props.strikeUnstrike(todo)} style={{flex:7}}>
                    {todo.completed ? (
                        <strike>{todo.title}</strike>
                    ) : (
                        <span>{todo.title}</span>
                    )}
                </div>
                <div style={{flex:1}}>
                    <button onClick={() => props.startEdit(todo)}   className="btn btn-sm btn-outline-info">Edit</button>
                </div>
                <div style={{flex:1}}>
                    <button onClick={() => props.deleteItem(todo)} className="btn btn-sm btn-outline-dark delete">-</button>
                </div>
            </div>
        )
    );
}

export default TodoList
