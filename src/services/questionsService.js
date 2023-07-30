import { get } from "../utils/request";

export const getListQuestion = async (id = "") => {
  let topicId = "";
  if(id !== "") {
    topicId = `?topicId=${id}`;
  }
  const result = await get(`questions${topicId}`);
  return result;
}