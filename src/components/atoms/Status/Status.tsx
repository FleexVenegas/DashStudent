import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Sstyle from "./Status.module.scss";

interface StatusProps {
    status?: string;
    setStatusValue?: Dispatch<SetStateAction<string>>;
    // setStatusValue?: (status: string | undefined) => void;
}

const Status = ({ status, setStatusValue }: StatusProps) => {
    const [checkValue, setCheckValue] = useState<boolean>(false);

    useEffect(() => {
        setCheckValue(status === "active");
    }, []);

    useEffect(() => {
        if (setStatusValue) {
            setStatusValue(checkValue ? "active" : "inactive");
        }
    }, [checkValue]);

    return (
        <div className={Sstyle.Status}>
            <span className={Sstyle.span}>Status</span>
            <div className={Sstyle.exp_status}>
                <div className={Sstyle.cnt_status}>
                    <div
                        className={`${Sstyle.check_status} ${
                            checkValue ? Sstyle.active_check : ""
                        }`}
                        onClick={() => setCheckValue(!checkValue)}
                    ></div>
                </div>

                <span className={Sstyle.span_active}>
                    {checkValue ? "Active" : "Inactive"}
                </span>
            </div>
        </div>
    );
};

export default Status;
