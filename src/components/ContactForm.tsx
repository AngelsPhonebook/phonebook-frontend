import { useDispatch, useSelector } from "react-redux";
import type { ContactProps } from "../type/typeUser";
import Input from "./Input";
import { closeModal, openModal } from "../features/modalSlice";
import { createPortal } from "react-dom";
import { useState } from "react";
import { fetchUpdateContact } from "../features/contactsSlice";
import type { AppDispatch } from "../store";
import { chooseUser } from "../features/userSlice";

export default function ContactForm() {
  const dispatch = useDispatch<AppDispatch>();
  const contact = useSelector((state) => state.modalWindow.user);
  const [updateUser, setUpdateUser] = useState<ContactProps>(contact);

  return createPortal(
    <div
      className="fixed flex justify-center items-center top-0 w-full h-full backdrop-blur-xs bg-[rgba(0,0,0,0.3)] z-200 "
      onClick={() => dispatch(closeModal())}
    >
      <div
        className="bg-white w-120 py-9 px-8 flex flex-col gap-7 rounded-2xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1>Изменить информацию</h1>
        <div className="flex flex-col gap-y-5">
          <Input
            nameInfo="firstName"
            info={updateUser.firstName}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, firstName: e.target.value })
            }
          ></Input>
          <Input
            nameInfo="surName"
            info={updateUser.surName}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, surName: e.target.value })
            }
          ></Input>
          <Input
            nameInfo="number"
            info={updateUser.phone}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, phone: e.target.value })
            }
          ></Input>
          <Input
            nameInfo="email"
            info={updateUser.email}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, email: e.target.value })
            }
          ></Input>
        </div>
        <div className="flex gap-4 justify-end">
          <button
            className=" bg-[#efe9e0]  cursor-pointer px-3 py-2 rounded-4xl text-black hover:shadow-[0_0_7px_rgba(0,0,0,0.3)]"
            onClick={() => dispatch(closeModal())}
          >
            Отмена
          </button>
          <button
            className="border border-red-700 bg-red-700 px-3 py-2 rounded-4xl text-white cursor-pointer hover:shadow-[0_0_7px_rgba(0,0,0,0.3)]"
            onClick={() => {
              dispatch(fetchUpdateContact(updateUser));
              dispatch(closeModal());
              dispatch(chooseUser(updateUser));
            }}
          >
            Сохранить изменения
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
