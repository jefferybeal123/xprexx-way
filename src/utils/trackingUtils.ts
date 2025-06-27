
export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'in transit':
    case 'out for delivery':
      return 'bg-blue-100 text-blue-800';
    case 'processing':
    case 'order received':
      return 'bg-yellow-100 text-yellow-800';
    case 'delayed':
    case 'exception':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
