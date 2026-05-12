'use client';
import { useEffect, useState } from 'react';
import { toolsService }      from '@/services/toolsService';
import { categoriesService } from '@/services/categoriesService';
import { reviewsService }    from '@/services/reviewsService';
import { authService }       from '@/services/authService';

export default function DebugPage() {
  const [results, setResults] = useState<Record<string, any>>({});

  const test = async (label: string, fn: () => Promise<any>) => {
    try {
      const data = await fn();
      setResults(prev => ({ ...prev, [label]: { ok: true, data } }));
    } catch (err: any) {
      setResults(prev => ({ ...prev, [label]: { ok: false, error: err.message ?? String(err) } }));
    }
  };

  useEffect(() => {
    test('1. categories',        () => categoriesService.getAll());
    test('2. tools (all)',        () => toolsService.getTools());
    test('3. featured tools',     () => toolsService.getFeaturedTools(3));
    test('4. tool by slug',       () => toolsService.getToolBySlug('chatgpt'));
    test('5. reviews for chatgpt',() => reviewsService.getByTool('tool-1'));
    test('6. auth login (demo)',  () => authService.login({ identifier: 'demo@ainavix.ai', password: 'demo123456' }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 p-8 font-mono text-sm">
      <h1 className="text-2xl font-bold mb-2">Static DB Debug</h1>
      <p className="text-gray-500 mb-6">All data comes from <code className="bg-gray-200 px-1 rounded">client/db/</code> — no server needed.</p>
      {Object.keys(results).length === 0 && <p className="text-gray-400 animate-pulse">Running checks...</p>}
      {Object.entries(results).map(([label, result]) => (
        <div key={label} className={`mb-4 p-4 rounded-lg border ${result.ok ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <p className={`font-bold mb-2 ${result.ok ? 'text-green-700' : 'text-red-700'}`}>
            {result.ok ? '✅' : '❌'} {label}
          </p>
          <pre className="text-xs overflow-auto max-h-40 bg-white/60 p-2 rounded">
            {JSON.stringify(result.ok ? result.data : { error: result.error }, null, 2)}
          </pre>
        </div>
      ))}
    </div>
  );
}
