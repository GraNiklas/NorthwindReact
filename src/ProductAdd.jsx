import React, { useState } from 'react';
import ProductService from './services/ProductService';

//props suoraan nimellä eikä props.huomio
const ProductAdd = ({ setLisäysTila, setIsPositive, setMessage, setShowMessage }) => {
    

    const [newProductId, setNewProductId] = useState('');
    const [newProductName, setNewProductName] = useState('');
    const [newSupplierId, setNewSupplierId] = useState('');
    const [newCategoryId, setNewCategoryId] = useState('');
    const [newQuantityPerUnit, setQuantityPerUnit] = useState('');
    const [newUnitPrice, setNewUnitPrice] = useState('');
    const [newUnitsInStock, setNewUnitsInStock] = useState('');
    const [newUnitsInOrder, setUnitsInOrder] = useState('');
    const [newReorderLevel, setNewReorderLevel] = useState('');
    const [newDiscontinued, setNewDiscontinued] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        var newProduct = {
            productId: newProductId.toUpperCase(),
            productName: newProductName,
            supplierId: newSupplierId,
            categoryId: newCategoryId,
            quantityPerUnit: newQuantityPerUnit,
            unitPrice: newUnitPrice,
            unitsInStock: newUnitsInStock,
            unitsInOrder: newUnitsInOrder,
            reorderLevel: newReorderLevel,
            discontinued: newDiscontinued
        };
        ProductService.create(newProduct)
            .then(responce => {
                if (responce.status == 200)
                {

                    setIsPositive(true);
                    setMessage("New customer added successfully: " + newProductName);
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
                setMessage("Error: " + error.response.data);
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
                <div>
                    <input type='text' placeholder='Product id' required onChange={({ target }) => setNewProductId(target.value)} />
                </div>
                <div>
                    <input type='text' placeholder='Product name' required onChange={({ target }) => setNewProductName(target.value)} />
                </div>
                <div>
                    <input type='text' placeholder='Supplier id' onChange={({ target }) => setNewSupplierId(target.value)} />
                </div>
                <div>
                    <input type='text' placeholder='Category id'  onChange={({ target }) => setNewCategoryId(target.value)} />
                </div>
                <div>
                    <input type='text' placeholder='Quantity per unit'  onChange={({ target }) => setQuantityPerUnit(target.value)} />
                </div>
                <div>
                    <input type='text' placeholder='Unit price'  onChange={({ target }) => setNewUnitPrice(target.value)} />
                </div>
                <div>
                    <input type='text' placeholder='Units in stock' onChange={({ target }) => setNewUnitsInStock(target.value)} />
                </div>
                <div>
                    <input type='text' placeholder='Units in order'  onChange={({ target }) => setUnitsInOrder(target.value)} />
                </div>
                <div>
                    <input type='text' placeholder='Reorder level'  onChange={({ target }) => setNewReorderLevel(target.value)} />
                </div>
                <div>
                    <input type='text' placeholder='Discontinued'  onChange={({ target }) => setNewDiscontinued(target.value)} />
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
