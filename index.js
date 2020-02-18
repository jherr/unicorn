fetch('CuteUnicorn.svg')
  .then(data => data.text())
  .then(svg => {
    document.body.innerHTML = svg;

    const svgEl = document.querySelector('svg');
    svgEl.setAttribute('width', 120 * 10);
    svgEl.setAttribute('height', 80 * 10);
    svgEl.setAttribute('viewBox', "0 0 92 80");

    const layers = 
      Array.from(document.querySelectorAll('g')).map(element => ({
        element,
        polygons: Array.from(element.querySelectorAll('polygon'))
      }));

    let layer = 0;
    const dropLayer = () => {
      layers.forEach(({ element, polygons }, index) => {
        polygons.forEach(layerEl => {
          layerEl.style.fill = 'black';
          const offset = index - layer;
          const translate = index / 30;
          if (offset < 0) {
            layerEl.style.fillOpacity = 0; 
            layerEl.style.stroke = 'black';
            layerEl.style.strokeWidth = 0.5;
            layerEl.style.strokeOpacity = 0.5 + (offset / (layers.length * 2.5));
            element.setAttribute('transform', `translate(${translate} ${translate})`);
          } else if (offset === 0) {
            layerEl.style.fillOpacity = 0.5;
            layerEl.style.strokeOpacity = 0.5;
            element.setAttribute('transform', `translate(${translate} ${translate})`);
          } else {
            layerEl.style.fillOpacity = 0.0;
            layerEl.style.strokeOpacity = 0.0;
            element.setAttribute('transform', `translate(0 0)`);
          }
        });
      });
      if (layer < layers.length) {
        layer += 1;
        window.requestAnimationFrame(dropLayer);
      }
    };
    window.requestAnimationFrame(dropLayer);
  });
