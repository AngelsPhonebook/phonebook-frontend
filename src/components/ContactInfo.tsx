import { useDispatch } from "react-redux";
import type { ContactProps } from "../type/typeUser";
import { openModal } from "../features/modalSlice";
import { useState } from "react";
import type { AppDispatch } from "../store";
import { fetchDeleteUser, fetchUpdateNotes } from "../features/contactsSlice";
import { chooseUser, closeInfoUser } from "../features/userSlice";

export default function ContactInfo({ contact }: { contact: ContactProps }) {
  const firstLetterName = contact.firstName
    ? contact.firstName.charAt(0).toUpperCase()
    : "";
  const firstLetterSurname = contact.lastName
    ? contact.lastName.charAt(0).toUpperCase()
    : "";

  const dispatch = useDispatch<AppDispatch>();
  const [isChangedNotes, setIsChangeNotes] = useState(false);
  const [newNotes, setNewNotes] = useState(contact.notes);

  function toggleChangeNotes() {
    setIsChangeNotes((prev) => !prev);
  }

  return (
    <div className="w-full h-full sm:max-h-180 px-15 max-sm:px-8 flex flex-col gap-20 sm:justify-around max-sm:fixed max-sm:overflow-y-auto py-8 max-sm:top-0 max-sm:left-0 max-sm:bg-[#f7f3ee]">
      <div className="flex  max-sm:flex-col-reverse justify-between items-center gap-x-4 gap-y-8">
        <div className="flex max-sm:flex-col gap-5 items-center">
          <div className="relative font-bold w-20 h-20 max-sm:w-15 max-sm:h-15 bg-[#f1ddd0] text-[#684127] rounded-full">
            <h1 className="absolute top-[50%] left-[50%] translate-[-50%]">
              {firstLetterName}
              {firstLetterSurname}
            </h1>
          </div>
          <h1>
            {contact.firstName} {contact.lastName}
          </h1>
        </div>
        <div className="max-sm:w-full flex justify-between">
          <div
            className="sm:hidden w-10 h-10 flex items-center rounded-[50%] justify-center bg-white  shadow-[0px_0px_1.5px_rgba(0,0,0)] "
            onClick={() => dispatch(closeInfoUser())}
          >
            &#60;
          </div>
          <div className="flex gap-4">
            <button
              className="bg-white max-sm:w-full px-3 py-2 rounded-4xl shadow-[0px_0px_1px_rgba(0,0,0)] cursor-pointer hover:text-[#f1ddd0] hover:bg-[#684127]"
              onClick={() => dispatch(openModal(contact))}
            >
              Изменить
            </button>
            <button
              className="border max-sm:w-full border-red-700  px-3 py-2 rounded-4xl text-red-700 cursor-pointer hover:bg-red-700 hover:text-white"
              onClick={() => {
                dispatch(fetchDeleteUser(contact));
                dispatch(chooseUser(null));
              }}
            >
              Удалить
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-6 justify-center">
        <span className="uppercase text-[#8a7f72] text-[14px] tracking-widest">
          Contact Details
        </span>
        <div className="grid grid-cols sm:grid-cols-2 gap-y-8">
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
        <div className="flex justify-between ">
          <span className="uppercase text-[#8a7f72] text-[14px] tracking-widest">
            Notes
          </span>
          {isChangedNotes ? (
            <div className="flex gap-5">
              <button
                className="text-[#8a7f72] text-[14px] font-semibold cursor-pointer"
                onClick={() => {
                  toggleChangeNotes();
                  setNewNotes(contact.notes);
                }}
              >
                Отмена
              </button>
              <button
                className="text-[#d4541e] text-[14px] font-semibold cursor-pointer"
                onClick={async () => {
                  const updatedContact = await dispatch(
                    fetchUpdateNotes({ id: contact.id, notes: newNotes }),
                  ).unwrap();
                  dispatch(chooseUser(updatedContact));
                  toggleChangeNotes();
                }}
              >
                Сохранить
              </button>
            </div>
          ) : (
            <button
              className="text-[#d4541e] text-[14px] font-semibold cursor-pointer"
              onClick={() => toggleChangeNotes()}
            >
              Редактировать
            </button>
          )}
        </div>

        {isChangedNotes ? (
          <textarea
            rows={5}
            className="bg-[#fceadf] resize-none border-[#d4541e] border rounded-xl px-3 py-2 scrollbar-thin overflow-auto scrollbar-thumb-gray-800 focus:outline-0"
            onChange={(e) => setNewNotes(e.target.value)}
            value={newNotes}
          />
        ) : (
          <p>{contact.notes}</p>
        )}
      </div>
    </div>
  );
}
