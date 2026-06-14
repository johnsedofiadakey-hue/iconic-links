'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16'];

export default function WasteChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
        <XAxis 
          type="number"
          tick={{ fontSize: 12, fill: '#6B7280' }} 
          tickLine={false} 
          axisLine={false}
        />
        <YAxis 
          dataKey="name" 
          type="category"
          width={100}
          tick={{ fontSize: 12, fill: '#374151', fontWeight: 500 }} 
          tickLine={false} 
          axisLine={false}
        />
        <Tooltip 
          cursor={{ fill: '#F3F4F6' }}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          formatter={(value: any) => [value, 'Wastage Units']}
        />
        <Bar dataKey="wastage" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
