import React from 'react';

const Accordion = ({ question, answer, wfull, small }: any) => {
  return (
    <div className="">
      <details
        className={`group ${
          wfull ? 'w-full' : 'w-full max-w-2xl'
        } rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800`}
      >
        <summary className={`flex w-full cursor-pointer list-none items-center gap-4 rounded-lg px-6 ${small ? 'py-4' : 'py-10'}`}>
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="block size-5 group-open:hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="hidden size-5 group-open:block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15"
              />
            </svg>
          </div>
          {question}
        </summary>
        <div className="px-6 pb-4 text-sm text-neutral-500">{answer}</div>
      </details>
    </div>
  );
};

export default Accordion;
