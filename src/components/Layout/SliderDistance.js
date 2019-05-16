import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

const styles = {
  root: {
    width: 200,
  },
  slider: {
    padding: '22px 0px',
  },
};

class SimpleSlider extends React.Component {
  state = {
    value: 30,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  }; 

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const lessThan = '<';
    return (
      <div className={classes.root}>
        <Typography id="label"><b>Distance</b> {lessThan} {this.state.value}km </Typography>
        <Slider
          classes={{ container: classes.slider }}
          value={value}
          aria-labelledby="label"
          onChange={this.handleChange}
          max={30}
          min={1}
          step={1}
        />
      </div>
    );
  }
}

SimpleSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSlider);
