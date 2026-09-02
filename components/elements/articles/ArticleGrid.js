import React, { useEffect } from "react";
import Link from "next/link";
import usePost from "@/hooks/usePost";

const ArticleGrid = ({ post }) => {
    const { thumbnail, title, categories, createdBy, initPost } = usePost();
    useEffect(() => {
        initPost(post);
    }, [post]);

    return (
        <article className="ps-post ps-post--grid">
            <div className="ps-post__thumbnail">
                <Link href="/post/[slug]" as={`/post/${post.slug}`} legacyBehavior>
                    <a className="ps-post__overlay"></a>
                </Link>
                {thumbnail}
                <div className="ps-post__categories">{categories}</div>
            </div>
            <div className="ps-post__wrapper">
                <div className="ps-post__content">
                    {title}
                    <div className="ps-post__meta">
                        <span className="ps-post__created-at">{createdBy}</span>
                        <Link href="/blog" legacyBehavior>
                            <a className="ps-post__author">Alfredo Austin</a>
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ArticleGrid;
