import React from 'react';



function NodeInfo(props) {
    console.log(props.nodeClick)

    if(props.nodeClick) {
    return (
        <div className="node-info">
           <div className="control-row">
          <div className="control-subheading">Node Info</div>
          <button className = "graph-button" onClick={() => props.getTree(props.nodeClick.info.id)}>Get Tree</button>
            <button className = "graph-button" onClick={() => props.getDependencies(props.nodeClick.info.id)}>Get Dependencies</button>
          </div>
          <div className="text-border">
        <div className="text-container">Name: <span className="node-text"> {props.nodeClick.info.id}</span></div>
            <div className="text-container">Description: <span className="node-text">  {props.nodeClick.info.description}</span></div>
            <div className="text-container">Homepage: <span className="node-text">  {props.nodeClick.info.homepage}</span></div>
            <div className="text-container">Repository: <span className="node-text"> {props.nodeClick.info.repository}</span> </div>
            <div className="text-container"> Documentation: <span className="node-text">  {props.nodeClick.info.documentation}</span></div>
            <div className="text-container"> Downloads: <span className="node-text">  {props.nodeClick.info.downloads}</span></div>
          </div>
            </div>
        
    )
    }else {
        return (
            <div className="text-border">
            No node clicked
            </div>
        )
    }
}

export default NodeInfo



