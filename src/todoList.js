import React from 'react';
import UserSelect from './userSelect'
import TodoItem from './TodoItem'

export default class TodoList extends React.Component {

    state = {
        users: [
            {
                name: "all",
                id: "all"
            }
        ],
        todos: [

        ],
        selectedUserId: "all",
        loaded: false,

    }

    handleUserSelectFocus = () => {
        if (this.state.users.length === 1) {

            this.setState({ users: [...this.state.users, { name: "Loading...", id: "loading" }] })

            fetch("http://jsonplaceholder.typicode.com/users")
                .then(res => res.json())
                .then(result => {
                    const responsedUsers = result.map(user => ({ name: user.name, id: user.id }));

                    this.setState({ users: [this.state.users[0], ...responsedUsers] })
                });
        }
    }


    handleUserSelectItemClick = (userId) => {
        this.setState({ loaded: false })

        if (userId === 'all') {
            this.componentDidMount();
        }
        else {

            fetch("https://jsonplaceholder.typicode.com/todos")
                .then(res => res.json())
                .then(result => {
                    const filteredResponseTodos = result.map(todo => ({ userId: todo.userId, id: todo.id, title: todo.title })).filter(todo => todo.userId === +userId);
                    this.setState({ loaded: true, todos: filteredResponseTodos })
                });
        }

    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(res => res.json())
            .then(result => {
                const allResponseTodos = result.map(todo => ({ userId: todo.userId, id: todo.id, title: todo.title }))
                this.setState({ loaded: true, todos: allResponseTodos });
            })
    }

    render() {
        return (
            <div className="todolist" >
                <UserSelect handleUserSelectFocus={this.handleUserSelectFocus} handleUserSelectItemClick={this.handleUserSelectItemClick} users={this.state.users} />

                <div className="todos-container">
                    {!this.state.loaded && <div className="todo-loading">Loading...</div>}
                    {this.state.todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
                </div>

            </div >
        )
    }
}