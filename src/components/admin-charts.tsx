"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const DEEP = "#1f6f5f";
const TEAL = "#2fa084";
const MINT = "#6fcf97";

export function StudentsByClassChart({
  data,
}: {
  data: { name: string; count: number }[];
}) {
  return (
    <div className="rounded-3xl bg-surface p-6 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
      <h3 className="font-display text-lg font-semibold text-ink">Students by class</h3>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#13302999" }} interval={0} angle={-25} textAnchor="end" height={50} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#13302999" }} />
            <Tooltip cursor={{ fill: "#6fcf9722" }} />
            <Bar dataKey="count" fill={TEAL} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function FeesChart({
  paid,
  outstanding,
}: {
  paid: number;
  outstanding: number;
}) {
  const data = [
    { name: "Collected", value: paid },
    { name: "Outstanding", value: outstanding },
  ];
  const empty = paid === 0 && outstanding === 0;

  return (
    <div className="rounded-3xl bg-surface p-6 shadow-[0_10px_40px_rgba(19,48,41,0.05)]">
      <h3 className="font-display text-lg font-semibold text-ink">Fees overview</h3>
      <div className="mt-4 h-64">
        {empty ? (
          <div className="flex h-full items-center justify-center font-sans text-sm text-ink/50">
            No fee data yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                <Cell fill={DEEP} />
                <Cell fill={MINT} />
              </Pie>
              <Tooltip formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
