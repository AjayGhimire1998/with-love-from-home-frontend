export const handleReadMore = () => {
  const hiddenParagraph = document.getElementById("hidden-paragraph");
  const readMore = document.querySelector(".read-more");
  hiddenParagraph.style.display = "block";
  readMore.style.display = "none";
};

export function calculateAverageRating(reviews) {
  let totalRating = 0;
  reviews?.forEach((review) => {
    totalRating += review.rating;
  });
  return Math.floor(totalRating / reviews?.length);
}
export const fixTimezoneOffset = (date) => {
  if (!date) return "";
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toJSON();
};

export function readableDate(date) {
  const dateTime = new Date(date.slice(0, -1));
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dateTimeDay = days[dateTime.getDay()];
  const dateTimeDate = dateTime.getDate();
  const dateTimeMonth = dateTime.toLocaleString("default", { month: "long" });
  const dateTimeYear = dateTime.getFullYear();
  const dateTimeHour = dateTime.getHours() % 12 || 12;
  const hour = dateTime.getHours();

  const dateTimeMinute = dateTime.getMinutes();
  const minutes = dateTimeMinute <= 9 ? "0" + dateTimeMinute : dateTimeMinute;
  const amPm = hour >= 12 ? "pm" : "am";
  return (
    dateTimeDay +
    "," +
    " " +
    dateTimeDate +
    " " +
    dateTimeMonth +
    " " +
    dateTimeYear +
    " " +
    "at" +
    " " +
    dateTimeHour +
    ":" +
    minutes +
    " " +
    amPm
  );
}

export function setProperAddress(addressobject) {
  if (addressobject.apt !== "/") {
    return `${addressobject.apt || ""}${addressobject.street_address + ","} ${
      addressobject.suburb + ","
    } ${addressobject.state + " " + addressobject.zip} `;
  } else {
    return `${addressobject.street_address + ","} ${
      addressobject.suburb + ","
    } ${addressobject.state + " " + addressobject.zip} `;
  }
}
