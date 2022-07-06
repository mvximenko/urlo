import styled, { css } from 'styled-components';

const mobile = () => `@media only screen and (max-width: 960px)`;

const column = css`
  display: flex;
  flex-direction: column;
`;

export const TopSection = styled.section`
  margin: 0 14%;

  ${mobile} {
    margin: 0 5%;
  }
`;

export const Row = styled.div`
  height: 300px;
  margin-bottom: 40px;
  display: flex;

  ${mobile} {
    height: 400px;
    margin-bottom: 20px;
    flex-direction: column-reverse;
  }
`;

export const LeftColumn = styled.div`
  ${column}
  width: 50%;
  margin-right: 15px;
  justify-content: center;

  ${mobile} {
    width: 100%;
    margin-right: 0;
    text-align: center;
  }
`;

export const RightColumn = styled.div`
  width: 50%;
  margin-left: 15px;
  position: relative;
  user-select: none;

  img {
    object-position: right;
  }

  ${mobile} {
    width: 100%;
    height: 100%;
    margin-left: 0;

    img {
      object-position: center;
    }
  }
`;

export const Heading = styled.h1`
  width: 100%;
  font-size: 46px;
  margin-bottom: 0.5rem;

  ${mobile} {
    font-size: 28px;
  }
`;

export const Paragraph = styled.p`
  margin-top: 0;
  color: #747474;
  font-weight: 500;
`;

export const Section = styled.section`
  padding: 20px 14%;
  display: flex;
  flex-direction: column;
  background: #3b3054;

  ${mobile} {
    padding: 20px 5%;
    flex-direction: column;
  }
`;

export const Form = styled.form`
  display: flex;

  ${mobile} {
    flex-direction: column;
  }
`;

export const Input = styled.input`
  flex: 1;
  height: 60px;
  font-size: 20px;
  outline-color: #2acfcf;
  border-radius: 8px;
  margin-right: 2%;
  padding: 18px 20px;
  border: none;

  ${mobile} {
    flex: none;
    height: 50px;
    font-size: 16px;
    margin: 0 0 10px 0;
  }
`;

export const ShortenButton = styled.button`
  height: 60px;
  min-width: 25%;
  font-size: 20px;
  font-weight: 600;
  border-radius: 6px;
  color: white;
  background: #2acfcf;
  transition: background 100ms linear;
  cursor: pointer;

  &:hover {
    background: #9be3e2;
  }

  ${mobile} {
    height: 50px;
    font-size: 16px;
  }
`;

export const Links = styled.ul`
  ${column}
  margin: 40px 0 0;
  padding: 0;
  border-radius: 6px;
  background: white;
  color: #1d1f21;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 5px;
  padding: 16px 20px;

  & + & {
    border-top: 2px solid #e8e9eb;
  }

  ${mobile} {
    align-items: normal;
    flex-direction: column;
    justify-content: normal;
  }
`;

export const RightSide = styled.span`
  display: flex;
  align-items: center;

  ${mobile} {
    align-items: flex-start;
    &:nth-child(2) {
      ${column}
    }
  }
`;

export const LongLink = styled.span`
  padding: 6px 0;
  font-size: 18px;
  max-width: 500px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const ShortLink = styled.a`
  margin-right: 25px;
  font-size: 18px;
  color: #2acfcf;
  transition: color 100ms linear;

  &:hover {
    color: #9be3e2;
  }

  ${mobile} {
    padding: 6px 0;
  }
`;

export const CopyButton = styled.button<{ copy?: boolean }>`
  width: 100px;
  padding: 12px 20px;
  color: white;
  background: #2acfcf;
  border-radius: 6px;
  transition: background 100ms linear;
  text-align: center;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #9be3e2;
  }

  ${({ copy }) =>
    copy && `background: #649949; &:hover { background: #649949; }`}

  ${mobile} {
    width: 100%;
  }
`;

export const BottomSection = styled.section`
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-image: url('/bg-desktop.svg');
  background-color: #3a3053;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  ${mobile} {
    height: 50%;
    background-image: url('/bg-mobile.svg');
  }
`;

export const Repository = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RepositoryHeading = styled.h1`
  margin-top: 0;
  text-align: center;
  font-size: 46px;

  ${mobile} {
    font-size: 32px;
  }
`;

export const RepositoryLink = styled.a`
  padding: 20px;
  background: #2bd1d1;
  transition: background 100ms linear;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  font-size: 20px;
  font-weight: 600;

  &:hover {
    background: #9be3e2;
  }

  ${mobile} {
    padding: 15px;
    font-size: 16px;
  }
`;
