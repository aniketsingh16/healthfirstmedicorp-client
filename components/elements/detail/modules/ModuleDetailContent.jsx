import React from "react";
import ModuleDetailDescription from "@/components/elements/detail/modules/ModuleDetailDescription";
import ModuleAdditionInformation from "@/components/elements/detail/modules/ModuleDetailAdditionInformation";
import ModuleDetailSpecification from "@/components/elements/detail/modules/ModuleDetailSpecification";
import ModuleDetailReviews from "@/components/elements/detail/modules/ModuleDetailReviews";
import { Tabs } from "antd";

const { TabPane } = Tabs;
const ModuleDetailContent = () => {
    return (
        <div className="ps-product__description">
            <div className="ps-document">
                <h2 className="ps-title">
                    Binocular Course Microscope BM100 LED
                </h2>
                <p className="ps-desc">
                    Just a few seconds to measure your body temperature. Up to 5
                    users! The battery lasts up to 2 years. There are many
                    variations of passages of Lorem Ipsum available, but the
                    majority have suffered altevration in some form, by injected
                    humour, or randomised words which don’t look even slightly
                    believable.
                </p>
                <p className="ps-desc">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry’s
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                </p>
                <ul className="ps-list d-flex justify-content-start">
                    <li>
                        <img src="/static/img/icon/bacterial.svg" alt="" />
                        <span>Study history up to 30 days</span>
                    </li>
                    <li>
                        <img src="/static/img/icon/virus.svg" alt="" />
                        <span>Up to 5 users simultaneously</span>
                    </li>
                    <li>
                        <img src="/static/img/icon/ribbon.svg" alt="" />
                        <span>Has HEALTH certificate</span>
                    </li>
                </ul>
                <table className="table ps-table ps-table--oriented m-0">
                    <tbody>
                        <tr>
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
                                4Gb dedicated Graphics card (such as NVIDIA –
                                Open GL 4.0 or later)
                            </td>
                        </tr>
                        <tr>
                            <th className="ps-table__th">HDD</th>
                            <td>
                                500Gb HDD (this is more driven by the amount of
                                data you want to keep on your computer, rather
                                than LSS itself)
                            </td>
                        </tr>
                        <tr>
                            <th className="ps-table__th">Screen</th>
                            <td>
                                Single HD Screen (1920×1080 with 100% desktop
                                scaling) or 1366×768 with second monitor
                                1920×1080 or higher
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ModuleDetailContent;
