import React from 'react'

const TodoForm = props => {
    const handleChange = event => {
        const {name, value} = event.target
        props.setActiveItem({...props.activeItem, [name]: value})
    }

    return(

        <form onSubmit={props.handleSubmit} id="form">
            <div className="flex-wrapper">
                <div style={{flex: 6}}>
                    <input onChange={handleChange} className="form-control" id="title"  value={props.activeItem.title} type="text" name="title" placeholder="Add task.."/>
                </div>
                <div style={{flex: 1}}>
                    <input id="submit" className="btn btn-warning" type="submit" name="Add"/>
                </div>
            </div>
        </form>
    )
}

export default TodoForm