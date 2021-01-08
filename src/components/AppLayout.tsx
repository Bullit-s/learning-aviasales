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
      <Logo src={ImageLogo} alt={"logo"} />
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

const Logo = styled.img`
  margin-bottom: 50px;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  grid-gap: 12px;
  max-width: 750px;

  @media screen and ${deviceSize.tablet} {
    grid-template-columns: 230px 1fr;
    grid-gap: 20px;
  }
`;

const Sidebar = styled.div``;
const Content = styled.div``;
