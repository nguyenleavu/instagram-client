const { getApi, postApi } = require('@/utils/request');

const getAllPost = async (token, page, type = '') => {
    try {
        const res = await getApi('/post', {
            params: {
                page,
                type,
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

const getDetailPost = async (id, token) => {
    try {
        const res = await getApi(`/post/${id}`, {
            headers: {
                token: token,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

const likePost = async (id, token) => {
    try {
        const res = await postApi(
            `/like/${id}`,
            {},
            {
                headers: {
                    token: token,
                },
            }
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};

export { getAllPost, likePost, getDetailPost };
