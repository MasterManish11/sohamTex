'use client';
import React, { useState, useEffect } from 'react';
import Loader from '../../../../components/Loader';
import SaveAsCSVButton from '../../../../components/SaveAsCSVButton';
import SaveAsPDFButton from '../../../../components/SaveAsPDFButton';
export default function StoppagePage() {
  const [activeTab, setActiveTab] = useState('table');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [totalMachines, setTotalMachines] = useState('8');
  const [answer, setAnswer] = useState([]);
  const [totalShifts, setTotalShifts] = useState('2');
  const [data, setData] = useState({
    fdate: '',
    machine: '', // Initialize as a string for single selection
    shift: '',
  });

  useEffect(() => {
    // Load saved parameters from local storage when component mounts
    const savedParameters = localStorage.getItem('savedParameter');

    if (savedParameters) {
      const { totalMachines, totalShifts } = JSON.parse(savedParameters);
      setTotalMachines(totalMachines);
      setTotalShifts(totalShifts);
    }
  }, []);

  useEffect(() => {
    // Update data.machine whenever selectedMachines changes
    setData((prev) => ({
      ...prev,
      machine: selectedMachines,
    }));
  }, [selectedMachines]);

  const inputEvent = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showResult = async (event) => {
    try {
      setLoading(true);
      event.preventDefault();

      // Define the API endpoint
      const apiUrl = '/api/stoppage';
      // Prepare the request options
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      };

      // Make the API request
      const response = await fetch(apiUrl, requestOptions);
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      // Parse the JSON response
      const responseData = await response.json();
      if (responseData.message) {
        setErrorMessage(responseData.message);
        setAnswer([]);
      } else {
        setAnswer(responseData);
        setErrorMessage(null);
      }
      setLoading(false);
    } catch (error) {
      // Handle errors, e.g., log them or show an error message to the user
      console.error('Error in showResult:', error);
    }
  };
  return (
    <div className="lg:w-full rounded-3xl bg-gray-900 px-6 max-h-[500px] overflow-y-auto">
      <h1 className="px-4 py-1 text-center bg-gradient-to-r from-blue-500 to-green-500 text-white text-xl font-semibold rounded-md shadow-lg">
        Stoppage Report
      </h1>
      <div className="lg:grid lg:grid-cols-12 lg:gap-2 flex flex-col lg:space-y-0 space-y-2 pt-2">
        <div className="bg-[#fee4cb] col-span-3 rounded-xl max-h-[350px] overflow-y-auto">
          <form action="" onSubmit={showResult}>
            <div className="flex flex-col p-4 space-y-1">
              {/* From Date */}
              <div className="flex flex-col">
                <label htmlFor="fdate" className="font-semibold text-gray-900">
                  Date
                </label>
                <input
                  type="date"
                  name="fdate"
                  id="fdate"
                  className="w-full rounded p-1 border-2 border-gray-100 lg:text-base text-sm"
                  onChange={inputEvent}
                  value={data.fdate}
                  min="2024-09-21"
                  max="2024-09-27"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="machine" className="font-semibold text-gray-900">
                  Select Machine
                </label>
                <select
                  className="w-full rounded p-1 py-[0.4rem] border-2 border-gray-100 lg:text-base text-sm"
                  name="machine"
                  id="machine"
                  onChange={inputEvent}
                  value={data.machine}
                  required
                >
                  <option value="" disabled>
                    Select Machine
                  </option>
                  {Array.from({ length: totalMachines }, (_, index) => (
                    <option
                      key={index + 1}
                      value={index + 1}
                      className="py-2" // You can add a height here to visually separate options
                    >
                      Machine {index + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Shift */}
              <div>
                <label htmlFor="shift" className="font-semibold flex flex-col text-gray-900">
                  Select Shift
                </label>
                <select
                  className="w-full rounded p-1 py-[0.4rem] border-2 border-gray-100 lg:text-base text-sm"
                  name="shift"
                  id="shift"
                  onChange={inputEvent}
                  value={data.shift}
                  required
                >
                  <option value="" disabled>
                    Select Shift
                  </option>
                  {Array.from({ length: totalShifts }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                  <option value="ALL">ALL</option>
                </select>
              </div>
              {/* Submit Button */}
              <div>
                <button
                  className="w-full lg:mt-1 p-2 bg-[#19DAAD] hover:bg-[#19DABF] rounded font-semibold text-[#162637]"
                  type="submit"
                >
                  Search
                </button>
              </div>
              <div className="flex items-center w-full justify-between space-x-2">
                <div className="flex-1">
                  {activeTab === 'table' && answer.length > 0 && (
                    <SaveAsPDFButton data={answer} fileName="stoppage.pdf" />
                  )}
                </div>
                <div className="flex-1">
                  {activeTab === 'table' && answer.length > 0 && (
                    <SaveAsCSVButton data={answer} fileName="stoppage" />
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="bg-gray-300 rounded-xl lg:col-span-9 p-2 max-h-[350px] overflow-y-auto">
          <div className="tableParent max-h-[300px]">
            <table className="tableContainer min-w-[700px]" id="table">
              <thead className="thead">
                <tr>
                  <th className="pl-2">No</th>
                  <th scope="col" className="th">
                    Date
                  </th>
                  <th scope="col" className="th">
                    Machine
                  </th>
                  <th scope="col" className="th">
                    Stoppage Reason
                  </th>
                  <th scope="col" className="th">
                    Stop Time
                  </th>
                  <th scope="col" className="th">
                    Start Time
                  </th>
                  <th scope="col" className="th">
                    Total Time
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="h-48 overflow-y-auto">
                {loading ? (
                  <tr>
                    <td colSpan="9" className="py-2 text-center">
                      <Loader />
                    </td>
                  </tr>
                ) : (
                  <>
                    {errorMessage ? (
                      <>
                        <tr>
                          <td
                            colSpan="9"
                            className="py-2 text-center font-bold text-lg text-white "
                          >
                            {errorMessage}
                          </td>
                        </tr>
                      </>
                    ) : (
                      <>
                        {answer &&
                          answer.map((data, item) => (
                            <React.Fragment key={item}>
                              <tr
                                className={`tableRow ${data.date === 'Total' ? 'font-bold' : ''}`}
                              >
                                {/* <th className="pl-2 text-black">{item == 0 ? 1 : item + 1}</th> */}
                                <th className="pl-2 text-black">{data.rownumber}</th>
                                <td className="td">{data.date}</td>
                                <td className="td">{data.machine}</td>
                                <td className="td">{data.stoppage}</td>
                                <td className="td">{data.stoptime}</td>
                                <td className="td">{data.starttime}</td>
                                <td className="td">{data.totaltime}</td>
                              </tr>
                            </React.Fragment>
                          ))}
                      </>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
