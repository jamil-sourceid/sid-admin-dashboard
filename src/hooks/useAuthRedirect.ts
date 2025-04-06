"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuthRedirect() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");

    if (!authToken) {
      router.push("/"); // Redirect to login
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  return isAuthenticated;
}
