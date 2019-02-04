import * as React from 'react';
import styled from 'styles/styled-components';

interface IStyle {
  opacity: number;
}
const Div = styled('div')<IStyle>`
  width: 240px;
  height: 100%;
  opacity: ${props => props.opacity};
`;

export class SideBar extends React.PureComponent<any, any> {
  public render(): React.ReactNode {
    return <Div opacity={0.5}>SideBar</Div>;
  }
}
