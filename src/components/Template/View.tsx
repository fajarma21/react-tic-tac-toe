import React from "react";
import * as css from "./View.styles";
import type { TemplateProps } from "./View.types";

const Template = ({ children }: TemplateProps) => {
  const [top, mid, bot] = React.Children.toArray(children);
  return (
    <>
      <div className={css.infoContainer}>{top}</div>
      <div className={css.midWrapper}>{mid}</div>
      <div className={css.botWrapper}>{bot}</div>
    </>
  );
};

export default Template;
