import React from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Firebase from '../firebase'
import '../CSS/Badges.css';
import * as ROUTES from '../../constants/routes';



class CategoryProgress extends React.Component {
    EXP = [0, 0, 500, 1250, 2000, 3000, 4000];
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
        if (exp < this.EXP[level + 1]) {
          return level;
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
      console.log(this.props.exp + " " + categoryLevel);
      const progress = this.getProgress(categoryLevel);

      this.setState({
        categoryLevel: categoryLevel,
        completed: progress,
      });
    }

    // componentWillReceiveProps() {
    //   const categoryLevel = this.getLevel(this.props.exp);
    //   console.log(this.props.exp + " " + categoryLevel);
    //   const progress = this.getProgress(categoryLevel);

    //   this.setState({
    //     categoryLevel: categoryLevel,
    //     completed: progress,
    //   });
    // }
    
    render() {
      const category = this.props.category;
      const categoryLevel = this.state.categoryLevel;
      const remExp = this.EXP[this.state.categoryLevel + 1] - this.props.exp;

      console.log(this.props.exp + " " + categoryLevel);

        return(
        <Paper style={{padding: '0 1em 0 1em'}} >
          <Grid container spacing={8} style={{marginTop: '1em'}}>
            <Grid item xs={12} style={{fontWeight: '600'}}>
              <div>{category}</div>
            </Grid>
            <Grid item xs={12}>
            <LinearProgress classes={{barColorPrimary: `barColorLevel${categoryLevel}`, colorPrimary: `colorLevel${categoryLevel}`}} color="primary" style={{height:'18px', borderRadius: '5px'}} variant="determinate" value={this.state.completed} />
            </Grid>
            <Grid item xs={4} style={{fontWeight: '600'}}>
              <div>Level {categoryLevel}</div>
            </Grid>
            <Grid item xs={8} style={{textAlign: 'right', color: 'grey'}}>
              <div>{remExp} exp to Level {categoryLevel + 1}</div>
            </Grid>
          </Grid>
        </Paper>
        );
    }
}

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
        if (this.state.loading) {
          return (
            <div style={{marginTop: '40vh', display: 'flex', justifyContent: 'center'}}>
              <CircularProgress />
            </div>
          );
        }

        const sortedCats = this.state.testSorted;
        console.log(sortedCats);
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