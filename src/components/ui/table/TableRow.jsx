// src/components/ui/table/TableRow.jsx
import React from 'react';

const TableRow = ({ children, className }) => {
  return <tr className={`border-b ${className}`}>{children}</tr>;
};

export default TableRow;
