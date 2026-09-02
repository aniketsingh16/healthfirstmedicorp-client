import React from "react";
import { Skeleton } from "antd";
import { generateTempArray } from "@/utilities/common-helpers";

const SkeletonTable = ({ rows = 1 }) => {
    const items = generateTempArray(8 * rows).map((item) => (
        <div className="ps-skeleton__item" key={item}>
            <Skeleton.Input style={{ width: 360 }} active={true} size={40} />
        </div>
    ));
    return <div className="ps-skeleton--table">{items}</div>;
};

export default SkeletonTable;
