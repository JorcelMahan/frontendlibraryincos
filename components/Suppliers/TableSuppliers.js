import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Link from 'next/link';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function TableSuppliers({suppliers, deleteSupplier}) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                #
                            </TableCell>
                            <TableCell>
                                Nombre de la empresa
                            </TableCell>
                            <TableCell>
                                Nombre del contacto
                            </TableCell>
                            <TableCell>
                                Ciudad
                            </TableCell>
                            <TableCell>
                                Pais
                            </TableCell>
                            <TableCell>
                                Celular
                            </TableCell>
                            <TableCell>
                                Email
                            </TableCell>
                            <TableCell>
                                Editar
                            </TableCell>
                            <TableCell>Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            suppliers.map((supplier, i) => (
                                <TableRow key={supplier.id}>
                                    <TableCell>{++i}  </TableCell>
                                    <TableCell>{supplier.companyName}</TableCell>
                                    <TableCell>{supplier.contactName}</TableCell>
                                    <TableCell>{supplier.city}</TableCell>
                                    <TableCell>{supplier.country}</TableCell>
                                    <TableCell>{supplier.cellphone}</TableCell>
                                    <TableCell>{supplier.email}</TableCell>
                                    <TableCell>
                                        <Link href={`/suppliers/supplier?id=${supplier.id}`}>
                                            <a>
                                                <Button>
                                                    <Edit/>
                                                </Button>
                                            </a>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Button>
                                            <Delete onClick={() => deleteSupplier(supplier.id)} color="secondary"/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
    );
}
