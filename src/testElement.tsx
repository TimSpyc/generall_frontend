import React from "react";

interface IBaseElementProps {
  mode?: "show" | "edit";
}

interface IDataProps {
  data: any;
  setData: (data: object) => void;
  link_to_data?: never;
}

interface ILinkToProps {
  link_to_data: string;
  data?: never;
  setData?: never;
}

type IElementProps = (IDataProps | ILinkToProps) & IBaseElementProps;

export default function TestElement(props: IElementProps): JSX.Element {
  const { data, setData, mode } = props;
  return (
    <>
      {mode === "show" ? (
        <p>{data?.text}</p>
      ) : (
        mode === "edit" && (
          <input
            type="text"
            value={data?.text}
            onChange={(e) => setData && setData({ text: e.target.value })}
          ></input>
        )
      )}
    </>
  );
}
