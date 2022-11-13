import { Input, Spin, Empty } from 'antd'
import { isFunction, isNil } from 'lodash';
import React, { useEffect, useState } from 'react';
import { IOption, IRequestResult } from '../types';
import styles from './select.module.css';

type IValueScope = string | number | boolean | object;

type IProps<V = string> = {
    value?: V;
    onChange?(value: V): void;
    multiple?: boolean;
    requestMethod?(key: string): Promise<IRequestResult<V>>;
    optionList?: IOption<V>[];
}
export function Select<V>(props: IProps<V>) {
    const [searchKey, setSearchKey ] = useState('');
    const [parsedOptions, setParsedOptions] = useState<IOption<V>[]>(props.optionList ?? []);
    const [requestResult, setRequestResult ] = useState<IRequestResult<V>>();
    const [optionsLoading, setOptionsLoading] = useState(false);
    
    useEffect(() => {
        search(searchKey)
    }, [props.requestMethod]);

    useEffect(() => {
        if (props.requestMethod) return;
        search(searchKey)
    }, [props.optionList])

    useEffect(() => {
        search(searchKey);
    }, []);

    useEffect(() => {
        search(searchKey);
    }, [searchKey]);

    async function search(key: string) {
        setOptionsLoading(true)
        if (props.requestMethod) {
            const result = await props.requestMethod(key)
            console.log('r', result)
            setRequestResult(result);
            setParsedOptions(result.data);
        } else {
            setParsedOptions(props.optionList ?? []);
            // local search
        }
        setOptionsLoading(false)
    }
    
    return <div className={styles['select-wrap']}>
        <Input value={searchKey} allowClear onChange={e => {
            console.log('change', e, e.target.value)
            setSearchKey(e.target.value)
        }} />
        <div className={styles['options-pane']}>
            {
                optionsLoading ? 
                    <Spin /> :
                    parsedOptions.length > 0 ? 
                        <div className={styles.options}>
                            {
                                parsedOptions.map(opt => {
                                    return <Option key={String(opt.value)} value={opt.value} label={opt.label}></Option>
                                })
                            }
                        </div> :
                        <Empty />
            }
        </div>
        
    </div>;
}

function Option<V>(props: IOption<V>) {
    let content: React.ReactNode;
    if (props.children) {
        content = isFunction(props.children) ? props.children() : props.children;
    } else if (props.label) {
        content = isFunction(props.label) ? props.label() : props.label;
    } else {
        content = String(props.value);
    }

    return <div className={styles.option}>
        { content }
    </div>
}