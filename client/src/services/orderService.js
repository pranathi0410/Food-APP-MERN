
const API="http://localhost:5000/api/order"

export const createOrderApi= async(data)=>{
    const res= await fetch(`${API}/create`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(data)
    })

    return res.json();
}

export const viewOrderApi = async (userId) => {
  const res = await fetch(`${API}/getAll/${userId}`);
  const result = await res.json();
  return result;
};