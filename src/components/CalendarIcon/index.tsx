import * as React from 'react';

const CalendarIcon = ({
  forwardedRef,
  fill = 'currentColor',
  height = '1em',
  viewBox = '0 0 50 50',
  ...props
}: React.SVGAttributes<SVGSVGElement> & {
  forwardedRef?: React.Ref<SVGSVGElement>;
}) => {
  return (
    <svg
      ref={forwardedRef}
      fill={fill}
      viewBox={viewBox}
      height={height}
      {...props}
    >
      <path d="M37 38H13c-1.7 0-3-1.3-3-3V13c0-1.7 1.1-3 2.5-3H14v2h-1.5c-.2 0-.5.4-.5 1v22c0 .6.4 1 1 1h24c.6 0 1-.4 1-1V13c0-.6-.3-1-.5-1H36v-2h1.5c1.4 0 2.5 1.3 2.5 3v22c0 1.7-1.3 3-3 3z" />
      <path d="M17 14c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1s1 .4 1 1v4c0 .6-.4 1-1 1zm16 0c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1s1 .4 1 1v4c0 .6-.4 1-1 1zm-13-4h10v2H20zm-8 6h26v2H12zm22 4h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm16 4h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm20 4h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm16 4h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2z" />
    </svg>
  );
};

const ForwardedRef = React.forwardRef<
  SVGSVGElement,
  React.SVGAttributes<SVGSVGElement>
>((props, ref) => <CalendarIcon {...props} forwardedRef={ref} />);

ForwardedRef.displayName = `CalendarIcon`;

export default ForwardedRef;
