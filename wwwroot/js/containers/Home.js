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
import ReactPlayer from 'react-player';
import Menu from '../components/Menu';

const styles = {
    container: {
        textAlign: 'center',
        width: '80%',
        margin: 'auto',
        backgroundColor: blue500
    }, 
    table:{
        textAlign: 'center',
        width: '80%',
        margin: 'auto',
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
                <Grid
                    style={styles.table}
                >
                    <Row className="show-grid">
                        <Col >
                            <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
                        </Col>
                        <Col >
                            hali
                        </Col>
                   </Row> 
                </Grid>
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