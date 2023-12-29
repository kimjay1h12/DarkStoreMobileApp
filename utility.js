export const errorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong";
  export const ProductSort = (data) => {
    const groupedData = {};
  
    data.forEach((item) => {
      const category = item.category;
  
      if (!groupedData[category]) {
        groupedData[category] = [];
      }
  
      groupedData[category].push(item);
    });
    return groupedData;
  };
  export const ProductSortByBrands = (data) => {
    const groupedData = {};
  
    data.forEach((item) => {
      const brand = item.brand;
  
      if (!groupedData[brand]) {
        groupedData[brand] = [];
      }
  
      groupedData[brand].push(item);
    });
    return groupedData;
  };
export const currencyFormatter = (value, options) => {
  const defaultOptions = {
    significantDigits: 2,
    thousandsSeparator: ",",
    decimalSeparator: ".",
    symbol: "₦",
  };
  if (typeof value !== "number") value = 0.0;
  options = { ...defaultOptions, ...options };

  options.symbol = options.symbol?.replace("USD", "$");
  options.symbol = options.symbol?.replace("NGN", "₦");

  value = value.toFixed(options.significantDigits);

  const [currency, decimal] = value.split(".");
  return `${options.symbol} ${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options.thousandsSeparator
  )}${options.decimalSeparator}${decimal}`;
};
export function groupArrayByProperty(array, property) {
  const groupedData = [];
  const propertyMap = {};

  array?.forEach((item) => {
    const propertyValue = item[property];

    if (!propertyMap[propertyValue]) {
      propertyMap[propertyValue] = [];
    }

    propertyMap[propertyValue].push(item);
  });

  for (const key in propertyMap) {
    groupedData.push({ [property]: key, items: propertyMap[key] });
  }

  return groupedData;
}
export function formatDateToYYYYMMDD(isoDate) {
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleDateString("en-US");
  return formattedDate;
}
export const formatDate = (inputDate) => {
  const date = new Date(inputDate);

  // Define an array of month names for formatting
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the day of the week, month, day, and year
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Add the appropriate suffix to the day (e.g., 21st, 22nd, 23rd)
  let dayWithSuffix;
  if (day === 1 || day === 21 || day === 31) {
    dayWithSuffix = `${day}st`;
  } else if (day === 2 || day === 22) {
    dayWithSuffix = `${day}nd`;
  } else if (day === 3 || day === 23) {
    dayWithSuffix = `${day}rd`;
  } else {
    dayWithSuffix = `${day}th`;
  }

  // Format the final date string
  return `${dayOfWeek} ${dayWithSuffix} ${month}, ${year}`;
};
