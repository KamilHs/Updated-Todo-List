import React from 'react';


export default class TodoItem extends React.Component {
    render() {
        const { id, title } = this.props.todo;

        return (
            <div key={this.props.todo.id}>{id}. {title}</div>
        )
    }
}