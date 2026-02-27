"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter } from 'lucide-react';

const CATEGORIES = [
  { value: '', label: '- Tất cả thể loại -' },
  { value: 'hanh-dong', label: 'Hành Động' },
  { value: 'tinh-cam', label: 'Tình Cảm' },
  { value: 'hai-huoc', label: 'Hài Hước' },
  { value: 'kinh-di', label: 'Kinh Dị' },
  { value: 'tam-ly', label: 'Tâm Lý' },
  { value: 'vien-tuong', label: 'Viễn Tưởng' },
  { value: 'hoat-hinh', label: 'Hoạt Hình' },
];

const COUNTRIES = [
  { value: '', label: '- Tất cả quốc gia -' },
  { value: 'han-quoc', label: 'Hàn Quốc' },
  { value: 'trung-quoc', label: 'Trung Quốc' },
  { value: 'au-my', label: 'Âu Mỹ' },
  { value: 'nhat-ban', label: 'Nhật Bản' },
  { value: 'thai-lan', label: 'Thái Lan' },
];

const YEARS = [
  { value: '', label: '- Tất cả năm -' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
];

const TYPES = [
  { value: '', label: '- Tất cả định dạng -' },
  { value: 'phim-bo', label: 'Phim Bộ' },
  { value: 'phim-le', label: 'Phim Lẻ' },
  { value: 'hoat-hinh', label: 'Hoạt Hình' },
  { value: 'tv-shows', label: 'TV Shows' },
];

const SORTS = [
  { value: 'modified|desc', label: 'Mới cập nhật' },
  { value: 'year|desc', label: 'Năm xuất bản' },
  { value: 'view|desc', label: 'Lượt xem nhiều' },
];

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [country, setCountry] = useState(searchParams.get('country') || '');
  const [year, setYear] = useState(searchParams.get('year') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  
  const sortParam = `${searchParams.get('sortField') || 'modified'}|${searchParams.get('sortType') || 'desc'}`;
  const [sort, setSort] = useState(SORTS.some(s => s.value === sortParam) ? sortParam : 'modified|desc');

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (country) params.set('country', country);
    if (year) params.set('year', year);
    if (type) params.set('type', type);
    
    const [sortField, sortType] = sort.split('|');
    if (sortField) params.set('sortField', sortField);
    if (sortType) params.set('sortType', sortType);

    params.set('q', searchParams.get('q') || ''); // preserve search query if any

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="bg-mecha-surface/40 border border-white/5 rounded-lg p-4 flex flex-col md:flex-row gap-3 items-center mb-8 backdrop-blur-md">
      <div className="flex items-center gap-2 text-mecha-accent shrink-0 font-black uppercase tracking-widest text-sm mr-2 w-full md:w-auto">
        <Filter size={18} /> Lọc Phim
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 w-full">
        <select 
          value={type} onChange={(e) => setType(e.target.value)}
          className="bg-mecha-dark text-mecha-light border border-white/10 rounded px-3 py-2 text-sm focus:border-mecha-accent outline-none appearance-none cursor-pointer"
        >
          {TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>

        <select 
          value={category} onChange={(e) => setCategory(e.target.value)}
          className="bg-mecha-dark text-mecha-light border border-white/10 rounded px-3 py-2 text-sm focus:border-mecha-accent outline-none appearance-none cursor-pointer"
        >
          {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>

        <select 
          value={country} onChange={(e) => setCountry(e.target.value)}
          className="bg-mecha-dark text-mecha-light border border-white/10 rounded px-3 py-2 text-sm focus:border-mecha-accent outline-none appearance-none cursor-pointer"
        >
          {COUNTRIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>

        <select 
          value={year} onChange={(e) => setYear(e.target.value)}
          className="bg-mecha-dark text-mecha-light border border-white/10 rounded px-3 py-2 text-sm focus:border-mecha-accent outline-none appearance-none cursor-pointer"
        >
          {YEARS.map(y => <option key={y.value} value={y.value}>{y.label}</option>)}
        </select>

        <select 
          value={sort} onChange={(e) => setSort(e.target.value)}
          className="bg-mecha-dark text-mecha-light border border-white/10 rounded px-3 py-2 text-sm focus:border-mecha-accent outline-none appearance-none cursor-pointer"
        >
          {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      <button 
        onClick={handleFilter}
        className="w-full md:w-auto shrink-0 bg-mecha-accent text-mecha-dark font-black tracking-widest uppercase px-6 py-2 rounded text-sm hover:bg-mecha-light transition-colors mt-3 md:mt-0"
      >
        Lọc
      </button>
    </div>
  );
}
