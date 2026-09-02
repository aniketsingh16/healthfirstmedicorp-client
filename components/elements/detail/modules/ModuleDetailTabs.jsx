import React from "react";
import ModuleDetailDescription from "@/components/elements/detail/modules/ModuleDetailDescription";
import ModuleAdditionInformation from "@/components/elements/detail/modules/ModuleDetailAdditionInformation";
import ModuleDetailSpecification from "@/components/elements/detail/modules/ModuleDetailSpecification";
import ModuleDetailReviews from "@/components/elements/detail/modules/ModuleDetailReviews";
import { Tabs } from "antd";

const { TabPane } = Tabs;
const ModuleDetailTabs = ({ product }) => {
    return (
        <Tabs defaultActiveKey="1" className="ps-product__tabs">
            <TabPane tab="Description" key="1">
                <ModuleDetailDescription product={product} />
            </TabPane>
            <TabPane tab="Specifications" key="2">
                <ModuleDetailSpecification product = {product}/>
            </TabPane>            
            <TabPane tab="Reviews" key="4">
                <ModuleDetailReviews />
            </TabPane>
        </Tabs>
    );
};

export default ModuleDetailTabs;
