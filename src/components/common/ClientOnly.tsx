"use client";

import { useEffect, useState } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ 
  children, 
  fallback = null 
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Add small delay to ensure DOM is fully ready
    const timer = setTimeout(() => {
      setHasMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!hasMounted) {
    return <div suppressHydrationWarning>{fallback}</div>;
  }

  return <div suppressHydrationWarning>{children}</div>;
};

export default ClientOnly;
