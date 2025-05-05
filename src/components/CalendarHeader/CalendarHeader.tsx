import classes from './CalendarHeader.module.scss';

type CalendarHeaderProps = {
    currentDate: Date;
    onPrev: () => void;
    onNext: () => void;
};

function CalendarHeader({ currentDate, onPrev, onNext }: CalendarHeaderProps) {
    const monthName = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();

    return (
        <div className={classes.header}>
            <button onClick={onPrev}>← Prev</button>

            <h2>
                {monthName} {year}
            </h2>
            <button onClick={onNext}>Next →</button>
        </div>
    )
}

export default CalendarHeader;