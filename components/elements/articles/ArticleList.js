import React, { useEffect } from "react";
import Link from "next/link";
import usePost from "@/hooks/usePost";

const ArticleList = ({ post }) => {
    const { thumbnail, title, categories, initPost } = usePost();
    useEffect(() => {
        initPost(post);
    }, [post]);

    return (
        <article className="ps-post ps-post--list">
            <div className="ps-post__thumbnail">
                <Link href="/post/[slug]" as={`/post/${post.slug}`} legacyBehavior>
                    <a className="ps-post__overlay"></a>
                </Link>
                {thumbnail}
            </div>
            <div className="ps-post__wrapper">
                <div className="ps-post__content">
                    {categories}
                    <div className="ps-post__meta">
                        <span className="ps-post__created">May 15, 2021</span>
                        <a className="ps-post__author">Thomas Charlson</a>
                    </div>
                    {title}
                    <p className="ps-post__desc">
                        Lorem Ipsum has been the industry&apos;s standard dummy text
                        ever since the 1500s, when an unknown printer took a
                        galley of type and scrambled it to make a type specimen
                        book.
                    </p>
                </div>
            </div>
        </article>
    );
};

export default ArticleList;
