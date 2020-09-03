(this.webpackJsonpheatmap=this.webpackJsonpheatmap||[]).push([[0],{119:function(t,a,e){t.exports=e(127)},124:function(t,a,e){},126:function(t,a,e){},127:function(t,a,e){"use strict";e.r(a);var n=e(1),r=e.n(n),c=e(46),i=e.n(c),o=(e(124),e(50)),u=e(47),l=e(48),s=e(51),d=e(49),h=e(0),p=(e(126),function(t){Object(s.a)(e,t);var a=Object(d.a)(e);function e(t){var n;return Object(u.a)(this,e),(n=a.call(this,t)).state={data:null},n}return Object(l.a)(e,[{key:"componentDidMount",value:function(){var t=this;fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json").then((function(t){return t.json()})).then((function(a){t.setState((function(){return{data:a}}),t.drawHeatmap)}))}},{key:"drawHeatmap",value:function(){var t=this.state.data.baseTemperature,a=1200,e=800,n=a/(this.state.data.monthlyVariance.length+3)*12,r=[h.f(this.state.data.monthlyVariance,(function(t){return t.variance})),h.e(this.state.data.monthlyVariance,(function(t){return t.variance}))],c=h.h().domain([h.f(this.state.data.monthlyVariance,(function(t){return t.year})),h.e(this.state.data.monthlyVariance,(function(t){return t.year}))]).range([100,1100]),i=h.g().domain([1,2,3,4,5,6,7,8,9,10,11,12]).range([700,100]),u=h.g().domain(["January","February","March","April","May","June","July","August","September","October","November","December"]).range([700,100]),l=h.i().domain(r).interpolator(h.d),s=(h.j("body").append("div").attr("class","tooltip").style("opacity",0),h.j(this.refs.myDiv).append("svg"));s.attr("stroke","black").attr("stroke-width",1).attr("width",a).attr("height",e).selectAll("rect").data(this.state.data.monthlyVariance).enter().append("rect").attr("stroke-width",0).attr("x",(function(t){return c(t.year)})).attr("y",(function(t){return i(t.month)})).attr("width",n).attr("height",50).attr("fill",(function(t){return l(t.variance)})).attr("class","heatMapRect").append("title").text((function(a){return"Variance: ".concat(a.variance,"\xb0C \nTemperature: ").concat(a.variance+t,"\xb0C\nYear: ").concat(a.year)}));var d=h.a(c).tickFormat(h.c(".0f")),p=h.b(u);s.append("text").attr("x",300).attr("y",60).attr("font-size",30).text("Monthly Global Land-Surface Temperature"),s.append("text").attr("x",1110).attr("y",730).attr("font-size",20).text("Years"),s.append("g").attr("transform","translate(0, 700)").call(d),s.append("g").attr("transform","translate(100, 0)").call(p);var m=h.h().domain([1,10]).range(r),f=Object(o.a)(Array(10).keys()).map((function(t,a){return a+1})).map((function(t){return m(t)})),y=h.a(h.h().domain([r[0]+t,r[1]+t]).range([0,360])).tickValues(f.map((function(a){return a+t}))).tickFormat(h.c(".1f"));s.append("g").attr("transform","translate(".concat(300,", ").concat(782,")")).call(y).selectAll("rect").data(f).enter().append("rect").attr("x",(function(t,a){return 40*a-20})).attr("y",-50).attr("width",40).attr("height",50).attr("fill",(function(t){return l(t)}))}},{key:"render",value:function(){return null==this.state.data?r.a.createElement("h1",null,"Loading data."):r.a.createElement("div",{ref:"myDiv"})}}]),e}(r.a.Component));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(p,null)),document.getElementById("root"))}},[[119,1,2]]]);
//# sourceMappingURL=main.1b270ac2.chunk.js.map