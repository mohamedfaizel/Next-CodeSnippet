"use client"

type ButtonProps = React.ComponentProps<'button'> & {id: string};

const Button = (props: ButtonProps) => {
  const className = 'p-2 border rounded  ' + props.className;

  return <button className={className.trim()} {...props} />;
};


export default Button