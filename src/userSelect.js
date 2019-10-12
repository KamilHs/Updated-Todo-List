import React from 'react';
import UserSelectOption from './userSelectOption';


export default function userSelect(props) {
    return (
        <div className="form">
            <select onFocus={props.handleUserSelectFocus} name="user-select">
                {props.users.map(user => <UserSelectOption id={user.id} name={user.name} />)}
            </select>
        </div>
    )
}


