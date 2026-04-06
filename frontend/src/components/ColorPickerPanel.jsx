import { HexColorPicker } from "react-colorful";

const ColorPickerPanel = ({ value, onChange }) => (
  <div className="glass rounded-xl p-4">
    <p className="mb-2 text-sm font-semibold">Accent Color</p>
    <HexColorPicker color={value} onChange={onChange} style={{ width: "100%" }} />
    <p className="mt-2 text-xs text-slate-300">{value}</p>
  </div>
);

export default ColorPickerPanel;