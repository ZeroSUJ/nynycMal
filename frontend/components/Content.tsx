import React, { ReactNode } from 'react';
type ContentProps = {
  children: ReactNode;
};
const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <div
      id="content"
      className="col-span-12 sm:col-span-9 lg:col-span-10 overflow-y-auto rounded-tl-3xl"
    >
      <div className="w-full bg-neutral-900">
        {children}
      </div>
    </div>
  );
};
export default Content;
