import React from 'react'
import '../../column-cards/column-cards.css'
import 'antd/dist/antd.css';
import {Avatar, Card, CardContent, Typography} from '@material-ui/core';
import moment from 'moment'
import {Row, Column} from "simple-flexbox";
import utility from "../../../utility";
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import {TwitterTweetEmbed} from 'react-twitter-embed';
import {stateNamesConstant} from '../../../constants';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappIcon,
    TwitterIcon,
    WhatsappShareButton,
    TwitterShareButton,
} from 'react-share';


const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
        maxWidth: '400px',
        border: "none",
        background: "white"
    },
    select: {
        fontSize: "12px"
    }
}));

function LeadsComponent(props) {
    const classes = useStyles();
    return (
        <>
            {DialogBox(props)}
            <Row className="selected-param">
                <Column>
                    <div className="selected">
                    <span onClick={props.backToSelectCategory}>
                    <img style={{
                        width: "25px",
                        margin: '5px',
                        fill: "invert(44%) sepia(97%) saturate(3395%) hue-rotate(187deg) brightness(101%) contrast(109%)"
                    }}
                         src="/images/BackButton.svg"/>
                        {stateNamesConstant[props.selectedState]}
                    </span>
                        &nbsp;/ {utility.toSentenceCase(props.selectedCategory)}

                    </div>
                </Column>
                {/* <Column className="set-alert"><span><img classname="alert-image" src="/images/alert.svg"></img>Set Alert</span></Column> */}
            </Row>
            <Row style={{padding: "15px 5px 15px 5px"}}>
                <Column style={{width: "60%"}}>
                    {/* <InputLabel id="demo-simple-select-label">Sort By:-</InputLabel> */}
                    <Select
                        className={classes.select}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.state.selectedSortingAttr}
                        onChange={props.onSelectSorting}
                    >
                        <MenuItem value={"Sort"}>Sort By -</MenuItem>
                        <MenuItem value={"recent"}>Sort By - Recent</MenuItem>
                        <MenuItem value={"working"}>Sort By - Working</MenuItem>
                    </Select>
                </Column>
            </Row>
            {
                props.state.allLeads.length > 0 ?
                    props.state.allLeads && props.state.allLeads.map((ite, index) => (
                        <>
                            <Card className="m-10" className="lead-card" key={index}>
                                <CardContent className="card-desc-container">
                                    <Typography className="mb-10" variant="body2">

                                    </Typography>
                                    <Typography className="card-desc" variant="body2"
                                                onClick={() => props.handlePopoverOpen(ite)}
                                    >
                                        {ite.description}</Typography>

                                    <Row className="card-timestamp">
                                        <Row className="card-vote-buttons" style={{cursor: 'pointer'}}><span
                                            className="underline-text" onClick=
                                            {() => {
                                                props.incrementUpVote(ite._id);
                                                props.sendUpVoteRequest(ite._id)
                                            }}
                                        >Working:&nbsp;{ite.upVoteCount}</span>&nbsp;&nbsp;

                                            <span className="card-vote-buttons  underline-text" style={{cursor: 'pointer'}}
                                                  onClick=
                                                      {() => {
                                                          props.incrementDownVote(ite._id);
                                                          props.sendDownVoteRequest(ite._id)
                                                      }}
                                            >Not working:&nbsp;{ite.downVoteCount}</span></Row>&nbsp;

                                        <Column
                                            className="card-footer-info">{utility.toSentenceCase(ite.state)} {utility.toSentenceCase(ite.district)} {moment(ite.channelCreatedOn).fromNow()}</Column>
                                    </Row>
                                </CardContent>
                            </Card>
                        </>
                    )
                    ) :
                    <div
                        className="loading">{!props.state.responseMessage && props.state.originalResponseData.length === 0 ? "Loading..." : 'No leads available. Search for other cities.'}</div>}

        </>

    );

}

