import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { TableContainer, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid';

const ResultTable = props => {
  const { csvData, title, maxWidth } = props;
  return (
      <Box
        margin="0 1rem"
        marginTop="1rem"
        padding="1rem"
        background="gray.100"
        borderRadius="0.5rem"
        width="100%"
        maxWidth={maxWidth}>
        <Heading as="h3" size="md">{title}</Heading>
        <TableContainer overflowX="scroll">
          <Table variant='simple' size='sm'>
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
            {csvData.rows.filter(row => row.oppositeCsvMatchingRowIndex === undefined).map(row => {
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
      </Box>
  );
}

export default ResultTable;
