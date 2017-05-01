
var jsCalcNumA = 0;
var jsCalcNumB = 0;
var jsCalcOper = "";

document.getElementById("C").onclick = function() {
	document.getElementById("number").innerHTML= "";
	document.getElementById("prevNumber").innerHTML = "";
	jsCalcNumA = 0;
	jsCalcNumB = 0;
}

document.getElementById("0").onclick = function() {
	document.getElementById("number").innerHTML= document.getElementById("number").innerHTML +"0";
}
document.getElementById("1").onclick = function() {
	document.getElementById("number").innerHTML= document.getElementById("number").innerHTML +"1";
}
document.getElementById("2").onclick = function() {
	document.getElementById("number").innerHTML= document.getElementById("number").innerHTML +"2";
}
document.getElementById("3").onclick = function() {
	document.getElementById("number").innerHTML= document.getElementById("number").innerHTML +"3";
}
document.getElementById("4").onclick = function() {
	document.getElementById("number").innerHTML= document.getElementById("number").innerHTML +"4";
}
document.getElementById("5").onclick = function() {
	document.getElementById("number").innerHTML= document.getElementById("number").innerHTML +"5";
}
document.getElementById("6").onclick = function() {
	document.getElementById("number").innerHTML= document.getElementById("number").innerHTML +"6";
}
document.getElementById("7").onclick = function() {
	document.getElementById("number").innerHTML= document.getElementById("number").innerHTML +"7";
}
document.getElementById("8").onclick = function() {
	document.getElementById("number").innerHTML= document.getElementById("number").innerHTML +"8";
}
document.getElementById("9").onclick = function() {
	document.getElementById("number").innerHTML= document.getElementById("number").innerHTML +"9";
}

document.getElementById("+").onclick = function() {
	jsCalcNumA = parseInt(document.getElementById("number").innerHTML)
	jsCalcOper = "+";
	if(jsCalcNumA) {
		document.getElementById("prevNumber").innerHTML = ">"+jsCalcNumA + " " + jsCalcOper;
		document.getElementById("number").innerHTML = "";
	}
}
document.getElementById("-").onclick = function() {
	jsCalcNumA = parseInt(document.getElementById("number").innerHTML)
	jsCalcOper = "-";
	if(jsCalcNumA) {
		document.getElementById("prevNumber").innerHTML = ">"+jsCalcNumA + " " + jsCalcOper;
		document.getElementById("number").innerHTML = "";
	}
}
document.getElementById("x").onclick = function() {
	jsCalcNumA = parseInt(document.getElementById("number").innerHTML)
	jsCalcOper = "x";
	if(jsCalcNumA) {
		document.getElementById("prevNumber").innerHTML = ">"+jsCalcNumA + " " + jsCalcOper;
		document.getElementById("number").innerHTML = "";
	}
}
document.getElementById("/").onclick = function() {
	jsCalcNumA = parseInt(document.getElementById("number").innerHTML)
	jsCalcOper = "/";
	if(jsCalcNumA) {
		document.getElementById("prevNumber").innerHTML = ">"+jsCalcNumA + " " + jsCalcOper;
		document.getElementById("number").innerHTML = "";
	}
}

document.getElementById("=").onclick = function() {
	jsCalcNumB = parseInt(document.getElementById("number").innerHTML)
	if(jsCalcNumB) {
		switch(jsCalcOper) {
			case "+":
				document.getElementById("prevNumber").innerHTML = ">"+ jsCalcNumA + jsCalcOper + jsCalcNumB + "=";
				document.getElementById("number").innerHTML = jsCalcNumA + jsCalcNumB;
				jsCalcOper = "";
				break;
			case "-":
				document.getElementById("number").innerHTML = jsCalcNumA - jsCalcNumB;
				document.getElementById("prevNumber").innerHTML = ">"+ jsCalcNumA + jsCalcOper + jsCalcNumB + "=";
				jsCalcOper = "";
				break;
			case "x":
				document.getElementById("number").innerHTML = jsCalcNumA * jsCalcNumB;
				document.getElementById("prevNumber").innerHTML = ">"+ jsCalcNumA + jsCalcOper + jsCalcNumB + "=";
				jsCalcOper = "";
				break;
			case "/":
				document.getElementById("number").innerHTML = jsCalcNumA / jsCalcNumB;
				document.getElementById("prevNumber").innerHTML = ">"+ jsCalcNumA + jsCalcOper + jsCalcNumB + "=";
				jsCalcOper = "";
				break;
			default:
				jsCalcNumA = parseInt(document.getElementById("number").innerHTML)
				break;			
		}
	}
	
	jsCalcNumA = 0;
}

