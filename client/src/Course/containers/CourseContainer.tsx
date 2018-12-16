// /* tslint:disable */

// import * as React from 'react';
// // import '../App.css';
// import { Grid, List, ListItem, ListItemText, Divider, ListSubheader, Typography, withStyles, Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, CircularProgress, Fade, Snackbar, Icon, SnackbarContent, Theme, createStyles } from '@material-ui/core';
// // import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import green from '@material-ui/core/colors/green';
// // import red from '@material-ui/core/colors/green';
// import CourseCard from '../CourseCard';
// import CourseAddExpansion from '../CourseAddExpansion';
// // import RecommendationDialog from '../../Recommendation/RecommendationDialog';
// // import classNames from 'classnames';
// import SimpleSnackbar from '../../Helpers/SimpleSnackbar';

// // axios.defaults.headers.common['Authorization'] = Auth().headers()['Authorization'];

// const styles = ({ spacing, palette}: Theme) => createStyles({
//     root: {
//         flexGrow: 1
//     },
//     progress: {
//         margin: spacing.unit * 2
//     },
//     card: {
//         // maxWidth: 800,
//         marginBottom: "40px"
//     },
//     media: {
//         height: 0,
//         paddingTop: '56.25%', // 16:9
//     },
//     actions: {
//         display: 'flex',
//     },
//     textField: {
//         marginLeft: spacing.unit,
//         marginRight: spacing.unit,
//         minWidth: 200,  
//     },
//     buttonSuccess: {
//         backgroundColor: green[500],
//         '&:hover': {
//           backgroundColor: green[700],
//         },
//     },
//     buttonError: {
//         backgroundColor: palette.error.dark,
//         // '&:hover': {
//         //   backgroundColor: red[222],
//         // },
//     },
//     wrapper: {
//         margin: spacing.unit,
//         position: 'relative',
//     },
//     buttonProgress: {
//         color: "",
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         marginTop: -12,
//         marginLeft: -12,
//     },
//     // expand: {
//     //   transform: 'rotate(0deg)',
//     //   transition: theme.transitions.create('transform', {
//     //     duration: theme.transitions.duration.shortest,
//     //   }),
//     //   marginLeft: 'auto',
//     // },
//     // expandOpen: {
//     //   transform: 'rotate(180deg)',
//     // },
//     avatar: {
//     //   backgroundColor: red[500],
//     }
// });

// const tabs = {
//     all: { id: 1, value: "all" },
//     computer_science: { id: 2, value: "computer_science" },
//     data_science: { id: 3, value: "data_science" }
// }

// // enum Tab {
// //     All = { id: 1, value: "all" },
// //     ComputerScience = { id: 2, value: "computer_science" },
// //     DataScience = { id: 3, value: "data_science" }
// // }

// interface IPropTypes {

// }

// interface IStateTypes {

// }

// class CourseComponent extends React.Component<IPropTypes, IStateTypes> {
//     constructor(props: IPropTypes) {
//         super(props);
//         // this.snackbar = React.createRef();

//         this.state = {
//             courses: [],
//             expanded: false,
//             loading: true,
//             recommendationsOpen: false,
//             tab: 1,
//             show: false
//         }        
//     }

//     componentDidMount() {
//         // const id = this.props.match.params.id;

//         // if(id) {
//         //     this.getCourse(id);
//         // } 
//         // else {
//         //     this.getCourses();
//         // }
//     }

//     getCourse(id) {
//             // const category = tabs[Object.keys(tabs).filter(key => tabs[key].id === this.state.tab)].value;
//         this.setState({ show: true }, _ => {
//             setTimeout(_ => {
//                 axios.get(`${process.env.REACT_APP_API_URL}/v1/courses/${id}`)
//                 .then(res => {
//                     const { course } = res.data;
    
//                     // console.log(course);
                    
//                     this.setState({ course, loading: false, show: true });
//                 });
//             }, 1000);
//         });

//     }

//     // getAllCourses() {
//     //     setTimeout(_ => {
//             // axios.get(`${process.env.REACT_APP_API_URL}/api/v1/courses`)
//     //         .then(res => {
//     //             const courses = JSON.parse(res.data.courses);
                
//     //             this.setState({ courses, loading: false });
//     //         });
//     //     }, 1000);
//     // }

//     handleCourseChange(event) {  
//         const target = event.target;
//         const value = target.value;
//         const name = target.name;

//         this.setState({[name]: value});
//     }

//     handleCourseAddSuccess() {
//         this.setState({ expanded: false, loading: true }, _ => this.getCourses());
//     }

//     handleCancel(e) {
//         this.setState({ expanded: false });
//     }

//     handleExpandClick(e) {
//         this.setState({ expanded: !this.state.expanded});
//     }

//     showSnackbar = (message, variant) => {
//         this.snackbar.handleClick(message, variant);
//         // this.setState({ snackbarClicked: true, message });
//     }
    
