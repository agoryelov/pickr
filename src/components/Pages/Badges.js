import React, { cloneElement } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Firebase from '../firebase'

import 'typeface-roboto';


class CategoryProgress extends React.Component {
    EXP = [0, 0, 50, 125, 200, 300, 400];
    constructor(props) {
        super(props);
        this.state = {
            categoryLevel: 1,
            completed: 20,
        };
    }

    getLevel = (exp) => {
      let level;
      for (level = 1; level < this.EXP.length; level++) {
        if (exp <= this.EXP[level]) {
          return level - 1;
        }
      }
    }

    getProgress = (level) => {
      let levelExp = this.props.exp - this.EXP[level];
      let totalLevelExp = this.EXP[level + 1] - this.EXP[level];
      let progress = levelExp / totalLevelExp * 100;
      return progress;
    }

    componentDidMount() {
      const categoryLevel = this.getLevel(this.props.exp);
      const progress = this.getProgress(categoryLevel);

      this.setState({
        categoryLevel: categoryLevel,
        completed: progress,
      });
    }
    
    render() {
      const category = this.props.category;
      const categoryLevel = this.state.categoryLevel;
      const remExp = this.EXP[this.state.categoryLevel + 1] - this.props.exp;

        return(
        <Paper style={{padding: '0 1em 0 1em'}} >
          <Grid container spacing={8} style={{marginTop: '1em'}}>
            <Grid item xs={12} style={{fontWeight: '600'}}>
              <div>{category}</div>
            </Grid>
            <Grid item xs={12}>
            <LinearProgress color={this.props.color} style={{height:'18px', borderRadius: '5px'}} variant="determinate" value={this.state.completed} />
            </Grid>
            <Grid item xs={4} style={{fontWeight: '600'}}>
              <div>Level {categoryLevel}</div>
            </Grid>
            <Grid item xs={8} style={{textAlign: 'right', color: 'grey'}}>
              <div>{remExp} exp to Level {categoryLevel + 1}</div>
            </Grid>
          </Grid>
        </Paper>
        )
    }
}

class Badges extends React.Component {
    firebase = new Firebase();
    constructor(props) {
        super(props);

        this.state = {
            userProgress: null,
            loading: true,
        };
    }

    componentDidMount() {
      this.setState({ loading: true });

      this.firebase.auth.onAuthStateChanged(user => {
        if (user) {
          this.firebase.categoryProgress(user.uid).once("value", snapshot => {
            this.setState({ 
              userProgress: snapshot.val(),
              loading: false,
            });
          });
        } else {
          //not logged in
        }
      });
    }
    
    render() {
        let content;
        if (!this.state.loading) {
          content = 
          <div style={{margin: '1em'}}>
            <Grid container justify='center' spacing={16}>
              <Grid item xs={12} sm={10} md={7}>
                  <CategoryProgress color="primary" category="Sports" exp={this.state.userProgress['Sports']} />
              </Grid>
              <Grid item xs={12} sm={10} md={7}>
                  <CategoryProgress color="secondary" category="Romantic" exp={this.state.userProgress['Romantic']} />
              </Grid>
              <Grid item xs={12} sm={10} md={7}>
                  <CategoryProgress color="primary" category="Fitness" exp={this.state.userProgress['Fitness']} />
              </Grid>
              <Grid item xs={12} sm={10} md={7}>
                  <CategoryProgress color="secondary" category="Fitness" exp={this.state.userProgress['Fitness']} />
              </Grid>
            </Grid>
          </div>;
        } else {
          content = 
          <div style={{marginTop: '40vh', display: 'flex', justifyContent: 'center'}}>
            <CircularProgress />
          </div>;
        }
        return <div>{content}</div>;
    }
}

export default Badges;