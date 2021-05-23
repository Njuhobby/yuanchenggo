import React from "react";
import { ThemeConfig } from "src/theme";
import { Provider } from "react-redux";
import { store, persistor } from "src/redux/store";
import ScrollToTop from "src/components/ScrollToTop";
import LoadingScreen from "src/components/LoadingScreen";
import GoogleAnalytics from "src/components/GoogleAnalytics";
import NotistackProvider from "src/components/NotistackProvider";
import { PersistGate } from "redux-persist/integration/react";
import JwtProvider from "src/components/Auth/JwtProvider";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DashboardAppView from "./dashboard";

export default function Home() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <ThemeConfig>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <NotistackProvider>
              <JwtProvider>
                <ScrollToTop />
                <GoogleAnalytics />
                <DashboardAppView />
              </JwtProvider>
            </NotistackProvider>
          </LocalizationProvider>
        </ThemeConfig>
      </PersistGate>
    </Provider>
  );
}
