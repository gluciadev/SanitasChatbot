'use client';

import React, { FC, useEffect, useMemo } from "react";

import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";



interface GrowthBookProviderProps {
  children: React.ReactNode;
}

const GrowthbookProvider: FC<GrowthBookProviderProps> = ({ children }) => {

  // Lee variables públicas de Next
  const apiHost       = process.env.NEXT_PUBLIC_GB_API_HOST!;
  const clientKey     = process.env.NEXT_PUBLIC_GB_CLIENT_KEY!;
  const decryptionKey = process.env.NEXT_PUBLIC_GB_DECRYPTION_KEY || undefined; 
  const enableDevMode = process.env.NEXT_PUBLIC_GB_ENABLE_DEV_MODE === 'true' && process.env.NEXT_PUBLIC_GB_NODE_ENV !== 'production';


  const growthbook = useMemo(
    () =>
      new GrowthBook({
        apiHost,
        clientKey,
        decryptionKey,
        enableDevMode,
      }),
    [apiHost, clientKey, decryptionKey, enableDevMode],
  );

  useEffect(() => {
    // Load features asynchronously when the app renders
    growthbook.init({ streaming: true });
  }, [growthbook]);

  useEffect(() => {
    // Atributos que sirven para filtrar las flags creadas si queremos poner reglas personalizadas SDK -> Attributes
      growthbook.setAttributes({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <GrowthBookProvider growthbook={growthbook}>{children}</GrowthBookProvider>;
};

export default GrowthbookProvider;