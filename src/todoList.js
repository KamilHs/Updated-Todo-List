import React from 'react';
import UserSelect from './userSelect'
import TodoItem from './TodoItem'

export default class TodoList extends React.Component {
    constructor() {
        super();
        this.handleUserSelectFocus = this.handleUserSelectFocus.bind(this);
    }
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

    }

    handleUserSelectFocus() {
        if (this.state.users.length === 1) {

            this.setState({ users: [...this.state.users, { name: "loading", id: "loading" }] })

            fetch("http://jsonplaceholder.typicode.com/users")
                .then(res => res.json())
                .then(result => {
                    const responsedUsers = result.map(user => ({ name: user.name, id: user.id }));

                    //I had to fake loading because I was getting response too fast
                    setTimeout(() => {
                        this.setState({ users: [this.state.users[0], ...responsedUsers] })
                    }, 1000);


                });
        }

    }


    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(res => res.json())
            .then(result => {
                const responsedTodos = result.map(todo => ({ userId: todo.userId, id: todo.id, title: todo.title }))
                this.setState({ todos: responsedTodos });
            })
    }

    render() {
        return (
            <div className="todolist">
                <div>{this.state.text}</div>
                <UserSelect handleUserSelectFocus={this.handleUserSelectFocus} users={this.state.users} />
                <div className="todos-container">
                    {this.state.todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
                </div>
            </div >
        )
    }
}