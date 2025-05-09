import { Poppins } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "Utils/theme";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  title: "Fashion Shop",
  description: "Generated by mj.sharifimanesh@gmail.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AppRouterCacheProvider options={{ key: "mui-theme" }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <StoreProvider>{children}</StoreProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
        {/* <ThemeRegistry options={{ key: "mui-theme" }}> */}
        {/* </ThemeRegistry> */}
      </body>
    </html>
  );
}
