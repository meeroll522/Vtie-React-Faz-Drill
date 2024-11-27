// src/components/ui/table/TableHead.jsx
import React from 'react';

const TableHead = ({ children, className }) => {
  return <th className={`px-4 py-2 text-left ${className}`}>{children}</th>;
};

export default TableHead;
