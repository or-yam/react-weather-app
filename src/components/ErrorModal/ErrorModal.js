import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function ErrorModal({ errorCode, errorMessage }) {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Error {errorCode}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      </Box>
    </Modal>
  );
}

ErrorModal.propTypes = {
  errorCode: PropTypes.number.isRequired,
  errorMessage: PropTypes.string.isRequired
};
