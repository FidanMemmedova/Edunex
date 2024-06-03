//
import { ConfigProvider } from "antd";

import "./style.scss";

export function Antd({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: "var(--color-neutral-9)",
          //  colorPrimary: "#1B82AE",
          //  colorError: "#CC3340",
          //  colorSuccess: "#3EB984",
          //  colorBorder: "#DBDDDD",
          //  colorBgLayout: "#F3F4F4",
          colorTextDescription: "var(--color-neutral-6)",
          //  colorTextPlaceholder: "#6F7374",
          borderRadius: 8,
          fontFamily: "Rubik",
          //  colorBorderSecondary: "#DBDDDD",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
