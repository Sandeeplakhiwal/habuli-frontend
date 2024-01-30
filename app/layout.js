import { ContextProvider } from "@/config/client/client";
import "./globals.css";
import Header from "@/components/layout/header";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { Providers } from "@/redux/provider/provider";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const metadata = {
  title: "Habuli",
  description: "-Store",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body style={{ backgroundColor: "whitesmoke", fontFamily: "roboto" }}>
          <Providers>
            <ContextProvider>
              <ThemeProvider theme={theme}>
                <>
                  <Header />
                  {children}
                </>
              </ThemeProvider>
            </ContextProvider>
          </Providers>
        </body>
      </html>
    </>
  );
}
