const { getApi } = require('@/utils/request');

const getDetailUser = async (username) => {
    try {
        const res = await getApi(`/user/${username}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export default getDetailUser;
