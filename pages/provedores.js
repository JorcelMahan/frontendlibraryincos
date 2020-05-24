import React, {useEffect, useState} from "react";
import Drawer from "../layout/Drawer"
import Link from "next/link";
import Button from "@material-ui/core/Button";
import TableSuppliers from "../components/Suppliers/TableSuppliers";
import axios from "axios";

const Provedores = () => {
    const [suppliers, setSuppliers] = useState([]);
    const deleteSupplier = async id => {
        await axios.patch(`https://apilibraryjava.herokuapp.com/supplier/${id}`);
    }
    useEffect(() => {
        const source = axios.CancelToken.source();
        async function getSuppliers() {
            const result = await axios.get('https://apilibraryjava.herokuapp.com/supplier', {
                cancelToken: source.token
            });
            setSuppliers(result.data);
        }

        getSuppliers()
        return () => {
            source.cancel();
        }
    }, [suppliers]);
    return (
        <Drawer>
            <h1>Provedores</h1>
            <Link href='/new-supplier'>
                <a>
                    <Button color='primary' variant="contained" style={{margin: "10px 0 30px 0"}}>
                        Registrar nuevo provedor
                    </Button>
                </a>
            </Link>
            <TableSuppliers suppliers={suppliers} deleteSupplier={deleteSupplier}/>
        </Drawer>
    )
}

export default Provedores;