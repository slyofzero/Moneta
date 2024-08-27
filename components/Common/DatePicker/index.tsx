import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
} from "date-fns";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import moment from "moment";
import { Step2Data } from "@/state";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

interface DatePickerProps {
  setDate: Dispatch<SetStateAction<string>>;
  setShowCalander: Dispatch<SetStateAction<boolean>>;
}

function DatePickerModal({ setDate, setShowCalander }: DatePickerProps) {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function onClick(day: Date) {
    setSelectedDay(day);
    setShowCalander(false);
    const formattedDate = moment(day).format("DD-MM-YYYY");
    setDate(formattedDate);
  }

  return (
    <div className="absolute mt-20 top-0 z-10">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:divide-gray-200 ">
          <div className="w-[300px] border-[1.5px] border-white rounded-2xl p-4 bg-black">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-gray-300">
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    "py-1.5"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => onClick(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && "text-white",
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "text-red-500",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-300",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",
                      isEqual(day, selectedDay) && isToday(day) && "bg-red-500",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-gray-700",
                      !isEqual(day, selectedDay) && "hover:bg-gray-800",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  name: string;
  label: string;
  setValue: Dispatch<SetStateAction<Step2Data>>;
  defaultValue?: string;
}

export function DatePicker({ name, label, setValue, defaultValue }: Props) {
  const [showCalender, setShowCalender] = useState(false);
  const today = startOfToday();
  const formattedTodayDate = moment(today).format("DD-MM-YYYY");
  const [date, setDate] = useState(formattedTodayDate);

  useEffect(() => {
    if (date !== formattedTodayDate)
      setValue((prev) => ({ ...prev, [name]: date }));
  }, [setValue, name, date, formattedTodayDate]);

  return (
    <div className="relative flex flex-col gap-2">
      <label className="text-sm  ml-4">{label}</label>
      <div
        className="flex items-center px-4 border-[1.5px] border-white h-10 rounded-2xl text-sm"
        onClick={() => setShowCalender((prev) => !prev)}
      >
        {<span>{defaultValue || date}</span>}
      </div>

      {showCalender && (
        <DatePickerModal setDate={setDate} setShowCalander={setShowCalender} />
      )}
    </div>
  );
}
