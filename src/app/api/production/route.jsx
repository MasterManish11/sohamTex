import { NextResponse } from 'next/server';
import { query } from '@/app/lib/database';

export const revalidate = true;

export async function POST(req) {
  try {
    const data = await req.json();
    const { machine: machines, fdate, tdate, shift, insenseLentgh } = data.data;

    const findDatesBetween = (startDateStr, endDateStr) => {
      const start = new Date(startDateStr);
      const end = new Date(endDateStr);
      const allDates = [];

      for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
        const formattedDate = `${date.getUTCDate().toString().padStart(2, '0')}-${(
          date.getUTCMonth() + 1
        )
          .toString()
          .padStart(2, '0')}-${date.getUTCFullYear()}`;
        allDates.push(formattedDate);
      }
      return allDates;
    };

    const resultDates = findDatesBetween(fdate, tdate);
    const output = [];
    const dateTotals = {};
    let rowCount = 1; // Add row counter

    const queryPromise = async (date, machine, shift) => {
      try {
        const shiftCondition = shift !== 'ALL' ? ` AND shift=${shift}` : '';
        const machineNo = machine <= 9 ? `0${machine}` : machine;
        const insLengthCondition =
          insenseLentgh !== 'ALL' ? ` AND insense_length=${insenseLentgh}` : '';
        const queryString = `SELECT * FROM u967600739_sohamTex.production_summary_mc_${machineNo} WHERE date='${date}' ${shiftCondition} ${insLengthCondition} AND machine_no=${machine}`;
        const answer = await query({
          query: queryString,
          values: [],
        });
        return Array.isArray(answer) && answer.length > 0 ? answer : null;
      } catch (error) {
        console.error('Error in queryPromise:', error);
        return null;
      }
    };

    for (const date of resultDates) {
      let dailyTotal = 0;

      for (const machine of machines) {
        const finalanswer = await queryPromise(date, machine, shift);

        if (finalanswer && finalanswer.length > 0) {
          let production = 0;
          if (shift === 'ALL') {
            const reasons = finalanswer.filter((item) => item.reason == 2);
            production = reasons.reduce((sum, item) => sum + item.production, 0);
          } else {
            production =
              finalanswer.length >= 2 ? finalanswer[finalanswer.length - 2].production : 0;
          }

          output.push({
            No: rowCount++, // Increment row counter once per row
            Date: date,
            Machine: machine,
            insenseLentgh,
            production,
          });

          dailyTotal += production;
        } else {
          output.push({
            No: rowCount++, // Increment row counter once per row
            Date: date,
            Machine: machine,
            insenseLentgh: insenseLentgh === 'ALL' ? '-' : insenseLentgh,
            production: 0,
          });
        }
      }

      output.push({
        No: rowCount++, // Increment row counter once per row
        Date: `${date} Total`,
        Machine: '-',
        insenseLentgh,
        production: dailyTotal,
      });

      if (!dateTotals[date]) {
        dateTotals[date] = 0;
      }
      dateTotals[date] += dailyTotal;
    }

    // Calculate the grand total production
    const grandTotal = Object.values(dateTotals).reduce((acc, current) => acc + current, 0);

    output.push({
      No: rowCount++, // Increment row counter once per row
      Date: 'Grand Total',
      Machine: '-',
      insenseLentgh,
      production: grandTotal,
    });

    if (output.length === 0) {
      return NextResponse.json({ message: 'No data available' });
    }
    return NextResponse.json(output);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred' });
  }
}
