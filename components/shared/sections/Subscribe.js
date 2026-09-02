"use client";

import React, { useState } from "react";
import { toast } from 'sonner'

const Subscribe = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Enquiry' }), 2000));

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        // Clear as soon as they start correcting it — leaving the message up
        // while they type reads as though it is still wrong.
        if (error) setError(null);
      };

      const handleSubmit = (event) => {
        event.preventDefault();

        // Replaces the browser's native "Please fill out this field" bubble.
        // `noValidate` on the form suppresses that, and these messages render
        // inline instead, matching the checkout form's error treatment.
        const value = email.trim();
        if (!value) {
            setError('Please enter your email address');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
            setError('Please enter a valid email address');
            return;
        }
        setError(null);
        // toast.success('Subscribed successfully..');
        toast.promise(promise, {
            loading: 'Subscribing..',
            success: (data) => {
                return 'Subscribed successfully..'
            },
            error: 'Error',
            position: 'bottom-center'
            });
        setEmail('');
      };

      
    return (
        <section
            className="ps-section--newsletter bg--cover"
            style={{ backgroundImage: "url(/static/img/newsletter-bg.jpg)" }}>
            <h3 className="ps-section__title">
                Join our newsletter and get <br />
               latest updates on medical products
            </h3>
            <div className="ps-section__content">
                <form onSubmit={handleSubmit} noValidate>
                    <div className="ps-form--subscribe">
                        <div className="ps-form__control">
                            <input
                                className="form-control ps-input"
                                type="email"
                                required
                                placeholder="Enter your email address"
                                value={email}
                                onChange={handleEmailChange}
                                aria-invalid={error ? "true" : undefined}
                                aria-describedby={error ? "subscribe-error" : undefined}
                            />
                            <button className="ps-btn ps-btn--warning" type="submit">
                                Subscribe
                            </button>
                            {/* <Toaster position="bottom-center" richColors  /> */}
                        </div>
                    </div>
                    {/* Sits outside .ps-form__control: that becomes an inline-flex
                        row at >=768px, so an error inside it would land beside
                        the button rather than under the field. */}
                    {error && (
                        <span className="ps-form__error" id="subscribe-error" role="alert">
                            {error}
                        </span>
                    )}
                </form>
            </div>
        </section>
    );
};

export default Subscribe;
