const addProduct = async (payload, images) => {

    const formData = new FormData();

    formData.append("payload", JSON.stringify(payload));
    images.forEach((image) => formData.append('images', image));

    const response = await fetch(`http://localhost:3100/api/product/add-product`, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: formData

    })

    const data = await response.json();
    return data;

}





const getAllProducts = async (obj) => {

    const response = await fetch(`http://localhost:3100/api/product/get-all-products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(obj)

    })

    const data = await response.json();
    return data;

}


const getProductById = async (id)=>{
    const response = await fetch(`http://localhost:3100/api/product/get-product-by-id/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        // body: JSON.stringify(obj)

    })

    const data = await response.json();
    return data;
}





const updateProduct = async (id, payload, images) => {

    const formData = new FormData();

    formData.append("payload", JSON.stringify(payload));
    images.forEach((image) => formData.append('images', image));

    const response = await fetch(`http://localhost:3100/api/product/update-product/${id}`, {
        method: 'PUT',
        headers: {
            // 'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: formData

    })

    const data = await response.json();
    return data;

}





const deleteProduct = async (id) => {

    const response = await fetch(`http://localhost:3100/api/product/delete-product/${id}`, {
        method: 'DELETE',
        headers: {
            // 'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        // body: JSON.stringify(payload)

    })

    const data = await response.json();
    return data;
}






const deletSingleImage = async (imageId, productId) => {
    const response = await fetch(`http://localhost:3100/api/product/delete-single-image?imageId=${imageId}&productId=${productId}`, {
        method: 'DELETE',
        headers: {
            // 'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        // body: JSON.stringify(payload)

    })

    const data = await response.json();
    return data;
}





const updateProductStatus = async (id, status) => {

    const response = await fetch(`http://localhost:3100/api/product/update-product-status/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({status})

    })

    const data = await response.json();
    return data;

}





module.exports = { addProduct, getAllProducts, updateProduct, deleteProduct, deletSingleImage, updateProductStatus, getProductById };