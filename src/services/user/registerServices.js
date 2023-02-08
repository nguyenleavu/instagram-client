const { postApi } = require('@/utils/request');

const register = async (newUser) => {
    try {
        const res = await postApi('/user/register', newUser);
        return {
            status: true,
            data: res,
        };
    } catch (error) {
        return {
            status: false,
            data: error?.response?.data?.message?.message,
        };
    }
};

export default register;
