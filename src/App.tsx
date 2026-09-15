import { useDispatch, useSelector } from "react-redux";
import ContactInfo from "./components/ContactInfo";
import ContactItem from "./components/ContactItem";
import { contacts } from "./data";
import { chooseUser } from "./features/userSlice";

function App() {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  return (
    <div className="h-screen w-full grid grid-cols-[400px_1fr]">
      <div className="bg-[#fdfaf7] overflow-auto max-h-screen">
        {contacts.map((contact) => (
          <ContactItem
            contact={contact}
            key={contact.id}
            onClick={() => {
              dispatch(chooseUser(contact));
            }}
          />
        ))}
      </div>
      <div className="bg-[#f7f3ee]">
        <ContactInfo {...currentUser} />
      </div>
    </div>
  );
}

export default App;
