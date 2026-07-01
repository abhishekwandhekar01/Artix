"use client";

import { useEffect, useState } from "react";

/** True after the component has mounted — use to defer client-only animations. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
