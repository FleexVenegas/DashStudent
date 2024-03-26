import React, { useState } from "react";
// assets
import PointMenu from "@/assets/icons/points.svg";
import Edit from "@/assets/icons/edit.png";
import Delete from "@/assets/icons/delete.png";

// Styles
import Tstyle from "./Table.module.scss";

interface TableProps {
    data: any[];
    columns: any[];
    width?: string;
    actions?: boolean;
    rowPorPage?: number;
    functionEdit?: (id: string) => void;
    functionDelete?: (id: string) => void;
}

const Table = ({
    actions = false,
    rowPorPage = 5,
    functionEdit,
    functionDelete,
    data,
    columns,
}: TableProps) => {
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = rowPorPage;
    const totalPages = Math.ceil(data?.length / itemsPerPage);

    const handleClickNext = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
    };

    const handleClickPrev = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const paginatedData = data?.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
    );

    const truncateText = (text: string, maxLength: number) => {
        if (text?.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    };

    return (
        <div className={Tstyle.Cnt_table}>
            <table className={Tstyle.table}>
                <thead className={Tstyle.thead}>
                    <tr className={Tstyle.tr}>
                        {columns.map((column, idx) => (
                            <th
                                className={Tstyle.th}
                                style={{ width: column.width }}
                                key={idx}
                            >
                                {column.header}
                            </th>
                        ))}
                        {actions && (
                            <th className={Tstyle.actionts_}>Actions</th>
                        )}
                    </tr>
                </thead>
                <tbody className={Tstyle.tbody}>
                    {paginatedData?.map((row, idx) => (
                        <tr className={Tstyle.tr} key={idx}>
                            {columns.map((column, idx) => (
                                <td
                                    className={Tstyle.td}
                                    style={{ width: column.width }}
                                    key={idx}
                                >
                                    {column.accessor === "_id" ||
                                    column.accessor === "email" ? (
                                        <span>
                                            {truncateText(
                                                row[column.accessor],
                                                10
                                            )}
                                        </span>
                                    ) : (
                                        <span>{row[column.accessor]}</span>
                                    )}
                                </td>
                            ))}
                            {actions && (
                                <td className={Tstyle.action_body}>
                                    <div className={Tstyle.cnt_images}>
                                        <img
                                            src={Edit.src}
                                            alt=""
                                            onClick={() =>
                                                functionEdit?.(row._id)
                                            }
                                        />
                                        <img
                                            src={Delete.src}
                                            alt=""
                                            onClick={() =>
                                                functionDelete?.(row._id)
                                            }
                                        />
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={Tstyle.cnt_controlls}>
                <div className={Tstyle.cnt_spans}>
                    <span>Total records: {data?.length}</span>
                    <span>{`Page ${currentPage + 1} of ${totalPages}`}</span>
                </div>
                <div className={Tstyle.cnt_btns}>
                    <button
                        onClick={handleClickPrev}
                        className={`${Tstyle.bnt_controls} ${
                            currentPage === 0 ? Tstyle.btn_prev_hidden : ""
                        }`}
                        disabled={currentPage === 0}
                    >
                        Previous
                    </button>
                    <button
                        className={`${Tstyle.bnt_controls} ${
                            currentPage === totalPages - 1
                                ? Tstyle.btn_next_hidden
                                : ""
                        }`}
                        onClick={handleClickNext}
                        disabled={currentPage === totalPages - 1}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Table;
