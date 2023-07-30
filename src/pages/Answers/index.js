import { useEffect, useState } from "react";
import * as answers from "../../services/answersService";
import * as topic from "../../services/topicsService";
import { Link } from "react-router-dom";
import './Answers.scss';

function Answers() {
  const [dataAnswers, setDataAnswers] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const answerByUserId = await answers.getAnswerByUserId();
      const topics = await topic.getListTopic();

      let result = [];
      for (let i = 0; i < answerByUserId.length; i++) {
        result.push({
          ...answerByUserId[i],
          ...topics.find((item) => item.id === answerByUserId[i].topicId),
          id: answerByUserId[i].id,
        });
      }

      setDataAnswers(result.reverse());
    };
    fetchApi();
  }, []);

  return (
    <>
      <div>
        <h2>Danh sách bài đã luyện tập</h2>
        {dataAnswers.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên chủ đề</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataAnswers.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <Link to={"/result/" + item.id}>
                      <button className="button__review">Xem chi tiết</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Answers;
