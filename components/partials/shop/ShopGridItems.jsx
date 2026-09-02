import React, { useEffect, useState } from 'react';
import Product from '@/components/elements/products/Product';
import SkeletonProduct from '@/components/elements/skeletons/SkeletonProduct';
import ProductRepository from '@/repositories/ProductRepository';

const ShopGridItems = ({ queries }) => {
    const [productItems, setProductItems] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getProducts(queries) {
        setLoading(true);
        const SPProduct = await ProductRepository.getProducts(queries);
        if (SPProduct) {
            setProductItems(SPProduct.items);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        } else {
            console.log('error');
        }
        return SPProduct;
    }

    useEffect(() => {
        if (queries.test) {
            /*getProducts({ _limit: 12 });*/
        } else {
            getProducts({ _limit: 12 });
        }
    }, [queries]);

    let productItemsView;
    if (!loading && productItems) {
        if (productItems.length > 0) {
            const items = productItems.map((item) => {
                return (
                    <div
                        className="col-xl-3 col-lg-4 col-md-3 col-sm-6 col-6"
                        key={item.productID}>
                        <Product product={item} />
                    </div>
                );
            });
            productItemsView = <div className="row">{items}</div>;
        } else {
            productItemsView = <p>No product(s) found.</p>;
        }
    } else {
        const tempArr = [1, 2, 3, 4];
        const skeletonItems = tempArr.map((item) => (
            <div
                className="col-xl-3 col-lg-4 col-md-3 col-sm-6 col-6"
                key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletonItems}</div>;
    }

    return <div className="ps-shop-items">{productItemsView}</div>;
};

export default ShopGridItems;
