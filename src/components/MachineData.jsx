import React from 'react';

const MachineData = ({ data }) => {
  return (
    <div>
      <div className="bg-[#fee4cb] h-[265px] flex flex-col space-y-1 border rounded-xl px-1 ">
        <div className="flex flex-col space-y-1">
          <label htmlFor="status" className="text-center font-bold text-lg ">
            {`Machine ${data.machine_no}`}
          </label>
        </div>
        <div className="space-y-1">
          <div className="space-x-1 flex">
            <label
              htmlFor="speed"
              className="bg-[#25384A] p-1 rounded text-white text-base inline-block w-40"
            >
              {' '}
              Insense Length
            </label>
            <span className="p-1 flex-1 text-right border-b-2 border-[#2F4758] font-bold text-gray-800 ">
              {data.insense_length}
            </span>
          </div>
          <div className="space-x-1 flex">
            <label
              htmlFor="speed"
              className="bg-[#25384A] p-1 rounded text-white text-base inline-block w-40"
            >
              {' '}
              Quantity Per Pouch
            </label>
            <span className="p-1 flex-1 text-right border-b-2 border-[#2F4758] font-bold text-gray-800 ">
              {data.insense_qua_per_pouch}
            </span>
          </div>
          <div className="space-x-1 flex">
            <label
              htmlFor="speed"
              className="bg-[#25384A] p-1 rounded text-white text-base inline-block w-40"
            >
              {' '}
              Runtime
            </label>
            <span className="p-1 flex-1 text-right border-b-2 border-[#2F4758] font-bold text-gray-800 ">
              {`${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`}
            </span>
          </div>
          <div className="space-x-1 flex">
            <label
              htmlFor="speed"
              className="bg-[#25384A] p-1 rounded text-white text-base inline-block w-40"
            >
              {' '}
              Efficiency
            </label>
            <span className="p-1 flex-1 text-right border-b-2 border-[#2F4758] font-bold text-gray-800 ">
              {data.efficiency}
            </span>
          </div>
          <div className="space-x-1 flex">
            <label
              htmlFor="speed"
              className="bg-[#25384A] p-1 rounded text-white text-base inline-block w-40"
            >
              {' '}
              Total Pouch
            </label>
            <span className="p-1 flex-1 text-right border-b-2 border-[#2F4758] font-bold text-gray-800 ">
              {data.total_pouch}
            </span>
          </div>

          <button
            className={`${
              data.status > 0 ? 'bg-green-500' : 'bg-red-500'
            } text-white px-4 py-1 rounded-md w-full text-lg font-semibold`}
          >
            {data.status == 1 ? 'Run' : 'Stop'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MachineData;
