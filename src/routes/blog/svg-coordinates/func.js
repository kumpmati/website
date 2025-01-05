svg.addEventListener('click', (event) => {
	const point = new DOMPoint(event.clientX, event.clientY);

	// x and y are in svg units now
	const { x, y } = point.matrixTransform(svg.getScreenCTM()?.inverse());
});
