import './Dashboard.css';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import { IoDocumentTextOutline } from "react-icons/io5";

import {FileUpload} from 'primereact/fileupload';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useEffect, useRef, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import {Account, Client, Databases, Query} from "appwrite";
import SearchBar from "material-ui-search-bar";
import { Alert, FilledInput, FormControl, Icon, Input, InputAdornment, InputLabel, OutlinedInput, useColorScheme } from '@mui/material';
import { FaPenAlt, FaBrain, FaSyncAlt, FaFileUpload, FaPlusCircle, FaBullseye, FaSearch } from "react-icons/fa";
import { BsFileEarmark } from "react-icons/bs";
import { FaFileCirclePlus,FaCircleXmark, FaRegTrashCan,FaEnvelope, FaRegPenToSquare, FaEye, FaEyeSlash } from "react-icons/fa6";
import { CgAddR } from "react-icons/cg";
import { FourSquare, ThreeDot, Riple } from 'react-loading-indicators';
import { AiFillPropertySafety } from 'react-icons/ai';


import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


import Typography from '@mui/material/Typography';


const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1');
client.setProject('6707c9b1002c4266ae26');

const db_id = "6707cc54000e514fe590";
const notes_collection_id = "6707cc68002450dcb6f9";
const active_databases = new Databases(client);
const account = new Account(client);
let current_user = null;
let all_user_notes = [];
/*
try{
    current_user = await account.get();
}
catch(exp){
    console.log("User Not Loged In");
}
console.log(current_user);
*/
function SideBar(props){
    

    
    const notes_list = useRef();
    //const [all_notes,add_note] = useState([<ListItem>Heimball</ListItem>]);
    const addNote = ()=>{
        //notes_list.current.innerHTML += <ListItem>Hello</ListItem>;
        props.add_note_fx([props.all_notes,<ListItem>Heim</ListItem>]);
    };

    //<div className='refresh_icon'><IconButton sx={{bgcolor: 'gray'}} onClick={addNote}><FaSyncAlt  color='white'/></IconButton></div>
    return(
        <div className="sidebar_body">
            <div className="sidebar_header">
               <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'center'}}>All Notes 
                    
               </Stack>
            
                <List ref={notes_list} sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent', scrollBehavior: 'smooth' }}>
                    {props.all_notes}
                </List>
            </div>
        </div>
    );
}

function ShareSideBar(props){
    

    const [share_groups,addShareGroup] = useState([]);
    const notes_list = useRef();
    //const [all_notes,add_note] = useState([<ListItem>Heimball</ListItem>]);
    const addNote = ()=>{
        //notes_list.current.innerHTML += <ListItem>Hello</ListItem>;
        props.add_note_fx([props.all_notes,<ListItem>Heim</ListItem>]);
    };

    const addGroup = ()=>{

    }
    //<div className='refresh_icon'><IconButton sx={{bgcolor: 'gray'}} onClick={addNote}><FaSyncAlt  color='white'/></IconButton></div>
    return(
        <div className="share_sidebar_body">
            <div className="share_sidebar_header">
               <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'center'}}>
                    Share Groups
               </Stack>
               <IconButton  type="button" sx={{ p: '10px' , color:'white'}} onClick={addGroup} width='80%' aria-label="search">
                    <CgAddR />
                </IconButton>
                
                <List ref={notes_list} sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent', scrollBehavior: 'smooth' }}>
                   {share_groups}
                </List>
            </div>
        </div>
    );
}

