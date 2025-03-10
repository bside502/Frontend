const Star = ({ filled }: { filled: boolean }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='45'
      height='45'
      viewBox='0 0 50 48'
      fill={filled ? '#FFC800' : '#D9DFE5'}
    >
      <path
        d='M21.3262 2.53096C22.7145 -0.692892 27.2855 -0.692885 28.6738 2.53097L32.7128 11.9098C33.2919 13.2545 34.5593 14.1754 36.0172 14.3106L46.1851 15.2537C49.6802 15.5778 51.0927 19.9251 48.4556 22.2417L40.7839 28.9812C39.684 29.9475 39.1999 31.4375 39.5218 32.8657L41.7669 42.8274C42.5387 46.2516 38.8407 48.9384 35.8226 47.1463L27.0422 41.9326C25.7834 41.1851 24.2167 41.1851 22.9578 41.9326L14.1774 47.1463C11.1593 48.9384 7.46132 46.2516 8.23307 42.8274L10.4782 32.8657C10.8001 31.4375 10.316 29.9475 9.21606 28.9812L1.54435 22.2417C-1.0927 19.9251 0.319811 15.5778 3.8149 15.2537L13.9828 14.3106C15.4407 14.1754 16.7081 13.2545 17.2872 11.9098L21.3262 2.53096Z'
        fill={filled ? '#FFC800' : '#D9DFE5'}
      />
    </svg>
  );
};

export default Star;
