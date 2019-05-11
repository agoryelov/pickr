import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonIcon from '@material-ui/icons/Person';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CollectionsIcon from '@material-ui/icons/Collections';

import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
      this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className="nav-root" 
        style={{width: '100%', height: '56px', position: 'sticky', bottom: '0'}}
      >
        <BottomNavigationAction component={Link} to={ROUTES.HOME} label="Quests" icon={<CollectionsIcon />} />
        <BottomNavigationAction component={Link} to={ROUTES.FAVS} label="Favourites" icon={<FavoriteIcon />} />
        <BottomNavigationAction component={Link} to={ROUTES.BADGES} label="Badges" icon={<PersonIcon />} />
      </BottomNavigation>
    );
  }
}

export default SimpleBottomNavigation;