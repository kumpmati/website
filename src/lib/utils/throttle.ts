type Func = () => void;

export const throttle = (callback: Func, limit: number): Func => {
	let waiting = false; // Initially, we're not waiting
	return function () {
		// We return a throttled function
		if (!waiting) {
			// If we're not waiting
			callback();
			waiting = true; // Prevent future invocations
			setTimeout(function () {
				// After a period of time
				waiting = false; // And allow future invocations
			}, limit);
		}
	};
};
