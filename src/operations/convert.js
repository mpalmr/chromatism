function convert( from, to, value ) {
	switch (from){
		case "hex":
			return fromHex( to, value );
			break;
		case "rgb":
			return fromRgb( to, value );
			break;
		case "css-rgb":
			return fromCssRgb( to, value );
			break;
		case "hsl":
			return fromHsl( to, value );
			break;
		case "css-hsl":
			return fromCssHsl( to, value );
			break;
		case "cmyk":
			return fromCmyk( to, value );
			break;
	}
}