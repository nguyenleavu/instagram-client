const { getApi, postApi, deleteApi } = require('@/utils/request');

const addComment = async (id, comments, token) => {
    try {
        const res = await postApi(
            `comment/${id}/post`,
            { comments },
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

const likeComments = async (id, token) => {
    try {
        const res = await postApi(
            `like-comment/${id}`,
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

const deleteComments = async (id, token) => {
    try {
        const res = await deleteApi(`comment/${id}`, {
            headers: {
                token: token,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export { addComment, likeComments, deleteComments };
