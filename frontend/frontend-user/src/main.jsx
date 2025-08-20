import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RxqyMAkWGOCuIh18GV1IIqWh3dPQcWTcxH2n3ISm4oofm6fSrKE9MTwHyAAvdNduPNasUm9fsbIDg7B435Cfstq00SOxwxDtx"
);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="162343963045-ja22a0buq2ht1t3dlsuicimehqi8f5or.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
          <Toaster />
        </BrowserRouter>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
