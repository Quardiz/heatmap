import React from 'react';
import * as d3 from "d3";
import './heatmap.css'

export default class HeatMap extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
        }
    }

    componentDidMount(){
        fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
            .then(answer => answer.json())
            .then(json => {
                this.setState(()=>({data: json}), this.drawHeatmap);
            });
    }

    drawHeatmap() {
        const baseTemperature = this.state.data.baseTemperature;
        const w = 1200;
        const h = 800;
        const padding = 100;
        const rect_height = (h - 2 * padding) / 12;
        const months = [1,2,3,4,5,6,7,8,9,10,11,12];
        const rect_width = w / (this.state.data.monthlyVariance.length+3) * 12;

        const minMaxVariance = [d3.min(this.state.data.monthlyVariance, d => d.variance), d3.max(this.state.data.monthlyVariance, d => d.variance)];

        const xScale = d3.scaleLinear()
            .domain([d3.min(this.state.data.monthlyVariance, d=>d.year), d3.max(this.state.data.monthlyVariance, d=>d.year)])
            .range([padding, w-padding]);

        const yScale = d3.scaleBand()
            .domain(months)
            //.range(months.map(d => h - 2 * padding - (d-1) * rect_height))
            .range([h-padding, padding]);

        const yAxisScale = d3.scaleBand()
            .domain(
                ['January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December']
            )
            .range([h-padding, padding])

        var colors = d3.scaleSequential()
            .domain(minMaxVariance)
            .interpolator(d3.interpolatePlasma);
        
        var div = d3.select("body").append("div")	
            .attr("class", "tooltip")				
            .style("opacity", 0);

        const svg = d3.select(this.refs.myDiv).append("svg");

        svg.attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("width", w)
            .attr("height", h)
        .selectAll("rect")
        .data(this.state.data.monthlyVariance)
        .enter()
            .append("rect")
            .attr("stroke-width", 0)
            .attr("x", (d) => xScale(d.year))
            .attr("y", (d) => yScale(d.month))
            .attr("width", rect_width)
            .attr("height", rect_height)
            .attr("fill", (d) => colors(d.variance))
            .attr("class", "heatMapRect")
            .append("title")
            .text(d => `Variance: ${d.variance}°C \nTemperature: ${d.variance + baseTemperature}°C\nYear: ${d.year}`);
            // .on("mouseover", (d) => {
            //     div.transition()
            //         .duration(200)
            //         .style("opacity", .9);
            //     div.html(`<p>Variance: ${d.variance}°C</p> <br/> <p>Temperature: ${d.variance + baseTemperature}°C</p>`)
            //         .style("left", xScale(d.year) + "px")
            //         .style("top", (yScale(d.month) - 28) + "px");
            // })
            // .on("mouseout", function(d) {		
            //     div.transition()		
            //         .duration(500)		
            //         .style("opacity", 0);	
            // })
            
        
        

        const xAxis = d3.axisBottom(xScale)
                        .tickFormat(d3.format(".0f"));
        const yAxis = d3.axisLeft(yAxisScale);
        
        svg.append("text")
            .attr("x", w/2-300)
            .attr("y", 0.6*padding)
            .attr("font-size", 30)
            .text("Monthly Global Land-Surface Temperature")

        svg.append("text")
            .attr("x", w-0.9*padding)
            .attr("y", h-0.7*padding)
            .attr("font-size", 20)
            .text("Years")
        
        // svg.append("text")
        //     .attr("x", padding -20)
        //     .attr("y", h/2-padding)
        //     .attr("transform", `rotate(-90deg)`)
        //     .text("Months")

        svg.append("g")
            .attr("transform", "translate(0, " + (h - padding) + ")")
            .call(xAxis);

        svg.append("g")
            .attr("transform", "translate(" + padding + ", " + 0  + ")")
            .call(yAxis);

        const legend_height = 50;
        const legend_width = 400;
        const steps = 10;
        const legend_step = legend_width / steps;
        const legendDataScale = d3.scaleLinear().domain([1, steps]).range(minMaxVariance);
        const legendData = [...Array(steps).keys()].map((_, i) => i+1).map(i => legendDataScale(i));
        const legendAxis = d3.axisBottom(
                d3.scaleLinear()
                    .domain([minMaxVariance[0] + baseTemperature, minMaxVariance[1] + baseTemperature])
                    .range([0, legend_width-legend_step])
                )
            .tickValues(legendData.map(x => x + baseTemperature))
            .tickFormat(d3.format(".1f"));

        svg.append("g")
            .attr("transform", `translate(${w/2-legend_width+padding}, ${h-18})`)
            .call(legendAxis)
            .selectAll("rect")
            .data(legendData)
            .enter()
                .append("rect")
                .attr("x", (_, i) => legend_step * i - legend_step/2)
                .attr("y", -rect_height)
                .attr("width", legend_step)
                .attr("height", rect_height)
                .attr("fill", (d) => colors(d));

    }

    render(){
        if(this.state.data == null){
            return <h1>Loading data.</h1>;
        } else {
           
            return <div ref="myDiv">

            </div>;
        }
    }
}