function SideNote(props){
    
    const note_object = props.children;
    
    const active_id = note_object.$id;

    const [note_deleted,setNoteStatus] = useState(false);
    console.log(active_id);
    const deleteNote = ()=>{
        const user_notes_promise = active_databases.deleteDocument(db_id,notes_collection_id, active_id);

    user_notes_promise.then(
        function (response){
           ///console.log(props.all_notes);
           /*const ur_notes = props.all_notes.filter((a_note)=>
                    a_note.active_id != active_id
                );
                //ur_notes.push(<div className='active_note'>{item.note_text}</div>);
                //console.log("item: ");
            console.log(ur_notes);
            */
        
            /*
            for(const document of response.documents){
                console.log(document);
                //ur_notes.push(document.note_text);
            }
            */

            //props.add_note_fx([,ur_notes]);
            //setLoader(false);
            setNoteStatus(true);
            
        },
        function (error){
            console.log(error);
        }
    );
    }

    if(note_deleted==false){
    
    return(
        <ListItem ref={this} 
             
            className="note_item" 
            sx={{bgcolor: "rgb(60, 59, 59)",marginTop: '5px'}}>
                <button className='note_side_view' onClick={()=>props.show_active_note_fx(<div className='active_note'>{note_object.note_text}</div>)}>
                    {note_object.note_text}
                </button>
            <div style={{marginRight: '10px'}}>
                <FaRegPenToSquare/>
            </div>
            
            <FaRegTrashCan onClick={deleteNote}/>
        </ListItem>
    );
    }
    else{
        return(<div hidden></div>);
    }
}

function UploadSummary(props){
    const upload_file = props.upload;

    const file_name = upload_file.name;
    const file_size = upload_file.size;


    return(

        <div className='upload_summary'>
            <IoDocumentTextOutline size={30}/><br/>
            {file_name}
        </div>
        
    )



}

function MainFooter(props){
    //<FileUpload className='file_upload' mode="basic" name="demo[]" url="/api/upload" accept="*/*" maxFileSize={1000000} />
    //<textarea className="new_note_textarea"></textarea>
    const inputFile = useRef(null);
    const [all_files, addFile] = useState([]);
    const upload_list = useRef(null);
    const [note_text, setNote] = useState("");
    const [adding_note, addNoteStatus] = useState(false);

    const show = (note_text)=>{
        //alert("hello");
        props.show_active_note_fx(<div className='active_note'>note_text</div>);
    }

    const getFile = ()=>{
        inputFile.current.click();
        
    }

    const getText = ()=>{
            addNoteStatus(true);
            //alert(note_text);
            /*props.add_note_fx([...props.all_notes,<ListItem ref={this} onClick={()=>props.show_active_note_fx(<div className='active_note'>{note_text}</div>)} className="note_item" sx={{bgcolor: "rgb(60, 59, 59)",marginTop: '5px'}}><div className='note_side_view'>{note_text}</div></ListItem>]);*/
            (async ()=>{
                const saved_note = active_databases.createDocument(db_id,notes_collection_id,'unique()',{
                    "note_text":note_text,
                    "has_attachments":false
                });

                saved_note.then(function (response){
                    console.log(response);
                    props.add_note_fx([<SideNote  {...props}>{response}</SideNote>,...props.all_notes,]);
                    addNoteStatus(false);
                }, function (error){
                    addNoteStatus(false);
                    console.log(error);
                });
            })();
            
    }
    /*
    <Stack direction="row">
                    <item><TextField value={note_text}  sx={{bgcolor: 'rgb(40, 33, 33)', width: '300px'}} 
                            id="filled" multiline maxRows={10} 
                            onChange={(e) => {
                                setNote(e.target.value);
                            }}
                            label="Write Your Note Here" variant="standard" 
                            inputProps={{style: {fontSize: 12,color:'white', padding: '5px', height: '80px',fontFamily: 'monospace', fontStyle: 'monospace'}}} // font size of input text
                            InputLabelProps={{style: {fontSize:15,color:'white', fontFamily: 'monospace'}}} />
                    </item>
                    <item><Button sx={{bgcolor: 'blue', fontWeight: 'bolder'}} startIcon={<FaPenAlt/>} className="add_note_btn" onClick={getText} variant="contained"></Button></item>
                </Stack>
                <!--item><input type="file"></input></item>
    */
    
    var readFile = (e)=>{
            const uploaded_files = e.target.files;

            for(const uploaded_file of uploaded_files){
               // alert("uploaded: "+uploaded_file.name);
                addFile([...all_files,uploaded_file]);
            }
            
    }
    return(
        <div className="main_footer">
            
            
            <Stack useFlexGap className="btn_stack" sx={{justifyContent: "center",alignItems: "center", flex_wrap: 'wrap'}}>
                
                    <div className='upload_btn'>
                        <Stack useFlexGap ref={upload_list} className="item_stack" sx={{justifyContent: "center",display:'flex',flexDirection:'row',alignItems: "center", flex_wrap: 'wrap', direction: 'row'}}>
                            {all_files.map((item_file, index) =>(
                                <div className='upload_item_div'>
                                    <UploadSummary upload={item_file}/>
                                </div>
                            ))}
                           
                        </Stack>
                        <IconButton  type="button" sx={{ p: '10px' , color:'white'}} onClick={getFile} width='80%' aria-label="search">
                            
                            <FaFileCirclePlus/>
                            <input type='file' id='file' ref={inputFile} onChange={readFile} style={{display: 'none'}} multiple/>
                        </IconButton>
                        
                    </div>
                    <div className="note_input_holder">
                        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
                            <InputBase value={note_text} onChange={(e) => {
                                setNote(e.target.value);
                            }} multiline='true' maxRows={5} sx={{ ml: 1, flex: 1, fontFamily: 'monospace', fontSize: 12, fontWeight: 'bolder' }} placeholder="Write Your Note here" inputProps={{ 'aria-label': 'Write Note', fontWeight: 'bolder' }}/>
                            <IconButton type="button" sx={{ p: '10px' , color:'black'}} onClick={getText} aria-label="search">
                                {
                                    
                                    (()=>{
                                            if(adding_note==false){
                                                return (<FaPenAlt className="pen_icon"/>);
                                            }
                                            else{
                                                return(<FaPenAlt className="pen_loading"/>);
                                            }
                                        }
                                    )()
                                }
                                
                            </IconButton>
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        </Paper>
                    </div>
                    
                    
            </Stack>
        </div>
    );
}

