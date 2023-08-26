//register

const userRegister = async (user) => {

    const response = await fetch(`http://localhost:3100/api/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    const data = await response.json();
    return data;

}


const userLogin = async (user)=>{

     const response = await fetch(`http://localhost:3100/api/user/login`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)

        })

        const data = await response.json();
        return data;

}


module.exports = { userRegister, userLogin }