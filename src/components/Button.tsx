import * as React from 'react';
import * as ReactDom from 'react-dom';


interface ButtonProps {
    name: string
}

export default class Button extends React.Component<ButtonProps>{

    render(): JSX.Element {
        return <h1>Hello, {this.props.name}</h1>;
    }
}

