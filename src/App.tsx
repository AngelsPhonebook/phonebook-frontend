import { useDispatch, useSelector } from "react-redux";
import ContactInfo from "./components/ContactInfo";
import ContactItem from "./components/ContactItem";
import { chooseUser } from "./features/userSlice";
import { useEffect, useState } from "react";
import { fetchGetContacts } from "./features/contactsSlice";
import type { AppDispatch } from "./store";
import type { ContactProps } from "./type/typeUser";
import ContactForm from "./components/ContactForm";
import { openModal } from "./features/modalSlice";
import SearchForm from "./components/SearchForm";

function App() {
  const contacts = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state) => state.currentUser);
  const isOpen = useSelector((state) => state.modalWindow.isOpen);
  const newUser: ContactProps = {
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    notes: "",
  };
  const [search, setSearch] = useState("");
  const filteredContacts = contacts.filter(
    (contact: ContactProps) =>
      contact.firstName.toLowerCase().startsWith(search) ||
      contact.lastName.toLowerCase().startsWith(search),
  );

  function onChangeSearchForm(searchValue: string) {
    setSearch(searchValue);
  }

  useEffect(() => {
    dispatch(fetchGetContacts());
  }, []);

  return (
    <div className="h-screen w-full grid grid-cols-[400px_1fr]">
      <div className="bg-[#fdfaf7] overflow-auto max-h-screen">
        <div className="mx-5 mt-2 flex justify-between items-center">
          <h1>Phonebook</h1>
          <button
            className="flex items-center justify-center rounded-full bg-[#d4541e] w-8 h-8 font-bold text-white cursor-pointer active:bg-[#b4491c] hover:shadow-[0_0_4px_1px_#b4491c]"
            onClick={() => {
              dispatch(openModal(newUser));
            }}
          >
            +
          </button>
        </div>

        <SearchForm onChange={onChangeSearchForm}></SearchForm>
        {filteredContacts.map((contact: ContactProps) => (
          <ContactItem
            contact={contact}
            key={contact.id}
            onClick={() => {
              dispatch(chooseUser(contact));
            }}
          />
        ))}
      </div>
      <div className="bg-[#f7f3ee] flex items-center">
        {currentUser === null ? (
          <div className="w-full flex flex-col justify-center items-center gap-10">
            <div className="flex flex-col justify-center items-center gap-2">
              <p className="font-['Cormorant_Garamond',serif] text-6xl">
                Выберите контакт
              </p>
              <p className="text-[#8a7f72]">
                Выберите кого-нибудь из списка контактов или создайте новый
                контакт
              </p>
            </div>

            <button
              className="bg-[#d4541e] active:bg-[#b4491c] hover:shadow-[0_0_4px_1px_#b4491c] font-semibold bold px-5 py-3 rounded-4xl cursor-pointer text-white"
              onClick={() => {
                dispatch(openModal(newUser));
              }}
            >
              + Добавить контакт
            </button>
          </div>
        ) : (
          <ContactInfo contact={currentUser} />
        )}
      </div>

      {isOpen && <ContactForm contact={currentUser}></ContactForm>}
    </div>
  );
}

export default App;
