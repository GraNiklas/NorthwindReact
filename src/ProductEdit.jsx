import React, { useState } from 'react';
import ProductService from './services/ProductService';

//props suoraan nimellä eikä props.huomio
const ProductEdit = ({ product, setMuokkausTila, setIsPositive, setMessage, setShowMessage }) => {
    

    const [newProductId, setNewProductId] = useState(product.productId || '');
    const [newProductName, setNewProductName] = useState(product.productName || '');
    const [newSupplierId, setNewSupplierId] = useState(product.supplierId || '');
    const [newCategoryId, setNewCategoryId] = useState(product.categoryId || '');
    const [newQuantityPerUnit, setQuantityPerUnit] = useState(product.quantityPerUnit || '');
    const [newUnitPrice, setNewUnitPrice] = useState(product.unitPrice || '');
    const [newUnitsInStock, setNewUnitsInStock] = useState(product.unitsInStock || '');
    const [newUnitsInOrder, setUnitsInOrder] = useState(product.unitsInOrder || '');
    const [newReorderLevel, setNewReorderLevel] = useState(product.reorderLevel || '');
    const [newDiscontinued, setNewDiscontinued] = useState(product.discontinued || false);

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
        ProductService.update(newProduct)
            .then(responce => {
                if (responce.status == 200)
                {

                    setIsPositive(true);
                    setMessage("New customer edited successfully: " + newProductName);
                    setShowMessage(true);
                    setMuokkausTila(false);
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
        <div id='edit'>
            <h2>Product edit</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type='text' placeholder='Product id' required onChange={({ target }) => setNewProductId(target.value)} value={newProductId}/>
                </div>
                <div>
                    <input type='text' placeholder='Product name' required onChange={({ target }) => setNewProductName(target.value)} value={newProductName}/>
                </div>
                <div>
                    <input type='text' placeholder='Supplier id' onChange={({ target }) => setNewSupplierId(target.value)} value={newSupplierId}/>
                </div>
                <div>
                    <input type='text' placeholder='Category id'  onChange={({ target }) => setNewCategoryId(target.value)} value={newCategoryId}/>
                </div>
                <div>
                    <input type='text' placeholder='Quantity per unit'  onChange={({ target }) => setQuantityPerUnit(target.value)} value={newQuantityPerUnit}/>
                </div>
                <div>
                    <input type='text' placeholder='Unit price'  onChange={({ target }) => setNewUnitPrice(target.value)} value={newUnitPrice}/>
                </div>
                <div>
                    <input type='text' placeholder='Units in stock' onChange={({ target }) => setNewUnitsInStock(target.value)} value={newUnitsInStock}/>
                </div>
                <div>
                    <input type='text' placeholder='Units in order'  onChange={({ target }) => setUnitsInOrder(target.value)} value={newUnitsInOrder}/>
                </div>
                <div>
                    <input type='text' placeholder='Reorder level'  onChange={({ target }) => setNewReorderLevel(target.value)} value={newReorderLevel}/>
                </div>
                <div>
                    <input type='text' placeholder='Discontinued'  onChange={({ target }) => setNewDiscontinued(target.value)} value={newDiscontinued}/>
                </div>
                <div>
                    <input className='btn btn-success' type='submit' value='save' />
                    <input className='btn btn-secondary' type='button' value='back' onClick={() => setMuokkausTila(false)} />
                </div>

            </form>
        </div>

    );
}

export default ProductEdit;
