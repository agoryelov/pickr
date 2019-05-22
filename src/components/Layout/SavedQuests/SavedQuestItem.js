import React from "react";

//  Material-UI components
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ShareComp from './Share';
import BrushIcon from '@material-ui/icons/Brush';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import FastFoodIcon from '@material-ui/icons/Fastfood';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LibraryIcon from '@material-ui/icons/LocalLibrary';
import SupervisorIcon from '@material-ui/icons/SupervisorAccount';
import GamesIcon from '@material-ui/icons/Games';
import ShareIcon from '@material-ui/icons/Share';
import NearMeIcon from '@material-ui/icons/NearMe';
import StyleIcon from '@material-ui/icons/Style';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import 'typeface-roboto';
import '../../CSS/QuestPage.css'
import Firebase from "../../firebase";

// React component for the user's saved(favourited) quests.
class SavedQuestItem extends React.Component {
    // Call access to the Firebase database.
    firebase = new Firebase();

    //Grab props from parent
    constructor(props) {
        super(props);

        this.state = {            
            // an array of xp per category the current completed quest will reward
            xpArray: null,

            // boolean value for the currrent toggle state of the saved quest item
            open: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    // function to handle indiviudal quest toggle.
    toggleModal = () => {
        if(this.state.open) {
            this.setState({
                open: false,
            }); 
        } else {
            this.setState({
                open: true,
            }); 
        }
    }

    componentDidMount() {
    }

    // Called when the user clicks the completed button of a quest in their favourites list.
    handleSave = (e) => {
        e.stopPropagation();

        // call completeQuest function
        this.completeQuest();
    }

    // function to handle xp category chip clip
    handleChip = (e) => {
        e.stopPropagation();
    }


    // Adds the quest to their completed quest list and rewards user XP for completing the quest.
    // Also deletes the quest from the favourites list.
    completeQuest() {

        // The current date. This date (in absolute time) will be used as the index of the quest in the
        // user's completed quest list. 
        let now = new Date();

        // add quest to completed list in firebase
        this.firebase.completed(this.props.globalUser.uid).child(now.getTime()).update({
              questID : this.props.questId,
              completedDate : now
        });

        // Calls updateXPArray function. This function creates an array of objects. Each object is a category of the quest
        // and the amount of xp for the category the quest will reward for completing.
        this.updateXpArray();

        // Call deleteQuest function to remove the completed quest from the user's favourites
        this.deleteQuest();
    }

    // Creates an array of objects. Each object is a category of the quest to be completed
    // and the amount of xp for the category the quest will reward for completing.
    updateXpArray() {
        let xpArray = [];

        // loop through every cateogry in categories for the quest
        for (var category in this.props.questData['categories']) {

          // grab the xp to be rewarded for the current category
          let currentXP = this.props.questData['categories'][category];
          // create an object for category and xp
          let progressXP = {
            category: category,
            xp: currentXP,
          };
          // add current category object to xpArray
          xpArray.push(progressXP);
        };
      
        // pass xpArray to updateUserXP function which will add the xp in xpArray to the user's xp values in firebase
        this.updateUserXp(xpArray);
    }

    // takes in an array of objects with categeory and xp per category to add to user's current xp in database
    updateUserXp(xpArray) {

        // get user's current xp progress before update
        this.firebase.categoryProgress(this.props.globalUser.uid).once("value", snapshot => {
            let userXP = snapshot.val();
      
            // Loop through every object in xpArray. Grab the category and xp and update the user's xp for that category in firebase
            for (var category in xpArray) {
              let categoryTag = xpArray[category].category
              this.firebase.categoryProgress(this.props.globalUser.uid).update({
                [categoryTag] : xpArray[category].xp  + userXP[categoryTag]
              });
            }
          });
    }

    // called when user clicks the delete button of a quest in their favourites list. Deletes quest.
    deleteQuest() {
        this.firebase.favourites(this.props.globalUser.uid).child(this.props.questId).remove();
    }

    render() {
        // the complete quest data
        const data = this.props.questData;

        //Pull relevant card summary data

        // quest image link
        const questImage = data['imgLink'];

        // quest name
        const questName = data['name'];

        // external link for quest
        const questLink = data['link'];

        // quest location (city)
        const questLocation = data['location'];

        //quest categories and xp for each category
        const cats = Object.entries(data['categories']);

        // quest address
        const address = data['address'];

        // quest categories as a string
        const tags = data['tags'];

        // icons for the different categories
        const icons = {
            Fitness: {
                icon: <FitnessCenterIcon style={{ color: 'white', fontSize: '16px' }} />,
                color: "#0277bdCC"
            },
            Creative: {
                icon: <BrushIcon style={{ color: 'white', fontSize: '16px' }} />,
                color: "#fbc02dAA"
            },
            Nature: {
                icon: <FilterHdrIcon style={{ color: 'white', fontSize: '16px' }} />,
                color: "#66bb6aCC"
            },
            Culture: {
                icon: <LibraryIcon style={{ color: 'white', fontSize: '16px' }} />,
                color: "#8e24aaCC"
            },
            Food: {
                icon: <FastFoodIcon style={{ color: 'white', fontSize: '15px' }} />,
                color: "#8d6e63CC"
            },
            Romantic: {
                icon: <FavoriteIcon style={{ color: 'white', fontSize: '16px' }} />,
                color: "#ec407aCC"
            },
            Volunteer: {
                icon: <SupervisorIcon style={{ color: 'white', fontSize: '16px' }} />,
                color: "#ec407aCC"
            },
            Games: {
                icon: <GamesIcon style={{ color: 'white', fontSize: '16px' }} />,
                color: "#ec407aCC"
            },
        };

        // JSX
        return (
            <div>
                <ExpansionPanel elevation={1} style={{
                    background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)), url("${questImage}")`,
                    backgroundPosition: 'center',
                    backgroundSize: '150% auto', color: 'white', marginBottom: '1.5em',
                }}>
                    <ExpansionPanelSummary classes={{ content: "noMargin", root: 'noMargin' }}>
                        <Grid container justify='space-between' style={{ padding: '0' }}>
                            <Grid item container xs={9}>
                                <Grid item xs={12} style={{ margin: '.5em 0 0 1em' }}>
                                    <span style={{ fontWeight: 'bold' }}>{questName}</span>
                                </Grid>
                                <Grid item xs={12} style={{ margin: '0 0 0 1em' }}>
                                    <span style={{ fontSize: '0.8em', color: '#FFFFFFCC' }}>{questLocation}</span>
                                </Grid>
                                <Grid item xs={12} style={{ margin: '.5em .5em .5em 0' }}>
                                    {cats.map(x => (
                                        <Tooltip key={x[0]} disableHoverListener enterTouchDelay={200} title={x[0]} placement="top">
                                            <Chip
                                                style={{ height: '22px', marginLeft: '1em', color: 'white', borderColor: 'white', background: `${icons[x[0]]['color']}` }}
                                                icon={icons[x[0]]['icon']}
                                                label={x[1]}
                                                onClick={this.handleChip}
                                            />
                                        </Tooltip>
                                    ))}
                                </Grid>
                            </Grid>
                            <Grid item container xs={3} md={2} alignItems='center' justify='center'>
                                <Grid item xs={12}>
                                    <Fab style={{ backgroundColor: '#EEEEEE' }} size="medium" onClick={this.handleSave.bind(this)}>
                                        <DoneIcon style={{ fontSize: '200%', color: 'green' }} />
                                    </Fab>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ background: 'white', color: 'black', padding: '0' }}>
                        <Grid container justify="flex-end">
                            <Grid item xs={12}>
                                <List component="ul" style={{ width: '100%' }}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <NearMeIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={address}
                                            disableTypography
                                            style={{ fontWeight: '400', fontSize: '.8em' }} />
                                    </ListItem>
                                    <Divider light />
                                    <ListItem>
                                        <ListItemIcon>
                                            <StyleIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={tags}
                                            disableTypography
                                            style={{ fontWeight: '400', fontSize: '.8em' }} />
                                    </ListItem>
                                    <Divider light />
                                    <ListItem>
                                        <ShareIcon />
                                        <Button variant = "contained" color ='inherit' onClick = {this.toggleModal} style = {{backgroundColor: 'white', cursor: 'pointer', marginLeft: '15px'}}>
                                        <ListItemText
                                            primary="Share with friends"
                                            disableTypography
                                            style={{ fontWeight: '400', fontSize: '.8em' }} />
                                        </Button>
                                            <Dialog open = {this.state.open}
                                            aria-describedby = "shareButtons"
                                            onBackdropClick = {this.toggleModal}
                                            maxWidth = "lg"
                                            scroll = "paper"
                                          
                                            ><DialogTitle style = {{textAlign: 'center'}}>Sharing is caring!</DialogTitle>
                                            <DialogContent>
                                                <ShareComp  id = "shareButtons" questName = {questName} questLocation ={questLocation} questLink = {questLink}/>
                                            </DialogContent>
                                            </Dialog>
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item style={{padding: '4px 4px'}}>
                                <Button size="small" color="default" href={questLink} target="_blank">
                                    Learn More
                                </Button>
                                <Button size="small" color="secondary" onClick={this.deleteQuest.bind(this)}>
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>

                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>)
    }
}

export default SavedQuestItem;