function DialogBox(props) {
    return (
        <Dialog
            open={props.state.isShowSharePopup}
            onClose={props.handlePopoverClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className="dialog-box">
                <Row className="dialog-header">
                    <Column>
                        <div className="p-b-10">Details</div>
                    </Column>
                    <Column onClick={props.handlePopoverClose} style={{cursor: 'pointer'}}><img
                        src="/images/Cancel.svg"/> </Column>
                </Row>
                {props.state.selectedItem && props.state.selectedItem.attachments && props.state.selectedItem.attachments.media_keys.length > 0
                    ?
                    <>
                        {props.state.uniqueContact && props.state.uniqueContact.length ?
                            <div className="p-t-20 p-r-20">Contact :</div> : ""}
                        {props.state.uniqueContact && props.state.uniqueContact.length ? props.state.uniqueContact.map(data => (
                            <div className=""><a href={`tel:${data}`}>{data}</a></div>
                        )) : ""}
                        <TwitterTweetEmbed options={{width: 400}}
                                           tweetId={props.state.selectedItem.channelID}/>

                        <Row className="card-timestamp">
                            <Column>
                                <div
                                    className="p-t-20 p-r-20 p-b-10 bottom-text">{moment(props.state.selectedItem.channelCreatedOn).fromNow()}</div>
                            </Column>
                            <Column>
                                <div className="p-t-20 p-r-20 p-b-10 bottom-text">Source: Twitter</div>
                            </Column>
                        </Row>
                    </>
                    :
                    <div className="selected-item ">
                        <div className="p-l-20 p-t-20 p-r-20"> {props.state.selectedItem.description}</div>
                        {props.state.uniqueContact && props.state.uniqueContact.length ?
                            <div className="p-l-20 p-t-20 p-r-20">Contact :</div> : ""}
                        {props.state.uniqueContact && props.state.uniqueContact.length ? props.state.uniqueContact.map(data => (
                            <div className="p-l-20 "><a href={`tel:${data}`}>{data}</a></div>
                        )) : ""}
                        <Row className="card-timestamp">
                            <Column>
                                <div
                                    className="p-l-20 p-t-20 p-r-20 p-b-10 bottom-text">{moment(props.state.selectedItem.channelCreatedOn).fromNow()}</div>
                            </Column>
                            <Column>
                                <div className="p-l-20 p-t-20 p-r-20 p-b-10 bottom-text">Source: Twitter</div>
                            </Column>
                        </Row>
                    </div>}


                <Row className="card-timestamp p-t-20">
                    <Row className="card-vote-buttons" style={{cursor: 'pointer'}}><span className=" working-text"
                                                                                         onClick=
                                                                                             {() => {


                                                                                                 props.incrementUpVote(props.state.selectedItem._id);

                                                                                                 props.sendUpVoteRequest(props.state.selectedItem._id)
                                                                                             }}
                    ><img style={{width: "20px", paddingRight: "1px"}}
                          src="/images/Working.svg"></img>Working:{props.state.selectedItem.upVoteCount}</span>&nbsp;

                        <span className="  not-working-text" style={{cursor: 'pointer'}} onClick=
                            {() => {
                                props.incrementDownVote(props.state.selectedItem._id);
                                props.sendDownVoteRequest(props.state.selectedItem._id)
                            }}
                        ><img style={{width: "20px", paddingRight: "1px"}} src="/images/NotWorking.svg"></img>Not working:{props.state.selectedItem.downVoteCount}</span></Row>&nbsp;

                    <Column className="card-footer-info">
                        <Row>
                            <FacebookShareButton style={{paddingRight: "3px"}} url={process.env.REACT_APP_WEBAPP_URL}
                                                 quote={`${props.state.selectedItem.description} Found at`}>
                                <FacebookIcon size={20} round={true}></FacebookIcon>
                            </FacebookShareButton>
                            <WhatsappShareButton style={{paddingRight: "3px"}} url={process.env.REACT_APP_WEBAPP_URL}
                                                 title={`${props.state.selectedItem.description} Found at`}>
                                <WhatsappIcon size={20} round={true}></WhatsappIcon>
                            </WhatsappShareButton>
                            <TwitterShareButton url={process.env.REACT_APP_WEBAPP_URL}
                                                title={`${props.state.selectedItem.description} Found at`}>
                                <TwitterIcon size={20} round={true}></TwitterIcon>
                            </TwitterShareButton>
                        </Row>
                    </Column>

                </Row>
            </div>
        </Dialog>
    );
}

export default LeadsComponent;
