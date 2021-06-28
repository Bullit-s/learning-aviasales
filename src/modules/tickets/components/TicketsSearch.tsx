import { Input } from "antd";
import styled from "styled-components";
import { InputProps } from "antd/lib/input/Input";

type Props = Pick<InputProps, "value" | "onChange"> & {
  count?: number;
  isLoading: boolean;
};

export const TicketsSearch = ({ count, isLoading, ...rest }: Props) => {
  return (
    <SearchWrapper>
      <Input placeholder={"Поиск..."} {...rest} />
      <Count>{isLoading ? <>Загрузка...</> : <>Найдено: {count}</>}</Count>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
`;

const Count = styled.span`
  margin-left: 12px;
  white-space: nowrap;
  color: var(--color-green1);
  font-weight: 500;
`;
