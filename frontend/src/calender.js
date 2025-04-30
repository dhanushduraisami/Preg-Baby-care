import { useState } from 'react';

export default function PregnancyCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState([
    { id: 1, date: new Date().toISOString().split('T')[0], title: 'Initial OB Appointment', time: '9:00 AM', notes: 'Bring ID and insurance card' },
    { id: 2, date: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0], title: 'Ultrasound', time: '10:30 AM', notes: 'Drink water before appointment' }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    time: '',
    notes: ''
  });

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Calendar navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Appointment handlers
  const openNewAppointmentModal = (date) => {
    setSelectedDate(date);
    setSelectedAppointment(null);
    setNewAppointment({ title: '', time: '', notes: '' });
    setShowModal(true);
  };

  const openEditAppointmentModal = (appointment) => {
    setSelectedDate(appointment.date);
    setSelectedAppointment(appointment);
    setNewAppointment({
      title: appointment.title,
      time: appointment.time,
      notes: appointment.notes
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({ ...newAppointment, [name]: value });
  };

  const saveAppointment = () => {
    if (selectedAppointment) {
      // Edit existing appointment
      setAppointments(appointments.map(app => 
        app.id === selectedAppointment.id ? 
        { ...app, title: newAppointment.title, time: newAppointment.time, notes: newAppointment.notes } : 
        app
      ));
    } else {
      // Add new appointment
      const newId = appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1;
      setAppointments([
        ...appointments, 
        { 
          id: newId, 
          date: selectedDate, 
          title: newAppointment.title,
          time: newAppointment.time, 
          notes: newAppointment.notes 
        }
      ]);
    }
    setShowModal(false);
  };

  const deleteAppointment = () => {
    setAppointments(appointments.filter(app => app.id !== selectedAppointment.id));
    setShowModal(false);
  };

  // Generate calendar days
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="bg-gray-100 h-32"></div>);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayAppointments = appointments.filter(app => app.date === date);
      
      days.push(
        <div key={day} className="min-h-32 border border-gray-200 p-1">
          <div className="flex justify-between items-start">
            <span className={`font-bold ${isWeekend(new Date(year, month, day)) ? 'text-red-500' : ''}`}>
              {day}
            </span>
            <button 
              onClick={() => openNewAppointmentModal(date)}
              className="text-xs bg-purple-100 text-purple-800 p-1 rounded hover:bg-purple-200"
            >
              +
            </button>
          </div>
          
          <div className="mt-1">
            {dayAppointments.map(app => (
              <div 
                key={app.id} 
                className="bg-purple-100 p-1 mb-1 rounded text-xs cursor-pointer hover:bg-purple-200"
                onClick={() => openEditAppointmentModal(app)}
              >
                <div className="font-bold">{app.title}</div>
                <div>{app.time}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return days;
  };

  // Check if date is weekend
  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  // Get month name
  const monthNames = ["January", "February", "March", "April", "May", "June", 
                       "July", "August", "September", "October", "November", "December"];

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-4">
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">Pregnancy Appointment Calendar</h1>
      
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={prevMonth}
          className="bg-purple-100 text-purple-800 px-3 py-1 rounded hover:bg-purple-200"
        >
          &lt; Prev
        </button>
        <h2 className="text-2xl font-semibold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <button 
          onClick={nextMonth}
          className="bg-purple-100 text-purple-800 px-3 py-1 rounded hover:bg-purple-200"
        >
          Next &gt;
        </button>
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Days of week header */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="py-2 text-center font-bold bg-purple-100">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {renderCalendar()}
      </div>
      
      {/* Pregnancy Milestone Tracker */}
      <div className="mt-8 p-4 bg-purple-50 rounded-lg">
        <h3 className="text-xl font-bold text-purple-800 mb-2">Pregnancy Milestone Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-white rounded shadow">
            <h4 className="font-bold text-purple-700">First Trimester (Weeks 1-12)</h4>
            <ul className="list-disc pl-5 text-sm">
              <li>Initial OB Appointment (Week 8)</li>
              <li>First Ultrasound (Week 8-10)</li>
              <li>Genetic Testing (Week 10-12)</li>
              <li>NT Scan (Week 11-13)</li>
            </ul>
          </div>
          <div className="p-3 bg-white rounded shadow">
            <h4 className="font-bold text-purple-700">Second Trimester (Weeks 13-27)</h4>
            <ul className="list-disc pl-5 text-sm">
              <li>Monthly Check-ups</li>
              <li>Anatomy Scan (Week 18-20)</li>
              <li>Glucose Test (Week 24-28)</li>
              <li>Rhogam Shot if needed (Week 28)</li>
            </ul>
          </div>
          <div className="p-3 bg-white rounded shadow">
            <h4 className="font-bold text-purple-700">Third Trimester (Weeks 28-40+)</h4>
            <ul className="list-disc pl-5 text-sm">
              <li>Bi-weekly Check-ups (Week 28-36)</li>
              <li>Weekly Check-ups (Week 36+)</li>
              <li>Group B Strep Test (Week 36)</li>
              <li>Postpartum Check-up (6 weeks after delivery)</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {selectedAppointment ? 'Edit Appointment' : 'New Appointment'}
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Date</label>
              <input 
                type="text"
                className="w-full p-2 border rounded bg-gray-100"
                value={selectedDate}
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Appointment Type</label>
              <input 
                type="text"
                name="title"
                className="w-full p-2 border rounded"
                value={newAppointment.title}
                onChange={handleInputChange}
                placeholder="e.g., OB Check-up, Ultrasound"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Time</label>
              <input 
                type="text"
                name="time"
                className="w-full p-2 border rounded"
                value={newAppointment.time}
                onChange={handleInputChange}
                placeholder="9:00 AM"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Notes</label>
              <textarea
                name="notes"
                className="w-full p-2 border rounded"
                value={newAppointment.notes}
                onChange={handleInputChange}
                placeholder="Any important details or reminders"
                rows="3"
              ></textarea>
            </div>
            <div className="flex justify-between">
              <div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveAppointment}
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
              {selectedAppointment && (
                <button 
                  onClick={deleteAppointment}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}