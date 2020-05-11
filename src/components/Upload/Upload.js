import React from 'react';
import { Mutation } from 'react-apollo';
import { UPLOAD_FILE } from '../../services/Mutations';
/** old upload file without Cloudianry sistem **/
const UploadFile = (props) => {
  const sendData = (data) => {
    props.parentCallback(data);
  };
  return (
    <Mutation mutation={UPLOAD_FILE}>
      {(mutate) => (
        <input
          type="file"
          required
          onChange={({
            target: {
              validity,
              files: [file],
            },
          }) =>
            validity.valid &&
            mutate({ variables: { file } }).then((data) => sendData(data.data.singleUpload))
          }
        />
      )}
    </Mutation>
  );
};

export default UploadFile;
