import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';

function ContactDetail(props) {
    const handleClose = () => {
        props.contactDetailCallback();
        console.log(props.contactId);
    };
    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth={'lg'}>
                <DialogTitle id="form-dialog-title">Chi tiết ứng viên</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ContactDetail;