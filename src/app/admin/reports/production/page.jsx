'use client'
import React, { useState, useEffect } from 'react';
import Loader from '../../../../components/Loader';
import CustomDropdown from '../../../../components/CustomDropdown ';
import ProductionBarchart from '../../../../components/ProductionBarchart';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import SaveAsCSVButton from '../../../../components/SaveAsCSVButton';
import SaveAsPDFButton from '../../../../components/SaveAsPDFButton';
import { Fragment } from 'react';
import Image from 'next/image';
export default function ProductionPage() {
  const [activeTab, setActiveTab] = useState('table');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [totalMachines, setTotalMachines] = useState(null);
  const [answer, setAnswer] = useState([]);
  const [totalShifts, setTotalShifts] = useState(null);
  const [insLength, setInsLength] = useState([]);
  const [data, setData] = useState({
    fdate: '',
    tdate: '',
    machine: [], // Keep this as an array if you're selecting multiple machines
    insenseLentgh: '', // Initialize as an empty string, not an array
    shift: '',
  });

  useEffect(() => {
    // Load saved parameters from local storage when component mounts
    const savedParameters = localStorage.getItem('savedParameter');

    if (savedParameters) {
      const { totalMachines, totalShifts, insenseLength } = JSON.parse(savedParameters);
      setTotalMachines(totalMachines);
      setTotalShifts(totalShifts);
      setInsLength(insenseLength?.split(','));
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
      const apiUrl = '/api/production';
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
      console.error('Error in showResult:', error);
    }
  };
  return (
    <div className="lg:w-full rounded-3xl bg-gray-900 px-6 max-h-[600px] overflow-y-auto">
      <h1 className="px-4 py-1 text-center bg-gradient-to-r from-blue-500 to-green-500 text-white text-xl font-semibold rounded-md shadow-lg">
        Production Summary Report
      </h1>
      <div className="lg:grid lg:grid-cols-12 lg:gap-2 flex flex-col lg:space-y-0 space-y-2 pt-2">
        <div className="bg-[#fee4cb] lg:col-span-3 rounded-xl max-h-[550px] overflow-y-auto">
          <form action="" onSubmit={showResult}>
            <div className="flex flex-col p-4 space-y-1">
              <div className="flex flex-col">
                <label htmlFor="fdate" className="font-semibold text-gray-900">
                  From date
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

              {/* To Date */}
              <div className="flex flex-col">
                <label htmlFor="tdate" className="font-semibold text-gray-900">
                  To date
                </label>
                <input
                  type="date"
                  name="tdate"
                  id="tdate"
                  className="w-full rounded p-1 border-2 border-gray-100 lg:text-base text-sm"
                  onChange={inputEvent}
                  value={data.tdate}
                  min="2024-09-21"
                  max="2024-09-27"
                  required
                />
              </div>

              {/* Select Machine */}
              <div className="flex flex-col">
                <label htmlFor="machine" className="font-semibold text-gray-900">
                  Select Machine
                </label>
                <CustomDropdown
                  totalMachines={totalMachines}
                  selectedMachines={selectedMachines}
                  setSelectedMachines={setSelectedMachines}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="insenseLentgh" className="font-semibold text-gray-900">
                  Insense Length
                </label>
                <select
                  className="w-full rounded p-1 py-[0.4rem] border-2 border-gray-100 lg:text-base text-sm"
                  name="insenseLentgh"
                  id="insenseLentgh"
                  onChange={inputEvent}
                  value={data.insenseLentgh} // Ensure this is a string value
                  required
                >
                  <option value="" disabled>
                    Select Insense Length
                  </option>
                  <option value="ALL">ALL</option> {/* Add ALL option */}
                  {insLength.map((length, index) => (
                    <option key={index} value={length}>
                      {length}
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
                    <SaveAsPDFButton data={answer} fileName="production.pdf" />
                  )}
                </div>
                <div className="flex-1">
                  {activeTab === 'table' && answer.length > 0 && (
                    <SaveAsCSVButton data={answer} fileName="production" />
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="bg-gray-300 rounded-xl lg:col-span-9 p-2 max-h-[550px] overflow-y-auto">
          <TabGroup onChange={(index) => setActiveTab(index === 0 ? 'table' : 'graphical')}>
            <TabList className="space-x-2 py-2 flex items-center justify-between">
              <div>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`text-gray-900 p-1${
                        selected ? ' border-2 border-gray-900 outline-none rounded' : ''
                      }`}
                    >
                      Table View
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`text-gray-900 p-1 ${
                        selected ? 'border-2 border-gray-900 outline-none rounded' : ''
                      }`}
                    >
                      Graphical View
                    </button>
                  )}
                </Tab>
              </div>
            </TabList>

            <TabPanels>
              <TabPanel>
                <div className="max-h-[400px] tableParent">
                  <table className="tableContainer min-w-[550px]" id="table">
                    <thead className="thead ">
                      <tr>
                        <th className="pl-2 whitespace-nowrap ">No</th>
                        <th scope="col" className="th">
                          Date
                        </th>
                        <th scope="col" className="th">
                          Machine
                        </th>
                        <th scope="col" className="th">
                          Insense Length
                        </th>
                        <th scope="col" className="th">
                          Production
                        </th>
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
                            <tr>
                              <td
                                colSpan="9"
                                className="py-2 text-center font-bold text-lg text-white "
                              >
                                {errorMessage}
                              </td>
                            </tr>
                          ) : (
                            answer &&
                            answer.map((data, i) => {
                              // Check if any cell contains "total"
                              const isTotalRow = Object.values(data).some(
                                (val) =>
                                  typeof val === 'string' && val.toLowerCase().includes('total'),
                              );
                              return (
                                <React.Fragment key={i}>
                                  <tr className={`tableRow ${isTotalRow ? 'font-bold' : ''}`}>
                                    <th className="pl-2 text-black whitespace-nowrap">{data.No}</th>
                                    <td className="td">{data.Date}</td>
                                    <td className="td">{data.Machine}</td>
                                    <td className="td">{data.insenseLentgh}</td>
                                    <td className="td">{data.production}</td>
                                  </tr>
                                </React.Fragment>
                              );
                            })
                          )}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel>
                {errorMessage ? (
                  <div className="flex flex-col items-center">
                    <Image
                      src={internetError}
                      alt="SVG Image"
                      width={100}
                      height={100}
                      className="text-white"
                    />
                    <p className="text-center font-semibold text-white">{errorMessage}</p>
                  </div>
                ) : (
                  <>{answer.length > 0 && <ProductionBarchart data={answer} />}</>
                )}
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  );
}
