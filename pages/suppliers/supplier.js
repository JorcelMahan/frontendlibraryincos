import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '../../layout/Drawer';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import {useRouter} from 'next/router';
import axios from 'axios';
import {Formik} from "formik";

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

const Supplier = () => {
    const classes = useStyles();
    const router = useRouter();
    const {query: {id}} = router;
    const [supplier, setSupplier] = useState({
        companyName: '',
        contactName: '',
        city: '',
        country: '',
        cellphone: '',
        email: ''
    });
    useEffect(() => {
        async function getSupplier() {
            const result = await axios.get(`http://localhost:7000/supplier/${id}`);
            setSupplier(result.data);
        }

        getSupplier()
    }, [id]);
    const updateSupplier = async values => {
        const {companyName, contactName, city, country, cellphone, email} = values;
        try {
            await axios.put(`http://localhost:7000/supplier/${id}`, {
                companyName, contactName, city, country, cellphone, email
            })
        } catch (e) {
            console.log(e);
        }
        await router.push('/provedores');
    };
    return (
        <Drawer>
            <h2>Editar provedor</h2>
            <Formik
                enableReinitialize
                initialValues={supplier}
                onSubmit={values => updateSupplier(values)}>
                {
                    props => (
                        <form onSubmit={props.handleSubmit} className={classes.form}>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id='companyName'
                                    name='companyName'
                                    label='Nombre de la empresa'
                                    value={props.values.companyName}
                                    onChange={props.handleChange}
                                    required
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id='contactName'
                                    name='contactName'
                                    label='Nombre del Contacto'
                                    value={props.values.contactName}
                                    onChange={props.handleChange}
                                    required
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id='city'
                                    name='city'
                                    label='Ciudad'
                                    value={props.values.city}
                                    onChange={props.handleChange}
                                    required
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id='country'
                                    name='country'
                                    label='Pais'
                                    value={props.values.country}
                                    onChange={props.handleChange}
                                    required
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id='cellphone'
                                    name='cellphone'
                                    label='Celular'
                                    type='number'
                                    value={props.values.cellphone}
                                    onChange={props.handleChange}
                                    required
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id='email'
                                    name='email'
                                    label='Email'
                                    type='email'
                                    value={props.values.email}
                                    onChange={props.handleChange}
                                    required
                                />
                            </FormControl>
                            <Button type='submit' color='primary' variant='contained'>
                                Guardar
                            </Button>
                        </form>
                    )
                }
            </Formik>
        </Drawer>
    )
};
export default Supplier;
