export interface NotificationProps {
  open: boolean;
  loading?: boolean;
  close: () => void;
}

interface NotificationItem {
  id: number;
  title: string;
  description: string;
}

export interface NotificationCardProps extends NotificationItem {
  onViewChanges: (id: number) => void;
  type: string;
  createdAt: string;
}
