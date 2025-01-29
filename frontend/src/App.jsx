import { useState } from "react";
import AddressForm from "./components/AddressForm";
import AddressList from "./components/AddressList";

const App = () => {
  const [loading, setLoading] = useState(false);

  const fetchAddresses = () => {
    setLoading(!loading);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-200 p-6">
      <h1 className="text-6xl font-bold mb-6 py-5 text-blue-500">Smart Address Book</h1>

      <div className="flex flex-col md:flex-row gap-8">

        <AddressForm fetchAddresses={fetchAddresses} />

        <div className="w-full md:w-2/3">
          <AddressList key={loading} />
        </div>
      </div>
    </div>
  );
};

export default App;
