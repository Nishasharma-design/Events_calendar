import { EventType } from "../Modal/Modal"
import classes from './EventDetailsModal.module.scss';

type Props = {
    event: EventType;
    onClose: () => void;
}

const EventDetailsModal = ({ event, onClose }: Props) => {
    const getCountdown = () => {
        const now = new Date();
        const start = new Date(event.startDate);
        const diff = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        if (diff > 0) return `${diff} day(s) left`;
        if (diff === 0) return "Today!";
        return "Started already";
    };

    return (
        <div className={classes.modal_overlay}>
            <div className={classes.modal_content}>
                <h2>{event.eventName}</h2>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Label:</strong> {event.label}</p>
                <p><strong>Start:</strong> {event.startDate}</p>
                <p><strong>End:</strong> {event.endDate}</p>
                <p><strong>Countdown:</strong> {getCountdown()}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default EventDetailsModal;