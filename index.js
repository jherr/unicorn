(async () => {
  const images = await Promise.all(
    [
      'eiffel12345.svg',
      'eiffel12345-10.svg',
      'eiffel12345-20.svg',
      'eiffel12345-30.svg',
      'eiffel12345-40.svg',
      'eiffel12345-50.svg',
      'eiffel12345-60.svg',
      'eiffel12345-70.svg',
      'eiffel12345-80.svg',
    ].map((img) => fetch(img).then(data => data.text()))
  );

  const widths = [ 40, 46, 51, 54, 56, 56, 54, 51, 46 ];

  let img = 0;
  window.setInterval(() => {
    document.body.innerHTML = images[img];

    const svgEl = document.querySelector('svg');
    svgEl.style.marginLeft = `${(56 - widths[img]) * 5}px`;
    svgEl.setAttribute('width', widths[img] * 10);
    svgEl.setAttribute('height', 90 * 10);
    svgEl.setAttribute('viewBox', `0 0 ${widths[img]} 90`);
  
    const layers = 
      Array.from(document.querySelectorAll('g')).map(element => ({
        element,
        polygons: Array.from(element.querySelectorAll('polygon'))
      }));
  
    let layer = layers.length;
    layers.forEach(({ element, polygons }, index) => {
      polygons.forEach(layerEl => {
        layerEl.style.fill = 'black';
        const offset = index - layer;
        layerEl.style.fillOpacity = 0; 
        layerEl.style.stroke = 'black';
        layerEl.style.strokeWidth = 0.5;
        layerEl.style.strokeOpacity = 0.5 + (offset / (layers.length * 2.5));
      });
    });

    img = (img + 1) % images.length;
  }, 200);
})();
