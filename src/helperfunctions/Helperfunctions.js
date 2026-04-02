import axios from "axios";

const prodbaseurl = `http://localhost:2004/api/auth/v2`


const getsingleproduct = async (productsId) => {
    try {
        const resposne = await axios.get(`${prodbaseurl}/products/${productsId}`);
        return resposne.data.data;
    }
    catch (error) {
        console.error(error.message);
    }
}


export { getsingleproduct };