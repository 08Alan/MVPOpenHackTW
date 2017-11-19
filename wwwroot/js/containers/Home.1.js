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
        width: '1020 px',
        display: 'table'
    },
    wrapperJsonOutput:{
        width:'600px',
        display:'talbe-cell'
    },
    wrapperTextarea:{
        width:'580px',
        height:'400px'
    },
    wrapperImage:{
        width:'420px',
        display:'talbe-cell'
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
    }

    componentWillMount() {

    }

    getImage() {
        let myh = new Headers(
            {
                "Content-Type": "image/jpeg",
            }
        );
        let getCameraPara = {
            method: "Get",
            mode: 'no-cors',
            headers: myh,
            // type: "image/jpeg"
        }
        // mode: 'no-cors',才不會有跨網域的問題
        let test = 
            fetch("http://172.19.1.70/cgi-bin/viewer/video.jpg?quality=5&streamid=0", getCameraPara)
            .then((response) => {
                if(response.ok)
                {
                    console.log("test:", response.blob());
                    return response;
                }
                    throw new Error('qerqwhfqj[');
                let base64Str = response.data;
                var imageBase64 = 'data:' + ';base64,' + base64Str;
                console.log("imageBase64:", imageBase64);
                return (imageBase64)
            });
        this.setState({pictures: test.blob});
        console.log("test2:", test);
    }
    processImage() {
        // **********************************************
        // *** Update or verify the following values. ***
        // **********************************************

        // Replace the subscriptionKey string value with your valid subscription key.
        var subscriptionKey = "102740de8d4647d39c488e424657b9c2";

        // Replace or verify the region.
        //
        // You must use the same region in your REST API call as you used to obtain your subscription keys.
        // For example, if you obtained your subscription keys from the westus region, replace
        // "westcentralus" in the URI below with "westus".
        //
        // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
        // a free trial subscription key, you should not need to change this region.
        var uriBase = "https://eastasia.api.cognitive.microsoft.com/vision/v1.0/analyze";

        // Request parameters.
        var params = {
            "visualFeatures": "Categories,Description,Color",
            "details": "",
            "language": "en",
        };

        // Display the image.
        var sourceImageUrl = document.getElementById("inputImage").value;
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

            .done(function (data) {
                // Show formatted JSON on webpage.
                $("#responseTextArea").val(JSON.stringify(data, null, 2));
            })

            .fail(function (jqXHR, textStatus, errorThrown) {
                // Display error message.
                var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
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
                <Grid style={styles.table}>
                    <Row>
                        <Col style={styles.columns}>
                        </Col>
                        <Col style={styles.columns}>
                            <textarea style={styles.textboxs}>
                            </textarea>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={styles.columns}>
                            http://ip位址/cgi-bin/viewer/video.jpg?quality=5&streamid=0 -> 拿到這時刻的截圖
                           <img width="100%" height="100%" src="http://172.19.1.24/cgi-bin/viewer/video.jpg?quality=5&streamid=0"></img> 
                        </Col>
                        <Col style={styles.columns}>
                           <p>{this.state.pictures}</p>
                        </Col>
                        <Col style={styles.columns}>
                            <textarea style={styles.textboxs}>
                            </textarea>
                        </Col>
                    </Row>
                </Grid>
                <h1>Analyze image:</h1>
                Enter the URL to an image of a natural or artificial landmark, then click the <strong>Analyze image</strong> button.
                <br/><br/>
                Image to analyze: 
                <input type="text" name="inputImage" id="inputImage" value="http://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg" />
                <button onClick={this.processImage.bind(this)}>
                    Analyze image
                </button>
                <div id="wrapper" style={styles.wrapper}>
                    <div id="jsonOutput" style={styles.wrapperJsonOutput}>
                        Response:
                        <br></br>
                        <textarea id="responseTextArea" className="UIInput" style={styles.wrapperTextarea}></textarea>
                    </div>
                    <div id="imageDiv" style={styles.wrapperImage}>
                        Source image:
                        <img id="sourceImage" width="400" />
                    </div>
                </div>
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
