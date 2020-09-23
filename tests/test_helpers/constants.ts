export class Animal { }

export const complex_obj = {
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


export const complex_array = [
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
