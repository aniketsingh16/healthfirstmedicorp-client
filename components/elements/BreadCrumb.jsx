import React from "react";
import Link from "next/link";

const BreadCrumb = ({ breacrumb }) => {
    return (
        <ul className="breadcrumb">
            {breacrumb.map((item, index) => {
                const key = `${item.text}-${index}`;
                if (!item.url) {
                    return <li key={key}>{item.text}</li>;
                } else {
                    return (
                        <li key={key}>
                            <Link href={item.url}>
                                {item.text}
                            </Link>
                        </li>
                    );
                }
            })}
        </ul>
    );
};

export default BreadCrumb;