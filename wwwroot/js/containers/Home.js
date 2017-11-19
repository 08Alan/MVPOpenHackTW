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
import Menu from '../components/Menu';

const styles = {
    container: {
        width: '100%',
        margin: 'auto',
        backgroundColor: blue500
    }, 
    table:{
        width: '100%',
        margin: 'auto',
    },
    columns:{
        display:'inline-block',
        margin: 'auto',
        width:'40%',
        height:'50vh'
    },
    rows:{
        width:'80%',
        padding: '15px'
    },
    players:{
        display:'inline-block',
    },
    textboxs:{
        marginTop:'0px',
        maxWidth:'100%',
        width:'100%',
        height:'100%'
    },
    wrapper:{
        width:'100%',
        height:'100%',
        display: 'talbe'
    },
    wrapperJsonOutput:{
        overflow: 'scroll',
        resize: 'none',
        width:'100%',
        height:'100%',
        display:'talbe'
    },
    sampleInput:{
        type:"text",
        width:'300px',
    },


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
            pictures:[],
            // imageUrl:["http://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg"]
            imageUrl:["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511029930205&di=380754d4806aa47018aa80d8dea477bd&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fa5c27d1ed21b0ef4cee1584dd7c451da81cb3e9c.jpg"],
            responseJson:[]
        };
        this.toogleDrawer = this
            .toogleDrawer
            .bind(this);
        this.handleChange = this
            .handleChange
            .bind(this);
        
    }
    componentDidMount() {
        // this.interval = setInterval(this.getImage(), 1000000);
        // this.interval = setInterval(this.processImage(), 100000);
        // this.interval = setInterval(this.setState({imageUrl: []}), 100);
    }

    componentWillMount() {

    }

    processImage() {
        let subscriptionKey = "102740de8d4647d39c488e424657b9c2";
        let uriBase = "https://eastasia.api.cognitive.microsoft.com/vision/v1.0/analyze";

        // Request parameters.
        let params = {
            "visualFeatures": "Categories,Description,Color",
            "details": "",
            "language": "en",
        };

        // Display the image.
        let sourceImageUrl = this.state.imageUrl;
        document.querySelector("#sourceImage").src = sourceImageUrl;

        // Perform the REST API call.
        $.ajax({
            url: uriBase + "?" + $.param(params),

            // Request headers.
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },
            type: "POST",
            // Request body.
            data: '{"url": ' + '"' + sourceImageUrl + '"}',
        })

        .done( (data) => {
            // Show formatted JSON on webpage.
            this.setState({responseJson:JSON.stringify(data, null, 2)})
        })

        .fail( (jqXHR, textStatus, errorThrown) => {
            // Display error message.
            let errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
            alert(errorString);
        });
    };

    toogleDrawer() {
        this.setState({
            drewOpen: !this.state.drewOpen
        });
    }
    handleChange(event, logged) {
        this.setState({logged: logged});
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
                <h1>Analyze image:</h1>
                Enter the URL to an image of a natural or artificial landmark, then click the <strong>Analyze image</strong> button.
                <br/><br/>
                Image to analyze: 
                <input 
                    name = "inputImage"
                    id = "inputImage"
                    value = {this.state.imageUrl}
                    style={styles.sampleInput}
                />
                <Button onClick={this.processImage.bind(this)}>
                    Analyze image
                </Button>
                <Grid style={styles.table}>
                    <Row>
                        <Col style={styles.columns}>
                            Source image:
                            <img style={styles.wrapper} id="sourceImage" />
                        </Col>
                        <Col style={styles.columns}>
                            Response:
                            <textarea 
                                id="responseTextArea" 
                                style={styles.wrapperJsonOutput}
                                value = {this.state.responseJson}
                            >
                            </textarea>
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
