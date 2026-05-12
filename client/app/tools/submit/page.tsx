'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Send, Plus } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';
import { useFeatures } from '@/hooks/useCategories';
import { useTags } from '@/hooks/useCategories';
import { useSubmitTool } from '@/hooks/useTools';
import { useCreateCategory, useCreateFeature, useCreateTag } from '@/hooks/useCreateEntities';
import { useAuth } from '@/context/AuthProvider';
import toast from 'react-hot-toast';

const PRICING_OPTS = [
  { value: 'Free',       label: 'Free' },
  { value: 'Freemium',   label: 'Freemium' },
  { value: 'Paid',       label: 'Paid' },
  { value: 'Enterprise', label: 'Enterprise' },
];

const generateSlug = (name: string) =>
  name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

const parseLines = (text: string) =>
  text.split('\n').map(l => l.trim().toLowerCase()).filter(Boolean).filter((v, i, arr) => arr.indexOf(v) === i);

export default function SubmitToolPage() {
  const router = useRouter();
  const { user } = useAuth();
  const submitTool      = useSubmitTool();
  const createCategory  = useCreateCategory();
  const createFeature   = useCreateFeature();
  const createTag       = useCreateTag();

  const { data: categoriesData } = useCategories();
  const { data: featuresData = [] } = useFeatures();
  const { data: tagsData = [] } = useTags();

  const [form, setForm] = useState({
    name: '', shortDescription: '', description: '',
    website: '', pricing: 'Free' as const,
    pricingDetails: '', categoryId: '', newCategoryName: '',
    featuresText: '', tagsText: '',
  });
  const [submitting, setSubmitting] = useState(false);

  async function resolveNames<T extends { _id: string; id: string; name: string }>(
    inputNames: string[], existing: T[], createFn: (name: string) => Promise<{ _id: string; id: string; name: string }>
  ): Promise<string[]> {
    const ids: string[] = [];
    for (const name of inputNames) {
      const found = existing.find(e => e.name.toLowerCase() === name);
      if (found) ids.push(found._id || found.id);
      else { const created = await createFn(name); ids.push(created._id || created.id); }
    }
    return ids;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.shortDescription || !form.website) { toast.error('Please fill in all required fields'); return; }
    if (!user) { toast.error('You must be logged in'); return; }
    const isNewCat = form.categoryId === '__new__';
    if (!form.categoryId || (isNewCat && !form.newCategoryName.trim())) { toast.error('Please select or enter a category'); return; }
    const slug = generateSlug(form.name);
    if (!slug) { toast.error('Tool name is invalid.'); return; }

    setSubmitting(true);
    try {
      let categoryId: string;
      if (isNewCat) { const nc = await createCategory.mutateAsync(form.newCategoryName.trim()); categoryId = nc._id || nc.id; }
      else categoryId = form.categoryId;

      const featureIds = await resolveNames(parseLines(form.featuresText), featuresData, n => createFeature.mutateAsync(n));
      const tagIds     = await resolveNames(parseLines(form.tagsText),     tagsData,     n => createTag.mutateAsync(n));

      await submitTool.mutateAsync({
        name: form.name.trim(), slug,
        shortDescription: form.shortDescription.trim(),
        description: form.description.trim() || '',
        website: form.website.trim(),
        pricing: form.pricing as any,
        pricingDetails: form.pricingDetails.trim() || '',
        categories: [categoryId] as any,
        features:   featureIds as any,
        tags:       tagIds as any,
        submittedBy: user._id as any,
      });
      toast.success('Tool submitted! Our team will review it.');
      router.push('/profile');
    } catch (err: any) {
      toast.error(err?.response?.data?.error?.message || 'Failed to submit tool');
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = 'w-full px-5 py-3.5 bg-[#F8F9FF] border border-[#E8EAFF] rounded-2xl focus:outline-none focus:border-[#2E4BC6] text-sm';
  const labelCls = 'block text-sm font-medium text-[#1B1464]/70 mb-2';

  return (
    <div className="min-h-screen bg-[#F8F9FF] pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <Link href="/tools" className="flex items-center gap-2 text-[#1B1464]/60 hover:text-[#2E4BC6] mb-8"><ArrowLeft size={18}/> Back to Tools</Link>
        <h1 className="text-4xl font-bold text-[#1B1464] mb-2">Submit an AI Tool</h1>
        <p className="text-[#1B1464]/60 mb-10">Share a great tool with the community. Our team will review it before publishing.</p>
        <div className="bg-white rounded-3xl shadow-sm border border-[#E8EAFF] p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div><label className={labelCls}>Tool Name <span className="text-red-500">*</span></label><input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Claude 3.5 Sonnet" className={inputCls} required/></div>
              <div><label className={labelCls}>Website URL <span className="text-red-500">*</span></label><input value={form.website} onChange={e => setForm(p => ({ ...p, website: e.target.value }))} placeholder="https://example.com" className={inputCls} required/></div>
            </div>
            <div><label className={labelCls}>Short Description <span className="text-red-500">*</span></label><input value={form.shortDescription} onChange={e => setForm(p => ({ ...p, shortDescription: e.target.value }))} maxLength={160} placeholder="One sentence that describes the tool" className={inputCls} required/></div>
            <div><label className={labelCls}>Full Description</label><textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={5} placeholder="Explain what the tool does..." className={`${inputCls} resize-y`}/></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelCls}>Category <span className="text-red-500">*</span></label>
                <select value={form.categoryId} onChange={e => setForm(p => ({ ...p, categoryId: e.target.value, newCategoryName: '' }))} className={inputCls} required>
                  <option value="">Select a category</option>
                  {categoriesData?.data?.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                  <option value="__new__">➕ Create new category…</option>
                </select>
                {form.categoryId === '__new__' && (
                  <div className="mt-3 flex items-center gap-2">
                    <Plus size={16} className="text-[#2E4BC6] shrink-0"/>
                    <input value={form.newCategoryName} onChange={e => setForm(p => ({ ...p, newCategoryName: e.target.value }))} placeholder="New category name" className={inputCls} autoFocus required/>
                  </div>
                )}
              </div>
              <div><label className={labelCls}>Pricing</label>
                <select value={form.pricing} onChange={e => setForm(p => ({ ...p, pricing: e.target.value as any }))} className={inputCls}>
                  {PRICING_OPTS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
              </div>
            </div>
            <div><label className={labelCls}>Pricing Details</label><input value={form.pricingDetails} onChange={e => setForm(p => ({ ...p, pricingDetails: e.target.value }))} placeholder="e.g. Free tier available • Pro at $19/month" className={inputCls}/></div>
            <div>
              <label className={labelCls}>Key Features</label>
              <p className="text-xs text-[#1B1464]/40 mb-2">One feature per line. Existing ones will be matched, new ones created.</p>
              <textarea value={form.featuresText} onChange={e => setForm(p => ({ ...p, featuresText: e.target.value }))} rows={5} placeholder={"API Access\nBrowser Extension\nTeam Collaboration"} className={`${inputCls} resize-y font-mono`}/>
              {parseLines(form.featuresText).length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {parseLines(form.featuresText).map(f => {
                    const exists = featuresData.some(e => e.name.toLowerCase() === f);
                    return <span key={f} className={`text-xs px-3 py-1 rounded-full border ${exists ? 'bg-green-50 border-green-200 text-green-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>{exists ? '✓' : '+'} {f}</span>;
                  })}
                </div>
              )}
            </div>
            <div>
              <label className={labelCls}>Tags</label>
              <p className="text-xs text-[#1B1464]/40 mb-2">One tag per line.</p>
              <textarea value={form.tagsText} onChange={e => setForm(p => ({ ...p, tagsText: e.target.value }))} rows={4} placeholder={"productivity\nnlp\nopen-source"} className={`${inputCls} resize-y font-mono`}/>
              {parseLines(form.tagsText).length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {parseLines(form.tagsText).map(t => {
                    const exists = tagsData.some(e => e.name.toLowerCase() === t);
                    return <span key={t} className={`text-xs px-3 py-1 rounded-full border ${exists ? 'bg-green-50 border-green-200 text-green-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>{exists ? '✓' : '+'} {t}</span>;
                  })}
                </div>
              )}
            </div>
            <button type="submit" disabled={submitting} className="w-full bg-linear-to-r from-[#2E4BC6] to-[#00C2CB] text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 hover:brightness-105 transition-all disabled:opacity-70">
              <Send size={20}/>{submitting ? 'Submitting…' : 'Submit Tool for Review'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
