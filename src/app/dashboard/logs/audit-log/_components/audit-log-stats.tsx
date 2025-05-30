import React from "react";

interface LogPillProps {
  state: string;
  amount: string;
}

const LogPill: React.FC<LogPillProps> = ({ state, amount }) => (
  <div className="audit-pill">
    <h6 className="state">{state}</h6>
    <div className="space-y-3">
      <h4 className="amount">{amount}</h4>
    </div>
  </div>
);

export const AuditLogStats: React.FC = () => {
  const LogPillData = [
    { state: "Total Audit Actions", pillKey: "totalRevenue", amount: "145" },
    { state: "All Audit Logs", pillKey: "payment", amount: "80" },
    { state: "High-Priority Logs", pillKey: "overdue", amount: "27" },
  ];

  return (
    <div className="audit-pills">
      {LogPillData.map((data) => (
        <LogPill key={data.pillKey} state={data.state} amount={data.amount} />
      ))}
    </div>
  );
};