function NoteSearchBar(props){
    const notes_view = useRef();
    const [state,setState] = useState();
    const [loading_anim, setLoading] = useState(false);
    // <Stack direction='row'>
    //onRequestSearch={() => }
    const findNote = (note)=>{
        //Query.
        setLoading(true);
        searchNote(state,props.show_active_note_fx,setLoading);
        //setLoading(false);
    }
    return(
        <div className="notesearch_body">
            <div className="notesearch_header">
               
                <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '50%' }}>
                    <div className='search_notes'>
                        <SearchBar placeholder='Find A Note' value={state} onChange={(newValue) => setState(newValue)}  sx={{fontSize: '5px',bgcolor: 'black',width:'100%'}} inputProps={{style: {fontSize: 12,color:'black',fontFamily: 'monospace', fontStyle: 'monospace'}}}/>
                    </div>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    
                    <IconButton sx={{bgcolor:'white', color: 'black'}} onClick={findNote}>
                        {
                            (()=>{
                                if(loading_anim==false){
                                    return(<FaSearch className="pen_loading"/>);
                                }
                                else{
                                    return(<FaSearch className="brain_loading"/>);
                                }
                            })()
                        }
                        
                    </IconButton>
               </Paper>
            </div>
            <div className="active_note_holder">
                {props.active_note}
            </div>
            <MainFooter  active_note={props.active_note} show_active_note_fx={props.show_active_note_fx} add_note_fx={props.add_note_fx} all_notes={props.all_notes}/>
        </div>
    );
}

async function login(loadingSetter){
    try{
        current_user = await account.get();
        loadingSetter(true);

    }
    catch(exp){
        console.log("user error");
        loadingSetter(true);
    }
}



