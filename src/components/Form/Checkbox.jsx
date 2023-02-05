import React, { useState, useEffect } from "react";

const Checkbox = (props) => {
    const [isChecked, setIsChecked] = useState(props.defaultChecked || "");

    const onChange = (e) => {
        setIsChecked(e.target.checked);

        if (props.onChange) {
            props.onChange(e.target.checked);
        }
    };

    useEffect(() => {
        setIsChecked(props.defaultChecked);
    }, [props.defaultChecked]);

    return (
        <label className="checkbox">
            <input
                type="checkbox"
                name={props.name}
                defaultChecked={isChecked}
                value={isChecked}
                disabled={props.disabled}
                onChange={onChange}
            />
            <span className="checkmark"></span>
        </label>
    );

    /*return (
        <label className="checkbox" style={props.style}>
            {props.label}
            <input
                name={props.name}
                type="checkbox"
                defaultChecked={isChecked}
                value={isChecked}
                disabled={props.disabled}
                onChange={onChange}
            />
            <span className={`checkmark${isChecked ? " checked" : ""}`}></span>
        </label>
    );*/
};

export default Checkbox;
