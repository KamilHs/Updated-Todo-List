import React from 'react';
import UserSelect from './userSelect'

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
    }

    handleUserSelectFocus() {
        if (this.state.users.length === 1) {
            fetch("http://jsonplaceholder.typicode.com/users")
                .then(res => res.json())
                .then(result => {
                    const responsedUsers = result.map(user => ({ name: user.name, id: user.id }))

                    this.setState({ users: [...this.state.users, ...responsedUsers] })
                });
        }

    }


    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div>{this.state.text}</div>
                <UserSelect handleUserSelectFocus={this.handleUserSelectFocus} users={this.state.users} />
            </div >
        )
    }
}