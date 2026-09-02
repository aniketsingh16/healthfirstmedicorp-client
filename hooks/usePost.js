/*
 * This hook return data of post (STRAPI CMS version)
 */

import { useState } from "react";
import Moment from "moment";
import Link from "next/link";
// import { baseUrl } from "~/repositories/Repository";

export default function usePost() {
    const [createdBy, setCreatedBy] = useState("Jan 1, 2021");
    const [categories, setCategories] = useState(
        <Link href="/blog" legacyBehavior>
            <a>uncategoried</a>
        </Link>
    );
    const [author, setAuthor] = useState("Unknown");
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbImageUrl, setThumbImageUrl] = useState("null");
    const [wideThumbnail, setWideThumbnail] = useState(null);
    const [wideThumbImageUrl, setWideThumbImageUrl] = useState("null");
    const [title, setTitle] = useState("Post title here");
    return {
        createdBy,
        author,
        categories,
        title,
        thumbnail,
        thumbImageUrl,
        wideThumbnail,
        wideThumbImageUrl,
        initPost: (post) => {
            let titleView;
            if (post.name) {
                titleView = (
                    <Link href="/post/[slug]" as={`/post/${post.slug}`} legacyBehavior>
                        <a className="ps-post__title">{post.name}</a>
                    </Link>
                );
            } else {
                titleView = (
                    <Link href="/post/[slug]" as={`/post/${post.slug}`} legacyBehavior>
                        <a className="ps-post__title">No title here.</a>
                    </Link>
                );
            }
            setTitle(titleView);

            if (post.created_at) {
                setCreatedBy(Moment(post.created_at).format("MMM DD, YYYY"));
            }

            if (post.categories && post.categories.length > 0) {
                const categoryItems = post.categories.map((item) => (
                    <Link
                        href="/category/[slug]"
                        as={`/categories/${item.slug}`}
                        key={item.id} legacyBehavior>
                        <a>{item.name}</a>
                    </Link>
                ));

                setCategories(categoryItems);
            }

            if (post.thumbnail) {
                // const thumbnailImage = (
                //     <img
                //         src={`${baseUrl}${post.thumbnail.url}`}
                //         alt="img"
                //     />
                // );
                // setThumbnail(thumbnailImage);
            }

            if (post.wide_thumbnail) {
                // const wideThumbImage = (
                //     <img
                //         src={`${baseUrl}${post.wide_thumbnail.url}`}
                //         alt="img"
                //     />
                // );
                // setWideThumbnail(wideThumbImage);
                // setWideThumbImageUrl(`${baseUrl}${post.wide_thumbnail.url}`);
            }
        },
    };
}