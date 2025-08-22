import React, { useState, useEffect } from 'react';
import ProductService from './services/ProductService';
import ProductAdd from './ProductAdd';
import Product from './Product';

//props suoraan nimellä eikä props.huomio
const ProductList = ({ setIsPositive, setMessage, setShowMessage }) => {

    //componentin tilan määritys
    const [products, setProducts] = useState([]);
    const [showProducts, setShowProducts] = useState(false);
    const [lisäysTila, setLisäysTila] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        ProductService.setToken(token);
        ProductService.getAll()
            .then(data => setProducts(data))
    }, [lisäysTila])


    const handleSearch = (e) => {
        setShowProducts(true);
        setSearch(e.target.value.toLowerCase());
    }

    return (
        <>
            <h1>Products</h1>
            <button className='btn btn-secondary' onClick={() => setShowProducts(!showProducts)}>{showProducts ? "Piilota tuotteet" : "Näytä tuotteet"}</button>
            {!lisäysTila && <button className='btn btn-success' onClick={() => setLisäysTila(true)}>Lisää uusi</button>}
            <br/>
            <label>Search:</label>
            <input type='text' onChange={(value) => handleSearch(value)}></input>
            {lisäysTila && <ProductAdd setLisäysTila={setLisäysTila} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}
            {
                showProducts && products && products.map(p => {
                    const lowerCaseName = p.productName.toLowerCase();
                    if (lowerCaseName.indexOf(search) > -1)
                        return (
                            <Product key={p.productId} product={p} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />
                        )
                }
                )
            }
              
        </>

    );
}

export default ProductList;
