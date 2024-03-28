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
import Head from "next/head";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "Habuli",
  description: "- store for quality and branded products",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Habuli - store for quality products"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Sandeep Lakhiwal" />
        <title>Habuli - ecommerce</title>
        {/* Other meta tags as needed */}
      </Head>
      <html lang="en">
        <body style={{ backgroundColor: "whitesmoke", fontFamily: "roboto" }}>
          <Providers>
            <ContextProvider>
              <ThemeProvider theme={theme}>
                <>
                  <Header />
                  {children}
                  <Footer />
                </>
              </ThemeProvider>
            </ContextProvider>
          </Providers>
        </body>
      </html>
    </>
  );
}
