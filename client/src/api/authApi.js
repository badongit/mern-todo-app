import axiosClient from './axiosClient';

const authApi = {
    login: (userForm) => {
        const url = '/auth/login';

        return axiosClient.post(url, userForm);
    },

    register: (userForm) => {
        const url = '/auth/register';

        return axiosClient.post(url, userForm);
    },

    confirm: () => {
        const url = '/auth';

        return axiosClient.get(url);
    }

}

export default authApi;