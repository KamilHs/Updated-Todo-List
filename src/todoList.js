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

    }

    handleUserSelectFocus = () => {
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


    handleUserSelectItemClick = (userId) => {
        console.log(userId);

        if (userId === 'all') {
            this.componentDidMount();
        }
        else {

            fetch("https://jsonplaceholder.typicode.com/todos")
                .then(res => res.json())
                .then(result => {
                    const filteredResponseTodos = result.map(todo => ({ userId: todo.userId, id: todo.id, title: todo.title })).filter(todo => todo.userId === +userId);
                    this.setState({ todos: filteredResponseTodos })
                    console.log(this.state.todos);
                });
        }

    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(res => res.json())
            .then(result => {
                const allResponseTodos = result.map(todo => ({ userId: todo.userId, id: todo.id, title: todo.title }))
                this.setState({ todos: allResponseTodos });
            })
    }

    render() {
        return (
            <div className="todolist" >
                <UserSelect handleUserSelectFocus={this.handleUserSelectFocus} handleUserSelectItemClick={this.handleUserSelectItemClick} users={this.state.users} />

                <div className="todos-container">
                    {this.state.todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
                </div>

            </div >
        )
    }
}