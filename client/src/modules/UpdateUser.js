import React from 'react';
import { Mutation } from 'react-apollo';
import  { UPDATE_USER } from '../mutations';
import {Button, TextField} from "@material-ui/core";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import   Notification  from './Notification';
import './modules.css';

const UpdateUser = ({children}) => (
    <Mutation mutation={ UPDATE_USER }>
        {(updateUser, { loading, error, data }) => {
            const [email, setEmail] = React.useState(children.email);
            const [name, setName] = React.useState(children.name);
            const [openNotification, setOpenNotification] = React.useState(false);
            let breadcrumbs = children.name;

            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            function handleSubmit(event) {
                event.preventDefault();
                updateUser({
                    variables: {
                        id: children.id,
                        input: {
                            name: name,
                            email: email
                        }
                    }
                }).then(r =>{
                    breadcrumbs = name;
                    setOpenNotification(true);
                });
            }
            return (
                <div>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" href="/" >
                            Users
                        </Link>
                        <Link color="inherit">
                            {breadcrumbs}
                        </Link>
                    </Breadcrumbs>
                    <form onSubmit={handleSubmit} >
                        <TextField required value={name} className={'text-field'} label="Name" onChange={ e=>setName(e.target.value)}/>
                        <TextField required value={email} className={'text-field'} label="Email" onChange={ e=>setEmail(e.target.value)}/>
                        <Button size="small" variant="contained"
                                className={'submit-button'} color="primary"
                                type="submit" disabled={!name || !email}>Update
                        </Button>
                    </form>
                    <Notification>{{open:openNotification,setOpen:setOpenNotification, message:'Update success!'}}</Notification>
                </div>
            );
        }}
    </Mutation>
);

export default UpdateUser;