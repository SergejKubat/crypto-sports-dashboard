import React, { useState, useEffect } from "react";

import Select from "react-select";

const SelectField = (props) => {
    const [value, setValue] = useState(props.value);
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState(false);

    const onChange = (e) => {
        setValue(e.value);

        props.onChange(e);

        if (touched && props.required) {
            setError(!e.value);
        }
    };

    useEffect(() => {
        if (touched && props.required) {
            setError(!value);
        }
    }, [touched]);

    useEffect(() => {
        setTouched(props.touched);
    }, [props.touched]);

    return (
        <div className={`input${props.className ? ` ${props.className}` : ""}`} style={props.style}>
            {props.label ? (
                <div className="input-header">
                    <label className="label">{props.label}</label>
                </div>
            ) : null}
            <Select
                className="react-select"
                name={props.name}
                options={props.options}
                isDisabled={props.disabled}
                value={props.value}
                placeholder={props.placeholder}
                onChange={onChange}
                isSearchable={false}
                onBlur={() => setTouched(true)}
                styles={{
                    control: (styles) => ({
                        ...styles,
                        border: "1px solid #999"
                    }),
                    placeholder: (styles) => ({
                        ...styles,
                        fontSize: "1.4rem"
                    }),
                    singleValue: (styles) => ({
                        ...styles,
                        fontFamily: '"Poppins", sans-serif',
                        fontSize: "1.4rem"
                    })
                }}
            />
            {error ? <p className="input-error">{props.errorMessage}</p> : null}
        </div>
    );
};

export default SelectField;
