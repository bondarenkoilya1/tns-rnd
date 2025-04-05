import styled from "@emotion/styled";

export const UserVideoContainerStyled = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
`;

export const UserVideoCameraStyled = styled.video`
  width: 100%;
  border-radius: 4px;
`;

export const UserVideoCameraBlankStyled = styled.div`
  width: 100%;
  height: 525px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.1);
`;

export const UserVideoCaptionStyled = styled.span`
  padding: 5px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  position: absolute;
  bottom: 2%;
  left: 2%;
  font-size: 16px;
`;
