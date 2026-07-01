import spoonImg from '../assets/spoon.svg';

export type SpoonCorner = 'top-left' | 'top-right' | 'bottom-right';

type SectionSpoonCornerProps = {
  corner: SpoonCorner;
};

export default function SectionSpoonCorner({ corner }: SectionSpoonCornerProps) {
  return (
    <img
      src={spoonImg}
      alt=""
      className={`section-spoon section-spoon--${corner}`}
      aria-hidden="true"
    />
  );
}
