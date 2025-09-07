// /Users/oassas/Projets/replypilot/src/components/safe-mailto.tsx
'use client';

import React, { useEffect, useState } from 'react';

/**
 * Renders a mailto link only on the client-side to prevent
 * basic email scraping bots from harvesting the email address.
 */
export default function SafeMailto({ email, children, ...props }: {
  email: string;
  children: React.ReactNode;
  [key: string]: any;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // On the server or before hydration, render a non-functional span
  // to avoid having the mailto link in the initial HTML source.
  if (!isClient) {
    return (
      <span {...props} className={`${props.className} cursor-pointer`}>
        {children}
      </span>
    );
  }

  // On the client, render the actual mailto link.
  return (
    <a href={`mailto:${email}`} {...props}>
      {children}
    </a>
  );
}
