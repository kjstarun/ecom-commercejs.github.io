import Commerce from "@chec/commerce.js";

// const key = meta.env.REACT_APP_CHEC_PUBLIC_KEY;

export const commerce = new Commerce(import.meta.env.VITE_APP_CHEC_PUBLIC_KEY, true);
