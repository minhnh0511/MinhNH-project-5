import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Topics.scss';
import * as topics from '../../services/topicsService';

function Topics() {

  const [dataTopics, setDataTopics] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await topics.getListTopic();
      setDataTopics(result);
    }
    fetchApi();
  }, []);

  return (
    <>
      <div className='topics'>
        <h2>Danh sách chủ đề ôn luyện</h2>
        {dataTopics.length > 0 && (
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên chủ đề</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataTopics.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <Link to={"/quiz/" + item.id}>
                      <button className='button__submit'>
                        Làm bài
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default Topics;