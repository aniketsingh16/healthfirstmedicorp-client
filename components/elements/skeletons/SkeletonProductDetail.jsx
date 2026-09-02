import React from 'react';
import { Skeleton } from 'antd';

const SkeletonProductDetail = () => {
    return (
        <div className="ps-skeleton-product-detail">
            <div className="row">
                <div className="col-md-5 col-12">
                    <Skeleton.Input active={true} size={460} />
                    <div className="row pt-30">
                        <div className="col-3">
                            <Skeleton.Input size={100} style={{ width: 100 }} />
                        </div>
                        <div className="col-3">
                            <Skeleton.Input size={100} style={{ width: 100 }} />
                        </div>
                        <div className="col-3">
                            <Skeleton.Input size={100} style={{ width: 100 }} />
                        </div>
                        <div className="col-3">
                            <Skeleton.Input size={100} style={{ width: 100 }} />
                        </div>
                    </div>
                </div>
                <div className="col-md-7 col-12">
                    <div className="mb-10">
                        <Skeleton.Input
                            active={true}
                            size={30}
                            style={{ width: 500 }}
                        />
                    </div>
                    <Skeleton paragraph={{ rows: 12, title: false }} />
                </div>
            </div>
        </div>
    );
};

export default SkeletonProductDetail;
