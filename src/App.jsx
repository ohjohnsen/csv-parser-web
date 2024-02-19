import React, { useState } from "react";
import CsvFileReader from "./components/CsvFileReader";
import { Button, ChakraProvider, Stack, VStack, TableContainer, Table, Tr, Th, Thead, Tbody, Td } from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [firstCsvData, setFirstCsvData] = useState(null);
  const [firstCsvOutflowColumnIndex, setFirstCsvOutflowColumnIndex] = useState(-1);
  const [firstCsvInflowColumnIndex, setFirstCsvInflowColumnIndex] = useState(-1);

  const [secondCsvData, setSecondCsvData] = useState(null);
  const [secondCsvOutflowColumnIndex, setSecondCsvOutflowColumnIndex] = useState(-1);
  const [secondCsvInflowColumnIndex, setSecondCsvInflowColumnIndex] = useState(-1);

	return (
    <ChakraProvider>
      <VStack direction="column" width="100vw" heigh="100vh">
        <CsvFileReader
          csvData={firstCsvData}
          setCsvData={setFirstCsvData}
          setOutflowIndex={setFirstCsvOutflowColumnIndex}
          setInflowIndex={setFirstCsvInflowColumnIndex} />
        <CsvFileReader
          csvData={secondCsvData}
          setCsvData={setSecondCsvData}
          setOutflowIndex={setSecondCsvOutflowColumnIndex}
          setInflowIndex={setSecondCsvInflowColumnIndex} />

        <Button onClick={_ => {
          console.log(secondCsvData);
          const valueRegexPattern = /[0-9]*[.,][0-9]{2}/g;

          const firstCsvDataCopy = { ...firstCsvData };
          firstCsvDataCopy.rows.forEach(row => {
            const outflowValueStringMatch = row.columns[firstCsvOutflowColumnIndex]?.replace(/\s/g, '').match(valueRegexPattern) ?? undefined;
            const outflowValue = outflowValueStringMatch !== undefined ? parseFloat(outflowValueStringMatch[0].replace(',', '.')) : 0.0;
            const inflowValueStringMatch = row.columns[firstCsvInflowColumnIndex]?.replace(/\s/g, '').match(valueRegexPattern) ?? undefined;
            const inflowValue = inflowValueStringMatch !== undefined ? parseFloat(inflowValueStringMatch[0].replace(',', '.')) : 0.0;
            row.outflowValue = outflowValue;
            row.inflowValue = inflowValue
          });

          const secondCsvDataCopy = { ...secondCsvData };
          secondCsvDataCopy.rows.forEach(row => {
            const outflowValueStringMatch = row.columns[secondCsvOutflowColumnIndex]?.replace(/\s/g, '').match(valueRegexPattern) ?? undefined;
            const outflowValue = outflowValueStringMatch !== undefined ? parseFloat(outflowValueStringMatch[0].replace(',', '.')) : 0.0;
            const inflowValueStringMatch = row.columns[secondCsvInflowColumnIndex]?.replace(/\s/g, '').match(valueRegexPattern) ?? undefined;
            const inflowValue = inflowValueStringMatch !== undefined ? parseFloat(inflowValueStringMatch[0].replace(',', '.')) : 0.0;
            row.outflowValue = outflowValue;
            row.inflowValue = inflowValue
          });

          firstCsvDataCopy.rows.forEach((firstCsvRow, firstCsvRowIndex) => {
            secondCsvDataCopy.rows.forEach((secondCsvRow, secondCsvRowIndex) => {
              if (firstCsvRow.outflowValue === secondCsvRow.outflowValue &&
                firstCsvRow.inflowValue === secondCsvRow.inflowValue &&
                firstCsvRow.oppositeCsvMatchingRowIndex === undefined &&
                secondCsvRow.oppositeCsvMatchingRowIndex === undefined) {
                // console.log("Match!");
                // console.log("firstOutflow: " + firstCsvRow.outflowValue);
                // console.log("secondsOutflow: " + secondCsvRow.outflowValue);
                firstCsvDataCopy.rows[firstCsvRowIndex].oppositeCsvMatchingRowIndex = secondCsvRowIndex;
                secondCsvDataCopy.rows[secondCsvRowIndex].oppositeCsvMatchingRowIndex = firstCsvRowIndex;
                // console.log("Match!  first:" + firstCsvRowIndex + "  second:" + secondCsvRowIndex);
              }
            })
          })

          setFirstCsvData(firstCsvDataCopy);
          setSecondCsvData(secondCsvDataCopy);

          // console.log(firstCsvDataCopy);
          // console.log(secondCsvDataCopy);

        }}>
          CALCULATE
        </Button>

        {firstCsvData !== null && firstCsvData.rows.some(row => row.oppositeCsvMatchingRowIndex !== undefined) &&
          <TableContainer overflowX="scroll" maxWidth="80vw">
            <Table variant='simple'>
              <Thead>
                <Tr>
                  {firstCsvData.columnHeaders.map(columnHeader => {
                    return (
                      <Th key={uuidv4()}>{columnHeader}</Th>
                    )
                  })}
                </Tr>
              </Thead>
              <Tbody>
              {firstCsvData.rows.filter(row => row.oppositeCsvMatchingRowIndex === undefined).map(row => {
                return (
                <Tr key={uuidv4()}>
                  {row.columns.map(column => {
                    return (
                      <Td key={uuidv4()}>{column}</Td>
                    )
                  })}
                </Tr>
                )
              })}
              </Tbody>
            </Table>
          </TableContainer>
        }

        {secondCsvData !== null && secondCsvData.rows.some(row => row.oppositeCsvMatchingRowIndex !== undefined) &&
          <TableContainer overflowX="scroll" maxWidth="80vw">
            <Table variant='simple'>
              <Thead>
                <Tr>
                  {secondCsvData.columnHeaders.map(columnHeader => {
                    return (
                      <Th key={uuidv4()}>{columnHeader}</Th>
                    )
                  })}
                </Tr>
              </Thead>
              <Tbody>
              {secondCsvData.rows.filter(row => row.oppositeCsvMatchingRowIndex === undefined).map(row => {
                return (
                <Tr key={uuidv4()}>
                  {row.columns.map(column => {
                    return (
                      <Td key={uuidv4()}>{column}</Td>
                    )
                  })}
                </Tr>
                )
              })}
              </Tbody>
            </Table>
          </TableContainer>
        }

      </VStack>
		</ChakraProvider>
	);
};

export default App;
