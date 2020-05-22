import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
//Checkbox list with all categories
import CheckboxList from './CheckboxList';
//Slider for changing the money range
import MoneySlide from './SliderMoney';
//Slider for changing the distance range
import DistSlide from './SliderDistance';
//Material UI's utility and styling components
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

/*The UserPreferences class will render all of the settings that the user can change.*/
class UserPreferences extends React.Component {  
    render() {
      const fullList = (
        <div style={{overflowX: 'hidden'}}>
            <List>
                <ListItem >
                    <div><h2>Search Preferences</h2></div>
                </ListItem>
                <Divider />
                <ListItem >
                    <MoneySlide />
                </ListItem>
                <ListItem>
                    <DistSlide />
                </ListItem>
                <Divider />
                <CheckboxList />
                <Divider />
                <ListItem>
                  <Button 
                    variant='contained'
                    color='primary'
                    startIcon={<SaveIcon />}
                  >
                     Save
                  </Button>
                </ListItem>
            </List>
        </div>
      );
  
      return (
        <div>      
          {fullList}    
        </div>
      );
    }
  }
  
  UserPreferences.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default (UserPreferences);

