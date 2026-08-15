import React from 'react';

const TableSkeleton = ({
  tableType = 'admin',
  showCollapsible = false,
  rowsCount = 5,
  showPagination = true,
}) => {
  const skeletonRows = Array.from({ length: rowsCount }, (_, index) => index);

  const getTableHeaders = () => {
    const headers = {
      post: [
        { width: '20%', label: 'Company' },
        { width: '15%', label: 'Role' },
        { width: '15%', label: 'Package' },
        { width: '10%', label: 'Date' },
        { width: '10%', label: 'Location' },
        { width: '10%', label: 'Status' },
        { width: '15%', label: 'Actions' },
      ],
      comment: [
        { width: '15%', label: 'Name' },
        { width: '15%', label: 'Number' },
        { width: '10%', label: 'Date' },
        { width: '15%', label: 'Subject' },
        { width: '35%', label: 'Message' },
        { width: '10%', label: 'Actions' },
      ],
      transaction: [
        { width: '20%', label: 'Name' },
        { width: '15%', label: 'Plan' },
        { width: '20%', label: 'Transaction ID' },
        { width: '15%', label: 'Transaction Type' },
        { width: '10%', label: 'Status' },
        { width: '10%', label: 'Actions' },
      ],
      subscription: [
        { width: '20%', label: 'Plan' },
        { width: '15%', label: 'Price' },
        { width: '15%', label: 'Duration' },
        { width: '15%', label: 'Status' },
        { width: '15%', label: 'Actions' },
      ],
      referral: [
        { width: '25%', label: 'Name' },
        { width: '20%', label: 'Referral Code' },
        { width: '15%', label: 'Total Referrals' },
        { width: '20%', label: 'Earned' },
        { width: '20%', label: 'Status' },
      ],
      questions: [
        { width: '30%', label: 'Question' },
        { width: '15%', label: 'Difficulty' },
        { width: '12%', label: 'Type' },
        { width: '12%', label: 'Status' },
        { width: '13%', label: 'Created' },
        { width: '18%', label: 'Actions' },
      ],
      admin: [
        { width: '25%', label: 'Name' },
        { width: '15%', label: 'Role' },
        { width: '20%', label: 'Email' },
        { width: '10%', label: 'Gender' },
        { width: '15%', label: 'Number' },
        { width: '10%', label: 'Status' },
        { width: '10%', label: 'Actions' },
      ],
      user: [
        { width: '25%', label: 'Name' },
        { width: '20%', label: 'Email' },
        { width: '10%', label: 'Gender' },
        { width: '15%', label: 'Mobile Number' },
        { width: '10%', label: 'Resume' },
        { width: '10%', label: 'Status' },
        { width: '10%', label: 'Actions' },
      ],
    };

    return headers[tableType] || headers.admin;
  };

  const headers = getTableHeaders();

  const TableHeaderCell = ({ width, children }) => (
    <th
      className="text-left text-sm font-semibold tracking-wide p-4"
      style={{ width, backgroundColor: 'hsl(var(--muted))', color: 'inherit' }}
    >
      <div className="w-[70%] h-5 bg-gray-300 animate-pulse rounded" />
    </th>
  );

  const SkeletonCell = ({ width, isFirst = false, isAction = false, isStatus = false }) => (
    <td className="p-4 border-b border-border" style={{ width }}>
      {isFirst ? (
        <div className="flex items-center gap-1.5">
          <div className="w-9 h-9 rounded-full bg-gray-300 animate-pulse" />
          <div className="w-[60%] h-5 bg-gray-300 animate-pulse rounded" />
        </div>
      ) : isAction ? (
        <div className="flex gap-1">
          <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
        </div>
      ) : isStatus ? (
        <div className="w-20 h-6 rounded-full bg-gray-300 animate-pulse" />
      ) : (
        <div className="w-[80%] h-5 bg-gray-300 animate-pulse rounded" />
      )}
    </td>
  );

  return (
    <div className="w-full overflow-hidden rounded-md">
      <div className="w-full overflow-x-auto">
        <table className="w-full table-fixed" aria-label="skeleton table">
          <thead>
            <tr>
              {showCollapsible && (
                <th className="w-[5%]" style={{ backgroundColor: '#e8e8e8' }}>
                  <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse m-2" />
                </th>
              )}
              {headers.map((header, index) => (
                <TableHeaderCell key={index} width={header.width}>
                  {header.label}
                </TableHeaderCell>
              ))}
            </tr>
          </thead>
          <tbody>
            {skeletonRows.map((_, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <tr className="hover:bg-primary/5 transition-colors">
                  {showCollapsible && (
                    <td className="w-[5%] p-4">
                      <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse" />
                    </td>
                  )}
                  {headers.map((header, cellIndex) => (
                    <SkeletonCell
                      key={cellIndex}
                      width={header.width}
                      isFirst={cellIndex === 0}
                      isAction={header.label === 'Actions'}
                      isStatus={header.label === 'Status'}
                    />
                  ))}
                </tr>

                {showCollapsible && rowIndex === 0 && (
                  <tr>
                    <td className="p-0" colSpan={headers.length + (showCollapsible ? 1 : 0)}>
                      <div className="m-2">
                        <div className="flex items-center gap-1 mb-2">
                          <div className="w-5 h-5 rounded-full bg-gray-300 animate-pulse" />
                          <div className="w-36 h-6 bg-gray-300 animate-pulse rounded" />
                        </div>
                        <div className="flex flex-col gap-1">
                          {Array.from({ length: 2 }, (_, index) => (
                            <div
                              key={index}
                              className="p-2 border border-border rounded bg-muted"
                            >
                              <div className="flex justify-between items-center">
                                <div className="flex-1">
                                  <div className="w-[60%] h-5 bg-gray-300 animate-pulse rounded mb-1" />
                                  <div className="w-[40%] h-4 bg-gray-300 animate-pulse rounded" />
                                </div>
                                <div className="w-20 h-6 bg-gray-300 animate-pulse rounded" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {showPagination && (
        <div className="flex justify-between items-center p-2 border-t border-border">
          <div className="w-30 h-5 bg-gray-300 animate-pulse rounded" />
          <div className="flex items-center gap-2">
            <div className="w-24 h-5 bg-gray-300 animate-pulse rounded" />
            <div className="flex gap-1">
              <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
              <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
              <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableSkeleton;