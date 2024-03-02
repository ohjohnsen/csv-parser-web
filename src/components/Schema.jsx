import React from "react";
import { VStack, Box, Button, Heading } from "@chakra-ui/react";
import CsvFileReader from "./CsvFileReader";

const Schema = props => {

  const {
    firstCsvData,
    setFirstCsvData,
    setFirstCsvOutflowColumnIndex,
    setFirstCsvInflowColumnIndex,
    secondCsvData,
    setSecondCsvData,
    setSecondCsvOutflowColumnIndex,
    setSecondCsvInflowColumnIndex,
    calculateButtonClickHandler
  } = props;

  return (
    <VStack direction="column" width="100%" heigh="50rem" padding="0 1rem">
      <Box
        margin="1rem 0"
        padding="1rem"
        background="gray.100"
        borderRadius="0.5rem"
        width="100%"
        maxWidth="80rem">
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
        width="100%"
        maxWidth="80rem">
        <Heading as="h3" size="md">Second CSV file</Heading>
        <CsvFileReader
          csvData={secondCsvData}
          setCsvData={setSecondCsvData}
          setOutflowIndex={setSecondCsvOutflowColumnIndex}
          setInflowIndex={setSecondCsvInflowColumnIndex} />
      </Box>

      <Button onClick={calculateButtonClickHandler}>
        CALCULATE
      </Button>
    </VStack>
  );
}

export default Schema;
