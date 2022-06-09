export const buildQuery = (term) => {
  return term.split(" ").join("+");
};
export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const formatUrl = (url) => {
  const toMerge = url.split("//")[1].split("?")[0].split("/");
  return toMerge[0] + "/" + toMerge[2];
};
const formatAMPM = (hrs, mns) => {
  hrs = parseInt(hrs);
  mns = parseInt(mns);
  let ampm = hrs >= 12 ? "pm" : "am";
  hrs = hrs % 12;
  hrs = hrs ? hrs : 12;
  mns = mns.toString().padStart(2, "0");
  let strTime = hrs + ":" + mns + " " + ampm;
  return strTime;
};
export const getCurrentTime = () => {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  return [weekdays[today.getDay()], today.getHours(), today.getMinutes()];
};

export const convertTime = (openinghours) => {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [today] = getCurrentTime();
  const pos = weekdays.indexOf(today);
  let openHours = "";
  let closingHours = "";
  const convert = (item, idx) => {
    if (item.day === pos) {
      openHours = formatAMPM(item.start.slice(0, 2), item.start.slice(2, 5));
      closingHours = formatAMPM(item.end.slice(0, 2), item.end.slice(2, 5));
    }
  };
  openinghours.forEach(convert);

  return "· " + openHours + " - " + closingHours;
};

export const checkClosed = (openinghours) => {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [today, numHours, numMin] = getCurrentTime();
  let res = false;
  let hrs_int = parseInt(numHours.toString() + numMin.toString());
  for (let item of openinghours) {
    if (item.day === weekdays.indexOf(today)) {
      if (parseInt(item.start) <= hrs_int && hrs_int < parseInt(item.end)) {
        res = true;
      }
      break;
    }
  }
  return res ? "Open" : "Closed Now";
};

export const sortData = (data,sorts,currData) => {
  let sortedData = data;
  sortedData.forEach((i) => {
    if (i.price === "undefined" || i.price == null) {
      i.price = "";
    }
    if (i.review_count === "undefined" || i.review_count == null) {
      i.review_count = 0;
    }
    if (i.rating == null || i.rating === "undefined") {
      i.rating = 0;
    }
  });
  if (sorts.text === "Popular") {
    sortedData = currData.sort((a, b) => b.review_count - a.review_count);
  }
  if (sorts.text === "Rating") {
    sortedData = currData.sort((a, b) => b.rating - a.rating);
  }
  if (sorts.text === "Price (low-high)") {
    sortedData = sortedData.sort((a, b) => a.price.length - b.price.length);
  }
  if (sorts.text === "Price (high-low)") {
    sortedData = sortedData.sort((a, b) => b.price.length - a.price.length);
  }
  return sortedData;
};
