import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Drawer from "../layout/Drawer";
import TableProducts from "../components/Products/TableProducts";
import Link from 'next/link'
import Button from "@material-ui/core/Button";

const Products = () => {
    const [products, setProducts] = useState([]);
    const deleteProduct = async id => {
        await axios.patch(`http://localhost:7000/products/${id}`);
    }
    useEffect(() => {
        const abortController = new AbortController();

        async function getProducts() {
            const result = await axios.get('http://localhost:7000/products', {
                signal: abortController.signal
            });
            setProducts(result.data)
        }

        getProducts();
        return () => {
            abortController.abort();
        }
    }, [products]);
    return (
        <Drawer>
            <h1>Productos</h1>
            <Link href="/new-product">
                <a>
                    <Button color="primary" variant="contained" style={{margin: "10px 0 30px 0"}}>
                        Nuevo producto
                    </Button>
                </a>
            </Link>
            <TableProducts products={products} deleteProduct={deleteProduct}/>
        </Drawer>
    )
}

export default Products;