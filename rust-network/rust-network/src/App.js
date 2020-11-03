import React from "react";
import Tree from "react-d3-tree";
import GraphGL, { JSONLoader, NODE_TYPE, D3ForceLayout } from "graph.gl";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css"
import NodeInfo from './NodeInfo'

const DEFAULT_NODE_SIZE = 5;
const DEFAULT_COLOR = "rgb(236, 81, 72)";

function App() {
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState(  [
    {label: "science", value: "science"},
    {label: "geometry", value: "geometry"},
    {label: "math", value: "math"},
    {label: "quantum", value: "quantum"},
    {label: "linear-algebra", value: "linear-algebra"},
    {label: "high-energy-physics", value: "high-energy-physics"},
    {label: "algebra", value: "algebra"},
    {label: "linear", value: "linear"},
    {label: "data-structure", value: "data-structure"},
    {label: "crypto", value: "crypto"},
    {label: "framework", value: "framework"},
    {label: "random", value: "random"},
    {label: "bioinformatics", value: "bioinformatics"},
    {label: "serde", value: "serde"},
    {label: "statistics", value: "statistics"},
    {label: "async", value: "async"},
    {label: "ffi9", value: "ffi9"},
    {label: "deep-learning", value: "deep-learning"},
    {label: "mathematics", value: "mathematics"},
    {label: "vector", value: "vector"},
    {label: "numerics", value: "numerics"},
     
      ]);
  const [value, setValue] = React.useState("science");
  const [slideValue, setSlideValue] = React.useState(30)
  const [treeOn, setTreeOn] = React.useState(false)
  const [snapdate, setSnapdate] = React.useState(
    new Date("2016-11-15T00:00:00.000000+00:00")
  );
  const [nodeClick, setNodeClick] = React.useState(null)
  
  
  const [root, setRoot] = React.useState("wasm-bindgen");
  const [rangeEnabled, setRangeEnabled] = React.useState(false);

  const [treeData, setTreeData] = React.useState([
    {
      name: "Top Level",
      attributes: {
        keyA: "val A",
        keyB: "val B",
        keyC: "val C",
      },
      children: [
        {
          name: "Level 2: A",
          attributes: {
            keyA: "val A",
            keyB: "val B",
            keyC: "val C",
          },
          children: [
            {
              name: "Level 3: A",
            },
          ],
        },

        {
          name: "Level 2: B",
        },
      ],
    },
  ]);
  const [myGraph, setMyGraph] = React.useState({
    nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
    edges: [
      { id: 0, sourceId: "Harry", targetId: "Sally" },
      { id: 1, sourceId: "Harry", targetId: "Alice" },
    ],
  });

  function setNodeInfo(e) {
    console.log(e['object']['_data'])
    setNodeClick(e['object']['_data'])
  }

  React.useEffect(() => {
    getGraphSnapshot();
  }, []);

  const graph = JSONLoader({
    json: myGraph,
    nodeParser: (node) => ({ id: node.id }),
    edgeParser: (edge) => ({
      id: edge.id,
      sourceId: edge.sourceId,
      targetId: edge.targetId,
      directed: true,
    }),
    onClick: (e) => setNodeInfo(e),
  });

  function getTree() {

    setTreeOn(true)
    console.log(root);
    fetch("http://localhost:3001/getTree", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ root }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTreeData(data[0]);
      });
  }

  function reverseTree() {
    setTreeOn(true)
    console.log(root);
    fetch("http://localhost:3001/getReverse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ root }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTreeData(data[0]);
      });
  }


  function getGraphSnapshot() {
    setTreeOn(false)
    console.log(snapdate);
    
    fetch("http://localhost:3001/getSnapshot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ snapdate }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMyGraph(data);
      });
  }

  function getKeywords() {
    setTreeOn(false)
    fetch("http://localhost:3001/getKeyword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ snapdate, value }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMyGraph(data);
      });
  }

  function getDownloads() {
    setTreeOn(false)
    fetch("http://localhost:3001/getDownloads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({snapdate, slideValue }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMyGraph(data);
      });
  }

  function getTimeSeries() {
    setTreeOn(false)
    fetch("http://localhost:3001/getTimeSeries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({snapdate, slideValue }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
  
      });
  }

  function switchRange() {
    setRangeEnabled(true)
  }

  const handleClick = (nodeData, evt) => {
    console.log(nodeData, evt);
  };

  function getDependencies(root) {
    setTreeOn(true)
    console.log(root);
    fetch("http://localhost:3001/getReverse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ root }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTreeData(data[0]);
      });
  }
  function getDepTree(root) {
    console.log(root)
    setTreeOn(true)
    console.log(root);
    fetch("http://localhost:3001/getTree", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ root }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTreeData(data[0]);
      });
  }

  const onChange = (date) => {
    console.log(date);
    setSnapdate(date);
  };

  return (
    <div className="container">
    <div className="nav-bar">
    <div className="nav-title">
    Rust Dependencies
</div>
    </div>
    <div className="main-layout">
    {
  treeOn ?  
  <div id="treeWrapper" style={{width: '100%', height: '100%'}} >
<Tree data={treeData} onClick={handleClick}/>
</div> : 
<GraphGL
        graph={graph}
        layout={new D3ForceLayout()}
        nodeStyle={[
          {
            type: NODE_TYPE.CIRCLE,
            radius: DEFAULT_NODE_SIZE,
            fill: (node) => node._data ? node._data.color : 'red',
            size: (node) => node._data ? node._data.size : 'red',
            scaleWithZoom: true,
            marker: 'circle-filled',

            ':hover': {
              fill: 'blue',
            },
          },

          {
            type: NODE_TYPE.LABEL,
            text: (node) => node._data ? node._data.label : node.id,
            color: (node) => node._data ? node._data.color : 'red',
            fontSize: 13,
            offset: [0, 15],
            scaleWithZoom: true,
          },
        ]}
        edgeStyle={{
        
          stroke: (edge) => edge._data ? edge._data.color : 'green',
          strokeWidth: 1,
        }}
        nodeEvents={{
          onClick: (e) => setNodeInfo(e),
        }}
      />
}
      
      <div className="control-panel">
          <div className="control-top">
          <div className="control-row">
            <div className="control-heading">Controls</div>
            <button className="graph-button" onClick={() => getGraphSnapshot()}>Graph</button>
            </div>
          </div>

          <div className="control-item">
          <div className="control-row">
          <div className="control-subheading">Pick Date</div>
          <button className="graph-button" onClick={() => switchRange()}>Toggle Range</button>
          </div>
          <div>
          <Calendar
            onChange={onChange}
            value={snapdate}
            selectRange={rangeEnabled}
          />


        </div>
          </div>

          <div className="control-item">
          <div className="control-row">
          <div className="control-subheading">By Downloads</div>
          <button className="graph-button" onClick={() => getDownloads()}> {slideValue} </button>
          </div>
          <div className="range-container">
       

          <input type="range" className="slider" min={100} max={10000} step= {100}value={slideValue} onChange={(e) => setSlideValue(e.currentTarget.value)}/>
        </div>
          </div>

          <div className="control-item">
          <div className="control-row">
          <div className="control-subheading">By Keyword</div>
          <button className="graph-button" onClick={() => getKeywords()}>Search</button>
          </div>
          <div className="range-container">
       
          <select
          disabled={loading}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        >
          {items.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        
        </div>
          </div>


          <div className="control-item">
          <div className="control-row">
          <div className="control-subheading">Experimental</div>
          <button className="graph-button" onClick={() => getTimeSeries()}>Time Series</button>
          </div>
        <div className="grey-border"></div>
          </div>

      
        

       
     
 
        
        <NodeInfo nodeClick = {nodeClick} getTree={getDepTree} getDependencies={getDependencies}/>
      </div>
    </div>
    </div>
  );
         
}

export default App;
