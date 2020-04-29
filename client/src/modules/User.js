import React from 'react';
import {Query} from "react-apollo";
import UpdateUser from "./UpdateUser";
import {USER_QUERY} from "../queries";

const User = (props) => (
        <Query query={USER_QUERY} variables={{ id:props.match.params.userId}}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                return (
                    <div>
                        <UpdateUser>{data.user}</UpdateUser>
                    </div>
                );
            }}
        </Query>
);

export default User