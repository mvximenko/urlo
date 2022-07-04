import styled, { css } from 'styled-components';

const mobile = () => `@media only screen and (max-width: 960px)`;

const column = css`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  margin: 0 14%;

  ${mobile} {
    margin: 0 5%;
  }
`;

export const Form = styled.form`
  display: flex;
  margin-bottom: 40px;

  input {
    flex: 1;
    height: 60px;
    font-size: 20px;
    outline-color: #2a5bd7;
    border-radius: 8px;
    margin-right: 2%;
    padding: 18px 20px;

    &:focus {
      border-color: #2a5bd7;
    }
  }

  ${mobile} {
    flex-direction: column;

    input {
      flex: none;
      height: 50px;
      font-size: 16px;
      margin: 0 0 10px 0;
    }
  }
`;

export const ShortenButton = styled.button`
  height: 60px;
  min-width: 25%;
  font-size: 20px;
  border-radius: 6px;
  color: white;
  background: #1b3987;
  transition: background 100ms linear;
  cursor: pointer;

  &:hover {
    background: #2a5bd7;
  }

  ${mobile} {
    height: 50px;
    font-size: 16px;
  }
`;

export const Links = styled.ul`
  ${column}
  padding: 0;
  border-radius: 6px;
  background: white;
  color: #1d1f21;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 5px;
    padding: 16px 20px;
  }

  li + li {
    border-top: 2px solid #e8e9eb;
  }

  ${mobile} {
    li {
      align-items: normal;
      flex-direction: column;
      justify-content: normal;
    }

    span:nth-child(2) {
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
  padding-right: 25px;
  font-size: 18px;
  color: #0236b9;

  ${mobile} {
    padding: 6px 0;
  }
`;

export const CopyButton = styled.span`
  padding: 9.6px 20px;
  border-radius: 6px;
  color: #2a5bd7;
  background: #edf2fe;
  transition: background 100ms linear;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: #cedafa;
  }
`;
