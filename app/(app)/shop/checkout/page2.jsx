import React from "react";
import Container from "@/components/layouts/Container";
import BreadCrumb from "@/components/elements/BreadCrumb";
import ModulEcomerceOrderSummary from "@/components/ecomerce/modules/ModulEcomerceOrderSummary";
import FormCheckout from "@/components/shared/forms/FormCheckout";

const CheckoutScreen = () => {
    const breadcrumb = [
        {
            text: "Home",
            url: "/",
        },
        {
            text: "Shop",
            url: "/shopping-cart",
        },
        {
            text: "Checkout",
        },
    ];

    return (
        <Container title="Checkout">
            <div className="ps-page ps-page--shopping">
                <div className="container">
                    <div className="ps-page__header">
                        <BreadCrumb breacrumb={breadcrumb} />
                        <h1 className="ps-page__heading">Checkout</h1>
                    </div>
                    <div className="ps-page__content">
                        <div className="ps-checkout">
                            <div className="ps-checkout__wapper">
                                <p className="ps-checkout__text">
                                    Returning customer?{" "}
                                    <a href="#">Click here to login</a>
                                </p>
                                <p className="ps-checkout__text">
                                    Have a coupon?{" "}
                                    <a href="shopping-cart.html">
                                        Click here to enter your code
                                    </a>
                                </p>
                            </div>
                            <div className="row">
                                <div className="col-md-8">
                                    <FormCheckout />
                                </div>
                                <div className="col-md-4">
                                    <ModulEcomerceOrderSummary />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default CheckoutScreen;
