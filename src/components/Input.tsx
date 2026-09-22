export default function Input({
  nameInfo,
  info,
}: {
  nameInfo: string;
  info: string | number;
}) {
  return (
    <div className="flex flex-col gap-y-1">
      <h3 className="uppercase">{nameInfo}</h3>
      <input
        className="w-full bg-[#efe9e0] px-5 py-2.5 rounded-xl border border-[#e6d8ca]"
        value={info}
        readOnly
      />
    </div>
  );
}
