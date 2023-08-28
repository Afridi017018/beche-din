const addProduct = async (payload)=>{

    const response = await fetch(`http://localhost:3100/api/product/add-product`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(payload)

    })

    const data = await response.json();
    return data;

}


const getAllProducts = async ()=>{

    const response = await fetch(`http://localhost:3100/api/product/get-all-products`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            // 'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        // body: JSON.stringify(payload)

    })

    const data = await response.json();
    return data;

}


const updateProduct = async (id, payload)=>{

    const response = await fetch(`http://localhost:3100/api/product/update-product/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(payload)

    })

    const data = await response.json();
    return data;

}


module.exports = {addProduct, getAllProducts, updateProduct};