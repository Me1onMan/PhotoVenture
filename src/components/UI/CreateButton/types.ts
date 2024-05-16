// export type TButtonVariants = 'primary' | 'secondary' | 'outlined' | 'follow' | 'logout';

export type TProps = {
  // variant: TButtonVariants;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

// export type TStyledProps = {
//   $variant: TButtonVariants;
// };
