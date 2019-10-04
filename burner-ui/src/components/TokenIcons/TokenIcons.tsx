import React from 'react';

interface IconProps {
  className?: string;
}

export const Dai: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox='0 0 48 48'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M24.0007 6.00098L41.9858 24.0004L24.0007 42L6.01562 24.0004L24.0007 6.00098Z'
      fill='#FFCE45'
    />
    <path
      d='M24 29.8735L6 23.9992L24 6L42 23.9992L24 29.8735Z'
      fill='#FEBE44'
    />
    <path
      d='M12.2617 22.8239H20.4791L24.0008 18.9077L27.9139 22.8239H36.1313L24.0008 9.70508L12.2617 22.8239V22.8239Z'
      fill='white'
    />
    <path
      opacity='0.42'
      d='M24 41.9984V6L41.9848 23.9992L24 41.9984V41.9984Z'
      fill='#D9A547'
    />
  </svg>
);

export const Eth: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox='0 0 48 48'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g clipPath='url(#clip0)'>
      <path
        d='M23.9965 4L23.7285 4.9116V31.36L23.9965 31.6276L36.2729 24.3712L23.9965 4Z'
        fill='#343434'
      />
      <path d='M23.9961 4L11.7197 24.3712L23.9961 31.628V4Z' fill='#8C8C8C' />
      <path
        d='M23.9959 33.953L23.8447 34.1374V43.5602L23.9959 44.0002L36.2795 26.7002L23.9959 33.953Z'
        fill='#3C3C3B'
      />
      <path
        d='M23.9961 44.0002V33.9526L11.7197 26.7002L23.9961 44.0002Z'
        fill='#8C8C8C'
      />
      <path
        d='M23.9961 31.6278L36.2721 24.371L23.9961 18.791V31.6278Z'
        fill='#141414'
      />
      <path d='M11.7197 24.3714L23.9957 31.6282V18.791' fill='#393939' />
      <rect
        width='0.959995'
        height='0.960001'
        transform='translate(39.2803 19.9199)'
        fill='white'
      />
    </g>
    <defs>
      <clipPath id='clip0'>
        <rect width='40' height='40' fill='white' transform='translate(4 4)' />
      </clipPath>
    </defs>
  </svg>
);

export const Xdai: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox='0 0 48 48'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M20.3846 41.3422C17.1183 39.3465 10.7996 35.4874 9.87156 34.9185C8 33.6486 8 31.6224 8 31.6224L8.00053 16.3801C8.00053 16.3801 8 14.1754 9.88809 13.0689L20.3841 6.65548C24.0008 4.44745 24.0008 4.44745 27.6234 6.65982L38.1044 13.064C40.0016 14.2318 40 16.3763 40 16.3763V31.6235C40 31.6235 40.0016 33.7458 38.1044 34.9337L27.6196 41.34C24.0008 43.553 24.0008 43.553 20.3846 41.3422Z'
      fill='url(#paint0_linear)'
    />
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M32.5101 16.5684L26.3103 24.3179L32.5058 32.0615H27.8864L24.0009 27.2046L20.1154 32.0615H15.4959L21.6914 24.3179L15.4922 16.5684H20.1111L24.0009 21.4312L27.8907 16.5684H32.5101V16.5684Z'
      fill='white'
    />
    <defs>
      <linearGradient
        id='paint0_linear'
        x1='8'
        y1='43'
        x2='8'
        y2='5'
        gradientUnits='userSpaceOnUse'
      >
        <stop stop-color='#FDAC42' />
        <stop offset='1' stop-color='#FDD341' />
      </linearGradient>
    </defs>
  </svg>
);
