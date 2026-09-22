import { useDispatch, useSelector } from "react-redux";
import type { ContactProps } from "../type/typeUser";
import ChangeInfoUser from "./ChangeInfoUser";
import { handleOpenModal } from "../features/modalSlice";

export default function ContactInfo(contact: ContactProps) {
  const firstLetterName = contact.firstName
    ? contact.firstName.charAt(0).toUpperCase()
    : "";
  const firstLetterSurname = contact.surName
    ? contact.surName.charAt(0).toUpperCase()
    : "";

  const isOpen = useSelector((state) => state.modalWindow.isOpen);
  const dispatch = useDispatch();

  return (
    <div className=" w-full h-full max-h-180 px-15 grid grid-cols-1 gap-2.5 justify-around">
      <div className="flex justify-between items-center ">
        <div className="flex gap-5 items-center">
          <div className="relative font-bold w-20 h-20 bg-[#f1ddd0] text-[#684127] rounded-full">
            <h1 className="absolute top-[50%] left-[50%] translate-[-50%]">
              {firstLetterName}
              {firstLetterSurname}
            </h1>
          </div>
          <h1>
            {contact.firstName} {contact.surName}
          </h1>
        </div>
        <div className="flex gap-4">
          <button
            className="bg-white px-3 py-2 rounded-4xl shadow-[0px_0px_1px_rgba(0,0,0)] cursor-pointer hover:text-[#f1ddd0] hover:bg-[#684127]"
            onClick={() => dispatch(handleOpenModal())}
          >
            Изменить
          </button>
          <button className="border border-red-700  px-3 py-2 rounded-4xl text-red-700 cursor-pointer hover:bg-red-700 hover:text-white">
            Удалить
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-y-6 justify-center">
        <span className="uppercase text-[#8a7f72] text-[14px] tracking-widest">
          Contact Details
        </span>
        <div className="grid grid-cols-2 gap-y-4">
          <div className="flex flex-col gap-2">
            <h3 className="uppercase">Phone</h3>
            <a href={`tel:${contact.phone}`} className="text-red-600">
              {contact.phone}
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="uppercase">Email</h3>
            <span>{contact.email}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-6 pt-5">
        <span className="uppercase text-[#8a7f72] text-[14px] tracking-widest">
          Notes
        </span>
        <p>{contact.notes}</p>
      </div>
      {isOpen && <ChangeInfoUser {...contact}></ChangeInfoUser>}
    </div>
  );
}
