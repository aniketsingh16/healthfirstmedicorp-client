/*
 * React template helpers
 * Author: Nouthemes
 * Developed: diaryforlife
 * */
import React from 'react';
import CollectionRepository from '~/repositories/CollectionRepository';
import ProductRepository from '~/repositories/ProductRepository';

export async function getProductHelper(collectionSlug, pageSize = 12) {
    let SPProducts;
    if (collectionSlug) {
        SPProducts = await CollectionRepository.getProductsByCollectionSlug(
            collectionSlug
        );
    } else {
        const queries = {
            _limit: pageSize,
        };
        SPProducts = await ProductRepository.getProducts(queries);
    }

    if (SPProducts) {
        return SPProducts;
    } else {
        return null;
    }
}
