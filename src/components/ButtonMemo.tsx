import { FC, memo } from "react";

import Button, { ButtonProps } from "@mui/material/Button/Button";

interface BattonMemoProps extends ButtonProps {
  children: React.ReactNode;
}

export const BattonMemo: FC<BattonMemoProps> = memo(({ children, ...rest }) => <Button {...rest}>{children}</Button>);
