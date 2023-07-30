import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as answers from "../../services/answersService";
import * as questions from "../../services/questionsService";
import * as topic from "../../services/topicsService";
import './Result.scss';

function Result() {

  const params = useParams();
  const [dataResult, setDataResult] = useState([]);
  const [info, setInfo] = useState();

  useEffect(() => {
    const fetchAPi = async () => {
      const dataAnswers = await answers.getAnswer(params.id);
      const dataQuestions = await questions.getListQuestion(dataAnswers.topicId);

      let result = [];
      for (let i = 0; i < dataQuestions.length; i++) {
        result.push({
          ...dataQuestions[i],
          ...dataAnswers.answers.find(
            (item) => item.questionId === dataQuestions[i].id
          ),
        });
      }

      setDataResult(result);

      const infoTopic = await topic.getTopic(dataAnswers.topicId);

      let countAnswerTrue = 0;
      for (const item of result) {
        if (item.answers === item.correctAnswer) {
          countAnswerTrue++;
        }
      }

      let info = {
        ...infoTopic,
        countAnswerTrue: countAnswerTrue,
        totalAnswer: result.length
      };

      setInfo(info);
    };

    fetchAPi();
  }, []);

  return (
    <>
      <div>
        {info && (
          <>
            <h2>Kết quả chủ đề: {info.name}</h2>
            <div>
              <span>
                Đúng: <strong>{info.countAnswerTrue}</strong>
              </span>
              <span>
                | Sai:
                <strong>
                  {info.totalAnswer - info.countAnswerTrue}
                </strong>
              </span>
              <span>
                | Tỷ lệ đúng:
                <strong>
                  {info.countAnswerTrue / info.totalAnswer * 100}%
                </strong>
              </span>
            </div>
          </>
        )}

        {dataResult.length > 0 && (
          <div className="result">
            {dataResult.map((item, i) => (
              <div className="result__item" key={item.id}>
                <p>
                  <b>Câu {i + 1}: </b> {item.question}
                  {item.correctAnswer === item.answer ? (
                    <span className="result__tag result__tag--true">Đúng</span>
                  ) : (
                    <span className="result__tag result__tag--false">Sai</span>
                  )}
                </p>

                {item.answers.map((answer, index) => {
                  let className = "";
                  let checked = false;

                  if (item.answer === index) {
                    checked = true;
                    className = "result__item--selected";
                  }

                  if (item.correctAnswer === index) {
                    className += " result__item--result";
                  }

                  return (
                    <div key={index}>
                      <input
                        type="radio"
                        checked={checked}
                        disabled
                      />
                      <label className={className}>
                        {answer}
                      </label>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {info && (
          <Link to={"quiz/" + info.id}>
            <button className="button__redo">
              Làm lại
            </button>
          </Link>
        )}
      </div>
    </>
  );
}

export default Result;