import React, { useState, useEffect, useRef } from "react";

const CustomDropdown = ({
  totalMachines,
  selectedMachines,
  setSelectedMachines,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMachineSelection = (machine) => {
    if (machine === "ALL") {
      setSelectAll(!selectAll);
      if (!selectAll) {
        setSelectedMachines(
          Array.from({ length: totalMachines }, (_, index) => index + 1)
        );
      } else {
        setSelectedMachines([]);
      }
    } else {
      if (selectedMachines.includes(machine)) {
        setSelectedMachines(selectedMachines.filter((m) => m !== machine));
      } else {
        setSelectedMachines([...selectedMachines, machine]);
      }
    }
  };

  useEffect(() => {
    // Sync selectAll state with selectedMachines
    if (selectedMachines.length === totalMachines) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedMachines, totalMachines]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`w-full rounded p-1 py-[0.4rem] border-2  bg-white border-gray-100 lg:text-base text-sm cursor-pointer ${
          selectedMachines.length > 0 ? "text-red-500 font-medium" : "text-gray-500"
        }`}
        onClick={handleToggleDropdown}
      >
        {selectedMachines.length > 0 ? "Machines Selected" : "Select Machines"}
      </div>

      {isOpen && (
        <div className="absolute z-20 w-full bg-white border-2 border-gray-100 rounded mt-1 max-h-48 overflow-y-auto">
          <div className="flex items-center p-2">
            <input
              type="checkbox"
              id="select-all"
              checked={selectAll}
              onChange={() => handleMachineSelection("ALL")}
            />
            <label htmlFor="select-all" className="ml-2">
              All Machines
            </label>
          </div>
          {Array.from({ length: totalMachines }, (_, index) => (
            <div key={index + 1} className="flex items-center p-2">
              <input
                type="checkbox"
                id={`machine-${index + 1}`}
                checked={selectedMachines.includes(index + 1)}
                onChange={() => handleMachineSelection(index + 1)}
              />
              <label htmlFor={`machine-${index + 1}`} className="ml-2">
                Machine {index + 1}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
