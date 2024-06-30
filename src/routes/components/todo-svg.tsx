import type { IconName } from '../../assets/types';
import type { SVGProps } from 'react';
import spriteHref from '../../assets/sprite.svg';
export const TodoSVG = ({
  name,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
}) => {
  return (
    <svg {...props}>
      <use href={`${spriteHref}#${name}`} />
    </svg>
  );
};
