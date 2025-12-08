export const formatVNTime = (isoString: string, enough: boolean) => {
  if (!isoString) return '';

  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return 'Ngày không hợp lệ';
  }

  const formatter = new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: enough === true ? '2-digit' : undefined,
    minute: enough === true ? '2-digit' : undefined,
    second: enough === true ? '2-digit' : undefined,
    hour12: false,
    timeZone: 'Asia/Ho_Chi_Minh'
  });

  return formatter.format(date);
};