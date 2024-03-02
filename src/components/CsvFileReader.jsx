import React from "react"
import { useCSVReader } from "react-papaparse"
import { v4 as uuidv4 } from 'uuid';
import { Box, Button, HStack, Table, TableContainer, Tr, Th, Thead, Tbody, Td, Select, Text, Flex } from "@chakra-ui/react"

const styles = {
  csvReader: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10
  },
  browseFile: {
    width: "20%"
  },
  acceptedFile: {
    border: "1px solid #ccc",
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: "80%"
  },
  remove: {
    borderRadius: 0,
    padding: "0 20px"
  },
  progressBarBackgroundColor: {
    backgroundColor: "red"
  }
}

const CsvFileReader = props => {
  const { CSVReader } = useCSVReader()
  const { csvData, setCsvData, setOutflowIndex, setInflowIndex } = props;

  /*

  {
    columnHeaders: [ string, string, string... ]
    rows: [ {
      columns: [ string, string string... ],
      oppositeCsvMatchingRowIndex: num,
    } ]
  }


  */

  return (
    <CSVReader
      onUploadAccepted={results => {
        console.log("---------------------------")
        console.log(results)
        console.log("---------------------------")
        const _csvData = {};
        _csvData.columnHeaders = results.data[0];
        _csvData.rows = results.data.slice(1).map(row => {
          return {
            columns: [...row],
            oppositeCsvMatchingRowIndex: undefined
          };
        });
        console.log(_csvData);
        setCsvData(_csvData);
      }}
    >
      {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (

        <Box>
          <HStack>
            <Button {...getRootProps()}>
              Browse files
            </Button>
            {acceptedFile !== null &&
              <Flex direction="row">
                <Box>
                  {acceptedFile.name}
                </Box>
                <Button
                  {...getRemoveFileProps()}
                  onClick={event => {
                    getRemoveFileProps().onClick(event);
                    setCsvData(null);
                  }}>
                  Remove
                </Button>
              </Flex>
            }
          </HStack>
          <ProgressBar style={styles.progressBarBackgroundColor} />
          {csvData !== null &&
            <>
              <TableContainer overflowX="scroll" maxWidth="80vw">
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      {csvData.columnHeaders.map(columnHeader => {
                        return (
                          <Th key={uuidv4()}>{columnHeader}</Th>
                        )
                      })}
                    </Tr>
                  </Thead>
                  <Tbody>
                  {csvData.rows.slice(0, 5).map(row => {
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

              <HStack>
                <Text width='10rem'>
                  Outflow column
                </Text>
                <Select defaultValue={'DEFAULT'} onChange={e => {
                  setOutflowIndex(e.target.value);
                  console.log(e.target.value);
                }}>
                  <option value='DEFAULT' hidden disabled>Select a column...</option>
                  {csvData.columnHeaders.map((columnHeader, index) => {
                    return (
                      <option key={index} value={index}>{columnHeader}</option>
                    )
                  })}
                </Select>
              </HStack>

              <HStack>
                <Text width='10rem'>
                  Inflow column
                </Text>
                <Select defaultValue={'DEFAULT'} onChange={e => {
                  setInflowIndex(e.target.value);
                  console.log(e.target.value);
                }}>
                  <option value='DEFAULT' hidden disabled>Select a column...</option>
                  {csvData.columnHeaders.map((columnHeader, index) => {
                    return (
                      <option key={index} value={index}>{columnHeader}</option>
                    )
                  })}
                </Select>
              </HStack>
            </>
          }
        </Box>
      )}
    </CSVReader>
  )
}

export default CsvFileReader;
