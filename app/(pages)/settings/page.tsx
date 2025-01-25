'use client';

import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/navigation';

const GlobalStyle = createGlobalStyle`
  html, body {
    background-color: #ffffff;
    width: 100%;
    height: 100%;
  }
`;

const SettingsPage = () => {
  const router = useRouter();

  const menuData = [
    {
      category: 'Account',
      items: [
        { label: 'Edit profile', path: '/account/edit-profile' },
        { label: 'Edit preference', path: '/account/edit-preference' },
        { label: 'Edit healthInfo', path: '/account/edit-healthInfo' },
        { label: 'Change password', path: '/account/change-password' },
      ],
    },
    {
      category: 'Terms And Conditions',
      items: [
        { label: 'Privacy policy', path: '/terms/privacy-policy' },
        { label: 'Terms of Service', path: '/terms/terms-of-service' },
      ],
    },
    {
      category: 'Management',
      items: [
        { label: 'Logout', path: '/account/logout' },
        { label: 'Withdraw membership', path: '/account/withdraw' },
      ],
    },
  ];

  const handleMenuClick = (path: string) => {
    router.push(`/settings/${path}`);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <BackButton onClick={() => router.back()}>&lt;</BackButton>
          <Title>Settings</Title>
        </Header>
        <MenuList>
          {menuData.map((section, index) => (
            <MenuSection key={index}>
              <CategoryTitle>{section.category}</CategoryTitle>
              {section.items.map((item, label) => (
                <MenuItem key={label} onClick={() => handleMenuClick(item.path)}>
                  <span>{item.label}</span>
                  <ArrowIcon>&gt;</ArrowIcon>
                </MenuItem>
              ))}
            </MenuSection>
          ))}
        </MenuList>
      </Container>
    </>
  );
};

export default SettingsPage;

const Container = styled.div`
  margin: 0 auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  width: 24.375rem;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const BackButton = styled.div`
  font-size: 1.25rem;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin: 0 auto;
  color: var(--Gray-gray-900, #0B0B0B);
  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: SUIT;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const MenuList = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`;

const MenuSection = styled.div`
  margin-bottom: 24px;
`;

const CategoryTitle = styled.div`
  font-size: 0.875rem;
  color: #6A7784;
  margin: 0 16px 8px;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  border-top: 1px solid #e5e5e5;

  &:hover {
    background-color: #f9f9f9;
  }

  &:last-child {
    border-bottom: 1px solid #e5e5e5;
  }
`;

const ArrowIcon = styled.div`
  font-size: 1rem;
  color: #1e252f;
`;
