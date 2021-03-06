import * as React from 'react';
import { Grid, List, ListItem, ListItemText, Divider, ListSubheader, Typography, withStyles,Theme, createStyles, Fade, Button } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import CourseAddExpansion from './CourseAddExpansion';
import { IAddCourseForm, CourseService, ICourse, Category } from '../Services/CourseService';
import CourseCard from './CourseCard';
import { ICurrentUser } from '../Services/UserService';
import AppSnackbar, { Variant } from '../Helpers/AppSnackbar';

const styles = ({ spacing, palette}: Theme) => createStyles({
    root: {
        flexGrow: 1
    },
    progress: {
        margin: spacing.unit * 2
    },
    card: {
        marginBottom: "40px"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    textField: {
        marginLeft: spacing.unit,
        marginRight: spacing.unit,
        minWidth: 200,  
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        }
    },
    buttonError: {
        backgroundColor: palette.error.dark
    },
    wrapper: {
        margin: spacing.unit,
        position: 'relative',
    },
    buttonProgress: {
        color: "",
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    avatar: {

    }
});

interface IPropTypes {
    getCurrentUser: () => ICurrentUser | null,
    classes: {
        root: string
    }
}

interface IStateTypes {
    category: Category,
    expanded: boolean,
    loading: boolean,
    courses: ICourse[]
}

class CourseComponent extends React.Component<IPropTypes, IStateTypes> {

    private courseService: CourseService;
    private showSnackbar: (message: string, variant: string) => void;

    constructor(props: IPropTypes) {
        super(props);

        this.state = {
            courses: [],
            expanded: false,
            loading: false,
            category: Category.All
        }

        this.courseService = new CourseService();
    }

    componentDidMount() {
        this.getCourses(Category.All, () => {});
    }

    setShowSnackbar(openSnackbar: (message: string, variant: string) => void) {
        this.showSnackbar = openSnackbar;
    }

    getCourses(category: Category, onSuccess: () => void) {
        this.courseService.getByCategory(category, (courses: ICourse[]) => {
            this.setState({
                courses
            }, onSuccess);
        }, (err) => {
            this.showSnackbar("Something went wrong", Variant.Warning);
        });
    }



    addCourse(form: IAddCourseForm, onSuccess: () => void, onError: () => void) {
        this.courseService.addCourse(form, (res) => {
            this.setState({ expanded: false}, () => this.getCourses(this.state.category, () => {
                onSuccess();
            }));
        }, (err) => {
            onError();
        });
    }



    closeAddExpand() {
        this.setState({ expanded: false });
    }

    handleExpandClick() {
        this.setState({ expanded: !this.state.expanded });
    }

    handleTabClick(newCategory: Category) {
        this.setState({ category: newCategory }, () => this.getCourses(newCategory, () => {}));
    }

    render() {
        const { classes } = this.props;

        const { loading, expanded, courses } = this.state;

        return (
            <div className={classes.root}>
                <AppSnackbar setOpenSnackbar={this.setShowSnackbar.bind(this)} />
                <Grid container spacing={0} justify="space-between">
                    <Grid item md={3}>
                        <List component="nav" subheader={<ListSubheader component="div">Categories</ListSubheader>}>
                            <Divider />
                            <ListItem button onClick={() => this.handleTabClick(Category.All)}>
                                <ListItemText primary="All" />
                            </ListItem>
                            <ListItem button onClick={() => this.handleTabClick(Category.ComputerScience)}>
                                {/* <ListItemIcon>
                                    <LibraryBooksIcon />
                                </ListItemIcon> */}
                                <ListItemText primary="Computer Science" />
                            </ListItem>
                            <ListItem button onClick={() => this.handleTabClick(Category.DataScience)} >
                                {/* <ListItemIcon>
                                    <LibraryBooksIcon />
                                </ListItemIcon> */}
                                <ListItemText primary="Data Science" />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={40}>
                            <Grid item xs={12}>
                                
                                <Typography variant="display1" align="left" style={{marginTop: "50px"}} color="textSecondary">
                                    Courses
                                </Typography>
                                <Typography variant="caption" align="left" style={{marginTop: "5px"}} color="textSecondary">
                                    See what people are recommending.
                                </Typography>
                                <Fade in={!loading && !expanded}>
                                    <Button onClick={() => this.handleExpandClick()} disabled={expanded} color="primary" style={{float: "right"}}>Add A Course</Button>
                                </Fade>
                            </Grid>
                                <Grid item xs={12}>
                                    <CourseAddExpansion 
                                        addCourse={(form: IAddCourseForm, onSuccess: () => void, onError: () => void) => this.addCourse(form, onSuccess, onError)} 
                                        close={() => this.closeAddExpand()}
                                        showSnackbar={this.showSnackbar}
                                        expanded={expanded}
                                    />
                                </Grid>
                        </Grid>
                            {
                                courses.map((course: ICourse) => {
                                    return (
                                        <CourseCard 
                                            key={course.id}
                                            currentUser={this.props.getCurrentUser()}
                                            course={course} 
                                            showSnackbar={this.showSnackbar.bind(this)}
                                            // recommendCourse={(courseId: number, onSuccess: () => void, onError: () => void) => this.recommendCourse(courseId, onSuccess, onError)}
                                            // unrecommendCourse={(courseId: number, onSuccess: () => void, onError: () => void) => this.unrecommendCourse(courseId, onSuccess, onError)}
                                            // updateCourse={(form: IEditCourseForm, onSuccess: () => void, onError: () => void) => this.updateCourse(form, onSuccess, onError)} 
                                            // deleteCourse={(courseId: number, onSuccess: () => void, onError: () => void) => this.deleteCourse(courseId, onSuccess, onError)}
                                            // deleteImage={(courseId: number, onSuccess: () => void, onError: () => void) => this.deleteImage(courseId, onSuccess, onError)}
                                            // getCourse={(courseId: number, onSuccess: (course: ICourse) => void, onError: () => void) => this.getCourse(courseId, onSuccess, onError)}
                                        />
                                    );
                                })
                            }
                    </Grid>
                    <Grid item xs={2} style={{width: "100%"}}>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(CourseComponent);