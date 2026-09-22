import { useDispatch, useSelector } from "react-redux";
import ContactInfo from "./components/ContactInfo";
import ContactItem from "./components/ContactItem";
import { chooseUser } from "./features/userSlice";
import { useEffect } from "react";
import { fetchGetContacts } from "./features/contactsSlice";
import type { AppDispatch } from "./store";
import type { ContactProps } from "./type/typeUser";

function App() {
  const contacts = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    dispatch(fetchGetContacts());
  }, []);

  return (
    <div className="h-screen w-full grid grid-cols-[400px_1fr]">
      <div className="bg-[#fdfaf7] overflow-auto max-h-screen">
        {contacts.map((contact: ContactProps) => (
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

            <button className="bg-[#d4541e] font-semibold bold px-5 py-3 rounded-4xl cursor-pointer text-white">
              + Добавить контакт
            </button>
          </div>
        ) : (
          <ContactInfo {...currentUser} />
        )}
      </div>
    </div>
  );
}

export default App;
