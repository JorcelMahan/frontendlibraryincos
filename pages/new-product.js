import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '../layout/Drawer';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import {useFormik} from 'formik';
import {useRouter} from 'next/router';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    form: {
        border: "1px solid #3f51b5",
        padding: "2rem",
        width: "50%",
        margin: "auto",
        display: "flex",
        flexDirection: "column"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const NewProduct = () => {
    const classes = useStyles();
    const router = useRouter();
    const [provedores, setProvedores] = useState([]);
    const formik = useFormik({
        initialValues: {
            productName: '',
            unitPrice: '',
            stock: '',
            supplierId: '',
        },
        onSubmit: async (values) => {
            const {productName, unitPrice, stock, supplierId} = values;
            try {
                await axios.post('https://apilibraryjava.herokuapp.com/products', {
                    productName,
                    supplierId,
                    unitPrice,
                    stock,
                });
                await router.push('/products');
            } catch (e) {
                console.log(e);
            }
        },
    });
    useEffect(() => {
        async function getProvedores() {
            const result = await axios.get('https://apilibraryjava.herokuapp.com/supplier');
            setProvedores(result.data);
        }

        getProvedores();
    }, []);
    return (
        <Drawer>
            <h2>Nuevo producto</h2>
            <form onSubmit={formik.handleSubmit} className={classes.form}>
                <FormControl className={classes.formControl}>
                    <TextField
                        id='productName'
                        name='productName'
                        label='Nombre del producto'
                        value={formik.values.productName}
                        onChange={formik.handleChange}
                        required
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id='unitPrice'
                        name='unitPrice'
                        label='Precio unitario'
                        type='Number'
                        value={formik.values.unitPrice}
                        onChange={formik.handleChange}
                        required
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id='stock'
                        name='stock'
                        label='stock'
                        type='number'
                        value={formik.values.stock}
                        onChange={formik.handleChange}
                        required
                    />
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor='supplierId'>Provedor</InputLabel>
                    <Select
                        native
                        required
                        value={formik.values.supplierId}
                        onChange={formik.handleChange}
                        inputProps={{
                            id: 'supplierId',
                            name: 'supplierId',
                        }}
                    >
                        <option aria-label='None' value=''/>
                        {provedores.map((prov) => (
                            <option key={prov.id} value={prov.id}>
                                {prov.companyName}
                            </option>
                        ))}
                    </Select>
                </FormControl>
                <Button type='submit' color='primary' variant='contained'>
                    Guardar
                </Button>
            </form>
        </Drawer>
    );
};

export default NewProduct;
