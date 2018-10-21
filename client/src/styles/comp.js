import styled from 'styled-components';

export const SubmitButton = styled.button`
  border-radius: 5px;
  color: ${props => props.theme.white};
  background: ${props => props.theme.primary};
  border: none;
  padding: 1rem 1.5rem;
  font-weight: 600;
  font-size: 1.8rem;
  transition: all 0.3s cubic-bezier(0.895, 0.03, 0.685, 0.22);
  display: inline-block;
  flex: 0;
  align-self: center;
  &:hover {
    transform: translateY(-1px);
    transition: all 0.15s cubic-bezier(0.895, 0.03, 0.685, 0.22);
    cursor: pointer;
  }
`;
