import { defineConfig } from "@pandacss/dev"
import { preset } from '@pandacss/preset-panda';

export default defineConfig({
    preflight: true,
    watch: true,
    jsxFramework: "react",
    include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
    exclude: [],
    conditions: {
      light: '[data-theme=light] &',
      dark: '[data-theme=dark] &',
    },
    theme: {
      extend: {}
    },
    cwd: __dirname,
    outdir: "./src/shared/styled-system",    
});
