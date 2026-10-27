export default function Input({
  nameInfo,
  info,
  onChange,
}: {
  nameInfo: string;
  info: string | number;
  onChange: (inputEvent: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-y-1">
      <h3 className="uppercase">{nameInfo}</h3>
      <input
        className="w-full bg-[#efe9e0] px-5 py-2.5 max-sm:px-2.5 max-sm:py-1.5 text-[14px] rounded-xl max-sm:rounded-xs border border-[#e6d8ca]"
        value={info}
        onChange={onChange}
      />
    </div>
  );
}
