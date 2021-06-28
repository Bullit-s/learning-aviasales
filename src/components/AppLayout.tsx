import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { deviceSize } from "../assets/styles/theme/deviceSize";
import ImageLogo from "../assets/images/logo.png";

interface Props {
  sidebar: ReactNode;
}

export const AppLayout: FC<Props> = ({ sidebar, children }) => {
  return (
    <Layout>
      <img src={ImageLogo} alt={"logo"} />
      <Title>Поиск авиабилетов</Title>
      <ContentWrapper>
        <Sidebar>{sidebar}</Sidebar>
        <Content>{children}</Content>
      </ContentWrapper>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;

  @media screen and ${deviceSize.tablet} {
    padding: 50px;
  }
`;

const Title = styled.h1`
  color: #359fa1;
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 50px;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  grid-gap: 12px;
  max-width: 1050px;

  @media screen and ${deviceSize.tablet} {
    grid-template-columns: 330px 1fr;
    grid-gap: 20px;
  }
`;

const Sidebar = styled.div``;
const Content = styled.div``;
