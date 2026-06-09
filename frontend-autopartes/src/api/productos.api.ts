import api from './axios';

export const getProductos =
    async () => {
        const { data } = await api.get( '/productos', );
        return data;
    };

export const createProducto =
    async ( producto: any,) => {
        const { data } =  await api.post('/productos',  producto,);
        return data;
    };

export const updateProducto =
    async ( id: number, producto: any, ) => {
        const { data } = await api.patch( `/productos/${id}`, producto, );
        return data;
    };

export const deleteProducto =
    async (id: number,) => {
        const { data } = await api.delete( `/productos/${id}`, );
        return data;

    };