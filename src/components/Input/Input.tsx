import type { InputHTMLAttributes } from 'react';

import styles from './Input.module.css';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'style'> {}

export const Input = ({ type, ...restProps }: Props) => <input type={type} {...restProps} className={styles.input} />;
