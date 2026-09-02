import React from "react";
import { Skeleton } from "antd";

const SkeletonProduct = ({ type = "grid" }) => {
    if (type === "list") {
        return (
            <div className="ps-skeleton--product">
                <div className="row">
                    <div className="col-md-4">
                        <Skeleton.Input
                            active={true}
                            size={320}
                            style={{ height: 200 }}
                        />
                    </div>
                    <div className="col-md-8">
                        <Skeleton
                            active={true}
                            paragraph={{ rows: 6, title: true }}
                        />
                    </div>
                </div>
            </div>
        );
    } else if (type === "list-small") {
        return (
            <div className="ps-skeleton--product list-small">
                <div className="row">
                    <div className="col-md-3">
                        <Skeleton.Input
                            active={true}
                            size={60}
                            style={{ height: 60 }}
                        />
                    </div>
                    <div className="col-md-9">
                        <Skeleton
                            active={true}
                            paragraph={{ rows: 1, title: true }}
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="ps-skeleton--product">
                <Skeleton.Input
                    active={true}
                    size={350}
                    style={{ height: 200 }}
                />
                <Skeleton paragraph={{ rows: 4 }} />
            </div>
        );
    }
};

export default SkeletonProduct;
