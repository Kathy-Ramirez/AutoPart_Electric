import api from './axios';

export const obtenerPerfil =
    async () => {

        const { data } =
            await api.get('/auth/profile');

        return data;

    };