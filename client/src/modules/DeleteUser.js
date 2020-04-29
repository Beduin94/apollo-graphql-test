import React from 'react';
import { Mutation } from 'react-apollo';
import { Button } from '@material-ui/core';
import  { DELETE_USER } from '../mutations';

const DeleteUser = ({children}) => (
    <Mutation mutation={ DELETE_USER } refetchQueries={() => {return [children.query];}}>
        {(deleteUser, { loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            function handleClick(e) {
                e.preventDefault();
                e.stopPropagation();
                deleteUser({ variables: {id: children.id}})
            }
            return (
                <div>
                    <Button size="small" variant="contained" color="secondary" onClick={handleClick}>delete</Button>
                </div>
            );
        }}
    </Mutation>
);

export default DeleteUser;