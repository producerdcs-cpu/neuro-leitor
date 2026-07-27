import { useEffect, useState } from "react";
import { checkHealth, type HealthStatus } from "@/services/api";

export function useApiHealth(pollMs = 15000) {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      const h = await checkHealth();
      if (!cancelled) {
        setHealth(h);
        setLoading(false);
      }
    };
    tick();
    const id = setInterval(tick, pollMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [pollMs]);

  return {
    health,
    loading,
    online: !!health?.ok,
    providers: health?.providers,
  };
}
