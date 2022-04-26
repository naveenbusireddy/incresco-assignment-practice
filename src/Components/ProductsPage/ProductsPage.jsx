import React, { useEffect, useState } from "react";
import axios from 'axios';
import ProductList from "../ProductList/ProductList";
import Sort from "../Sort/Sort";

const ProductsPage = () => {

    const [products, setProducts] = useState();
    const [finalProducts, setFinalProducts] = useState();
    const [searchOption, setSearchOption] = useState();
    const [sortOption, setSortOption] = useState('priceLowToHigh');

    const getData = () => {
        axios.get(`https://demo7303877.mockable.io/`)
            .then((responseData) => 
                {
                    responseData.data.products=responseData.data.products.slice(0,9);
                    setFinalProducts(responseData.data.products);
                    setProducts(responseData.data.products);
                }                
            )
            
    }
    useEffect(() => {
        getData();
    }, []);

    const onSortSelect = (option) => {
        setSortOption(option.target.value);
    }

    const getSortProductList = () => {
        let copy=JSON.parse(JSON.stringify(finalProducts));
        if(sortOption === "priceLowToHigh")
        {
            (copy.sort((a, b) => a["price"] - b["price"]));
            setFinalProducts(copy);
        }
        else if(sortOption === "priceHighToLow")
        {
            (copy.sort((a, b) => b["price"] - a["price"]));
            setFinalProducts(copy);            
        }
        else if(sortOption === "newest")
        {
            (copy.sort((a, b) => b['year'] - a['year']));
            setFinalProducts(copy);
        }
        else if(sortOption === 'oldest')
        {
            (copy.sort((a, b) => a['year'] - b['year']));
            setFinalProducts(copy);
        }
        else {
            (copy.sort((a, b) => a[sortOption] - b[sortOption]));
            setFinalProducts(copy);
        }
        
    }
    useEffect(() => {
        if(finalProducts)
        getSortProductList()
    },[onSortSelect])

    const onChangeHandler = (event) => {
        setSearchOption(event.target.value);
    }
    
    const searchedProductList = () => {
        
        searchOption.length === 0 ? setFinalProducts(products) : setFinalProducts(products.filter((product) => product.productName.trim().toLowerCase().includes(searchOption.trim().toLowerCase())))
    }
    useEffect(() => {
        if(finalProducts)
        searchedProductList();
    },[searchOption])

    return (
        <>
            <Sort onSelect={onSortSelect}/>
            <input type="search" placeholder="Product Search" value={searchOption} onChange={onChangeHandler} />
            {finalProducts && <ProductList ProductList={finalProducts} />}
            {/* {subArray && <ProductList ProductList={subArray} />} */}
        </>
    )
}
export default ProductsPage;