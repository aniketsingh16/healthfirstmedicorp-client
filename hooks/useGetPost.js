import { useState } from "react";

// import PostRepository from "~/repositories/PostRepository";

export default function useGetPost() {
    const [loading, setLoading] = useState(false);
    const [postItems, setPostItems] = useState(null);
    const [post, setPost] = useState(null);

    return {
        loading,
        postItems,

        setLoading: (payload) => {
            setLoading(payload);
        },

        getPosts: async (payload) => {
            setLoading(true);
            // const responseData = await PostRepository.getPosts(payload);
            if (responseData) {
                setPostItems(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
                return responseData.items;
            } else {
                setLoading(false);
                return [];
            }
        },

        getPostByCollection: async (payload, pageSize) => {
            setLoading(true);
            // const responseData = await PostRepository.getPosts(
            //     payload,
            //     pageSize
            // );
            if (responseData) {
                setPostItems(responseData.items);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
                return responseData.items;
            } else {
                setLoading(false);
                return [];
            }
        },

        getPostBySlug: async (payload) => {
            setLoading(true);
            // const responseData = await PostRepository.getPostBySlug(payload);
            if (responseData) {
                setPostItems(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
                return responseData;
            } else {
                setLoading(false);
                return [];
            }
        },
    };
}
