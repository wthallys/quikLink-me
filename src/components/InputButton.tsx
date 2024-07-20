import React from "react";

const InputButton = ({ children, ...props}: React.ComponentProps<"button">) => {
    return (
        <button {...props}>{children}</button>
    )

}

export default InputButton