import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {  Grid, Button } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import * as ActionType from './redux/ActionTypes';

import PlayAnimation from './PlayAnimation';
import AnimItem from './AnimItem';
import styles from '../assets/css/settings.css';
import { red } from '@material-ui/core/colors';

const Settings = (props) => {
    //console.info(props);   
    //const classes = '';//useStyles();
    let itemSelected = props.items[props.itemSelectedIndex];
    const [arrAnim, setArrAnim] = useState([]);

    
    let disableAnimBtn = arrAnim.length>=3 && true;
    let boxRef = React.createRef();

   console.log(arrAnim);

    

    const handlePlayAnimation=()=>{
        PlayAnimation(boxRef, arrAnim);
    }

    const addAnimation = () => {
        let tarr = [...itemSelected.anims, {ipos:10, effect:'fadeInUp', distance:100, duration:500, delay:100*(arrAnim.length+1)}];
        let titem = { ...itemSelected, anims:tarr }
        props.addAnimation(titem, props.itemSelectedIndex);
        setArrAnim(tarr);
    }

    useEffect(()=>{
        setArrAnim(itemSelected.anims);
    }, [itemSelected]);


    const changeHandler = (obj, index) => {
        itemSelected.anims[index] = {...itemSelected.anims[index], [obj.name]:obj.value};
		props.optionChangeHandler(itemSelected, props.itemSelectedIndex);
	}

    const deleteHandler = (index) => {
        itemSelected.anims.splice(index, 1);
        props.optionChangeHandler(itemSelected, props.itemSelectedIndex);
    }
    
    const disabled = (obj) => {
        console.info(obj.effect);
        if(obj.effect.search('Up')!==-1 || obj.effect.search('Down')!==-1 || obj.effect.search('Left')!==-1 || obj.effect.search('Right')!==-1){
            if(obj.effect.search('bounce')===-1){
                return false;
            }
        }
        return true;
    }

    

    return(
        itemSelected ? <Grid container direction="column" className="s-main">
            <Grid container direction="row" justifyContent='space-between' alignItems="center">
                <label>{itemSelected.title}</label>
                <Grid container direction='row' justifyContent='space-between' style={{width:300}}>
                    <Button disabled={disableAnimBtn} variant="contained" color="primary" style={{width:165}} onClick={addAnimation}>Add Animation +</Button>
                    <Button variant="contained" color="primary" style={{width:120}} onClick={handlePlayAnimation}>Play<PlayArrowIcon/></Button>
                </Grid>
            </Grid>
            
            
            <div style={{overflowY:'auto', height:165}}>
                {   
                    
                    arrAnim.map((obj, index)=>{ 
                        console.log(obj,index,itemSelected);
                        return (<AnimItem key={index} obj={obj} index={index} changeHandler={changeHandler} disabled={disabled} deleteHandler={deleteHandler} arrAnim={arrAnim} effects={props.effects}></AnimItem>)
                    }) 
                }
            </div>

            <Grid container className="s-preview" style={{height:260,marginTop:'6px', background:'white'}} justifyContent="center" alignItems="center">
                <div ref={boxRef} className="s-animBox" style={{width:40,height:40, background:'red'}}></div>
            </Grid>
        </Grid> : null
    )
}

const stateToProps = state => {
    return {
        items:state.items,
        effects:state.effects,
        itemSelectedIndex:state.itemSelectedIndex
    }
}

const dispatchToState = dispatch => {
    return {
        optionChangeHandler:(obj, index)=>{
			dispatch({type:ActionType.UDPATE_ITEM, payload:{data:obj, index:index}});
        },
        addAnimation:(item, index)=>{
            dispatch({type:ActionType.ADD_ANIMATION, payload:{items:item, index:index}});
        }
    }
}

export default connect(stateToProps, dispatchToState)(Settings);