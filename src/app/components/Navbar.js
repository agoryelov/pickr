import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function Navbar() {
    return(
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Typography style={{ flexGrow: '1'}} variant="h6" color="inherit">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                
            </AppBar>
        </div>
    );
}

export default Navbar