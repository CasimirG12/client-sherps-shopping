import React from "react";

interface SwitchButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  iconLeft?: string;
  iconRight?: string;
  active: boolean;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  iconLeft,
  iconRight,
  active,
  ...props
}) => {
  return (
    <div {...props} className="bg-gray-500 relative">
      <div>
        {active ? (iconRight ? iconRight : null) : iconLeft ? iconLeft : null}
      </div>
    </div>
  );
};

export default SwitchButton;
