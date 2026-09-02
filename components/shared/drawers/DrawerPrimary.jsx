// import React from "react";
// import { Drawer } from "antd";
// import { connect, useDispatch, useSelector } from "react-redux";
// import { toggleDrawer } from "@/store/app/action";
// import EcomerceMiniCart from "@/components/ecomerce/modules/EcomerceMiniCart";
// // import { toggleDrawer } from "@/redux/appSlice";

// const DrawerPrimary = ({
//     products,
//     children,
//     placement = "right",
//     title = "Drawer",
//     isDrawerShow,
// }) => {

//     // const isDrawerShow = useSelector(state => state.app.isDrawerShow);
//     const dispatch = useDispatch();
//     function handleCloseDrawer(e) {
//         e.preventDefault();
//         dispatch(toggleDrawer(false));
//     }

//     return (
//         <Drawer
//             className="ps-panel--mobile"
//             // placement="right"
//             closable={false}
//             placement={placement}
//             width={400}
//             onClose={(e) => handleCloseDrawer(e)}
//             visible={isDrawerShow}>
//             <div className="ps-drawer">
//                 <div className="ps-drawer__header">
//                     <a
//                         href="#"
//                         className="ps-drawer__close"
//                         onClick={(e) => handleCloseDrawer(e)}>
//                         <i className="icon-cross"></i>
//                     </a>
//                 </div>
//                 <div className="ps-drawer__wrapper">
//                     <EcomerceMiniCart products = {products} />
//                 </div>
//             </div>
//         </Drawer>
//     );
// };
// export default connect((state) => state.app)(DrawerPrimary);
// // export default DrawerPrimary

import React from "react";
import { Drawer } from "antd";
import { useAppStore } from "@/store/Zustand/useAppStore";
import EcomerceMiniCart from "@/components/ecomerce/modules/EcomerceMiniCart";

const DrawerPrimary = ({
    products,
    children,
    placement = "right",
    title = "Drawer",
}) => {
    const isDrawerShow = useAppStore((state) => state.isDrawerShow);
    const toggleDrawer = useAppStore((state) => state.toggleDrawer);

    function handleCloseDrawer(e) {
        e.preventDefault();
        toggleDrawer(false);
    }

    return (
        <Drawer
            className="ps-panel--mobile"
            closable={false}
            placement={placement}
            width={400}
            onClose={(e) => handleCloseDrawer(e)}
            open={isDrawerShow}>
            <div className="ps-drawer">
                <div className="ps-drawer__header">
                    <a
                        href="#"
                        className="ps-drawer__close"
                        onClick={(e) => handleCloseDrawer(e)}>
                        <i className="icon-cross"></i>
                    </a>
                </div>
                <div className="ps-drawer__wrapper">
                    <EcomerceMiniCart products={products} />
                </div>
            </div>
        </Drawer>
    );
};

export default DrawerPrimary;