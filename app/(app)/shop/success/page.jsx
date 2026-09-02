// import React from "react";
// import Container from "@/components/layouts/Container";
// import BreadCrumb from "@/components/elements/BreadCrumb";
// import { Alert } from "antd";
// const CheckoutScreen = () => {
//     const breadcrumb = [
//         {
//             text: "Home",
//             url: "/",
//         },
//         {
//             text: "Shop",
//             url: "/shopping-cart",
//         },
//         {
//             text: "Order Success",
//         },
//     ];

//     return (
//         <Container title="Order Succe">
//             <div className="ps-page ps-page--inner">
//                 <div className="container">
//                     <div className="ps-page__header">
//                         <BreadCrumb breacrumb={breadcrumb} />
//                         <h1 className="ps-page__heading">Your Order has Been Placed Successfully!</h1>
//                     </div>
//                     <div className="ps-page__content">
//                         <div className="row">
//                             <div className="col-md-6">
//                                 <Alert
//                                     title="Thank you. Your order has been received."
//                                     description="Your order is now being processed. Your Order Id is #OD202412440"
//                                     type="success"
//                                     showIcon
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Container>
//     );
// };

// export default CheckoutScreen;

import React from "react";
import { auth } from "@clerk/nextjs/server";
import Container from "@/components/layouts/Container";
import BreadCrumb from "@/components/elements/BreadCrumb";
import { sql } from "@/lib/db";
import "./success.scss";

// Mirrors STEPS in the checkout so the confirmation reflects the journey the
// buyer just completed. Purely indicative — never links anywhere.
const STEPS = ["Cart", "Shipping Address", "Payment"];

const breadcrumb = [
    { text: "Home", url: "/" },
    { text: "Order Confirmation" },
];

// Scoped to the signed-in customer, so an order number alone is not enough to
// read somebody else's order.
async function getOrder(orderNumber) {
    if (!orderNumber) return null;

    const { userId: clerkId } = await auth();
    if (!clerkId) return null;

    try {
        const [order] = await sql`
            SELECT o.order_number, o.created_at, o.total, c.email
            FROM orders o
            JOIN customers c ON c.customer_id = o.customer_id
            WHERE o.order_number = ${orderNumber}
              AND c.clerk_id = ${clerkId}
        `;
        return order ?? null;
    } catch (err) {
        // A confirmation page must never 500 — the order is already placed.
        console.error("Order lookup failed:", err);
        return null;
    }
}

export default async function OrderSuccessPage({ searchParams }) {
    const { order: orderNumber } = await searchParams;
    const order = await getOrder(orderNumber);

    const placedOn = order?.created_at
        ? new Date(order.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
          })
        : null;

    return (
        <Container>
            <div className="ps-page ps-page--inner order-success">
                <div className="container">
                    <div className="ps-page__header">
                        <BreadCrumb breacrumb={breadcrumb} />
                    </div>

                    <div className="ps-page__content">
                        {/* Indicative only: every step is complete by definition
                            on this page, so these are <div>s, not links. */}
                        <ol className="order-success__steps" aria-label="Checkout progress">
                            {STEPS.map((label, index) => (
                                <li className="order-success__step" key={label}>
                                    <span className="order-success__dot">
                                        <i className="fa fa-check" aria-hidden="true" />
                                    </span>
                                    <span className="order-success__step-label">{label}</span>
                                    {index < STEPS.length - 1 && (
                                        <span
                                            className="order-success__connector"
                                            aria-hidden="true"
                                        />
                                    )}
                                </li>
                            ))}
                        </ol>

                        <div className="order-success__panel">
                            <span className="order-success__badge" aria-hidden="true">
                                <i className="fa fa-check" />
                            </span>

                            <p className="order-success__eyebrow">Thank you!</p>
                            <h1 className="order-success__title">
                                Your order is confirmed
                            </h1>

                            {order?.email && (
                                <p className="order-success__subtitle">
                                    We&apos;ll send an email confirmation to{" "}
                                    <strong>{order.email}</strong> shortly.
                                </p>
                            )}
                        </div>

                        {orderNumber && (
                            <p className="order-success__meta">
                                Order <strong>#{orderNumber}</strong>
                                {placedOn && <> was placed on <strong>{placedOn}</strong></>}
                                {" "}and is currently in progress.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
}
