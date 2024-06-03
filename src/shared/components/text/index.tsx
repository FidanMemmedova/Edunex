/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-template */

import "./style.scss";

//
//
//
interface SizeBreak {
  sm?: Size;
  md?: Size;
}
interface PaddingBreak {
  sm?: Padding;
  md?: Padding;
}
interface WidthBreak {
  sm?: Width;
  md?: Width;
}
type Padding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;
type Size = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Width = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "auto";

//
//
//
interface TextProps {
  el?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
  size?: Size | SizeBreak;
  weight?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  width?: Width | WidthBreak | any;
  color?: string;
  paddingBottom?: Padding | PaddingBreak;
  paddingLeft?: Padding | PaddingBreak;
  // paddingRight?: Padding | PaddingBreak;
  children: React.ReactNode | string;
  selection?: "true" | "false";
  className?: string;
  whitespace?: string;
  // lineClamp?: string;
  textAlign?: "left" | "center" | "right" | "justify" | "unset";
}
export function Text({
  el = "p",
  size = 1,
  weight = 4,
  width = 10,
  color = "light-base",
  paddingBottom = 0,
  paddingLeft = 0,
  // paddingRight = 0,
  selection,
  children = "-",
  className = undefined,
  whitespace,
  // lineClamp = "0",
  textAlign = "left",
}: TextProps): React.JSX.Element {
  return (
    <>
      {el === "p" && (
        <p
          className={className ? `text${" " + className} ` : "text"}
          p-size={
            typeof size === "number"
              ? `md-${size}`
              : `sm-${size.sm} md-${size.md}`
          }
          p-width={
            typeof width === "object"
              ? `sm-${width?.sm} md-${width?.md}`
              : `md-${width}`
          }
          p-weight={weight}
          p-white-space={whitespace}
          p-color={color}
          p-selection={selection}
          p-padding-l={
            typeof paddingLeft === "number"
              ? `md-${paddingLeft}`
              : `sm-${paddingLeft.sm} md-${paddingLeft.md}`
          }
          p-padding-b={
            typeof paddingBottom === "number"
              ? `md-${paddingBottom}`
              : `sm-${paddingBottom.sm} md-${paddingBottom.md}`
          }
          p-align={textAlign}
        >
          {children}
        </p>
      )}
      {el === "div" && (
        <div
          className={className ? `text${" " + className} ` : "text"}
          p-size={
            typeof size === "number"
              ? `md-${size}`
              : `sm-${size.sm} md-${size.md}`
          }
          p-width={
            typeof width === "object"
              ? `sm-${width?.sm} md-${width?.md}`
              : `md-${width}`
          }
          p-weight={weight}
          p-white-space={whitespace}
          p-color={color}
          p-selection={selection}
          p-padding-l={
            typeof paddingLeft === "number"
              ? `md-${paddingLeft}`
              : `sm-${paddingLeft.sm} md-${paddingLeft.md}`
          }
          p-padding-b={
            typeof paddingBottom === "number"
              ? `md-${paddingBottom}`
              : `sm-${paddingBottom.sm} md-${paddingBottom.md}`
          }
          p-align={textAlign}
        >
          {children}
        </div>
      )}
      {/* {el === "div" && (
        <div
          className={className ? `text${" " + className} ` : "text"}
          p-size={
            typeof size === "string"
              ? `md-${size}`
              : `sm-${size.sm} md-${size.md}`
          }
          p-width={
            typeof width === "object"
              ? `sm-${width?.sm} md-${width?.md}`
              : `md-${width}`
          }
          p-weight={weight} p-white-space={whitespace}
          p-color={color}
          p-selection={selection}
          p-padding-l={
            typeof paddingLeft === "number"
              ? `md-${paddingLeft}`
              : `sm-${paddingLeft.sm} md-${paddingLeft.md}`
          }
          p-padding-b={
            typeof paddingBottom === "number"
              ? `md-${paddingBottom}`
              : `sm-${paddingBottom.sm} md-${paddingBottom.md}`
          }
          p-align={textAlign}
        >
          {children}
        </div>
      )}
      {el === "h1" && (
        <h1
          className={className ? `text${" " + className} ` : "text"}
          p-size={
            typeof size === "string"
              ? `md-${size}`
              : `sm-${size.sm} md-${size.md}`
          }
          p-width={
            typeof width === "object"
              ? `sm-${width?.sm} md-${width?.md}`
              : `md-${width}`
          }
          p-weight={weight} p-white-space={whitespace}
          p-color={color}
          p-selection={selection}
          p-padding-l={
            typeof paddingLeft === "number"
              ? `md-${paddingLeft}`
              : `sm-${paddingLeft.sm} md-${paddingLeft.md}`
          }
          p-padding-b={
            typeof paddingBottom === "number"
              ? `md-${paddingBottom}`
              : `sm-${paddingBottom.sm} md-${paddingBottom.md}`
          }
          p-align={textAlign}
        >
          {children}
        </h1>
      )}
      {el === "h2" && (
        <h2
          className={className ? `text${" " + className} ` : "text"}
          p-size={
            typeof size === "string"
              ? `md-${size}`
              : `sm-${size.sm} md-${size.md}`
          }
          p-width={
            typeof width === "object"
              ? `sm-${width?.sm} md-${width?.md}`
              : `md-${width}`
          }
          p-weight={weight} p-white-space={whitespace}
          p-color={color}
          p-selection={selection}
          p-padding-l={
            typeof paddingLeft === "number"
              ? `md-${paddingLeft}`
              : `sm-${paddingLeft.sm} md-${paddingLeft.md}`
          }
          p-padding-b={
            typeof paddingBottom === "number"
              ? `md-${paddingBottom}`
              : `sm-${paddingBottom.sm} md-${paddingBottom.md}`
          }
          p-align={textAlign}
        >
          {children}
        </h2>
      )}
      {el === "h3" && (
        <h3
          className={className ? `text${" " + className} ` : "text"}
          p-size={
            typeof size === "string"
              ? `md-${size}`
              : `sm-${size.sm} md-${size.md}`
          }
          p-width={
            typeof width === "object"
              ? `sm-${width?.sm} md-${width?.md}`
              : `md-${width}`
          }
          p-weight={weight} p-white-space={whitespace}
          p-color={color}
          p-selection={selection}
          p-padding-l={
            typeof paddingLeft === "number"
              ? `md-${paddingLeft}`
              : `sm-${paddingLeft.sm} md-${paddingLeft.md}`
          }
          p-padding-b={
            typeof paddingBottom === "number"
              ? `md-${paddingBottom}`
              : `sm-${paddingBottom.sm} md-${paddingBottom.md}`
          }
          p-align={textAlign}
        >
          {children}
        </h3>
      )}
      {el === "h4" && (
        <h4
          className={className ? `text${" " + className} ` : "text"}
          p-size={
            typeof size === "string"
              ? `md-${size}`
              : `sm-${size.sm} md-${size.md}`
          }
          p-width={
            typeof width === "object"
              ? `sm-${width?.sm} md-${width?.md}`
              : `md-${width}`
          }
          p-weight={weight} p-white-space={whitespace}
          p-color={color}
          p-selection={selection}
          p-padding-l={
            typeof paddingLeft === "number"
              ? `md-${paddingLeft}`
              : `sm-${paddingLeft.sm} md-${paddingLeft.md}`
          }
          p-padding-b={
            typeof paddingBottom === "number"
              ? `md-${paddingBottom}`
              : `sm-${paddingBottom.sm} md-${paddingBottom.md}`
          }
          p-align={textAlign}
        >
          {children}
        </h4>
      )}
      {el === "h5" && (
        <h5
          className={className ? `text${" " + className} ` : "text"}
          p-size={
            typeof size === "string"
              ? `md-${size}`
              : `sm-${size.sm} md-${size.md}`
          }
          p-width={
            typeof width === "object"
              ? `sm-${width?.sm} md-${width?.md}`
              : `md-${width}`
          }
          p-weight={weight} p-white-space={whitespace}
          p-color={color}
          p-selection={selection}
          p-padding-l={
            typeof paddingLeft === "number"
              ? `md-${paddingLeft}`
              : `sm-${paddingLeft.sm} md-${paddingLeft.md}`
          }
          p-padding-b={
            typeof paddingBottom === "number"
              ? `md-${paddingBottom}`
              : `sm-${paddingBottom.sm} md-${paddingBottom.md}`
          }
          p-align={textAlign}
        >
          {children}
        </h5>
      )}
      {el === "h6" && (
        <h6
          className={className ? `text${" " + className} ` : "text"}
          p-size={
            typeof size === "string"
              ? `md-${size}`
              : `sm-${size.sm} md-${size.md}`
          }
          p-width={
            typeof width === "object"
              ? `sm-${width?.sm} md-${width?.md}`
              : `md-${width}`
          }
          p-weight={weight} p-white-space={whitespace}
          p-color={color}
          p-selection={selection}
          p-padding-l={
            typeof paddingLeft === "number"
              ? `md-${paddingLeft}`
              : `sm-${paddingLeft.sm} md-${paddingLeft.md}`
          }
          p-padding-b={
            typeof paddingBottom === "number"
              ? `md-${paddingBottom}`
              : `sm-${paddingBottom.sm} md-${paddingBottom.md}`
          }
          p-align={textAlign}
        >
          {children}
        </h6>
      )} */}
    </>
  );
}
