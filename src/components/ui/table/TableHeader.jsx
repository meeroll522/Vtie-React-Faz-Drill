// src/components/ui/table/TableHeader.jsx
import React from 'react';

const TableHeader = ({ children, className }) => {
  return <thead className={className}>{children}</thead>;
};

export default TableHeader;
