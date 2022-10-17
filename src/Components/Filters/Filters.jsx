import React from "react";
import { nanoid } from 'nanoid';


const Filters = (props) => {
    
    const filterCategory = (text) => {
        return (props.filters.filter((item) => item.id === text)[0].filterValues);
    }
    
    return (
        <>
            <div className="filterContainer">
                <label htmlFor="Gender"><strong>Gender</strong></label>

                {filterCategory("Gender").map((option, index) => (
                    <div key={index} className='optionsContainer'>
                        <input type="checkbox" value={option.id} name={option.id} onChange={(e)=>{props.onSelectFilter(e,"Gender")}}/>
                        <label>{option.id}</label>
                    </div>
                ))
                }
            </div>
            <div>
                <label htmlFor="Brand"><strong>Brand</strong></label>
                {filterCategory("Brand").slice(0, 8).map((option, index) => (
                    <div key={index}>
                        <input type="checkbox" value={option.id} onChange={(e)=>{props.onSelectFilter(e,"Brand")}}/>
                        <label>{option.id}</label>
                    </div>
                ))
                }
            </div>
            <div>
                <label htmlFor="Color"><strong>Color</strong></label>
                {filterCategory("Color").map((option, index) => (
                    <div key={index}>
                        <input type="checkbox" value={option.id} onChange={(e)=>{props.onSelectFilter(e,"Color")}}/>
                        <label>{option.id}</label>
                    </div>
                    ))
                }
            </div>)

        </>
    )
}

export default Filters;