"use client";

import React from "react";

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function MotionSection({
  children,
  className,
}: MotionSectionProps) {
  return (
    <section className={className}>
      {children}
    </section>
  );
}
