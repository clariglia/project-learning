import { service } from "../service/service";
import { Product } from "../type/type";


export function api(){

    const getProducts = async() =>{
        const response = await service('https://dummyjson.com/products', 'GET')
        return response;
    }

    const postProducts = async (data: Product) => {
        const response = await service('https://dummyjson.com/products/add', 'POST', data);
        return response;
    }

    const putProducts = async (id: number, data: Product) =>{
        const response = await service(`https://dummyjson.com/products/${id}`, 'PUT', data);
        return response;
    }

    const deleteProducts = async (id: number) =>{
        const response = await service(`https://dummyjson.com/products/${id}`, 'DELETE');
        return response;
    }

    return{
        getProducts,
        postProducts,
        putProducts,
        deleteProducts,
    }
}