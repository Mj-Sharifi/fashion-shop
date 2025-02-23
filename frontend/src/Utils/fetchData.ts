const fetchData = async (url, option = {}) => {
  try {
    const res = await fetch(url, option);
    const data = res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export default fetchData;
