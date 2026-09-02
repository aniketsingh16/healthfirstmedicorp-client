import React, { useEffect } from "react";
import useGetPost from "~/hooks/useGetPost";
import usePostGroup from "~/hooks/usePostGroup";

const RelatedPosts = () => {
    const { getPosts, postItems, loading } = useGetPost();
    const { withList, withGrid } = usePostGroup();

    useEffect(() => {
        getPosts({ _limit: 3 });
    }, []);

    return (
        <section
            className="ps-section--from-blog"
            style={{ background: "url(/static/img/related-bg.jpg)" }}>
            <div className="container">
                <div className="ps-section__header">
                    <h3>Related Posts</h3>
                </div>
                <div className="ps-section__content">
                    {withGrid(postItems, loading, 3)}
                </div>
            </div>
        </section>
    );
};

export default RelatedPosts;
