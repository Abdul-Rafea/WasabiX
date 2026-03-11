function Svg(props){
    const classMap = {
        headerIcon: "size-7 sm:size-9",
        descriptionIcon1: "size-10 sm:size-13",
        descriptionIcon2: "size-5",
        descriptionIcon3: "size-11"
    }
    const sizeMap = classMap[props.size || "headerIcon"];

    const colorMap = {
        Wasabi: "stroke-Wasabi",
        offWhite : "stroke-offWhite",
        Black : "stroke-black/80",
        fillWasabi: "fill-Wasabi",
        filloffWhite: "fill-offWhite",
        fillBlack: "fill-black/80",
    };
    const svgClass = colorMap[props.svgColor || "offWhite" ];

    const svgVar = {
        1:(
            <svg className={sizeMap}
                viewBox="-0.13 0 20.355 20.355"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path className={svgClass}
                    d="M6 17l-1 2m5-2l-2 4m6-4l-1 2m5-2l-2 4m1-16a4.08 4.08 0 00-.93.12 5 5 0 00-9 2.09A3 3 0 106 13h11a4 4 0 000-8z"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    transform="translate(-1.912 -1.986)"
                />
            </svg>
        ),
        2:(
            <svg className={sizeMap}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path className={svgClass}
                    d="M10 9h7m-7 4h7M7 9h.01M7 13h.01M21 20l-3.324-1.662a4.161 4.161 0 00-.51-.234 2.007 2.007 0 00-.36-.085c-.139-.019-.28-.019-.561-.019H6.2c-1.12 0-1.68 0-2.108-.218a2 2 0 01-.874-.874C3 16.48 3 15.92 3 14.8V7.2c0-1.12 0-1.68.218-2.108a2 2 0 01.874-.874C4.52 4 5.08 4 6.2 4h11.6c1.12 0 1.68 0 2.108.218a2 2 0 01.874.874C21 5.52 21 6.08 21 7.2V20z"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        3: (
            <svg className={sizeMap}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path className={svgClass}
                    d="M12 21c3.5-3.6 7-6.824 7-10.8C19 6.224 15.866 3 12 3s-7 3.224-7 7.2 3.5 7.2 7 10.8z"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path className={svgClass}
                    d="M12 12a2 2 0 100-4 2 2 0 000 4z"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        4:(
            <svg className={sizeMap}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path className={svgClass}
                    clipRule="evenodd"
                    d="M6.313 12.463C6.2 9.293 8.61 6.625 11.701 6.5c3.091.125 5.501 2.792 5.388 5.963 0 1.317 1.395 2.6 1.436 3.92v.056c.03.846-.613 1.557-1.437 1.59h-3.112a2.583 2.583 0 01-.666 1.747 2.162 2.162 0 01-1.609.724 2.162 2.162 0 01-1.609-.724 2.582 2.582 0 01-.666-1.747H6.313c-.824-.033-1.467-.744-1.437-1.59v-.056c.042-1.316 1.437-2.602 1.437-3.92z"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path className={svgClass}
                    d="M9.426 17.279a.75.75 0 000 1.5v-1.5zm4.55 1.5a.75.75 0 000-1.5v1.5zm-1.3-13.529a.75.75 0 000-1.5v1.5zm-1.95-1.5a.75.75 0 000 1.5v-1.5zm-1.3 15.029h4.55v-1.5h-4.55v1.5zm3.25-15.029h-1.95v1.5h1.95v-1.5z"
                />
            </svg>
        ),
        5:(
            <svg className={sizeMap}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path className={svgClass}
                    d="M12 16a3 3 0 100-6 3 3 0 000 6z"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path className={svgClass}
                    d="M3 16.8V9.2c0-1.12 0-1.68.218-2.108a2 2 0 01.874-.874C4.52 6 5.08 6 6.2 6h1.055c.123 0 .184 0 .24-.006a1 1 0 00.725-.448c.03-.048.058-.103.113-.213.11-.22.165-.33.228-.425a2 2 0 011.447-.895C10.123 4 10.245 4 10.492 4h3.018c.246 0 .37 0 .482.013a2 2 0 011.448.895c.063.095.118.205.228.425.055.11.082.165.113.213a1 1 0 00.724.447c.057.007.118.007.241.007H17.8c1.12 0 1.68 0 2.108.218a2 2 0 01.874.874C21 7.52 21 8.08 21 9.2v7.6c0 1.12 0 1.68-.218 2.108a2 2 0 01-.874.874C19.48 20 18.92 20 17.8 20H6.2c-1.12 0-1.68 0-2.108-.218a2 2 0 01-.874-.874C3 18.48 3 17.92 3 16.8z"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        6:(
            <svg className={sizeMap}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
           >
                <path className={svgClass}
                    d="M11.302 21.615c.221.129.332.194.488.227.122.026.298.026.42 0 .156-.033.267-.098.488-.227C14.646 20.478 20 16.908 20 12V6.6c0-.558 0-.837-.107-1.05a.993.993 0 00-.432-.436c-.211-.11-.495-.113-1.062-.12C15.427 4.96 13.714 4.714 12 3c-1.714 1.714-3.427 1.959-6.399 1.994-.567.007-.851.01-1.062.12a.993.993 0 00-.432.436C4 5.763 4 6.042 4 6.6V12c0 4.908 5.354 8.478 7.302 9.615z"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        7:(
             <svg className={sizeMap}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
            >
                <path className={svgClass}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11h3m0 0h3m-3 0v3m0-3V8m-3 11v-1.25c0-2.071-1.919-3.75-4.286-3.75H7.286C4.919 14 3 15.679 3 17.75V19m9-11a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        ),
        8:(
            <svg className={sizeMap}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path className={svgClass} 
                    d="M6.995 7.006a1 1 0 000 1.415l3.585 3.585-3.585 3.585a1 1 0 101.414 1.414l3.585-3.585 3.585 3.585a1 1 0 001.415-1.414l-3.586-3.585 3.586-3.585a1 1 0 00-1.415-1.415l-3.585 3.585L8.41 7.006a1 1 0 00-1.414 0z"
                />
            </svg>
        ),
        9:(
            <svg className={sizeMap}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path className={svgClass}
                    d="M4 6h16M4 12h16M4 18h16"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        )
    };

    return svgVar[props.id];
}

export default Svg;