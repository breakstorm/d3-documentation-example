// import logo from './logo.svg';
import './App.css';

import * as d3 from 'd3';
import {useState} from "react";

function LinePlot({
                      data,
                      width = 640,
                      height= 400,
                      marginTop = 20,
                      marginRight = 20,
                      marginBottom = 20,
                      marginLeft = 20
                  })
{
    const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
    const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
    const line = d3.line((d, i) => x(i), y);
    return (
        <svg width={width} height={height}>
            <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)}/>
            <g fill="white" stroke="currentColor" strokeWidth="1.5">
                {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5"/>))}
            </g>
        </svg>
    );
}

function App() {
    const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));

    function onMouseMove(event) {
        const [x, y] = d3.pointer(event);
        setData(data.slice(-200).concat(Math.atan2(x, y)));
    }

    return (
        <div onMouseMove={onMouseMove}>
            <LinePlot data={data} />
        </div>
    );

    // return (
    //     <div className="App">
    //       <LinePlot></LinePlot>
    //         <header className="App-header">
    //             <img src={logo} className="App-logo" alt="logo"/>
    //             <p>
    //                 Edit <code>src/App.js</code> and save to reload.
    //             </p>
    //             <a
    //                 className="App-link"
    //                 href="https://reactjs.org"
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //             >
    //                 Learn React
    //             </a>
    //         </header>
    //     </div>
    // );
}

export default App;
