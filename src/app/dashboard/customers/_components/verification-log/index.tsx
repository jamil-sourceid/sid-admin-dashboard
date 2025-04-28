"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tag, Empty, Skeleton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './style.css';
import { useParams } from 'next/navigation';
import {
  selectVerificationLogs,
  selectVerificationLogsLoading,
} from '@/store/customers/selectors';
import { fetchVerificationLogsRequest } from '@/store/customers/actions';
import { VerificationLog as VerificationLogType } from '@/store/customers/types';
import { AppDispatch } from '@/store';

const VerificationLog: React.FC = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const dispatch = useDispatch<AppDispatch>();

  const logs = useSelector(selectVerificationLogs) as VerificationLogType[];
  const loading = useSelector(selectVerificationLogsLoading) as boolean;

  useEffect(() => {
    if (id) {
      dispatch(fetchVerificationLogsRequest(id));
    }
  }, [id, dispatch]);

  const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const statusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'success';
      case 'failed':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const columns: ColumnsType<VerificationLogType> = [
    {
      title: 'Date & Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => formatDate(text),
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      defaultSortOrder: 'descend',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      filters: [...new Set(logs.map((log) => log.action))].map((action) => ({
        text: action,
        value: action,
      })),
      onFilter: (value, record) => record.action === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={statusColor(status)}>{status.toUpperCase()}</Tag>,
      filters: [...new Set(logs.map((log) => log.status))].map((status) => ({
        text: status,
        value: status,
      })),
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  if (!logs || logs.length === 0) {
    return (
      <Empty description="No verification logs found for this customer" className="empty-state" />
    );
  }

  return (
    <div className="verification-logs">
      <Table
        columns={columns}
        dataSource={logs.map((log) => ({ ...log, key: log._id }))}
        pagination={{ pageSize: 10 }}
        className="log-table"
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default VerificationLog;
