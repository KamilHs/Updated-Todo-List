import React from 'react';
import UserSelectOption from './userSelectOption';
import './main.css'


export default function userSelect(props) {

    return (
        <div className="form">
            <select className="user-select" onFocus={props.handleUserSelectFocus} name="user-select">
                {props.users.map(user =>
                    <UserSelectOption
                        key={user.id}
                        id={user.id}
                        name={user.name}
                    />
                )}
            </select>
        </div>
    )
}


