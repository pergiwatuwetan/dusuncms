export default function PrimaryButton({
    className = "",
    disabled = false,
    loading = false,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            disabled={disabled || loading}
            className={`inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white shadow transition-all duration-200

            hover:bg-indigo-700
            active:scale-95
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            focus:ring-offset-2

            ${
                disabled || loading
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
            }

            ${className}`}
        >
            {loading && (
                <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />

                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                </svg>
            )}

            {loading ? "Menyimpan..." : children}
        </button>
    );
}