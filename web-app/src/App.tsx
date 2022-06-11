import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { MantineProvider } from "@mantine/core";
import { Helmet } from "react-helmet";
import { ReactQueryDevtools } from "react-query/devtools";

import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Search from "./components/Search/Search";
import SingleBook from "./components/single-book/SingleBook";
import BookCategoryPage from "./components/BookCategoryPage/BookCategoryPage";
import Auth from "./components/auth/Auth";
import Footer from "./components/footer/Footer";
import FAQ from "./components/FAQ/FAQ";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditions";

import UserBooksTypePage from "./components/profile/user-books-type-page/UserBooksTypePage";
import Subscription from "./components/subscription/Subscription";
import Goals from "./components/profile/Goals/Goals";
import Settings from "./components/profile/settings/Settings";

import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import OverPageLoader from "./components/over-page-loader/OverPageLoader";

import UserRoute from "./components/UserRoute";

import Context from "./Context";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App(): JSX.Element {
  return (
    <React.StrictMode>
      <Router>
        <QueryClientProvider client={queryClient}>
          <ScrollToTop>
            <Context>
              <MantineProvider
                theme={{
                  colors: {
                    "eb-main-color": [
                      "#00B7AD",
                      "#00B7AD",
                      "#00B7AD",
                      "#00B7AD",
                      "#00B7AD",
                      "#00B7AD",
                      "#00B7AD",
                      "#00B7AD",
                      "#00B7AD",
                    ],
                  },
                  primaryColor: "eb-main-color",
                }}
              >
                <div className="App">
                  <Helmet>
                    <title>Էլեկտրոնային գրքեր և դասագրքեր | ebooks.am</title>
                    <meta name="description" content="App Description" />
                    <meta name="theme-color" content="#008f68" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta
                      name="viewport"
                      content="width=device-width, initial-scale=1"
                    />
                    <meta
                      name="keywords"
                      content="ebooks.am, ebooks am, Էլեկտրոնային գրքեր, Էլեկտրոնային դասագրքեր, գրքեր, գրքեր pdf, դասագրքեր, անվճար էլեկտրոնային գրքեր, անվճար գրքեր, ներբեռնել գրքեր, օնլայն գրքեր, օնլայն գրքեր կարդալ, կարդալ օնլայն գրքեր, օնլայն դասագրքեր, դպրոցական դասագրքեր, Գեղարվեստական գրականություն, Պատմություն, Հայոց պատմություն, Armenian ebooks, Armenian books, Armenian literature, Armenian history, online grqer, գրքեր скачать"
                    />
                    <link rel="canonical" href="https://www.ebooks.am/" />
                    <link
                      rel="icon"
                      href="https://ebooks.am/images/favicon.png"
                    />
                     <meta property="fb:app_id" content="2204246992967412"/>

                    {/* <meta property="fb:app_id" content="2204246992967412"/>
                    <meta property="og:site_name" content="Ebooks.am"/>
                    <meta property="og:type" content="website" /> 
                    <meta property="og:title" content="Էլեկտրոնային գրքեր և դասագրքեր" />
                    <meta property="og:description" content="Ներբեռնեք Ձեզ անհրաժեշտ էլեկտրոնային գիրքը eBooks.am կայքում" />
                    <meta property="og:url" content="https://www.ebooks.am/" /> 
                    <meta property="og:image" content="https://ebooks.am/pictures/thumbnails/main.PNG" /> 
                    <meta property="og:image:width" content="620" />
                    <meta property="og:image:height" content="541" /> */}
                  </Helmet>
                  <Header />
                  <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/join" component={Auth} />
                    <Route path="/book/:uuid" component={SingleBook} />
                    <Route path="/search" component={Search} />
                    <Route
                      path="/category/:category"
                      component={BookCategoryPage}
                    />
                    <Route path="/faq" component={FAQ} />
                    <Route path="/terms" component={TermsAndConditions} />
                    <Route path="/privacy-policy" component={PrivacyPolicy} />

                    <UserRoute
                      path="/books/:type"
                      component={UserBooksTypePage}
                    />
                    <UserRoute path="/goals" component={Goals} />
                    <UserRoute path="/subscription" component={Subscription} />
                    <UserRoute path="/settings" component={Settings} />
                    <Route component={NotFoundPage} />
                  </Switch>
                  <OverPageLoader />
                  <Footer />
                </div>
              </MantineProvider>
            </Context>
          </ScrollToTop>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Router>
    </React.StrictMode>
  );
}
