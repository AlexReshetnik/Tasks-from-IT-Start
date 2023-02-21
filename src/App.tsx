import { useState, useEffect } from 'react';
import './App.css';
import './styles.scss';

import LazyLoad from 'react-lazy-load';

import Header from './components/header';
import Statistics from './components/statistics';
import KindsOfEvents from './components/kindsOfEvents';
import ChartArea from './components/chartArea';
import SimpleWordCloud from './components/simpleWordCloud';
import YBarChart from './components/yBarChart';

import DonutWidget from './components/donutWidget';

import XBarChart from './components/xBarChart';
import PieWidget from './components/pieWidget';

import CalendarPopUp from './components/calendarPopUp';



import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { motion, Reorder, useDragControls } from 'framer-motion'
import { log } from 'console';
import { PieChart } from 'react-minimal-pie-chart';
import SimpleChart from './components/simpleChart';


function App() {
  const data = [
    {
      mainTitle: 'Userfeedback (Antworten)',
      chartData: [
        {
          title: 'Positive',
          label: '65%',
          value: 12,
          color: '#40bc97',
        },
        {
          title: 'Negative',
          label: '35%',
          value: 10,
          color: '#BC406D',
        },
        {
          title: 'Neutral',
          label: '35%',
          value: 4,
          color: '#4179bd',
        },
      ],
      title: 'bewertete Antworten',
      percentage: '77%',
    },
    {
      mainTitle: 'Redakteurbewertungen (Antworten)',
      chartData: [
        {
          title: 'Name 1',
          label: '65%',
          value: 12,
          color: '#40bc97',
        },
        {
          title: 'Name 2',
          label: '35%',
          value: 32,
          color: '#BC406D',
        },
        {
          title: 'Name 3',
          label: '35%',
          value: 32,
          color: '#FFB536',
        },
        {
          title: 'Name 4',
          label: '35%',
          value: 32,
          color: '#4179bd',
        },
      ],
      title: 'bewertete Antworten',
      percentage: '64%',
    },
    {
      mainTitle: 'Userfeedback (Converstations)',
      chartData: [
        {
          title: 'Positive',
          label: '65%',
          value: 12,
          color: '#40bc97',
        },
        {
          title: 'Negative',
          label: '35%',
          value: 32,
          color: '#BC406D',
        },
        {
          title: 'Neutral',
          label: '35%',
          value: 32,
          color: '#4179bd',
        },
      ],
      title: 'bewertete Antworten',
      percentage: '36%',
    },
  ] as any;

  const [selectedRange, setSelectedRange] = useState<string>('')
  const [calendar, setCalendar] = useState<boolean>(false);


  const components = [
    {
      component: (
        <Header
          setCalendar={setCalendar}
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
        />
      ),
      height: 120,
    },
    { component: <Statistics />, height: 160 },
    { component: <KindsOfEvents />, height: 410 },
    {
      component: (
        <ChartArea
          title={'Conversation Length'}
          leftLabel={'Conversions'}
          bottomLabel={'Events'}
          width={'100%'}
          height={'383px'}
        />
      ),
      height: 410,
    },
    { component: <SimpleWordCloud />, height: 410 },
    {
      component: (
        <div className="flex justify-between w-full">
          <ChartArea
            fontSize="15px"
            title={'Bot Most Active Hours'}
            leftLabel={'Users'}
            width={'66%'}
            height={'255px'}
          />
          <YBarChart width={'32%'} />
        </div>
      ),
      height: 280,
    },
    {
      component: (
        <div className="flex justify-between w-full">
          {data.map((item: any, index: number) => (
            <DonutWidget data={item} key={index} />
          ))}
        </div>
      ),
      height: 410,
    },
    {
      component: (
        <div className="flex justify-between w-full">
          <XBarChart width={'66%'} />
          <PieWidget />
        </div>
      ),
      height: 420,
    },
    {
      component: (
        <div className="flex justify-between w-full">
          <SimpleChart />
        </div>

      ),
      height: 650,
    },
  ];

  let [components2, setComponents] = useState(components.map((item, i) => { 
    return { item, id: i, controls: useDragControls() } })
  )
  useEffect(() => {
    let LS_date = localStorage.getItem("date")
    let LS_Array: Array<any> = JSON.parse(LS_date ? LS_date : "[]")

    if (LS_Array != undefined) {
      let count = 0
      for (let i = 0; i < LS_Array.length; i++) {
        if (components2[i].id == +LS_Array[i]) {
          count++;
        }
      }

      if (count != LS_Array.length) {
        let arr: Array<any> = [];
        for (const i of LS_Array) {
          arr.push(components2.find(item => (item.id == i)))
        }
        setComponents((prev) => arr)
      }
    }
  }, [])

  let [changes, setChanges] = useState(false)


  onclick = handleClick;
  function handleClick(e: any) {
    console.log("handleClick");
    if (e.target.id == "changes" || e.target.parentElement.id == "changes") {
      setChanges((prev: boolean) => {
        if (!prev) {
          return true
        }
        localStorage.setItem("date", JSON.stringify(components2.map(item => (item.id))))
        return false
      })
    }
  }

  function startDrag(this: any, event) {
    if (changes === true) {
      this.start(event)
    }
  }

  return (

    <DndProvider backend={HTML5Backend}>
      <div className=" justify-center bg-[#f8f7fa] o">
        <div className="flex flex-col items-center w-[1155px] m-auto  select-none">

          <Reorder.Group axis='y' as='ol' values={components2} onReorder={setComponents}>
            {components2.map(item => (
              <Reorder.Item
                key={item.id}
                value={item}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                dragControls={item.controls}
                onPointerDown={startDrag.bind(item.controls)}
                drag
                dragListener={false}
                whileDrag={{
                  scale: 1.05
                }}
              >
                <LazyLoad
                  className="w-full"
                  height={item.item.height}
                  threshold={0.2}
                >
                  {item.item.component}
                </LazyLoad>

              </Reorder.Item>
            ))}
          </Reorder.Group>



          <div
            className="flex flex-col items-center justify-center border-[3px] w-[1150px] h-[355px] mt-10 mb-12"
            style={{ border: 'dashed #4078bc' }}
          >
            <svg
              className="relative overflow-visible cursor-pointer"
              style={{}}
              width="65"
              height="65"
              viewBox="0 0 65 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.0625 32.5C4.0625 16.7944 16.7944 4.0625 32.5 4.0625C48.2056 4.0625 60.9375 16.7944 60.9375 32.5C60.9375 48.2056 48.2056 60.9375 32.5 60.9375C16.7944 60.9375 4.0625 48.2056 4.0625 32.5ZM32.5 8.125C45.9619 8.125 56.875 19.0381 56.875 32.5C56.875 45.9619 45.9619 56.875 32.5 56.875C19.0381 56.875 8.125 45.9619 8.125 32.5C8.125 19.0381 19.0381 8.125 32.5 8.125ZM44.6875 30.4688H34.5312V20.3125H30.4688V30.4688H20.3125V34.5312H30.4688V44.6875H34.5312V34.5312H44.6875V30.4688Z"
                fill="#4078BC" />
            </svg>
            <h1
              className="text-[#4078bc] text-left mt-4"
              style={{ font: "400 24px/18px 'Montserrat', sans-serif" }}
            >
              WIDGET HINZUFÜGEN
            </h1>
          </div>
        </div>
        <CalendarPopUp
          calendar={calendar}
          setCalendar={setCalendar}
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange} />
        <svg
          style={{
            filter: 'drop-shadow(1px 1px 1px rgb(0 0 0 / 0.4))',
          }}
          className="absolute h-0"
        >
          <defs>
            <filter x="-0.2" y="-0.2" width="1.4" height="1.4" id="solid">
              <feFlood floodColor="white" />
              <feGaussianBlur stdDeviation="2" />
              <feComponentTransfer>
                <feFuncA type="table" tableValues="0 0 0 1" />
              </feComponentTransfer>

              <feComponentTransfer>
                <feFuncA type="table" tableValues="0 1 1 1 1 1 1 1" />
              </feComponentTransfer>
              <feComposite in="SourceGraphic" />

              <feMerge>
                <feMergeNode in="bg" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
              <feDropShadow dx="0" dy="0" stdDeviation="2" floodOpacity="0.09" />
            </filter>
          </defs>
        </svg>
      </div>
    </DndProvider>
  );
}

export default App;
