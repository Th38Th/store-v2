import React, { useEffect, useState } from "react";
import "../styles/Product.css"
import axios from "axios";
import Seller from "../components/Seller"

function Product({product, onDelete}){
    const formattedDate = new Date(product.added_at).toLocaleDateString("en-US");
    const [seller, setSeller] = useState({});
    
    const getSeller = async (id) => {
        const sellerInfo = await axios.get(`/api/user/${id}/`);
        console.log("Got the seller", sellerInfo);
        return sellerInfo.data;
    }

    useEffect(()=>{
        getSeller(product.seller).then((data)=>setSeller(data));
    }, [])

    return (
        <div className="product-container">
            <p className="product-title">{product.title}</p>
            <p className="product-description">{product.description}</p>
            <div className="product-seller">Sold by {<Seller seller={seller}/>}</div>
            <p className="product-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(product.id)}>
                Delete
            </button>
        </div>
    );
}

export default Product