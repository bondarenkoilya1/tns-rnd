import { ContainerStyled } from "../../../styled";

import { DiscussionForm } from "../../components";
import { Discussion } from "../../components/ui/Discussion";
import { useDiscussionsStore } from "../../store";

export const Cabinet = () => {
  const { discussions } = useDiscussionsStore();

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
      <DiscussionForm />
    </ContainerStyled>
  );
};
