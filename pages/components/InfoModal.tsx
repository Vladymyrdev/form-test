import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  toggleOpen: () => void;
  isError: boolean;
}

export default function InfoModal({ open, toggleOpen, isError }: Props) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={toggleOpen}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            sx={{ color: isError ? 'red' : 'green' }}
            id="transition-modal-title"
            variant="h6"
            component="h2">
            {isError ? 'Error! Email is not valid' : 'Success!'}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
}
