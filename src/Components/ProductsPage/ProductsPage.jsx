import React, { useEffect, useState } from "react";
import axios from 'axios';
import ProductList from "../ProductList/ProductList";
import Sort from "../Sort/Sort";
import Filters from "../Filters/Filters";

import "./ProductsPage.css";

const ProductsPage = () => {

    const [products, setProducts] = useState();
    const [finalProducts, setFinalProducts] = useState();
    const [searchOption, setSearchOption] = useState();
    const [sortOption, setSortOption] = useState('priceLowToHigh');
    const [filters, setFilters] = useState();
    const [selectedFilter, setSelectedFilter] = useState({
        Brand: [],
        Color: [],
        Gender: []
    });

    const getData = () => {
        axios.get(`https://demo7303877.mockable.io/`)
            .then((responseData) => {
                responseData.data.products = responseData.data.products.slice(0, 9);
                setFinalProducts(responseData.data.products);
                setProducts(JSON.parse(JSON.stringify(responseData.data.products)));
                setFilters(JSON.parse(JSON.stringify(responseData.data.filters.primaryFilters)));
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
        let productsListCopy = JSON.parse(JSON.stringify(finalProducts));
        if (sortOption === "priceLowToHigh") {
            (productsListCopy.sort((a, b) => a["price"] - b["price"]));
            setFinalProducts(productsListCopy);
        }
        else if (sortOption === "priceHighToLow") {
            (productsListCopy.sort((a, b) => b["price"] - a["price"]));
            setFinalProducts(productsListCopy);
        }
        else if (sortOption === "newest") {
            (productsListCopy.sort((a, b) => b['year'] - a['year']));
            setFinalProducts(productsListCopy);
        }
        else if (sortOption === 'oldest') {
            (productsListCopy.sort((a, b) => a['year'] - b['year']));
            setFinalProducts(productsListCopy);
        }
        else {
            (productsListCopy.sort((a, b) => a[sortOption] - b[sortOption]));
            setFinalProducts(productsListCopy);
        }

    }
    useEffect(() => {
        if (finalProducts)
            getSortProductList()
    }, [sortOption])

    const onSelectFilter = (event, filterType) => {
        let selectedList = [];
        if (event.target.checked) {
            selectedList = [...selectedFilter[filterType], event.target.value];
        }
        else {
            selectedList = [...selectedFilter[filterType]];
            selectedList.splice(selectedFilter[filterType].indexOf(event.target.value), 1)
        }
        let currentFilter = {};
        currentFilter[filterType] = selectedList;
        setSelectedFilter({ ...selectedFilter, ...currentFilter });
    }

    const getFilteredProductList = () => {
        let productsCopy = products;
        // let gender = selectedFilter.Gender.length === 0 ? '' : productsCopy.filter((product) =>{ return selectedFilter.Gender.indexOf((product.gender).toLowerCase()) !== -1})
        // let color = selectedFilter.Color.length === 0 ? '' : productsCopy.filter((product) =>{ return selectedFilter.Color.indexOf((product.primaryColour)) !== -1})
        // let brand = selectedFilter.Brand.length === 0 ? '' : productsCopy.filter((product) =>{ return selectedFilter.Brand.indexOf((product.brand)) !== -1})
        // // let gender = selectedFilter.Gender;
        // // let color = selectedFilter.Color;
        // // let brand = selectedFilter.Brand;
        let filteredProducts= productsCopy.filter((product) =>{
            let isGenderMatched= selectedFilter.Gender.length === 0 || selectedFilter.Gender.indexOf((product.gender).toLowerCase()) !== -1 ;
            let isColorMatched= selectedFilter.Color.length === 0 || selectedFilter.Color.indexOf((product.primaryColour)) !== -1 ;
            let isBrandMatched= selectedFilter.Brand.length === 0 || selectedFilter.Brand.indexOf((product.brand)) !== -1 ;
            return isGenderMatched && isColorMatched && isBrandMatched;
        })
        // let filterProductList = (gender && color && brand);
        setFinalProducts(filteredProducts);
    }
    
    
    useEffect(() => {
        console.log(selectedFilter);   
        if(products)
        getFilteredProductList();
    }, [selectedFilter]);

    const onChangeHandler = (event) => {
        setSearchOption(event.target.value);
    }

    const searchedProductList = () => {

        searchOption !== undefined ? setFinalProducts(products.filter((product) => product.productName.trim().toLowerCase().includes(searchOption.trim().toLowerCase()))) : setFinalProducts(products)
    }
    useEffect(() => {
        if (finalProducts)
            searchedProductList();
    }, [searchOption])

    return (
        <div className="grid-container">
            <div className="searchSort">
                <Sort onSelect={onSortSelect} />
                <input type="search" placeholder="Product Search" value={searchOption} onChange={onChangeHandler} />
            </div>
            <div className="filters">
                {filters && <Filters filters={filters} onSelectFilter={onSelectFilter} />}
            </div>
            <div className="products">
                {finalProducts && <ProductList ProductList={finalProducts} />}
            </div>
            
        </div>
    )
}
export default ProductsPage;