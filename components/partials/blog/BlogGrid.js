import React, { useEffect, useState } from 'react';
import PostRepository from '~/repositories/PostRepository';
import ArticleGrid from '~/components/elements/articles/ArticleGrid';
import SuproPagination from '~/components/elements/basic/SuproPagination';

const BlogGrid = ({ collectionSlug, column }) => {
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
        console.log(APIPosts);

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
            if (column === '3') {
                return (
                    <div className=" col-md-4 col-sm-6" key={item.productID}>
                        <ArticleGrid post={item} />
                    </div>
                );
            } else if (column === '4') {
                return (
                    <div className="col-lg-3 col-md-4 col-sm-6" key={item.productID}>
                        <ArticleGrid post={item} />
                    </div>
                );
            } else {
                return (
                    <div className="col-md-6" key={item.productID}>
                        <ArticleGrid post={item} />
                    </div>
                );
            }
        });
    }

    return (
        <div className="ps-blog ps-blog--grid">
            <div className="container">
                <div className="ps-blog__header">
                    <ul className="ps-blog__categories">
                        <li className="active">
                            <a href="#">All Categories</a>
                        </li>
                        <li>
                            <a href="#">Fashion</a>
                        </li>
                        <li>
                            <a href="#">DIY</a>
                        </li>
                        <li>
                            <a href="#">Women</a>
                        </li>
                        <li>
                            <a href="#">Beauty</a>
                        </li>
                        <li>
                            <a href="#">Lifestyle</a>
                        </li>
                    </ul>
                </div>
                <div className="ps-blog__content">
                    <div className="ps-post-items">
                        <div className="row">{viewPostItems}</div>
                    </div>
                </div>
                <div className="ps-blog__footer">
                    <SuproPagination />
                </div>
            </div>
        </div>
    );
};

export default BlogGrid;
