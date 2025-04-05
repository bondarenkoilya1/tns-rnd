import styled from "@emotion/styled";

export const TextChatStyled = styled.div`
  position: fixed;
  right: 5%;
  top: 10%;
  width: 400px;
  height: 80%;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 15px;
`;

export const TextChatMessagesListStyled = styled.ul`
  height: 80%;
  overflow-y: auto;
  padding: 10px;
  margin-top: 20px;
`;

export const TextChatTitleStyled = styled.p`
  margin: 0 auto;
  text-align: center;
  font-weight: 500;
  font-size: 24px;
`;

export const TextChatMessageStyled = styled.p`
  background-color: #edeaea;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  & span {
    font-weight: 700;
  }
`;

export const TextChatHelperTextStyled = styled.p`
  color: grey;
  font-size: 14px;
  margin-top: 10px;
  line-height: 1.2;

  & span {
    display: block;
    font-weight: 700;
  }
`;
