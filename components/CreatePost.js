import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEye, faCog } from '@fortawesome/free-solid-svg-icons';

class CreatePost extends React.Component {
  render() {
    return (
      <div className="CreatePost">
        <div className="TopButtons">
          <div className="Preview">
            <div className="Wrapper">
              <FontAwesomeIcon icon={faEye} />
              <h1>Önizle</h1>
            </div>
          </div>

          <div className="Publish">
            <div className="Wrapper">
              <FontAwesomeIcon icon={faPaperPlane} />
              <h1>Gönder</h1>
            </div>
          </div>
        </div>
        <div className="MidContent">
          <div className="TextEditor">
            <div className="TextSettings">
              <select defaultValue="nunitosans">
                <option value="arial">Arial</option>
                <option value="nunitosans">Nunito Sans</option>
              </select>
            </div>
            <div className="TitleSection">
              <textarea></textarea>
            </div>
            <div className="TextSection"></div>
          </div>

          <div className="PostSettings">
            <div className="Top">
              <FontAwesomeIcon icon={faCog} />
              <h1>Yazı Ayarları </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;