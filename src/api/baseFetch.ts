export const baseFetch = async (url = "") => {
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json();
};
