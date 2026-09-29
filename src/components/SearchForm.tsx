export default function SearchForm({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  return (
    <div className="py-3 px-5">
      <input
        className="w-full bg-[#efe9e0] px-5 py-1.5 rounded-4xl border border-[#e6d8ca]"
        onChange={(e) => onChange(e.target.value.toLowerCase())}
        placeholder="Поиск"
      />
    </div>
  );
}
