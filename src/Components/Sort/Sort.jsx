import React from "react";

const Sort = (props) => {

    return (        
        <>
        <select onChange={props.onSelect}>
            <option default value="priceLowToHigh">Price:Low-To-High</option>
            <option value="priceHighToLow">Price:High-To-Low</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="rating">Rating</option>
        </select>
        </>
    )
}

export default Sort;