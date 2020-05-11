import { useQuery } from 'react-apollo-hooks';
import React from 'react';
import { FILES } from '../../Services/Queries';
/** old download file without Cloudianry sistem **/
export const Files = (props) => {
  const { data, loading } = useQuery(FILES);

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      {data.files.map((x) => (
        <img style={{ width: 200 }} key={x} src={`http://localhost:3000/images/${x}`} alt={x} />
      ))}
    </div>
  );
};
