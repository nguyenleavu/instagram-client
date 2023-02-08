const { getApi } = require('@/utils/request');

const getSuggested = async (number, token) => {
    try {
        const res = await getApi('/user/suggested', {
            params: {
                limit: number,
            },
            headers: {
                token,
            },
        });
        return res;
    } catch (error) {
        console.error(error?.response?.data?.message?.message);
    }
};

export default getSuggested;
