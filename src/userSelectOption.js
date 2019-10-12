import React from 'react';

export default function UserSelectOption(props) {

    return (
        <option id={props.id} key={props.id} value={props.name}>{props.name}</option>
    )
}
