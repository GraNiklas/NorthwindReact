import React, { useState } from 'react';
import ProductService from './services/ProductService';

//props suoraan nimellä eikä props.huomio
const ProductAdd = ({ setLisäysTila, setIsPositive, setMessage, setShowMessage }) => {
    

    const [newProductId, setNewProductId] = useState(0);
    const [newProductName, setNewProductName] = useState('');
    const [newSupplierId, setNewSupplierId] = useState(0);
    const [newCategoryId, setNewCategoryId] = useState(0);
    const [newQuantityPerUnit, setQuantityPerUnit] = useState('');
    const [newUnitPrice, setNewUnitPrice] = useState(0);
    const [newUnitsInStock, setNewUnitsInStock] = useState(0);
    const [newUnitsInOrder, setUnitsInOrder] = useState(0);
    const [newReorderLevel, setNewReorderLevel] = useState(0);
    const [newDiscontinued, setNewDiscontinued] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        var newProduct = {
            productId: newProductId,
            productName: newProductName,
            supplierId: newSupplierId,
            categoryId: newCategoryId,
            quantityPerUnit: newQuantityPerUnit,
            unitPrice: newUnitPrice,
            unitsInStock: newUnitsInStock,
            unitsOnOrder: newUnitsInOrder,
            reorderLevel: newReorderLevel,
            discontinued: newDiscontinued
        };
        ProductService.create(newProduct)
            .then(response => {
                if (response.status == 200 || response.status == 201)
                {

                    setIsPositive(true);
                    setMessage("New product added successfully: " + newProductName);
                    setShowMessage(true);
                    setLisäysTila(false);
                    setTimeout(() => {
                        setShowMessage(false);
                        window.location.reload(); // reload the page to see the changes
                    }, 3000);
                }
            })
            .catch(error => {
                setShowMessage(true);
                setMessage("Error: " + error.response);
                setIsPositive(false);
                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);
            })
    }


    return (
        <div id='addNew'>
            <h2>Product add</h2>
            <form onSubmit={handleSubmit}>
                {/* <div>
                    <input type='number' placeholder='Product id' required onChange={({ target }) => setNewProductId(target.value)} />
                </div> */}
                <div>
                    <input type='text' placeholder='Product name' required onChange={({ target }) => setNewProductName(target.value)} />
                </div>
                <div>
                    <input type='number' placeholder='Supplier id' onChange={({ target }) => setNewSupplierId(target.value)} />
                </div>
                <div>
                    <input type='number' placeholder='Category id'  onChange={({ target }) => setNewCategoryId(target.value)} />
                </div>
                <div>
                    <input type='text' placeholder='Quantity per unit'  onChange={({ target }) => setQuantityPerUnit(target.value)} />
                </div>
                <div>
                    <input type='number' placeholder='Unit price'  onChange={({ target }) => setNewUnitPrice(target.value)} />
                </div>
                <div>
                    <input type='number' placeholder='Units in stock' onChange={({ target }) => setNewUnitsInStock(target.value)} />
                </div>
                <div>
                    <input type='number' placeholder='Units in order'  onChange={({ target }) => setUnitsInOrder(target.value)} />
                </div>
                <div>
                    <input type='number' placeholder='Reorder level'  onChange={({ target }) => setNewReorderLevel(target.value)} />
                </div>
                <div>
                    <input type='checkbox' placeholder='Discontinued'  onChange={({ target }) => setNewDiscontinued(target.checked)} />
                </div>
                <div>
                    <input className='btn btn-success' type='submit' value='save' />
                    <input className='btn btn-secondary' type='button' value='back' onClick={() => setLisäysTila(false)} />
                </div>

            </form>
        </div>

    );
}

export default ProductAdd;
