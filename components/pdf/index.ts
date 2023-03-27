import dynamic from 'next/dynamic';
import * as React from 'react';

const GeneratePDF = dynamic(() => import('../pdf/GeneratePDF'), {
  ssr: false,
});

const inputField = React.useRef() as React.MutableRefObject<HTMLInputElement>;

const ref = inputField;
