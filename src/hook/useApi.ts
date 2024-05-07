import { useEffect, useState } from "react";
import { api } from "../api/api";
import { Product } from "../type/type";

export function useProducts(){
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await api().getProducts();
                setProducts(productsData.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchData();
    }, []);

    const addElement = async (newProduct: Product) => {
        try {
            const response = await api().postProducts(newProduct);
            // Aggiorna lo stato dei prodotti con il nuovo prodotto
            setProducts(prevProducts => [...prevProducts, response]);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const updateElement = async (id: number, updatedProduct: Product) => {
        try {
            if(!updatedProduct.title || !updatedProduct.description || !updatedProduct.price) return alert('compila tutti i campi!');
            await api().putProducts(id, updatedProduct);
            // Aggiorna lo stato dei prodotti con il prodotto aggiornato
            setProducts(prevProducts => prevProducts.map(product => product.id === id ? updatedProduct : product));
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const deleteElement = async (id: number) => {
        try {
            await api().deleteProducts(id);
            // Aggiorna lo stato dei prodotti eliminando il prodotto corrispondente
            setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return {
        products,
        addElement,
        deleteElement,
        updateElement, 
    }
}