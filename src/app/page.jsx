'use client';
import React, { useState, useEffect } from 'react';
import MachineData from '../components/MachineData';
import Loader from '../components/Loader';
import Image from 'next/image';
import internetError from '../../public/internetConnectivityError.svg';

const DashboardData = () => {
  const [machineData, setMachineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isMounted, setIsMounted] = useState(true);
  const [totalMachines, setTotalMachines] = useState(null);

  useEffect(() => {
    const savedParameters = localStorage.getItem('savedParameter');

    if (savedParameters) {
      const { totalMachines, totalShifts } = JSON.parse(savedParameters);
      setTotalMachines(totalMachines);
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(url, { cache: 'no-store' });
      const responseData = await response.json();

      if (responseData.message) {
        setErrorMessage(responseData.message);
        setMachineData([]);
      } else {
        setMachineData(responseData);
        setErrorMessage(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('An error occurred while fetching data.');
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  const url = '/api/dashboard_data';
  // const url =
  //   process.env.NODE_ENV !== "production"
  //     ? `${process.env.NEXT_PUBLIC_LOCAL_HOST}api/dashboard`
  //     : `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/dashboard`;

  useEffect(() => {
    setIsMounted(true);

    const fetchDataAndReload = async () => {
      await fetchData();
    };

    fetchDataAndReload();

    const interval = setInterval(fetchDataAndReload, 5000);

    return () => {
      setIsMounted(false);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="content-container rounded-2xl bg-gray-800 overflow-hidden px-2 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 py-2">
      {loading ? (
        <div className="min-h-[50vh] col-span-full flex justify-center items-center">
          <Loader />
        </div>
      ) : errorMessage ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 col-span-full">
          <div className="py-2 text-center font-bold text-lg text-white">
            <div className="flex flex-col items-center">
              <Image src={internetError} alt="SVG Image" width={100} height={100} />
              <p className="text-center font-semibold text-white">{errorMessage}</p>
            </div>
          </div>
        </div>
      ) : (
        Array.isArray(machineData) &&
        machineData?.slice(0, 7).map((data, i) => <MachineData data={data} key={i} />)
      )}
    </div>
  );
};

export default DashboardData;
