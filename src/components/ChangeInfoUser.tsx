import { useDispatch } from "react-redux";
import type { ContactProps } from "../type/typeUser";
import Input from "./Input";
import { handleOpenModal } from "../features/modalSlice";
import { createPortal } from "react-dom";

export default function ChangeInfoUser(contact: ContactProps) {
  const dispatch = useDispatch();

  return createPortal(
    <div
      className="fixed flex justify-center items-center top-0 w-full h-full backdrop-blur-xs bg-[rgba(0,0,0,0.3)] z-200 "
      onClick={() => dispatch(handleOpenModal())}
    >
      <div
        className="bg-white w-120 py-9 px-8 flex flex-col gap-7 rounded-2xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1>Изменить информацию</h1>
        <div className="flex flex-col gap-y-5">
          <Input nameInfo="name" info={contact.firstName}></Input>
          <Input nameInfo="number" info={contact.phone}></Input>
          <Input nameInfo="email" info={contact.email}></Input>
        </div>
        <div className="flex gap-4 justify-end">
          <button
            className=" bg-[#efe9e0]  cursor-pointer px-3 py-2 rounded-4xl text-black hover:shadow-[0_0_7px_rgba(0,0,0,0.3)]"
            onClick={() => dispatch(handleOpenModal())}
          >
            Отмена
          </button>
          <button className="border border-red-700 bg-red-700 px-3 py-2 rounded-4xl text-white cursor-pointer hover:shadow-[0_0_7px_rgba(0,0,0,0.3)]">
            Сохранить изменения
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
