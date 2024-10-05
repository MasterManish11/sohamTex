import { NextResponse } from 'next/server';
import { query } from '@/app/lib/database';

export const revalidate = true;

export async function POST(req) {
  try {
    const data = await req.json();
    const { machine: mc, fdate: date, shift } = data.data || {};

    if (!date) {
      return NextResponse.json({ error: 'Date is missing' });
    }

    const formatDateForQuery = (dateStr) => {
      const [day, month, year] = dateStr.split('-');
      return `${year}-${month}-${day}`;
    };

    const parseDateTime = (date, time) => {
      const [day, month, year] = date.split('-').map(Number);
      let [hours, minutes, seconds] = time.split(':').map(Number);

      if (hours === 0) {
        hours = 24;
      }

      return new Date(year, month - 1, day, hours, minutes, seconds);
    };

    const formatTotalTime = (seconds) => {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      return `${h}h ${m}m ${s}s`;
    };

    const calculateTimes = (data) => {
      const output = [];
      let currentStoppage = null;
      let stopTime = null;
      let lastStopReason = null;
      let totalTimeSum = 0;
      let rowNumber = 1; 

      data.sort((a, b) => parseDateTime(a.date, a.time) - parseDateTime(b.date, b.time));

      for (let i = 0; i < data.length; i++) {
        const entry = data[i];
        const currentTimestamp = parseDateTime(entry.date, entry.time);

        if (entry.reason === 1) {
          currentStoppage = 'Normal stop';
          stopTime = entry.time;
          lastStopReason = 1; 
        } else if (entry.reason === 5) {
          if (lastStopReason === 1) {
            continue; 
          } else {
            currentStoppage = 'Power off';
            stopTime = entry.time;
          }
          lastStopReason = 5;
        } else if (entry.reason === 7) {
          if (stopTime) {
            const totalTime = Math.round(
              (parseDateTime(entry.date, entry.time) - parseDateTime(entry.date, stopTime)) / 1000,
            );
            totalTimeSum += totalTime;
            output.push({
              rownumber: rowNumber++, 
              date: entry.date,
              machine: mc,
              stoppage: currentStoppage,
              stoptime: stopTime,
              starttime: entry.time,
              totaltime: formatTotalTime(totalTime),
            });
            stopTime = null; 
            currentStoppage = null;
            lastStopReason = null;
          }
        }
      }

      output.push({
        rownumber: rowNumber++,
        date: 'Total',
        machine: mc,
        stoppage: '',
        stoptime: '',
        starttime: '',
        totaltime: formatTotalTime(totalTimeSum),
      });

      return output;
    };

    const queryPromise = async (date, mc, shift) => {
      try {
        const shiftCondition = shift !== 'ALL' ? ` AND shift=${shift}` : '';
        const machineNo = mc <= 9 ? `0${mc}` : mc;
        const queryString = `SELECT date, time, reason FROM u967600739_sohamTex.production_summary_mc_${machineNo} WHERE date='${date}' ${shiftCondition} AND machine_no=${mc}`;
        const answer = await query({ query: queryString, values: [] });
        return Array.isArray(answer) && answer.length > 0 ? answer : null;
      } catch (error) {
        console.error('Error in queryPromise:', error);
        return null;
      }
    };

    const formattedDate = formatDateForQuery(date);
    if (!formattedDate) {
      return NextResponse.json({ error: 'Invalid date format' });
    }

    const answer = await queryPromise(formattedDate, mc, shift);
    if (answer) {
      const finalOutput = calculateTimes(answer);
      return finalOutput.length === 0
        ? NextResponse.json({ message: 'No data available' })
        : NextResponse.json(finalOutput);
    } else {
      return NextResponse.json({ message: 'No data available' });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred' });
  }
}
