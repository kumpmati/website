type Func = (...args: any[]) => void;

export const throttle = (callback: Func, timeout: number): Func => {
	let waiting = false; // Initially, we're not waiting
	return function (...args: any[]) {
		// We return a throttled function
		if (!waiting) {
			// If we're not waiting
			callback(...args);
			waiting = true; // Prevent future invocations
			setTimeout(function () {
				// After a period of time
				waiting = false; // And allow future invocations
			}, timeout);
		}
	};
};
