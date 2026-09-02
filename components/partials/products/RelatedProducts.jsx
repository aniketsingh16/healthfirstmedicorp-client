import React, { useEffect, useState } from 'react';
import CollectionRepository from '@/repositories/CollectionRepository';
import ProductRepository from '@/repositories/ProductRepository';
import Product from '@/components/elements/products/Product';
import SkeletonProduct from '@/components/elements/skeletons/SkeletonProduct';

const RelatedProducts = ({ collectionSlug }) => {
    const [productItems, setProductItems] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getProduct() {
        let queries, SPProducts;
        if (collectionSlug !== undefined) {
            SPProducts = await CollectionRepository.getProductsByCollectionSlug(
                collectionSlug
            );
        } else {
            queries = {
                _limit: 4,
            };
            SPProducts = await ProductRepository.getProducts(queries);
        }

        if (SPProducts) {
            setTimeout(function () {
                setLoading(false);
            }, 200);
            setProductItems(SPProducts.items);
            return SPProducts;
        } else {
            setProductItems(null);
            return null;
        }
    }

    useEffect(() => {
        getProduct();
    }, []);
    let productItemsView;
    if (!loading) {
        if (productItems && productItems.length > 0) {
            const products = productItems.map((item, index) => {
                if (index < 6) {
                    return (
                        <div
                            className="col-xl-3 col-lg-4 col-sm-3 col-6"
                            key={item.productID}>
                            <Product product={item} />
                        </div>
                    );
                }
            });
            productItemsView = <div className="row">{products}</div>;
        } else {
            productItemsView = <p>No product(s) found.</p>;
        }
    } else {
        const tempArr = [1, 2, 3, 4];
        const skeletonItems = tempArr.map((item) => (
            <div className="col-xl-3 col-lg-4 col-sm-3 col-6" key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletonItems}</div>;
    }
    return (
        <div className="ps-related-products">
            <h3>Related Products</h3>
            {productItemsView}
        </div>
    );
};

export default RelatedProducts;
