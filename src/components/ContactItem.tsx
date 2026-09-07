type ContactProps = {
  id: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  notes: string;
};

export default function ContactItem(contact: ContactProps) {
  const firstLetterName = contact.name
    ? contact.name.charAt(0).toUpperCase()
    : "";
  const firstLetterSurname = contact.surname
    ? contact.surname.charAt(0).toUpperCase()
    : "";

  return (
    <div className="flex hover:bg-[#f9eae3] hover:cursor-pointer items-center gap-x-2.5 py-3 px-5">
      <div className="relative bg-[#f1ddd0]  w-10 h-10 text-[#d4541e] rounded-full">
        <p className="absolute top-[50%] left-[50%] translate-[-50%]">
          {firstLetterName}
          {firstLetterSurname}
        </p>
      </div>
      <div>
        <h2>
          {contact.name} {contact.surname}
        </h2>
        <span className="grey">{contact.phone}</span>
      </div>
    </div>
  );
}
