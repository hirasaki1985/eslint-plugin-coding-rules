import React from "react";

/**
 * Props
 */
interface ButtonAtomProps {
  value: string;
  onClick: () => void;
}

/**
 * ButtonAtom
 */
const ButtonAtom: React.FC<ButtonAtomProps> = (props: ButtonAtomProps) => {
  const { value, onClick } = props;

  return (
    <div>
      <input type="button" value={value} onClick={onClick} />
    </div>
  );
};

export default ButtonAtom;
