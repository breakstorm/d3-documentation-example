import * as d3 from 'd3';
import {useEffect, useRef} from "react";

export default function () {
    const refLine = useRef(null);

    useEffect(() => {
        const width = 500
        const height = 500
        const margin = {left: 30, top: 30, right: 30, bottom: 30}
        console.log('Line created')
        const svg = d3.select(refLine.current)
        svg.attr('style', 'border: 1px solid black');
        svg.attr('style', `width: ${width}px; height: ${height}px`);
        // const svgCall = svg.call();
        // svgCall.attribute('width', width).attribute('height', height).style('border', '1px solid black');
        const xLinear = d3.scaleLinear().domain([0, 50]).range([margin.left, `${width - margin.right}`])
        const yLinear = d3.scaleLinear().domain([0,100]).range([height - margin.bottom, margin.top])
        svg.append('g').call(d3.axisBottom(xLinear)).attr('transform', `translate(0, ${height - margin.bottom})`)
        svg.append('g').call(d3.axisLeft(yLinear)).attr('transform', `translate(${margin.left},0)`)


        return () => {
            console.log('Line destroyed')
        }
    }, [])
    return (
        <>
            <h2>Line Chart</h2>
            <svg ref={refLine}></svg>
        </>
    )
};