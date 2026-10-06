import { useDispatch, useSelector } from "react-redux";
import type { ContactProps } from "../type/typeUser";
import Input from "./Input";
import { closeModal } from "../features/modalSlice";
import { createPortal } from "react-dom";
import { useState } from "react";
import { fetchAddUser, fetchUpdateContact } from "../features/contactsSlice";
import type { AppDispatch, RootState } from "../store";
import { chooseUser } from "../features/userSlice";

export default function ContactForm() {
  const dispatch = useDispatch<AppDispatch>();
  const contact = useSelector((state: RootState) => state.modalWindow.user);
  const [updateUser, setUpdateUser] = useState<ContactProps>(
    () =>
      contact ?? {
        id: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        notes: "",
      },
  );
  const [errorText, setErrorText] = useState({ firstName: "", phone: "" });

  const nameRegex = /^[А-Яа-яA-Za-zЁё-]/;
  const numberRegex = /^\+?[0-9\s()-]+$/;

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
        <div className="flex flex-col gap-y-4">
          <h1>Изменить информацию</h1>
          <div>
            <Input
              nameInfo="firstName"
              info={updateUser.firstName}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, firstName: e.target.value })
              }
            ></Input>
            {errorText.firstName && (
              <span className="text-red-700 text-xs">
                {errorText.firstName}
              </span>
            )}
          </div>

          <Input
            nameInfo="lastName"
            info={updateUser.lastName}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, lastName: e.target.value })
            }
          ></Input>
          <div>
            <Input
              nameInfo="number"
              info={updateUser.phone}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, phone: e.target.value })
              }
            ></Input>
            {errorText.phone && (
              <span className="text-red-700 text-xs">{errorText.phone}</span>
            )}
          </div>

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
              if (
                nameRegex.test(updateUser.firstName) &&
                numberRegex.test(updateUser.phone)
              ) {
                setErrorText((prev) => ({ ...prev, phone: "", firstName: "" }));
                if (updateUser.id) {
                  dispatch(fetchUpdateContact(updateUser));
                  dispatch(closeModal());
                  dispatch(chooseUser(updateUser));
                } else {
                  console.log(updateUser);
                  dispatch(fetchAddUser(updateUser));
                  dispatch(closeModal());
                }
              }
              if (!nameRegex.test(updateUser.firstName)) {
                setErrorText((prev) => ({
                  ...prev,
                  firstName: "Отсутствует имя контакта",
                }));
              }
              if (!numberRegex.test(updateUser.phone)) {
                setErrorText((prev) => ({
                  ...prev,
                  phone: "Введите корректный номер телефона",
                }));
              }
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
