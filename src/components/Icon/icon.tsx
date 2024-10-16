import { IconTypes } from "@/types/icons";
import { icons } from "@/utils/constants";
import Image from "next/image";
import { FC } from "react";

export interface IconProps {
  icon: IconTypes;
  width?: number;
  height?: number;
  disabled?: boolean;
  priority?:boolean;
}

const Icon: FC<IconProps> = ({
  icon,
  width = 24,
  height = 24,
  disabled,
  priority,
  ...props
}) => {
  const iconPath = icons[icon];
  return (
    <Image {...props} src={iconPath} alt="icon" width={width} height={height} priority={priority} />
  );
};

export default Icon;
