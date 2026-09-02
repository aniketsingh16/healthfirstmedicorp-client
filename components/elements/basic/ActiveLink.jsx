"use client";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import Link from "next/link";
import React, { Children } from "react";

const ActiveLink = ({ children, activeClassName = "active", ...props }) => {
    const pathname = usePathname();

    const child = Children.only(children);
    const childClassName = child.props.className || "";

    const className =
        pathname === props.href || pathname === props.as
            ? `${childClassName} ${activeClassName}`.trim()
            : childClassName;
    return (
        <Link {...props} legacyBehavior>
            {React.cloneElement(child, {
                className: className || null,
            })}
        </Link>
    );
};

ActiveLink.propTypes = {
    activeClassName: PropTypes.string.isRequired,
};

export default ActiveLink;