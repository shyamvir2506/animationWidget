import React,{useEffect, useState} from 'react';
import {  Grid , Input,IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Effects from './Effects';
import '../assets/css/settings.css';




const AnimItem = (props) => {

    return (
        <Grid container direction="row" className="s-animHolder" justifyContent='space-between' alignItems='center' key={props.index}>
            <div>
                <label>Effect:</label>
                <Effects className="s-space" obj={props.obj} effect={props.effects} 
                    onChange={(ttobj)=>props.changeHandler({name:ttobj.name, value:ttobj.value}, props.index)}/>
            </div>

            <div>
                <label>Distance:</label>
                <Input disabled={props.disabled(props.obj)} 
                    className="s-space" style={{width:50, fontSize:'14px'}} type="number" value={props.obj.distance} name="distance"
                    onChange={(evt)=>props.changeHandler({name:evt.target.name, value:evt.target.value}, props.index)} step="1"></Input>%
            </div>

            <div>
                <label>Duration:</label>
                <Input className="s-space" style={{width:50, fontSize:'14px'}} type="number" value={props.obj.duration} name="duration"
                    onChange={(evt)=>props.changeHandler({name:evt.target.name, value:evt.target.value}, props.index)} step="1"></Input>ms
            </div>
            
            <div>
                <label>Delay:</label>
                <Input className="s-space" style={{width:50, textAlign:'center', fontSize:'14px'}} type="number" value={props.obj.delay} name="delay"
                onChange={(evt)=>props.changeHandler({name:evt.target.name, value:evt.target.value}, props.index)} step="1" ></Input>ms
            </div>

            {
                props.arrAnim.length>=2 && <IconButton color="secondary" fontSize="small" style={{height:'30px', width:'30px'}} onClick={()=>props.deleteHandler(props.index)}>
                    <DeleteIcon/>
                </IconButton>
            }
        </Grid>
    )
    
}


export default AnimItem;