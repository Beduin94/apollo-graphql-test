import React from 'react';
import {Query} from "react-apollo";
import CreateUser from './CreateUser';
import UsersTable from './UsersTable';
import  { USERS_QUERY } from '../queries';

const defaultPage = 0;
const defaultRowsPerPage = 10;

const Main = () => (
    <Query query={USERS_QUERY} variables={{ skip:defaultPage, limit: defaultRowsPerPage }}>
        {({ loading, error, data, refetch }) => {
            const [page, setPage] = React.useState(defaultPage);
            const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            data.pagination = {
                page:page,
                setPage:setPage,
                rowsPerPage:rowsPerPage,
                setRowsPerPage:setRowsPerPage,
            }
            data.query = {
                query: USERS_QUERY,
                variables:{ skip:rowsPerPage*page, limit: rowsPerPage }
            }
            data.refetch = refetch;
            return (
                <div>
                    <UsersTable>{data}</UsersTable>
                    <CreateUser>{data.query}</CreateUser>
                </div>
            );
        }}
    </Query>
);

export default Main;