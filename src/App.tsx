import ContactItem from "./components/ContactItem";
import { contacts } from "./data";

function App() {
  return (
    <div className="grid grid-cols-[400px_1fr]">
      <div className="bg-[#fdfaf7]">
        {contacts.map((contact) => (
          <ContactItem {...contact} />
        ))}
      </div>
      <div className="bg-[#f7f3ee]"></div>
    </div>
  );
}

export default App;
