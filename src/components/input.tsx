import React from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import Input, { InputProps, InputRef } from "zmp-ui/input";

const AppInput: React.FC<InputProps> = forwardRef((props, ref) => {
  const inputRef = useRef<InputRef>(null);
  useImperativeHandle(ref, () => inputRef.current?.input);

  return <Input {...props} ref={inputRef} />;
});

export default AppInput