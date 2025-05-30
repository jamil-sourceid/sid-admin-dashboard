"use client";

import React from "react";
import { Modal } from "antd";

interface LogsModalProps {
  open: boolean;
  closeModal: () => void;
  objectBeforeUpdate: Record<string, unknown>;
  objectAfterUpdate: Record<string, unknown>;
}

const LogsModal: React.FC<LogsModalProps> = ({
  open,
  closeModal,
  objectAfterUpdate,
  objectBeforeUpdate,
}) => {
  const formattedBefore = JSON.stringify(objectBeforeUpdate, null, 2);
  const formattedAfter = JSON.stringify(objectAfterUpdate, null, 2);

  const beforeLines = formattedBefore.split("\n");
  const afterLines = formattedAfter.split("\n");

  const renderHighlightedJSON = (
    lines: string[],
    compareLines: string[],
    isBeforeObject: boolean
  ): React.ReactNode[] => {
    const findDifferences = (): string[] => {
      const diffPaths: string[] = [];

      const compareObjects = (
        obj1: Record<string, unknown>,
        obj2: Record<string, unknown>,
        path = ""
      ): void => {
        for (const key in obj1) {
          const currentPath = path ? `${path}.${key}` : key;

          if (!(key in obj2)) {
            diffPaths.push(currentPath);
            continue;
          }

          if (
            typeof obj1[key] !== typeof obj2[key] ||
            (typeof obj1[key] !== "object" && obj1[key] !== obj2[key])
          ) {
            diffPaths.push(currentPath);
            continue;
          }

          if (
            typeof obj1[key] === "object" &&
            obj1[key] !== null &&
            typeof obj2[key] === "object" &&
            obj2[key] !== null
          ) {
            compareObjects(
              obj1[key] as Record<string, unknown>,
              obj2[key] as Record<string, unknown>,
              currentPath
            );
          }
        }

        for (const key in obj2) {
          const currentPath = path ? `${path}.${key}` : key;
          if (!(key in obj1)) {
            diffPaths.push(currentPath);
          }
        }
      };

      compareObjects(
        isBeforeObject ? objectBeforeUpdate : objectAfterUpdate,
        isBeforeObject ? objectAfterUpdate : objectBeforeUpdate
      );

      return diffPaths;
    };

    const differencesPaths = findDifferences();

    const shouldHighlight = (line: string, index: number): boolean => {
      if (["{", "}", "  {", "  }"].includes(line.trim())) {
        return false;
      }

      const keyMatch = line.match(/"([^"]+)":/);
      if (!keyMatch) return false;

      const key = keyMatch[1];

      const indentCount = line.search(/\S|$/);
      const indentLevel = indentCount / 2;

      let currentPath = key;
      let parentPath = "";
      let nestLevel = indentLevel - 1;

      for (let i = index - 1; i >= 0 && nestLevel >= 0; i--) {
        const parentLine = lines[i];
        const parentKeyMatch = parentLine.match(/"([^"]+)":/);

        if (!parentKeyMatch) continue;

        const parentIndent = parentLine.search(/\S|$/);
        const parentLevel = parentIndent / 2;

        if (parentLevel === nestLevel) {
          if (nestLevel === 0) {
            parentPath = parentKeyMatch[1];
          } else {
            parentPath = `${parentKeyMatch[1]}.${parentPath}`;
          }
          nestLevel--;
        }
      }

      currentPath = parentPath ? `${parentPath}.${key}` : key;

      return differencesPaths.some((diffPath: string) => {
        return (
          diffPath === currentPath ||
          (diffPath.startsWith(currentPath) &&
            diffPath.charAt(currentPath.length) === ".")
        );
      });
    };

    return lines.map((line, index) => {
      const isChanged = shouldHighlight(line, index);

      const bgColor = isChanged
        ? isBeforeObject
          ? "bg-red-200"
          : "bg-green-200"
        : "";

      return (
        <div key={index} className={`${bgColor}`}>
          {line}
        </div>
      );
    });
  };

  return (
    <Modal
      open={open}
      centered
      footer={null}
      onCancel={closeModal}
      width={1300}
      className="logs"
    >
      <div className="p-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Before Update:</h3>
            <pre className="bg-gray-200 p-5 rounded-md text-sm overflow-auto max-h-[70vh]">
              {renderHighlightedJSON(beforeLines, afterLines, true)}
            </pre>
          </div>

          <div className="p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">After Update:</h3>
            <pre className="bg-gray-200 p-5 rounded-md text-sm overflow-auto max-h-[70vh]">
              {renderHighlightedJSON(afterLines, beforeLines, false)}
            </pre>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LogsModal;
