import { useState, useRef, useEffect, FC } from "react";

import {
  UserVideoCameraBlankStyled,
  UserVideoCameraStyled,
  UserVideoCaptionStyled,
  UserVideoContainerStyled
} from "./styled";
import { ButtonComponent } from "../Button";
import { Box } from "@mui/material";

type UserVideoProps = {
  username?: string;
};

export const UserVideo: FC<UserVideoProps> = ({ username }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const startUserVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setMediaStream(stream);
    } catch (error) {
      console.error("Ошибка подключения веб-камеры", error);
    }
  };

  const stopUserVideo = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      setMediaStream(null);
    }
  };

  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  return (
    <UserVideoContainerStyled>
      {mediaStream === null ? (
        <UserVideoCameraBlankStyled />
      ) : (
        <Box sx={{ position: "relative" }}>
          <UserVideoCameraStyled ref={videoRef} autoPlay muted />
          <UserVideoCaptionStyled>
            {username || prompt("Ваше имя не было загружено. Введите его еще раз:")}
          </UserVideoCaptionStyled>
        </Box>
      )}
      <Box sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
        <ButtonComponent
          variant="contained"
          size="medium"
          onClick={startUserVideo}
          color="error"
          style={{ marginRight: "20px" }}>
          Start video
        </ButtonComponent>
        <ButtonComponent variant="outlined" size="medium" onClick={stopUserVideo} color="primary">
          Stop video
        </ButtonComponent>
      </Box>
    </UserVideoContainerStyled>
  );
};
