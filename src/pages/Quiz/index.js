import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as topics from "../../services/topicsService";
import * as questions from "../../services/questionsService";
import * as answers from "../../services/answersService";
import { getCookie } from "../../helpers/cookie";
import './Quiz.scss';

function Quiz() {

  const params = useParams();
  const [dataTopic, setDataTopic] = useState([]);
  const [dataQuestions, setDataQuestions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await topics.getTopic(params.id);
      setDataTopic(result);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await questions.getListQuestion(params.id);
      setDataQuestions(result);
    };
    fetchApi();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let selectedAnswers = [];
    for(var i = 0; i < e.target.elements.length; i++) {
      if(e.target.elements[i].checked) {
        const name = e.target.elements[i].name;
        const value = e.target.elements[i].value;
        selectedAnswers.push({
          questionId: parseInt(name),
          answer: parseInt(value)
        });
      }
    }

    const options = {
      userId: parseInt(getCookie("id")),
      topicId: parseInt(params.id),
      answers: selectedAnswers
    };

    const result = await answers.createAnswer(options);
    if(result) {
      navigate(`/result/${result.id}`);
    }
  }

  return (
    <>
      <div className="quiz">
        {dataTopic &&
          <h2>Bài Quiz chủ đề: {dataTopic.name}</h2>}
        {dataQuestions.length > 0 && (
          <div className="form-quiz">
            <form onSubmit={handleSubmit}>
              {dataQuestions.map((item, i) => (
                <div className="form-quiz__item" key={item.id}>
                  <p>
                    <b>Câu {i + 1}:</b> {item.question}
                  </p>

                  {item.answers.map((answers, index) => (
                    <div key={index}>
                      <input 
                        type="radio"
                        name={item.id}
                        value={index}
                        id={`quiz-${item.id}-${index}`}
                        required
                      />
                      <label htmlFor={`quiz-${item.id}-${index}`}>{answers}</label>
                    </div>
                  ))}
                </div>
              ))}
              <button className="button button-main" >
                Nộp bài
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  )
}

export default Quiz;