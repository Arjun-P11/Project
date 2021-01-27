export default async function GetData(query) {
  const retObj = {
    status: "",
    data: null,
  };
  const search = `http://localhost:8001/${query}`;
  try {
    const response = await fetch(search);
    if (response.status === 200) {
      const data = await response.json();
      retObj.status = "success";
      retObj.data = data;
      return retObj;
    }
  } catch (e) {
    retObj.status = "error";
    return retObj;
  }
}
