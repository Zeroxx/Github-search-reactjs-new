import React from 'react';

const sortSelect = (props) => (

    <select className="searchSort" name="sorting" onChange={props.sorting}>
        <option value={props.bstMatch}>Best Match</option>
        <option value={props.star}>Stars</option>
    </select>
);

export default sortSelect;