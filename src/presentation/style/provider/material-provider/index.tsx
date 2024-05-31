import { RadioButtonCheckedTwoTone } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { colors } from 'presentation/style/palette';
import type { FC, ReactNode } from 'react';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
  }
}
declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    isSelect: true;
    hide: true;
  }
}

interface Children {
  children: ReactNode;
}

export const MaterialUIProvider: FC<Children> = ({ children }: Children) => {
  const LightTheme = createTheme({
    components: {
      MuiAutocomplete: {
        styleOverrides: {
          popper: {
            '& .MuiAutocomplete-option': {
              '&:hover': {
                backgroundColor: `${colors.gray[550]} !important`
              },
              '&[aria-selected="true"]': {
                backgroundColor: colors.gray[700]
              },
              color: 'white',
              lineHeight: '2rem'
            },
            '& .MuiAutocomplete-paper': {
              backgroundColor: colors.gray[900]
            }
          }
        }
      },

      MuiButton: {
        defaultProps: {
          variant: 'contained'
        },
        styleOverrides: {
          root: {
            ':hover': {
              backgroundColor: '#555555'
            },
            backgroundColor: colors.gray[700],
            color: 'white',
            padding: '8px 32px',
            textTransform: 'capitalize'
          }
        },
        variants: [
          {
            props: { color: 'info' },
            style: {
              ':hover': {
                backgroundColor: '#dbdada'
              },
              backgroundColor: '#F0F0F0',
              color: colors.gray[900],
              svg: {
                color: colors.primary
              }
            }
          },
          {
            props: { color: 'warning' },
            style: {
              ':hover': {
                backgroundColor: '#197cd8'
              },
              backgroundColor: '#1890FF'
            }
          },
          {
            props: { color: 'success' },
            style: {
              ':hover': {
                backgroundColor: '#c4c4c4'
              },
              backgroundColor: colors.gray[300],
              color: colors.gray[900],
              svg: {
                color: colors.black
              }
            }
          },
          {
            props: { variant: 'outlined' },
            style: {
              color: colors.primary,
              svg: {
                color: colors.primary
              }
            }
          },
          {
            props: { color: 'error' },
            style: {
              ':hover': {
                backgroundColor: '#dfc7c7'
              },
              backgroundColor: '#FFE5E5',
              color: '#FF0000'
            }
          },
          {
            props: { variant: 'secondary' },
            style: {
              border: '0.5px solid #D9D9D9',
              boxShadow: 'inset 0px 0px 0px 1px #D9D9D9',
              color: '#595959'
            }
          }
        ]
      },

      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: 'white'
          }
        }
      },

      MuiChip: {
        defaultProps: {
          variant: 'filled'
        },
        variants: [
          {
            props: { variant: 'filled' },
            style: {
              color: 'white'
            }
          }
        ]
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            '.MuiTypography-root': {
              color: '#2B2B2B',
              fontWeight: 500
            }
          }
        }
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            textTransform: 'capitalize'
          }
        }
      },
      MuiPagination: {
        styleOverrides: {
          root: {
            '& .MuiPaginationItem-root': {
              '& .MuiPaginationItem-icon': {
                color: 'white'
              },
              '&.Mui-selected': {
                '&:hover': {
                  backgroundColor: colors.gray[900]
                },
                backgroundColor: colors.gray[800],
                color: 'white'
              },
              '&.MuiPaginationItem-previousNext': {
                '&.Mui-disabled': {
                  backgroundColor: colors.gray[800],
                  color: colors.gray[500]
                }
              },
              '&:hover': {
                backgroundColor: colors.gray[550]
              },
              backgroundColor: colors.gray[700],
              color: 'white'
            }
          }
        }
      },
      MuiRadio: {
        defaultProps: {
          checkedIcon: <RadioButtonCheckedTwoTone />,
          color: 'primary'
        },
        variants: [
          {
            props: { color: 'primary' },
            style: {
              svg: {
                circle: {
                  r: 6.5
                }
              }
            }
          }
        ]
      },
      MuiSwitch: {
        defaultProps: {
          color: 'primary',
          style: {
            color: colors.white
          }
        },
        styleOverrides: {
          root: {
            '& .MuiSwitch-thumb': {
              boxShadow: 'none',
              height: 16,
              margin: 2,
              width: 16
            },
            '& .MuiSwitch-track': {
              background: '#dfdfdf',
              borderRadius: 11,
              opacity: '1 !important'
            },
            '&.Mui-checked': {
              '& + .MuiSwitch-track': {
                backgroundColor: '#177ddc',
                opacity: 1
              },
              color: '#fff',
              transform: 'translateX(12px)'
            },
            padding: 8
          }
        }
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            ':hover': {
              backgroundColor: colors.gray[900]
            },
            backgroundColor: colors.gray[800]
          }
        }
      },
      MuiTextField: {
        defaultProps: {
          style: {
            backgroundColor: colors.gray[700],
            borderColor: 'white',
            borderRadius: 8,
            color: 'white !important'
          }
        },
        styleOverrides: {
          root: {
            '& input': {
              color: 'white',
              padding: '15px 24px'
            },
            '& input:-webkit-autofill': {
              '-webkit-box-shadow': '0 0 0 1000px transparent inset !important',
              '-webkit-text-fill-color': 'white !important',
              color: 'white',
              transition: 'background-color 10000s ease-in-out'
            },
            '& input:-webkit-autofill:active': {
              '-webkit-text-fill-color': 'white !important'
            },
            '& input:-webkit-autofill:focus': {
              '-webkit-text-fill-color': 'white !important'
            },
            '& input:-webkit-autofill:hover': {
              '-webkit-text-fill-color': 'white !important'
            },
            '& textarea': {
              color: 'white',
              padding: '0px !important'
            },
            '& textarea:-webkit-autofill': {
              '-webkit-box-shadow': '0 0 0 1000px transparent inset !important',
              '-webkit-text-fill-color': 'white !important',
              color: 'white',
              transition: 'background-color 10000s ease-in-out'
            },
            '& textarea:-webkit-autofill:active': {
              '-webkit-text-fill-color': 'white !important'
            },
            '& textarea:-webkit-autofill:focus': {
              '-webkit-text-fill-color': 'white !important'
            },
            '& textarea:-webkit-autofill:hover': {
              '-webkit-text-fill-color': 'white !important'
            },
            '.Mui-error': {
              '.MuiFormLabel-root': {
                color: 'red !important'
              },
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: `${colors.red} !important`
              },
              svg: {
                color: 'red'
              }
            },
            '.MuiFormLabel-root,.MuiFormLabel-root.Mui-focused': {
              color: 'white'
            },
            '.MuiFormLabel-root.Mui-error': {
              color: 'red'
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: `${colors.gray[200]} !important`
            },
            'MuiInputLabel-root.Mui-error,.MuiFormLabel-root.Mui-focused.Mui-error': {
              color: 'red !important'
            },
            svg: {
              color: 'white'
            }
          }
        },
        variants: [
          {
            props: { color: 'hide' },
            style: {
              '.MuiButtonBase-root': {
                background: colors.primary,
                svg: {
                  color: colors.white
                }
              },
              '.MuiButtonBase-root:hover': {
                background: colors.primary,
                borderBottom: '0px solid black !important',
                cursor: 'pointer'
              },
              '.MuiInputBase-root': {
                background: 'transparent !important',
                borderBottom: '0px solid black !important',
                flexWrap: 'wrap',
                maxWidth: '100%',
                paddingRight: '0px !important',
                paddingTop: '12px'
              },
              '.MuiInputBase-root:after': {
                borderBottom: '0px solid black !important',
                cursor: 'pointer'
              },
              '.MuiInputBase-root:before': {
                borderBottom: '0px solid black !important'
              },
              '.MuiInputBase-root:hover': {
                borderBottom: '0px solid black !important',
                cursor: 'pointer'
              },
              '.MuiInputBase-root:hover:before': {
                borderBottom: '0px solid black !important',
                cursor: 'pointer'
              },
              input: {
                display: 'none'
              },
              paddingLeft: '0 !important'
            }
          },
          {
            props: { color: 'isSelect' },
            style: {
              '.MuiButtonBase-root': {
                background: colors.primary
              },
              '.MuiInputBase-root': {
                background: 'transparent !important',
                borderBottom: '0px !important',
                paddingRight: '8px !important',
                paddingTop: '12px'
              },
              '.MuiInputBase-root:before': {
                borderBottom: '0px !important'
              },
              input: {
                display: 'none'
              },
              paddingLeft: '0 !important'
            }
          }
        ]
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: 'white !important'
          }
        }
      }
    },
    palette: {
      divider: colors.primary,
      error: { main: colors.red },
      grey: colors.gray,
      info: { main: colors.info },
      primary: { main: colors.primary },
      secondary: { main: colors.secondary },
      success: { main: colors.success },
      warning: { main: colors.warning }
    },
    typography: {
      fontFamily: 'Montserrat'
    }
  });

  return <ThemeProvider theme={LightTheme}>{children}</ThemeProvider>;
};
