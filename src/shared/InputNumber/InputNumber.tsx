'use client';

import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

export interface InputNumberProps {
  className?: string;
  defaultValue?: number;
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  label?: string;
  desc?: string;
}

const InputNumber: FC<InputNumberProps> = ({
  className = 'w-full',
  defaultValue = 1,
  value,
  min = 1,
  max = 99,
  onChange,
  label,
  desc,
}) => {
  // Determine if component is controlled
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? value! : internalValue;

  useEffect(() => {
    if (!isControlled) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue, isControlled]);

  const handleClickDecrement = () => {
    if (min >= currentValue) return;
    const newVal = currentValue - 1;
    if (!isControlled) {
      setInternalValue(newVal);
    }
    if (onChange) onChange(newVal);
  };

  const handleClickIncrement = () => {
    if (max && max <= currentValue) return;
    const newVal = currentValue + 1;
    if (!isControlled) {
      setInternalValue(newVal);
    }
    if (onChange) onChange(newVal);
  };

  const renderLabel = () => (
    <div className="flex flex-col">
      <span className="font-medium">{label}</span>
      {desc && (
        <span className="text-xs font-normal text-neutral-500">{desc}</span>
      )}
    </div>
  );

  return (
    <div className={`nc-InputNumber flex items-center justify-between space-x-5 ${className}`}>
      {label && renderLabel()}
      <div className="nc-NcInputNumber__content flex w-[104px] items-center justify-between sm:w-28">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white text-xl hover:border-neutral-700 focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400"
          type="button"
          onClick={handleClickDecrement}
          disabled={min >= currentValue}
        >
          -
        </button>
        <span className="block flex-1 select-none text-center leading-none">
          {currentValue}
        </span>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white text-xl hover:border-neutral-700 focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400"
          type="button"
          onClick={handleClickIncrement}
          disabled={max ? max <= currentValue : false}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default InputNumber;
