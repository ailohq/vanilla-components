import Dropdown from 'react-dropdown';
import React, { useEffect, useState } from 'react';

import useFont from '../../hooks/useFont';

import '../index.css';
import Title from '../Title';
import Spinner from '../Spinner';
import { ClearIcon } from '../icons';

type Data = {
  error?: string;
  isLoading: boolean;
  data?: any[];
};

type Dimension = {
  name: string;
  title: string;
  description: string | null;
};

type Props = {
  title?: string;
  options: Data;
  value: string;
  property: Dimension;
  onChange: (v: any) => void;
};

export default (props: Props) => {
  const [value, setValue] = useState(props.value);

  useFont();

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <div className="dropdown relative w-full">
      <Title title={props.title} />
      <div className="relative">
        <Dropdown
          controlClassName="h-10 leading-10 px-3 text-black cursor-pointer"
          menuClassName="absolute z-10 rounded-xl top-11 left-0 w-full bg-white border border-[#DADCE1] py-1 [&>div]:cursor-pointer [&>div:hover]:bg-black/5 [&>div]:py-2 [&>div]:px-3"
          placeholderClassName="font-semibold"
          className="border border-[#DADCE1] rounded-xl text-[14px] relative"
          value={value}
          onChange={(o) => {
            setValue(o.value);
            props.onChange(o);
          }}
          options={props.options?.data?.map((o) => o[props.property?.name || '']) || []}
        />
        {!!value && !props.options.isLoading && (
          <div
            onClick={() => {
              setValue('');
              props.onChange('');
            }}
            className="absolute right-10 top-4 z-10 cursor-pointer"
          >
            <ClearIcon />
          </div>
        )}
        {props.options.isLoading ? (
          <Spinner show className="absolute right-4 top-2.5 z-10" />
        ) : (
          <svg
            className="pointer-events-none absolute right-4 top-4 z-10"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.5717 11.884C10.4893 11.9839 10.3902 12.0633 10.2805 12.1176C10.1708 12.172 10.0527 12.2 9.93342 12.2C9.81409 12.2 9.696 12.172 9.58629 12.1176C9.47659 12.0633 9.37754 11.9839 9.29516 11.884L5.88201 7.44237C5.77279 7.3001 5.70145 7.12436 5.67657 6.93629C5.65169 6.74821 5.67433 6.55583 5.74176 6.3823C5.8092 6.20876 5.91856 6.06147 6.05668 5.95816C6.1948 5.85484 6.35578 5.7999 6.52026 5.79995H13.3466C13.511 5.7999 13.672 5.85484 13.8102 5.95816C13.9483 6.06147 14.0576 6.20876 14.1251 6.3823C14.1925 6.55583 14.2151 6.74821 14.1903 6.93629C14.1654 7.12436 14.094 7.3001 13.9848 7.44237L10.5717 11.884Z"
              fill="#333942"
            />
          </svg>
        )}
      </div>
    </div>
  );
};
