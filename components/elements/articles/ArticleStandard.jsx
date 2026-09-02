import React, { useEffect } from "react";
import Link from "next/link";
import usePost from "@/hooks/usePost";

const ArticleStandard = ({ post }) => {
    const { thumbnail, title, categories, createdBy, initPost } = usePost();

    useEffect(() => {
        initPost(post);
    }, [post]);

    return (
        <article className="ps-post ps-post--grid ps-post--standard">
            <div className="ps-post__thumbnail">
                <Link href="/post/[slug]" as={`/post/${post.slug}`} legacyBehavior>
                    <a className="ps-post__overlay"></a>
                </Link>
                {thumbnail}
            </div>
            <div className="ps-post__wrapper">
                <div className="ps-post__content">
                    <div className="ps-post__categories">{categories}</div>
                    <div className="ps-post__meta">
                        <span className="ps-post__created-at">{createdBy}</span>
                        <Link href="/blog" legacyBehavior>
                            <a className="ps-post__author">Alfredo Austin</a>
                        </Link>
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

export default ArticleStandard;
