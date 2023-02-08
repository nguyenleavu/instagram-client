const { postApi } = require('@/utils/request');

const login = async (user) => {
    try {
        const res = await postApi('/user/login', user);
        return {
            status: true,
            data: res,
        };
    } catch (error) {
        return {
            status: false,
            data: error?.response?.data?.message,
        };
    }
};

export default login;