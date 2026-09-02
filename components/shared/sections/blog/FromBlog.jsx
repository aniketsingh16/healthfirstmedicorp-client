import React, { useEffect } from "react";
import useGetPost from "~/hooks/useGetPost";
import usePostGroup from "~/hooks/usePostGroup";

const FromBlog = () => {
    const { getPosts, postItems, loading } = useGetPost();
    const { withGrid } = usePostGroup();

    useEffect(() => {
        getPosts({ _limit: 3 });
    }, []);

    return (
        <section className="ps-section--from-blog">
            <div className="container">
                <div className="ps-section__header">
                    <h3>From our blog</h3>
                </div>
                <div className="ps-section__content">
                    {withGrid(postItems, loading, 3)}
                </div>
            </div>
        </section>
    );
};
export default FromBlog;
