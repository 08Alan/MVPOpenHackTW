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
// import ReactPlayer from 'react-player';
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
        this.interval = setInterval(this.getImage(), 1000000);
    }

    componentWillMount() {

    }

    getImage() {
        // let pictures =
        //     fetch("http://172.19.1.24/cgi-bin/viewer/video.jpg?quality=5&streamid=0")
        //     .then((res) => {
        //         return res.json();
        //     })
        //     .then( data =>{
        //         let pictures = data.res.map((pic) =>{
        //             return(
        //                 <div key={pic.res}>
        //                     <img src={this.pic} />
        //                 </div>
        //             )
        //         })
        //     })
        // let test = fetch("http://172.19.1.24/cgi-bin/viewer/video.jpg?quality=5&streamid=0");
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
                // else{
                    throw new Error('qerqwhfqj[');
                // }
                // console.log("test:", response.blob());
                // return response;
                // console.log("test:", response.date);
                // return response;
                let base64Str = response.data;
                var imageBase64 = 'data:' + ';base64,' + base64Str;
                // Return base64 image
                // RESOLVE(imageBase64)
                console.log("imageBase64:", imageBase64);
                return (imageBase64)
            });
        this.setState({pictures: test.blob});
        // console.log("state:", this.state.pictures);
        console.log("test2:", test);
    }

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
                    {/*<Row>
                        <Col style={styles.columns}>
                            <ReactPlayer width="100%" height="100%" style={styles.players} url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
                        </Col>
                        <Col style={styles.columns}>
                            <textarea style={styles.textboxs}>
                            </textarea>
                        </Col>
                    </Row> */}
                    <Row>
                        {/*<Col style={styles.columns}>
                            http://ip位址/cgi-bin/viewer/video.jpg?quality=5&streamid=0 -> 拿到這時刻的截圖
                           <img width="100%" height="100%" src="http://172.19.1.24/cgi-bin/viewer/video.jpg?quality=5&streamid=0"></img> 
                        </Col>*/}
                        <Col style={styles.columns}>
                           <p>{this.state.pictures}</p>
                        </Col>
                        <Col style={styles.columns}>
                            <textarea style={styles.textboxs}>
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
