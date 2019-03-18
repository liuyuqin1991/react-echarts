import * as React from 'react';
import classnames from 'classnames';

interface ClassDictionary {
    [id: string]: boolean | undefined | null;
}
interface ClassArray extends Array<ClassValue> { }

type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | boolean;

export interface BaseProps {
    /**
     * 自定义class
     */
    className?: string;
    /**
     * 自定义样式
     */
    style?: React.CSSProperties;
}

export default class BaseComponent<TProps = {}, TState = {}, SS = {}> extends React.Component<BaseProps & TProps, TState, SS> {

    className(...args: ClassValue[]) {
        return this.classNames(args.concat([this.props.className]));
    }

    classNames(...args: ClassValue[]) {
        return classnames(args);
    }

    style(args?: React.CSSProperties) {
        return Object.assign({}, args, this.props.style);
    }

}