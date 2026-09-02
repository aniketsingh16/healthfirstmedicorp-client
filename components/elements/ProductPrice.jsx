import { formatCurrency, formatPrice } from "@/lib/utils";

const ProductPrice = ({ discountedPrice, mrp }) => {
    if (discountedPrice) {
        return (
            <p className="ps-product__price sale">
                <span className="price__currency">₹</span>
                {formatPrice(discountedPrice)}
                <del className="ml-2">
                    <span className="price__currency">₹</span>
                    {formatPrice(mrp)}
                </del>
            </p>
        );
    }

    return (
        <p className="ps-product__price">
            <span className="price__currency">₹</span>
            {formatPrice(mrp)}
        </p>
    );
};

export default ProductPrice;