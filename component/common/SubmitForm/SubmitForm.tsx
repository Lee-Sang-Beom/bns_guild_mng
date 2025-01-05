"use client";

import { Ref, forwardRef } from "react";
import styles from "./SubmitForm.module.scss";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

const SubmitForm = (
  { ...props }: IProps & React.HTMLProps<HTMLFormElement>,
  ref: Ref<HTMLFormElement>
) => {
  return (
    <form
      className={styles.form}
      ref={ref}
      method={props.method ? props.method : "POST"}
      {...props}
    ></form>
  );
};

export default forwardRef(SubmitForm);
