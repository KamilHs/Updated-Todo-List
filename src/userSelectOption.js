import React from 'react';

export default function UserSelectOption(props) {

    return (
        <option key={props.id} value={props.name}>{props.name}</option>
    )
}
