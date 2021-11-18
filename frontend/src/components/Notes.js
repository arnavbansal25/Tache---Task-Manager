import axios from 'axios';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { baseUrl } from '../common/baseUrl';

import SingleNote from './SingleNote';
import AddBoxIcon from '@mui/icons-material/AddBox';

import TextareaAutosize from '@mui/material/TextareaAutosize';
import Workspace from './Workspace';

function Notes(props) {

    const [notes, setNotes] = React.useState([]);
    const [num, setNum] = React.useState(0);
    const [addingNote, setAddingNote] = React.useState(false);

    const location = useLocation();
    const { workspace } = location.state;

    React.useEffect(() => {
        // console.log("oo", workspace);
        // console.log("tt", workspace._id, workspace.workspaceName);
        axios.get(baseUrl + `workspace/${workspace.workspaceName}/notes`, {
            params: {
                workspaceId: workspace._id
            }
        })
            .then(response => {
                // console.log("eer", response);
                setNotes(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [num, workspace])

    return (
        <div className="row p-3 px-5" style={{ float: 'left', maxWidth: '100%' }}>
            {/* <div className="bg-info" style={{width: '200px', height: '200px'}}> */}
            <AddBoxIcon sx={{ fontSize: 200 }} style={{ cursor: 'pointer', margin: '10px' }} onClick={() => setAddingNote(true)} />
            {/* </div> */}
            {
                notes && notes.map((item, index) => (
                    <SingleNote note={item} workspace={workspace} setNum={setNum} setAddingNote={setAddingNote} />
                ))
            }
            {
                addingNote ?
                    <SingleNote note={null} workspace={workspace} setNum={setNum} setAddingNote={setAddingNote} />
                    :
                    <>
                    </>
            }
        </div>
    )
}

export default Notes;