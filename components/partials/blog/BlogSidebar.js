import React, { useEffect, useState } from 'react';
import PostRepository from '~/repositories/PostRepository';
import ArticleGrid from '~/components/elements/articles/ArticleGrid';
import SuproPagination from '~/components/elements/basic/SuproPagination';
import ModuleBlogCategories from '~/components/partials/blog/modules/ModuleBlogCategories';
import WidgetBlogSearch from '~/components/shared/widgets/WidgetBlogSearch';
import WidgetBlogCategories from '~/components/shared/widgets/WidgetBlogCategories';
import WidgetBlogTags from '~/components/shared/widgets/WidgetBlogTags';
import WidgetBlogPromotions from '~/components/shared/widgets/WidgetBlogPromotions';

const BlogSidebar = ({ collectionSlug, column }) => {
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
        <div className="ps-blog ps-blog--sidebar">
            <div className="container">
                <div className="ps-blog__container">
                    <div className="ps-blog__sidebar">
                        <WidgetBlogSearch />
                        <WidgetBlogCategories />
                        <WidgetBlogTags />
                        <WidgetBlogPromotions />
                    </div>
                    <div className="ps-blog__right">
                        <div className="ps-blog__header">
                            <ModuleBlogCategories />
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
            </div>
        </div>
    );
};

export default BlogSidebar;
