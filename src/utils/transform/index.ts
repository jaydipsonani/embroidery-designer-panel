import moment from 'moment-timezone';

export function convertToUserTimeZoneString(originalDateString: string) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const parsedDate = moment.utc(originalDateString); // Parse the date string in UTC
  const userTimeZoneDate = parsedDate.clone().tz(userTimeZone); // Convert to user's time zone

  const formattedTimeString = userTimeZoneDate.format('DD-MM-YYYY hh:mm');

  return formattedTimeString;
}

// November 15, 2024
export function convertToUserTimeZoneFullMonth(originalDateString: string) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const parsedDate = moment.utc(originalDateString); // Parse the date string in UTC
  const userTimeZoneDate = parsedDate.clone().tz(userTimeZone); // Convert to user's time zone

  const formattedTimeString = userTimeZoneDate.format('MMMM D, YYYY');

  return formattedTimeString;
}

export function convertToUserTimeZoneShort(originalDateString: string) {
  if (!originalDateString) return "-";
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const parsedDate = moment.utc(originalDateString); // Parse as UTC
  const userTimeZoneDate = parsedDate.clone().tz(userTimeZone); // Convert to user TZ

  return userTimeZoneDate.format("DD-MMM-YYYY hh:mm A"); 
}

// Dec 1, 2024
export function convertToUserTimeZoneStringFullDate(
  originalDateString: string
) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const parsedDate = moment.utc(originalDateString, 'YYYY-MM-DD HH:mm:ss');
  const userTimeZoneDate = parsedDate.clone().tz(userTimeZone);

  const formattedDateString = userTimeZoneDate.format('MMM D, YYYY');

  return formattedDateString;
}

//

// 06-01-2025
export function formatShowMonthFullDate(dateString: string): string {
  const normalDate = new Date(dateString);

  const day = String(normalDate.getDate()).padStart(2, '0');
  const month = String(normalDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = normalDate.getFullYear();
  return `${day}-${month}-${year}`;
}

export const format = (date: string) => {
  const [year, month, day] = date;
  return `${day}-${month}-${year}`;
};

export const formatDateFull = (date: string | null | undefined) => {
  if (!date) return '-'; // handle null/undefined

  const [year, month, day] = date.split('-');
  return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  return `${month}/${day}/${year} ${hours}:${minutes}`;
}

export function toStringAsFixed0(value: number): string {
  const value1 = value.toFixed(1);
  const [integerPart, decimalPart] = value1.split('.');
  if (parseInt(decimalPart) >= 5) {
    return `${integerPart}.5`;
  }
  return integerPart;
}
