import { ContextProvider } from "@/config/client/client";
import "./globals.css";
import Header from "@/components/layout/header";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

export const metadata = {
  title: "Habuli",
  description: "-Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <ThemeProvider theme={theme}>
            <>
              <Header />
              {children}
            </>
          </ThemeProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
