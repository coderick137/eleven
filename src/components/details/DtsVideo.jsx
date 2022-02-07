import React, { useContext } from 'react';
import ReactPlayer from 'react-player';
import Context from '../../context/Context';

export default function DtsVideo() {
  const { details } = useContext(Context);

  return (
    <div className="dts-video">
      <ReactPlayer
        data-testid="video"
        url={ details.strYoutube }
        width="640px"
        height="360px"
      />
    </div>
  );
}
