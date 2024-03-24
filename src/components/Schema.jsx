import React from "react";
import { VStack, Box, Button, Heading } from "@chakra-ui/react";
import CsvFileReader from "./CsvFileReader";

const Schema = props => {

  const {
    firstCsvData,
    setFirstCsvData,
    firstCsvOutflowColumnIndex,
    setFirstCsvOutflowColumnIndex,
    firstCsvInflowColumnIndex,
    setFirstCsvInflowColumnIndex,
    secondCsvData,
    setSecondCsvData,
    secondCsvOutflowColumnIndex,
    setSecondCsvOutflowColumnIndex,
    secondCsvInflowColumnIndex,
    setSecondCsvInflowColumnIndex,
    calculateButtonClickHandler,
    maxWidth
  } = props;

  console.log(firstCsvInflowColumnIndex);

  return (
    <VStack
      direction="column"
      width="100%"
      maxWidth={maxWidth}
      padding="0 1rem">
      <Box
        margin="1rem 0"
        padding="1rem"
        background="gray.100"
        borderRadius="0.5rem"
        width="100%">
        <Heading as="h3" size="md">First CSV file</Heading>
        <CsvFileReader
          csvData={firstCsvData}
          setCsvData={setFirstCsvData}
          setOutflowIndex={setFirstCsvOutflowColumnIndex}
          setInflowIndex={setFirstCsvInflowColumnIndex} />
      </Box>

      <Box
        marginBottom="1rem"
        padding="1rem"
        background="gray.100"
        borderRadius="0.5rem"
        width="100%">
        <Heading as="h3" size="md">Second CSV file</Heading>
        <CsvFileReader
          csvData={secondCsvData}
          setCsvData={setSecondCsvData}
          setOutflowIndex={setSecondCsvOutflowColumnIndex}
          setInflowIndex={setSecondCsvInflowColumnIndex} />
      </Box>

      <Button
        onClick={calculateButtonClickHandler}
        isDisabled={
          firstCsvData === null ||
          secondCsvData === null ||
          firstCsvOutflowColumnIndex === -1 ||
          firstCsvInflowColumnIndex === -1 ||
          secondCsvOutflowColumnIndex === -1 ||
          secondCsvInflowColumnIndex === -1
        }
      >
        CALCULATE
      </Button>
    </VStack>
  );
}

export default Schema;
