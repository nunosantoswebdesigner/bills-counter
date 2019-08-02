/* 
* TYPES
* NUMBER
* TEXT
* LOGS
*/


// TYPES

// Test value type
function IsType (value, type) {
return (typeof value === type);
/*
    >IsType(1, 'number')
    <true
    >IsType('hello', 'string')
    <true
    >IsType(true, 'boolean')
    <true
*/
}
    
// Test if value is string
function IsStr(value) {
return IsType(value, 'string') || (value instanceof String);
/*
    >IsStr('oi')
    <true
    >IsStr(1)
    <false
*/
}

// Convert value to string or predef ('') if null
function Str (value, predef) {
if (predef === undefined) predef = '';
if (value == null) return predef;
return value.toString();
/*
    >Str ('1')
    <"1"
    >var n = 1;
    >Str (n)
    <"1"
*/
}

// Test if value is number (integer or decimal)
function IsNumber (value) {
return IsType (value, 'number') || (value instanceof Number);
/*
    >IsNumber(1)
    <true
    >IsNumber('')
    <false
*/
}

// Convert value to integer or predef (0) if null
function Int (value, predef) {
if (predef === undefined) predef = 0;
if (value == null) return predef;
var resp = parseInt(value);
if (isNaN(resp)) return predef;
return resp;
/*
    >Int('1')
    <1
    >Int('1000')
    <1000
    >Int('','2')
    <"2"
*/
}

// Convert value to decimal or predef (0.0) if null
function Decimal (value, predef) {
if (predef === undefined) predef = 0.0;
if (value == null) return predef;
var resp = parseFloat(value);
if (isNaN(resp)) return predef;
return resp;
/*
    >Decimal('3.4')
    <3.4
*/
}

// Test if value is boolean
function IsBool (value) {
return IsType(value,'boolean') || (value instanceof Boolean);
/*
    >IsBool(false)
    <true
    >IsBool(true)
    <true
    >IsBool ('false')
    <false
    >IsBool (1)
    <false
*/
}

// Convert value to boolean or predef (0) if null
function Bool(value, predef) {
if (predef === undefined) predef = false;
if (value == null) return predef;
if (IsBool(value)) return value;
return Int(value, predef ? 1 : 0) != 0;
/*
    >Bool(0, false)
    <false
    >Bool(1, false)
    >true
    >Bool(0, true)
    <false
    >Bool(1, true)
    <true
*/
}

// Test if value is array
function IsArray (value) {
return value instanceof Array;
}

// Convert value to array or predef ([]) if null
function Array (value, predef) {
if (predef === undefined) predef = [];
if (value == null) return predef;
if (IsArray(value)) return value;
return [value];
/*
    >Array('hello')
    <["hello"]
    >Array('123')
    <["123"]
*/
}

// Test if value is function
function IsFunc (value) { 
return value instanceof Function;
/*
    >function x () {alert('oi')}
    >IsFunc(x)
    <true
*/
}

// Test if value is an object
function IsObj (value) { 
return value instanceof Object;
/*
    >var x = $$("#x");
    >IsFunc(x)
    <true
*/
}

/*********************************************************/

// Test if value has attribute
function HasAttr (obj, attr){ 
return obj && obj.hasOwnProperty && obj.hasOwnProperty(attr);
}

/*********************************************************/

// Test if value has index
function HasIndex (obj, index){ 
return (index >= 0) && (index < Len(obj));
/*
>var x = [0,1,2,3,4];
>HasIndex(x, 1);
<true
>HasIndex(x, 5);
<false
*/
}

// Get value len or predef (-1)
function Len (obj, predef) {
if (predef === undefined) predef = -1;
if (obj == null) {
    return predef;
}
else if (obj.length || (obj.length === 0)) {
    return obj.length;
}
else {
    return predef;
}
/*
>var x = [1,2,3];
>Len (x);
<3
>var x = 'hello'; 
>Len (x);
<5
*/
}

// Get value or predef(null) if 
function Null(obj, predef) {
if (obj == null) {
    return (predef === undefined) ? null : predef;
}
else {
    return obj;
}
/*
>var x = 3;   
>Null (x)
<3
>var x = null;   
>Null (x)
<null
*/
}

// Get value or predef(null) if null or empty('')
function NullOrEmpty (obj, predef) {
if ((obj == null) || (obj == '')) {
    return (predef === undefined) ? null : predef;
}
else {
    return obj;
}
/*
>var x = null;
>var y = [];
>NullOrEmpty(x,y);
< >[]
>NullOrEmpty(y,x);
<null
*/
}






