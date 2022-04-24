import {useEffect, useState} from "react";

export default function BlinkingDot() {
    const [show, setShow] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShow(!show)
        }, 500)
    }, [show])

    return <span style={show ? {color: "black"} : {color: "transparent"}}>.</span>;
}