//     getCourses() {
//         const category = tabs[Object.keys(tabs).filter(key => tabs[key].id === this.state.tab)].value;

//         setTimeout(_ => {
//             axios.get(`${process.env.REACT_APP_API_URL}/api/v1/courses?category=${category}`)
//             .then(res => {
//                 const { courses } = res.data;
                
//                 this.setState({ courses, loading: false });
//             });
//         }, 1000);
//     }

//     handleTab = tab => _ => {
//         this.setState({ tab: tab.id, loading: true }, _ => this.getCourses());
//     } 

    

//     render() {
//         const { classes, } = this.props;
//         const isLoggedIn = Auth().isAuthenticated();
//         const current_user = isLoggedIn ? Auth().paraseJwt().sub.user : {};
//         const { loading, courses, show, course } = this.state;

        

//         if(show) {
//             return (
//                 <Grid container spacing={0} justify="center" style={{marginTop: "40px"}}>
//                 {loading ? <CircularProgress />
//                 :
//                     <Grid item xs={6}>
//                         <CourseCard key={course.id} showSnackbar={this.showSnackbar.bind(this)} current_user={current_user} course={course} />
//                     </Grid>
//                 }
//                 </Grid>
//             )
//         }

//         return (
//             <div className={classes.root}>
//                 <SimpleSnackbar onRef={ref => this.snackbar = ref} />
//                 <Grid container spacing={0} justify="space-between">
//                     <Grid item md={3}>
//                         <List component="nav" subheader={<ListSubheader component="div">Categories</ListSubheader>}>
//                             <Divider />
//                             <ListItem button onClick={this.handleTab(tabs.all).bind(this)}>
//                                 <ListItemText primary="All" />
//                             </ListItem>
//                             <ListItem button onClick={this.handleTab(tabs.computer_science).bind(this)}>
//                                 {/* <ListItemIcon>
//                                     <LibraryBooksIcon />
//                                 </ListItemIcon> */}
//                                 <ListItemText primary="Computer Science" />
//                             </ListItem>
//                             <ListItem button onClick={this.handleTab(tabs.data_science).bind(this)} >
//                                 {/* <ListItemIcon>
//                                     <LibraryBooksIcon />
//                                 </ListItemIcon> */}
//                                 <ListItemText primary="Data Science" />
//                             </ListItem>
//                         </List>
//                     </Grid>
//                     <Grid item xs={6}>
//                         <Grid container spacing={40}>
//                             <Grid item xs={12}>
                                
//                                 <Typography variant="display1" align="left" style={{marginTop: "50px"}} color="textSecondary">
//                                     Courses
//                                 </Typography>
//                                 <Typography variant="caption" align="left" style={{marginTop: "5px"}} color="textSecondary">
//                                     See what people are recommending.
//                                 </Typography>
//                                 <Fade in={!loading && !this.state.expanded}>
//                                     <Button onClick={this.handleExpandClick.bind(this)} disabled={this.state.expanded} color="primary" style={{float: "right"}}>Add A Course</Button>
//                                 </Fade>
//                             </Grid>
                            
//                                 <Grid item xs={12}>
//                                     <CourseAddExpansion handleCourseAddSuccess={this.handleCourseAddSuccess.bind(this)} showSnackbar={this.showSnackbar.bind(this)} handleCancel={this.handleCancel.bind(this)} classes={classes} expanded={this.state.expanded} />
//                                 </Grid>
//                         </Grid>
//                         {loading ?
//                                 <Grid container spacing={0} justify="center">
//                                     <CircularProgress />
//                                 </Grid>
//                             :
//                                 courses.map(course => {
//                                     return <CourseCard key={course.id} showSnackbar={this.showSnackbar.bind(this)} current_user={current_user} course={course} />;
//                                 })
//                         }
//                     </Grid>
//                     <Grid item xs={2} style={{width: "100%"}}>

//                         {/* <ExpansionPanel>
//                             <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
//                             <Typography className={classes.heading}>Top Authors</Typography>
//                             </ExpansionPanelSummary>
//                             <ExpansionPanelDetails>
//                             <Typography>
//                                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
//                                 sit amet blandit leo lobortis eget.
//                             </Typography>
//                             </ExpansionPanelDetails>
//                         </ExpansionPanel>
//                         <ExpansionPanel>
//                             <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
//                             <Typography className={classes.heading}>Top People</Typography>
//                             </ExpansionPanelSummary>
//                             <ExpansionPanelDetails>
//                             <Typography>
//                                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
//                                 sit amet blandit leo lobortis eget.
//                             </Typography>
//                             </ExpansionPanelDetails>
//                         </ExpansionPanel>
//                         <ExpansionPanel disabled>
//                             <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
//                             <Typography className={classes.heading}>Top Courses</Typography>
//                             </ExpansionPanelSummary>
//                         </ExpansionPanel> */}
//                     </Grid>
//                 </Grid>
//             </div>
//         );
//     }
// }

// export default withStyles(styles)(CourseComponent);