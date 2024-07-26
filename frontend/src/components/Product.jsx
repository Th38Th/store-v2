import React from "react";
import "../styles/Product.css"

function Product({product, onDelete}){
    const formattedDate = new Date(product.added_at).toLocaleDateString("en-US");
    
    return (
        <div className="product-container">
            <p className="product-title">{product.title}</p>
            <p className="product-description">{product.description}</p>
            <p className="product-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(product.id)}>
                Delete
            </button>
        </div>
    );
}

export default Product