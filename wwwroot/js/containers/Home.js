import React, {Component} from 'react';
import {deepOrange500, blue500, blueGrey400, cyan600, grey50} from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    Button,
    Grid, 
    Row,
    Col,
} from 'react-bootstrap';
// import {Grid, Row, Col} from 'react-flexbox-grid';
import {
    AppBar,
    Drawer,
    IconButton,
    IconMenu,
    Dialog,
    List,
    ListItem,
    MenuItem,
    FlatButton, 
    FontIcon, 
    RaisedButton,
    SelectField,
    TextField,
} from 'material-ui';
import {AccessAlarm, Icons, ThreeDRotation} from 'material-ui-icons';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import AutoComplete from 'material-ui/AutoComplete';
import Menu from '../components/Menu';

const styles = {
    container: {
        textAlign: 'center',
        width: '80%',
        margin: 'auto',
        backgroundColor: blue500
    }, 
    existDownLoadButtonObject:{
        marginTop: '20px',
        marginBottom: "20px",
        width: "300px",
        height: "60px",
    },
    existDownLoadButtonLabel:{
        fontSize: "25px",
        margin: "auto",
        textAlign: "center"
    },
    existModelField:{
        width: '80%',
        margin: 'auto',
    },
    existModelbottom:{
        backgroundColor: blueGrey400
    },
    releasedNote:{
        width: "200px",
    }
};

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500
    }
});

let showGetError = (e) => {
    console.log("Fetch failed!", e);
};

class Main extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            logged: true,
            drewOpen: false,
            searchable: true,
            color: "red", 
            maxdropdownheight: 300,
            openDialog: false,
        };
        this.toogleDrawer = this
            .toogleDrawer
            .bind(this);
        this.handleChange = this
            .handleChange
            .bind(this);
        
    }

    componentWillMount() {

    }

    toogleDrawer() {
        this.setState({
            drewOpen: !this.state.drewOpen
        });
    }
    handleChange(event, logged) {
        this.setState({logged: logged});
    }
    
    clickHandler(e){
        alert('the button was clicked');
    }
    handlerVersionChange(e){
        this.setState({convertNewVersion:e.currentTarget.value});
    }
    onMouseOverHandler(e){
        this.setState({color:"blue"});
    }
    onMouseOutHandler(e){
        this.setState({color:"red"});
    }
    handleSubmit(e){
        e.preventDefault();
        alert("表單送出");
        alert(
            "New Version:" + this.state.convertNewVersion 
        +   "Select Model:" +this.state.queryTargetModel
        );
        console.log("New Version:" + this.state.convertNewVersion);
    }
    test(e){
        // e.preventDefault();
        this.setState({
            autoCompletSearchText: e
        });
    }
    
    render() {
        const title = 'MVP Hack';
        return (
            <div>
                <AppBar
                    title={title}
                    style={styles.container}
                    onLeftIconButtonTouchTap={this.toogleDrawer}
                    iconElementRight=
                    {<Menu logged={this.state.logged
            } />}/>
                <Drawer
                    docked={false}
                    open={this.state.drewOpen}
                    onRequestChange={() => this.toogleDrawer()}>
                    <MenuItem>Home</MenuItem>
                    <MenuItem>New Model Spec</MenuItem>
                </Drawer>
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>    
                    <Main/>
                </div>
            </MuiThemeProvider>
        );
    }
}
export default App;