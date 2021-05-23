var numbers; 

function node() {
    this.left = null; 
    this.right = null; 
    this.prob = null; 
    this.value = null; 
    this.code = ""; 
    this.parent = null; 
    this.visited = false; 
}

function tableRow() {
    this.sign = '';
    this.number = null;
    this.code = "";
}

function encodedText() {
    this.sign = '';
    this.code = "";
}

function sortNumberAsc(a, b) {
    return a[1] - b[1]; 
}

function getCodes(prob) { 
    tree = new Array();
    secondTree = new Array();
    this.getNext = function() {
    if (tree.length > 0 && secondTree.length > 0 && tree[0].prob < secondTree[0].prob) 
    return tree.shift(); 
    if (tree.length > 0 && secondTree.length > 0 && tree[0].prob > secondTree[0].prob)
    return secondTree.shift();
    if (tree.length > 0)
    return tree.shift();
    return secondTree.shift();
    }
    var sortedProb = new Array();
    var codes = new Array(); 
    var x = 0;
    for (var elem in prob) { 
        sortedProb[x] = new Array(elem, prob[elem]); 
        x = x + 1;
    }
    sortedProb = sortedProb.sort(sortNumberAsc); 
    x = 0; 
    for (var elem in sortedProb) { 
        tree[x] = new node(); 
        tree[x].prob = sortedProb[elem][1];
        tree[x].value = sortedProb[elem][0]; 
        x = x + 1; 
    }
    while (tree.length + secondTree.length > 1) { 
        var left = getNext();
        var right = getNext(); 
        var newnode = new node(); 
        newnode.left = left; 
        newnode.right = right; 
        newnode.prob = left.prob + right.prob; 
        newnode.left.parent = newnode;
        newnode.right.parent = newnode;
        secondTree.push(newnode); 
    }
    var currentnode = secondTree[0];
    var code = "";
    while (currentnode) {
        if (currentnode.value) {
            codes[currentnode.value] = code;
            code = code.substr(0, code.length - 1);
            currentnode.visited = true;
            currentnode = currentnode.parent;
        }
        else if (!currentnode.left.visited) {
            currentnode = currentnode.left;
            code += "0";
        }
        else if (!currentnode.right.visited) {
            currentnode = currentnode.right;
            code += "1";
        }
        else {
            currentnode.visited = true;
            currentnode = currentnode.parent;
            code = code.substr(0, code.length - 1);
        }
    }
    return codes;
}



function compressHuffman(input, codes) {
    var output = input.split(""); 
    var encoded_text;
    var array = new Array(output.length);
    for (var elem in output) { 
        encoded_text = new encodedText();
        encoded_text.sign = output[elem];
        encoded_text.code = codes[output[elem]];
        array.push(encoded_text);
    }
    return array;
}

function getNumbers(input) {
    numbers = new Array();
    var x = 0;
    var len = input.length; 
    while (x < len) { 
        var chr = input.charAt(x); 
        if (numbers[chr]) { 
            numbers[chr] = numbers[chr] + 1; 
        }
        else { 
            numbers[chr] = 1; 
        }
        x++;
    }
    
    return numbers;
}

function getProbabilities(input) { 
    var prob = new Array(); 

    var len = input.length; 

    prob = getNumbers(input);

    for (var elem in prob) { 
        prob[elem] = prob[elem] / len; 
    }
    return prob;
}
 
function initClassesArray(input) {
    var output = input.split("");
    var array = new Array(output.length);
    for(var sign in output)
        array[output[sign]] = false;
    return array;
}

function getTextArray(input) {
    var array = input.split("");
    return array;
}

function getEntropy(prob) {
    var sum = 0;
    var temp;
    for(var i in prob) {
        temp = prob[i] * Math.log2(1/prob[i]);
        sum += temp;
    }
    return sum;
}

function getEncodedData(array) {
    var output = '';
    for (var elem in array) {
        output += array[elem].code;
    }
    return output;
}

function getAverageLength(prob, codes) {
    var sum = 0;
    var temp;
    for(var i in prob) {
        temp = prob[i] * codes[i].length;
        sum += temp;
    }
    return sum;
}