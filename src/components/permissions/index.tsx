"use client";

import React, { ReactNode, useEffect, useState, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { menuItems } from "@/layouts/dashboard-layout/components/sidebar";
import Page401 from "@/app/_401";

interface HasPermissionProps {
  permissions: string[]; // Array of required permission slugs
  children: ReactNode; // React children
}

export const HasPermission: React.FC<HasPermissionProps> = ({
  permissions: requiredPermissions,
  children,
}) => {
  if (typeof window === "undefined") return null; // Prevent errors during SSR

  const storedPermissions = sessionStorage.getItem("permissions");
  const userPermissions = storedPermissions
    ? JSON.parse(storedPermissions)
    : [];

  const hasPermission = requiredPermissions.some((perm) =>
    userPermissions.includes(perm)
  );

  if (!hasPermission) return null;
  return children;
};

export const withAuth = <P extends object>(
  Component: ComponentType<P>,
  requiredPermissions: string[] = []
) => {
  const WrappedComponent = (props: P) => {
    const router = useRouter();
    const [userPermissions, setUserPermissions] = useState<string[] | null>(
      null
    );

    useEffect(() => {
      const authToken = sessionStorage.getItem("authToken");

      if (!authToken) {
        router.push("/");
        return;
      }

      const storedPermissions = sessionStorage.getItem("permissions");
      setUserPermissions(
        storedPermissions ? JSON.parse(storedPermissions) : []
      );
    }, [router]);

    if (userPermissions === null) return null; // Prevents hydration mismatch

    const hasAccess =
      requiredPermissions.length === 0 ||
      userPermissions.some((perm) => requiredPermissions.includes(perm));

    return hasAccess ? <Component {...props} /> : <Page401 />;
  };

  WrappedComponent.displayName = `WithAuth(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};

const possibleRedirects = [
  "/dashboard",
  "/dashboard/modules/kyc",
  "/dashboard/modules/kyb",
  "/dashboard/role-management",
  "/dashboard/logs/audit-log",
  "/dashboard/logs/api-log",
];

export const handleRedirect = () => {
  if (typeof window === "undefined") return null; // Prevent errors during SSR

  const storedPermissions = sessionStorage.getItem("permissions");
  const userPermissions = storedPermissions
    ? JSON.parse(storedPermissions)
    : [];

  // Flatten menu structure and extract paths with permissions
  const accessiblePaths = menuItems.flatMap(
    (item) =>
      item.items && item.items.length > 0
        ? item.items // Extract subitems if present
        : item.path
        ? [item] // Keep item if it has a direct path
        : [] // Ignore items with no path
  );

  // Find the first matching path the user has access to
  for (const path of possibleRedirects) {
    const pagePermissions =
      accessiblePaths.find((item) => item.path === path)?.permissions || [];
    if (pagePermissions.some((perm) => userPermissions.includes(perm))) {
      window.location.replace(path);
      return;
    }
  }

  window.location.replace("/dashboard/profile");
};
