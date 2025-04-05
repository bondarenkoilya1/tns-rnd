import styled from "@emotion/styled";

export const TextChatStyled = styled.div`
  position: fixed;
  right: 1%;
  top: 10%;
  width: 550px;
  height: 88%;
  background: #fff;
  border: 1px solid #fff;
  border-radius: 4px;
`;

export const TextChatContainerStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const TextChatContentStyled = styled.div`
  flex: 1 0 auto;
`;

export const TextChatFooterStyled = styled.div`
  flex: 0 0 auto;
  padding: 15px;
  border-radius: 0 0 4px 4px;
  border-top: 1px solid #000;
`;

export const TextChatMessagesListStyled = styled.ul`
  height: 80%;
  overflow-y: auto;
  padding: 10px 15px;
  margin-top: 20px;
`;

export const TextChatTitleContainerStyled = styled.div`
  background-color: #8ba9ea;
  padding: 20px 0;
  color: #fff;
  letter-spacing: 1.2px;
  border-radius: 4px 4px 0 0;
`;

export const TextChatTitleStyled = styled.p`
  margin: 0 auto;
  text-align: center;
  font-weight: 500;
  font-size: 24px;
`;

export const TextChatMessageStyled = styled.p`
  background-color: #ecf4fd;
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
    font-weight: 700;
  }
`;
