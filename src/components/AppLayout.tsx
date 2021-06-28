import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { deviceSize } from "../assets/styles/theme/deviceSize";
import { ReactComponent as ImageLogo } from "../assets/images/plane.svg";

interface Props {
  sidebar: ReactNode;
}

export const AppLayout: FC<Props> = ({ sidebar, children }) => {
  return (
    <Layout>
      <LogoWrapper>
        <ImageLogo />
      </LogoWrapper>
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

  @media screen and ${deviceSize.laptop} {
    padding: 50px;
  }
`;

const Title = styled.h1`
  color: #09b487;
  font-size: 17px;
  font-weight: 600;
  margin: 25px 0;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  grid-gap: 12px;
  max-width: 960px;

  @media screen and ${deviceSize.laptop} {
    grid-template-columns: 240px 1fr;
    grid-gap: 20px;
  }
`;

const Sidebar = styled.div``;
const Content = styled.div``;

const LogoWrapper = styled.div`
  width: 75px;
  height: 75px;
  object-fit: contain;
`;
