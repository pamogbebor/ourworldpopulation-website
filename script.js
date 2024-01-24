
const catColor = d3.scaleOrdinal( [`#36DD5A`, `#FEFE00`, `#FF7E00`, `#FF0000`, `#99004B`, `#7E0122`]);
const weightColor = d3.scaleSequentialSqrt(d3.interpolateOrRd) 
.domain([0, 1e7]);

const getAlt = d => d.population * 9e-8;

const getTooltip = d => `
  <div style="text-align: center">
    <div><b>${d.city}</b>, ${d.country}</div>
    <div>Population: <em>${d.population}</em></div>
  </div>`
  ;

const myGlobe = Globe()
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
  .pointLat('lat')
  .pointLng('lng')
  .pointAltitude(getAlt)
  .pointRadius(0.12)
  .pointColor(d => weightColor(d.population))
  //.pointColor('red')
  .pointLabel(getTooltip)
  .labelAltitude(d => getAlt(d) + 1e-6)
  .backgroundColor('rgba(0, 0, 0, 0)')
  .showAtmosphere(true)
  .atmosphereColor('lightblue')
  .labelLabel(getTooltip)
  .pointResolution(18)
  (document.getElementById('globe'));

fetch('population.json').then(res => res.json()).then(pop => {
  myGlobe.pointsData(pop)
    .labelsData(pop);
});

myGlobe.controls().autoRotate = true;
myGlobe.controls().autoRotateSpeed = 0.9;
//myGlobe.controls().enabled = true;
