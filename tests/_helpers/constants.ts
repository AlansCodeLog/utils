export class Animal { }

export const complexObj = {
	0: 0,
	a: "a",
	b: Symbol("b"),
	c: { c: "c" },
	d: ["d"],
	e: {},
	f: [],
	g: function g() { },
	h: () => { },
	i: Animal,
	j: new Animal(),
	k: true,
	l: false,
	m: null,
}


export const complexArray = [
	0,
	"a",
	Symbol("b"),
	{ c: "c" },
	["d"],
	{},
	[],
	function e() { },
	() => { },
	Animal,
	new Animal(),
	true,
	false,
]
