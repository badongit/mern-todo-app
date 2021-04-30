import axiosClient from './axiosClient';

const postApi = {
    add: (todoForm) => {
        const url = '/posts';

        return axiosClient.post(url, todoForm);
    },
    getAll: () => {
        const url = '/posts';

        return axiosClient.get(url);
    },
    getById: (id) => {
        const url = `/posts/${id}`;

        return axiosClient.get(url);
    },
    update: (postId, todoForm) => {
        const url = `/posts/${postId}`;
        
        return axiosClient.put(url,todoForm);
    },
    delete: (postId) => {
        const url = `/posts/${postId}`;

        return axiosClient.delete(url);
    },

}

export default postApi;
