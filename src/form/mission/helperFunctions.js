export function getLaunchName(launchId, launchPads) {
  for (let launchPad of launchPads) {
    if (launchPad.id === launchId) {
      return launchPad.full_name;
    }
  }
  return "Launch Site not Identified";
}
export function getTimeString(date) {
  let [hour, minute] = date.toLocaleTimeString("en-US").split(/:| /);
  if (hour.length < 2) {
    hour = "0" + hour;
  }
  if (minute.length < 2) {
    minute = "0" + minute;
  }
  return `${hour}:${minute}`;
}
export function getDateString(date) {
  const month = date.toLocaleString("default", { month: "long" });
  return `${date.getDate()} ${month} ${date.getFullYear()}`;
}
