import React from "react";


const Product = (props) => {

    return (
        <>        
        <li key= {props.id} className='product'>
            {props.ProductData && "Price:"+props.ProductData.price+" ,"+ "Name:" +props.ProductData.productName}</li>        
        </>
    )
}

export default Product;