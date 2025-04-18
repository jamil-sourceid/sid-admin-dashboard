/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import "./style.css";
import { Drawer, Badge } from "antd";
import { NotificationCardProps, NotificationProps } from "./model";
import { formatDate } from "@/helpers";

const NotificationCard: React.FC<NotificationCardProps> = ({
  id,
  title,
  description,
  onViewChanges,
  type,
  createdAt,
}) => {
  return (
    <div className="rounded-lg p-3 flex gap-4 items-start animate-fadeIn notification-card">
      <img src="/assets/icons/bell.svg" alt="" className="w-6 h-6" />
      <div className="flex-1">
        <h6 className="font-medium text-gray-900">{title}</h6>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
        {type !== "onboarding" && (
          <div className="flex gap-4 my-2">
            <button className="font-bold text-[#535862] hover:text-gray-900 transition-colors">
              Dismiss
            </button>
            <button
              onClick={(): void => onViewChanges(id)}
              className="font-bold text-[#231E54] hover:text-blue-700 transition-colors"
            >
              View changes
            </button>
          </div>
        )}
        <h6 className="text-sm">{formatDate(createdAt)}</h6>
      </div>
    </div>
  );
};

const NotificationDrawer: React.FC<NotificationProps> = ({
  open,
  loading,
  close,
}) => {
  const handleViewChanges = (id: number): void => {
    console.log(`Viewing changes for notification ${id}`);
  };

  const notifications = [
    {
      _id: "1",
      title: "New Feature Update",
      content: "We have added a new feature to your dashboard.",
      type: "feature",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      title: "Scheduled Maintenance",
      content: "Our system will be down for maintenance on Sunday.",
      type: "maintenance",
      createdAt: new Date().toISOString(),
    },
  ];

  return (
    <Drawer
      closable
      destroyOnClose
      className="notification-drawer"
      title={
        <div className="flex items-center gap-1.5">
          <p className="font-bold text-lg text-gray-900">Notifications</p>
          <Badge />
        </div>
      }
      placement="right"
      open={open}
      loading={loading}
      onClose={close}
      width={450}
    >
      {notifications.length > 0 ? (
        <div className="my-3 flex flex-col gap-4">
          <div className="notification-card-container">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification._id}
                id={Number(notification._id)}
                title={notification.title}
                description={notification.content}
                onViewChanges={handleViewChanges}
                type={notification.type}
                createdAt={notification.createdAt}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No notifications at the moment.
        </div>
      )}
    </Drawer>
  );
};

export default NotificationDrawer;
