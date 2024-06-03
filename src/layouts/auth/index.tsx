import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Spin } from "antd";
import { Signin } from "./pages/signin";
import { Signup } from "./pages/signup";
import { Welcome } from "./pages/welcome";
import { Reset } from "./pages/reset";
import { Revocery } from "./pages/recovery";
import "./style.scss";
import { Confirmation } from "./pages/confirmation";
import Wrapper from "@components/wrapper/wrapper";

export function Auth() {
  return (
    <Suspense
      fallback={
        <div className="layout-spin-holder">
          <Spin size="large" />
        </div>
      }
    >
      <div style={{ paddingTop: "48px", paddingBottom: "48px" }}>
        <Wrapper size={4} fullHeight={"true"}>
          <Routes>
            <Route index element={<Signin />} />
            <Route path="signup" element={<Signup />} />
            <Route path="recovery" element={<Revocery />} />
            <Route path="confirmation" element={<Confirmation />} />
            <Route path="reset" element={<Reset />} />
            <Route path="welcome" element={<Welcome />} />
          </Routes>
        </Wrapper>
      </div>
    </Suspense>
  );
}
