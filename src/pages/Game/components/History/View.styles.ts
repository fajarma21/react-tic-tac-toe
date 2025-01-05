import { css } from "@emotion/css";
import { grayBorder } from "@/constants/styles";

export const history = css`
  overflow: auto;
  text-align: left;
  height: 100%;
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border-top: 1px solid ${grayBorder};

  ul {
    margin: 0;
    padding-left: 20px;
  }
`;
