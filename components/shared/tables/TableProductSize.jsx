import React from 'react';

const TableProductSize = () => {
    return (
        <div className="table-responsive">
            <table className="table ps-table ps-table--product-info">
                <tbody>
                    <tr>
                        <td>Weight</td>
                        <td>2 kg</td>
                    </tr>
                    <tr>
                        <td>Color</td>
                        <td>Black, Brown, White</td>
                    </tr>
                    <tr>
                        <td>Dimensions</td>
                        <td> 8 x 6 x 2cm</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TableProductSize;
