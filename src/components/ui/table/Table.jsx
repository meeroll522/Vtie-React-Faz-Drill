// Table.jsx
const Table = ({ children, className }) => {
    return <table className={className}>{children}</table>;
  };
  
  const TableRow = ({ children }) => <tr>{children}</tr>;
  const TableHeader = ({ children }) => <thead>{children}</thead>;
  const TableHead = ({ children }) => <th>{children}</th>;
  const TableBody = ({ children }) => <tbody>{children}</tbody>;
  const TableCell = ({ children }) => <td>{children}</td>;
  
  // Exporting Table as default and others as named exports
  export default Table;
  export { TableRow, TableHeader, TableHead, TableBody, TableCell };
  