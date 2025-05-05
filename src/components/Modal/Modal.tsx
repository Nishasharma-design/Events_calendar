import classes from './Modal.module.scss';
import { useForm } from 'react-hook-form';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  addEvent: (event: EventType) => void;
};

export type EventType = {
  eventName: string;
  startDate: string;
  endDate: string;
  location: string;
  label: string;
};

function Modal({ isOpen, onClose, selectedDate, addEvent }: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<EventType>({
    defaultValues: {
      startDate: selectedDate?.toISOString().slice(0, 10) || ''
    },
  });

  if (!isOpen || !selectedDate) return null;

  const onSubmit = (data: EventType) => {
    addEvent(data);
    reset();
    onClose();
  };

  return (
    <div className={classes.modalOverlay}>
      <div className={classes.modalContent}>
        <h3>Add Event</h3>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>

          <div className={classes.inputGroup}>
            <label>Event Name</label>
            <input {...register('eventName', { required: 'Event Name is required' })} />
            {errors.eventName && <span className={classes.error}>{errors.eventName.message}</span>}
          </div>

          <div className={classes.inputGroup}>
            <label>Start Date</label>
            <input
              type="date"
              {...register('startDate', {
                required: 'Start Date is required',
                validate: (value) => {
                  const todayStr = new Date().toISOString().slice(0, 10);
                  return value >= todayStr || 'Start date cannot be in the past';
                },
              })}
            />
            {errors.startDate && <span className={classes.error}>{errors.startDate.message}</span>}
          </div>

          <div className={classes.inputGroup}>
            <label>End Date</label>
            <input
              type="date"
              {...register('endDate', {
                required: 'End Date is required',
                validate: (value) => {
                  return value >= getValues('startDate') || 'End date cannot be before start date';
                },
              })}
            />
            {errors.endDate && <span className={classes.error}>{errors.endDate.message}</span>}
          </div>

          <div className={classes.inputGroup}>
            <label>Location</label>
            <input {...register('location', { required: 'Location is required' })} />
            {errors.location && <span className={classes.error}>{errors.location.message}</span>}
          </div>

          <div className={classes.inputGroup}>
            <label>Label</label>
            <input {...register('label', { required: 'Label is required' })} />
            {errors.label && <span className={classes.error}>{errors.label.message}</span>}
          </div>

          <div className={classes.buttons}>
            <button type="submit">Save Event</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Modal;
