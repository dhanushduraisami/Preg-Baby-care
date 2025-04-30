import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, Stack } from '@mui/material';
import './PregnancyCalendar.css'; // Import custom CSS

const PregnancyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: '',
    appointmentType: '',
    time: '',
    pregnancyWeek: '',
    notes: ''
  });

  const handleDateSelect = (selectInfo) => {
    setAppointmentDetails({
      ...appointmentDetails,
      date: selectInfo.startStr.split('T')[0]
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAppointmentDetails({
      date: '',
      appointmentType: '',
      time: '',
      pregnancyWeek: '',
      notes: ''
    });
  };

  const handleSubmit = () => {
    if (appointmentDetails.date && appointmentDetails.appointmentType && appointmentDetails.time) {
      const newEvent = {
        title: `${appointmentDetails.appointmentType} - Week ${appointmentDetails.pregnancyWeek}`,
        start: `${appointmentDetails.date}T${appointmentDetails.time}`,
        extendedProps: {
          pregnancyWeek: appointmentDetails.pregnancyWeek,
          notes: appointmentDetails.notes
        }
      };
      setEvents([...events, newEvent]);
      handleClose();
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#ffffff' }}>
      <div className="calendar-header">
        <Typography variant="h1" component="h1">
          Pregnancy Appointment Calendar
        </Typography>
      </div>
      <Box sx={{ height: 600, maxWidth: '1000px', margin: '0 auto' }} className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev',
            center: 'title',
            right: 'next'
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={3}
          weekends={true}
          events={events}
          select={handleDateSelect}
          eventDisplay="block"
          eventClick={(clickInfo) => {
            if (window.confirm(`Are you sure you want to delete the appointment '${clickInfo.event.title}'?`)) {
              clickInfo.event.remove();
            }
          }}
        />
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>New Appointment</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Date"
              type="date"
              value={appointmentDetails.date}
              onChange={(e) => setAppointmentDetails({ ...appointmentDetails, date: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            
            <TextField
              label="Appointment Type"
              placeholder="e.g., OB Check-up, Ultrasound"
              value={appointmentDetails.appointmentType}
              onChange={(e) => setAppointmentDetails({ ...appointmentDetails, appointmentType: e.target.value })}
              fullWidth
            />

            <TextField
              label="Time"
              type="time"
              value={appointmentDetails.time}
              onChange={(e) => setAppointmentDetails({ ...appointmentDetails, time: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Pregnancy Week"
              placeholder="e.g., 8, 12, 20, 36"
              value={appointmentDetails.pregnancyWeek}
              onChange={(e) => setAppointmentDetails({ ...appointmentDetails, pregnancyWeek: e.target.value })}
              fullWidth
            />

            <TextField
              label="Notes"
              placeholder="Any important details or reminders"
              value={appointmentDetails.notes}
              onChange={(e) => setAppointmentDetails({ ...appointmentDetails, notes: e.target.value })}
              multiline
              rows={4}
              fullWidth
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
              <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: 'purple' }}>
                Save
              </Button>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PregnancyCalendar; 