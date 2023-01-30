import React from "react";

const Button = (props) => {
    return (
        <button
            type={props.type || "submit"}
            className={`button${props.type ? ` ${props.type}` : " default"}`}
            style={props.style}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
};

export default Button;
