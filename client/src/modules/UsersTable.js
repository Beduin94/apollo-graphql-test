import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteUser from './DeleteUser';
import './modules.css';

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 100 },
];

export default function UsersTable({children}) {

    if (!children.users || !children.users.length) return <p>No records...</p>;

    const { page, setPage, rowsPerPage, setRowsPerPage } = children.pagination;
    const rows = children.users;

    const handleChangePage = (event, newPage) => {
        children.refetch({skip:rowsPerPage*newPage, limit: rowsPerPage });
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        children.refetch({skip:0, limit: event.target.value });
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const handleRowClick = (id) => {
        window.location.href = `/user/${id}`;
    };

    return (
        <Paper>
            <TableContainer className={'table-container'}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            const deleteData = {id: row.id, query: children.query}
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={() => handleRowClick(row.id)}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell>
                                        <DeleteUser>{deleteData}</DeleteUser>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={children.countPagination}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}