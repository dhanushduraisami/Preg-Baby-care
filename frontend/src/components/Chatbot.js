import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { text: message, sender: 'user' }]);
      // Simulate bot response
      setTimeout(() => {
        setChatHistory(prev => [...prev, { 
          text: "I'm here to help with your pregnancy questions. How can I assist you today?", 
          sender: 'bot' 
        }]);
      }, 1000);
      setMessage('');
    }
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <ChatIcon />
      </IconButton>
      
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Pregnancy Care Assistant</DialogTitle>
        <DialogContent>
          <Box sx={{ height: '300px', overflowY: 'auto', mb: 2 }}>
            {chatHistory.map((chat, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: chat.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 1
                }}
              >
                <Paper
                  sx={{
                    p: 1,
                    maxWidth: '70%',
                    backgroundColor: chat.sender === 'user' ? '#e3f2fd' : '#f5f5f5'
                  }}
                >
                  <Typography>{chat.text}</Typography>
                </Paper>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button variant="contained" onClick={handleSend}>
              Send
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Chatbot; 