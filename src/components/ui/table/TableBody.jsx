// src/components/ui/table/TableBody.jsx
import React from 'react';

const TableBody = ({ children, className }) => {
  return <tbody className={className}>{children}</tbody>;
};

export default TableBody;
