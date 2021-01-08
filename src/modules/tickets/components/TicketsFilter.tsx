import { FormInstance } from "antd/es/form";
import React from "react";
import { Checkbox, Form } from "antd";
import styled from "styled-components";
import { FilterValues } from "../ticketsSlice";
import { filterOptions } from "../pages/TicketsPage";

const CheckboxGroup = Checkbox.Group;

interface Props {
  form: FormInstance;
  allChecked: boolean;
  checkedList: Array<keyof FilterValues>;
  onCheck: (checkedValues: Array<keyof FilterValues>) => void;
  onCheckAll: () => void;
  initialValues: FilterValues;
}

export const TicketsFilter = ({
  allChecked,
  checkedList,
  onCheck,
  onCheckAll,
}: Props) => {
  return (
    <Block>
      <Title>Количество пересадок</Title>
      <Checkbox checked={allChecked} onChange={onCheckAll}>
        Все
      </Checkbox>
      <CheckboxGroup
        options={filterOptions}
        value={checkedList}
        onChange={(list: any) => onCheck(list)}
      />
    </Block>
  );
};

const Block = styled.div`
  padding: 20px;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  > .ant-checkbox-wrapper,
  .ant-checkbox-group > .ant-checkbox-wrapper {
    margin-bottom: 10px;
  }
`;

const Title = styled.div`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 20px;
`;
