import { useState, useEffect } from 'react';
import Dropdown from './dropdown';
import MultipleDropdown from './multipleDropdown';
import CountUp from 'react-countup';
import Gear from '../assets/Gear.svg';
import Pdf from '../assets/ImportPdf.svg';

export default function Header({ setCalendar, selectedRange, setSelectedRange, }
  : {
    setCalendar: any; selectedRange: string; setSelectedRange: any;
  }) {
  const [dropdownsInfo, setDropdownsInfo] = useState<
    Array<{
      label: string;
      title: string;
      dropDown: any;
      dropDownActive: boolean;
    }>
  >([
    {
      label: 'Select Date Range',
      title: 'Wähle einen Zeitraum',
      dropDown: Dropdown,
      dropDownActive: false,
    },
    {
      label: 'Refferer',
      title: 'Wähle einen Refferer',
      dropDown: MultipleDropdown,
      dropDownActive: false,
    },
    {
      label: 'Parameters/Values',
      title: 'Wähle eine Option',
      dropDown: MultipleDropdown,
      dropDownActive: false,
    },
  ])
  
  const buttons = [Pdf, Gear];

  function toggleDropdown(index: number, active: boolean) {
    setTimeout(() => {
      let newDropdownsInfo = [...dropdownsInfo];
      for (let x = 0; x < newDropdownsInfo.length; x++) {
        newDropdownsInfo[x].dropDownActive = false;
      }
      newDropdownsInfo[index].dropDownActive = active;
      setDropdownsInfo(newDropdownsInfo);
    }, 50);
  }

  function handleClick(e: any) {
    try {
      if (!e.target.className.includes('multiDropdown')) {
        let newDropdownsInfo = [...dropdownsInfo];
        for (let x = 0; x < newDropdownsInfo.length; x++) {
          if (newDropdownsInfo[x].dropDownActive) {
            newDropdownsInfo[x].dropDownActive = false;
          }
        }
        setDropdownsInfo(newDropdownsInfo);
      }
    } catch (e) { }
  }

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [dropdownsInfo]);

  return (
    <div className="header_component flex items-center justify-between shrink-0 w-[1155px] h-[87px] relative mt-8">
      <div
        className="flex items-center justify-between bg-[#ffffff] pl-4 px-2 rounded-[1px] w-[258px] h-[45px] overflow-hidden"
        style={{ boxShadow: '0px 4px 18px 0px rgba(75, 70, 92, 0.10)' }}
      >
        <h3
          className="text-primary absolute"
          style={{
            font: "600 18px/24px 'Public Sans', sans-serif",
          }}
        >
          <CountUp end={215} duration={2.4} />
        </h3>

        <h3
          className="text-secondary justify-start items-start w-full"
          style={{
            font: "400 18px/20px 'Public Sans', sans-serif",
          }}
        >
          <div className="text-box flex justify-start items-center relative">
            <div>Today's conversations</div>
            <div>Live Conversations</div>
          </div>
        </h3>

        <div className="ring-container flex items-center justify-center self-start mt-2 w-2 h-2`">
          <div className="ringring absolute w-5 h-5 rounded-[50%] border-[2px] border-[#2cca3c]" />
          <div className="w-2 h-2 bg-[#2cca3c] rounded-[50%]" />
        </div>
      </div>

      {dropdownsInfo.map((item, index) => (
        <div className="relative" key={index}>
          <label
            className="text-[#525252] text-left absolute bottom-[40px]"
            style={{
              font: "var(--light-basictypography-paragraphsmall, 400 13px/20px 'Public Sans', sans-serif)",
            }}
          >
            {item.label}
          </label>
          <button
            onClick={() => toggleDropdown(index, !item.dropDownActive)}
            className="flex items-center justify-between bg-white border  w-[213px] h-[38px] pl-[5px] pr-[15px] overflow-hidden"
            style={{
              border:
                'solid var(--light-solidcolor-primary-primary-500-base-, #4078bc)',
              borderWidth: '1px',
              boxShadow: '0px 4px 18px 0px rgba(75, 70, 92, 0.10)',
            }}
          >
            <h4
              className="text-[#a5a3ae]"
              style={{
                font: "var(--light-forminput-8-placeholderdefault, 400 15px/24px 'Public Sans', sans-serif)",
              }}
            >
              {item.title}
            </h4>
            <svg
              className={`${item.dropDownActive ? 'rotate-90' : ''
                } shrink-0 overflow-visible transition-all duration-500 `}
              style={{}}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="#4B465C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="white"
                strokeOpacity="0.2"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <item.dropDown
            index={index}
            dropdownsInfo={dropdownsInfo}
            setDropdownsInfo={setDropdownsInfo}
            active={item.dropDownActive}
            setCalendar={setCalendar}
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
          />
        </div>
      ))}
      {buttons.map((item, index) => (
        <button
        id="changes"
          key={index}
          className="flex items-center justify-center w-[38px] h-[38px] rounded-[3px]"
          style={{
            border: '1px solid #4078bc',
            font: "var(--button-buttonmd, 500 14px 'Montserrat', sans-serif)",
          }}
          
        >
          
          <img src={item} alt="icon" />
        </button>
      ))}
    </div>
  );
}
