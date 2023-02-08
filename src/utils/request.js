import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:4000/api',
});

const getApi = async (path, options = {}, headers = {}) => {
    const res = await request.get(path, options, headers);
    return res.data;
};

const postApi = async (path, options = {}, headers = {}) => {
    const res = await request.post(path, options, headers);
    return res.data;
};

const deleteApi = async (path, headers = {}) => {
    const res = await request.delete(path, headers);
    return res.data;
};
export { getApi, postApi, deleteApi };
