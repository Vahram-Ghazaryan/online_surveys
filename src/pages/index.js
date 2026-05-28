import { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  LineChart
} from 'recharts';
import Link from 'next/link';

export default function Home() {
  const [stats, setStats] = useState({ questions: 0, participants: 0, results: 0 });
  const [categoryData, setCategoryData] = useState([]);
  const [topParticipantsData, setTopParticipantsData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [qRes, pRes, rRes] = await Promise.all([
          fetch('/api/questions'),
          fetch('/api/participants'),
          fetch('/api/results')
        ]);

        if (qRes.ok && pRes.ok && rRes.ok) {
          const questions = await qRes.json();
          const participants = await pRes.json();
          const results = await rRes.json();

          setStats({
            questions: questions.length,
            participants: participants.length,
            results: results.length
          });

          const categoryCount = questions.reduce((acc, q) => {
            const label = q.category || 'Ընդհանուր';
            acc[label] = (acc[label] || 0) + 1;
            return acc;
          }, {});
          const catData = Object.keys(categoryCount).map(key => ({ name: key, value: categoryCount[key] }));
          setCategoryData(catData);

          const partCount = results.reduce((acc, r) => {
            const name = r.participant ? (r.participant.fullName.split(' ')[0]) : `ID: ${r.participantId}`;
            acc[name] = (acc[name] || 0) + 1;
            return acc;
          }, {});

          const topPartData = Object.keys(partCount)
            .map(key => ({ name: key, count: partCount[key] }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 7);

          setTopParticipantsData(topPartData);
        }
      } catch (e) {
        console.error("Failed to load dashboard data", e);
      }
    };

    fetchDashboardData();
  }, []);

  const COLORS = ['#4f46e5', '#ec4899', '#10b981', '#f59e0b'];

  return (
    <div>
      <div className="page-header">
        <h1>Առցանց Հարցումների Վահանակ (Dashboard)</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <Link href="/questions" style={{ padding: '2rem', background: '#eef2ff', borderRadius: 'var(--radius-lg)', border: '1px solid #c7d2fe', transition: 'transform 0.2s', cursor: 'pointer', textDecoration: 'none' }} className="hover-card">
          <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.25rem', textDecoration: 'none' }}>Ընդհանուր Հարցեր</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4f46e5' }}>{stats.questions}</p>
        </Link>
        <Link href="/participants" style={{ padding: '2rem', background: '#fdf2f8', borderRadius: 'var(--radius-lg)', border: '1px solid #fbcfe8', transition: 'transform 0.2s', cursor: 'pointer', textDecoration: 'none' }} className="hover-card">
          <h3 style={{ color: 'var(--secondary)', marginBottom: '0.5rem', fontSize: '1.25rem', textDecoration: 'none' }}>Մասնակիցներ</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ec4899' }}>{stats.participants}</p>
        </Link>
        <Link href="/results" style={{ padding: '2rem', background: '#f0fdf4', borderRadius: 'var(--radius-lg)', border: '1px solid #bbf7d0', transition: 'transform 0.2s', cursor: 'pointer', textDecoration: 'none' }} className="hover-card">
          <h3 style={{ color: 'var(--success)', marginBottom: '0.5rem', fontSize: '1.25rem', textDecoration: 'none' }}>Արդյունքներ (Պատասխաններ)</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981' }}>{stats.results}</p>
        </Link>
      </div>

      <style>{`
        .hover-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
      `}</style>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>

        <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', fontSize: '1.25rem' }}>Հարցերի Կատեգորիաներ</h3>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', fontSize: '1.25rem' }}>Ամենաակտիվ Մասնակիցները</h3>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <BarChart data={topParticipantsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                <Bar dataKey="count" fill="var(--primary)" name="Պատասխանների քանակ" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
