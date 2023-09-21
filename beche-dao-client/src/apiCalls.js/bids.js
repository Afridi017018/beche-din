const placeBid = async (obj)=>{

    const response = await fetch(`http://localhost:3100/api/bids/place-bid`, {
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

const getAllBids= async (obj)=>{

    const response = await fetch(`http://localhost:3100/api/bids/get-all-bids`, {
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




module.exports = {placeBid, getAllBids}