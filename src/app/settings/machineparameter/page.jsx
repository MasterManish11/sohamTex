"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const MachineParameter = () => {
  const router = useRouter();
  const [totalMachines, setTotalMachines] = useState("");
  const [totalShifts, setTotalShifts] = useState("");
  const [insenseLength, setInsenseLength] = useState(""); // New state for machine name
  const [savedParameter, setSavedParameter] = useState(null);

  useEffect(() => {
    // Load saved parameters from local storage when component mounts
    const saved = localStorage.getItem("savedParameter");
    if (saved) {
      setSavedParameter(JSON.parse(saved));
    }
    const savedPassword = localStorage.getItem("savedPassword");
    if (!savedPassword) {
      router.push("/settings/password");
      // localStorage.removeItem("savedPassword");
    }
    setTimeout(() => {
      if (savedPassword) {
        localStorage.removeItem("savedPassword");
      }
    }, 1000);
  }, []);

  const handleTotalMachinesChange = (event) => {
    setTotalMachines(event.target.value);
  };

  const handleTotalShiftsChange = (event) => {
    setTotalShifts(event.target.value);
  };

  const handleMachineNameChange = (event) => {
    setInsenseLength(event.target.value);
  };

  const handleSave = () => {
    if (totalMachines === "" || totalShifts === "" || insenseLength === "") {
      alert("Please enter machine name, total machines, and total shifts.");
      return;
    }

    const parameter = {
      insenseLength: insenseLength, // Save the machine name
      totalMachines: parseInt(totalMachines, 10),
      totalShifts: parseInt(totalShifts, 10),
    };

    setSavedParameter(parameter);

    // Save to local storage
    localStorage.setItem("savedParameter", JSON.stringify(parameter));

    // Optionally, clear the input fields after saving
    setTotalMachines("");
    setTotalShifts("");
    setInsenseLength(""); // Clear machine name
  };

  return (
    <div className="container mx-auto py-4">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="insenseLength"
          >
           Insense Length:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="insenseLength"
            type="text"
            placeholder="Enter Insense Length"
            value={insenseLength}
            onChange={handleMachineNameChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="totalMachines"
          >
            Total Number of Machines:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="totalMachines"
            type="number"
            placeholder="Enter number of machines"
            value={totalMachines}
            onChange={handleTotalMachinesChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="totalShifts"
          >
            Total Shifts:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="totalShifts"
            type="number"
            placeholder="Enter number of shifts"
            value={totalShifts}
            onChange={handleTotalShiftsChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSave}
          >
            Save
          </button>
          <Link
            href={"/"}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {" "}
            Back
          </Link>
        </div>
      </form>
      <div>
        <h3 className="text-lg font-bold mb-2 text-white">Saved Parameters:</h3>
        {savedParameter ? (
          <ul>
            <li className="mb-1 text-white">
              Insense Length: {savedParameter.insenseLength}, Machines:{" "}
              {savedParameter.totalMachines}, Shifts:{" "}
              {savedParameter.totalShifts}
            </li>
          </ul>
        ) : (
          <p>No parameters saved.</p>
        )}
      </div>
    </div>
  );
};

export default MachineParameter;
