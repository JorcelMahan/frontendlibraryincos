import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '../layout/Drawer';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
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

const NewSupplier = () => {
    const classes = useStyles();
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            companyName: '',
            contactName: '',
            city: '',
            country: '',
            cellphone: '',
            email: ''
        },
        onSubmit: async (values) => {
            const {companyName, contactName, city, country, cellphone, email} = values;
            try {
                await axios.post('http://localhost:7000/supplier', {
                    companyName,
                    contactName,
                    city,
                    country,
                    cellphone,
                    email
                });
                await router.push('/provedores');
            } catch (e) {
                console.log(e);
            }
        },
    });

    return (
        <Drawer>
            <h2>Registrar nuevo provedor</h2>
            <form onSubmit={formik.handleSubmit} className={classes.form}>
                <FormControl className={classes.formControl}>
                    <TextField
                        id='companyName'
                        name='companyName'
                        label='Nombre de la empresa'
                        value={formik.values.companyName}
                        onChange={formik.handleChange}
                        required
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id='contactName'
                        name='contactName'
                        label='Nombre del Contacto'
                        value={formik.values.contactName}
                        onChange={formik.handleChange}
                        required
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id='city'
                        name='city'
                        label='Ciudad'
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        required
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id='country'
                        name='country'
                        label='Pais'
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        required
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id='cellphone'
                        name='cellphone'
                        label='Celular'
                        type='number'
                        value={formik.values.cellphone}
                        onChange={formik.handleChange}
                        required
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id='email'
                        name='email'
                        label='Email'
                        type='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        required
                    />
                </FormControl>
                <Button type='submit' color='primary' variant='contained'>
                    Guardar
                </Button>
            </form>
        </Drawer>
    );
};

export default NewSupplier;
