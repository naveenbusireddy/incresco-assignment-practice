import React from "react";
import Product from "../Product/Product";
import { nanoid } from 'nanoid';

const ProductList = (props) => {

    return (
        <>
        {props.ProductList && props.ProductList.map((product) => (
        <Product 
        key={nanoid()}
        ProductData={product}/> 
        )            
        )}
        </>
    )
}

export default ProductList;