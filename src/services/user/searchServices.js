const { getApi } = require('@/utils/request');

const search = async (q, token) => {
    try {
        const res = await getApi('/user/search', {
            params: {
                q,
            },
            headers: {
                token: token,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export default search;
