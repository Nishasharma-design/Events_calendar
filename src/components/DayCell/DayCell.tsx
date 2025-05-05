import { EventType } from '../Modal/Modal';
import classes from './DayCell.module.scss';

type DayCellProps = {
    date: Date | null;
    onClick: (date: Date) => void;
    events: EventType[];
    onEventClick: (event: EventType) => void;

};

function DayCell({ date, onClick, events, onEventClick }: DayCellProps) {
    const isEmpty = date === null;

    const handleClick = () => {
        if (date) {
            onClick(date);
        }
    };

    return (
        <div className={classes.dayCell}
        onClick={handleClick}
        >
            {!isEmpty && (
                <>
                <div className={classes.dateNumber}>{date.getDate()}</div>
                <div className={classes.events}>
                    {events.map((event) => (
                        <div className={classes.eventItem} onClick={(e) => {
                            e.stopPropagation();
                            onEventClick(event);
                        }}>
                            {event.eventName}
                            </div>
                    ))}
                </div>
                </>
            )}
        </div>
    );
}

export default DayCell;