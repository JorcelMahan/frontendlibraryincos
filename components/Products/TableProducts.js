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

export default function TableProducts({products, deleteProduct}) {
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
                                Nombre del Producto
                            </TableCell>
                            <TableCell>
                                Provedor
                            </TableCell>
                            <TableCell>
                                Precio Unitario
                            </TableCell>
                            <TableCell>
                                Stock
                            </TableCell>
                            <TableCell>
                                Editar
                            </TableCell>
                            <TableCell>Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            products.map((product, i) => (
                                <TableRow key={product.id}>
                                    <TableCell>{++i}  </TableCell>
                                    <TableCell>{product.productName}</TableCell>
                                    <TableCell>{product.supplierCompanyName}</TableCell>
                                    <TableCell>Bs: <b>{product.unitPrice}</b></TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>
                                        <Link href={`/products/product?id=${product.id}`}>
                                            <a>
                                                <Button>
                                                    <Edit />
                                                </Button>
                                            </a>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Button>
                                            <Delete onClick={() => deleteProduct(product.id)} color="secondary"/>
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
