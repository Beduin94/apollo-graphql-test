import React, { useState } from 'react';
import {Mutation} from 'react-apollo';
import { Button, TextField } from '@material-ui/core';
import { CREATE_USER } from '../mutations';
import Notification  from './Notification';
import './modules.css';

const CreateUser = ({children}) => (
    <Mutation mutation={CREATE_USER} refetchQueries={() => {return [children];}}>
        {(createUser, { loading, error, data }) => {
            const [email, setEmail] = useState('');
            const [name, setName] = useState('');
            const [openNotification, setOpenNotification] = React.useState(false);

            function handleSubmit(event) {
                event.preventDefault();
                createUser({
                    variables: {
                        input:{
                            name: name,
                            email: email,
                        }
                     }
                }).then(r =>{
                    setOpenNotification(true);
                    setName("");
                    setEmail("");
                });
            }

            return (
                <div>
                    <form onSubmit={handleSubmit}>
                        <TextField required value={email} className={'text-field'} label="Email" onChange={ e=>setEmail(e.target.value)}/>
                        <TextField required value={name} className={'text-field'} label="Name" onChange={ e=>setName(e.target.value)}/>
                        <Button size="small" className={'submit-button'}
                                variant="contained" color="primary" type="submit"
                                disabled={!name || !email}> Create
                        </Button>
                    </form>
                    <Notification>{{open:openNotification,setOpen:setOpenNotification, message:"Save success!"}}</Notification>
                </div>
            );
        }}
    </Mutation>
);

export default CreateUser;
