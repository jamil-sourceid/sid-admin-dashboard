import React from 'react';
import './style.css';
import { Skeleton } from 'antd';

interface TableSkeletonProps {
  rowCount?: number;
  columnCount?: number;
  loading?: boolean;
  emptyText?: string;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rowCount = 5,
  columnCount = 4,
  loading = false,
  emptyText = 'No data available',
}) => {
  if (!loading) {
    return (
      <tbody>
        <tr>
          <td colSpan={columnCount} className="empty-state">
            <div className="empty-text">{emptyText}</div>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="skeleton-body">
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <tr key={`row-${rowIndex}`}>
          {Array.from({ length: columnCount }).map((_, colIndex) => (
            <td key={`cell-${rowIndex}-${colIndex}`}>
              <Skeleton.Button active size="small" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableSkeleton;
