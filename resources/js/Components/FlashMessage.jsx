import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

export default function FlashMessage() {
    const { flash } = usePage().props;

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("success");

    useEffect(() => {
        if (flash.success) {
            setMessage(flash.success);
            setType("success");
            setShow(true);
        } else if (flash.error) {
            setMessage(flash.error);
            setType("error");
            setShow(true);
        }

        if (flash.success || flash.error) {
            const timer = setTimeout(() => {
                setShow(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!show) return null;

    return (
        <div className="fixed top-5 right-5 z-50">
            <div
                className={`rounded-lg px-5 py-3 shadow-xl text-white transition-all duration-300 ${
                    type === "success"
                        ? "bg-emerald-600"
                        : "bg-red-600"
                }`}
            >
                {message}
            </div>
        </div>
    );
}