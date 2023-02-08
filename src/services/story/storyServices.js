const { getApi, postApi } = require('@/utils/request');

const getAllStory = async (token) => {
    try {
        const res = await getApi(
            '/story',

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

const seenStory = async (id, token) => {
    try {
        const res = await postApi(
            `/seen-story/${id}`,
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

export { getAllStory, seenStory };
