"use client";
import React, { useContext, useEffect, useMemo, useState, useRef } from "react";
import Container from "@/components/layouts/Container";
import BreadCrumb from "@/components/elements/BreadCrumb";
import ProductsContext from "@/utilities/ProductContext";
import useEcomerce from "@/hooks/useEcomerce";
import { urlFor } from "@/utilities/client";
import { useEcommerceStore } from "@/store/Zustand/useEcommerceStore";
import { calculateCartQuantity } from "@/utilities/ecomerce-helpers";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import "./checkout.scss";

const breadcrumb = [
    { text: "Home", url: "/" },
    { text: "Shop", url: "/shop" },
    { text: "Checkout" },
];

// Four steps: Cart -> Shipping Address -> Billing (delivery + payment) -> Review
const STEPS = [
    { id: 1, label: "Cart" },
    { id: 2, label: "Shipping Address" },
    { id: 3, label: "Payment" },
    // { id: 4, label: "Review" },
];

const TOTAL_STEPS = STEPS.length;

// How long the between-step loader shows, in ms.
const STEP_TRANSITION_MS = 1000;

const DELIVERY_OPTIONS = [
    {
        id: "standard",
        icon: "fa-truck",
        title: "Standard Delivery",
        subtitle: "3-5 business days",
        price: 0,
        priceLabel: "Free",
    },
    {
        id: "express",
        icon: "fa-shipping-fast",
        title: "Express Delivery",
        subtitle: "1-2 business days",
        price: 99,
        priceLabel: "\u20b999",
    },
    {
        id: "sameday",
        icon: "fa-bolt",
        title: "Same Day Delivery",
        subtitle: "Today by 8 PM",
        price: 199,
        priceLabel: "\u20b9199",
    },
];

const PAYMENT_OPTIONS = [
    {
        id: "card",
        icon: "fa-credit-card",
        title: "Credit / Debit Card",
        subtitle: "Pay securely with your card",
    },
    {
        id: "upi",
        icon: "fa-mobile-alt",
        title: "UPI Payment",
        subtitle: "Pay using any UPI app",
    },
    {
        id: "cod",
        icon: "fa-money-bill-wave",
        title: "Cash on Delivery",
        subtitle: "Pay when you receive",
    },
];

const CTA_LABEL = {
    1: "Proceed to Address",
    2: "Continue to Payment",
    3: "Pay Now"
};

