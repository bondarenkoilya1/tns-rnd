import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { ContainerStyled } from "../../../styled";

import { Discussion } from "../../components/ui/Discussion";
import { useDiscussionsStore } from "../../store";

export const Cabinet = () => {
  const { discussions, setDiscussions } = useDiscussionsStore();

  useEffect(() => {
    for (let i = 0; i < 3; i++)
      setDiscussions({
        id: uuidv4(),
        title: `Опрос #${i}`,
        description: `Описание #${i} опроса`,
        votingType: "online",
        endTime: "сегодня"
      });
  }, []);

  return (
    <ContainerStyled>
      {discussions.map(({ id, title, description, votingType, endTime }) => (
        <Discussion
          key={id}
          title={title}
          description={description}
          votingType={votingType}
          endTime={endTime}
        />
      ))}
    </ContainerStyled>
  );
};
