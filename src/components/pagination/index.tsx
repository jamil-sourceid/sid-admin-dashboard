import React from 'react';
import './style.css';

import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';

import Back from '../../assets/icons/back.svg';

interface SourceIdPaginationProps {
  defaultCurrent?: number;
  total?: number;
  pageSize?: number;
  onChange?: (page: number, pageSize: number) => void;
}

const SourceIdPagination: React.FC<SourceIdPaginationProps> = ({
  defaultCurrent = 1,
  total = 0,
  pageSize = 10,
  onChange,
}) => {
  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <div className="previous">
          <img src={Back} alt="" />
          Previous
        </div>
      );
    }
    if (type === 'next') {
      return (
        <div className="next">
          Next
          <img src={Back} alt="" />
        </div>
      );
    }
    return originalElement;
  };

  return (
    <Pagination
      className="sourceid-pagination"
      defaultCurrent={defaultCurrent}
      total={total}
      pageSize={pageSize}
      onChange={onChange}
      onShowSizeChange={onChange}
      showSizeChanger
      itemRender={itemRender}
      style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
    />
  );
};

export default SourceIdPagination;
