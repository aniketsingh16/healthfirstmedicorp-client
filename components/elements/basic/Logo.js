import React from "react";
import Link from "next/link";
import Image from "next/image";

const Logo = ({ url = "/", type = "default" }) => {
    return (
        <Link href={url} className={`ps-logo${type === "white" ? " ps-logo--white" : ""}`}>
            {/* <Image src="/static/img/hfmc.svg" alt="logo" width={474} height={108} /> */}
            <Image src="/static/img/hfmc.svg" alt="logo" width={700} height={250} />

        </Link>
    );
};

export default Logo;