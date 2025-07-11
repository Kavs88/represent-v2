"use client";
import Link, { LinkProps } from 'next/link';
import React from 'react';
import { useCursor } from './CursorContext';

interface LinkWithCursorProps extends LinkProps {
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}

const LinkWithCursor = ({ className, children, ...props }: LinkWithCursorProps) => {
  const { setIsHovering } = useCursor();
  return (
    <Link
      {...props}
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
    </Link>
  );
};

export default LinkWithCursor; 