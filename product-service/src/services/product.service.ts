import axios from "axios";
import Product from "../models/product.model"

export const createProductWithUser = async (payload) => {
    const user = payload.user
    const product = (await Product.create(payload)).toObject();
    let createdUser = {};
    if (user) {
        const response = await axios.post(process.env.USER_SERVER_URL + '/api/v1/users', user)
        createdUser = response.data
    }
    return { ...product, user: { ...createdUser } }
}



