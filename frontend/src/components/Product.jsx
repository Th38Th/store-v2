import React, { useEffect, useState } from "react";
import "../styles/Product.css"
import api from "../api"
import User from "./User"
import Button from "@mui/material/Button";

function Product({product, onDelete}){
    const formattedDate = new Date(product.added_at).toLocaleDateString("en-US");
    const [seller, setSeller] = useState({});
    
    const getSeller = async (id) => {
        const sellerInfo = await api.get(`/user/get/${id}/`);
        return sellerInfo.data;
    }

    useEffect(()=>{
        getSeller(product.seller).then((data)=>setSeller(data));
    }, [])

    return (
        <div className="product-container">
            <p className="product-title">{product.title}</p>
            <p className="product-description">{product.description}</p>
            <div className="product-seller">Sold by {<User variant="contained" user={seller}/>}</div>
            <p className="product-date">Added @ {formattedDate}</p>
            <Button variant="contained" color="error" onClick={() => onDelete(product.id)}>
                Delete
            </Button>
        </div>
    );
}

export default Product