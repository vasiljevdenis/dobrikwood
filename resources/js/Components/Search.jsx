import * as React from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { Autocomplete, Box, CircularProgress, FormControl, Grid, TextField, Typography, debounce } from '@mui/material';
import KingBedIcon from '@mui/icons-material/KingBed';
import SearchIcon from '@mui/icons-material/Search';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const autocompleteService = { current: null };

export default function Search() {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState([]);

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        setLoading(true);
        autocompleteService.current.get(import.meta.env.VITE_APP_BASE_URL + '/api/search?query=' + request.input)
          .then(res => {
            let json = res.data;
            callback(json);
            setLoading(false);
          })
          .catch(err => {
          })
          .finally(() => {
          });
      }, 400),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current) {
      autocompleteService.current =
        axios;
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      id="search-catalog"
      sx={{ width: 300, '& .MuiAutocomplete-popupIndicator': { transform: 'none' } }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.name
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="Нет результатов"
      popupIcon={loading ? <CircularProgress color="primary" size={20} /> : <SearchIcon sx={{ color: 'primary.main', transform: 'none' }} />}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}      
      renderInput={(params) => (
        <FormControl sx={{ mr: 1, maxWidth: {xs: '100%', md: '350px'}, width: '100%' }} variant="outlined">
          <TextField
            {...params}
            id="search-box"
            sx={{
              background: 'white',
              width: {
                xs: '100%',
                sm: '60%'
              },
              height: 48,
              borderRadius: '4px',
              transition: 'width 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
              "&:focus-within": {
                width: '100%',
                transition: 'width 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
              },
              "& .MuiOutlinedInput-notchedOutline": {
                height: '54px'
              }
            }}
            placeholder='Найти'
          />
        </FormControl>
      )}
      renderOption={(props, option) => {
        const matches = match(option.name, inputValue);

        const parts = parse(
          option.name,
          matches
        );

        return (
          <li {...props}>
            <RouterLink style={{ textDecoration: 'none' }} to={'/catalog/' + option.category + '/' + option.path}>
              <Grid container alignItems="center">
                <Grid item sx={{ display: 'flex', width: 44, pr: 1 }}>
                  <img
                    src={import.meta.env.VITE_APP_BASE_URL + '/storage/images/' + option.category + '/' + option.path + '1.jpg'}
                    alt={option.name}
                    style={{ width: '100%' }}
                    loading="lazy"
                  />
                </Grid>
                <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                  {parts.map((part, index) => (
                    <Box
                      key={index}
                      component="span"
                      sx={{ fontWeight: part.highlight ? 'bold' : 'regular', color: '#212529' }}
                    >
                      {part.text}
                    </Box>
                  ))}
                  <Typography variant="body2" color="text.secondary">
                    {option.price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}
                  </Typography>
                </Grid>
              </Grid>
            </RouterLink>
          </li>
        );
      }}
    />
  );
}