import React, { useState } from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DateField = (props) => {
    const [startDate, setStartDate] = useState(props.value);

    const onChange = (date) => {
        setStartDate(date);

        if (props.onChange) {
            props.onChange(date);
        }
    };

    return (
        <div className={`input${props.className ? ` ${props.className}` : ""}`}>
            {props.label ? (
                <div className="input-header">
                    <label className="label">{props.label}</label>
                </div>
            ) : null}
            <DatePicker
                selected={startDate}
                showYearDropdown
                disabled={props.disabled}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="Pp"
                scrollableYearDropdown
                autoComplete="off"
                onChange={onChange}
            />
        </div>
    );
};

export default DateField;
