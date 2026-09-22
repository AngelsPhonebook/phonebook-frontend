import type { ContactProps } from "../type/typeUser";

type Contact = {
  contact: ContactProps;
  onClick: () => void;
};

export default function ContactItem({ contact, onClick }: Contact) {
  const firstLetterName = contact.firstName
    ? contact.firstName.charAt(0).toUpperCase()
    : "";
  const firstLetterSurname = contact.surName
    ? contact.surName.charAt(0).toUpperCase()
    : "";

  return (
    <div
      onClick={onClick}
      className="flex hover:bg-[#f9eae3] hover:cursor-pointer items-center gap-x-2.5 py-3 px-5"
    >
      <div className="relative bg-[#f1ddd0]  w-10 h-10 text-[#d4541e] rounded-full">
        <p className="absolute top-[50%] left-[50%] translate-[-50%]">
          {firstLetterName}
          {firstLetterSurname}
        </p>
      </div>
      <div>
        <h2>
          {contact.firstName} {contact.surName}
        </h2>
        <span className="text-gray-500 text-xs">{contact.phone}</span>
      </div>
    </div>
  );
}
