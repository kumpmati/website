const COLORS = ['#1D0C03', '#F65900', '#eee', '#000'];
// const COLORS = ['#FF833D', '#FFA24B', '#E1E1E1', '#000'];

export const random = () => {
	return COLORS[Math.floor(Math.random() * COLORS.length)];
};