function AddTeamPage(){

    const [user_email, setEmail] = useState("");
    const [user_password, setPassword] = useState("");
    const [reg_state,setRegState] = useState(false);
    const [reg_status,setRegStatus] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const makeAccount = ()=>{
       setRegState(true);
       const login_promise = account.create('unique()',user_email,user_password);
       
       login_promise.then(function (response) {
        current_user = response;
        window.localStorage.setItem("session",current_user);
        
        console.log(response); // Success
        setRegStatus("Account Created, Continue to login");
        setRegState(false);
    }, function (error) {
        console.log("Error is: "+error); // Failure
        setRegStatus(error.message);
        setRegState(false);
    });
    
    }
    
    return(
        <div className="registration_div">
                
                
                    <div className="login_div_header" sx={{fontFamily: 'monospace', fontSize: 12}}> Don't have an account,<br/> please create one below </div>
                    <div className="registration_div_inputs">
                        <div className="registration_body">
                            <InputLabel htmlFor="outlined-email" sx={{color:'white',fontFamily: 'monospace', fontSize: 12, fontWeight: 'bolder'}}>
                                Team Name
                            </InputLabel>
                            <OutlinedInput id='outlined-email' value={user_email} variant="filled" label="Email" onChange={(e) => {
                                setEmail(e.target.value);
                            }} multiline={false} maxRows={1} sx={{backgroundColor:'white', width:250, ml: 5, flex: 'flex-grow', fontFamily: 'monospace', fontSize: 12, fontWeight: 'bolder' }} placeholder="Team Name here"/>
                            <br/>
                        
                            <InputLabel htmlFor="outlined-password" sx={{color:'white',fontFamily: 'monospace', fontSize: 12, fontWeight: 'bolder'}}>
                                USER EMAIL
                            </InputLabel>
                            <OutlinedInput id="outlined-password" value={user_password} height='20px' label="User Email" 
                                endAdornment={
                                    <InputAdornment position="end">
                                      <FaEnvelope />
                                    </InputAdornment>
                                  }
                                onChange={(e) => {
                                setPassword(e.target.value);
                            }} multiline={false} maxRows={1} sx={{backgroundColor:'white',width:250, ml: 5, flex: 'flex-grow', fontFamily: 'monospace', fontSize: 12, fontWeight: 'bolder' }} placeholder="Email here"/>
                            <br/>
                            <div className="reg_status">{reg_status}</div>
                            <Button sx={{bgcolor: 'darkblue', ml: 5,height:'55px', fontWeight: 'bolder'}} 
                                startIcon={(reg_state===false)? <FaPenAlt />:<FaPenAlt className='pen_loading'/>}
                                onClick={makeAccount} 
                                className="add_note_btn" 
                                variant="contained">
                                    ADD USER
                            </Button>
                        </div>
                        
                    </div>
                    
                    
                    
                
                
            </div>
    );
}



