import React from 'react';
import UserSelectOption from './userSelectOption';
import './main.css'


export default class userSelect extends React.Component {


    render() {
        return (
            <div className="form" >
                <select className="user-select" onChange={(e) => this.props.handleUserSelectItemClick(e.target.value)} onFocus={this.props.handleUserSelectFocus} name="user-select">
                    {this.props.users.map(user =>
                        <UserSelectOption
                            key={user.id}
                            id={user.id}
                            name={user.name}
                        />
                    )}
                </select>
            </div >
        )
    }

}



