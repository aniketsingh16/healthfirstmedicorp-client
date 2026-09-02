import React, { useEffect, useState } from 'react';
import PostRepository from '~/repositories/PostRepository';
import ArticleGrid from '~/components/elements/articles/ArticleGrid';
import ArticleList from '~/components/elements/articles/ArticleList';

const BlogGrid = ({ collectionSlug }) => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState(null);

    async function getPosts() {
        let queries, APIPosts;
        if (collectionSlug !== undefined) {
            queries = {
                slug_eq: collectionSlug,
            };
            APIPosts = await PostRepository.SPGetPostItemOfCollectionBySlug(
                queries
            );
        } else {
            queries = {
                _limit: 6,
            };
            APIPosts = await PostRepository.getPosts(queries);
        }
        if (APIPosts) {
            setTimeout(function () {
                setLoading(false);
            }, 200);
            setPosts(APIPosts);
            return APIPosts;
        } else {
            setPosts(null);
            return null;
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    let viewPostItems;
    if (!loading && posts) {
        viewPostItems = posts.map((item) => {
            return <ArticleList post={item} key={item.productID} />;
        });
    }

    return <div className="ps-post-items">{viewPostItems}</div>;
};

export default BlogGrid;