function CollectionDialog(){

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                 Add Team
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle sx={{ m: 0, p: 2, backgroundColor:'darkblue',color:'white' }} id="customized-dialog-title">Add Team</DialogTitle>
            <IconButton aria-label="close" onClick={handleClose}
                sx={(theme) => ({
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: theme.palette.grey[500],
                                })}>
          <FaCircleXmark />
        </IconButton>
        <DialogContent className='team_dialog' dividers>
          <AddTeamPage/>
        </DialogContent>
        <DialogActions sx={{ m: 0, p: 2, backgroundColor:'darkblue',color:'white' }}>
          <Button sx={{ backgroundColor:'black',color:'white' }} autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function Dashboard(){
    
    const [finished_loading,setAuthLoading] = useState(false);

    const logout = ()=>{
        const logout_session = account.deleteSessions();
        console.log("loging out");
        logout_session.then(function (response){
            console.log(response);
            window.location.reload();
        },function (error){
            console.log(error);
            window.location.reload();
        });
    }

    useEffect(()=>{
        login(setAuthLoading);
        
    },[]);
    
    if((current_user!=null)&&(finished_loading==true))
    {
    
        return(
        <div className="dashboard_body">
            <div className = "dashboard_header">
                <div className="dashboard_header_text">
                    Super Notes <FaBrain/>
                </div>
                <div className="main_top_logo">
                     <FaBrain/>
                </div>
                <div className="main_logout_btn">
                    <CollectionDialog/>
                    <Button sx={{bgcolor: 'darkblue', ml: 5, fontWeight: 'bolder'}} onClick={logout} className="add_note_btn" variant="contained">
                        LOGOUT
                    </Button>
                </div>
                <div className="dashboard_tagline_text">Keeping your ideas together</div>
            </div>
            <NotesDashboardPage/>
        </div>
        );
    }
    else if((current_user==null)&&(finished_loading==true)){
        return(
            <div className="dashboard_body">
                <div className="dashboard_header_text">
                    Super Notes
                </div>
                <OnboardingPage/>
            </div>
        );
    }
    else{

        return(
            <div className="dashboard_body">
                <div className="loading_anim">
                    <FourSquare color="white"/>
                </div>
            </div>
        );

    }
    
    

    
}

class Note{
    constructor(note_txt){
        this.note_text = note_txt;
    }
}


function searchNote(search_query,activeNoteSetter,setLoader){
    const search_terms = search_query.split(" ");
    console.log(search_terms);
    const user_notes_promise = active_databases.listDocuments(db_id,notes_collection_id, [Query.contains("note_text",search_terms)]);

    user_notes_promise.then(
        function (response){
            
            let ur_notes = [];
            response.documents.map((item,index)=>{
                console.log(item)
                ur_notes.push(<div className='active_note'>{item.note_text}</div>);
                //console.log("item: ");
                //console.log(item);
            });
            /*
            for(const document of response.documents){
                console.log(document);
                //ur_notes.push(document.note_text);
            }
            */

            activeNoteSetter([,ur_notes]);
            setLoader(false);
            
        },
        function (error){
            console.log(error);
        }
    );
}

function getAllNotes(recent_notes,noteAdder,active_note,activeNoteSetter){
    const user_notes_promise = active_databases.listDocuments(db_id,notes_collection_id);

    user_notes_promise.then(
        function (response){
            
            let ur_notes = [];
            response.documents.map((item,index)=>{
                
                ur_notes.push(<SideNote add_note_fx={noteAdder} all_notes={recent_notes} note_index={index} show_active_note_fx={activeNoteSetter}>{item}</SideNote>)
                //console.log("item: ");
                //console.log(item);
            });
            /*
            for(const document of response.documents){
                console.log(document);
                //ur_notes.push(document.note_text);
            }
            */

            noteAdder([...recent_notes,ur_notes]);
            
        },
        function (error){

        }
    );
}

function NotesDashboardPage(){

    const [all_notes,add_note] = useState(all_user_notes);
    const [active_note,setActiveNote] = useState([]);

    useEffect(()=>{
        getAllNotes(all_notes,add_note,active_note,setActiveNote);
    },[]);
    
    return(
        <div className = "supernotes_main">
                <SideBar  active_note={active_note} show_active_note_fx={setActiveNote} add_note_fx={add_note} all_notes={all_notes}/>
                <NoteSearchBar active_note={active_note} show_active_note_fx={setActiveNote} add_note_fx={add_note} all_notes={all_notes}/>
                <ShareSideBar/>
        </div>
    );
}

function loadingPage(){

}

function OnboardingPage(){

    return(
        <div className="onboarding_body">
                <div className="onboarding_items">
                    
                    <LoginPage/>
                    <Divider sx={{ height: 1, m: 0.5, backgroundColor:"white" }} orientation="horizontal"/>
                    <RegistrationPage/>
                    
                </div>
                
        </div>
    );
}
//identify a nlp problem, algorithm, how to apply it, dataset

function LoginPage(){
    const [showPassword, setShowPassword] = useState(false);
    const [user_email, setEmail] = useState("");
    const [user_password, setPassword] = useState("");

    const [login_loading,setLoginLoading] = useState(false);
    const login = ()=>{
        setLoginLoading(true);
       const login_promise = account.createEmailPasswordSession(user_email,user_password);
       
       login_promise.then(function (response) {
        current_user = response;
        window.localStorage.setItem("session",current_user);
        window.location.reload();
        console.log(response); // Success
        setLoginLoading(false);
    }, function (error) {
        console.log("Error is: "+error); // Failure
        setLoginLoading(false);
    });
    
    }
    return(
            <div className="login_div">
                
                <div className="login_input">
                    <div className="login_div_header"> PLEASE LOGIN BELOW </div><br/>
                        <OutlinedInput value={user_email} variant="filled" label="Email" onChange={(e) => {
                                setEmail(e.target.value);
                            }} multiline={false} maxRows={1} sx={{backgroundColor:'white', ml: 5, flex: 'flex-grow', fontFamily: 'monospace', fontSize: 12, fontWeight: 'bolder' }} placeholder="Email here"/>
                
                        <OutlinedInput variant="filled" value={user_password} height='20px' label="Password" type={(showPassword==false) ?"password" : "text"} 
                            endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    
                                    onClick={()=>{setShowPassword(!showPassword)}}
                                    
                                    edge="end"
                                  >
                                    {(showPassword==false) ? <FaEyeSlash /> : <FaEye />}
                                  </IconButton>
                                </InputAdornment>
                              }
                        onChange={(e) => {
                                setPassword(e.target.value);
                            }} multiline={false} maxRows={1} sx={{backgroundColor:'white', ml: 5, flex: 'flex-grow', fontFamily: 'monospace', fontSize: 12, fontWeight: 'bolder' }} placeholder="Password here"/>
                        {
                            (()=>{
                                if(login_loading==false)
                                    {
                                        return(<Button sx={{bgcolor: 'darkblue', ml: 5,height:'55px', fontWeight: 'bolder'}} onClick={login} startIcon={<FaPenAlt/>} className="add_note_btn" variant="contained">LOGIN</Button>);
                                    }
                                    else{
                                        return(<Button sx={{bgcolor: 'darkblue', ml: 5,width: '10px',height:'55px', fontWeight: 'bolder'}} className="add_note_btn" variant="contained">
                                            <Riple size='small' color="white"/>
                                        </Button>);
                                    }
                            })()
                        }
                        

                </div>
        </div>
        
    );
}