export default function CheckoutScreen() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    companyName: "",
    addressLine1: "",
    addressLine2: "",
    pincode: "",
    city: "",
    state: "",
    saveAddress: false,
});
    const [deliveryMethod, setDeliveryMethod] = useState("standard");
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const cartItems = useEcommerceStore((state) => state.cartItems);
    const { products } = useContext(ProductsContext);
    const { getProducts, cartProducts, loading, removeItems, increaseQty, decreaseQty, removeItem } = useEcomerce();

    useEffect(() => {
        if (products?.length > 0) {
            getProducts(cartItems ?? [], products, "cart");
        }
    }, [cartItems, products]);

    const subtotal = useMemo(() => {
        if (!cartProducts?.length) return 0;
        return cartProducts.reduce(
            (sum, item) => sum + item.sellingPrice * (item.quantity || 1),
            0
        );
    }, [cartProducts]);

    const shippingCost = useMemo(() => {
        const option = DELIVERY_OPTIONS.find((d) => d.id === deliveryMethod);
        return option ? option.price : 0;
    }, [deliveryMethod]);

    const tax = useMemo(() => Math.round(subtotal * 0.05), [subtotal]);
    const total = subtotal + shippingCost + tax;
    const itemCount = calculateCartQuantity(cartItems) || 0;

    function handleAddressChange(field, value) {
        setAddress((prev) => ({ ...prev, [field]: value }));
    }

    // Shows the loader for STEP_TRANSITION_MS, then applies the step change.
    function changeStepWithLoader(nextStep) {
        setIsTransitioning(true);
        window.setTimeout(() => {
            setCurrentStep(nextStep);
            setIsTransitioning(false);
        }, STEP_TRANSITION_MS);
    }

    async function handleNext() {
    if (currentStep === TOTAL_STEPS) {
        setIsPlacingOrder(true);
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    address,
                    deliveryMethod,
                    paymentMethod,
                    // Only ids and quantities — the server re-prices the cart
                    // from Sanity, so sending prices or totals here is pointless.
                    cartItems: (cartProducts ?? []).map((item) => ({
                        productID: item.productID,
                        quantity: item.quantity || 1,
                    })),
                }),
            });

            const data = await res.json();

            if (res.status === 401) {
                toast.error("Please sign in to place your order.");
                return;
            }

            if (!res.ok) {
                // The API sends a buyer-readable reason (out of stock,
                // invalid address, item removed from the catalogue).
                toast.error(data.error || "We couldn't place your order.");
                return;
            }

            removeItems("cart");
            router.push(`/shop/success?order=${encodeURIComponent(data.orderNumber)}`);
        } catch (err) {
            console.error("Order submission failed:", err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsPlacingOrder(false);
        }
        return;
    }
    changeStepWithLoader(Math.min(currentStep + 1, TOTAL_STEPS));
}

    function handleBack() {
        changeStepWithLoader(Math.max(currentStep - 1, 1));
    }

    function goToStep(stepId) {
        if (stepId < currentStep) changeStepWithLoader(stepId);
    }

        const isAddressValid =
            address.firstName &&
            address.lastName &&
            address.email &&
            address.mobile &&
            address.addressLine1 &&
            /^\d{6}$/.test(address.pincode) &&
            address.city &&
            address.state;

    const isCtaDisabled =
        (currentStep === 1 && !(cartProducts?.length > 0)) ||
        (currentStep === 2 && !isAddressValid) ||
        (currentStep === TOTAL_STEPS && !agreedToTerms);

    return (
        <Container title="Checkout">
            <div className="ps-page ps-page--shopping">
                <div className="container">
                    <div className="ps-page__header">
                        <BreadCrumb breacrumb={breadcrumb} />
                        <h1 className="ps-page__heading">Checkout</h1>
                    </div>

                    <div className="ps-page__content">
                        <div className="ps-checkout-wizard">
                            <StepProgress
                                steps={STEPS}
                                currentStep={currentStep}
                                onStepClick={goToStep}
                            />

                            <div className="ps-checkout-wizard__body">
                                <div className="ps-checkout-wizard__main">
                                    {isTransitioning ? (
                                        <StepLoader />
                                    ) : (
                                        <>
                                            {currentStep === 1 && (
                                                <StepCart
                                                    cartProducts={cartProducts}
                                                    loading={loading}
                                                    onIncreaseQty={(item) =>
                                                        increaseQty(item, cartItems)
                                                    }
                                                    onDecreaseQty={(item) =>
                                                        decreaseQty(item, cartItems)
                                                    }
                                                    onRemoveItem={(item) =>
                                                        removeItem(item, cartItems, "cart")
                                                    }
                                                />
                                            )}
                                            {currentStep === 2 && (
                                                <StepAddress
                                                    address={address}
                                                    onChange={handleAddressChange}
                                                />
                                            )}
                                            {currentStep === 3 && (
                                                <StepBilling
                                                    deliveryMethod={deliveryMethod}
                                                    onSelectDelivery={setDeliveryMethod}
                                                    paymentMethod={paymentMethod}
                                                    onSelectPayment={setPaymentMethod}
                                                />
                                            )}
                                            {/* {currentStep === 4 && (
                                                <StepReview
                                                    address={address}
                                                    deliveryMethod={deliveryMethod}
                                                    paymentMethod={paymentMethod}
                                                />
                                            )} */}
                                        </>
                                    )}

                                    <div className="ps-checkout-wizard__nav">
                                        {currentStep > 1 && !isTransitioning && (
                                            <button
                                                type="button"
                                                className="ps-checkout-wizard__back-btn"
                                                onClick={handleBack}>
                                                <i className="fa fa-arrow-left"></i>
                                                Back
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <OrderSummarySidebar
                                    cartProducts={cartProducts}
                                    loading={loading}
                                    itemCount={itemCount}
                                    subtotal={subtotal}
                                    shippingCost={shippingCost}
                                    shippingLabel={
                                        DELIVERY_OPTIONS.find(
                                            (d) => d.id === deliveryMethod
                                        )?.priceLabel
                                    }
                                    tax={tax}
                                    total={total}
                                    ctaLabel={
                                        isPlacingOrder
                                            ? "Placing order…"
                                            : CTA_LABEL[currentStep]
                                    }
                                    ctaDisabled={
                                        isCtaDisabled || isTransitioning || isPlacingOrder
                                    }
                                    onCtaClick={handleNext}
                                    showTerms={currentStep === TOTAL_STEPS}
                                    agreedToTerms={agreedToTerms}
                                    onAgreeChange={setAgreedToTerms}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

// ---------------------------------------------------------------------------
// Between-step loader
// ---------------------------------------------------------------------------
function StepLoader() {
    return (
        <div className="ps-checkout-card ps-checkout-card--loading">
            <span className="ps-step-loader__spinner" />
        </div>
    );
}

// ---------------------------------------------------------------------------
// Step progress bar
// ---------------------------------------------------------------------------
function StepProgress({ steps, currentStep, onStepClick }) {
    return (
        <div className="ps-checkout-wizard__progress">
            {steps.map((step, index) => {
                const isCompleted = step.id < currentStep;
                const isActive = step.id === currentStep;
                return (
                    <React.Fragment key={step.id}>
                        <button
                            type="button"
                            className={`ps-checkout-wizard__step${
                                isActive ? " ps-checkout-wizard__step--active" : ""
                            }${
                                isCompleted
                                    ? " ps-checkout-wizard__step--completed"
                                    : ""
                            }`}
                            onClick={() => onStepClick(step.id)}
                            disabled={!isCompleted}>
                            <span className="ps-checkout-wizard__step-circle">
                                {isCompleted ? (
                                    <i className="fa fa-check"></i>
                                ) : (
                                    step.id
                                )}
                            </span>
                            <span className="ps-checkout-wizard__step-label">
                                {step.label}
                            </span>
                        </button>
                        {index < steps.length - 1 && (
                            <span
                                className={`ps-checkout-wizard__connector${
                                    isCompleted
                                        ? " ps-checkout-wizard__connector--completed"
                                        : ""
                                }`}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Step 1: Cart
// ---------------------------------------------------------------------------
function StepCart({ cartProducts, loading, onIncreaseQty, onDecreaseQty, onRemoveItem }) {
    if (loading) {
        return (
            <div className="ps-checkout-card ps-checkout-card--loading">
                <span className="ps-step-loader__spinner" />
            </div>
        );
    }

    if (!cartProducts?.length) {
        return (
            <div className="ps-checkout-card">
                <h2 className="ps-checkout-card__heading">Your Cart</h2>
                <p className="ps-cart-table__empty">
                    Your cart is empty.{" "}
                    <a href="/shop">Continue shopping</a>
                </p>
            </div>
        );
    }

    return (
        <div className="ps-checkout-card">
            <h2 className="ps-checkout-card__heading">Your Cart</h2>

            <table className="ps-cart-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cartProducts.map((item) => {
                        const quantity = item.quantity || 1;
                        return (
                            <tr key={item.productID}>
                                <td>
                                    <div className="ps-cart-table__product">
                                        <button
                                            type="button"
                                            className="ps-icon ps-cart-item__remove"
                                            aria-label={`Remove ${item.name}`}
                                            onClick={() => onRemoveItem({ productID: item.productID })}>
                                            <i className="icon-cross mr-2"></i>
                                        </button>

                                        <div className="ps-cart-table__thumb">
                                            {item.imageurl ? (
                                                <img
                                                    src={urlFor(item.imageurl)}
                                                    alt={item.name}
                                                />
                                            ) : (
                                                <i className="fa fa-image"></i>
                                            )}
                                        </div>
                                        <div className="ps-cart-table__product-body">
                                            <span className="ps-cart-table__product-name">
                                                {item.name}
                                            </span>
                                            <span className="ps-cart-table__product-price">
                                                &#8377;{item.sellingPrice}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <strong>&#8377;{item.sellingPrice}</strong>
                                </td>
                                <td>
                                    <div className="ps-cart-table__stepper">
                                        <button
                                            type="button"
                                            aria-label="Decrease quantity"
                                            disabled={quantity <= 1}
                                            onClick={() =>
                                                onDecreaseQty({ productID: item.productID })

                                            }>
                                            &#8722;
                                        </button>
                                        <span>{quantity}</span>
                                        <button
                                            type="button"
                                            aria-label="Increase quantity"
                                            onClick={() =>
                                                onIncreaseQty({ productID: item.productID })
                                            }>
                                            &#43;
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <strong>
                                        &#8377;{(item.sellingPrice * quantity).toFixed(2)}
                                    </strong>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="ps-cart-table__actions">
                <a className="ps-btn ps-btn--orange" href="/shop">
                    Back to shop
                </a>
                <div className="ps-cart-table__coupon">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your coupon"
                    />
                    <button type="button" className="ps-btn ps-btn--primary">
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Step 2: Shipping Address
// ---------------------------------------------------------------------------

function StepAddress({ address, onChange }) {
    const [pincodeStatus, setPincodeStatus] = useState("idle"); // idle | loading | success | error
    const [pincodeWarning, setPincodeWarning] = useState(false);
    const lastFetchedPincode = useRef(null);

    function handlePincodeChange(rawValue) {
            const hasInvalidChar = /[^0-9]/.test(rawValue);
            const digitsOnly = rawValue.replace(/\D/g, "").slice(0, 6);

            setPincodeWarning(hasInvalidChar);
            onChange("pincode", digitsOnly);
        }

    const fields = [
        { key: "firstName", label: "First Name", icon: "fa-user", required: true, half: true },
        { key: "lastName", label: "Last Name", icon: "fa-user", required: true, half: true },
        { key: "email", label: "Email", icon: "fa-envelope", type: "email", required: true, half: true },
        { key: "mobile", label: "Mobile Number", icon: "fa-phone", type: "tel", required: true, half: true },
        { key: "companyName", label: "Company Name (optional)", icon: "fa-building", half: false },
        { key: "addressLine1", label: "Address Line 1", icon: "fa-map-marker-alt", placeholder: "House number / Apartment name", required: true, half: false },
        { key: "addressLine2", label: "Address Line 2 (optional)", icon: "fa-map-marker-alt", placeholder: "Street / Landmark / Area", half: false },
        { key: "pincode", label: "Pincode", icon: "fa-hashtag", placeholder: "e.g. 400001", required: true, half: true },
        { key: "city", label: "City", icon: "fa-city", required: false, half: true, disabled: true },
        { key: "state", label: "State", icon: "fa-map", required: false, half: true, disabled: true },
    ];

    // Auto-fetch city/state from pincode using the India Post API
    useEffect(() => {
        const pincode = (address.pincode || "").trim();

        // Only fire for a valid 6-digit pincode, and don't refetch the same one twice
        if (!/^\d{6}$/.test(pincode)) {
            setPincodeStatus("idle");
            lastFetchedPincode.current = null;   
            if (address.city || address.state) {
                onChange("city", "");             
                onChange("state", "");           
            }                                   
            return;
        }
        if (pincode === lastFetchedPincode.current) return;

        const controller = new AbortController();

        

        const timer = setTimeout(async () => {
            setPincodeStatus("loading");
            try {
                const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`, {
                    signal: controller.signal,
                });
                const data = await res.json();
                const result = data?.[0];

                if (result?.Status === "Success" && result.PostOffice?.length) {
                    const office = result.PostOffice[0];
                    onChange("city", office.District || "");
                    onChange("state", office.State || "");
                    setPincodeStatus("success");
                } else {
                    onChange("city", "");
                    onChange("state", "");
                    setPincodeStatus("error");
                }
                lastFetchedPincode.current = pincode;
            } catch (err) {
                if (err.name !== "AbortError") {
                    setPincodeStatus("error");
                }
            }
        }, 400); // debounce so it doesn't fire on every keystroke

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [address.pincode]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="ps-checkout-card">
            <h2 className="ps-checkout-card__heading">Shipping Address</h2>
            <div className="ps-checkout-form">
                {fields.map((field) => (
                    <div
                        key={field.key}
                        className={`ps-checkout-form__group${
                            field.half ? " ps-checkout-form__group--half" : ""
                        }`}>
                        <label>
                            {field.label}
                            {field.required && <span className="required">*</span>}
                        </label>
                        <div
                            className={`ps-checkout-form__input${
                                field.disabled ? " ps-checkout-form__input--disabled" : ""
                            }`}>
                            <i className={`fa ${field.icon}`}></i>
                            <input
                                type={field.type || "text"}
                                placeholder={field.placeholder || ""}
                                value={address[field.key] || ""}
                                disabled={field.disabled}
                             onChange={(e) =>
                                        field.key === "pincode"
                                            ? handlePincodeChange(e.target.value)     
                                            : onChange(field.key, e.target.value)
                                    }
                            />
                            {field.key === "pincode" && pincodeStatus === "loading" && (
                                <i className="fa fa-spinner fa-spin ps-checkout-form__input-status"></i>
                            )}
                        </div>
                        {field.key === "pincode" && pincodeStatus === "error" && (
                            <span className="ps-checkout-form__error">
                                Couldn't find city/state for this pincode
                            </span>
                        )}

                        {/* For non-numeric values warning */}
                        {field.key === "pincode" && pincodeWarning && (
                            <span className="ps-checkout-form__error">
                                Pincode can only contain numbers
                            </span>
                        )}
                    </div>
                ))}

                <label className="ps-checkout-form__checkbox">
                    <input
                        type="checkbox"
                        checked={address.saveAddress}
                        onChange={(e) =>
                            onChange("saveAddress", e.target.checked)
                        }
                    />
                    Save this address for future orders
                </label>
            </div>
        </div>
    );
}

// function StepAddress({ address, onChange }) {
//     const fields = [
//         { key: "firstName", label: "First Name", icon: "fa-user", required: true, half: true },
//         { key: "lastName", label: "Last Name", icon: "fa-user", required: true, half: true },
//         { key: "email", label: "Email", icon: "fa-envelope", type: "email", required: true, half: true },
//         { key: "mobile", label: "Mobile Number", icon: "fa-phone", type: "tel", required: true, half: true },
//         { key: "companyName", label: "Company Name (optional)", icon: "fa-building", half: false },
//         { key: "streetAddress", label: "Address", icon: "fa-map-marker-alt", placeholder: "House number / Apartment name", required: true, half: false },
//         { key: "pincode", label: "Pincode", icon: "fa-hashtag", placeholder: "e.g. 400001", required: true, half: true },
//         { key: "city", label: "City", icon: "fa-city", required: true, half: true },
//         { key: "state", label: "State", icon: "fa-map", required: true, half: true },
//     ];

//     return (
//         <div className="ps-checkout-card">
//             <h2 className="ps-checkout-card__heading">Shipping Address</h2>
//             <div className="ps-checkout-form">
//                 {fields.map((field) => (
//                     <div
//                         key={field.key}
//                         className={`ps-checkout-form__group${
//                             field.half ? " ps-checkout-form__group--half" : ""
//                         }`}>
//                         <label>
//                             {field.label}
//                             {field.required && <span className="required">*</span>}
//                         </label>
//                         <div className="ps-checkout-form__input">
//                             <i className={`fa ${field.icon}`}></i>
//                             <input
//                                 type={field.type || "text"}
//                                 placeholder={field.placeholder || ""}
//                                 value={address[field.key]}
//                                 onChange={(e) =>
//                                     onChange(field.key, e.target.value)
//                                 }
//                             />
//                         </div>
//                     </div>
//                 ))}

//                 <label className="ps-checkout-form__checkbox">
//                     <input
//                         type="checkbox"
//                         checked={address.saveAddress}
//                         onChange={(e) =>
//                             onChange("saveAddress", e.target.checked)
//                         }
//                     />
//                     Save this address for future orders
//                 </label>
//             </div>
//         </div>
//     );
// }

// ---------------------------------------------------------------------------
// Step 3: Billing (delivery method + payment method together)
// ---------------------------------------------------------------------------
function StepBilling({
    deliveryMethod,
    onSelectDelivery,
    paymentMethod,
    onSelectPayment,
}) {
    return (
        <>
            <div className="ps-checkout-card">
                <h2 className="ps-checkout-card__heading">Choose Delivery Method</h2>
                <div className="ps-option-grid">
                    {DELIVERY_OPTIONS.map((option) => (
                        <button
                            type="button"
                            key={option.id}
                            className={`ps-option-card${
                                deliveryMethod === option.id
                                    ? " ps-option-card--selected"
                                    : ""
                            }`}
                            onClick={() => onSelectDelivery(option.id)}>
                            <i className={`fa ${option.icon} ps-option-card__icon`}></i>
                            <span className="ps-option-card__title">
                                {option.title}
                            </span>
                            <span className="ps-option-card__subtitle">
                                {option.subtitle}
                            </span>
                            <span className="ps-option-card__price">
                                {option.priceLabel}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="ps-checkout-card ps-checkout-card--stacked">
                <h2 className="ps-checkout-card__heading">Payment Method</h2>
                <div className="ps-payment-list">
                    {PAYMENT_OPTIONS.map((option) => (
                        <button
                            type="button"
                            key={option.id}
                            className={`ps-payment-row${
                                paymentMethod === option.id
                                    ? " ps-payment-row--selected"
                                    : ""
                            }`}
                            onClick={() => onSelectPayment(option.id)}>
                            <i className={`fa ${option.icon} ps-payment-row__icon`}></i>
                            <span className="ps-payment-row__body">
                                <span className="ps-payment-row__title">
                                    {option.title}
                                </span>
                                <span className="ps-payment-row__subtitle">
                                    {option.subtitle}
                                </span>
                            </span>
                            <span className="ps-payment-row__radio">
                                <span className="ps-payment-row__radio-dot" />
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

// ---------------------------------------------------------------------------
// Step 4: Review
// ---------------------------------------------------------------------------
function StepReview({ address, deliveryMethod, paymentMethod }) {
    const delivery = DELIVERY_OPTIONS.find((d) => d.id === deliveryMethod);
    const payment = PAYMENT_OPTIONS.find((p) => p.id === paymentMethod);

    return (
        <div className="ps-checkout-card">
            <h2 className="ps-checkout-card__heading">Review Your Order</h2>

            <div className="ps-review-block">
                <h3>Shipping Address</h3>
                <p>
                    {address.firstName} {address.lastName}
                    <br />
                    {address.streetAddress}
                    <br />
                    {address.city}, {address.state} {address.pincode}
                    <br />
                    {address.email} &middot; {address.mobile}
                </p>
            </div>

            <div className="ps-review-block">
                <h3>Delivery Method</h3>
                <p>
                    {delivery?.title} <span>({delivery?.subtitle})</span>
                </p>
            </div>

            <div className="ps-review-block">
                <h3>Payment Method</h3>
                <p>{payment?.title}</p>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Order summary sidebar (persists across all steps)
// ---------------------------------------------------------------------------
function OrderSummarySidebar({
    cartProducts,
    loading,
    itemCount,
    subtotal,
    shippingCost,
    shippingLabel,
    tax,
    total,
    ctaLabel,
    ctaDisabled,
    onCtaClick,
    showTerms,
    agreedToTerms,
    onAgreeChange,
}) {
    return (
        <aside className="ps-order-summary">
            <h2 className="ps-order-summary__heading">Order Summary</h2>

            {/* <div className="ps-order-summary__items">
                {loading ? (
                    <p className="ps-order-summary__empty">Loading cart&hellip;</p>
                ) : cartProducts?.length > 0 ? (
                    cartProducts.map((item) => (
                        <div className="ps-order-summary__item" key={item.id}>
                            <div className="ps-order-summary__item-thumb">
                                {item.imageurl?.asset?.url ? (
                                    <img
                                        src={item.imageurl.asset.url}
                                        alt={item.item}
                                    />
                                ) : (
                                    <i className="fa fa-image"></i>
                                )}
                                <span className="ps-order-summary__item-qty">
                                    {item.quantity || 1}
                                </span>
                            </div>
                            <div className="ps-order-summary__item-body">
                                <span className="ps-order-summary__item-name">
                                    {item.item}
                                </span>
                                <span className="ps-order-summary__item-price">
                                    &#8377;{item.price}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="ps-order-summary__empty">Your cart is empty.</p>
                )}
            </div> */}

            <div className="ps-order-summary__totals">
                <div className="ps-order-summary__row">
                    <span>Items</span>
                    <span>{itemCount}</span>
                </div>
                <div className="ps-order-summary__row">
                    <span>Subtotal</span>
                    <span>&#8377;{subtotal.toFixed(2)}</span>
                </div>
                <div className="ps-order-summary__row">
                    <span>Shipping</span>
                    <span>{shippingLabel || "\u20b90.00"}</span>
                </div>
                <div className="ps-order-summary__row">
                    <span>Tax</span>
                    <span>&#8377;{tax.toFixed(2)}</span>
                </div>
                <div className="ps-order-summary__row ps-order-summary__row--total">
                    <span>Total</span>
                    <span>&#8377;{total.toFixed(2)}</span>
                </div>
            </div>

            {showTerms && (
                <label className="ps-order-summary__terms">
                    <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => onAgreeChange(e.target.checked)}
                    />
                    I have read and agree to the website terms and conditions
                    <span className="required">*</span>
                </label>
            )}

            <button
                type="button"
                className="ps-order-summary__cta"
                disabled={ctaDisabled}
                onClick={onCtaClick}>
                {ctaLabel}
            </button>

            <p className="ps-order-summary__secure">
                <i className="fa fa-lock"></i> Secure Checkout
            </p>
        </aside>
    );
}
