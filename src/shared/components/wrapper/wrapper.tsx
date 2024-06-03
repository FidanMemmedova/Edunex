import "./wrapper.scss";
//
//
//

interface Wrapper {
  children: React.ReactNode;
  size?: 1 | 2 | 3 | 4;
  fullHeight?: "true" | "false";
  paddingY?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  zIndex?: number;
}
//
//
//
export default function Wrapper({
  children,
  size = 1,
  fullHeight = "false",
  paddingY = 0,
  zIndex = 1,
}: Wrapper) {
  return (
    <div
      className="w-holder"
      p-size={size}
      full-height={fullHeight}
      p-padding-y={paddingY}
      style={{ zIndex }}
    >
      <div className="wrapper">{children}</div>
    </div>
  );
}