function RegistrationPage(){

    const [user_email, setEmail] = useState("");
    const [user_password, setPassword] = useState("");
    const [reg_state,setRegState] = useState(false);
    const [reg_status,setRegStatus] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const makeAccount = ()=>{
       setRegState(true);
       const login_promise = account.create('unique()',user_email,user_password);
       
       login_promise.then(function (response) {
        current_user = response;
        window.localStorage.setItem("session",current_user);
        
        console.log(response); // Success
        setRegStatus("Account Created, Continue to login");
        setRegState(false);
    }, function (error) {
        console.log("Error is: "+error); // Failure
        setRegStatus(error.message);
        setRegState(false);
    });
    
    }
    
    return(
        <div className="registration_div">
                
                
                    <div className="login_div_header" sx={{fontFamily: 'monospace', fontSize: 12}}> Don't have an account,<br/> please create one below </div>
                    <div className="registration_div_inputs">
                        <div className="registration_body">
                            <InputLabel htmlFor="outlined-email" sx={{color:'white',fontFamily: 'monospace', fontSize: 12, fontWeight: 'bolder'}}>
                                EMAIL
                            </InputLabel>
                            <OutlinedInput id='outlined-email' value={user_email} variant="filled" label="Email" onChange={(e) => {
                                setEmail(e.target.value);
                            }} multiline={false} maxRows={1} sx={{backgroundColor:'white', width:250, ml: 5, flex: 'flex-grow', fontFamily: 'monospace', fontSize: 12, fontWeight: 'bolder' }} placeholder="Email here"/>
                            <br/>
                        
                            <InputLabel htmlFor="outlined-password" sx={{color:'white',fontFamily: 'monospace', fontSize: 12, fontWeight: 'bolder'}}>
                                PASSWORD
                            </InputLabel>
                            <OutlinedInput id="outlined-password" type={(showPassword==false) ?"password" : "text"} value={user_password} height='20px' label="Your Password" 
                                endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        
                                        onClick={()=>{setShowPassword(!showPassword)}}
                                        
                                        edge="end"
                                      >
                                        {(showPassword==false) ? <FaEyeSlash /> : <FaEye />}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                onChange={(e) => {
                                setPassword(e.target.value);
                            }} multiline={false} maxRows={1} sx={{backgroundColor:'white',width:250, ml: 5, flex: 'flex-grow', fontFamily: 'monospace', fontSize: 12, fontWeight: 'bolder' }} placeholder="Password here"/>
                            <br/>
                            <div className="reg_status">{reg_status}</div>
                            <Button sx={{bgcolor: 'darkblue', ml: 5,height:'55px', fontWeight: 'bolder'}} 
                                startIcon={(reg_state===false)? <FaPenAlt />:<FaPenAlt className='pen_loading'/>}
                                onClick={makeAccount} 
                                className="add_note_btn" 
                                variant="contained">
                                    REGISTER
                            </Button>
                        </div>
                        
                    </div>
                    
                    
                    
                
                
            </div>
    );
}

export default Dashboard;