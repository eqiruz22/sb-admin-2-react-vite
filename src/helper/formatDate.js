export const formatDate = (date) => {
  const originalDate = new Date(date);
  const year = originalDate.getFullYear();
  const month = String(originalDate.getMonth() + 1).padStart(2, "0");
  const day = String(originalDate.getDate()).padStart(2, "0");
  const hour = String(originalDate.getHours()).padStart(2, "0");
  const minute = String(originalDate.getMinutes()).padStart(2, "0");
  const second = String(originalDate.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