/*********************************************************/

// Test if object has elements or specific element
function Exist (obj, element) {
if (Len(obj) <= 0) {
    return false;
} else if (element === undefined) {
    return true;
} else if (IsArray(obj)) {
    return (Pos(obj, element) >= 0);
} else {
    return obj == element;
}
}

/*********************************************************/





// Clone object
function Clone (obj) {
var len = Len(obj);
if (len >= 0) {
    var resp = [];
    for (var i = 0; i < len; i++) {
    resp[i] = obj[i];
    }
    return resp;
} else if (IsObj(obj)) {
    var resp = {};
    for (var prop in obj) {
    resp[prop] = obj[prop];
    }
    return resp;
} else {
    return null;
}
/*
>var x = $$('.bills');
>x;
<[a#bills.bills]
>Clone(x);
<[a#bills.bills]
*/
}

// Push element to object
// @toHead - optional - push to head of list
function Push (obj, element, toHead) {
var len = Len(obj);
if (len <= 0) return [element];
if (toHead) { 
    obj.unshift(element);
}
else {
    obj.push(element);
}
return obj;
/*
>var x = $$('#bg')
>var y = $$('#page')
>Push(y, x);
<[div#page.page, Array(1)]
>Push(y, x, 'head');
<[ Array(1), div#page.page]
*/
}


  
  
  
  /*********************************************************/
  
  // Positon of element in object
  function Pos (obj, element) {
    if (IsArray(obj)) {
      if (!element) return -1;
      return obj.indexOf(element);
    } else {
      obj = Str(obj);
      element = Str(element);
      if (!obj || !element) return -1;
      return obj.indexOf(element);
    }
    /*
      >var x = [0,1,2,3,4,5]
      >var a = $$('#bg')
      >var b = $$('#page')
      >Pos(b, x)
      <-1
      >Pos(x, 1)
      <2
      >Pos(x, 4)
      <8
      >Pos(x, a)
      <-1
      >Pos(x, b)
      <-1
      >Pos(a, b)  
      <0
      >Pos(a, x)
      <-1
    */
  }
  
  /*********************************************************/
  
  
  
  
  
  
  // Join text or array using separator
  function Join (a, sep, b) {
    if (IsArray(a)) {
      var resp = null;
      for (var i = 0; i < a.length; i++) resp = Join(resp, sep, a[i]);
      return Join(resp, sep, b);
    } else if (IsArray(b)) {
      var resp = null;
      for (var i = 0; i < b.length; i++) resp = Join(resp, sep, b[i]);
      return Join(a, sep, resp);
    } else {
      if ((a != null) && (b != null)) return a + sep + b;
      if (a != null) return a;
      if (b != null) return b;
      return null;
    }
    /*
      >var y = ['a','b','c']
      >var y = ['1','2','3']
      >Join(x, ' | ' ,y)
      <"a,b,c | 1,2,3"
    */
  }
  
  
  
  
  
  /*********************************************************/
  
  // Merge arrays
  function Merge (a, b) {
    if (IsArray(a)) {
      if (IsArray(b)) {
        for (var i = 0; i < b.length; i++) a.push(b[i]); 
      } else if (b != null) {
        a.push(b);
      }
      return a;
    } else if (a != null) {
      return Merge([a], b);
    } else {
      return b;
    }
  }
  
  /*********************************************************/
  
  // Get element at index
  function Index (obj, index) {
    if (IsArray(obj)) {
    if (index == null) return null;
    return obj[index];
    } else {
      obj = Str(obj);
      if (!obj || (index == null)) return null;
      return obj[index];
    }
    /*
      >var x = ['a','b','c']
      >Index(x, 0);
      <"a"
      >Index(x, 1);
      >","
      >Index(x, 2);
      >"b"
    */
  }
  
  // Last posotion of element in object
  function PosLast (obj, element) {
    if (IsArray(obj)) {
    element = Str(element);
    if (!element) return -1;
    return obj.lastIndexOf(element);
    } else {
      obj = Str(obj);
      element = Str(element);
      if (!obj || !element) return -1;
      return obj.lastIndexOf(element);
    }
     /*
      >var x = ['a','b','c']
      >PosLast(x, 'a');
      <0
      >PosLast(x, 'b');
      >1
      >Index(x, 'c');
      >3
    */
  }
  
  // Split text using separator
  function Split (text, sep) {
    if (text == null) return null;
    return Str(text).split(Str(sep));
    /*
      >var x = ['a','b','c']
      >Split(x)
      <["a", ",", "b", ",", "c"]
      >var y = ['hello']
      >Split(y)
      <["h", "e", "l", "l", "o"]
    */
  }
  
  
  // NUMBER
  
  // Get maximum between a and b
  function Max (a, b) {
    if (a == null) return b;
    if (b == null) return a;
    if (a >= b) return a;
    return b;
    /*
      >var n1 = 0;
      >var n2 = 4;
      >Max(n1, n2)
      <4
    */
  }
  
  
  
  
  
  /*********************************************************/
  
  // Get round of value
  // @decimals - optional - decimals round
  function  Round (value, decimals) {
    if (value == null) return null;
    return Decimal(value).toFixed((decimals > 0) ? decimals : 0);
  }
  
  /*********************************************************/
  
  
  
  
  
  // TEXT
  
  
  // Convert text to html, to avoid html desruption
  function Html (text) {
    if (text == null) return text;
    var replace = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;' };
    return Str(text).replace(/[&<>"'\/]/g, function (c) { return replace[c]; });
    /*
      >Html('hello')
      <"hello"
    */
  }
  
  // Cat text with prefix and sufix (optional) if not null
  function Cat (left, text, right) {
    if (text != null) {
      return Str(left) + text + Str(right);
    } else {
      return null;
    }
    /*
      >Cat('a','b','c')
      <"abc"
    */
  }
  
  // Convert text to JSON format
  function Json (text) {
    try {
      return JSON.stringify(text);
    }
    catch (e)
    {
      LogError("Json failed: " + e.message);
      return null;
    }
    /*
      >Json({"colors": [{
        "color": "black",
        "code": {   "rgba": [255,255,255,1],
                    "hex": "#000"}},{
        "color": "white",
        "code": {     "rgba": [0,0,0,1],
                      "hex": "#FFF"}}]
      })
      <"{"colors":[{"color":"black","code":{"rgba":[255,255,255,1],"hex":"#000"}},{"color":"white","code":{"rgba":[0,0,0,1],"hex":"#FFF"}}]}"
    */
  }
  
  
  
  
  
  /*********************************************************/
  
  // Get head of text, using separator
  function Head (text, sep) {
    if (text == null) return text;
    var pos = text.indexOf(sep);
    if (pos >= 0) {
      return text.substr(0, pos);
    } else {
      return text.substr(pos + 1);
    }
  }
  
  /*********************************************************/
  
  
  
  
  
  // Get rest of text, using separator
  function Rest (text, sep) {
    if (text == null) return text;
    var pos = text.indexOf(sep);
    if (pos >= 0) {
      return text.substr(pos + 1);
    } else {
      return null;
    }
    /*
      >Rest('hello','')
      <"ello"
      >Rest('hello','e')
      <"llo"
    */
  }
  
  // Text has word, using separator
  function HasWord (words, word, sep) {
    if ((Len(words) < 1) || (Len(word) < 1)) return false;
    return Pos(sep + words + sep, sep + word + sep) >= 0;
    /*
      >var h = 'hello';
      >var w = 'word';
      >var m = 'word';
      >HasWord(m,w)
      <true
      >HasWord(h,w)
      <false
    */
  }
  
  // Text has prefix
  function IsPrefix (text, prefix) {
    if ((Len(text) < 1) || (Len(prefix) < 1)) return false;
    return Pos(text, prefix) == 0;
    /*
      >IsPrefix('hello','h')
      <true
    */
  }
  
  // Get text without prefix
  function PrefixRest (text, prefix) {
    if ((Len(text) < 1) || (Len(prefix) < 1)) return text;
    if (Pos(text, prefix) == 0) {
      return Copy(text, Len(prefix));
    } else {
      return null;
    }
    /*
      >PrefixRest('hello','h')
      <"ello"
    */
  }
  
  
  // Copy text starting at pos
  // @len - optional - text size to copy
  function Copy (text, pos, len) {
    if (text == null) return text;
    if (len == null) {
      return text.substr(pos);
    } else {
      return text.substr(pos, len);
    }
    /*
      >Copy('hello',3,1)
      <"l"
      >Copy('hello',1,4)
      <"ello"
      >Copy('hello',1,2)
      <"el"
    */
  }
  
  // Copy text starting at pos1
  // @pos2 - optional - ending position
  function Slice (text, pos1, pos2) {
    if (text == null) return text;
    if (pos2 == null) {
      return text.slice(pos1);
    } else {
      return text.slice(pos1, pos2);
    }
    /*
      >Slice('hello_world',2,5)
      <"llo"
      >Slice('hello_world',2,7)
      <"llo_w"
    */
  }
  
  // Replace first text a with b
  function Replace (text, a, b) {
    if (text == null) return text;
    return Str(text).replace(Str(a), Str(b));
    /*
      >Replace('hello_world','llo','llllllo')
      <"hellllllo_world"
    */
  }
  
  // Replace all text a with b
  function ReplaceAll (text, a, b) {
    if (text == null) return text;
    return Str(text).split(Str(a)).join(Str(b));
    /*
      >ReplaceAll('hello_world','llo','11')
      <"he11_world"
    */
  }
  
  
  
  /*********************************************************/
  // Repeat text
  function Repeat (text, repeat) {
    if (text == null) return text;
    return new Array(repeat + 1).join(text);
  }
  /*********************************************************
  >Repeat('hello_world','llo')
  <"llo1"
  >Repeat('hello_world','')
  <"1"
  >Repeat('1','1')
  <"11"
  >Repeat('1','')
  <"1"
  >Repeat('hello','')
  <"1"
  >Repeat('hello','hello')
  <"hello1"
  *********************************************************/
  
  
  
  // Get text with spacer at left
  // @len - text size
  function SpacerLeft (text, spacer, len) {
    if (text == null) return text;
    return (Repeat(spacer, len) + text).substr(-len);
  }
  
  // Get text with spacer at right
  // @len - text size
  function SpacerRight (text, spacer, len) {
    if (text == null) return text;
    return (text + Repeat(spacer, len)).substr(0, len);
  }
  
  // Get value with 0 at left, until size = 2
  // Example: 5 -> 05
  function Zero2 (value) {
    return SpacerLeft(value, '0', 2);
  }
  
  // Replace in text tag (predef. '*')
  // Tag starts with '{' and ends with '}'
  // Example: aaa{*}ccc + bbb -> aaabbbccc
  function Tag (text, value, tag) {
    if (tag == null) tag = '*';
    return ReplaceAll(text, '{' + tag + '}', value);
  }
  
  // Upper case of text
  function Upper (text) {
    text = Str(text);
    if (text == null) return text;
    return text.toUpperCase();
  }
  
  // Lower case of text
  function Lower (text) {
    text = Str(text);
    if (text == null) return text;
    return text.toLowerCase();
  }
  
  // Remove text accents
  // Example: Ã -> A
  function Ascii (text) {
    var map = {
        'Á': 'A', 'á': 'a', 'À': 'A', 'à': 'a', 'Ã': 'A', 'ã': 'a', 'Â': 'A', 'â': 'a', 'Ä': 'A', 'ä': 'a', 'Å': 'A', 'å': 'a',
        'É': 'E', 'é': 'e', 'È': 'E', 'è': 'e', 'Ê': 'E', 'ê': 'e', 'Ë': 'E', 'ë': 'e',
        'Í': 'I', 'í': 'i', 'Ì': 'I', 'ì': 'i', 'Î': 'I', 'î': 'i', 'Ï': 'I', 'ï': 'i',
        'Ó': 'O', 'ó': 'o', 'Ò': 'O', 'ò': 'o', 'Õ': 'O', 'õ': 'o', 'Ô': 'O', 'ô': 'o', 'Ö': 'O', 'ö': 'o',
        'Ú': 'U', 'ú': 'u', 'Ù': 'U', 'ù': 'u', 'Û': 'U', 'û': 'u', 'Ü': 'U', 'ü': 'u',
        'Ç': 'C', 'ç': 'c', 'Ñ': 'N', 'ñ': 'n',
    };
    return Str(text).replace(/[^A-Za-z0-9\[\] ]/g, function(c){ return map[c] || c})
  }
  
  // LOGS
  function LogError(text) {
    console.error(text);
  }
  
  function LogWarn(text) {
    console.warn(text);
  }
  
  function LogInfo(text) {
    console.info(text);
  }
  
  function LogShow(text) {
    console.log(text);
  }
  


  /*
 * JQUERY
 * ATTR/PROP/ID
 * SHOW/HIDE
 * EACH
 * CSS
 * WIDTH/HEIGHT
 * HTML/TEXT
 * LABEL
*/



// JQUERY

function J(element) {
	return $(element);
	/*
		>J('.bg');
		<[div#bg.bg]
	*/
}

/*********************************************************/
function J_View(view, child) {
  return view.$(child);
}
/*********************************************************
>var p = $$('#page')
>p;
<[div#page.page]
>var pi = $$('.page_item')
>pi;
[div.page_item, div.page_item, div.page_item, div.page_item]
J_View(p,pi)

<<Uncaught TypeError: 
<<frontend.js:26 
<<view.$ is not a function
**********************************************************/

/*********************************************************/
function J_Event(ev) {
  return $(ev.currentTarget);
}
/**********************************************************
 $(".bills").click(function(event){
 alert(event.currentTarget === this);
});  
**********************************************************/

function J_Child(element, child) {
  return $(element).find(child);
  /*
    >J_Child('#page', '.page_item');
    <[div.page_item, div.page_item, div.page_item, div.page_item]
  */
}

function J_Children(element) {
  return $(element).children();
  /*
    >J_Children('#page');
    <[div.page_item, div.page_item, div.page_item, div.page_item]
  */
}

function J_Clone(element) {
  return $(element).clone();
  /*
    >J_Clone('#page');
    <[div#page.page]
  */
}

// ATTR/PROP/ID
function GetId(element) {
  return $(element).attr('id');
  /*
    <div id="pageMain" class="page">
    >GetId('.page');
    <"pageMain"
  */
}

function SetId(element, id) {
  $(element).attr('id', id);
  /*
    >var x = $('#pageMain') 
    >x;
    <[div#pageMain.page]
    >SetId('.page', 'page')
    >x;
    >[div#page.page]
  */
}

function GetAttr(element, attr) {
  return $(element).attr(attr);
  /*
    >var x = $('#bills') ;
    >x;
    <[a#bills.bills]
    >GetAttr(x, 'href');
    >"bills.html"
  */
}

function SetAttr(element, attr, value) {
  $(element).attr(attr, value);
  /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >SetAttr(x, 'href', 'index.html');
    >GetAttr(x, 'href');
    >"index.html"
  */
}

function GetProp(element, prop) {
  return $(element).prop(prop);
  /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >GetProp(x, 'id');
    >"bills"
  */
}

function SetProp(element, prop, value) {
  $(element).prop(prop, value);
  /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >SetProp(x, 'id', 'billsMain');
    >x;
    >[a#billsMain.bills]
  */
}

// SHOW/HIDE
function IsShow(element) {
  return $(element).is(":visible");
  /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >IsShow(x);
    <true
  */
}

function Show(element) {
  $(element).show();
  /*
    >var x = $('#bills');
    ><a id="bills" style="display: none;"
    >Show(x);
    <<a id="bills" style="display: block;"
  */
}

function Hide(element) {
  $(element).hide();
  /*
    >var x = $('#bills');
    ><a id="bills" style="display: block;"
    >Hide(x);
    <<a id="bills" style="display: none;"
  */
}

function ShowHide(isShow, element) {
	if (isShow) Show(element);
  else Hide(element);
  /*
    >var x = $('#bills');
    ><a id="bills" style="display: block;"
    >ShowHide(false, x)
    <<a id="bills" style="display: none;"
    >ShowHide(true, x)
    <<a id="bills" style="display: block;"
  */
}

// EACH
/*********************************************************/
function Each(element, callback) {
  $(element).each(callback);
}
/*********************************************************/

// CSS
/*********************************************************/
//fix error from >>Array.isArray is not a function
if (typeof Array.isArray != "function"){
  Array.isArray = function(arr){
      return arr != undefined && arr.constructor == Array
  }
}
/*********************************************************/


function HasCss(element, css) {
  return $(element).hasClass(css);
    /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >HasCss(x, 'bills');
    <true
  */
}

function GetCss(element) {
  return GetAttr(element, 'class');
  /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >GetCss(x);
    <'bills'
  */
}

function SetCss(element, css) {
  $(element).removeClass().addClass(css);
  /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >SetCss(x, 'hello');
    >x;
    <[a#bills.hello]
  */
}


/*********************************************************/
function SetCssHtml(element, css) {
  $(element).css(css);
}
/*********************************************************/


function SetCssValue(element, property, css) {
  $(element).css(property, css);
  /*
    >var x = $('#bills');
    >x;
    <><a id="bills"
    >SetCssValue(x, 'color', 'red');
    >x;
    <><a id="bills" style="color: red;"
  */
}

function CssAdd(element, css) {
	if (css == null) return;
  $(element).addClass(css);
  /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >CssAdd(x, 'hello');
    >x;
    <[a#bills.bills.hello]
  */
}

function CssRemove(element, css) {
	if (css == null) return;
  $(element).removeClass(css);
  /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >CssRemove(x, 'hello');
    >x;
    <[a#bills.bills]
  */
}

function CssAddRemove(isAdd, element, css) {
	if (isAdd) CssAdd(element, css);
  else CssRemove(element, css);
  /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >CssAddRemove(false, x, 'bills');
    >x;
    <[a#bills]
    >CssAddRemove(true, x, 'bills');
    >x;
    <[a#bills.bills]
  */
}

function CssSwitch(element, css) {
	if (css == null) return;
  $(element).toggleClass(css);
  /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >CssAdd(x, 'hello');
    >x;
    <[a#bills.bills.hello]
    >CssSwitch(x,'hello');
    >x;
    <[a#bills.bills]
  */
}

function CssJoin(css_args) {
	var css = null;
	for (var i = 0; i < arguments.length; i++) css = Join(css, ' ', arguments[i]);
  return Str(css);
  /*
    >var x = $('#bills');
    >x;
    <[a#bills.bills]
    >CssJoin(x);
    >"[object Object]"
    >CssJoin('hello');
    <"hello"
  */
}

function Css(css) {
  return Str(Cat(' class="', css, '"'));
  /*
    >Css('hello');
    <" class="hello""
  */
}

// Add space before String
function CssCat(css) {
  return Str(Cat(' ', css));
  /*
    >CssCat('hello');
    <" hello""
  */
}

// Add class to HTML tag
function AppCssAdd(css) {
  CssAdd('HTML', css);
  /*
    >AppCssAdd('hello');
    <<html class="hello"
  */
}

// Remove class to HTML tag
function AppCssRemove(css) {
  CssRemove('HTML', css);
  /*
    >AppCssAdd('hello');
    <<html class=" "
  */
}

// WIDTH/HEIGHT
function GetWidth(element) {
  return $(element).width();
  /*
    >var x = $('#bills');
    >GetWidth(x);
    <50
  */
}

function SetWidth(element, width) {
  $(element).width(width);
  /*
    >var x = $('#bills');
    >SetWidth(x, 200);
    >GetWidth(x);
    <200
  */
}

function GetHeight(element) {
  return $(element).height();
   /*
    >var x = $('#bills');
    >GetHeight(x);
    <50
  */
}

function SetHeight(element, height) {
  $(element).height(height);
  /*
    >var x = $('#bills');
    >SetHeight(x, 200);
    >GetHeight(x);
    <200
  */
}


// HTML/TEXT

// Format css
function HtmlCss(text, css) {
	if (css == null) return text;
  return Cat('<span class="' + Str(css) + '">', text, '</span>');
  /*
    >HtmlCss('hello world', 'hello')
    <"<span class="hello">hello world</span>"
  */
}

// Format css (use div)
function HtmlDiv(text, css) {
	if (css == null) return text;
  return Cat('<div class="' + Str(css) + '">', text, '</div>');
   /*
    >HtmlDiv('hello world', 'hello')
    <"<div class="hello">hello world</div>"
  */
}

// Div id
function HtmlDivId(id, text, css) {
  return '<div id="' + Str(id) + '" class="' + Str(css) + '">' + Str(text) + '</div>';
  /*
    >HtmlDivId('hl', 'hello world', 'hello')
    <"<div id="hl" class="hello">hello world</div>"
  */
}

// Html block of label
function HtmlLabel(label) {
  return Html(Label(label));
  /*
    >HtmlLabel('Lang');
    <"#Lang"
  */
}

// Remove text that destroys html
function HtmlText(text) {
  return Html(text);
    /*
    >HtmlText('<div>hello world</div>');
    <""&lt;div&gt;hello world&lt;&#x2F;div&gt;"
  */
}

// No wrap text
function HtmlNoWrap(text) {
  return Cat('<span class="html_nowrap">', text, '</span>');
  /*
    >HtmlNoWrap('hello');
    <"<span class="html_nowrap">hello</span>"
  */
}

// Js
function HtmlJs(js) {
	return '<script>' + Str(js) + '</script>';
  /*
    >HtmlJs(alert('hello'))
    <POPUP_ALERT => 'hello'
    <"<script></script>"
  */
}


// JS to set html
function SetHtml(element, text) {
  $(element).html(text);
  /*
    >var x = $('#bills');
    >x;
    <<a id="bills">bills</a>
    >SetHtml(x, 'hello')
    >x;
    <<a id="bills">hello</a>
  */
}

// JS to get html
function GetHtml(element) {
  return $(element).html();
  /* 
    >var x = $('#bills');
    >x;
    <<a id="bills">bills</a>
    >GetHtml(x)
    <"bills"
  */
}

// JS to append html
// element set inside html
function HtmlAppend(element, html) {
  $(element).append(html);
  /* 
    >var y = $('#page');
    >var x = $('#bills');
    >HtmlAppend(y, x)
    <<div id="page">
       <a id="bills"> bills</a>
     </div>
  */
  
}

// JS to append (before) html
function HtmlBefore(element, html) {
  $(element).before(html);
  /* 
    <<div id="page"></div>
     <a id="bills"></a>
    >var x = $('#bills');
    >var y = $('#page');
    >HtmlBefore(y, x)
    <<a id="bills"></a>
    <div id="page"></div>
  */
}


// JS to (after) html
function HtmlAfter(element, html) {
    $(element).after(html);
}

// JS to remove html element
function HtmlRemove(element) {
	$(element).remove();
}

// JS to get text
function GetText(element) {
  return $(element).prop('innerText');
  /* 
    >var x = $('#bills');
    >x;
    <<a id="bills">bills</a>
    >GetText(x)
    <"bills"
  */
}

// JS to set text
function SetText(element, text) {
  $(element).prop('innerText', text);
  /* 
    >var x = $('#bills');
    >x;
    <<a id="bills">bills</a>
    >SetText(x, 'hello')
    <<a id="bills">hello</a>
  */
}

// Br
function HtmlBr(times) {
	if (times == null) times = 1;
	return Repeat('<BR />', times);
}


// Cell -> Label/Text
function HtmlCell(cell) {
	// Bool
	if (IsBool(cell)) return Label(cell ? 'CellTrue' : 'CellFalse');
	// Text
  return HtmlText(cell);
  /*
    >HtmlCell('<div>hello world</div>')
    <"&lt;div&gt;hello world&lt;&#x2F;div&gt;"
  */
}

// Switch visible block
function HtmlSwitch(text, cut, css, etc) {
	if (Len(text) > cut) {
		return '<div class="html_switch ' + Str(css) + "\" onclick=\"CssSwitch(this, 'html_switch_all')\">" +
			Copy(text, 0, cut) +
			((etc === null) ? '' : HtmlCss((etc === undefined) ? '...' : etc, 'html_switch_etc')) +
			HtmlCss(Copy(text, cut), 'html_switch_rest') +
			'</div>';
	} else {
		return htmlDiv(text, css);
	}
}


// LABEL

// Get text from label, see Label
// @label - label name to convert to text
// @predef - optional - predefined text when label not found
function Label(name, undef) {
	if (!name || !Label) return (undef !== undefined) ? undef : '';
	var text = eval('App.Label' + name);
	if (text != null) return text;
	return (undef !== undefined) ? undef : ('#' + name);
}

function HasLabel(name) {
	return Label(name, null) != null;
}





function FormatAmount(amount, format, decimals)
{
    if (amount == null) return amount;

    amount += '';
    var value = Head(amount, '.');
    if (!value)
    {
        value = 0;
    }
    var decimal = Rest(amount, '.');
    if (decimals == null) decimals = App.Decimals;
    if (!decimal && (decimals > 0))
    {
        decimal = 0;
    }
    return FormatPay(value, decimal, format);
}



function FormatPay(value, decimal, format, groupSep, decimals)
{
    if (value == null) return value;

    var amount = Str(Math.round(value));

    // Decimal
    if (decimals == null) decimals = App.Decimals;
   

    // Predef -> Amount.Format
    if ((format == null) || (format === true))
    {
        return Replace(App.Format, '*', amount);
    }
    else if (format !== false)
    {
        return Replace(format, '*', amount);
    }
    else
    {
        return amount;
    }
}
