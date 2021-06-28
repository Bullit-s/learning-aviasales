import { Input } from "antd";
import styled from "styled-components";
import { InputProps } from "antd/lib/input/Input";

type Props = Pick<InputProps, "value" | "onChange">;

export const TicketsSearch = (props: Props) => {
  return (
    <SearchWrapper>
      <Input placeholder={"Поиск..."} {...props} />
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  margin-bottom: 30px;
`;
