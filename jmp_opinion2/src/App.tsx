
import logo from './logo.svg';
import './App.css';


import 'smart-webcomponents-react/source/styles/smart.default.css';
import React, { DragEventHandler, useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom/client';
import { Button, RepeatButton, ToggleButton, PowerButton } from 'smart-webcomponents-react/button';
import { Calendar } from 'smart-webcomponents-react/calendar';
import { Input } from 'smart-webcomponents-react/input';
import { Tree, TreeItem, TreeItemsGroup } from 'smart-webcomponents-react/tree';
import { Scheduler } from 'smart-webcomponents-react/scheduler';

import { CustomEventType } from './types/CustomEventType';


function App() {

  const scheduler = useRef(null);
  const calendar = useRef(null);
  const tree = useRef(null);
  const primaryContainer = useRef(null);

  const getPastThreeWeekdays = (weekday: any) => {
    let weekdays = [];

    for (let i = 0; i < 3; i++) {
      weekdays.push((weekday - i + 7) % 7);
    }

    return weekdays;
  }


  // const [data, setData] = useState([]);

  const today = new Date(),
			currentDate = today.getDate(),
			currentYear = today.getFullYear(),
			currentMonth = today.getMonth(),
			currentHours = today.getHours(),
			currentMinutes = today.getMinutes(),
			thanksgiving = (() => {
				const tempDate = new Date(currentYear, 10, 1);
				//4th Thursday of November
				tempDate.setDate(tempDate.getDate() - tempDate.getDay() + 25);
				return tempDate;
			})();

  const nonworkingDays = getPastThreeWeekdays(today.getDay());


  // const data = [{
  //   label: 'Brochure Design Review',
  //   dateStart: new Date(currentYear, currentMonth, 10, 13, 15),
  //   dateEnd: new Date(currentYear, currentMonth, 12, 16, 15),
  //   status: 'tentative',
  //   class: 'event'
  // }, {
  //   label: 'Website Re-Design Plan',
  //   dateStart: new Date(currentYear, currentMonth, 16, 16, 45),
  //   dateEnd: new Date(currentYear, currentMonth, 18, 11, 15),
  //   class: 'event'
  // }, {
  //   label: 'Update Sales Strategy Documents',
  //   dateStart: new Date(currentYear, currentMonth, 2, 12, 0),
  //   dateEnd: new Date(currentYear, currentMonth, 2, 13, 45),
  //   class: 'event',
  //   repeat: {
  //     repeatFreq: 'daily',
  //     repeatInterval: 2,
  //     repeatEnd: 5,
  //     exceptions: [{
  //       date: new Date(currentYear, currentMonth, 4, 12, 0),
  //       label: 'Employee on sick leave. Reschedule for next day',
  //       dateStart: new Date(currentYear, currentMonth, 5),
  //       dateEnd: new Date(currentYear, currentMonth, 6),
  //       status: 'outOfOffice',
  //       backgroundColor: '#F06292'
  //     },
  //     {
  //       date: new Date(currentYear, currentMonth, 8, 12, 0),
  //       label: 'Employee on sick leave. Reschedule for next day',
  //       dateStart: new Date(currentYear, currentMonth, 9),
  //       dateEnd: new Date(currentYear, currentMonth, 10),
  //       status: 'outOfOffice',
  //       backgroundColor: '#FFA000'
  //     }
  //     ]
  //   }
  // }, {
  //   label: 'Non-Compete Agreements',
  //   dateStart: new Date(currentYear, currentMonth, currentDate - 1, 8, 15),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate - 1, 9, 0),
  //   status: 'outOfOffice',
  //   class: 'event'
  // }, {
  //   label: 'Approve Hiring of John Jeffers',
  //   dateStart: new Date(currentYear, currentMonth, currentDate + 1, 10, 0),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate + 1, 11, 15),
  //   notifications: [{
  //     interval: 1,
  //     type: 'days',
  //     time: [currentHours, currentMinutes],
  //     message: 'Approve Hiring of John Jeffers tomorrow',
  //     iconType: 'success'
  //   }],
  //   status: 'busy',
  //   class: 'event'
  // }, {
  //   label: 'Update NDA Agreement',
  //   dateStart: new Date(currentYear, currentMonth, currentDate - 2, 11, 45),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate - 2, 13, 45),
  //   class: 'event'
  // }, {
  //   label: 'Update Employee Files with New NDA',
  //   dateStart: new Date(currentYear, currentMonth, currentDate + 2, 14, 0),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate + 2, 16, 45),
  //   class: 'event'
  // }, {
  //   label: 'Compete Agreements',
  //   dateStart: new Date(currentYear, currentMonth, currentDate, currentHours, currentMinutes + 15),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate, currentHours + 1, 45),
  //   notifications: [{
  //     interval: 0,
  //     type: 'days',
  //     time: [currentHours, currentMinutes + 1],
  //     message: 'Compete Agreements in 15 minutes',
  //     iconType: 'time'
  //   },
  //   {
  //     interval: 0,
  //     type: 'days',
  //     time: [currentHours, currentMinutes + 2],
  //     message: 'Compete Agreements in 14 minutes',
  //     iconType: 'warning'
  //   }
  //   ],
  //   status: 'outOfOffice',
  //   class: 'event'
  // }, {
  //   label: 'Approve Hiring of Mark Waterberg',
  //   dateStart: new Date(currentYear, currentMonth, currentDate + 3, 10, 0),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate + 3, 11, 15),
  //   status: 'busy',
  //   class: 'event'
  // }, {
  //   label: 'Update Employees Information',
  //   dateStart: new Date(currentYear, currentMonth, currentDate, 14, 0),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate, 16, 45),
  //   class: 'event',
  //   repeat: {
  //     repeatFreq: 'weekly',
  //     repeatInterval: 2,
  //     repeatOn: [2, 4],
  //     repeatEnd: new Date(2021, 5, 24)
  //   }
  // },
  // {
  //   label: 'Prepare Shipping Cost Analysis Report',
  //   dateStart: new Date(currentYear, currentMonth, currentDate + 1, 12, 30),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate + 1, 13, 30),
  //   class: 'event',
  //   repeat: {
  //     repeatFreq: 'monthly',
  //     repeatInterval: 1,
  //     repeatOn: [new Date(currentYear, currentMonth, currentDate + 1)]
  //   }
  // }, {
  //   label: 'Provide Feedback on Shippers',
  //   dateStart: new Date(currentYear, currentMonth, currentDate + 1, 14, 15),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate + 1, 16, 0),
  //   status: 'tentative',
  //   class: 'event'
  // }, {
  //   label: 'Complete Shipper Selection Form',
  //   dateStart: new Date(currentYear, currentMonth, currentDate + 1, 8, 30),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate + 1, 10, 0),
  //   class: 'event'
  // }, {
  //   label: 'Upgrade Server Hardware',
  //   dateStart: new Date(currentYear, currentMonth, currentDate + 1, 12, 0),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate + 1, 14, 15),
  //   class: 'event'
  // }, {
  //   label: 'Upgrade Apps to Windows RT or stay with WinForms',
  //   dateStart: new Date(currentYear, currentMonth, currentDate + 2, currentHours, currentMinutes + 5),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate + 2, currentHours + 2),
  //   status: 'tentative',
  //   class: 'event',
  //   repeat: {
  //     repeatFreq: 'daily',
  //     repeatInterval: 1,
  //     repeatOn: currentDate + 1,
  //     repeatEnd: new Date(currentYear, currentMonth, currentDate + 7),
  //     exceptions: [{
  //       date: new Date(currentYear, currentMonth, currentDate + 4, 10, 30),
  //       label: 'A day off work',
  //       status: 'busy',
  //       backgroundColor: '#64DD17'
  //     }]
  //   },
  //   notifications: [{
  //     interval: 2,
  //     type: 'days',
  //     time: [currentHours, currentMinutes],
  //     message: 'Upgrade Apps to Windows RT in 5 minutes',
  //     iconType: 'time'
  //   }],
  // },
  // {
  //   label: 'Peter\'s Birthday',
  //   dateStart: new Date(currentYear, currentMonth, 5),
  //   dateEnd: new Date(currentYear, currentMonth, 6),
  //   class: 'birthday'
  // },
  // {
  //   label: 'Michael\'s Brithday',
  //   dateStart: new Date(currentYear, currentMonth, 10),
  //   dateEnd: new Date(currentYear, currentMonth, 11),
  //   class: 'birthday'
  // },
  // {
  //   label: 'Christina\'s Birthday',
  //   dateStart: new Date(currentYear, currentMonth, 20),
  //   dateEnd: new Date(currentYear, currentMonth, 21),
  //   class: 'birthday'
  // }, {
  //   label: 'Halloween',
  //   dateStart: new Date(currentYear, 9, 31),
  //   dateEnd: new Date(currentYear, 9, 32),
  //   class: 'holiday'
  // }, {
  //   label: 'Marry Christmas',
  //   dateStart: new Date(currentYear, 11, 24),
  //   dateEnd: new Date(currentYear, 11, 26, 23, 59, 59),
  //   class: 'holiday'
  // },
  // {
  //   label: 'Thanksgiving',
  //   dateStart: thanksgiving,
  //   dateEnd: new Date(currentYear, 10, thanksgiving.getDate() + 1),
  //   class: 'holiday'
  // },
  // {
  //   label: 'Day after Thanksgiving',
  //   dateStart: new Date(currentYear, 10, thanksgiving.getDate() + 1),
  //   dateEnd: new Date(currentYear, 10, thanksgiving.getDate() + 2),
  //   class: 'holiday'
  // },
  // {
  //   label: 'Indipendence Day',
  //   dateStart: new Date(currentYear, 6, 4),
  //   dateEnd: new Date(currentYear, 6, 5),
  //   class: 'holiday'
  // },
  // {
  //   label: 'New Year\'s Eve',
  //   dateStart: new Date(currentYear, 11, 31),
  //   dateEnd: new Date(currentYear + 1, 0, 1),
  //   class: 'holiday'
  // }
  // ];


const data = [{}]

  // const data = [{
  //   label: 'Brochure Design Review',
  //   dateStart: new Date(currentYear, currentMonth, 10, 13, 15),
  //   dateEnd: new Date(currentYear, currentMonth, 12, 16, 15),
  //   status: 'tentative',
  //   class: 'event',
  //   repeat: undefined,
  //   notifications: undefined
  // }, {
  //   label: 'Website Re-Design Plan',
  //   dateStart: new Date(currentYear, currentMonth, 16, 16, 45),
  //   dateEnd: new Date(currentYear, currentMonth, 18, 11, 15),
  //   class: 'event',
  //   repeat: undefined,
  //   notifications: undefined,
  //   status: undefined
  // }, {
  //   label: 'Update Sales Strategy Documents',
  //   dateStart: new Date(currentYear, currentMonth, 2, 12, 0),
  //   dateEnd: new Date(currentYear, currentMonth, 2, 13, 45),
  //   class: 'event',
  //   status: undefined,
  //   notifications: undefined,
  //   repeat: {
  //     repeatFreq: 'daily',
  //     repeatInterval: 2,
  //     repeatEnd: 5,
  //     exceptions: [{
  //       date: new Date(currentYear, currentMonth, 4, 12, 0),
  //       label: 'Employee on sick leave. Reschedule for next day',
  //       dateStart: new Date(currentYear, currentMonth, 5),
  //       dateEnd: new Date(currentYear, currentMonth, 6),
  //       status: 'outOfOffice',
  //       backgroundColor: '#F06292'
  //     },
  //     {
  //       date: new Date(currentYear, currentMonth, 8, 12, 0),
  //       label: 'Employee on sick leave. Reschedule for next day',
  //       dateStart: new Date(currentYear, currentMonth, 9),
  //       dateEnd: new Date(currentYear, currentMonth, 10),
  //       status: 'outOfOffice',
  //       backgroundColor: '#FFA000'
  //     }
  //     ]
  //   }
  // }, {
  //   label: 'Non-Compete Agreements',
  //   dateStart: new Date(currentYear, currentMonth, currentDate - 1, 8, 15),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate - 1, 9, 0),
  //   status: 'outOfOffice',
  //   class: 'event',
  //   repeat: undefined,
  //   notifications: undefined
  // }, {
  //   label: 'Approve Hiring of John Jeffers',
  //   dateStart: new Date(currentYear, currentMonth, currentDate + 1, 10, 0),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate + 1, 11, 15),
  //   notifications: [{
  //     interval: 1,
  //     type: 'days',
  //     time: [currentHours, currentMinutes],
  //     message: 'Approve Hiring of John Jeffers tomorrow',
  //     iconType: 'success'
  //   }],
  //   status: 'busy',
  //   class: 'event',
  //   repeat: undefined
  // }, {
  //   label: 'Update NDA Agreement',
  //   dateStart: new Date(currentYear, currentMonth, currentDate - 2, 11, 45),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate - 2, 13, 45),
  //   class: 'event',
  //   repeat: undefined,
  //   notifications: undefined,
  //   status: undefined
  // }, {
  //   label: 'Update Employee Files with New NDA',
  //   dateStart: new Date(currentYear, currentMonth, currentDate + 2, 14, 0),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate + 2, 16, 45),
  //   class: 'event',
  //   repeat: undefined,
  //   status: undefined,
  //   notifications: undefined
  // }, {
  //   label: 'Compete Agreements',
  //   dateStart: new Date(currentYear, currentMonth, currentDate, currentHours, currentMinutes + 15),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate, currentHours + 1, 45),
  //   notifications: [{
  //     interval: 0,
  //     type: 'days',
  //     time: [currentHours, currentMinutes + 1],
  //     message: 'Compete Agreements in 15 minutes',
  //     iconType: 'time'
  //   },
  //   {
  //     interval: 0,
  //     type: 'days',
  //     time: [currentHours, currentMinutes + 2],
  //     message: 'Compete Agreements in 14 minutes',
  //     iconType: 'warning'
  //   }
  //   ],
  //   status: 'outOfOffice',
  //   class: 'event',
  //   repeat: undefined
  // }, {
  //   label: 'Approve Hiring of Mark Waterberg',
  //   dateStart: new Date(currentYear, currentMonth, currentDate + 3, 10, 0),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate + 3, 11, 15),
  //   status: 'busy',
  //   class: 'event',
  //   repeat: undefined,
  //   notifications: undefined
  // }, {
  //   label: 'Update Employees Information',
  //   dateStart: new Date(currentYear, currentMonth, currentDate, 14, 0),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate, 16, 45),
  //   class: 'event',
  //   notifications: undefined,
  //   status: undefined,
  //   repeat: {
  //     repeatFreq: 'weekly',
  //     repeatInterval: 2,
  //     repeatOn: [2, 4],
  //     repeatEnd: new Date(2021, 5, 24)
  //   }
  // },
  // {
  //   label: 'Prepare Shipping Cost Analysis Report',
  //   dateStart: new Date(currentYear, currentMonth, currentDate + 1, 12, 30),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate + 1, 13, 30),
  //   class: 'event',
  //   notifications: undefined,
  //   status: undefined,
  //   repeat: {
  //     repeatFreq: 'monthly',
  //     repeatInterval: 1,
  //     repeatOn: [new Date(currentYear, currentMonth, currentDate + 1)]
  //   }
  // }, {
  //   label: 'Provide Feedback on Shippers',
  //   dateStart: new Date(currentYear, currentMonth, currentDate + 1, 14, 15),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate + 1, 16, 0),
  //   status: 'tentative',
  //   class: 'event',
  //   repeat: undefined,
  //   notifications: undefined
  // }, {
  //   label: 'Complete Shipper Selection Form',
  //   dateStart: new Date(currentYear, currentMonth, currentDate + 1, 8, 30),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate + 1, 10, 0),
  //   class: 'event',
  //   repeat: undefined,
  //   notifications: undefined,
  //   status: undefined
  // }, {
  //   label: 'Upgrade Server Hardware',
  //   dateStart: new Date(currentYear, currentMonth, currentDate + 1, 12, 0),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate + 1, 14, 15),
  //   class: 'event',
  //   repeat: undefined,
  //   notifications: undefined,
  //   status: undefined
  // }, {
  //   label: 'Upgrade Apps to Windows RT or stay with WinForms',
  //   dateStart: new Date(currentYear, currentMonth, currentDate + 2, currentHours, currentMinutes + 5),
  //   dateEnd: new Date(currentYear, currentMonth, currentDate + 2, currentHours + 2),
  //   status: 'tentative',
  //   class: 'event',
  //   repeat: {
  //     repeatFreq: 'daily',
  //     repeatInterval: 1,
  //     repeatOn: currentDate + 1,
  //     repeatEnd: new Date(currentYear, currentMonth, currentDate + 7),
  //     exceptions: [{
  //       date: new Date(currentYear, currentMonth, currentDate + 4, 10, 30),
  //       label: 'A day off work',
  //       status: 'busy',
  //       backgroundColor: '#64DD17'
  //     }]
  //   },
  //   notifications: [{
  //     interval: 2,
  //     type: 'days',
  //     time: [currentHours, currentMinutes],
  //     message: 'Upgrade Apps to Windows RT in 5 minutes',
  //     iconType: 'time'
  //   }],
  // },
  // {
  //   label: 'Peter\'s Birthday',
  //   dateStart: new Date(currentYear, currentMonth, 5),
  //   dateEnd: new Date(currentYear, currentMonth, 6),
  //   class: 'birthday',
  //   status: undefined,
  //   repeat: undefined,
  //   notifications: undefined
  // },
  // {
  //   label: 'Michael\'s Brithday',
  //   dateStart: new Date(currentYear, currentMonth, 10),
  //   dateEnd: new Date(currentYear, currentMonth, 11),
  //   class: 'birthday',
  //   status: undefined,
  //   repeat: undefined,
  //   notifications: undefined
  // },
  // {
  //   label: 'Christina\'s Birthday',
  //   dateStart: new Date(currentYear, currentMonth, 20),
  //   dateEnd: new Date(currentYear, currentMonth, 21),
  //   class: 'birthday',
  //   status: undefined,
  //   repeat: undefined,
  //   notifications: undefined
  // }, {
  //   label: 'Halloween',
  //   dateStart: new Date(currentYear, 9, 31),
  //   dateEnd: new Date(currentYear, 9, 32),
  //   class: 'holiday',
  //   status: undefined,
  //   repeat: undefined,
  //   notifications: undefined
  // }, {
  //   label: 'Marry Christmas',
  //   dateStart: new Date(currentYear, 11, 24),
  //   dateEnd: new Date(currentYear, 11, 26, 23, 59, 59),
  //   class: 'holiday',
  //   status: undefined,
  //   repeat: undefined,
  //   notifications: undefined
  // },
  // {
  //   label: 'Thanksgiving',
  //   dateStart: thanksgiving,
  //   dateEnd: new Date(currentYear, 10, thanksgiving.getDate() + 1),
  //   class: 'holiday',
  //   status: undefined,
  //   repeat: undefined,
  //   notifications: undefined
  // },
  // {
  //   label: 'Day after Thanksgiving',
  //   dateStart: new Date(currentYear, 10, thanksgiving.getDate() + 1),
  //   dateEnd: new Date(currentYear, 10, thanksgiving.getDate() + 2),
  //   class: 'holiday',
  //   status: undefined,
  //   repeat: undefined,
  //   notifications: undefined
  // },
  // {
  //   label: 'Indipendence Day',
  //   dateStart: new Date(currentYear, 6, 4),
  //   dateEnd: new Date(currentYear, 6, 5),
  //   class: 'holiday',
  //   status: undefined,
  //   repeat: undefined,
  //   notifications: undefined
  // },
  // {
  //   label: 'New Year\'s Eve',
  //   dateStart: new Date(currentYear, 11, 31),
  //   dateEnd: new Date(currentYear + 1, 0, 1),
  //   class: 'holiday',
  //   status: undefined,
  //   repeat: undefined,
  //   notifications: undefined
  // }];



  const view = 'month';

  // const views = ['day',
  //   {
  //     type: 'week',
  //     hideWeekend: true,
  //   },
  //   {
  //     type: 'month',
  //     hideWeekend: true,
  //   }, 'agenda',
  //   {
  //     label: '4 days',
  //     value: 'workWeek',
  //     type: 'week',
  //     shortcutKey: 'X',
  //     hideWeekend: false,
  //     hideNonworkingWeekdays: true,
  //   }
  // ];

  const views = ['']

  const firstDayOfWeek = 1;

  const disableDateMenu = true;

  const currentTimeIndicator = true;

  const scrollButtonsPosition = 'far';

//  // Define updateData with function overloading
// const updateData: DragEventHandler<Element> & ((event?: Event | undefined) => void) = (event?: Event | undefined) => {
//   // Your update data logic here

//   // const updateData = (e: any, data: any, setData: any) => {
//     // const [data, setData] = useState([])
//     const item = event.detail.item;
//     const newData = [...data];

//     for (let i = 0; i < newData.length; i++) {
//       const dataItem = newData[i];

//       if (dataItem.label === item.label && dataItem.class === item.class) {
//         e.type === 'itemRemove' ? newData.splice(i, 1) : newData.splice(i, 1, item);
//         setData(newData);
//         return;
//       }
//     }
//   }

function isCustomEvent(event: any): event is CustomEventType {
  return event && typeof event.detail === 'object' && 'item' in event.detail;
}


const UpdateData: DragEventHandler<Element> & ((event?: Event | undefined) => void) = (event) => {
  // Move useState to the top level of your functional component
  const [data, setData] = useState<any[]>([]); // Adjust the type as per your actual data type

  if (isCustomEvent(event)) {
    // Handle CustomEventType logic here
    const item = event.detail.item;
    const newData = [...data];

    for (let i = 0; i < newData.length; i++) {
      const dataItem = newData[i];

      if (dataItem.label === item.label && dataItem.class === item.class) {
        event.type === 'itemRemove' ? newData.splice(i, 1) : newData.splice(i, 1, item);
        setData(newData);
        return;
      }
    }
  } else {
    // Handle regular Event logic here
    const e = event as DragEvent; // Cast event to DragEvent or the specific event type you're expecting
    // const item: any = e.detail?.item; // Ensure item is correctly typed and handle possible null or undefined values

     // Check if e.detail is not undefined and is an object
     if (e.detail && typeof e.detail === 'object' && 'item' in e.detail) {
      // Since TypeScript still complains, let's assert e.detail type to any
      const detail: any = e.detail;
      
      // Now we can access the item property without TypeScript errors
      const item = detail.item;

      const newData = [...data];

      for (let i = 0; i < newData.length; i++) {
          const dataItem = newData[i];

          if (dataItem.label === item.label && dataItem.class === item.class) {
              e.type === 'itemRemove' ? newData.splice(i, 1) : newData.splice(i, 1, item);
              setData(newData);
              return;
          }
      }
  } else {
    // Handle case where item is not available
    // This could be an error condition or other appropriate handling
}
}};





  const HandleToggle = () => {

    const scheduler = useRef<{ disableDateMenu: boolean } | null>(null);
    const primaryContainer = useRef<HTMLDivElement>(null);

    // primaryContainer.current?.classList.toggle('collapse');
    // scheduler.current?.disableDateMenu = !primaryContainer.current?.classList.contains('collapse');
    // const toggleCollapse = () => {
      const container = primaryContainer.current;
      if (container) {
          container.classList.toggle('collapse');
          if (scheduler.current) {
              scheduler.current.disableDateMenu = !container.classList.contains('collapse');
          }
      // }
  };
  };

  const AddNew = () => {
    const scheduler = useRef<{ openWindow: (options: any) => void } | null>(null);
    scheduler.current?.openWindow({
      class: 'event'
    });
  };

  const HandleCalendarChange = (event: any) => {
    const scheduler = useRef<any>(null);
    // scheduler.current?.dateCurrent = event.detail.value;
    if (scheduler.current) {
      scheduler.current.dateCurrent = event.detail.value;
  }
  };

  const HandleTreeChange = (data: any) => {
    const tree = useRef<{ selectedIndexes: number[]; getItem: (index: number) => Promise<any> } | null>(null);
    const scheduler = useRef<any>(null); // You might want to replace 'any' with a more specific type

    const currentTree = tree.current;
    let selectedIndexes: number[] = currentTree ? currentTree.selectedIndexes : [];
    let types: any[] = [];

    for (let i = 0; i < selectedIndexes.length; i++) {
        currentTree?.getItem(selectedIndexes[i]).then(result => {
            types.push(result.value);

            if (i === selectedIndexes.length - 1) {
                if (scheduler.current) { // Ensure scheduler.current is not null
                    scheduler.current.dataSource = data.filter((d: any) => types.indexOf(d.class) > -1);
                }
            }
        });
    }
};

const HandleDateChange = (event: any) => {
  const calendar = useRef<any>(null); // Adjust 'any' to the appropriate type if available

  if (calendar.current) { // Ensure calendar.current is not null
      calendar.current.selectedDates = [event.detail.value];
  }
};

const init = () => {
  // Your init logic here
};

useEffect(() => {
  init()
}, []);


  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  <>
    {/* <div className="w-full h-screen flex flex-cols text-center">
        <div className="w-1/8 bg-slate-200 h-full p-4 hidden md:flex flex-col">
          <div className="px-4">
            <img src={logo}/>
          </div>
          <div className="justify-stretch py-5 grid grid-cols-1 gap-3 my-auto">
            <div className="bg-slate-100 shadow-md rounded-md px-4 py-3">
              Tutorials
            </div>
            <div className="bg-slate-100 shadow-md rounded-md px-4 py-3">
              Components
            </div>
            <div className="bg-slate-100 shadow-md rounded-md px-4 py-3">
              Contact
            </div>
          </div>
          <div>
            FOOTER
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 w-1/2 mx-auto h-1/2">
          <div className="text-4xl pt-10">HELLO WORLD</div>
          <div className="block">
          <button className="bg-slate-100 shadow-md px-4 py-3"> Get started</button></div>
        </div>

        
     </div> */}


<div className="bg-black text-white">

        <div className="w-full h-full bg-white">
        <div id="primaryContainer" ref={primaryContainer}>
					<div id="header">
						<Button id="toggleButton" onClick={HandleToggle.bind}></Button>
						<div id="title">Scheduler</div>
						<Button id="addNew" className="floating" onClick={AddNew}><span>Create</span>
						</Button>
					</div>
					<div className="content">
						<section id="sideA">
							<div className="button-container">
								<div id="logo"></div>
							</div>
							<div className="controls-container">
								<Calendar ref={calendar} id="calendar" scrollButtonsPosition={scrollButtonsPosition} onChange={HandleCalendarChange}></Calendar>
								<Input id="searchBar" className="underlined" placeholder="Search for people"></Input>
								<Tree ref={tree} id="tree" selectionMode="checkBox" toggleElementPosition="far" onChange={HandleTreeChange}>
									<TreeItemsGroup expanded>My calendars
                      <TreeItem value="birthday" selected>Birthdays</TreeItem>
										<TreeItem value="holiday" selected>Holidays</TreeItem>
										<TreeItem value="event" selected>Events</TreeItem>
									</TreeItemsGroup>
								</Tree>
							</div>
						</section>
						<section id="sideB">
							<Scheduler
                ref={scheduler}
                id="scheduler"
                dataSource={data}
                view={view}
                views={views}
                nonworkingDays={nonworkingDays}
								firstDayOfWeek={firstDayOfWeek}
								disableDateMenu={disableDateMenu}
								currentTimeIndicator={currentTimeIndicator}
								scrollButtonsPosition={scrollButtonsPosition} onDragEnd={UpdateData}
								onResizeEnd={UpdateData} onItemUpdate={UpdateData}
								onItemRemove={UpdateData} onDateChange={HandleDateChange}></Scheduler>
						</section>
					</div>
				</div>
        </div>

      </div>

      </>



  );
}

export default App;
