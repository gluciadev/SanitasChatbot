import { useMemo } from "react";

import { useFeatureValue } from "@growthbook/growthbook-react";

import { FeatureFlags } from "./types";

export const useFeatureFlags = () => {
  const isEnableTestingFlag = useFeatureValue(FeatureFlags.TESTING_FIRST_KEY_FLAG, false );

  return useMemo(
    () => ({
      isEnableTestingFlag,
    }),
    [isEnableTestingFlag]
  );
};


// NOTAS BASICAS DE EJEMPLO:
// para definir la clave de la feature flag ponerla en ./types.ts
// const isEnableTestingFlag = useFeatureValue(FeatureFlags.KEY, "defaultValue");
// para usar el hook en un componente
// const { isEnableTestingFlag } = useFeatureFlags();
