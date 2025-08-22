import React,{useState,useEffect} from 'react';
import ProductService from './services/ProductService';
import ProductEdit from './ProductEdit';

//props suoraan nimellä eikä props.huomio
const Product = ({product,setIsPositive,setMessage,setShowMessage}) => {

    //componentin tilan määritys
    const [showDetails,setShowDetails] = useState(false);
    const [muokkausTila,setMuokkausTila] = useState(false);

    const  deleteProduct =(product) =>{
        if(window.confirm("Are you sure you want to delete product: " + product.productName + "?"))
        {
            ProductService.remove(product.productId)
            .then(response => {
                if(response.status === 200) {
                    setIsPositive(true);
                    setMessage("New product deleted successfully: " + product.productName);
                    setShowMessage(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setTimeout(() => {
                        setShowMessage(false);
                        window.location.reload(); // reload the page to see the changes
                    }, 3000);
                    
                }
                else
                {
                    setIsPositive(false);
                    setMessage("Something went wrong");
                    setShowMessage(true);
                    setTimeout(() => {
                        setShowMessage(false);
                    }, 3000);
                }
            })

        }
    }

    return (
    <div className='product-div'>
        <h2 onClick={()=>setShowDetails(!showDetails)}>{product.productName}</h2>
            
        {showDetails && <div className='product-details'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ProductID</th>
                        <th>ProductName</th>
                        <th>SupplierId</th>
                        <th>CategoryId</th>
                        <th>QuantityPerUnit</th>
                        <th>UnitPrice</th>
                        <th>UnitsInStock</th>
                        <th>UnitsInOrder</th>
                        <th>ReorderLevel</th>
                        <th>Discontinued</th>
                        <th>ImageLink</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{product.productId}</th>
                        <th>{product.productName}</th>
                        <th>{product.supplierId}</th>
                        <th>{product.categoryId}</th>
                        <th>{product.quantityPerUnit}</th>
                        <th>{product.unitPrice}</th>
                        <th>{product.unitsInStock}</th>
                        <th>{product.unitsInOrder}</th>
                        <th>{product.reorderLevel}</th>
                        <th>{product.discontinued}</th>
                        <th>
                            <img style={{height:"32px",width:"32px",objectFit: "cover" }} src={product.imageLink} alt={product.productName} />
                        </th>
                        <th>
                        <button className='btn btn-danger' onClick={()=>deleteProduct(product)}>delete</button>
                        {!muokkausTila && <button className='btn btn-warning' onClick={()=>setMuokkausTila(true)}>Edit</button>}
                        </th>
                    </tr>
                </tbody>
            </table>
            {muokkausTila && <ProductEdit product={product} setMuokkausTila={setMuokkausTila} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>}
           
        </div>
        }
        
    </div>
    );
}

export default Product;
