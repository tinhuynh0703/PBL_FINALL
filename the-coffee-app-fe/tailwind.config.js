const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    backgroundImage: {
      'change-avatar': 'linear-gradient(180deg,  #F2F2F2 0%, #F2F2F2 30%, #EEDFD2 30% , #EEDFD2 100%)',
    },
    fontFamily: {
      proximaNova: ['"proxima-nova"', 'sans-serif'],
    },
    fontSize: {
      1: '12px',
      1.5: '14px',
      2: '16px',
      2.5: '18px',
      3: '22px',
      3.5: '24px',
      4: '26px',
    },
    colors: {
      primary: {
        1: '#FFF2E7',
        2: '#153913',
      },
      accent: {
        1: '#D4A969',
        2: '#ED619F',
        3: '#F499C1',
        4: '#FEF3D7',
      },
      black: '#333333',
      white: '#FFFFFF',
      grey: {
        1: '#999999',
        2: '#BDBDBD',
        3: '#DBDBDB',
        4: '#F2F2F2',
        5: '#666666',
        6: '#E6E6E6',
      },
      'vendor-grey-4': '#E6E6E6',
      brown: '#502f13',
      success: '#499E3B',
      error: '#E51616',
      warning: '#FE5D18',
      outline: '#cac3c3',
      green: '#499e3b',
      'border-color': '#cccccc',
    },
    screens: {
      sm: '375px', //mobile screen
      md: '768px', //tablet screen
      lg: '1024px', //laptop screen
      xl: '1366px', //desktop screen
      xxl: '1440px',
    },
    extend: {
      spacing: {
        0.5: '0.5rem',
        0.75: '0.75rem',
        1: '1rem',
        1.25: '1.25rem',
        1.5: '1.5rem',
        1.875: '1.875rem',
        2: '2rem',
        2.25: '2.25rem',
        2.5: '2.5rem',
        3: '3rem',
        3.5: '3.5rem',
        3.75: '3.75rem',
        4: '4rem',
        4.5: '4.5rem',
        5: '5rem',
        6: '6rem',
        customer_information: '236px',
      },
      zIndex: {
        1: '1',
        100: '100',
      },
      boxShadow: {
        order: '0px 2px 4px rgba(34, 34, 34, 0.08)',
        input: '0px 4px 12px rgba(146, 146, 146, 0.12)',
        card_center: '0 4px 12px rgba(7, 7, 7, 0.12)',
        footer: '0px -2px 8px rgba(51, 51, 51, 0.04)',
        buttonPrimary: '0px 4px 12px rgba(189, 15, 114, 0.3)',
        buttonSecondary: '0px 4px 12px rgba(146, 146, 146, 0.12)',
        vendorSuccess: '0px 4px 28px rgba(22, 153, 19, 0.24)',
        vendorFail: '0px 4px 28px rgba(219, 0, 0, 0.24)',
      },
      keyframes: {
        TopToBottom: {
          from: {
            opacity: '0',
            top: '0px',
          },
          to: {
            opacity: '1',
            top: '1.5rem',
          },
        },
        ToastInRight: {
          from: {
            opacity: '0',
            right: '0px',
          },
          to: {
            opacity: '1',
            right: '1.25rem',
          },
        },
      },
      animation: {
        TopToBottom: 'TopToBottom 0.7s',
        ToastInRight: 'ToastInRight 0.7s',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, matchUtilities, theme }) {
      addUtilities({
        '.text-style-vendor-h1': {
          fontWeight: '600',
          fontSize: '26px',
          lineHeight: '26px',
          letterSpacing: '0.15px',
        },
        '.text-style-vendor-h2': {
          fontWeight: '600',
          fontSize: '22px',
          lineHeight: '25px',
          letterSpacing: '0.15px',
        },
        '.text-style-vendor-sub-1': {
          fontWeight: '600',
          fontSize: '18px',
          lineHeight: '21px',
          letterSpacing: '0.15px',
        },
        '.text-style-vendor-sub-2': {
          fontWeight: '600',
          fontSize: '16px',
          lineHeight: '19px',
          letterSpacing: '0.1px',
        },
        '.text-style-vendor-body-1': {
          fontWeight: '400',
          fontSize: '18px',
          lineHeight: '21px',
          letterSpacing: '0.5px',
        },
        '.text-style-vendor-body-2': {
          fontWeight: '400',
          fontSize: '16px',
          lineHeight: '19px',
          letterSpacing: '0.25px',
        },
        '.text-style-vendor-caption': {
          fontWeight: '400',
          fontSize: '12px',
          lineHeight: '16px',
          letterSpacing: '0.4px',
        },
        '.text-style-1440-h1': {
          fontWeight: '600',
          fontSize: '24px',
          lineHeight: '30px',
          letterSpacing: '0.07px',
        },
        '.text-style-1440-h2': {
          fontWeight: '700',
          fontSize: '18px',
          lineHeight: '23px',
          letterSpacing: '0.25px',
        },
        '.text-style-1440-body': {
          fontWeight: '600',
          fontSize: '16px',
          lineHeight: '21px',
          letterSpacing: '-0.31px',
        },
        '.text-style-1440-button': {
          fontWeight: '600',
          fontSize: '16px',
          lineHeight: '21px',
          letterSpacing: '0.35px',
          textTransform: 'uppercase',
        },
        '.text-style-1440-caption': {
          fontWeight: '600',
          fontSize: '14px',
          lineHeight: '19px',
          letterSpacing: '-0.08px',
        },
        '.text-style-768-h1': {
          fontWeight: '700',
          fontSize: '24px',
          lineHeight: '30px',
          letterSpacing: '0.07px',
        },
        '.text-style-768-h2': {
          fontWeight: '700',
          fontSize: '21px',
          lineHeight: '26px',
          letterSpacing: '-0.36px',
        },
        '.text-style-768-body': {
          fontWeight: '600',
          fontSize: '19px',
          lineHeight: '24px',
          letterSpacing: '-0.45px',
        },
        '.text-style-768-button': {
          fontWeight: '700',
          fontSize: '19px',
          lineHeight: '24px',
          letterSpacing: '1.05px',
        },
        '.text-style-768-caption': {
          fontWeight: '700',
          fontSize: '15px',
          lineHeight: '20px',
          letterSpacing: '-0.23px',
        },
        '.text-style-375-h1': {
          fontWeight: '700',
          fontSize: '20px',
          lineHeight: '25px',
          letterSpacing: '-0.45px',
        },
        '.text-style-375-h2': {
          fontWeight: '700',
          fontSize: '17px',
          lineHeight: '22px',
          letterSpacing: '-0.43px',
        },
        '.text-style-375-body': {
          fontWeight: '600',
          fontSize: '15px',
          lineHeight: '20px',
          letterSpacing: '-0.23px',
        },
        '.text-style-375-button': {
          fontWeight: '700',
          fontSize: '15px',
          lineHeight: '20px',
          letterSpacing: '0.45px',
        },
        '.text-style-375-caption': {
          fontWeight: '700',
          fontSize: '13px',
          lineHeight: '18px',
          letterSpacing: '-0.08px',
        },
        '.border-style': {
          borderWidth: '1px',
          borderStyle: 'border-box solid',
          borderRadius: '4px',
        },
        '.text-style-upload': {
          height: '19px',
          fontSize: '14px',
          lineHeight: '19px',
          color: theme('colors.black'),
        },
        '.order-column-center': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.background-blur': {
          background: 'rgba(0, 0, 0, 0.24);',
          backdropFilter: 'blur(20px)',
          zIndex: '1',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          position: 'fixed',
        },
      });
      matchUtilities(
        {
          'status-color': (value) => {
            const color = value.toString().split('-').join('.');
            return {
              color: theme(`colors.${color}`),
              textTransform: 'capitalize',
            };
          },
        },
        { values: theme('colors') },
      );
    }),
  ],
};
