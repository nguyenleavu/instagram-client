const { getApi, postApi, deleteApi } = require('@/utils/request');

const getAllRecent = async (token) => {
    try {
        const res = await getApi('/recent', {
            headers: {
                token: token,
            },
        });
        return res;
    } catch (error) {
        console.error(error?.response?.data?.message?.message);
    }
};

const postRecent = async (id, token) => {
    try {
        const res = await postApi(
            `/recent/${id}`,
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

const deleteRecent = async (id, token) => {
    try {
        const res = await deleteApi(`/recent/${id}`, {
            headers: {
                token: token,
            },
        });
        return res;
    } catch (error) {
        console.error(error?.response?.data?.message?.message);
    }
};

const deleteAllRecent = async (token) => {
    try {
        const res = await deleteApi(`/recent`, {
            headers: {
                token: token,
            },
        });
        return res;
    } catch (error) {
        console.error(error?.response?.data?.message?.message);
    }
};

export { getAllRecent, postRecent, deleteRecent, deleteAllRecent };
