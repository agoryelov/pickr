import React from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Firebase from '../../../firebase'
import '../../../css/Badges.css';
import * as ROUTES from '../../../constants/routes';


// the progress bar for the the xp badges
class CategoryProgress extends React.Component {
  
    // an array of xp points need for each level
    EXP = [0, 0, 60, 200, 500, 1000, 2500, 5000, 10000, 20000, 50000, 100000, 250000, 500000, 1000000];
    constructor(props) {
        super(props);
        this.state = {
            categoryLevel: 1,
            completed: 20,
        };
    }

    // calculates the current level of the user based on their current xp
    getLevel = (exp) => {
      let level;
      for (level = 1; level < this.EXP.length; level++) {
        if (exp < this.EXP[level + 1]) {
          return level;
        }
      }
    }

    // calculates the percentage of progress until the next level
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

      // the category
      const category = this.props.category;

      // the user level for this category
      const categoryLevel = this.getLevel(this.props.exp);
      this.state.categoryLevel = categoryLevel;

      // the percentage of progress until next level for this category
      const progress = this.getProgress(categoryLevel);
      this.state.completed = progress;

      // the amount of xp needed for the next level for this category
      const remExp = this.EXP[this.state.categoryLevel + 1] - this.props.exp;

        // JSX for the progress bar
        return(
        <Paper style={{padding: '0 1em 0 1em'}} >
          <Grid container spacing={8} style={{marginTop: '1em'}}>
            <Grid item xs={3} md={2} style={{fontWeight: '600'}}>
              <div>{category}</div>
            </Grid>
            <Grid item xs={9} md={10}>
              <span style={{color: 'grey', fontWeight: '400'}}>{this.props.exp} exp</span>
            </Grid>
            <Grid item xs={12}>
            <LinearProgress classes={{barColorPrimary: `barColorLevel${categoryLevel}`, colorPrimary: `colorLevel${categoryLevel}`}} color="primary" style={{height:'18px', borderRadius: '5px'}} variant="determinate" value={this.state.completed} />
            </Grid>
            <Grid item xs={5} style={{fontWeight: '600'}}>
              <div>Level {categoryLevel} Exp  </div>
            </Grid>
            <Grid item xs={7} style={{textAlign: 'right', color: 'grey'}}>
              <div>{remExp} exp to Level {categoryLevel + 1}</div>
            </Grid>
          </Grid>
        </Paper>
        );
    }
}

// Component for the xp badges which shows level and xp for the different categories for the user
class Badges extends React.Component {
    firebase = new Firebase();
    constructor(props) {
        super(props);

        this.state = {
            testSorted: null,
            loading: true,
        };
    }

    //Helper function to sort the json object
    sortCats = (categerySnapshot) => {
      let sorted = [];
      for (let category in categerySnapshot) {
        sorted.push([category, categerySnapshot[category]]);
      }
      sorted.sort((a, b) => {
        return (b[1] - a[1]);
      });

      return sorted;
    }

    componentDidMount() {
      this.setState({ loading: true });

      // Grab the current XP by category for the user. Cnce pulled set loading to false so the Badges can render.
      this.firebase.auth.onAuthStateChanged(user => {
        if (user) {
          this.firebase.categoryProgress(user.uid).on("value", snapshot => {       
            this.setState({
              testSorted: this.sortCats(snapshot.val()),
              loading: false,
            });
          });
        } else {
          this.props.history.push(ROUTES.SIGN_IN);
        }
      });
    }
    
    render() {
        // if the page is still loading show a circular loading icon
        if (this.state.loading) {
          return (
            <div style={{marginTop: '40vh', display: 'flex', justifyContent: 'center'}}>
              <CircularProgress />
            </div>
          );
        }


        // the sorted XPs by category for the user
        const sortedCats = this.state.testSorted;

        // if no longer loading render the content
        return (
          <div style={{margin: '1em'}}>
            <Grid container justify='center' spacing={16}>
              {sortedCats.map(x => 
                <Grid key={x[0]} item xs={12} sm={10}>
                  <CategoryProgress category={x[0]} exp={x[1]} />
                </Grid>)}
            </Grid>
          </div>
        )
    }
}

export default Badges;