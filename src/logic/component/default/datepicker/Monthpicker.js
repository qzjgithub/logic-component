import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Icon from '../icon';

const Monthpicker = ({lang, disabled, placeholder, format, hasClear, defaultNow, onChange, open, onOpenChange, ...props}) => {
  const [i18n, setI18n] = useState({});
  const [value, setValue] = useState((props.value || props.initValue) || (defaultNow ? moment() : undefined));
  const [isOpen, setIsOpen] = useState((!disabled && open) || false);
  const [inUse, setInUse] = useState(false);

  useEffect(() => {
    setI18n(require(`./i18n/${lang || 'zh'}.json`).MONTHPICKER);
    switch(lang){
      case 'en':
          moment.locale('en-au');
          break;
      case 'zh':
      default:
          moment.locale('zh-cn');
          break;
  }
  }, [lang]);

  useEffect(() => {
    setValue(value);
  }, [value]);

  useEffect(() => {
    onOpenChange && onOpenChange(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (!disabled) {
      setIsOpen(open);
    }
  }, [open]);

  return (
    <div className='Monthpicker'>
      <button
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(inUse)}
      >
        <span>
          {value ? moment(value).format(format || 'YYYY-MM') : (placeholder || i18n.PLACEHOLDER)}
        </span>
        {!!(hasClear && value) && (
          <Icon type='guanbi1' className='clear' onClick={(e) => {
            e.stopPropagation();
            setValue(undefined);
            onChange && onChange(undefined);nan
          }} />
        )}
        <Icon type='unfold' />
      </button>
      {!!isOpen && (
        <a
          href='#'
          onClick={(e) => { e.preventDefault(); return false;}}
          onMouseEnter={() => setInUse(true)}
          onMouseLeave={() => setInUse(false)}
          onBlur={() => setIsOpen(false)}
        >
          <MonthlyCalendar
            i18n={i18n}
            onChange={(v) => {
              setValue(v);
              onChange && onChange(v);
            }}
            {...props}
          />
        </a>
      )}
    </div>
  )
};

Monthpicker.propTypes = {
  initValue: PropTypes.object,
  value : PropTypes.object,
  disableDate: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  format: PropTypes.string,
  hasClear: PropTypes.any,
  defaultNow: PropTypes.bool,
  lang: PropTypes.string,
  onChange: PropTypes.func,
  open: PropTypes.bool,
  onOpenChange: PropTypes.func
};

export default Monthpicker;

function getPanelStart(mode, yearRange) {
  if (mode === 'year') {
    return yearRange[0] - 1;
  }
  return 0;
}

const MonthlyCalendar = ({initValue, value, i18n, disableDate, onChange}) => {
  const [mode, setMode] = useState('month');
  const [year, setYear] = useState(moment(value || initValue).year());
  const [yearRange, setYearRange] = useState([year - year % 10, year - year % 10 + 9]);
  const [date, setDate] = useState(moment(value || initValue));
  
  const panelStart = getPanelStart(mode, yearRange);
  const monthStr = i18n.MONTH || moment.monthsShort();
  return (
    <section className='MonthlyCalendar'>
      <div className='MonthlyCalendar-year'>
        <Icon
          type='zuo'
          onClick={() => {
            if (mode === 'month') {
              setYear(year - 1);
            } else if (mode === 'year') {
              setYearRange(yearRange.map(v => (v - 10)));
            }
          }}
        />
        <span
          className={mode === 'month' ? 'active' : ''}
          onClick={() => {
            if (mode === 'month') {
              setMode('year');
            }
          }}
        >
          {mode === 'month' ? year : `${yearRange[0]} - ${yearRange[1]}`}
        </span>
        <Icon
          type='gengduo'
          onClick={() => {
            if (mode === 'month') {
              setYear(year + 1);
            } else if (mode === 'year') {
              setYearRange(yearRange.map(v => (v + 10)));
            }
          }}
        />
      </div>
      <article className='MonthlyCalendar-panel'>
        {Array.from({length: 12}).map((_, i) => {
          let pcls = '';
          if (mode === 'year' && [0, 11].indexOf(i) > -1) {
            pcls += 'control';
          }
          const disabled = mode === 'month' && disableDate && disableDate(moment().year(year).month(panelStart + i));
          if (disabled) {
            pcls += 'disabled';
          }
          if ((mode === 'year' && (panelStart + i) === date.year()) || (mode === 'month' && (panelStart + i) === date.month())) {
            pcls += ' active';
          }
          return (
            <p
              key={panelStart + i}
              className={pcls}
              onClick={() => {
                if (disabled) {
                  return;
                }
                if (mode === 'year') {
                  if (i === 0) {
                    setYearRange([panelStart - 9, panelStart]);
                  } else if (i === 11) {
                    setYearRange([panelStart + i, panelStart + i + 9]);
                  } else {
                    setYear(panelStart + i);
                    setMode('month');
                  }
                }
                if (mode === 'month') {
                  const d = moment().year(year).month(panelStart + i);
                  setDate(d);
                  onChange(d);
                }
              }}
            >
              <span>{mode === 'month' ? monthStr[panelStart + i] : panelStart + i}</span>
            </p>
          );
        })}
      </article>
    </section>
  );
}