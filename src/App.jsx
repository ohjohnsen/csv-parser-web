import { useState } from "react";
import { Heading, ChakraProvider, TableContainer, Table, Tr, Th, Thead, Tbody, Td, Box, Flex, Link, Center } from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid';
import Schema from "./components/Schema";
import ResultTable from "./components/ResultTable";

const App = () => {
  const [firstCsvData, setFirstCsvData] = useState(null);
  const [firstCsvOutflowColumnIndex, setFirstCsvOutflowColumnIndex] = useState(-1);
  const [firstCsvInflowColumnIndex, setFirstCsvInflowColumnIndex] = useState(-1);

  const [secondCsvData, setSecondCsvData] = useState(null);
  const [secondCsvOutflowColumnIndex, setSecondCsvOutflowColumnIndex] = useState(-1);
  const [secondCsvInflowColumnIndex, setSecondCsvInflowColumnIndex] = useState(-1);

  const MAXWIDTH = "90rem";

  const calculateButtonClickHandler = () => {
    const valueRegexPattern = /\d*[.,]?\d+/g;

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

    console.log(firstCsvDataCopy);
    console.log(secondCsvData);

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
    console.log(firstCsvDataCopy);
  }

	return (
    <ChakraProvider>
      <Flex height="100vh" width="100vw" direction="column" background="white" overflowY="scroll" alignItems="center">
        <Heading as="h1" size="xl">Transaction CSV File Parser</Heading>
        <Heading as="h2" size="md">Find non-matching transactions between a pair of CSV files</Heading>

        {(firstCsvData === null || !firstCsvData.rows.some(row => row.oppositeCsvMatchingRowIndex !== undefined)) &&
          (secondCsvData === null || !secondCsvData.rows.some(row => row.oppositeCsvMatchingRowIndex !== undefined)) &&

          <Schema
            firstCsvData={firstCsvData}
            setFirstCsvData={setFirstCsvData}
            firstCsvOutflowColumnIndex={firstCsvOutflowColumnIndex}
            setFirstCsvOutflowColumnIndex={setFirstCsvOutflowColumnIndex}
            firstCsvInflowColumnIndex={firstCsvInflowColumnIndex}
            setFirstCsvInflowColumnIndex={setFirstCsvInflowColumnIndex}

            secondCsvData={secondCsvData}
            setSecondCsvData={setSecondCsvData}
            secondCsvOutflowColumnIndex={secondCsvOutflowColumnIndex}
            setSecondCsvOutflowColumnIndex={setSecondCsvOutflowColumnIndex}
            secondCsvInflowColumnIndex={secondCsvInflowColumnIndex}
            setSecondCsvInflowColumnIndex={setSecondCsvInflowColumnIndex}

            calculateButtonClickHandler={calculateButtonClickHandler}

            maxWidth={MAXWIDTH} />
        }

        {firstCsvData !== null && firstCsvData.rows.some(row => row.oppositeCsvMatchingRowIndex !== undefined) &&
          <ResultTable
            csvData={firstCsvData}
            title="Unmatched transactions in first CSV file"
            maxWidth={MAXWIDTH} />
        }

        {secondCsvData !== null && secondCsvData.rows.some(row => row.oppositeCsvMatchingRowIndex !== undefined) &&
          <ResultTable
            csvData={secondCsvData}
            title="Unmatched transactions in second CSV file"
            maxWidth={MAXWIDTH} />
        }

        <Flex flex="1" alignItems="end" justifyContent="center" padding="1rem" whiteSpace="pre-wrap" background="transparent">
          Made with ♥ by <Link href="https://github.com/ohjohnsen" target="_blank">Øystein Holvik Johnsen</Link>
        </Flex>
      </Flex>
		</ChakraProvider>
	);
};

export default App;
