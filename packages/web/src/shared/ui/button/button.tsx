import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cva } from 'styled/css';
import { styled } from 'styled/jsx';

const buttonStyle = cva({
  base: {
    display: 'inline-flex',
    appearance: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    position: 'relative',
    whiteSpace: 'nowrap',
    verticalAlign: 'midddle',
    outline: 'transparent solid 2px',
    outlineOffset: '2px',
    lineHeight: 1.2,
    rounded: 'md',
    fontWeight: 'semibold',
    cursor: 'pointer',
    borderWidth: '1px',
    borderStyle: 'solid',
    _active: {
      transform: 'translateY(1px)',
    },
  },
  variants: {
    visual: {
      solid: {
        _light: {
          background: 'neutral.950',
          color: 'neutral.100',
        },
        _dark: {
          background: 'neutral.50',
          color: 'neutral.950',
          borderColor: 'transparent',
        },
      },
      outline: {
        _light: {
          borderColor: 'neutral.950',
          color: 'neutral.950',
          _hover: {
            background: 'neutral.100'
          },
        },
        _dark: {
          borderColor: 'neutral.50',
          color: 'neutral.50',
        },
      },
    },
    size: {
      xs: {
        height: 6,
        minW: 6,
        fontSize: 'xs',
        paddingInlineStart: 2,
        paddingInlineEnd: 2,
      },
      sm: {
        height: 8,
        minW: 8,
        fontSize: 'sm',
        paddingInlineStart: 3,
        paddingInlineEnd: 3,
      },
      md: {
        height: 10,
        minW: 10,
        fontSize: 'md',
        paddingInlineStart: 4,
        paddingInlineEnd: 4,
      },
    },
  },
  defaultVariants: {
    size: 'md',
    visual: 'solid',
  }
});

const StyledButton = styled('button', buttonStyle);

interface Props extends ComponentPropsWithoutRef<typeof StyledButton> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

export function Button({ children, leftIcon, rightIcon, ...rest }: Props) {

  return (
    <StyledButton {...rest}>
      {leftIcon && (
        <styled.span marginInlineEnd={2}>
          {leftIcon}
        </styled.span>
      )}
      <span>
        {children}
      </span>
      {rightIcon && (
        <styled.span marginInlineStart={2}>
          {rightIcon}
        </styled.span>
      )}
    </StyledButton>
  )
};
