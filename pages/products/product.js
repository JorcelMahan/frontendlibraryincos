import React, {useState, useEffect} from 'react';
import Drawer from '../../layout/Drawer';
import {useRouter} from 'next/router';
import axios from 'axios';
import {Formik} from "formik";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";


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
const EditProduct = () => {
    const classes = useStyles();
    const router = useRouter();
    const {
        query: {id},
    } = router;
    const [product, setProduct] = useState({
        discontinued: '',
        id: '',
        productName: '',
        stock: '',
        supplierCompanyName: '',
        supplierId: '',
        unitPrice: '',
    });
    useEffect(() => {
        async function getProduct() {
            const result = await axios.get(`https://apilibraryjava.herokuapp.com/products/${id}`);
            setProduct(result.data);
        }

        getProduct();
    }, [id]);
    const [provedores, setProvedores] = useState([]);
    useEffect(() => {
        async function getProvedores() {
            const result = await axios.get('https://apilibraryjava.herokuapp.com/supplier');
            setProvedores(result.data);
        }

        getProvedores();
    }, []);

    const updateProduct = async (values) => {
        const {productName, stock, supplierId, unitPrice, id} = values;
        try {
            await axios.put(`https://apilibraryjava.herokuapp.com/products/${id}`, {
                productName,
                stock,
                supplierId,
                unitPrice
            });
        } catch (e) {
            console.log('error', e);
        }
        await router.push('/products');
    };
    return (
        <Drawer>
            <h2>Editar producto</h2>
            <Formik
                enableReinitialize
                initialValues={product}
                onSubmit={values => updateProduct(values)}>
                {
                    props => {
                        return (
                            <form onSubmit={props.handleSubmit} className={classes.form}>
                                <FormControl className={classes.formControl}>
                                    <TextField
                                        id="productName"
                                        name="productName"
                                        label="Nombre del producto"
                                        value={props.values.productName}
                                        onChange={props.handleChange}
                                        required
                                    />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <TextField
                                        id="unitPrice"
                                        name="unitPrice"
                                        label="Precio unitario"
                                        type="Number"
                                        value={props.values.unitPrice}
                                        onChange={props.handleChange}
                                        required
                                    />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <TextField
                                        id="stock"
                                        name="unitPrice"
                                        label="stock"
                                        type="number"
                                        value={props.values.stock}
                                        onChange={props.handleChange}
                                        required
                                    />
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="supplierId">
                                        Provedor
                                    </InputLabel>
                                    <Select
                                        native
                                        required
                                        value={props.values.supplierId}
                                        onChange={props.handleChange}
                                        inputProps={{
                                            id: "supplierId",
                                            name: "supplierId"
                                        }}
                                    >
                                        <option aria-label="None" value=""/>
                                        {
                                            provedores.map(prov => (
                                                <option key={prov.id} value={prov.id}>
                                                    {prov.companyName}
                                                </option>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                <Button type="submit" color="primary" variant="contained">
                                    Actualizar
                                </Button>
                            </form>
                        )
                    }
                }
            </Formik>

        </Drawer>
    );
};

export default EditProduct;
