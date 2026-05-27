export const getMeditations = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return await response.json();
};
