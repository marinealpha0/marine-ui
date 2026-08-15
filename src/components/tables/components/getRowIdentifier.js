const getRowIdentifier = (row) => row?._id || row?.name || row?.role || row?.membershipName || row?.transactionId || row?.id || row?.question;

export default getRowIdentifier;
