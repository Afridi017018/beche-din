const addProduct = async (payload, images)=>{

    const formData = new FormData();

formData.append("payload", JSON.stringify(payload));
images.forEach((image) => formData.append('images', image));

    const response = await fetch(`http://localhost:3100/api/product/add-product`,{
        method:'POST',
        headers:{
            // 'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: formData

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


const updateProduct = async (id, payload, images)=>{

    const formData = new FormData();

formData.append("payload", JSON.stringify(payload));
images.forEach((image) => formData.append('images', image));

    const response = await fetch(`http://localhost:3100/api/product/update-product/${id}`,{
        method:'PUT',
        headers:{
            // 'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: formData

    })

    const data = await response.json();
    return data;

}




// const uploadImages = async (payload)=>{
//     const response = await fetch(`http://localhost:3100/api/product/upload`, {
//         method:'POST',
//         headers:{
//             'authorization': `Bearer ${localStorage.getItem("token")}`
//         },
//          body: payload

//     })

//     const data = await response.json();
//     return data;

// }


// const loadImages = async (id)=>{
//     const response = await fetch(`http://localhost:3100/api/product/load-images/${id}`, {
//         method:'GET',
//         headers:{
//             'Content-Type': 'application/json',
//             'authorization': `Bearer ${localStorage.getItem("token")}`
//         },
//         // body: JSON.stringify(payload)

//     })

//     const data = await response.json();
//     return data;

// }





module.exports = {addProduct, getAllProducts, updateProduct};