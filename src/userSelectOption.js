import React from 'react';

export default function UserSelectOption(props) {

    return (
        <option key={props.id} value={props.id}>{props.name}</option>
    )
}
