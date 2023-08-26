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


module.exports = {addProduct};