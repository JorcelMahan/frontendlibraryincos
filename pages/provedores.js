import React, {useEffect, useState} from "react";
import Drawer from "../layout/Drawer"
import Link from "next/link";
import Button from "@material-ui/core/Button";
import TableSuppliers from "../components/Suppliers/TableSuppliers";
import axios from "axios";

const Provedores = () => {
    const [suppliers, setSuppliers] = useState([]);
    const deleteSupplier = async id => {
        await axios.patch(`http://localhost:7000/supplier/${id}`);
    }
    useEffect(() => {
        const abortController = new AbortController();

        async function getSuppliers() {
            const result = await axios.get('http://localhost:7000/supplier', {
                signal: abortController.signal
            });
            setSuppliers(result.data);
        }

        getSuppliers()
        return () => {
            abortController.abort();
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