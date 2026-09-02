import React from "react";
import ProductSpecificationTable from "@/components/shared/tables/ProductSpecificationTable";

const ModuleDetailSpecification = ({ product }) => {
    return (
        <div
            className="tab-pane fade active show"
            id="specification-content"
            role="tabpanel"
            aria-labelledby="specification-tab">
            <div className="ps-table__name">Performance</div>
             <table className="table ps-table ps-table--oriented">
                <tbody>
                    <tr>
                        <th className="ps-table__th">
                            Higher memory bandwidth
                        </th>
                        <td>1,544 MHz</td>
                    </tr>
                    <tr>
                        <th className="ps-table__th">Higher pixel rate</th>
                        <td>74.1 GPixel/s</td>
                    </tr>
                </tbody>
            </table>
            <div className="ps-table__name">Speed</div>
            <table className="table ps-table ps-table--oriented">
                <tbody>
                    <tr>
                        <th className="ps-table__th">More shading units</th>
                        <td>1,544 MHz</td>
                    </tr>
                    <tr>
                        <th className="ps-table__th">
                            Better PassMark direct compute score
                        </th>
                        <td>3,953 GFLOPS</td>
                    </tr>
                    <tr>
                        <th className="ps-table__th">
                            More texture mapping units
                        </th>
                        <td>123.5 GTexel/s</td>
                    </tr>
                    <tr>
                        <th className="ps-table__th">
                            Higher memory clock speed
                        </th>
                        <td>1,759 MHz</td>
                    </tr>
                    <tr>
                        <th className="ps-table__th">
                            Better floating-point performance
                        </th>
                        <td>5,049</td>
                    </tr>
                </tbody>
            </table>
            {/* <div className="ps-table__name">Information</div> */}
            <table className="table ps-table ps-table--oriented">
                <tbody>
                 {/* <ProductSpecificationTable description={product.table}/> */}
                    {/* <ProductSpecification description={product.table}/> */}
                    {/* <tr>
                        <th className="ps-table__th">Power</th>
                        <td>5,049</td>
                    </tr>
                    <tr>
                        <th className="ps-table__th">Windows</th>
                        <td>64bit Windows 7*, 8 or 10</td>
                    </tr>
                    <tr>
                        <th className="ps-table__th">Graphic Card</th>
                        <td>
                            4Gb dedicated Graphics card (such as NVIDIA – Open
                            GL 4.0 or later)
                        </td>
                    </tr>
                    <tr>
                        <th className="ps-table__th">HDD</th>
                        <td>
                            500Gb HDD (this is more driven by the amount of data
                            you want to keep on your computer, rather than LSS
                            itself)
                        </td>
                    </tr>
                    <tr>
                        <th className="ps-table__th">Screen</th>
                        <td>
                            Single HD Screen (1920x1080 with 100% desktop
                            scaling) or 1366x768 with second monitor 1920x1080
                            or higher
                        </td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    );
};

export default ModuleDetailSpecification;
