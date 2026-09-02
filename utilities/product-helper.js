/*
 * React template helpers
 * Author: Nouthemes
 * Developed: diaryforlife
 * */

import React from 'react';
// import { baseUrlProduct } from '~/repositories/Repository';

export function formatCurrency(num) {
    if (num !== undefined) {
        return parseFloat(num)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else {
    }
}

export function SPGetProductThumbailImage(product, size) {
    let image;

    const { thumbnail } = product;
    if (thumbnail) {
        if (size && size === 'large') {
            if (thumbnail.formats.large) {
                image = thumbnail.formats.large.url;
            } else {
                image = product.thumbnail.url;
            }
        } else if (size && size === 'medium') {
            if (thumbnail.formats.medium) {
                image = thumbnail.formats.medium.url;
            } else {
                image = product.thumbnail.url;
            }
        } else if (size && size === 'thumbnail') {
            if (thumbnail.formats.thumbnail) {
                image = thumbnail.formats.thumbnail.url;
            } else {
                image = product.thumbnail.url;
            }
        } else if (size && size === 'small') {
            if (thumbnail.formats.small !== undefined) {
                image = thumbnail.formats.small.url;
            } else {
                image = product.thumbnail.url;
            }
        } else {
            image = product.thumbnail.url;
        }
        return (
            <img
                className="ps-product__image"
                src={`${baseUrlProduct}${image}`}
                alt=""
            />
        );
    } else {
        return (
            <img
                src="/static/img/undefined-product-thumbnail.jpg"
                alt={product.name}
            />
        );
    }
}

export function SPGetProductThumbailImages(product, size) {
    let imageFront,
        imageBack = null,
        view;
    const { thumbnail, thumbnail_back } = product;
    if (thumbnail_back) {
        if (size && size === 'large') {
            if (thumbnail_back.formats.large) {
                imageBack = thumbnail_back.formats.large.url;
            } else {
                imageBack = thumbnail_back.url;
            }
        } else if (size && size === 'medium') {
            if (thumbnail_back.formats.medium) {
                imageBack = thumbnail_back.formats.medium.url;
            } else {
                imageBack = thumbnail_back.url;
            }
        } else if (size && size === 'thumbnail') {
            if (thumbnail_back.formats.thumbnail) {
                imageBack = thumbnail_back.formats.thumbnail.url;
            } else {
                imageBack = thumbnail_back.url;
            }
        } else if (size && size === 'small') {
            if (thumbnail_back.formats.small) {
                imageBack = thumbnail_back.formats.small.url;
            } else {
                imageBack = thumbnail_back.url;
            }
        } else {
            imageBack = thumbnail_back.url;
        }
    }
    if (thumbnail) {
        if (size && size === 'large') {
            if (thumbnail.formats.large) {
                imageFront = thumbnail.formats.large.url;
            } else {
                imageFront = product.thumbnail.url;
            }
        } else if (size && size === 'medium') {
            if (thumbnail.formats.medium) {
                imageFront = thumbnail.formats.medium.url;
            } else {
                imageFront = product.thumbnail.url;
            }
        } else if (size && size === 'thumbnail') {
            if (thumbnail.formats.thumbnail) {
                imageFront = thumbnail.formats.thumbnail.url;
            } else {
                imageFront = product.thumbnail.url;
            }
        } else if (size && size === 'small') {
            if (thumbnail.formats.small !== undefined) {
                imageFront = thumbnail.formats.small.url;
            } else {
                imageFront = product.thumbnail.url;
            }
        } else {
            imageFront = product.thumbnail.url;
        }
        return (
            <div className="ps-product__thumbnail-images">
                <img
                    className="ps-product__image"
                    src={`${baseUrlProduct}${imageFront}`}
                    alt=""
                />
                <img
                    className="ps-product__image-alt"
                    src={`${baseUrlProduct}${imageBack}`}
                    alt=""
                />
            </div>
        );
    } else {
        return (
            <img
                src="/static/img/undefined-product-thumbnail.jpg"
                alt={product.name}
            />
        );
    }
}

export function SPGetProductPrice(product) {
    let view;
    if (product.sellingPrice) {
        view = (
            <p className="ps-product__price sale">
                <span>£</span>
                {formatCurrency(product.mrp)}
                <del className="ml-1">
                    <span>£</span>
                    {formatCurrency(product.sellingPrice)}
                </del>
            </p>
        );
    } else {
        view = (
            <p className="ps-product__price">
                <span>£</span>
                {formatCurrency(product.mrp)}
            </p>
        );
    }
    return view;
}

export function SPGetProductBadges(product) {
    let view,
        items = [];
    if (product.badge) {
        items.push(product.badge);
    }

    if (product.mrp) {
        items.push('sale');
    }
    if (items.length > 0) {
        const badgeItems = items.map((item) => {
            if (item === 'sale') {
                return (
                    <span className="ps-badge ps-badge--sale" key={item}>
                        Sale
                    </span>
                );
            }
            if (item === 'hot') {
                return (
                    <span className="ps-badge ps-badge--hot" key={item}>
                        Hot
                    </span>
                );
            }
        });
        view = <div className="ps-product__badges">{badgeItems}</div>;
    }
    return view;
}