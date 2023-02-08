const { postApi } = require('@/utils/request');

const following = async (id, token) => {
    try {
        const res = await postApi(
            `/follow/${id}`,
            {},
            {
                headers: {
                    token: token,
                },
            }
        );
        return res;
    } catch (error) {
        console.error(error?.response?.data?.message?.message);
    }
};

export default following;
