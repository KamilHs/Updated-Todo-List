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
            this.setState({ users: [...this.state.users, { name: "loading", id: "loading" }] })
            fetch("http://jsonplaceholder.typicode.com/users")
                .then(res => res.json())
                .then(result => {
                    const responsedUsers = result.map(user => ({ name: user.name, id: user.id }));

                    //I had to fake loading because I was getting response too fast
                    setTimeout(() => {
                        this.setState({ users: [this.state.users[0], ...responsedUsers] })
                    }, 1000);

                    console.log(this.state.users);

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