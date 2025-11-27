/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#26babb",
      },
      fontSize: {
        "0.5xs": ["0.625rem", "0.875rem"], // font-size: 10px; line-height: 14px
        xs: ["0.75rem", "1.0625rem"], // font-size: 12px; line-height: 17px
        "2xs": ["0.8125rem", "1.125rem"], // font-size: 13px; line-height: 18px
        "1.2xs": ["0.875rem", "1.25rem"], // font-size: 14px; line-height: 19px
        "2sm": ["0.9375rem", "1.375rem"], // font-size: 15px; line-height: 22px
        "1.2sm": ["1rem", "1.375rem"], // font-size: 16px; line-height: 22px
        "1.5xl": ["1.375rem", "1.75rem"], // font-size: 22px; line-height: 28px
        "2.33xl": ["1.75rem", "2.25rem"], // font-size: 28px; line-height: 34px
        "3.5xl": ["2rem", "2.375rem"], // font-size: 32px; line-height: 38px
        "4.5xl": ["2.75rem", "3rem"], // font-size: 44px; line-height: 48px
      },
      keyframes: {
        "rotate-180": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(180deg)" },
        },
        "rotate-0": {
          "0%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        "rotate-180": "rotate-180 0.3s ease-in-out",
        "rotate-0": "rotate-0 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
