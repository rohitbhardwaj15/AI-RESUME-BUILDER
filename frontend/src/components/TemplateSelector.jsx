const TemplateSelector = ({ value, onChange }) => (
  <div className="glass rounded-xl p-4">
    <label className="mb-2 block text-sm font-semibold">Template</label>
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm">
      <option value="aurora">Aurora Pro</option>
      <option value="minimal">Minimal Edge</option>
    </select>
  </div>
);

export default TemplateSelector;