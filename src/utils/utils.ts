export const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
});

export const formatDate = (dateString: string) => {
  try {
    // Convert PocketBase date format to a format that works with Date constructor
    const date = new Date(dateString.replace(' ', 'T'));

    if (!isNaN(date.getTime())) {
      return dateFormatter.format(date);
    }
    return 'Invalid Date';
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Error';
  }
};

export const OK = 200;
export const CREATED = 201;
export const BAD_REQUEST = 400;
export const SERVER_ERROR = 500;
