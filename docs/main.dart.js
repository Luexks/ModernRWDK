(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isi=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isn)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="i"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="D"){processStatics(init.statics[b1]=b2.D,b3)
delete b2.D}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$D=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$S=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$D=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b6,b7,b8,b9,c0){var g=0,f=b7[g],e
if(typeof f=="string")e=b7[++g]
else{e=f
f=b8}var d=[b6[b8]=b6[f]=e]
e.$stubName=b8
c0.push(b8)
for(g++;g<b7.length;g++){e=b7[g]
if(typeof e!="function")break
if(!b9)e.$stubName=b7[++g]
d.push(e)
if(e.$stubName){b6[e.$stubName]=e
c0.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b7[g]
var a0=b7[g]
b7=b7.slice(++g)
var a1=b7[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b7[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b7[2]
if(typeof b0=="number")b7[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b7,b9,b8,a9)
b6[b8].$getter=e
e.$getterStub=true
if(b9){init.globalFunctions[b8]=e
c0.push(a0)}b6[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}var b2=b7.length>b1
if(b2){d[0].$reflectable=1
d[0].$reflectionInfo=b7
for(var c=1;c<d.length;c++){d[c].$reflectable=2
d[c].$reflectionInfo=b7}var b3=b9?init.mangledGlobalNames:init.mangledNames
var b4=b7[b1]
var b5=b4
if(a0)b3[a0]=b5
if(a4)b5+="="
else if(!a5)b5+=":"+(a2+a7)
b3[b8]=b5
d[0].$reflectionName=b5
d[0].$metadataIndex=b1+1
if(a7)b6[b4+"*"]=d[0]}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.f4"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.f4"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.f4(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.ac=function(){}
var dart=[["","",,H,{"^":"",vW:{"^":"i;a"}}],["","",,J,{"^":"",
t:function(a){return void 0},
dz:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
du:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.fa==null){H.ue()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.f(new P.ko("Return interceptor for "+H.d(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$ek()]
if(v!=null)return v
v=H.uq(a)
if(v!=null)return v
if(typeof a=="function")return C.U
y=Object.getPrototypeOf(a)
if(y==null)return C.G
if(y===Object.prototype)return C.G
if(typeof w=="function"){Object.defineProperty(w,$.$get$ek(),{value:C.z,enumerable:false,writable:true,configurable:true})
return C.z}return C.z},
n:{"^":"i;",
O:function(a,b){return a===b},
gab:function(a){return H.bq(a)},
A:["eK",function(a){return H.de(a)}],
d1:["eJ",function(a,b){throw H.f(P.iu(a,b.geb(),b.gef(),b.ged(),null))},null,"ghB",2,0,null,6],
gaf:function(a){return new H.cB(H.f8(a),null)},
"%":"CanvasGradient|CanvasPattern|DOMImplementation|MediaError|PositionError|PushMessageData|Range|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLRenderingContext"},
nx:{"^":"n;",
A:function(a){return String(a)},
gab:function(a){return a?519018:218159},
gaf:function(a){return C.ad},
$isbH:1},
ie:{"^":"n;",
O:function(a,b){return null==b},
A:function(a){return"null"},
gab:function(a){return 0},
gaf:function(a){return C.a7},
d1:[function(a,b){return this.eJ(a,b)},null,"ghB",2,0,null,6]},
el:{"^":"n;",
gab:function(a){return 0},
gaf:function(a){return C.a6},
A:["eM",function(a){return String(a)}],
$isig:1},
pB:{"^":"el;"},
cC:{"^":"el;"},
cr:{"^":"el;",
A:function(a){var z=a[$.$get$cS()]
return z==null?this.eM(a):J.aF(z)},
$isef:1,
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
co:{"^":"n;$ti",
cN:function(a,b){if(!!a.immutable$list)throw H.f(new P.a1(b))},
bj:function(a,b){if(!!a.fixed$length)throw H.f(new P.a1(b))},
S:function(a,b){this.bj(a,"add")
a.push(b)},
an:function(a,b){var z
this.bj(a,"remove")
for(z=0;z<a.length;++z)if(J.v(a[z],b)){a.splice(z,1)
return!0}return!1},
ar:function(a,b){var z
this.bj(a,"addAll")
for(z=J.a7(b);z.m();)a.push(z.gq())},
a4:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.f(new P.a9(a))}},
b1:function(a,b){return new H.bV(a,b,[H.a2(a,0),null])},
a9:function(a,b){if(b>>>0!==b||b>=a.length)return H.c(a,b)
return a[b]},
gaa:function(a){if(a.length>0)return a[0]
throw H.f(H.aq())},
gal:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.f(H.aq())},
dg:function(a,b,c,d,e){var z,y,x
this.cN(a,"setRange")
P.eD(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.R(P.ab(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.f(H.nv())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.c(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.c(d,x)
a[b+y]=d[x]}},
bX:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.f(new P.a9(a))}return!1},
bU:function(a,b){var z
this.cN(a,"sort")
z=b==null?P.u_():b
H.cx(a,0,a.length-1,z)},
bD:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.v(a[z],b))return z
return-1},
bo:function(a,b){return this.bD(a,b,0)},
bG:function(a,b,c){var z
if(c.aJ(0,0))return-1
if(c.bp(0,a.length))c=a.length-1
for(z=c;z>=0;--z){if(z>=a.length)return H.c(a,z)
if(J.v(a[z],b))return z}return-1},
c8:function(a,b){return this.bG(a,b,null)},
M:function(a,b){var z
for(z=0;z<a.length;++z)if(J.v(a[z],b))return!0
return!1},
gW:function(a){return a.length===0},
A:function(a){return P.d9(a,"[","]")},
gB:function(a){return new J.c7(a,a.length,0,null,[H.a2(a,0)])},
gab:function(a){return H.bq(a)},
gk:function(a){return a.length},
sk:function(a,b){this.bj(a,"set length")
if(b<0)throw H.f(P.ab(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.a5(a,b))
if(b>=a.length||b<0)throw H.f(H.a5(a,b))
return a[b]},
i:function(a,b,c){this.cN(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.a5(a,b))
if(b>=a.length||b<0)throw H.f(H.a5(a,b))
a[b]=c},
$isad:1,
$asad:I.ac,
$ism:1,
$asm:null,
$isl:1,
$asl:null,
$isk:1,
$ask:null},
vV:{"^":"co;$ti"},
c7:{"^":"i;a,b,c,d,$ti",
gq:function(){return this.d},
m:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.f(H.r(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
cp:{"^":"n;",
aM:function(a,b){var z
if(typeof b!=="number")throw H.f(H.X(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gc7(b)
if(this.gc7(a)===z)return 0
if(this.gc7(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gc7:function(a){return a===0?1/a<0:a<0},
dJ:function(a){return Math.abs(a)},
ek:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.f(new P.a1(""+a+".toInt()"))},
dS:function(a){var z,y
if(a>=0){if(a<=2147483647){z=a|0
return a===z?z:z+1}}else if(a>=-2147483648)return a|0
y=Math.ceil(a)
if(isFinite(y))return y
throw H.f(new P.a1(""+a+".ceil()"))},
aG:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.f(new P.a1(""+a+".floor()"))},
cb:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.f(new P.a1(""+a+".round()"))},
cO:function(a,b,c){if(this.aM(b,c)>0)throw H.f(H.X(b))
if(this.aM(a,b)<0)return b
if(this.aM(a,c)>0)return c
return a},
j:function(a){return a},
bM:function(a,b){var z
if(b>20)throw H.f(P.ab(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gc7(a))return"-"+z
return z},
el:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.f(P.ab(b,2,36,"radix",null))
z=a.toString(b)
if(C.h.bl(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.R(new P.a1("Unexpected toString result: "+z))
x=J.L(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.h.X("0",w)},
A:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gab:function(a){return a&0x1FFFFFFF},
bP:function(a){return-a},
n:function(a,b){if(typeof b!=="number")throw H.f(H.X(b))
return a+b},
ae:function(a,b){if(typeof b!=="number")throw H.f(H.X(b))
return a-b},
aI:function(a,b){if(typeof b!=="number")throw H.f(H.X(b))
return a/b},
X:function(a,b){if(typeof b!=="number")throw H.f(H.X(b))
return a*b},
cg:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
bg:function(a,b){if((a|0)===a)if(b>=1||!1)return a/b|0
return this.dG(a,b)},
as:function(a,b){return(a|0)===a?a/b|0:this.dG(a,b)},
dG:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.f(new P.a1("Result of truncating division is "+H.d(z)+": "+H.d(a)+" ~/ "+b))},
eC:function(a,b){if(b<0)throw H.f(H.X(b))
return b>31?0:a<<b>>>0},
di:function(a,b){var z
if(b<0)throw H.f(H.X(b))
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
cG:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
ep:function(a,b){return(a&b)>>>0},
eS:function(a,b){if(typeof b!=="number")throw H.f(H.X(b))
return(a^b)>>>0},
aJ:function(a,b){if(typeof b!=="number")throw H.f(H.X(b))
return a<b},
ao:function(a,b){if(typeof b!=="number")throw H.f(H.X(b))
return a>b},
cf:function(a,b){if(typeof b!=="number")throw H.f(H.X(b))
return a<=b},
bp:function(a,b){if(typeof b!=="number")throw H.f(H.X(b))
return a>=b},
gaf:function(a){return C.ag},
$isaC:1},
id:{"^":"cp;",
gaf:function(a){return C.af},
$isa6:1,
$isaC:1,
$isx:1},
ic:{"^":"cp;",
gaf:function(a){return C.ae},
$isa6:1,
$isaC:1},
cq:{"^":"n;",
bl:function(a,b){if(b<0)throw H.f(H.a5(a,b))
if(b>=a.length)H.R(H.a5(a,b))
return a.charCodeAt(b)},
b4:function(a,b){if(b>=a.length)throw H.f(H.a5(a,b))
return a.charCodeAt(b)},
cK:function(a,b,c){if(c>b.length)throw H.f(P.ab(c,0,b.length,null,null))
return new H.rl(b,a,c)},
cJ:function(a,b){return this.cK(a,b,0)},
d0:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.f(P.ab(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.bl(b,c+y)!==this.b4(a,y))return
return new H.eJ(c,b,a)},
n:function(a,b){if(typeof b!=="string")throw H.f(P.cO(b,null,null))
return a+b},
e2:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.b3(a,y-z)},
hN:function(a,b,c){return H.dC(a,b,c)},
hO:function(a,b,c){return H.av(a,b,c,null)},
eD:function(a,b){if(b==null)H.R(H.X(b))
if(typeof b==="string")return a.split(b)
else if(b instanceof H.ii&&b.gdD().exec("").length-2===0)return a.split(b.gfo())
else return this.fg(a,b)},
fg:function(a,b){var z,y,x,w,v,u,t
z=H.E([],[P.y])
for(y=J.l4(b,a),y=y.gB(y),x=0,w=1;y.m();){v=y.gq()
u=v.gdj(v)
t=v.ge1()
w=t-u
if(w===0&&x===u)continue
z.push(this.aX(a,x,u))
x=t}if(x<a.length||w>0)z.push(this.b3(a,x))
return z},
eE:function(a,b,c){var z
if(c>a.length)throw H.f(P.ab(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.lh(b,a,c)!=null},
cl:function(a,b){return this.eE(a,b,0)},
aX:function(a,b,c){var z
if(typeof b!=="number"||Math.floor(b)!==b)H.R(H.X(b))
if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.R(H.X(c))
z=J.M(b)
if(z.aJ(b,0))throw H.f(P.bB(b,null,null))
if(z.ao(b,c))throw H.f(P.bB(b,null,null))
if(J.S(c,a.length))throw H.f(P.bB(c,null,null))
return a.substring(b,c)},
b3:function(a,b){return this.aX(a,b,null)},
hS:function(a){return a.toLowerCase()},
hT:function(a){return a.toUpperCase()},
hU:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.b4(z,0)===133){x=J.nz(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.bl(z,w)===133?J.nA(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
X:function(a,b){var z,y
if(typeof b!=="number")return H.C(b)
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.f(C.K)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
ee:function(a,b,c){var z=b-a.length
if(z<=0)return a
return this.X(c,z)+a},
bD:function(a,b,c){var z
if(c>a.length)throw H.f(P.ab(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
bo:function(a,b){return this.bD(a,b,0)},
bG:function(a,b,c){var z,y
if(b==null)H.R(H.X(b))
c=a.length
if(typeof b==="string"){z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)}for(z=J.aA(b),y=c;y>=0;--y)if(z.d0(b,a,y)!=null)return y
return-1},
c8:function(a,b){return this.bG(a,b,null)},
dX:function(a,b,c){if(c>a.length)throw H.f(P.ab(c,0,a.length,null,null))
return H.v5(a,b,c)},
M:function(a,b){return this.dX(a,b,0)},
gW:function(a){return a.length===0},
aM:function(a,b){var z
if(typeof b!=="string")throw H.f(H.X(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
A:function(a){return a},
gab:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gaf:function(a){return C.a8},
gk:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.a5(a,b))
if(b>=a.length||b<0)throw H.f(H.a5(a,b))
return a[b]},
$isad:1,
$asad:I.ac,
$isy:1,
$isez:1,
D:{
ih:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
nz:function(a,b){var z,y
for(z=a.length;b<z;){y=C.h.b4(a,b)
if(y!==32&&y!==13&&!J.ih(y))break;++b}return b},
nA:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.h.bl(a,z)
if(y!==32&&y!==13&&!J.ih(y))break}return b}}}}],["","",,H,{"^":"",
aq:function(){return new P.W("No element")},
nw:function(){return new P.W("Too many elements")},
nv:function(){return new P.W("Too few elements")},
cx:function(a,b,c,d){if(c-b<=32)H.k5(a,b,c,d)
else H.k4(a,b,c,d)},
k5:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.L(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.S(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.i(a,w,y.h(a,v))
w=v}y.i(a,w,x)}},
k4:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.e.as(c-b+1,6)
y=b+z
x=c-z
w=C.e.as(b+c,2)
v=w-z
u=w+z
t=J.L(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.S(d.$2(s,r),0)){n=r
r=s
s=n}if(J.S(d.$2(p,o),0)){n=o
o=p
p=n}if(J.S(d.$2(s,q),0)){n=q
q=s
s=n}if(J.S(d.$2(r,q),0)){n=q
q=r
r=n}if(J.S(d.$2(s,p),0)){n=p
p=s
s=n}if(J.S(d.$2(q,p),0)){n=p
p=q
q=n}if(J.S(d.$2(r,o),0)){n=o
o=r
r=n}if(J.S(d.$2(r,q),0)){n=q
q=r
r=n}if(J.S(d.$2(p,o),0)){n=o
o=p
p=n}t.i(a,y,s)
t.i(a,w,q)
t.i(a,x,o)
t.i(a,v,t.h(a,b))
t.i(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.v(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
h=J.t(i)
if(h.O(i,0))continue
if(h.aJ(i,0)){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
h=J.M(i)
if(h.ao(i,0)){--l
continue}else{g=l-1
if(h.aJ(i,0)){t.i(a,k,t.h(a,m))
f=m+1
t.i(a,m,t.h(a,l))
t.i(a,l,j)
l=g
m=f
break}else{t.i(a,k,t.h(a,l))
t.i(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(J.b2(d.$2(j,r),0)){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else if(J.S(d.$2(j,p),0))for(;!0;)if(J.S(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.b2(d.$2(t.h(a,l),r),0)){t.i(a,k,t.h(a,m))
f=m+1
t.i(a,m,t.h(a,l))
t.i(a,l,j)
m=f}else{t.i(a,k,t.h(a,l))
t.i(a,l,j)}l=g
break}}e=!1}h=m-1
t.i(a,b,t.h(a,h))
t.i(a,h,r)
h=l+1
t.i(a,c,t.h(a,h))
t.i(a,h,p)
H.cx(a,b,m-2,d)
H.cx(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.v(d.$2(t.h(a,m),r),0);)++m
for(;J.v(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(J.v(d.$2(j,r),0)){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else if(J.v(d.$2(j,p),0))for(;!0;)if(J.v(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.b2(d.$2(t.h(a,l),r),0)){t.i(a,k,t.h(a,m))
f=m+1
t.i(a,m,t.h(a,l))
t.i(a,l,j)
m=f}else{t.i(a,k,t.h(a,l))
t.i(a,l,j)}l=g
break}}H.cx(a,m,l,d)}else H.cx(a,m,l,d)},
l:{"^":"k;$ti",$asl:null},
bn:{"^":"l;$ti",
gB:function(a){return new H.im(this,this.gk(this),0,null,[H.ap(this,"bn",0)])},
a4:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){b.$1(this.a9(0,y))
if(z!==this.gk(this))throw H.f(new P.a9(this))}},
gW:function(a){return this.gk(this)===0},
gaa:function(a){if(this.gk(this)===0)throw H.f(H.aq())
return this.a9(0,0)},
gal:function(a){if(this.gk(this)===0)throw H.f(H.aq())
return this.a9(0,this.gk(this)-1)},
M:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){if(J.v(this.a9(0,y),b))return!0
if(z!==this.gk(this))throw H.f(new P.a9(this))}return!1},
da:function(a,b){return this.eL(0,b)},
b1:function(a,b){return new H.bV(this,b,[H.ap(this,"bn",0),null])},
bL:function(a,b){var z,y,x
z=H.E([],[H.ap(this,"bn",0)])
C.f.sk(z,this.gk(this))
for(y=0;y<this.gk(this);++y){x=this.a9(0,y)
if(y>=z.length)return H.c(z,y)
z[y]=x}return z},
cc:function(a){return this.bL(a,!0)}},
im:{"^":"i;a,b,c,d,$ti",
gq:function(){return this.d},
m:function(){var z,y,x,w
z=this.a
y=J.L(z)
x=y.gk(z)
if(this.b!==x)throw H.f(new P.a9(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.a9(z,w);++this.c
return!0}},
da:{"^":"k;a,b,$ti",
gB:function(a){return new H.nP(null,J.a7(this.a),this.b,this.$ti)},
gk:function(a){return J.aL(this.a)},
gW:function(a){return J.dI(this.a)},
gaa:function(a){return this.b.$1(J.fm(this.a))},
gal:function(a){return this.b.$1(J.fn(this.a))},
a9:function(a,b){return this.b.$1(J.cG(this.a,b))},
$ask:function(a,b){return[b]},
D:{
bA:function(a,b,c,d){if(!!J.t(a).$isl)return new H.dX(a,b,[c,d])
return new H.da(a,b,[c,d])}}},
dX:{"^":"da;a,b,$ti",$isl:1,
$asl:function(a,b){return[b]},
$ask:function(a,b){return[b]}},
nP:{"^":"ei;a,b,c,$ti",
m:function(){var z=this.b
if(z.m()){this.a=this.c.$1(z.gq())
return!0}this.a=null
return!1},
gq:function(){return this.a},
$asei:function(a,b){return[b]}},
bV:{"^":"bn;a,b,$ti",
gk:function(a){return J.aL(this.a)},
a9:function(a,b){return this.b.$1(J.cG(this.a,b))},
$asbn:function(a,b){return[b]},
$asl:function(a,b){return[b]},
$ask:function(a,b){return[b]}},
eM:{"^":"k;a,b,$ti",
gB:function(a){return new H.qI(J.a7(this.a),this.b,this.$ti)},
b1:function(a,b){return new H.da(this,b,[H.a2(this,0),null])}},
qI:{"^":"ei;a,b,$ti",
m:function(){var z,y
for(z=this.a,y=this.b;z.m();)if(y.$1(z.gq())===!0)return!0
return!1},
gq:function(){return this.a.gq()}},
i5:{"^":"i;$ti"},
eK:{"^":"i;fm:a<",
O:function(a,b){if(b==null)return!1
return b instanceof H.eK&&J.v(this.a,b.a)},
gab:function(a){var z,y
z=this._hashCode
if(z!=null)return z
y=J.aU(this.a)
if(typeof y!=="number")return H.C(y)
z=536870911&664597*y
this._hashCode=z
return z},
A:function(a){return'Symbol("'+H.d(this.a)+'")'}}}],["","",,H,{"^":"",
cE:function(a,b){var z=a.bB(b)
if(!init.globalState.d.cy)init.globalState.f.bK()
return z},
kZ:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.t(y).$ism)throw H.f(P.c6("Arguments to main must be a List: "+H.d(y)))
init.globalState=new H.rb(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$i9()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.qV(P.eo(null,H.cD),0)
x=P.x
y.z=new H.P(0,null,null,null,null,null,0,[x,H.eV])
y.ch=new H.P(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.ra()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.no,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.rc)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.V(null,null,null,x)
v=new H.dg(0,null,!1)
u=new H.eV(y,new H.P(0,null,null,null,null,null,0,[x,H.dg]),w,init.createNewIsolate(),v,new H.bw(H.dB()),new H.bw(H.dB()),!1,!1,[],P.V(null,null,null,null),null,null,!1,!0,P.V(null,null,null,null))
w.S(0,0)
u.dq(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.dt(a,{func:1,args:[,]}))u.bB(new H.v3(z,a))
else if(H.dt(a,{func:1,args:[,,]}))u.bB(new H.v4(z,a))
else u.bB(a)
init.globalState.f.bK()},
ns:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.nt()
return},
nt:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.f(new P.a1("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.f(new P.a1('Cannot extract URI from "'+z+'"'))},
no:[function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.dm(!0,[]).b9(b.data)
y=J.L(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.dm(!0,[]).b9(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.dm(!0,[]).b9(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.x
p=P.V(null,null,null,q)
o=new H.dg(0,null,!1)
n=new H.eV(y,new H.P(0,null,null,null,null,null,0,[q,H.dg]),p,init.createNewIsolate(),o,new H.bw(H.dB()),new H.bw(H.dB()),!1,!1,[],P.V(null,null,null,null),null,null,!1,!0,P.V(null,null,null,null))
p.S(0,0)
n.dq(0,o)
init.globalState.f.a.aY(new H.cD(n,new H.np(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bK()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.bK(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.bK()
break
case"close":init.globalState.ch.an(0,$.$get$ia().h(0,a))
a.terminate()
init.globalState.f.bK()
break
case"log":H.nn(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.Y(["command","print","msg",z])
q=new H.bE(!0,P.bX(null,P.x)).aK(q)
y.toString
self.postMessage(q)}else P.c2(y.h(z,"msg"))
break
case"error":throw H.f(y.h(z,"msg"))}},null,null,4,0,null,18,0],
nn:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.Y(["command","log","msg",a])
x=new H.bE(!0,P.bX(null,P.x)).aK(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.ah(w)
z=H.dw(w)
y=P.d0(z)
throw H.f(y)}},
nq:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.iQ=$.iQ+("_"+y)
$.iR=$.iR+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.bK(f,["spawned",new H.dn(y,x),w,z.r])
x=new H.nr(a,b,c,d,z)
if(e===!0){z.dM(w,w)
init.globalState.f.a.aY(new H.cD(z,x,"start isolate"))}else x.$0()},
rw:function(a){return new H.dm(!0,[]).b9(new H.bE(!1,P.bX(null,P.x)).aK(a))},
v3:{"^":"a:5;a,b",
$0:function(){this.b.$1(this.a.a)}},
v4:{"^":"a:5;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
rb:{"^":"i;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",D:{
rc:[function(a){var z=P.Y(["command","print","msg",a])
return new H.bE(!0,P.bX(null,P.x)).aK(z)},null,null,2,0,null,29]}},
eV:{"^":"i;aH:a>,b,c,hw:d<,fR:e<,f,r,hp:x?,hv:y<,h_:z<,Q,ch,cx,cy,db,dx",
dM:function(a,b){if(!this.f.O(0,a))return
if(this.Q.S(0,b)&&!this.y)this.y=!0
this.cH()},
hK:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.an(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.c(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.c(v,w)
v[w]=x
if(w===y.c)y.dA();++y.d}this.y=!1}this.cH()},
fD:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.t(a),y=0;x=this.ch,y<x.length;y+=2)if(z.O(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.c(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
hJ:function(a){var z,y,x
if(this.ch==null)return
for(z=J.t(a),y=0;x=this.ch,y<x.length;y+=2)if(z.O(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.R(new P.a1("removeRange"))
P.eD(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
eB:function(a,b){if(!this.r.O(0,a))return
this.db=b},
hl:function(a,b,c){var z=J.t(b)
if(!z.O(b,0))z=z.O(b,1)&&!this.cy
else z=!0
if(z){J.bK(a,c)
return}z=this.cx
if(z==null){z=P.eo(null,null)
this.cx=z}z.aY(new H.r2(a,c))},
hk:function(a,b){var z
if(!this.r.O(0,a))return
z=J.t(b)
if(!z.O(b,0))z=z.O(b,1)&&!this.cy
else z=!0
if(z){this.cY()
return}z=this.cx
if(z==null){z=P.eo(null,null)
this.cx=z}z.aY(this.ghx())},
hm:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.c2(a)
if(b!=null)P.c2(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.aF(a)
y[1]=b==null?null:J.aF(b)
for(x=new P.bs(z,z.r,null,null,[null]),x.c=z.e;x.m();)J.bK(x.d,y)},
bB:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.ah(u)
v=H.dw(u)
this.hm(w,v)
if(this.db===!0){this.cY()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.ghw()
if(this.cx!=null)for(;t=this.cx,!t.gW(t);)this.cx.eg().$0()}return y},
hj:function(a){var z=J.L(a)
switch(z.h(a,0)){case"pause":this.dM(z.h(a,1),z.h(a,2))
break
case"resume":this.hK(z.h(a,1))
break
case"add-ondone":this.fD(z.h(a,1),z.h(a,2))
break
case"remove-ondone":this.hJ(z.h(a,1))
break
case"set-errors-fatal":this.eB(z.h(a,1),z.h(a,2))
break
case"ping":this.hl(z.h(a,1),z.h(a,2),z.h(a,3))
break
case"kill":this.hk(z.h(a,1),z.h(a,2))
break
case"getErrors":this.dx.S(0,z.h(a,1))
break
case"stopErrors":this.dx.an(0,z.h(a,1))
break}},
d_:function(a){return this.b.h(0,a)},
dq:function(a,b){var z=this.b
if(z.I(a))throw H.f(P.d0("Registry: ports must be registered only once."))
z.i(0,a,b)},
cH:function(){var z=this.b
if(z.gk(z)-this.c.a>0||this.y||!this.x)init.globalState.z.i(0,this.a,this)
else this.cY()},
cY:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.aB(0)
for(z=this.b,y=z.ga5(z),y=y.gB(y);y.m();)y.gq().fd()
z.aB(0)
this.c.aB(0)
init.globalState.z.an(0,this.a)
this.dx.aB(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.c(z,v)
J.bK(w,z[v])}this.ch=null}},"$0","ghx",0,0,9]},
r2:{"^":"a:9;a,b",
$0:[function(){J.bK(this.a,this.b)},null,null,0,0,null,"call"]},
qV:{"^":"i;a,b",
h0:function(){var z=this.a
if(z.b===z.c)return
return z.eg()},
ei:function(){var z,y,x
z=this.h0()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.I(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gW(y)}else y=!1
else y=!1
else y=!1
if(y)H.R(P.d0("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gW(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.Y(["command","close"])
x=new H.bE(!0,new P.kx(0,null,null,null,null,null,0,[null,P.x])).aK(x)
y.toString
self.postMessage(x)}return!1}z.hG()
return!0},
dF:function(){if(self.window!=null)new H.qW(this).$0()
else for(;this.ei(););},
bK:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.dF()
else try{this.dF()}catch(x){z=H.ah(x)
y=H.dw(x)
w=init.globalState.Q
v=P.Y(["command","error","msg",H.d(z)+"\n"+H.d(y)])
v=new H.bE(!0,P.bX(null,P.x)).aK(v)
w.toString
self.postMessage(v)}}},
qW:{"^":"a:9;a",
$0:function(){if(!this.a.ei())return
P.qC(C.B,this)}},
cD:{"^":"i;a,b,c",
hG:function(){var z=this.a
if(z.ghv()){z.gh_().push(this)
return}z.bB(this.b)}},
ra:{"^":"i;"},
np:{"^":"a:5;a,b,c,d,e,f",
$0:function(){H.nq(this.a,this.b,this.c,this.d,this.e,this.f)}},
nr:{"^":"a:9;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.shp(!0)
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.dt(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.dt(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cH()}},
ks:{"^":"i;"},
dn:{"^":"ks;b,a",
ci:function(a,b){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gdB())return
x=H.rw(b)
if(z.gfR()===y){z.hj(x)
return}init.globalState.f.a.aY(new H.cD(z,new H.rd(this,x),"receive"))},
O:function(a,b){if(b==null)return!1
return b instanceof H.dn&&J.v(this.b,b.b)},
gab:function(a){return this.b.gcB()}},
rd:{"^":"a:5;a,b",
$0:function(){var z=this.a.b
if(!z.gdB())z.fc(this.b)}},
eX:{"^":"ks;b,c,a",
ci:function(a,b){var z,y,x
z=P.Y(["command","message","port",this,"msg",b])
y=new H.bE(!0,P.bX(null,P.x)).aK(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
O:function(a,b){if(b==null)return!1
return b instanceof H.eX&&J.v(this.b,b.b)&&J.v(this.a,b.a)&&J.v(this.c,b.c)},
gab:function(a){var z,y,x
z=J.fh(this.b,16)
y=J.fh(this.a,8)
x=this.c
if(typeof x!=="number")return H.C(x)
return(z^y^x)>>>0}},
dg:{"^":"i;cB:a<,b,dB:c<",
fd:function(){this.c=!0
this.b=null},
fc:function(a){if(this.c)return
this.b.$1(a)},
$ispN:1},
qy:{"^":"i;a,b,c",
f9:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.aY(new H.cD(y,new H.qA(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.c0(new H.qB(this,b),0),a)}else throw H.f(new P.a1("Timer greater than 0."))},
D:{
qz:function(a,b){var z=new H.qy(!0,!1,null)
z.f9(a,b)
return z}}},
qA:{"^":"a:9;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
qB:{"^":"a:9;a,b",
$0:[function(){this.a.c=null;--init.globalState.f.b
this.b.$0()},null,null,0,0,null,"call"]},
bw:{"^":"i;cB:a<",
gab:function(a){var z,y,x
z=this.a
y=J.M(z)
x=y.di(z,0)
y=y.bg(z,4294967296)
if(typeof y!=="number")return H.C(y)
z=x^y
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
O:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.bw){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bE:{"^":"i;a,b",
aK:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.i(0,a,z.gk(z))
z=J.t(a)
if(!!z.$isip)return["buffer",a]
if(!!z.$isdb)return["typed",a]
if(!!z.$isad)return this.ex(a)
if(!!z.$isnm){x=this.geu()
w=a.gH()
w=H.bA(w,x,H.ap(w,"k",0),null)
w=P.b_(w,!0,H.ap(w,"k",0))
z=z.ga5(a)
z=H.bA(z,x,H.ap(z,"k",0),null)
return["map",w,P.b_(z,!0,H.ap(z,"k",0))]}if(!!z.$isig)return this.ey(a)
if(!!z.$isn)this.em(a)
if(!!z.$ispN)this.bN(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isdn)return this.ez(a)
if(!!z.$iseX)return this.eA(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.bN(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isbw)return["capability",a.a]
if(!(a instanceof P.i))this.em(a)
return["dart",init.classIdExtractor(a),this.ew(init.classFieldsExtractor(a))]},"$1","geu",2,0,3,2],
bN:function(a,b){throw H.f(new P.a1((b==null?"Can't transmit:":b)+" "+H.d(a)))},
em:function(a){return this.bN(a,null)},
ex:function(a){var z=this.ev(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.bN(a,"Can't serialize indexable: ")},
ev:function(a){var z,y,x
z=[]
C.f.sk(z,a.length)
for(y=0;y<a.length;++y){x=this.aK(a[y])
if(y>=z.length)return H.c(z,y)
z[y]=x}return z},
ew:function(a){var z
for(z=0;z<a.length;++z)C.f.i(a,z,this.aK(a[z]))
return a},
ey:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.bN(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.f.sk(y,z.length)
for(x=0;x<z.length;++x){w=this.aK(a[z[x]])
if(x>=y.length)return H.c(y,x)
y[x]=w}return["js-object",z,y]},
eA:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
ez:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gcB()]
return["raw sendport",a]}},
dm:{"^":"i;a,b",
b9:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.f(P.c6("Bad serialized message: "+H.d(a)))
switch(C.f.gaa(a)){case"ref":if(1>=a.length)return H.c(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.c(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
y=H.E(this.by(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
return H.E(this.by(x),[null])
case"mutable":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
return this.by(x)
case"const":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
y=H.E(this.by(x),[null])
y.fixed$length=Array
return y
case"map":return this.h3(a)
case"sendport":return this.h4(a)
case"raw sendport":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.h2(a)
case"function":if(1>=a.length)return H.c(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.c(a,1)
return new H.bw(a[1])
case"dart":y=a.length
if(1>=y)return H.c(a,1)
w=a[1]
if(2>=y)return H.c(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.by(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.f("couldn't deserialize: "+H.d(a))}},"$1","gh1",2,0,3,2],
by:function(a){var z,y,x
z=J.L(a)
y=0
while(!0){x=z.gk(a)
if(typeof x!=="number")return H.C(x)
if(!(y<x))break
z.i(a,y,this.b9(z.h(a,y)));++y}return a},
h3:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.c(a,1)
y=a[1]
if(2>=z)return H.c(a,2)
x=a[2]
w=P.an()
this.b.push(w)
y=J.fr(y,this.gh1()).cc(0)
for(z=J.L(y),v=J.L(x),u=0;u<z.gk(y);++u)w.i(0,z.h(y,u),this.b9(v.h(x,u)))
return w},
h4:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.c(a,1)
y=a[1]
if(2>=z)return H.c(a,2)
x=a[2]
if(3>=z)return H.c(a,3)
w=a[3]
if(J.v(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.d_(w)
if(u==null)return
t=new H.dn(u,x)}else t=new H.eX(y,w,x)
this.b.push(t)
return t},
h2:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.c(a,1)
y=a[1]
if(2>=z)return H.c(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.L(y)
v=J.L(x)
u=0
while(!0){t=z.gk(y)
if(typeof t!=="number")return H.C(t)
if(!(u<t))break
w[z.h(y,u)]=this.b9(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
lR:function(){throw H.f(new P.a1("Cannot modify unmodifiable Map"))},
u6:function(a){return init.types[a]},
um:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.t(a).$isam},
d:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.aF(a)
if(typeof z!=="string")throw H.f(H.X(a))
return z},
bq:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
eA:function(a,b){if(b==null)throw H.f(new P.d8(a,null,null))
return b.$1(a)},
Q:function(a,b,c){var z,y,x,w,v,u
H.kM(a)
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.eA(a,c)
if(3>=z.length)return H.c(z,3)
y=z[3]
if(b==null){if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.eA(a,c)}if(b<2||b>36)throw H.f(P.ab(b,2,36,"radix",null))
if(b===10&&y!=null)return parseInt(a,10)
if(b<10||y==null){x=b<=10?47+b:86+b
w=z[1]
for(v=w.length,u=0;u<v;++u)if((C.h.b4(w,u)|32)>x)return H.eA(a,c)}return parseInt(a,b)},
iO:function(a,b){if(b==null)throw H.f(new P.d8("Invalid double",a,null))
return b.$1(a)},
Z:function(a,b){var z,y
H.kM(a)
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return H.iO(a,b)
z=parseFloat(a)
if(isNaN(z)){y=J.c5(a)
if(y==="NaN"||y==="+NaN"||y==="-NaN")return z
return H.iO(a,b)}return z},
cv:function(a){var z,y,x,w,v,u,t,s
z=J.t(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.N||!!J.t(a).$iscC){v=C.E(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.h.b4(w,0)===36)w=C.h.b3(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.dy(H.dv(a),0,null),init.mangledGlobalNames)},
de:function(a){return"Instance of '"+H.cv(a)+"'"},
pM:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.e.cG(z,10))>>>0,56320|z&1023)}throw H.f(P.ab(a,0,1114111,null,null))},
ar:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
pL:function(a){return a.b?H.ar(a).getUTCFullYear()+0:H.ar(a).getFullYear()+0},
pJ:function(a){return a.b?H.ar(a).getUTCMonth()+1:H.ar(a).getMonth()+1},
pF:function(a){return a.b?H.ar(a).getUTCDate()+0:H.ar(a).getDate()+0},
pG:function(a){return a.b?H.ar(a).getUTCHours()+0:H.ar(a).getHours()+0},
pI:function(a){return a.b?H.ar(a).getUTCMinutes()+0:H.ar(a).getMinutes()+0},
pK:function(a){return a.b?H.ar(a).getUTCSeconds()+0:H.ar(a).getSeconds()+0},
pH:function(a){return a.b?H.ar(a).getUTCMilliseconds()+0:H.ar(a).getMilliseconds()+0},
eB:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.f(H.X(a))
return a[b]},
iS:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.f(H.X(a))
a[b]=c},
iP:function(a,b,c){var z,y,x
z={}
z.a=0
y=[]
x=[]
z.a=b.length
C.f.ar(y,b)
z.b=""
if(c!=null&&!c.gW(c))c.a4(0,new H.pE(z,y,x))
return J.li(a,new H.ny(C.Z,""+"$"+z.a+z.b,0,y,x,null))},
pD:function(a,b){var z,y
z=b instanceof Array?b:P.b_(b,!0,null)
y=z.length
if(y===0){if(!!a.$0)return a.$0()}else if(y===1){if(!!a.$1)return a.$1(z[0])}else if(y===2){if(!!a.$2)return a.$2(z[0],z[1])}else if(y===3){if(!!a.$3)return a.$3(z[0],z[1],z[2])}else if(y===4){if(!!a.$4)return a.$4(z[0],z[1],z[2],z[3])}else if(y===5)if(!!a.$5)return a.$5(z[0],z[1],z[2],z[3],z[4])
return H.pC(a,z)},
pC:function(a,b){var z,y,x,w,v,u
z=b.length
y=a[""+"$"+z]
if(y==null){y=J.t(a)["call*"]
if(y==null)return H.iP(a,b,null)
x=H.iU(y)
w=x.d
v=w+x.e
if(x.f||w>z||v<z)return H.iP(a,b,null)
b=P.b_(b,!0,null)
for(u=z;u<v;++u)C.f.S(b,init.metadata[x.fZ(0,u)])}return y.apply(a,b)},
C:function(a){throw H.f(H.X(a))},
c:function(a,b){if(a==null)J.aL(a)
throw H.f(H.a5(a,b))},
a5:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aV(!0,b,"index",null)
z=J.aL(a)
if(!(b<0)){if(typeof z!=="number")return H.C(z)
y=b>=z}else y=!0
if(y)return P.aZ(b,a,"index",null,z)
return P.bB(b,"index",null)},
u2:function(a,b,c){if(a>c)return new P.df(0,c,!0,a,"start","Invalid value")
if(b!=null)if(b<a||b>c)return new P.df(a,c,!0,b,"end","Invalid value")
return new P.aV(!0,b,"end",null)},
X:function(a){return new P.aV(!0,a,null,null)},
A:function(a){if(typeof a!=="number")throw H.f(H.X(a))
return a},
kM:function(a){if(typeof a!=="string")throw H.f(H.X(a))
return a},
f:function(a){var z
if(a==null)a=new P.iz()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.l_})
z.name=""}else z.toString=H.l_
return z},
l_:[function(){return J.aF(this.dartException)},null,null,0,0,null],
R:function(a){throw H.f(a)},
r:function(a){throw H.f(new P.a9(a))},
ah:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.v8(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.e.cG(x,16)&8191)===10)switch(w){case 438:return z.$1(H.em(H.d(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.d(y)+" (Error "+w+")"
return z.$1(new H.iy(v,null))}}if(a instanceof TypeError){u=$.$get$kd()
t=$.$get$ke()
s=$.$get$kf()
r=$.$get$kg()
q=$.$get$kk()
p=$.$get$kl()
o=$.$get$ki()
$.$get$kh()
n=$.$get$kn()
m=$.$get$km()
l=u.aQ(y)
if(l!=null)return z.$1(H.em(y,l))
else{l=t.aQ(y)
if(l!=null){l.method="call"
return z.$1(H.em(y,l))}else{l=s.aQ(y)
if(l==null){l=r.aQ(y)
if(l==null){l=q.aQ(y)
if(l==null){l=p.aQ(y)
if(l==null){l=o.aQ(y)
if(l==null){l=r.aQ(y)
if(l==null){l=n.aQ(y)
if(l==null){l=m.aQ(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.iy(y,l==null?null:l.method))}}return z.$1(new H.qF(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.k6()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aV(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.k6()
return a},
dw:function(a){var z
if(a==null)return new H.kz(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.kz(a,null)},
dA:function(a){if(a==null||typeof a!='object')return J.aU(a)
else return H.bq(a)},
u5:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.i(0,a[y],a[x])}return b},
ug:[function(a,b,c,d,e,f,g){switch(c){case 0:return H.cE(b,new H.uh(a))
case 1:return H.cE(b,new H.ui(a,d))
case 2:return H.cE(b,new H.uj(a,d,e))
case 3:return H.cE(b,new H.uk(a,d,e,f))
case 4:return H.cE(b,new H.ul(a,d,e,f,g))}throw H.f(P.d0("Unsupported number of arguments for wrapped closure"))},null,null,14,0,null,33,12,13,14,15,16,28],
c0:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.ug)
a.$identity=z
return z},
lD:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.t(c).$ism){z.$reflectionInfo=c
x=H.iU(z).r}else x=c
w=d?Object.create(new H.qs().constructor.prototype):Object.create(new H.dQ(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aW
$.aW=J.B(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.fC(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.u6,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.fz:H.dR
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.f("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.fC(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
lA:function(a,b,c,d){var z=H.dR
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
fC:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.lC(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.lA(y,!w,z,b)
if(y===0){w=$.aW
$.aW=J.B(w,1)
u="self"+H.d(w)
w="return function(){var "+u+" = this."
v=$.bM
if(v==null){v=H.cQ("self")
$.bM=v}return new Function(w+H.d(v)+";return "+u+"."+H.d(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aW
$.aW=J.B(w,1)
t+=H.d(w)
w="return function("+t+"){return this."
v=$.bM
if(v==null){v=H.cQ("self")
$.bM=v}return new Function(w+H.d(v)+"."+H.d(z)+"("+t+");}")()},
lB:function(a,b,c,d){var z,y
z=H.dR
y=H.fz
switch(b?-1:a){case 0:throw H.f(new H.q1("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
lC:function(a,b){var z,y,x,w,v,u,t,s
z=H.lw()
y=$.fy
if(y==null){y=H.cQ("receiver")
$.fy=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.lB(w,!u,x,b)
if(w===1){y="return function(){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+");"
u=$.aW
$.aW=J.B(u,1)
return new Function(y+H.d(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+", "+s+");"
u=$.aW
$.aW=J.B(u,1)
return new Function(y+H.d(u)+"}")()},
f4:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.t(c).$ism){c.fixed$length=Array
z=c}else z=c
return H.lD(a,b,z,!!d,e,f)},
f6:function(a){if(typeof a==="number"||a==null)return a
throw H.f(H.dT(H.cv(a),"double"))},
v2:function(a,b){var z=J.L(b)
throw H.f(H.dT(H.cv(a),z.aX(b,3,z.gk(b))))},
o:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.t(a)[b]
else z=!0
if(z)return a
H.v2(a,b)},
kO:function(a){var z=J.t(a)
return"$S" in z?z.$S():null},
dt:function(a,b){var z
if(a==null)return!1
z=H.kO(a)
return z==null?!1:H.kQ(z,b)},
v7:function(a){throw H.f(new P.ma(a))},
dB:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
f7:function(a){return init.getIsolateTag(a)},
af:function(a){return new H.cB(a,null)},
E:function(a,b){a.$ti=b
return a},
dv:function(a){if(a==null)return
return a.$ti},
kP:function(a,b){return H.fe(a["$as"+H.d(b)],H.dv(a))},
ap:function(a,b,c){var z=H.kP(a,b)
return z==null?null:z[c]},
a2:function(a,b){var z=H.dv(a)
return z==null?null:z[b]},
bt:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dy(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.d(a)
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.bt(z,b)
return H.rB(a,b)}return"unknown-reified-type"},
rB:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.bt(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.bt(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.bt(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.u4(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.bt(r[p],b)+(" "+H.d(p))}w+="}"}return"("+w+") => "+z},
dy:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bD("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.F=v+", "
u=a[y]
if(u!=null)w=!1
v=z.F+=H.bt(u,c)}return w?"":"<"+z.A(0)+">"},
f8:function(a){var z,y
if(a instanceof H.a){z=H.kO(a)
if(z!=null)return H.bt(z,null)}y=J.t(a).constructor.builtin$cls
if(a==null)return y
return y+H.dy(a.$ti,0,null)},
fe:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
rR:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.dv(a)
y=J.t(a)
if(y[b]==null)return!1
return H.kK(H.fe(y[d],z),c)},
v6:function(a,b,c,d){if(a==null)return a
if(H.rR(a,b,c,d))return a
throw H.f(H.dT(H.cv(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.dy(c,0,null),init.mangledGlobalNames)))},
kK:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.aB(a[y],b[y]))return!1
return!0},
tY:function(a,b,c){return a.apply(b,H.kP(b,c))},
aB:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="ix")return!0
if('func' in b)return H.kQ(a,b)
if('func' in a)return b.builtin$cls==="ef"||b.builtin$cls==="i"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.bt(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.kK(H.fe(u,z),x)},
kJ:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.aB(z,v)||H.aB(v,z)))return!1}return!0},
rN:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.aB(v,u)||H.aB(u,v)))return!1}return!0},
kQ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.aB(z,y)||H.aB(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.kJ(x,w,!1))return!1
if(!H.kJ(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.aB(o,n)||H.aB(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.aB(o,n)||H.aB(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.aB(o,n)||H.aB(n,o)))return!1}}return H.rN(a.named,b.named)},
xd:function(a){var z=$.f9
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
x9:function(a){return H.bq(a)},
x8:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
uq:function(a){var z,y,x,w,v,u
z=$.f9.$1(a)
y=$.ds[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.dx[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.kI.$2(a,z)
if(z!=null){y=$.ds[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.dx[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.fb(x)
$.ds[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.dx[z]=x
return x}if(v==="-"){u=H.fb(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.kV(a,x)
if(v==="*")throw H.f(new P.ko(z))
if(init.leafTags[z]===true){u=H.fb(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.kV(a,x)},
kV:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.dz(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
fb:function(a){return J.dz(a,!1,null,!!a.$isam)},
v1:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.dz(z,!1,null,!!z.$isam)
else return J.dz(z,c,null,null)},
ue:function(){if(!0===$.fa)return
$.fa=!0
H.uf()},
uf:function(){var z,y,x,w,v,u,t,s
$.ds=Object.create(null)
$.dx=Object.create(null)
H.ua()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.kW.$1(v)
if(u!=null){t=H.v1(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
ua:function(){var z,y,x,w,v,u,t
z=C.O()
z=H.bG(C.P,H.bG(C.Q,H.bG(C.D,H.bG(C.D,H.bG(C.S,H.bG(C.R,H.bG(C.T(C.E),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.f9=new H.ub(v)
$.kI=new H.uc(u)
$.kW=new H.ud(t)},
bG:function(a,b){return a(b)||b},
v5:function(a,b,c){var z=a.indexOf(b,c)
return z>=0},
dC:function(a,b,c){var z,y,x
if(b==="")if(a==="")return c
else{z=a.length
for(y=c,x=0;x<z;++x)y=y+a[x]+c
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
x7:[function(a){return a},"$1","kG",2,0,27],
av:function(a,b,c,d){var z,y,x,w,v,u
z=J.t(b)
if(!z.$isez)throw H.f(P.cO(b,"pattern","is not a Pattern"))
for(z=z.cJ(b,a),z=new H.kq(z.a,z.b,z.c,null),y=0,x="";z.m();){w=z.d
v=w.b
u=v.index
x=x+H.d(H.kG().$1(C.h.aX(a,y,u)))+H.d(c.$1(w))
y=u+v[0].length}z=x+H.d(H.kG().$1(C.h.b3(a,y)))
return z.charCodeAt(0)==0?z:z},
lQ:{"^":"kp;a,$ti",$askp:I.ac,$asio:I.ac,$asF:I.ac,$isF:1},
lP:{"^":"i;$ti",
gW:function(a){return this.gk(this)===0},
A:function(a){return P.ep(this)},
i:function(a,b,c){return H.lR()},
$isF:1},
lS:{"^":"lP;a,b,c,$ti",
gk:function(a){return this.a},
I:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
h:function(a,b){if(!this.I(b))return
return this.cz(b)},
cz:function(a){return this.b[a]},
a4:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.cz(w))}},
gH:function(){return new H.qR(this,[H.a2(this,0)])},
ga5:function(a){return H.bA(this.c,new H.lT(this),H.a2(this,0),H.a2(this,1))}},
lT:{"^":"a:3;a",
$1:[function(a){return this.a.cz(a)},null,null,2,0,null,17,"call"]},
qR:{"^":"k;a,$ti",
gB:function(a){var z=this.a.c
return new J.c7(z,z.length,0,null,[H.a2(z,0)])},
gk:function(a){return this.a.c.length}},
ny:{"^":"i;a,b,c,d,e,f",
geb:function(){var z=this.a
return z},
gef:function(){var z,y,x,w
if(this.c===1)return C.w
z=this.d
y=z.length-this.e.length
if(y===0)return C.w
x=[]
for(w=0;w<y;++w){if(w>=z.length)return H.c(z,w)
x.push(z[w])}x.fixed$length=Array
x.immutable$list=Array
return x},
ged:function(){var z,y,x,w,v,u,t,s,r
if(this.c!==0)return C.F
z=this.e
y=z.length
x=this.d
w=x.length-y
if(y===0)return C.F
v=P.cy
u=new H.P(0,null,null,null,null,null,0,[v,null])
for(t=0;t<y;++t){if(t>=z.length)return H.c(z,t)
s=z[t]
r=w+t
if(r<0||r>=x.length)return H.c(x,r)
u.i(0,new H.eK(s),x[r])}return new H.lQ(u,[v,null])}},
pO:{"^":"i;a,b,c,d,e,f,r,x",
fZ:function(a,b){var z=this.d
if(typeof b!=="number")return b.aJ()
if(b<z)return
return this.b[3+b-z]},
D:{
iU:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.pO(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
pE:{"^":"a:11;a,b,c",
$2:function(a,b){var z=this.a
z.b=z.b+"$"+H.d(a)
this.c.push(a)
this.b.push(b);++z.a}},
qD:{"^":"i;a,b,c,d,e,f",
aQ:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
D:{
b1:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.qD(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
dl:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
kj:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
iy:{"^":"ak;a,b",
A:function(a){var z=this.b
if(z==null)return"NullError: "+H.d(this.a)
return"NullError: method not found: '"+H.d(z)+"' on null"}},
nF:{"^":"ak;a,b,c",
A:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.d(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.d(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.d(this.a)+")"},
D:{
em:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.nF(a,y,z?null:b.receiver)}}},
qF:{"^":"ak;a",
A:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
v8:{"^":"a:3;a",
$1:function(a){if(!!J.t(a).$isak)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
kz:{"^":"i;a,b",
A:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
uh:{"^":"a:5;a",
$0:function(){return this.a.$0()}},
ui:{"^":"a:5;a,b",
$0:function(){return this.a.$1(this.b)}},
uj:{"^":"a:5;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
uk:{"^":"a:5;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
ul:{"^":"a:5;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"i;",
A:function(a){return"Closure '"+H.cv(this).trim()+"'"},
geq:function(){return this},
$isef:1,
geq:function(){return this}},
k9:{"^":"a;"},
qs:{"^":"k9;",
A:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
dQ:{"^":"k9;a,b,c,d",
O:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.dQ))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gab:function(a){var z,y
z=this.c
if(z==null)y=H.bq(this.a)
else y=typeof z!=="object"?J.aU(z):H.bq(z)
return J.l2(y,H.bq(this.b))},
A:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.d(this.d)+"' of "+H.de(z)},
D:{
dR:function(a){return a.a},
fz:function(a){return a.c},
lw:function(){var z=$.bM
if(z==null){z=H.cQ("self")
$.bM=z}return z},
cQ:function(a){var z,y,x,w,v
z=new H.dQ("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
ly:{"^":"ak;a",
A:function(a){return this.a},
D:{
dT:function(a,b){return new H.ly("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
q1:{"^":"ak;a",
A:function(a){return"RuntimeError: "+H.d(this.a)}},
cB:{"^":"i;a,b",
A:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gab:function(a){return J.aU(this.a)},
O:function(a,b){if(b==null)return!1
return b instanceof H.cB&&J.v(this.a,b.a)}},
P:{"^":"i;a,b,c,d,e,f,r,$ti",
gk:function(a){return this.a},
gW:function(a){return this.a===0},
ghu:function(a){return!this.gW(this)},
gH:function(){return new H.nL(this,[H.a2(this,0)])},
ga5:function(a){return H.bA(this.gH(),new H.nE(this),H.a2(this,0),H.a2(this,1))},
I:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.dw(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.dw(y,a)}else return this.hr(a)},
hr:function(a){var z=this.d
if(z==null)return!1
return this.bF(this.bW(z,this.bE(a)),a)>=0},
fQ:function(a){return this.gH().bX(0,new H.nD(this,a))},
ar:function(a,b){b.a4(0,new H.nC(this))},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.bs(z,b)
return y==null?null:y.gba()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.bs(x,b)
return y==null?null:y.gba()}else return this.hs(b)},
hs:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.bW(z,this.bE(a))
x=this.bF(y,a)
if(x<0)return
return y[x].gba()},
i:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.cD()
this.b=z}this.dn(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.cD()
this.c=y}this.dn(y,b,c)}else{x=this.d
if(x==null){x=this.cD()
this.d=x}w=this.bE(b)
v=this.bW(x,w)
if(v==null)this.cF(x,w,[this.cE(b,c)])
else{u=this.bF(v,b)
if(u>=0)v[u].sba(c)
else v.push(this.cE(b,c))}}},
an:function(a,b){if(typeof b==="string")return this.dE(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.dE(this.c,b)
else return this.ht(b)},
ht:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.bW(z,this.bE(a))
x=this.bF(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.dH(w)
return w.gba()},
aB:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
a4:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.f(new P.a9(this))
z=z.c}},
dn:function(a,b,c){var z=this.bs(a,b)
if(z==null)this.cF(a,b,this.cE(b,c))
else z.sba(c)},
dE:function(a,b){var z
if(a==null)return
z=this.bs(a,b)
if(z==null)return
this.dH(z)
this.dz(a,b)
return z.gba()},
cE:function(a,b){var z,y
z=new H.nK(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
dH:function(a){var z,y
z=a.gfq()
y=a.gfp()
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
bE:function(a){return J.aU(a)&0x3ffffff},
bF:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.v(a[y].ge6(),b))return y
return-1},
A:function(a){return P.ep(this)},
bs:function(a,b){return a[b]},
bW:function(a,b){return a[b]},
cF:function(a,b,c){a[b]=c},
dz:function(a,b){delete a[b]},
dw:function(a,b){return this.bs(a,b)!=null},
cD:function(){var z=Object.create(null)
this.cF(z,"<non-identifier-key>",z)
this.dz(z,"<non-identifier-key>")
return z},
$isnm:1,
$isF:1,
D:{
ik:function(a,b){return new H.P(0,null,null,null,null,null,0,[a,b])}}},
nE:{"^":"a:3;a",
$1:[function(a){return this.a.h(0,a)},null,null,2,0,null,4,"call"]},
nD:{"^":"a:3;a,b",
$1:function(a){return J.v(this.a.h(0,a),this.b)}},
nC:{"^":"a;a",
$2:function(a,b){this.a.i(0,a,b)},
$S:function(){return H.tY(function(a,b){return{func:1,args:[a,b]}},this.a,"P")}},
nK:{"^":"i;e6:a<,ba:b@,fp:c<,fq:d<,$ti"},
nL:{"^":"l;a,$ti",
gk:function(a){return this.a.a},
gW:function(a){return this.a.a===0},
gB:function(a){var z,y
z=this.a
y=new H.nM(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
M:function(a,b){return this.a.I(b)},
a4:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.f(new P.a9(z))
y=y.c}}},
nM:{"^":"i;a,b,c,d,$ti",
gq:function(){return this.d},
m:function(){var z=this.a
if(this.b!==z.r)throw H.f(new P.a9(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
ub:{"^":"a:3;a",
$1:function(a){return this.a(a)}},
uc:{"^":"a:19;a",
$2:function(a,b){return this.a(a,b)}},
ud:{"^":"a:7;a",
$1:function(a){return this.a(a)}},
ii:{"^":"i;a,fo:b<,c,d",
A:function(a){return"RegExp/"+this.a+"/"},
gfn:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.ej(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
gdD:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.ej(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
cK:function(a,b,c){if(c>b.length)throw H.f(P.ab(c,0,b.length,null,null))
return new H.qJ(this,b,c)},
cJ:function(a,b){return this.cK(a,b,0)},
fi:function(a,b){var z,y
z=this.gfn()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.ky(this,y)},
fh:function(a,b){var z,y
z=this.gdD()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.c(y,-1)
if(y.pop()!=null)return
return new H.ky(this,y)},
d0:function(a,b,c){if(c<0||c>b.length)throw H.f(P.ab(c,0,b.length,null,null))
return this.fh(b,c)},
$isez:1,
D:{
ej:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.f(new P.d8("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
ky:{"^":"i;a,b",
gdj:function(a){return this.b.index},
ge1:function(){var z=this.b
return z.index+z[0].length},
Z:function(a){var z=this.b
if(a>>>0!==a||a>=z.length)return H.c(z,a)
return z[a]},
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.c(z,b)
return z[b]},
gce:function(){return this.b.length-1}},
qJ:{"^":"ib;a,b,c",
gB:function(a){return new H.kq(this.a,this.b,this.c,null)},
$asib:function(){return[P.ct]},
$ask:function(){return[P.ct]}},
kq:{"^":"i;a,b,c,d",
gq:function(){return this.d},
m:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.fi(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
eJ:{"^":"i;dj:a>,b,c",
ge1:function(){return this.a+this.c.length},
h:function(a,b){return this.Z(b)},
gce:function(){return 0},
Z:function(a){if(!J.v(a,0))throw H.f(P.bB(a,null,null))
return this.c}},
rl:{"^":"k;a,b,c",
gB:function(a){return new H.rm(this.a,this.b,this.c,null)},
gaa:function(a){var z,y,x
z=this.a
y=this.b
x=z.indexOf(y,this.c)
if(x>=0)return new H.eJ(x,z,y)
throw H.f(H.aq())},
$ask:function(){return[P.ct]}},
rm:{"^":"i;a,b,c,d",
m:function(){var z,y,x,w,v,u,t
z=this.c
y=this.b
x=y.length
w=this.a
v=w.length
if(z+x>v){this.d=null
return!1}u=w.indexOf(y,z)
if(u<0){this.c=v+1
this.d=null
return!1}t=u+x
this.d=new H.eJ(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gq:function(){return this.d}}}],["","",,H,{"^":"",
u4:function(a){var z=H.E(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
fc:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
kD:function(a){return a},
rv:function(a,b,c){var z
if(!(a>>>0!==a))z=b>>>0!==b||a>b||b>c
else z=!0
if(z)throw H.f(H.u2(a,b,c))
return b},
ip:{"^":"n;",
gaf:function(a){return C.a_},
$isip:1,
$isfA:1,
"%":"ArrayBuffer"},
db:{"^":"n;",$isdb:1,$isaK:1,"%":";ArrayBufferView;eu|iq|is|ev|ir|it|bp"},
wa:{"^":"db;",
gaf:function(a){return C.a0},
$isaK:1,
"%":"DataView"},
eu:{"^":"db;",
gk:function(a){return a.length},
$isam:1,
$asam:I.ac,
$isad:1,
$asad:I.ac},
ev:{"^":"is;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.R(H.a5(a,b))
return a[b]},
i:function(a,b,c){if(b>>>0!==b||b>=a.length)H.R(H.a5(a,b))
a[b]=c}},
iq:{"^":"eu+ax;",$asam:I.ac,$asad:I.ac,
$asm:function(){return[P.a6]},
$asl:function(){return[P.a6]},
$ask:function(){return[P.a6]},
$ism:1,
$isl:1,
$isk:1},
is:{"^":"iq+i5;",$asam:I.ac,$asad:I.ac,
$asm:function(){return[P.a6]},
$asl:function(){return[P.a6]},
$ask:function(){return[P.a6]}},
bp:{"^":"it;",
i:function(a,b,c){if(b>>>0!==b||b>=a.length)H.R(H.a5(a,b))
a[b]=c},
$ism:1,
$asm:function(){return[P.x]},
$isl:1,
$asl:function(){return[P.x]},
$isk:1,
$ask:function(){return[P.x]}},
ir:{"^":"eu+ax;",$asam:I.ac,$asad:I.ac,
$asm:function(){return[P.x]},
$asl:function(){return[P.x]},
$ask:function(){return[P.x]},
$ism:1,
$isl:1,
$isk:1},
it:{"^":"ir+i5;",$asam:I.ac,$asad:I.ac,
$asm:function(){return[P.x]},
$asl:function(){return[P.x]},
$ask:function(){return[P.x]}},
wb:{"^":"ev;",
gaf:function(a){return C.a1},
$isaK:1,
$ism:1,
$asm:function(){return[P.a6]},
$isl:1,
$asl:function(){return[P.a6]},
$isk:1,
$ask:function(){return[P.a6]},
"%":"Float32Array"},
wc:{"^":"ev;",
gaf:function(a){return C.a2},
$isaK:1,
$ism:1,
$asm:function(){return[P.a6]},
$isl:1,
$asl:function(){return[P.a6]},
$isk:1,
$ask:function(){return[P.a6]},
"%":"Float64Array"},
wd:{"^":"bp;",
gaf:function(a){return C.a3},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.R(H.a5(a,b))
return a[b]},
$isaK:1,
$ism:1,
$asm:function(){return[P.x]},
$isl:1,
$asl:function(){return[P.x]},
$isk:1,
$ask:function(){return[P.x]},
"%":"Int16Array"},
we:{"^":"bp;",
gaf:function(a){return C.a4},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.R(H.a5(a,b))
return a[b]},
$isaK:1,
$ism:1,
$asm:function(){return[P.x]},
$isl:1,
$asl:function(){return[P.x]},
$isk:1,
$ask:function(){return[P.x]},
"%":"Int32Array"},
wf:{"^":"bp;",
gaf:function(a){return C.a5},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.R(H.a5(a,b))
return a[b]},
$isaK:1,
$ism:1,
$asm:function(){return[P.x]},
$isl:1,
$asl:function(){return[P.x]},
$isk:1,
$ask:function(){return[P.x]},
"%":"Int8Array"},
wg:{"^":"bp;",
gaf:function(a){return C.a9},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.R(H.a5(a,b))
return a[b]},
$isaK:1,
$ism:1,
$asm:function(){return[P.x]},
$isl:1,
$asl:function(){return[P.x]},
$isk:1,
$ask:function(){return[P.x]},
"%":"Uint16Array"},
wh:{"^":"bp;",
gaf:function(a){return C.aa},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.R(H.a5(a,b))
return a[b]},
$isaK:1,
$ism:1,
$asm:function(){return[P.x]},
$isl:1,
$asl:function(){return[P.x]},
$isk:1,
$ask:function(){return[P.x]},
"%":"Uint32Array"},
wi:{"^":"bp;",
gaf:function(a){return C.ab},
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.R(H.a5(a,b))
return a[b]},
$isaK:1,
$ism:1,
$asm:function(){return[P.x]},
$isl:1,
$asl:function(){return[P.x]},
$isk:1,
$ask:function(){return[P.x]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
wj:{"^":"bp;",
gaf:function(a){return C.ac},
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.R(H.a5(a,b))
return a[b]},
$isaK:1,
$ism:1,
$asm:function(){return[P.x]},
$isl:1,
$asl:function(){return[P.x]},
$isk:1,
$ask:function(){return[P.x]},
"%":";Uint8Array"}}],["","",,P,{"^":"",
qK:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.rO()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.c0(new P.qM(z),1)).observe(y,{childList:true})
return new P.qL(z,y,x)}else if(self.setImmediate!=null)return P.rP()
return P.rQ()},
wR:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.c0(new P.qN(a),0))},"$1","rO",2,0,14],
wS:[function(a){++init.globalState.f.b
self.setImmediate(H.c0(new P.qO(a),0))},"$1","rP",2,0,14],
wT:[function(a){P.eL(C.B,a)},"$1","rQ",2,0,14],
rD:function(){var z,y
for(;z=$.bF,z!=null;){$.bZ=null
y=z.ghA()
$.bF=y
if(y==null)$.bY=null
z.gfK().$0()}},
x6:[function(){$.f1=!0
try{P.rD()}finally{$.bZ=null
$.f1=!1
if($.bF!=null)$.$get$eO().$1(P.kL())}},"$0","kL",0,0,9],
rH:function(a){var z=new P.kr(a,null)
if($.bF==null){$.bY=z
$.bF=z
if(!$.f1)$.$get$eO().$1(P.kL())}else{$.bY.b=z
$.bY=z}},
rI:function(a){var z,y,x
z=$.bF
if(z==null){P.rH(a)
$.bZ=$.bY
return}y=new P.kr(a,null)
x=$.bZ
if(x==null){y.b=z
$.bZ=y
$.bF=y}else{y.b=x.b
x.b=y
$.bZ=y
if(y.b==null)$.bY=y}},
qC:function(a,b){var z=$.bW
if(z===C.o){z.toString
return P.eL(a,b)}return P.eL(a,z.fI(b,!0))},
eL:function(a,b){var z=C.e.as(a.a,1000)
return H.qz(z<0?0:z,b)},
rF:function(a,b,c,d,e){var z={}
z.a=d
P.rI(new P.rG(z,e))},
kH:function(a,b,c,d){var z,y
y=$.bW
if(y===c)return d.$0()
$.bW=c
z=y
try{y=d.$0()
return y}finally{$.bW=z}},
qM:{"^":"a:3;a",
$1:[function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()},null,null,2,0,null,19,"call"]},
qL:{"^":"a:20;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
qN:{"^":"a:5;a",
$0:[function(){--init.globalState.f.b
this.a.$0()},null,null,0,0,null,"call"]},
qO:{"^":"a:5;a",
$0:[function(){--init.globalState.f.b
this.a.$0()},null,null,0,0,null,"call"]},
kr:{"^":"i;fK:a<,hA:b<"},
rt:{"^":"i;"},
rG:{"^":"a:5;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.iz()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.f(z)
x=H.f(z)
x.stack=J.aF(y)
throw x}},
re:{"^":"rt;",
gaw:function(a){return},
hR:function(a){var z,y,x,w
try{if(C.o===$.bW){x=a.$0()
return x}x=P.kH(null,null,this,a)
return x}catch(w){z=H.ah(w)
y=H.dw(w)
x=P.rF(null,null,this,z,y)
return x}},
fI:function(a,b){if(b)return new P.rf(this,a)
else return new P.rg(this,a)},
h:function(a,b){return},
hQ:function(a){if($.bW===C.o)return a.$0()
return P.kH(null,null,this,a)}},
rf:{"^":"a:5;a,b",
$0:function(){return this.a.hR(this.b)}},
rg:{"^":"a:5;a,b",
$0:function(){return this.a.hQ(this.b)}}}],["","",,P,{"^":"",
eS:function(a,b,c){if(c==null)a[b]=a
else a[b]=c},
eR:function(){var z=Object.create(null)
P.eS(z,"<non-identifier-key>",z)
delete z["<non-identifier-key>"]
return z},
nN:function(a,b){return new H.P(0,null,null,null,null,null,0,[a,b])},
an:function(){return new H.P(0,null,null,null,null,null,0,[null,null])},
Y:function(a){return H.u5(a,new H.P(0,null,null,null,null,null,0,[null,null]))},
nu:function(a,b,c){var z,y
if(P.f2(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$c_()
y.push(a)
try{P.rC(a,z)}finally{if(0>=y.length)return H.c(y,-1)
y.pop()}y=P.k7(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
d9:function(a,b,c){var z,y,x
if(P.f2(a))return b+"..."+c
z=new P.bD(b)
y=$.$get$c_()
y.push(a)
try{x=z
x.sF(P.k7(x.gF(),a,", "))}finally{if(0>=y.length)return H.c(y,-1)
y.pop()}y=z
y.sF(y.gF()+c)
y=z.gF()
return y.charCodeAt(0)==0?y:y},
f2:function(a){var z,y
for(z=0;y=$.$get$c_(),z<y.length;++z)if(a===y[z])return!0
return!1},
rC:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gB(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.m())return
w=H.d(z.gq())
b.push(w)
y+=w.length+2;++x}if(!z.m()){if(x<=5)return
if(0>=b.length)return H.c(b,-1)
v=b.pop()
if(0>=b.length)return H.c(b,-1)
u=b.pop()}else{t=z.gq();++x
if(!z.m()){if(x<=4){b.push(H.d(t))
return}v=H.d(t)
if(0>=b.length)return H.c(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gq();++x
for(;z.m();t=s,s=r){r=z.gq();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.c(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.d(t)
v=H.d(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.c(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
V:function(a,b,c,d){return new P.r6(0,null,null,null,null,null,0,[d])},
il:function(a,b){var z,y,x
z=P.V(null,null,null,b)
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.r)(a),++x)z.S(0,a[x])
return z},
ep:function(a){var z,y,x
z={}
if(P.f2(a))return"{...}"
y=new P.bD("")
try{$.$get$c_().push(a)
x=y
x.sF(x.gF()+"{")
z.a=!0
a.a4(0,new P.nQ(z,y))
z=y
z.sF(z.gF()+"}")}finally{z=$.$get$c_()
if(0>=z.length)return H.c(z,-1)
z.pop()}z=y.gF()
return z.charCodeAt(0)==0?z:z},
qY:{"^":"i;$ti",
gk:function(a){return this.a},
gW:function(a){return this.a===0},
gH:function(){return new P.kt(this,[H.a2(this,0)])},
ga5:function(a){var z=H.a2(this,0)
return H.bA(new P.kt(this,[z]),new P.r_(this),z,H.a2(this,1))},
I:function(a){var z,y
if(typeof a==="string"&&a!=="__proto__"){z=this.b
return z==null?!1:z[a]!=null}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
return y==null?!1:y[a]!=null}else return this.ff(a)},
ff:function(a){var z=this.d
if(z==null)return!1
return this.b_(z[H.dA(a)&0x3ffffff],a)>=0},
h:function(a,b){var z,y,x,w
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)y=null
else{x=z[b]
y=x===z?null:x}return y}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)y=null
else{x=w[b]
y=x===w?null:x}return y}else return this.fk(b)},
fk:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[H.dA(a)&0x3ffffff]
x=this.b_(y,a)
return x<0?null:y[x+1]},
i:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.eR()
this.b=z}this.ds(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.eR()
this.c=y}this.ds(y,b,c)}else{x=this.d
if(x==null){x=P.eR()
this.d=x}w=H.dA(b)&0x3ffffff
v=x[w]
if(v==null){P.eS(x,w,[b,c]);++this.a
this.e=null}else{u=this.b_(v,b)
if(u>=0)v[u+1]=c
else{v.push(b,c);++this.a
this.e=null}}}},
a4:function(a,b){var z,y,x,w
z=this.cs()
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.h(0,w))
if(z!==this.e)throw H.f(new P.a9(this))}},
cs:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.e
if(z!=null)return z
y=new Array(this.a)
y.fixed$length=Array
x=this.b
if(x!=null){w=Object.getOwnPropertyNames(x)
v=w.length
for(u=0,t=0;t<v;++t){y[u]=w[t];++u}}else u=0
s=this.c
if(s!=null){w=Object.getOwnPropertyNames(s)
v=w.length
for(t=0;t<v;++t){y[u]=+w[t];++u}}r=this.d
if(r!=null){w=Object.getOwnPropertyNames(r)
v=w.length
for(t=0;t<v;++t){q=r[w[t]]
p=q.length
for(o=0;o<p;o+=2){y[u]=q[o];++u}}}this.e=y
return y},
ds:function(a,b,c){if(a[b]==null){++this.a
this.e=null}P.eS(a,b,c)},
$isF:1},
r_:{"^":"a:3;a",
$1:[function(a){return this.a.h(0,a)},null,null,2,0,null,4,"call"]},
r1:{"^":"qY;a,b,c,d,e,$ti",
b_:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;y+=2){x=a[y]
if(x==null?b==null:x===b)return y}return-1}},
kt:{"^":"l;a,$ti",
gk:function(a){return this.a.a},
gW:function(a){return this.a.a===0},
gB:function(a){var z=this.a
return new P.qZ(z,z.cs(),0,null,this.$ti)},
M:function(a,b){return this.a.I(b)},
a4:function(a,b){var z,y,x,w
z=this.a
y=z.cs()
for(x=y.length,w=0;w<x;++w){b.$1(y[w])
if(y!==z.e)throw H.f(new P.a9(z))}}},
qZ:{"^":"i;a,b,c,d,$ti",
gq:function(){return this.d},
m:function(){var z,y,x
z=this.b
y=this.c
x=this.a
if(z!==x.e)throw H.f(new P.a9(x))
else if(y>=z.length){this.d=null
return!1}else{this.d=z[y]
this.c=y+1
return!0}}},
kx:{"^":"P;a,b,c,d,e,f,r,$ti",
bE:function(a){return H.dA(a)&0x3ffffff},
bF:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].ge6()
if(x==null?b==null:x===b)return y}return-1},
D:{
bX:function(a,b){return new P.kx(0,null,null,null,null,null,0,[a,b])}}},
r6:{"^":"r0;a,b,c,d,e,f,r,$ti",
gB:function(a){var z=new P.bs(this,this.r,null,null,[null])
z.c=this.e
return z},
gk:function(a){return this.a},
gW:function(a){return this.a===0},
M:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.fe(b)},
fe:function(a){var z=this.d
if(z==null)return!1
return this.b_(z[this.bV(a)],a)>=0},
d_:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.M(0,a)?a:null
else return this.fl(a)},
fl:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.bV(a)]
x=this.b_(y,a)
if(x<0)return
return J.a0(y,x).gbr()},
a4:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.gbr())
if(y!==this.r)throw H.f(new P.a9(this))
z=z.gcu()}},
gaa:function(a){var z=this.e
if(z==null)throw H.f(new P.W("No elements"))
return z.gbr()},
gal:function(a){var z=this.f
if(z==null)throw H.f(new P.W("No elements"))
return z.a},
S:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.dr(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.dr(x,b)}else return this.aY(b)},
aY:function(a){var z,y,x
z=this.d
if(z==null){z=P.r8()
this.d=z}y=this.bV(a)
x=z[y]
if(x==null)z[y]=[this.ct(a)]
else{if(this.b_(x,a)>=0)return!1
x.push(this.ct(a))}return!0},
an:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.du(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.du(this.c,b)
else return this.ft(b)},
ft:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.bV(a)]
x=this.b_(y,a)
if(x<0)return!1
this.dv(y.splice(x,1)[0])
return!0},
aB:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
dr:function(a,b){if(a[b]!=null)return!1
a[b]=this.ct(b)
return!0},
du:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.dv(z)
delete a[b]
return!0},
ct:function(a){var z,y
z=new P.r7(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
dv:function(a){var z,y
z=a.gdt()
y=a.gcu()
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.sdt(z);--this.a
this.r=this.r+1&67108863},
bV:function(a){return J.aU(a)&0x3ffffff},
b_:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.v(a[y].gbr(),b))return y
return-1},
$isl:1,
$asl:null,
$isk:1,
$ask:null,
D:{
r8:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
r7:{"^":"i;br:a<,cu:b<,dt:c@"},
bs:{"^":"i;a,b,c,d,$ti",
gq:function(){return this.d},
m:function(){var z=this.a
if(this.b!==z.r)throw H.f(new P.a9(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.gbr()
this.c=this.c.gcu()
return!0}}}},
r0:{"^":"q6;$ti"},
ib:{"^":"k;$ti"},
bU:{"^":"dc;$ti"},
dc:{"^":"i+ax;$ti",$asm:null,$asl:null,$ask:null,$ism:1,$isl:1,$isk:1},
ax:{"^":"i;$ti",
gB:function(a){return new H.im(a,this.gk(a),0,null,[H.ap(a,"ax",0)])},
a9:function(a,b){return this.h(a,b)},
a4:function(a,b){var z,y
z=this.gk(a)
for(y=0;y<z;++y){b.$1(this.h(a,y))
if(z!==this.gk(a))throw H.f(new P.a9(a))}},
gW:function(a){return this.gk(a)===0},
gaa:function(a){if(this.gk(a)===0)throw H.f(H.aq())
return this.h(a,0)},
gal:function(a){if(this.gk(a)===0)throw H.f(H.aq())
return this.h(a,this.gk(a)-1)},
M:function(a,b){var z,y
z=this.gk(a)
for(y=0;y<this.gk(a);++y){if(J.v(this.h(a,y),b))return!0
if(z!==this.gk(a))throw H.f(new P.a9(a))}return!1},
b1:function(a,b){return new H.bV(a,b,[H.ap(a,"ax",0),null])},
bL:function(a,b){var z,y,x
z=H.E([],[H.ap(a,"ax",0)])
C.f.sk(z,this.gk(a))
for(y=0;y<this.gk(a);++y){x=this.h(a,y)
if(y>=z.length)return H.c(z,y)
z[y]=x}return z},
cc:function(a){return this.bL(a,!0)},
bD:function(a,b,c){var z
if(c>=this.gk(a))return-1
for(z=c;z<this.gk(a);++z)if(J.v(this.h(a,z),b))return z
return-1},
bo:function(a,b){return this.bD(a,b,0)},
bG:function(a,b,c){var z
if(c.aJ(0,0))return-1
if(c.bp(0,this.gk(a)))c=this.gk(a)-1
for(z=c;z>=0;--z)if(J.v(this.h(a,z),b))return z
return-1},
c8:function(a,b){return this.bG(a,b,null)},
A:function(a){return P.d9(a,"[","]")},
$ism:1,
$asm:null,
$isl:1,
$asl:null,
$isk:1,
$ask:null},
rq:{"^":"i;$ti",
i:function(a,b,c){throw H.f(new P.a1("Cannot modify unmodifiable map"))},
$isF:1},
io:{"^":"i;$ti",
h:function(a,b){return this.a.h(0,b)},
i:function(a,b,c){this.a.i(0,b,c)},
I:function(a){return this.a.I(a)},
a4:function(a,b){this.a.a4(0,b)},
gW:function(a){var z=this.a
return z.gW(z)},
gk:function(a){var z=this.a
return z.gk(z)},
gH:function(){return this.a.gH()},
A:function(a){return this.a.A(0)},
ga5:function(a){var z=this.a
return z.ga5(z)},
$isF:1},
kp:{"^":"io+rq;$ti",$asF:null,$isF:1},
nQ:{"^":"a:1;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.F+=", "
z.a=!1
z=this.b
y=z.F+=H.d(a)
z.F=y+": "
z.F+=H.d(b)}},
nO:{"^":"bn;a,b,c,d,$ti",
gB:function(a){return new P.r9(this,this.c,this.d,this.b,null,this.$ti)},
a4:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.c(x,y)
b.$1(x[y])
if(z!==this.d)H.R(new P.a9(this))}},
gW:function(a){return this.b===this.c},
gk:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gaa:function(a){var z,y
z=this.b
if(z===this.c)throw H.f(H.aq())
y=this.a
if(z>=y.length)return H.c(y,z)
return y[z]},
gal:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.f(H.aq())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.c(z,y)
return z[y]},
a9:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(typeof b!=="number")return H.C(b)
if(0>b||b>=z)H.R(P.aZ(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.c(y,w)
return y[w]},
aB:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.c(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
A:function(a){return P.d9(this,"{","}")},
eg:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.f(H.aq());++this.d
y=this.a
x=y.length
if(z>=x)return H.c(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
aY:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.c(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.dA();++this.d},
dA:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.E(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.f.dg(y,0,w,z,x)
C.f.dg(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
f0:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.E(z,[b])},
$asl:null,
$ask:null,
D:{
eo:function(a,b){var z=new P.nO(null,0,0,0,[b])
z.f0(a,b)
return z}}},
r9:{"^":"i;a,b,c,d,e,$ti",
gq:function(){return this.e},
m:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.R(new P.a9(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.c(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
q7:{"^":"i;$ti",
gW:function(a){return this.a===0},
ar:function(a,b){var z
for(z=J.a7(b);z.m();)this.S(0,z.gq())},
b1:function(a,b){return new H.dX(this,b,[H.a2(this,0),null])},
A:function(a){return P.d9(this,"{","}")},
a4:function(a,b){var z
for(z=new P.bs(this,this.r,null,null,[null]),z.c=this.e;z.m();)b.$1(z.d)},
cX:function(a,b){var z,y
z=new P.bs(this,this.r,null,null,[null])
z.c=this.e
if(!z.m())return""
if(b===""){y=""
do y+=H.d(z.d)
while(z.m())}else{y=H.d(z.d)
for(;z.m();)y=y+b+H.d(z.d)}return y.charCodeAt(0)==0?y:y},
gaa:function(a){var z=new P.bs(this,this.r,null,null,[null])
z.c=this.e
if(!z.m())throw H.f(H.aq())
return z.d},
gal:function(a){var z,y
z=new P.bs(this,this.r,null,null,[null])
z.c=this.e
if(!z.m())throw H.f(H.aq())
do y=z.d
while(z.m())
return y},
a9:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(P.fw("index"))
if(b<0)H.R(P.ab(b,0,null,"index",null))
for(z=new P.bs(this,this.r,null,null,[null]),z.c=this.e,y=0;z.m();){x=z.d
if(b===y)return x;++y}throw H.f(P.aZ(b,this,"index",null,y))},
$isl:1,
$asl:null,
$isk:1,
$ask:null},
q6:{"^":"q7;$ti"}}],["","",,P,{"^":"",
dp:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.r3(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.dp(a[z])
return a},
rE:function(a,b){var z,y,x,w
z=null
try{z=JSON.parse(a)}catch(x){y=H.ah(x)
w=String(y)
throw H.f(new P.d8(w,null,null))}w=P.dp(z)
return w},
r3:{"^":"i;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.fs(b):y}},
gk:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.aZ().length
return z},
gW:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.aZ().length
return z===0},
gH:function(){if(this.b==null)return this.c.gH()
return new P.r4(this)},
ga5:function(a){var z
if(this.b==null){z=this.c
return z.ga5(z)}return H.bA(this.aZ(),new P.r5(this),null,null)},
i:function(a,b,c){var z,y
if(this.b==null)this.c.i(0,b,c)
else if(this.I(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.fB().i(0,b,c)},
I:function(a){if(this.b==null)return this.c.I(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
a4:function(a,b){var z,y,x,w
if(this.b==null)return this.c.a4(0,b)
z=this.aZ()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.dp(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.f(new P.a9(this))}},
A:function(a){return P.ep(this)},
aZ:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
fB:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.nN(P.y,null)
y=this.aZ()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.i(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.f.sk(y,0)
this.b=null
this.a=null
this.c=z
return z},
fs:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.dp(this.a[a])
return this.b[a]=z},
$isF:1,
$asF:function(){return[P.y,null]}},
r5:{"^":"a:3;a",
$1:[function(a){return this.a.h(0,a)},null,null,2,0,null,4,"call"]},
r4:{"^":"bn;a",
gk:function(a){var z=this.a
if(z.b==null){z=z.c
z=z.gk(z)}else z=z.aZ().length
return z},
a9:function(a,b){var z=this.a
if(z.b==null)z=z.gH().a9(0,b)
else{z=z.aZ()
if(b>>>0!==b||b>=z.length)return H.c(z,b)
z=z[b]}return z},
gB:function(a){var z=this.a
if(z.b==null){z=z.gH()
z=z.gB(z)}else{z=z.aZ()
z=new J.c7(z,z.length,0,null,[H.a2(z,0)])}return z},
M:function(a,b){return this.a.I(b)},
$asbn:function(){return[P.y]},
$asl:function(){return[P.y]},
$ask:function(){return[P.y]}},
fD:{"^":"i;$ti"},
cR:{"^":"i;$ti"},
mh:{"^":"fD;",
$asfD:function(){return[P.y,[P.m,P.x]]}},
nJ:{"^":"cR;fw:a<",
$ascR:function(){return[P.y,P.i]}},
qG:{"^":"mh;a",
gE:function(a){return"utf-8"}},
qH:{"^":"cR;",
fT:function(a,b,c){var z,y,x,w,v
z=a.length
P.eD(b,c,z,null,null,null)
y=z-b
if(y===0)return new Uint8Array(H.kD(0))
x=H.kD(y*3)
w=new Uint8Array(x)
v=new P.rr(0,0,w)
if(v.fj(a,b,z)!==z)v.dI(C.h.bl(a,z-1),0)
return new Uint8Array(w.subarray(0,H.rv(0,v.b,x)))},
fS:function(a){return this.fT(a,0,null)},
$ascR:function(){return[P.y,[P.m,P.x]]}},
rr:{"^":"i;a,b,c",
dI:function(a,b){var z,y,x,w,v
z=this.c
y=this.b
x=z.length
w=y+1
if((b&64512)===56320){v=65536+((a&1023)<<10)|b&1023
this.b=w
if(y>=x)return H.c(z,y)
z[y]=240|v>>>18
y=w+1
this.b=y
if(w>=x)return H.c(z,w)
z[w]=128|v>>>12&63
w=y+1
this.b=w
if(y>=x)return H.c(z,y)
z[y]=128|v>>>6&63
this.b=w+1
if(w>=x)return H.c(z,w)
z[w]=128|v&63
return!0}else{this.b=w
if(y>=x)return H.c(z,y)
z[y]=224|a>>>12
y=w+1
this.b=y
if(w>=x)return H.c(z,w)
z[w]=128|a>>>6&63
this.b=y+1
if(y>=x)return H.c(z,y)
z[y]=128|a&63
return!1}},
fj:function(a,b,c){var z,y,x,w,v,u,t
if(b!==c&&(C.h.bl(a,c-1)&64512)===55296)--c
for(z=this.c,y=z.length,x=b;x<c;++x){w=C.h.b4(a,x)
if(w<=127){v=this.b
if(v>=y)break
this.b=v+1
z[v]=w}else if((w&64512)===55296){if(this.b+3>=y)break
u=x+1
if(this.dI(w,C.h.b4(a,u)))x=u}else if(w<=2047){v=this.b
t=v+1
if(t>=y)break
this.b=t
if(v>=y)return H.c(z,v)
z[v]=192|w>>>6
this.b=t+1
z[t]=128|w&63}else{v=this.b
if(v+2>=y)break
t=v+1
this.b=t
if(v>=y)return H.c(z,v)
z[v]=224|w>>>12
v=t+1
this.b=v
if(t>=y)return H.c(z,t)
z[t]=128|w>>>6&63
this.b=v+1
if(v>=y)return H.c(z,v)
z[v]=128|w&63}}return x}}}],["","",,P,{"^":"",
vh:[function(a,b){return J.bu(a,b)},"$2","u_",4,0,28,20,21],
ck:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.aF(a)
if(typeof a==="string")return JSON.stringify(a)
return P.mq(a)},
mq:function(a){var z=J.t(a)
if(!!z.$isa)return z.A(a)
return H.de(a)},
d0:function(a){return new P.qX(a)},
b_:function(a,b,c){var z,y
z=H.E([],[c])
for(y=J.a7(a);y.m();)z.push(y.gq())
if(b)return z
z.fixed$length=Array
return z},
kU:function(a,b){var z,y
z=J.c5(a)
y=H.Q(z,null,P.u1())
if(y!=null)return y
y=H.Z(z,P.u0())
if(y!=null)return y
return b.$1(a)},
xc:[function(a){return},"$1","u1",2,0,29],
xb:[function(a){return},"$1","u0",2,0,30],
c2:function(a){H.fc(H.d(a))},
ae:function(a,b,c){return new H.ii(a,H.ej(a,!1,!0,!1),null,null)},
eW:function(a,b,c,d){var z,y,x,w,v,u
if(c===C.r&&$.$get$kB().b.test(b))return b
z=C.L.fS(b)
for(y=z.length,x=0,w="";x<y;++x){v=z[x]
if(v<128){u=v>>>4
if(u>=8)return H.c(a,u)
u=(a[u]&1<<(v&15))!==0}else u=!1
if(u)w+=H.pM(v)
else w=w+"%"+"0123456789ABCDEF"[v>>>4&15]+"0123456789ABCDEF"[v&15]}return w.charCodeAt(0)==0?w:w},
oR:{"^":"a:21;a,b",
$2:function(a,b){var z,y,x
z=this.b
y=this.a
z.F+=y.a
x=z.F+=H.d(a.gfm())
z.F=x+": "
z.F+=H.d(P.ck(b))
y.a=", "}},
bH:{"^":"i;"},
"+bool":0,
aj:{"^":"i;$ti"},
cT:{"^":"i;fC:a<,b",
O:function(a,b){if(b==null)return!1
if(!(b instanceof P.cT))return!1
return this.a===b.a&&this.b===b.b},
aM:function(a,b){return C.a.aM(this.a,b.gfC())},
gab:function(a){var z=this.a
return(z^C.a.cG(z,30))&1073741823},
A:function(a){var z,y,x,w,v,u,t
z=P.mb(H.pL(this))
y=P.ca(H.pJ(this))
x=P.ca(H.pF(this))
w=P.ca(H.pG(this))
v=P.ca(H.pI(this))
u=P.ca(H.pK(this))
t=P.mc(H.pH(this))
if(this.b)return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t+"Z"
else return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t},
ghy:function(){return this.a},
eX:function(a,b){var z
if(!(Math.abs(this.a)>864e13))z=!1
else z=!0
if(z)throw H.f(P.c6(this.ghy()))},
$isaj:1,
$asaj:function(){return[P.cT]},
D:{
mb:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.d(z)
if(z>=10)return y+"00"+H.d(z)
return y+"000"+H.d(z)},
mc:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
ca:function(a){if(a>=10)return""+a
return"0"+a}}},
a6:{"^":"aC;",$isaj:1,
$asaj:function(){return[P.aC]}},
"+double":0,
aX:{"^":"i;b5:a<",
n:function(a,b){return new P.aX(this.a+b.gb5())},
ae:function(a,b){return new P.aX(this.a-b.gb5())},
X:function(a,b){if(typeof b!=="number")return H.C(b)
return new P.aX(C.a.cb(this.a*b))},
bg:function(a,b){if(b===0)throw H.f(new P.n8())
return new P.aX(C.e.bg(this.a,b))},
aJ:function(a,b){return C.e.aJ(this.a,b.gb5())},
ao:function(a,b){return this.a>b.gb5()},
cf:function(a,b){return C.e.cf(this.a,b.gb5())},
bp:function(a,b){return C.e.bp(this.a,b.gb5())},
O:function(a,b){if(b==null)return!1
if(!(b instanceof P.aX))return!1
return this.a===b.a},
gab:function(a){return this.a&0x1FFFFFFF},
aM:function(a,b){return C.e.aM(this.a,b.gb5())},
A:function(a){var z,y,x,w,v
z=new P.mg()
y=this.a
if(y<0)return"-"+new P.aX(0-y).A(0)
x=z.$1(C.e.as(y,6e7)%60)
w=z.$1(C.e.as(y,1e6)%60)
v=new P.mf().$1(y%1e6)
return""+C.e.as(y,36e8)+":"+H.d(x)+":"+H.d(w)+"."+H.d(v)},
dJ:function(a){return new P.aX(Math.abs(this.a))},
bP:function(a){return new P.aX(0-this.a)},
$isaj:1,
$asaj:function(){return[P.aX]}},
mf:{"^":"a:15;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
mg:{"^":"a:15;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
ak:{"^":"i;"},
iz:{"^":"ak;",
A:function(a){return"Throw of null."}},
aV:{"^":"ak;a,b,E:c>,d",
gcw:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gcv:function(){return""},
A:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.d(z)
w=this.gcw()+y+x
if(!this.a)return w
v=this.gcv()
u=P.ck(this.b)
return w+v+": "+H.d(u)},
D:{
c6:function(a){return new P.aV(!1,null,null,a)},
cO:function(a,b,c){return new P.aV(!0,a,b,c)},
fw:function(a){return new P.aV(!1,null,a,"Must not be null")}}},
df:{"^":"aV;e,f,a,b,c,d",
gcw:function(){return"RangeError"},
gcv:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.d(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.d(z)
else if(x>z)y=": Not in range "+H.d(z)+".."+H.d(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.d(z)}return y},
D:{
bB:function(a,b,c){return new P.df(null,null,!0,a,b,"Value not in range")},
ab:function(a,b,c,d,e){return new P.df(b,c,!0,a,d,"Invalid value")},
eD:function(a,b,c,d,e,f){if(0>a||a>c)throw H.f(P.ab(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.f(P.ab(b,a,c,"end",f))
return b}return c}}},
n7:{"^":"aV;e,k:f>,a,b,c,d",
gcw:function(){return"RangeError"},
gcv:function(){if(J.b2(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.d(z)},
D:{
aZ:function(a,b,c,d,e){var z=e!=null?e:J.aL(b)
return new P.n7(b,z,!0,a,c,"Index out of range")}}},
oQ:{"^":"ak;a,b,c,d,e",
A:function(a){var z,y,x,w,v,u,t,s
z={}
y=new P.bD("")
z.a=""
for(x=this.c,w=x.length,v=0;v<w;++v){u=x[v]
y.F+=z.a
y.F+=H.d(P.ck(u))
z.a=", "}this.d.a4(0,new P.oR(z,y))
t=P.ck(this.a)
s=y.A(0)
x="NoSuchMethodError: method not found: '"+H.d(this.b.a)+"'\nReceiver: "+H.d(t)+"\nArguments: ["+s+"]"
return x},
D:{
iu:function(a,b,c,d,e){return new P.oQ(a,b,c,d,e)}}},
a1:{"^":"ak;a",
A:function(a){return"Unsupported operation: "+this.a}},
ko:{"^":"ak;a",
A:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.d(z):"UnimplementedError"}},
W:{"^":"ak;a",
A:function(a){return"Bad state: "+this.a}},
a9:{"^":"ak;a",
A:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.d(P.ck(z))+"."}},
oV:{"^":"i;",
A:function(a){return"Out of Memory"},
$isak:1},
k6:{"^":"i;",
A:function(a){return"Stack Overflow"},
$isak:1},
ma:{"^":"ak;a",
A:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.d(z)+"' during its initialization"}},
qX:{"^":"i;a",
A:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.d(z)}},
d8:{"^":"i;a,b,c",
A:function(a){var z,y,x
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.d(z):"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.h.aX(x,0,75)+"..."
return y+"\n"+x}},
n8:{"^":"i;",
A:function(a){return"IntegerDivisionByZeroException"}},
mr:{"^":"i;E:a>,dC,$ti",
A:function(a){return"Expando:"+H.d(this.a)},
h:function(a,b){var z,y
z=this.dC
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.R(P.cO(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.eB(b,"expando$values")
return y==null?null:H.eB(y,z)},
i:function(a,b,c){var z,y
z=this.dC
if(typeof z!=="string")z.set(b,c)
else{y=H.eB(b,"expando$values")
if(y==null){y=new P.i()
H.iS(b,"expando$values",y)}H.iS(y,z,c)}}},
x:{"^":"aC;",$isaj:1,
$asaj:function(){return[P.aC]}},
"+int":0,
k:{"^":"i;$ti",
b1:function(a,b){return H.bA(this,b,H.ap(this,"k",0),null)},
da:["eL",function(a,b){return new H.eM(this,b,[H.ap(this,"k",0)])}],
M:function(a,b){var z
for(z=this.gB(this);z.m();)if(J.v(z.gq(),b))return!0
return!1},
a4:function(a,b){var z
for(z=this.gB(this);z.m();)b.$1(z.gq())},
bX:function(a,b){var z
for(z=this.gB(this);z.m();)if(b.$1(z.gq())===!0)return!0
return!1},
bL:function(a,b){return P.b_(this,!0,H.ap(this,"k",0))},
cc:function(a){return this.bL(a,!0)},
gk:function(a){var z,y
z=this.gB(this)
for(y=0;z.m();)++y
return y},
gW:function(a){return!this.gB(this).m()},
gaa:function(a){var z=this.gB(this)
if(!z.m())throw H.f(H.aq())
return z.gq()},
gal:function(a){var z,y
z=this.gB(this)
if(!z.m())throw H.f(H.aq())
do y=z.gq()
while(z.m())
return y},
gbf:function(a){var z,y
z=this.gB(this)
if(!z.m())throw H.f(H.aq())
y=z.gq()
if(z.m())throw H.f(H.nw())
return y},
a9:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(P.fw("index"))
if(b<0)H.R(P.ab(b,0,null,"index",null))
for(z=this.gB(this),y=0;z.m();){x=z.gq()
if(b===y)return x;++y}throw H.f(P.aZ(b,this,"index",null,y))},
A:function(a){return P.nu(this,"(",")")},
$ask:null},
ei:{"^":"i;$ti"},
m:{"^":"i;$ti",$asm:null,$isl:1,$asl:null,$isk:1,$ask:null},
"+List":0,
F:{"^":"i;$ti"},
ix:{"^":"i;",
gab:function(a){return P.i.prototype.gab.call(this,this)},
A:function(a){return"null"}},
"+Null":0,
aC:{"^":"i;",$isaj:1,
$asaj:function(){return[P.aC]}},
"+num":0,
i:{"^":";",
O:function(a,b){return this===b},
gab:function(a){return H.bq(this)},
A:["eP",function(a){return H.de(this)}],
d1:function(a,b){throw H.f(P.iu(this,b.geb(),b.gef(),b.ged(),null))},
gaf:function(a){return new H.cB(H.f8(this),null)},
toString:function(){return this.A(this)}},
ct:{"^":"i;"},
q5:{"^":"l;$ti"},
y:{"^":"i;",$isaj:1,
$asaj:function(){return[P.y]},
$isez:1},
"+String":0,
bD:{"^":"i;F@",
gk:function(a){return this.F.length},
gW:function(a){return this.F.length===0},
A:function(a){var z=this.F
return z.charCodeAt(0)==0?z:z},
D:{
k7:function(a,b,c){var z=J.a7(b)
if(!z.m())return a
if(c.length===0){do a+=H.d(z.gq())
while(z.m())}else{a+=H.d(z.gq())
for(;z.m();)a=a+c+H.d(z.gq())}return a}}},
cy:{"^":"i;"}}],["","",,W,{"^":"",
cN:function(a){var z=document.createElement("a")
return z},
dS:function(a,b){var z=document.createElement("canvas")
return z},
cb:function(a,b,c){var z,y
z=document.body
y=(z&&C.A).aN(z,a,b,c)
y.toString
z=new H.eM(new W.az(y),new W.rT(),[W.z])
return z.gbf(z)},
bN:function(a){var z,y,x,w
z="element tag unavailable"
try{y=J.e(a)
x=y.gej(a)
if(typeof x==="string")z=y.gej(a)}catch(w){H.ah(w)}return z},
ag:function(a){var z,y,x
y=document.createElement("input")
z=y
try{J.lp(z,a)}catch(x){H.ah(x)}return z},
oU:function(a,b,c,d){var z=new Option(a,b,c,!1)
return z},
br:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
kw:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
ry:function(a){if(a==null)return
return W.eQ(a)},
rx:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.eQ(a)
if(!!J.t(z).$isal)return z
return}else return a},
H:{"^":"N;","%":"HTMLAudioElement|HTMLBRElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLImageElement|HTMLLabelElement|HTMLLegendElement|HTMLMarqueeElement|HTMLMediaElement|HTMLModElement|HTMLParagraphElement|HTMLPictureElement|HTMLPreElement|HTMLQuoteElement|HTMLShadowElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableHeaderCellElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|HTMLVideoElement;HTMLElement"},
lt:{"^":"H;b2:target=,R:type%,c5:href}",
A:function(a){return String(a)},
$isn:1,
"%":"HTMLAnchorElement"},
vb:{"^":"H;b2:target=,c5:href}",
A:function(a){return String(a)},
$isn:1,
"%":"HTMLAreaElement"},
vc:{"^":"H;c5:href},b2:target=","%":"HTMLBaseElement"},
cP:{"^":"n;R:type=",$iscP:1,"%":";Blob"},
dP:{"^":"H;",$isdP:1,$isal:1,$isn:1,"%":"HTMLBodyElement"},
vd:{"^":"H;aC:disabled},E:name%,R:type%,N:value%","%":"HTMLButtonElement"},
lx:{"^":"H;",
er:function(a,b,c){return a.getContext(b)},
cd:function(a,b){return this.er(a,b,null)},
"%":"HTMLCanvasElement"},
vf:{"^":"n;aP:fillStyle%,c4:font},bO:globalCompositeOperation},cm:strokeStyle},d5:textAlign}",
Y:function(a){return a.beginPath()},
fM:function(a,b,c,d,e){return a.clearRect(b,c,d,e)},
fV:function(a,b,c,d,e){return a.createLinearGradient(b,c,d,e)},
fW:function(a,b,c,d,e,f,g){return a.createRadialGradient(b,c,d,e,f,g)},
hh:function(a,b,c,d,e){return a.fillRect(b,c,d,e)},
hX:function(a,b){return a.stroke(b)},
a3:function(a){return a.stroke()},
eF:function(a,b,c,d,e){return a.strokeRect(b,c,d,e)},
a8:function(a){return a.closePath()},
P:function(a,b,c){return a.lineTo(b,c)},
ad:function(a,b,c){return a.moveTo(b,c)},
dP:function(a,b,c,d,e,f,g){a.arc(b,c,d,e,f,g)},
ax:function(a,b,c,d,e,f){return this.dP(a,b,c,d,e,f,!1)},
hi:function(a,b,c,d,e){a.fillText(b,c,d)},
bm:function(a,b,c,d){return this.hi(a,b,c,d,null)},
hg:function(a,b){a.fill(b)},
av:function(a){return this.hg(a,"nonzero")},
"%":"CanvasRenderingContext2D"},
lz:{"^":"z;k:length=",$isn:1,"%":"CDATASection|Comment|Text;CharacterData"},
vg:{"^":"n;aH:id=","%":"Client|WindowClient"},
vi:{"^":"n9;k:length=","%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
n9:{"^":"n+lV;"},
lV:{"^":"i;"},
vj:{"^":"aG;N:value=","%":"DeviceLightEvent"},
dW:{"^":"H;",$isdW:1,"%":"HTMLDivElement"},
vk:{"^":"z;",
gb8:function(a){if(a._docChildren==null)a._docChildren=new P.i4(a,new W.az(a))
return a._docChildren},
$isn:1,
"%":"DocumentFragment|ShadowRoot"},
vl:{"^":"n;E:name=","%":"DOMError|FileError"},
vm:{"^":"n;",
gE:function(a){var z=a.name
if(P.fK()===!0&&z==="SECURITY_ERR")return"SecurityError"
if(P.fK()===!0&&z==="SYNTAX_ERR")return"SyntaxError"
return z},
A:function(a){return String(a)},
"%":"DOMException"},
me:{"^":"n;",
A:function(a){return"Rectangle ("+H.d(a.left)+", "+H.d(a.top)+") "+H.d(this.gbd(a))+" x "+H.d(this.gbb(a))},
O:function(a,b){var z
if(b==null)return!1
z=J.t(b)
if(!z.$iscw)return!1
return a.left===z.gcZ(b)&&a.top===z.gd6(b)&&this.gbd(a)===z.gbd(b)&&this.gbb(a)===z.gbb(b)},
gab:function(a){var z,y,x,w
z=a.left
y=a.top
x=this.gbd(a)
w=this.gbb(a)
return W.kw(W.br(W.br(W.br(W.br(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),w&0x1FFFFFFF))},
gbb:function(a){return a.height},
gcZ:function(a){return a.left},
gd6:function(a){return a.top},
gbd:function(a){return a.width},
gv:function(a){return a.x},
gt:function(a){return a.y},
$iscw:1,
$ascw:I.ac,
"%":";DOMRectReadOnly"},
vn:{"^":"n;k:length=,N:value%",
M:function(a,b){return a.contains(b)},
"%":"DOMTokenList"},
qQ:{"^":"bU;cA:a<,b",
M:function(a,b){return J.aE(this.b,b)},
gW:function(a){return this.a.firstElementChild==null},
gk:function(a){return this.b.length},
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.c(z,b)
return z[b]},
i:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.c(z,b)
this.a.replaceChild(c,z[b])},
gB:function(a){var z=this.cc(this)
return new J.c7(z,z.length,0,null,[H.a2(z,0)])},
gaa:function(a){var z=this.a.firstElementChild
if(z==null)throw H.f(new P.W("No elements"))
return z},
gal:function(a){var z=this.a.lastElementChild
if(z==null)throw H.f(new P.W("No elements"))
return z},
$asbU:function(){return[W.N]},
$asdc:function(){return[W.N]},
$asm:function(){return[W.N]},
$asl:function(){return[W.N]},
$ask:function(){return[W.N]}},
N:{"^":"z;dk:style=,cP:className=,aH:id=,cC:namespaceURI=,ej:tagName=",
gfG:function(a){return new W.qT(a)},
gb8:function(a){return new W.qQ(a,a.children)},
gdT:function(a){return new W.qU(a)},
A:function(a){return a.localName},
aN:["cn",function(a,b,c,d){var z,y,x,w,v
if(c==null){z=$.fM
if(z==null){z=H.E([],[W.iv])
y=new W.iw(z)
z.push(W.ku(null))
z.push(W.kA())
$.fM=y
d=y}else d=z
z=$.fL
if(z==null){z=new W.kC(d)
$.fL=z
c=z}else{z.a=d
c=z}}if($.b4==null){z=document
y=z.implementation.createHTMLDocument("")
$.b4=y
$.dY=y.createRange()
y=$.b4
y.toString
x=y.createElement("base")
J.lm(x,z.baseURI)
$.b4.head.appendChild(x)}z=$.b4
if(z.body==null){z.toString
y=z.createElement("body")
z.body=y}z=$.b4
if(!!this.$isdP)w=z.body
else{y=a.tagName
z.toString
w=z.createElement(y)
$.b4.body.appendChild(w)}if("createContextualFragment" in window.Range.prototype&&!C.f.M(C.W,a.tagName)){$.dY.selectNodeContents(w)
v=$.dY.createContextualFragment(b)}else{w.innerHTML=b
v=$.b4.createDocumentFragment()
for(;z=w.firstChild,z!=null;)v.appendChild(z)}z=$.b4.body
if(w==null?z!=null:w!==z)J.dL(w)
c.de(v)
document.adoptNode(v)
return v},function(a,b,c){return this.aN(a,b,c,null)},"fU",null,null,"ghY",2,5,null,5,5],
sea:function(a,b){this.L(a,b)},
cj:function(a,b,c,d){a.textContent=null
a.appendChild(this.aN(a,b,c,d))},
L:function(a,b){return this.cj(a,b,null,null)},
bk:function(a){return a.click()},
bn:function(a){return a.focus()},
$isN:1,
$isz:1,
$isi:1,
$isn:1,
$isal:1,
"%":";Element"},
rT:{"^":"a:3;",
$1:function(a){return!!J.t(a).$isN}},
vo:{"^":"H;E:name%,R:type%","%":"HTMLEmbedElement"},
aG:{"^":"n;R:type=",
gb2:function(a){return W.rx(a.target)},
bJ:function(a){return a.preventDefault()},
aS:function(a){return a.stopImmediatePropagation()},
a2:function(a){return a.stopPropagation()},
$isaG:1,
$isi:1,
"%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|ClipboardEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionError|SpeechRecognitionEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
al:{"^":"n;",
C:function(a,b,c,d){return a.addEventListener(b,H.c0(c,1),d)},
fu:function(a,b,c,d){return a.removeEventListener(b,H.c0(c,1),d)},
$isal:1,
"%":"MessagePort;EventTarget"},
vH:{"^":"H;aC:disabled},E:name%,R:type=","%":"HTMLFieldSetElement"},
aw:{"^":"cP;E:name=",$isaw:1,$isi:1,"%":"File"},
vI:{"^":"ng;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.f(P.aZ(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.f(new P.a1("Cannot assign element of immutable List."))},
gaa:function(a){if(a.length>0)return a[0]
throw H.f(new P.W("No elements"))},
gal:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.f(new P.W("No elements"))},
a9:function(a,b){if(b>>>0!==b||b>=a.length)return H.c(a,b)
return a[b]},
$isam:1,
$asam:function(){return[W.aw]},
$isad:1,
$asad:function(){return[W.aw]},
$ism:1,
$asm:function(){return[W.aw]},
$isl:1,
$asl:function(){return[W.aw]},
$isk:1,
$ask:function(){return[W.aw]},
"%":"FileList"},
na:{"^":"n+ax;",
$asm:function(){return[W.aw]},
$asl:function(){return[W.aw]},
$ask:function(){return[W.aw]},
$ism:1,
$isl:1,
$isk:1},
ng:{"^":"na+bm;",
$asm:function(){return[W.aw]},
$asl:function(){return[W.aw]},
$ask:function(){return[W.aw]},
$ism:1,
$isl:1,
$isk:1},
n3:{"^":"al;",
gap:function(a){var z,y
z=a.result
if(!!J.t(z).$isfA){y=new Uint8Array(z,0)
return y}return z},
"%":"FileReader"},
vN:{"^":"H;k:length=,E:name%,b2:target=","%":"HTMLFormElement"},
vO:{"^":"aG;aH:id=","%":"GeofencingEvent"},
vP:{"^":"nh;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.f(P.aZ(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.f(new P.a1("Cannot assign element of immutable List."))},
gaa:function(a){if(a.length>0)return a[0]
throw H.f(new P.W("No elements"))},
gal:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.f(new P.W("No elements"))},
a9:function(a,b){if(b>>>0!==b||b>=a.length)return H.c(a,b)
return a[b]},
$ism:1,
$asm:function(){return[W.z]},
$isl:1,
$asl:function(){return[W.z]},
$isk:1,
$ask:function(){return[W.z]},
$isam:1,
$asam:function(){return[W.z]},
$isad:1,
$asad:function(){return[W.z]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
nb:{"^":"n+ax;",
$asm:function(){return[W.z]},
$asl:function(){return[W.z]},
$ask:function(){return[W.z]},
$ism:1,
$isl:1,
$isk:1},
nh:{"^":"nb+bm;",
$asm:function(){return[W.z]},
$asl:function(){return[W.z]},
$ask:function(){return[W.z]},
$ism:1,
$isl:1,
$isk:1},
vQ:{"^":"H;E:name%","%":"HTMLIFrameElement"},
eh:{"^":"n;",$iseh:1,"%":"ImageData"},
i8:{"^":"H;b7:checked},aC:disabled},E:name%,aL:step},R:type%,N:value%",$isi8:1,$isN:1,$isn:1,$isal:1,$isz:1,$iscm:1,$isiT:1,$isfB:1,$isaI:1,$iskc:1,"%":"HTMLInputElement"},
vX:{"^":"H;aC:disabled},E:name%,R:type=","%":"HTMLKeygenElement"},
vY:{"^":"H;N:value%","%":"HTMLLIElement"},
w_:{"^":"H;aC:disabled},c5:href},R:type%","%":"HTMLLinkElement"},
w0:{"^":"n;",
A:function(a){return String(a)},
"%":"Location"},
w1:{"^":"H;cM:areas=,E:name%","%":"HTMLMapElement"},
w4:{"^":"al;b0:active=,aH:id=","%":"MediaStream"},
w5:{"^":"H;R:type%","%":"HTMLMenuElement"},
w6:{"^":"H;b7:checked},aC:disabled},e7:icon=,R:type%","%":"HTMLMenuItemElement"},
w7:{"^":"H;E:name%","%":"HTMLMetaElement"},
w8:{"^":"H;N:value%","%":"HTMLMeterElement"},
w9:{"^":"nR;",
hW:function(a,b,c){return a.send(b,c)},
ci:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
nR:{"^":"al;aH:id=,E:name=,R:type=","%":"MIDIInput;MIDIPort"},
et:{"^":"qE;a7:button=",$iset:1,$isaG:1,$isi:1,"%":"DragEvent|MouseEvent|PointerEvent|WheelEvent"},
wk:{"^":"n;",$isn:1,"%":"Navigator"},
wl:{"^":"n;E:name=","%":"NavigatorUserMediaError"},
az:{"^":"bU;a",
gaa:function(a){var z=this.a.firstChild
if(z==null)throw H.f(new P.W("No elements"))
return z},
gal:function(a){var z=this.a.lastChild
if(z==null)throw H.f(new P.W("No elements"))
return z},
gbf:function(a){var z,y
z=this.a
y=z.childNodes.length
if(y===0)throw H.f(new P.W("No elements"))
if(y>1)throw H.f(new P.W("More than one element"))
return z.firstChild},
ar:function(a,b){var z,y,x,w
z=b.a
y=this.a
if(z!==y)for(x=z.childNodes.length,w=0;w<x;++w)y.appendChild(z.firstChild)
return},
i:function(a,b,c){var z,y
z=this.a
y=z.childNodes
if(b>>>0!==b||b>=y.length)return H.c(y,b)
z.replaceChild(c,y[b])},
gB:function(a){var z=this.a.childNodes
return new W.i6(z,z.length,-1,null,[H.ap(z,"bm",0)])},
gk:function(a){return this.a.childNodes.length},
h:function(a,b){var z=this.a.childNodes
if(b>>>0!==b||b>=z.length)return H.c(z,b)
return z[b]},
$asbU:function(){return[W.z]},
$asdc:function(){return[W.z]},
$asm:function(){return[W.z]},
$asl:function(){return[W.z]},
$ask:function(){return[W.z]}},
z:{"^":"al;aw:parentElement=,d2:parentNode=,hF:previousSibling=",
ghC:function(a){return new W.az(a)},
aA:function(a){var z=a.parentNode
if(z!=null)z.removeChild(a)},
hP:function(a,b){var z,y
try{z=a.parentNode
J.l3(z,b,a)}catch(y){H.ah(y)}return a},
A:function(a){var z=a.nodeValue
return z==null?this.eK(a):z},
M:function(a,b){return a.contains(b)},
fv:function(a,b,c){return a.replaceChild(b,c)},
$isz:1,
$isi:1,
"%":"Document|HTMLDocument|XMLDocument;Node"},
wm:{"^":"ni;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.f(P.aZ(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.f(new P.a1("Cannot assign element of immutable List."))},
gaa:function(a){if(a.length>0)return a[0]
throw H.f(new P.W("No elements"))},
gal:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.f(new P.W("No elements"))},
a9:function(a,b){if(b>>>0!==b||b>=a.length)return H.c(a,b)
return a[b]},
$ism:1,
$asm:function(){return[W.z]},
$isl:1,
$asl:function(){return[W.z]},
$isk:1,
$ask:function(){return[W.z]},
$isam:1,
$asam:function(){return[W.z]},
$isad:1,
$asad:function(){return[W.z]},
"%":"NodeList|RadioNodeList"},
nc:{"^":"n+ax;",
$asm:function(){return[W.z]},
$asl:function(){return[W.z]},
$ask:function(){return[W.z]},
$ism:1,
$isl:1,
$isk:1},
ni:{"^":"nc+bm;",
$asm:function(){return[W.z]},
$asl:function(){return[W.z]},
$ask:function(){return[W.z]},
$ism:1,
$isl:1,
$isk:1},
wo:{"^":"H;R:type%","%":"HTMLOListElement"},
wp:{"^":"H;E:name%,R:type%","%":"HTMLObjectElement"},
wq:{"^":"H;aC:disabled}","%":"HTMLOptGroupElement"},
wr:{"^":"H;aC:disabled},N:value%","%":"HTMLOptionElement"},
ws:{"^":"H;E:name%,R:type=,N:value%","%":"HTMLOutputElement"},
wt:{"^":"H;E:name%,N:value%","%":"HTMLParamElement"},
wv:{"^":"lz;b2:target=","%":"ProcessingInstruction"},
ww:{"^":"H;N:value%","%":"HTMLProgressElement"},
eC:{"^":"aG;",$iseC:1,$isaG:1,$isi:1,"%":"ProgressEvent|ResourceProgressEvent"},
wA:{"^":"H;R:type%","%":"HTMLScriptElement"},
q4:{"^":"H;aC:disabled},k:length=,E:name%,R:type=,N:value%","%":"HTMLSelectElement"},
wB:{"^":"H;E:name%","%":"HTMLSlotElement"},
wC:{"^":"H;R:type%","%":"HTMLSourceElement"},
qq:{"^":"H;","%":"HTMLSpanElement"},
wD:{"^":"aG;E:name=","%":"SpeechSynthesisEvent"},
wE:{"^":"H;aC:disabled},R:type%","%":"HTMLStyleElement"},
qw:{"^":"H;",
aN:function(a,b,c,d){var z,y
if("createContextualFragment" in window.Range.prototype)return this.cn(a,b,c,d)
z=W.cb("<table>"+b+"</table>",c,d)
y=document.createDocumentFragment()
y.toString
new W.az(y).ar(0,J.lb(z))
return y},
"%":"HTMLTableElement"},
qx:{"^":"H;",
aN:function(a,b,c,d){var z,y,x,w
if("createContextualFragment" in window.Range.prototype)return this.cn(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.H.aN(z.createElement("table"),b,c,d)
z.toString
z=new W.az(z)
x=z.gbf(z)
x.toString
z=new W.az(x)
w=z.gbf(z)
y.toString
w.toString
new W.az(y).ar(0,new W.az(w))
return y},
"%":"HTMLTableRowElement"},
wI:{"^":"H;",
aN:function(a,b,c,d){var z,y,x
if("createContextualFragment" in window.Range.prototype)return this.cn(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.H.aN(z.createElement("table"),b,c,d)
z.toString
z=new W.az(z)
x=z.gbf(z)
y.toString
x.toString
new W.az(y).ar(0,new W.az(x))
return y},
"%":"HTMLTableSectionElement"},
ka:{"^":"H;",
cj:function(a,b,c,d){var z
a.textContent=null
z=this.aN(a,b,c,d)
a.content.appendChild(z)},
L:function(a,b){return this.cj(a,b,null,null)},
$iska:1,
"%":"HTMLTemplateElement"},
dk:{"^":"H;aC:disabled},E:name%,R:type=,N:value%",$isdk:1,"%":"HTMLTextAreaElement"},
qE:{"^":"aG;","%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent|TouchEvent;UIEvent"},
eN:{"^":"al;E:name=",
gaw:function(a){return W.ry(a.parent)},
$iseN:1,
$isn:1,
$isal:1,
"%":"DOMWindow|Window"},
wU:{"^":"z;E:name=,cC:namespaceURI=,N:value%","%":"Attr"},
wV:{"^":"n;bb:height=,cZ:left=,d6:top=,bd:width=",
A:function(a){return"Rectangle ("+H.d(a.left)+", "+H.d(a.top)+") "+H.d(a.width)+" x "+H.d(a.height)},
O:function(a,b){var z,y,x
if(b==null)return!1
z=J.t(b)
if(!z.$iscw)return!1
y=a.left
x=z.gcZ(b)
if(y==null?x==null:y===x){y=a.top
x=z.gd6(b)
if(y==null?x==null:y===x){y=a.width
x=z.gbd(b)
if(y==null?x==null:y===x){y=a.height
z=z.gbb(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gab:function(a){var z,y,x,w
z=J.aU(a.left)
y=J.aU(a.top)
x=J.aU(a.width)
w=J.aU(a.height)
return W.kw(W.br(W.br(W.br(W.br(0,z),y),x),w))},
$iscw:1,
$ascw:I.ac,
"%":"ClientRect"},
wW:{"^":"z;",$isn:1,"%":"DocumentType"},
wX:{"^":"me;",
gbb:function(a){return a.height},
gbd:function(a){return a.width},
gv:function(a){return a.x},
sv:function(a,b){a.x=b},
gt:function(a){return a.y},
st:function(a,b){a.y=b},
"%":"DOMRect"},
wZ:{"^":"H;",$isal:1,$isn:1,"%":"HTMLFrameSetElement"},
x1:{"^":"nj;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.f(P.aZ(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.f(new P.a1("Cannot assign element of immutable List."))},
gaa:function(a){if(a.length>0)return a[0]
throw H.f(new P.W("No elements"))},
gal:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.f(new P.W("No elements"))},
a9:function(a,b){if(b>>>0!==b||b>=a.length)return H.c(a,b)
return a[b]},
$ism:1,
$asm:function(){return[W.z]},
$isl:1,
$asl:function(){return[W.z]},
$isk:1,
$ask:function(){return[W.z]},
$isam:1,
$asam:function(){return[W.z]},
$isad:1,
$asad:function(){return[W.z]},
"%":"MozNamedAttrMap|NamedNodeMap"},
nd:{"^":"n+ax;",
$asm:function(){return[W.z]},
$asl:function(){return[W.z]},
$ask:function(){return[W.z]},
$ism:1,
$isl:1,
$isk:1},
nj:{"^":"nd+bm;",
$asm:function(){return[W.z]},
$asl:function(){return[W.z]},
$ask:function(){return[W.z]},
$ism:1,
$isl:1,
$isk:1},
x5:{"^":"al;",$isal:1,$isn:1,"%":"ServiceWorker"},
qP:{"^":"i;cA:a<",
a4:function(a,b){var z,y,x,w,v
for(z=this.gH(),y=z.length,x=this.a,w=0;w<z.length;z.length===y||(0,H.r)(z),++w){v=z[w]
b.$2(v,x.getAttribute(v))}},
gH:function(){var z,y,x,w,v,u
z=this.a.attributes
y=H.E([],[P.y])
for(x=z.length,w=0;w<x;++w){if(w>=z.length)return H.c(z,w)
v=z[w]
u=J.e(v)
if(u.gcC(v)==null)y.push(u.gE(v))}return y},
ga5:function(a){var z,y,x,w,v,u
z=this.a.attributes
y=H.E([],[P.y])
for(x=z.length,w=0;w<x;++w){if(w>=z.length)return H.c(z,w)
v=z[w]
u=J.e(v)
if(u.gcC(v)==null)y.push(u.gN(v))}return y},
gW:function(a){return this.gH().length===0},
$isF:1,
$asF:function(){return[P.y,P.y]}},
qT:{"^":"qP;a",
I:function(a){return this.a.hasAttribute(a)},
h:function(a,b){return this.a.getAttribute(b)},
i:function(a,b,c){this.a.setAttribute(b,c)},
gk:function(a){return this.gH().length}},
qU:{"^":"fG;cA:a<",
az:function(){var z,y,x,w,v
z=P.V(null,null,null,P.y)
for(y=this.a.className.split(" "),x=y.length,w=0;w<y.length;y.length===x||(0,H.r)(y),++w){v=J.c5(y[w])
if(v.length!==0)z.S(0,v)}return z},
dc:function(a){this.a.className=a.cX(0," ")},
gk:function(a){return this.a.classList.length},
gW:function(a){return this.a.classList.length===0},
M:function(a,b){return typeof b==="string"&&this.a.classList.contains(b)},
S:function(a,b){var z,y
z=this.a.classList
y=z.contains(b)
z.add(b)
return!y},
an:function(a,b){var z,y
z=this.a.classList
y=z.contains(b)
z.remove(b)
return y}},
eT:{"^":"i;eo:a<",
bi:function(a){return $.$get$kv().M(0,W.bN(a))},
b6:function(a,b,c){var z,y,x
z=W.bN(a)
y=$.$get$eU()
x=y.h(0,H.d(z)+"::"+b)
if(x==null)x=y.h(0,"*::"+b)
if(x==null)return!1
return x.$4(a,b,c,this)},
fa:function(a){var z,y
z=$.$get$eU()
if(z.gW(z)){for(y=0;y<262;++y)z.i(0,C.V[y],W.u7())
for(y=0;y<12;++y)z.i(0,C.y[y],W.u8())}},
D:{
ku:function(a){var z,y
z=W.cN(null)
y=window.location
z=new W.eT(new W.rh(z,y))
z.fa(a)
return z},
x_:[function(a,b,c,d){return!0},"$4","u7",8,0,18,7,8,9,10],
x0:[function(a,b,c,d){var z,y,x,w,v
z=d.geo()
y=z.a
y.href=c
x=y.hostname
z=z.b
w=z.hostname
if(x==null?w==null:x===w){w=y.port
v=z.port
if(w==null?v==null:w===v){w=y.protocol
z=z.protocol
z=w==null?z==null:w===z}else z=!1}else z=!1
if(!z)if(x==="")if(y.port===""){z=y.protocol
z=z===":"||z===""}else z=!1
else z=!1
else z=!0
return z},"$4","u8",8,0,18,7,8,9,10]}},
bm:{"^":"i;$ti",
gB:function(a){return new W.i6(a,this.gk(a),-1,null,[H.ap(a,"bm",0)])},
$ism:1,
$asm:null,
$isl:1,
$asl:null,
$isk:1,
$ask:null},
iw:{"^":"i;a",
bi:function(a){return C.f.bX(this.a,new W.oT(a))},
b6:function(a,b,c){return C.f.bX(this.a,new W.oS(a,b,c))}},
oT:{"^":"a:3;a",
$1:function(a){return a.bi(this.a)}},
oS:{"^":"a:3;a,b,c",
$1:function(a){return a.b6(this.a,this.b,this.c)}},
ri:{"^":"i;eo:d<",
bi:function(a){return this.a.M(0,W.bN(a))},
b6:["eQ",function(a,b,c){var z,y
z=W.bN(a)
y=this.c
if(y.M(0,H.d(z)+"::"+b))return this.d.fE(c)
else if(y.M(0,"*::"+b))return this.d.fE(c)
else{y=this.b
if(y.M(0,H.d(z)+"::"+b))return!0
else if(y.M(0,"*::"+b))return!0
else if(y.M(0,H.d(z)+"::*"))return!0
else if(y.M(0,"*::*"))return!0}return!1}],
fb:function(a,b,c,d){var z,y,x
this.a.ar(0,c)
z=b.da(0,new W.rj())
y=b.da(0,new W.rk())
this.b.ar(0,z)
x=this.c
x.ar(0,C.w)
x.ar(0,y)}},
rj:{"^":"a:3;",
$1:function(a){return!C.f.M(C.y,a)}},
rk:{"^":"a:3;",
$1:function(a){return C.f.M(C.y,a)}},
ro:{"^":"ri;e,a,b,c,d",
b6:function(a,b,c){if(this.eQ(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(J.fl(a).a.getAttribute("template")==="")return this.e.M(0,b)
return!1},
D:{
kA:function(){var z=P.y
z=new W.ro(P.il(C.x,z),P.V(null,null,null,z),P.V(null,null,null,z),P.V(null,null,null,z),null)
z.fb(null,new H.bV(C.x,new W.rp(),[H.a2(C.x,0),null]),["TEMPLATE"],null)
return z}}},
rp:{"^":"a:3;",
$1:[function(a){return"TEMPLATE::"+H.d(a)},null,null,2,0,null,22,"call"]},
rn:{"^":"i;",
bi:function(a){var z=J.t(a)
if(!!z.$isiX)return!1
z=!!z.$isI
if(z&&W.bN(a)==="foreignObject")return!1
if(z)return!0
return!1},
b6:function(a,b,c){if(b==="is"||C.h.cl(b,"on"))return!1
return this.bi(a)}},
i6:{"^":"i;a,b,c,d,$ti",
m:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.a0(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gq:function(){return this.d}},
qS:{"^":"i;a",
gaw:function(a){return W.eQ(this.a.parent)},
$isal:1,
$isn:1,
D:{
eQ:function(a){if(a===window)return a
else return new W.qS(a)}}},
iv:{"^":"i;"},
rh:{"^":"i;a,b"},
kC:{"^":"i;a",
de:function(a){new W.rs(this).$2(a,null)},
bu:function(a,b){var z
if(b==null){z=a.parentNode
if(z!=null)z.removeChild(a)}else b.removeChild(a)},
fA:function(a,b){var z,y,x,w,v,u,t,s
z=!0
y=null
x=null
try{y=J.fl(a)
x=y.gcA().getAttribute("is")
w=function(c){if(!(c.attributes instanceof NamedNodeMap))return true
var r=c.childNodes
if(c.lastChild&&c.lastChild!==r[r.length-1])return true
if(c.children)if(!(c.children instanceof HTMLCollection||c.children instanceof NodeList))return true
var q=0
if(c.children)q=c.children.length
for(var p=0;p<q;p++){var o=c.children[p]
if(o.id=='attributes'||o.name=='attributes'||o.id=='lastChild'||o.name=='lastChild'||o.id=='children'||o.name=='children')return true}return false}(a)
z=w===!0?!0:!(a.attributes instanceof NamedNodeMap)}catch(t){H.ah(t)}v="element unprintable"
try{v=J.aF(a)}catch(t){H.ah(t)}try{u=W.bN(a)
this.fz(a,b,z,v,u,y,x)}catch(t){if(H.ah(t) instanceof P.aV)throw t
else{this.bu(a,b)
window
s="Removing corrupted element "+H.d(v)
if(typeof console!="undefined")console.warn(s)}}},
fz:function(a,b,c,d,e,f,g){var z,y,x,w,v
if(c){this.bu(a,b)
window
z="Removing element due to corrupted attributes on <"+d+">"
if(typeof console!="undefined")console.warn(z)
return}if(!this.a.bi(a)){this.bu(a,b)
window
z="Removing disallowed element <"+H.d(e)+"> from "+J.aF(b)
if(typeof console!="undefined")console.warn(z)
return}if(g!=null)if(!this.a.b6(a,"is",g)){this.bu(a,b)
window
z="Removing disallowed type extension <"+H.d(e)+' is="'+g+'">'
if(typeof console!="undefined")console.warn(z)
return}z=f.gH()
y=H.E(z.slice(0),[H.a2(z,0)])
for(x=f.gH().length-1,z=f.a;x>=0;--x){if(x>=y.length)return H.c(y,x)
w=y[x]
if(!this.a.b6(a,J.ls(w),z.getAttribute(w))){window
v="Removing disallowed attribute <"+H.d(e)+" "+H.d(w)+'="'+H.d(z.getAttribute(w))+'">'
if(typeof console!="undefined")console.warn(v)
z.getAttribute(w)
z.removeAttribute(w)}}if(!!J.t(a).$iska)this.de(a.content)}},
rs:{"^":"a:22;a",
$2:function(a,b){var z,y,x,w,v,u
x=this.a
switch(a.nodeType){case 1:x.fA(a,b)
break
case 8:case 11:case 3:case 4:break
default:x.bu(a,b)}z=a.lastChild
for(x=a==null;null!=z;){y=null
try{y=J.lc(z)}catch(w){H.ah(w)
v=z
if(x){u=J.e(v)
if(u.gd2(v)!=null){u.gd2(v)
u.gd2(v).removeChild(v)}}else a.removeChild(v)
z=null
y=a.lastChild}if(z!=null)this.$2(z,a)
z=y}}}}],["","",,P,{"^":"",
md:function(){var z=$.fI
if(z==null){z=J.fj(window.navigator.userAgent,"Opera",0)
$.fI=z}return z},
fK:function(){var z=$.fJ
if(z==null){z=P.md()!==!0&&J.fj(window.navigator.userAgent,"WebKit",0)
$.fJ=z}return z},
fG:{"^":"i;",
cI:function(a){if($.$get$fH().b.test(a))return a
throw H.f(P.cO(a,"value","Not a valid class token"))},
A:function(a){return this.az().cX(0," ")},
gB:function(a){var z,y
z=this.az()
y=new P.bs(z,z.r,null,null,[null])
y.c=z.e
return y},
a4:function(a,b){this.az().a4(0,b)},
b1:function(a,b){var z=this.az()
return new H.dX(z,b,[H.a2(z,0),null])},
gW:function(a){return this.az().a===0},
gk:function(a){return this.az().a},
M:function(a,b){if(typeof b!=="string")return!1
this.cI(b)
return this.az().M(0,b)},
d_:function(a){return this.M(0,a)?a:null},
S:function(a,b){this.cI(b)
return this.hz(new P.lU(b))},
an:function(a,b){var z,y
this.cI(b)
z=this.az()
y=z.an(0,b)
this.dc(z)
return y},
gaa:function(a){var z=this.az()
return z.gaa(z)},
gal:function(a){var z=this.az()
return z.gal(z)},
a9:function(a,b){return this.az().a9(0,b)},
hz:function(a){var z,y
z=this.az()
y=a.$1(z)
this.dc(z)
return y},
$isl:1,
$asl:function(){return[P.y]},
$isk:1,
$ask:function(){return[P.y]}},
lU:{"^":"a:3;a",
$1:function(a){return a.S(0,this.a)}},
i4:{"^":"bU;a,b",
gbt:function(){var z,y
z=this.b
y=H.ap(z,"ax",0)
return new H.da(new H.eM(z,new P.n4(),[y]),new P.n5(),[y,null])},
a4:function(a,b){C.f.a4(P.b_(this.gbt(),!1,W.N),b)},
i:function(a,b,c){var z=this.gbt()
J.lk(z.b.$1(J.cG(z.a,b)),c)},
M:function(a,b){return!1},
gk:function(a){return J.aL(this.gbt().a)},
h:function(a,b){var z=this.gbt()
return z.b.$1(J.cG(z.a,b))},
gB:function(a){var z=P.b_(this.gbt(),!1,W.N)
return new J.c7(z,z.length,0,null,[H.a2(z,0)])},
$asbU:function(){return[W.N]},
$asdc:function(){return[W.N]},
$asm:function(){return[W.N]},
$asl:function(){return[W.N]},
$ask:function(){return[W.N]}},
n4:{"^":"a:3;",
$1:function(a){return!!J.t(a).$isN}},
n5:{"^":"a:3;",
$1:[function(a){return H.o(a,"$isN")},null,null,2,0,null,23,"call"]}}],["","",,P,{"^":"",en:{"^":"n;",$isen:1,"%":"IDBKeyRange"}}],["","",,P,{"^":"",
ru:[function(a,b,c,d){var z,y,x
if(b===!0){z=[c]
C.f.ar(z,d)
d=z}y=P.b_(J.fr(d,P.up()),!0,null)
x=H.pD(a,y)
return P.dq(x)},null,null,8,0,null,24,25,26,27],
f_:function(a,b,c){var z
try{if(Object.isExtensible(a)&&!Object.prototype.hasOwnProperty.call(a,b)){Object.defineProperty(a,b,{value:c})
return!0}}catch(z){H.ah(z)}return!1},
kF:function(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]
return},
dq:[function(a){var z
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=J.t(a)
if(!!z.$iscs)return a.a
if(!!z.$iscP||!!z.$isaG||!!z.$isen||!!z.$iseh||!!z.$isz||!!z.$isaK||!!z.$iseN)return a
if(!!z.$iscT)return H.ar(a)
if(!!z.$isef)return P.kE(a,"$dart_jsFunction",new P.rz())
return P.kE(a,"_$dart_jsObject",new P.rA($.$get$eZ()))},"$1","kR",2,0,3,3],
kE:function(a,b,c){var z=P.kF(a,b)
if(z==null){z=c.$1(a)
P.f_(a,b,z)}return z},
eY:[function(a){var z,y
if(a==null||typeof a=="string"||typeof a=="number"||typeof a=="boolean")return a
else{if(a instanceof Object){z=J.t(a)
z=!!z.$iscP||!!z.$isaG||!!z.$isen||!!z.$iseh||!!z.$isz||!!z.$isaK||!!z.$iseN}else z=!1
if(z)return a
else if(a instanceof Date){z=0+a.getTime()
y=new P.cT(z,!1)
y.eX(z,!1)
return y}else if(a.constructor===$.$get$eZ())return a.o
else return P.f3(a)}},"$1","up",2,0,31,3],
f3:function(a){if(typeof a=="function")return P.f0(a,$.$get$cS(),new P.rJ())
if(a instanceof Array)return P.f0(a,$.$get$eP(),new P.rK())
return P.f0(a,$.$get$eP(),new P.rL())},
f0:function(a,b,c){var z=P.kF(a,b)
if(z==null||!(a instanceof Object)){z=c.$1(a)
P.f_(a,b,z)}return z},
cs:{"^":"i;a",
h:["eN",function(a,b){if(typeof b!=="string"&&typeof b!=="number")throw H.f(P.c6("property is not a String or num"))
return P.eY(this.a[b])}],
i:["eO",function(a,b,c){if(typeof b!=="string"&&typeof b!=="number")throw H.f(P.c6("property is not a String or num"))
this.a[b]=P.dq(c)}],
gab:function(a){return 0},
O:function(a,b){if(b==null)return!1
return b instanceof P.cs&&this.a===b.a},
A:function(a){var z,y
try{z=String(this.a)
return z}catch(y){H.ah(y)
z=this.eP(this)
return z}},
bY:function(a,b){var z,y
z=this.a
y=b==null?null:P.b_(new H.bV(b,P.kR(),[H.a2(b,0),null]),!0,null)
return P.eY(z[a].apply(z,y))},
D:{
nH:function(a){return new P.nI(new P.r1(0,null,null,null,null,[null,null])).$1(a)}}},
nI:{"^":"a:3;a",
$1:[function(a){var z,y,x,w,v
z=this.a
if(z.I(a))return z.h(0,a)
y=J.t(a)
if(!!y.$isF){x={}
z.i(0,a,x)
for(z=J.a7(a.gH());z.m();){w=z.gq()
x[w]=this.$1(y.h(a,w))}return x}else if(!!y.$isk){v=[]
z.i(0,a,v)
C.f.ar(v,y.b1(a,this))
return v}else return P.dq(a)},null,null,2,0,null,3,"call"]},
nB:{"^":"cs;a",
fF:function(a,b){var z,y
z=P.dq(b)
y=P.b_(new H.bV(a,P.kR(),[H.a2(a,0),null]),!0,null)
return P.eY(this.a.apply(z,y))},
dO:function(a){return this.fF(a,null)}},
ij:{"^":"nG;a,$ti",
h:function(a,b){var z
if(typeof b==="number"&&b===C.a.ek(b)){if(typeof b==="number"&&Math.floor(b)===b)z=b<0||b>=this.gk(this)
else z=!1
if(z)H.R(P.ab(b,0,this.gk(this),null,null))}return this.eN(0,b)},
i:function(a,b,c){var z
if(typeof b==="number"&&b===C.a.ek(b)){if(typeof b==="number"&&Math.floor(b)===b)z=b<0||b>=this.gk(this)
else z=!1
if(z)H.R(P.ab(b,0,this.gk(this),null,null))}this.eO(0,b,c)},
gk:function(a){var z=this.a.length
if(typeof z==="number"&&z>>>0===z)return z
throw H.f(new P.W("Bad JsArray length"))}},
nG:{"^":"cs+ax;$ti",$asm:null,$asl:null,$ask:null,$ism:1,$isl:1,$isk:1},
rz:{"^":"a:3;",
$1:function(a){var z=function(b,c,d){return function(){return b(c,d,this,Array.prototype.slice.apply(arguments))}}(P.ru,a,!1)
P.f_(z,$.$get$cS(),a)
return z}},
rA:{"^":"a:3;a",
$1:function(a){return new this.a(a)}},
rJ:{"^":"a:3;",
$1:function(a){return new P.nB(a)}},
rK:{"^":"a:3;",
$1:function(a){return new P.ij(a,[null])}},
rL:{"^":"a:3;",
$1:function(a){return new P.cs(a)}}}],["","",,P,{"^":"",v9:{"^":"bz;b2:target=",$isn:1,"%":"SVGAElement"},va:{"^":"I;",$isn:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},vp:{"^":"I;bH:mode=,ap:result=,v:x=,t:y=",$isn:1,"%":"SVGFEBlendElement"},vq:{"^":"I;R:type=,a5:values=,ap:result=,v:x=,t:y=",$isn:1,"%":"SVGFEColorMatrixElement"},vr:{"^":"I;ap:result=,v:x=,t:y=",$isn:1,"%":"SVGFEComponentTransferElement"},vs:{"^":"I;ap:result=,v:x=,t:y=",$isn:1,"%":"SVGFECompositeElement"},vt:{"^":"I;ap:result=,v:x=,t:y=",$isn:1,"%":"SVGFEConvolveMatrixElement"},vu:{"^":"I;ap:result=,v:x=,t:y=",$isn:1,"%":"SVGFEDiffuseLightingElement"},vv:{"^":"I;ap:result=,v:x=,t:y=",$isn:1,"%":"SVGFEDisplacementMapElement"},vw:{"^":"I;ap:result=,v:x=,t:y=",$isn:1,"%":"SVGFEFloodElement"},vx:{"^":"I;ap:result=,v:x=,t:y=",$isn:1,"%":"SVGFEGaussianBlurElement"},vy:{"^":"I;ap:result=,v:x=,t:y=",$isn:1,"%":"SVGFEImageElement"},vz:{"^":"I;ap:result=,v:x=,t:y=",$isn:1,"%":"SVGFEMergeElement"},vA:{"^":"I;ap:result=,v:x=,t:y=",$isn:1,"%":"SVGFEMorphologyElement"},vB:{"^":"I;ap:result=,v:x=,t:y=",$isn:1,"%":"SVGFEOffsetElement"},vC:{"^":"I;v:x=,t:y=","%":"SVGFEPointLightElement"},vD:{"^":"I;ap:result=,v:x=,t:y=",$isn:1,"%":"SVGFESpecularLightingElement"},vE:{"^":"I;v:x=,t:y=","%":"SVGFESpotLightElement"},vF:{"^":"I;ap:result=,v:x=,t:y=",$isn:1,"%":"SVGFETileElement"},vG:{"^":"I;R:type=,ap:result=,v:x=,t:y=",$isn:1,"%":"SVGFETurbulenceElement"},vJ:{"^":"I;v:x=,t:y=",$isn:1,"%":"SVGFilterElement"},vM:{"^":"bz;v:x=,t:y=","%":"SVGForeignObjectElement"},n6:{"^":"bz;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},bz:{"^":"I;",$isn:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},vR:{"^":"bz;v:x=,t:y=",$isn:1,"%":"SVGImageElement"},b7:{"^":"n;N:value%",$isi:1,"%":"SVGLength"},vZ:{"^":"nk;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.f(P.aZ(b,a,null,null,null))
return a.getItem(b)},
i:function(a,b,c){throw H.f(new P.a1("Cannot assign element of immutable List."))},
gaa:function(a){if(a.length>0)return a[0]
throw H.f(new P.W("No elements"))},
gal:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.f(new P.W("No elements"))},
a9:function(a,b){return this.h(a,b)},
$ism:1,
$asm:function(){return[P.b7]},
$isl:1,
$asl:function(){return[P.b7]},
$isk:1,
$ask:function(){return[P.b7]},
"%":"SVGLengthList"},ne:{"^":"n+ax;",
$asm:function(){return[P.b7]},
$asl:function(){return[P.b7]},
$ask:function(){return[P.b7]},
$ism:1,
$isl:1,
$isk:1},nk:{"^":"ne+bm;",
$asm:function(){return[P.b7]},
$asl:function(){return[P.b7]},
$ask:function(){return[P.b7]},
$ism:1,
$isl:1,
$isk:1},w2:{"^":"I;",$isn:1,"%":"SVGMarkerElement"},w3:{"^":"I;v:x=,t:y=",$isn:1,"%":"SVGMaskElement"},b9:{"^":"n;N:value%",$isi:1,"%":"SVGNumber"},wn:{"^":"nl;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.f(P.aZ(b,a,null,null,null))
return a.getItem(b)},
i:function(a,b,c){throw H.f(new P.a1("Cannot assign element of immutable List."))},
gaa:function(a){if(a.length>0)return a[0]
throw H.f(new P.W("No elements"))},
gal:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.f(new P.W("No elements"))},
a9:function(a,b){return this.h(a,b)},
$ism:1,
$asm:function(){return[P.b9]},
$isl:1,
$asl:function(){return[P.b9]},
$isk:1,
$ask:function(){return[P.b9]},
"%":"SVGNumberList"},nf:{"^":"n+ax;",
$asm:function(){return[P.b9]},
$asl:function(){return[P.b9]},
$ask:function(){return[P.b9]},
$ism:1,
$isl:1,
$isk:1},nl:{"^":"nf+bm;",
$asm:function(){return[P.b9]},
$asl:function(){return[P.b9]},
$ask:function(){return[P.b9]},
$ism:1,
$isl:1,
$isk:1},wu:{"^":"I;v:x=,t:y=",$isn:1,"%":"SVGPatternElement"},wx:{"^":"n6;v:x=,t:y=","%":"SVGRectElement"},iX:{"^":"I;R:type%",$isiX:1,$isn:1,"%":"SVGScriptElement"},wF:{"^":"I;aC:disabled},R:type%","%":"SVGStyleElement"},lu:{"^":"fG;a",
az:function(){var z,y,x,w,v,u
z=this.a.getAttribute("class")
y=P.V(null,null,null,P.y)
if(z==null)return y
for(x=z.split(" "),w=x.length,v=0;v<x.length;x.length===w||(0,H.r)(x),++v){u=J.c5(x[v])
if(u.length!==0)y.S(0,u)}return y},
dc:function(a){this.a.setAttribute("class",a.cX(0," "))}},I:{"^":"N;",
gdT:function(a){return new P.lu(a)},
gb8:function(a){return new P.i4(a,new W.az(a))},
sea:function(a,b){this.L(a,b)},
aN:function(a,b,c,d){var z,y,x,w,v,u
z=H.E([],[W.iv])
z.push(W.ku(null))
z.push(W.kA())
z.push(new W.rn())
c=new W.kC(new W.iw(z))
y='<svg version="1.1">'+b+"</svg>"
z=document
x=z.body
w=(x&&C.A).fU(x,y,c)
v=z.createDocumentFragment()
w.toString
z=new W.az(w)
u=z.gbf(z)
for(;z=u.firstChild,z!=null;)v.appendChild(z)
return v},
bk:function(a){throw H.f(new P.a1("Cannot invoke click SVG."))},
bn:function(a){return a.focus()},
$isI:1,
$isal:1,
$isn:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGMetadataElement|SVGStopElement|SVGTitleElement;SVGElement"},wG:{"^":"bz;v:x=,t:y=",$isn:1,"%":"SVGSVGElement"},wH:{"^":"I;",$isn:1,"%":"SVGSymbolElement"},kb:{"^":"bz;","%":";SVGTextContentElement"},wJ:{"^":"kb;",$isn:1,"%":"SVGTextPathElement"},wK:{"^":"kb;v:x=,t:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},wP:{"^":"bz;v:x=,t:y=",$isn:1,"%":"SVGUseElement"},wQ:{"^":"I;",$isn:1,"%":"SVGViewElement"},wY:{"^":"I;",$isn:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},x2:{"^":"I;",$isn:1,"%":"SVGCursorElement"},x3:{"^":"I;",$isn:1,"%":"SVGFEDropShadowElement"},x4:{"^":"I;",$isn:1,"%":"SVGMPathElement"}}],["","",,P,{"^":""}],["","",,P,{"^":"",wy:{"^":"n;",$isn:1,"%":"WebGL2RenderingContext"}}],["","",,P,{"^":""}],["","",,S,{"^":"",
pY:function(){C.f.bU($.$get$ce(),new S.pZ())
C.f.bU($.$get$cd(),new S.q_())
C.f.bU($.$get$cZ(),new S.q0())},
xa:[function(){var z,y,x,w,v,u
S.pY()
S.qd()
z=S.bo(!1)
y=z.a
y.h(0,"scale").a_()
H.o(y.h(0,"scale"),"$isU").ch=10
y.h(0,"fillColor").a_()
y.h(0,"lineColor").a_()
$.d1=new S.bL(z,0,0,0)
x=S.bo(!1)
y=x.a
y.h(0,"scale").a_()
H.o(y.h(0,"scale"),"$isU").ch=10
y.h(0,"fillColor").a_()
y.h(0,"lineColor").a_()
$.d2=new S.bL(x,10,0,0)
w=S.bo(!1)
y=w.a
y.h(0,"scale").a_()
H.o(y.h(0,"scale"),"$isU").ch=10
y.h(0,"fillColor").a_()
y.h(0,"lineColor").a_()
$.d3=new S.bL(w,20,0,0)
y=document
S.K(y.querySelector("#blockaddbutton"),new S.ux())
S.K(y.querySelector("#blockloadbutton"),new S.uy())
S.K(y.querySelector("#blocksavebutton"),new S.uz())
S.K(y.querySelector("#idbutton"),new S.uK())
S.K(y.querySelector("#idreorderbutton_ok"),new S.uV())
S.K(y.querySelector("#idreorderbutton_cancel"),new S.uW())
S.K(y.querySelector("#blockclearbutton"),new S.uX())
J.be(y.querySelector("#blockloadinput"),"change",new S.uY(),null)
S.K(y.querySelector("#shapeaddbutton"),new S.uZ())
S.K(y.querySelector("#shapeloadbutton"),new S.v_())
S.K(y.querySelector("#shapesavebutton"),new S.v0())
S.K(y.querySelector("#shapeclearbutton"),new S.uA())
J.be(y.querySelector("#shapeloadinput"),"change",new S.uB(),null)
S.K(y.querySelector("#factionaddbutton"),new S.uC())
S.K(y.querySelector("#factionloadbutton"),new S.uD())
S.K(y.querySelector("#factionsavebutton"),new S.uE())
S.K(y.querySelector("#factionclearbutton"),new S.uF())
J.be(y.querySelector("#factionloadinput"),"change",new S.uG(),null)
S.K(y.querySelector("#regionaddbutton"),new S.uH())
S.K(y.querySelector("#regionloadbutton"),new S.uI())
S.K(y.querySelector("#regionsavebutton"),new S.uJ())
S.K(y.querySelector("#regionclearbutton"),new S.uL())
J.be(y.querySelector("#regionloadinput"),"change",new S.uM(),null)
S.K(y.querySelector("#shiploadbutton"),new S.uN())
S.K(y.querySelector("#shipclearbutton"),new S.uO())
S.K(y.querySelector("#shiprefreshbutton"),new S.uP())
J.be(y.querySelector("#shiploadinput"),"change",new S.uQ(),null)
S.K(y.querySelector("#alertbutton"),new S.uR())
S.K(y.querySelector("#confirmbuttonno"),new S.uS())
S.cz("blockstab","blocks")
S.cz("shapesstab","shapes")
S.cz("factionstab","factions")
S.cz("regionstab","regions")
S.cz("shipstab","ships")
S.k8(y.querySelector("#blockstab"))
$.au=S.dd("databank","blocks")
v=S.dd("shapelist","shapes")
v.r=new S.uT()
$.bb=v
$.bc=S.dd("factionlist","factions")
$.aS=S.dd("regionlist","regionsbox")
$.bc.r=new S.uU()
v=new S.qr(400,null,null)
u=W.dS(null,null)
u.className="starchart"
u.height=400
u.width=400
v.b=u
v.c=C.u.cd(u,"2d")
$.bJ=v
y.querySelector("#regionsbox").appendChild($.bJ.b)
y=$.bJ
v=y.c
u=y.a
J.aD(v,0,0,u,u)
y.be(0,5,16)},"$0","kT",0,0,9],
oW:function(a){S.cu(a,new S.oX(),null,!1)},
p9:function(a){S.cu(a,new S.pa(),null,!1)},
p_:function(a){S.cu(a,new S.p0(),null,!1)},
p4:function(a){S.cu(a,new S.p5(),new S.p6(),!1)},
pd:function(a){S.cu(a,new S.pe(),null,!0)},
cu:function(a,b,c,d){var z
if(!J.fk(J.a8(a),".lua")){S.ba("File Parsing Failed:","Please select a .lua file.")
return}z=new FileReader()
z.readAsText(a)
C.M.C(z,"load",new S.p3(a,b,c,d),null)},
pk:function(a,b){var z,y,x,w,v,u,t
z={}
v=a
u=$.es
a=J.cJ(v,"-- "+u,u)
a=H.av(a,$.$get$iI(),new S.pn(),null)
a=J.lr(a,J.fp(a,"{"),J.lf(a,"}")+1)
if(!J.cL(a,"{")||!J.fk(a,"}")){P.c2("NOPE: not within braces!")
return}a=H.av(a,$.$get$iM(),new S.po(),null)
a=H.av(a,$.$get$iC(),new S.pp(),null)
if(b){z.a=0
a=H.av(a,$.$get$iD(),new S.pt(z),null)}a=H.av(a,$.$get$iB(),new S.pu(),null)
a=H.av(a,$.$get$iG(),new S.pv(),null)
a=H.av(a,$.$get$iA(),new S.pw(),null)
a=H.av(a,$.$get$iK(),new S.px(),null)
a=H.av(a,$.$get$iH(),new S.py(),null)
z.b=0
a=H.av(a,$.$get$iE(),new S.pz(z),null)
a=H.av(a,$.$get$ew(),new S.pA(),null)
a=H.av(a,$.$get$iJ(),new S.pq(),null)
a=H.av(a,$.$get$iL(),new S.pr(),null)
a=H.av(a,$.$get$ew(),new S.ps(),null)
y=new P.nJ(null)
x=null
try{x=P.rE(a,y.gfw())}catch(t){w=H.ah(t)
S.ba("File Parsing Failed:",w)
return}return x},
oY:function(a){J.c3(a,new S.oZ())},
pb:function(a){J.c3(a,new S.pc())},
p1:function(a){J.c3(a,new S.p2())},
p7:function(a){var z,y,x,w,v
z=J.L(a)
if(z.gW(a)!==!0&&a.I("0")===!0&&!!J.t(z.h(a,"0")).$isF){y=z.h(a,"0")
if(y.I("subregions")===!0){z=J.L(y)
x=z.h(y,"subregions")
if(J.S(z.gk(y),1))S.ba("Warning!","Superregion tags detected! Region loading currently doesn't support tags outside the subregions block, so saving this file may lose data compared to what you put in! Use at your own risk!")}else x=y.I("ident")===!0?a:y}else x=a
J.c3(x,new S.p8())
z=$.bJ
w=z.c
v=z.a
J.aD(w,0,0,v,v)
z.be(0,5,16)
z.bA(null)},
pf:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=S.qg(J.a8(a))
if(b.I("blocks")!==!0){S.ba("Invalid Ship File","The loaded file does not contain a blocks section.")
return}for(y=J.L(b),x=J.a7(y.h(b,"blocks").gH()),w=z.r,v=z.f;x.m();){u=x.gq()
t=J.a0(y.h(b,"blocks"),u)
s=P.an()
for(r=J.a7(t.gH()),q=J.L(t),p=-1,o=0,n=0,m=0;r.m();){l=r.gq()
k=q.h(t,l)
j=J.t(l)
if(j.O(l,"blockid"))p=typeof k==="string"?H.Q(k,null,new S.pg()):k
else if(j.O(l,"pos")){j=J.t(k)
if(!!j.$isF){if(k.I("0")===!0){i=j.h(k,"0")
o=typeof i==="string"?H.Z(j.h(k,"0"),new S.ph()):j.h(k,"0")}if(k.I("1")===!0){i=j.h(k,"1")
n=typeof i==="string"?H.Z(j.h(k,"1"),new S.pi()):j.h(k,"1")}}}else if(j.O(l,"rotation"))m=typeof k==="string"?H.Z(k,new S.pj()):k
else s.i(0,l,k)}h=new S.qh(p,o,n,m,s)
v.push(h)
if(!w.M(0,h.a))w.S(0,h.a)}z.at(0)},
eF:function(a){var z=a.F+="-- This file was generated by the M-RWDK (Modern RWDK Reassembly Web Development Kit)\n"
z+="-- M-RWDK is a fork by Luexks of the RWDK\n"
a.F=z
z+="-- Original RWDK was written by TTFTCUTS\n"
a.F=z
z+="-- The original RWDK is an independent project and in no way affiliated with Anisoptera Games.\n"
a.F=z
a.F=z+"\n"},
iW:function(a,b){var z,y,x,w,v
z=new P.bD("")
S.eF(z)
z.F+="{\n"
for(y=a.c,x=y.length,w=0;w<y.length;y.length===x||(0,H.r)(y),++w){J.ft(y[w],z,1)
z.F+="\n"}y=z.F+="}\n"
v=W.cN(null)
v.href="data:text/plain;charset=utf-8,"+P.eW(C.v,y.charCodeAt(0)==0?y:y,C.r,!1)
v.download=b+".lua"
document.body.appendChild(v)
v.click()
C.t.aA(v)},
q2:function(){var z,y,x,w,v,u,t,s
z=new P.bD("")
S.eF(z)
y=$.aS.c
x=y.length
w=x>1&&!0
if(w){v=z.F+="{\n"
z.F=v+"\tsubregions={\n"}for(u=0;u<y.length;y.length===x||(0,H.r)(y),++u){t=y[u]
J.ft(t,z,w?2:0)
z.F+="\n"}if(w){y=z.F+="\t}\n"
z.F=y+"}\n"}y=z.F
s=W.cN(null)
s.href="data:text/plain;charset=utf-8,"+P.eW(C.v,y.charCodeAt(0)==0?y:y,C.r,!1)
s.download="regions.lua"
document.body.appendChild(s)
s.click()
C.t.aA(s)},
q3:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=new P.bD("")
S.eF(z)
y=z.F+="{\n"
z.F=y+"\tblocks={\n"
for(y=a.f,x=y.length,w=0;w<y.length;y.length===x||(0,H.r)(y),++w){v=y[w]
u="{"+H.d(v.a)
if(!J.v(v.b,0)||!J.v(v.c,0))u+=", {"+H.d(v.b)+", "+H.d(v.c)+"}"
t=v.d
if(!J.v(t,0))u+=", "+H.d(t)
t=v.e
if(!t.gW(t))for(s=t.gH(),s=s.gB(s);s.m();){r=s.gq()
q=t.h(0,r)
p=J.t(q)
if(!!p.$isF){p=p.A(q)
o=H.dC(p,":","=")}else o=p.A(q)
u+=", "+H.d(r)+"="+H.d(o)}S.a_(z,u+"},",3,!0)}y=z.F+="\t}\n"
y+="}\n"
z.F=y
x=H.d(a.x)+"_"
t=a.y
t.toString
n=x+H.dC(t," ","_")+".lua"
m=W.cN(null)
m.href="data:text/plain;charset=utf-8,"+P.eW(C.v,y.charCodeAt(0)==0?y:y,C.r,!1)
m.download=n
document.body.appendChild(m)
m.click()
C.t.aA(m)
a.Q=!1
a.a0()},
qc:function(){var z,y,x,w,v
z=new H.P(0,null,null,null,null,null,0,[P.y,S.aM])
z.ar(0,$.$get$eI())
for(y=$.bb.c,x=y.length,w=0;w<y.length;y.length===x||(0,H.r)(y),++w){v=y[w]
z.i(0,H.d(J.dH(v)),v)}return z},
qd:function(){var z,y,x
for(z=$.$get$di(),y=0;y<67;++y){x=z[y]
$.$get$eI().i(0,x.a,x)}C.f.bU($.$get$di(),new S.qe())},
G:function(a,b,c,d,e,a0,a1,a2,a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.J(e,c)
y=J.J(a0,d)
x=J.O(z)
w=J.O(y)
v=C.a.cb(Math.sqrt(H.A(J.B(x.X(z,z),w.X(y,y))))*1e4)/1e4
u=Math.max(1,C.d.aG(v))
if(u>=5&&C.a.cg(u,2)===1){u=C.d.dS(u/2)
a4=2}t=J.q(J.B(c,e),0.5)
s=J.q(J.B(d,a0),0.5)
r=x.aI(z,v)*a4
q=w.aI(y,v)*a4
p=w.aI(y,v)
o=J.aT(x.bP(z),v)
if(a3){p*=-1
o*=-1}for(x=(u-1)*0.5,w=x*r,n=J.M(t),x*=q,m=J.M(s),l=b-1,k=p*p+o*o,j=0;j<u;++j){i=J.B(n.ae(t,w),r*j)
h=J.B(m.ae(s,x),q*j)
g=a.e
if(l<0||l>=g.length)return H.c(g,l)
g=g[l]
f=new S.aH(a2,null,0,null,null)
f.a=J.ai(i)
f.b=J.ai(h)
v=Math.sqrt(k)
h=new S.j(null,null)
h.a=C.d.j(p/v)
h.b=C.d.j(o/v)
f.d=h
h=a.e
if(l>=h.length)return H.c(h,l)
f.e=h[l].length
g.push(f)}},
at:function(a,b,c,d,e,f,g,h,i,j){var z,y,x,w,v,u,t,s
z=i?1:b
y=-c*0.5*z
x=c*0.5*z
w=-d*0.5*z
v=d*0.5*z
u=a.d
t=b-1
if(t<0||t>=u.length)return H.c(u,t)
u=u[t]
s=new S.j(null,null)
s.a=C.a.j(y)
s.b=C.a.j(w)
u.push(s)
s=a.d
if(t>=s.length)return H.c(s,t)
s=s[t]
u=new S.j(null,null)
u.a=C.a.j(y)
u.b=C.a.j(v)
s.push(u)
u=a.d
if(t>=u.length)return H.c(u,t)
u=u[t]
s=new S.j(null,null)
s.a=C.a.j(x)
s.b=C.a.j(v)
u.push(s)
s=a.d
if(t>=s.length)return H.c(s,t)
s=s[t]
u=new S.j(null,null)
u.a=C.a.j(x)
u.b=C.a.j(w)
s.push(u)
u=Math.min(c,d)
s=a.Q
if(t>=20)return H.c(s,t)
s[t]=u*z
if(f!=null)if(j)a.aj(b,f,y,0,-1,0)
else S.G(a,b,y,v,y,w,!0,f,!1,1)
if(g!=null)if(j)a.aj(b,g,x,0,1,0)
else S.G(a,b,x,w,x,v,!0,g,!1,1)
if(h!=null)if(j)a.aj(b,h,0,w,0,-1)
else S.G(a,b,y,w,x,w,!0,h,!1,1)
if(e!=null)if(j)a.aj(b,e,0,v,0,1)
else S.G(a,b,x,v,y,v,!0,e,!1,1)},
aJ:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(d)if(b>1){z=b-1
y=!1}else{z=b
y=!0}else{z=b
y=!1}x=6.283185307179586/c
w=x*0.5
v=z*0.5/Math.sin(w)
if(y)v=0.5/Math.cos(w)
w=Math.cos(w)
u=a.Q
t=b-1
if(t<0||t>=20)return H.c(u,t)
u[t]=v*w*2
for(s=0;s<c;++s){r=x*(s-0.5)+3.141592653589793
w=Math.sin(r)
u=Math.cos(r)
q=a.d
if(t>=q.length)return H.c(q,t)
q=q[t]
p=new S.j(null,null)
p.a=C.d.j(v*u)
p.b=C.d.j(v*w)
q.push(p)}w=a.d
if(t>=w.length)return H.c(w,t)
o=w[t]
for(w=c/2|0,s=0;u=o.length,s<u;s=m){n=o[s]
m=s+1
l=o[m%u]
if(s!==w&&e)continue
u=J.e(n)
t=J.e(l)
S.G(a,b,u.gv(n),u.gt(n),t.gv(l),t.gt(l),!0,f,!1,1)}},
b0:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s
z=c/360*2*3.141592653589793*0.5
y=Math.cos(z)*b
x=Math.sin(z)*b
w=y*0.5
z=a.r
v=b-1
u=new S.j(null,null)
u.a=C.e.j(0)
u.b=C.d.j(-y/6)
if(v<0||v>=20)return H.c(z,v)
z[v]=u
u=-w
z=-x
t=a.d
if(v>=t.length)return H.c(t,v)
t=t[v]
s=new S.j(null,null)
s.a=C.a.j(u)
s.b=C.a.j(z)
t.push(s)
s=a.d
if(v>=s.length)return H.c(s,v)
s=s[v]
t=new S.j(null,null)
t.a=C.a.j(u)
t.b=C.a.j(x)
s.push(t)
t=a.d
if(v>=t.length)return H.c(t,v)
t=t[v]
s=new S.j(null,null)
s.a=C.a.j(w)
s.b=C.e.j(0)
t.push(s)
s=a.r
t=new S.j(null,null)
t.a=C.d.j(-(y/3)*0.5)
t.b=C.e.j(0)
s[v]=t
a.Q[v]=w*(0.6+x*0.5/b)
if(f)a.aj(b,e,u,0,-1,0)
else S.G(a,b,u,x,u,z,!0,e,!1,1)
if(d){S.G(a,b,u,z,w,0,!0,C.b,!1,1)
S.G(a,b,w,0,u,x,!0,C.b,!1,1)}},
dh:function(a,b,c,d){var z,y,x,w,v,u,t,s
z=b*0.5
y=b/Math.tan(c/360*2*3.141592653589793)*0.5
x=d?-z:z
w=a.r
v=b-1
u=new S.j(null,null)
u.a=C.d.j(x/3)
u.b=C.d.j(y/3)
if(v<0||v>=20)return H.c(w,v)
w[v]=u
a.Q[v]=b*(z/y)
u=-y
w=a.d
if(v>=w.length)return H.c(w,v)
w=w[v]
t=new S.j(null,null)
t.a=C.a.j(x)
t.b=C.d.j(u)
w.push(t)
t=-z
w=a.d
if(v>=w.length)return H.c(w,v)
w=w[v]
s=new S.j(null,null)
s.a=C.a.j(t)
s.b=C.d.j(y)
w.push(s)
s=a.d
if(v>=s.length)return H.c(s,v)
v=s[v]
s=new S.j(null,null)
s.a=C.a.j(z)
s.b=C.d.j(y)
v.push(s)
S.G(a,b,t,y,x,u,!0,C.b,!1,1)
S.G(a,b,x,u,z,y,!0,C.b,!1,1)
S.G(a,b,z,y,t,y,!0,C.b,!1,1)},
k2:function(a,b,c){var z,y,x,w,v,u
z=c/360*2*3.141592653589793*0.5
y=Math.sin(z)*b
x=Math.cos(z)*b
z=Math.min(y,x)
w=a.Q
v=b-1
if(v<0||v>=20)return H.c(w,v)
w[v]=z*2*0.9
z=-x
w=a.d
if(v>=w.length)return H.c(w,v)
w=w[v]
u=new S.j(null,null)
u.a=C.a.j(z)
u.b=C.e.j(0)
w.push(u)
u=a.d
if(v>=u.length)return H.c(u,v)
u=u[v]
w=new S.j(null,null)
w.a=C.e.j(0)
w.b=C.a.j(y)
u.push(w)
w=a.d
if(v>=w.length)return H.c(w,v)
w=w[v]
u=new S.j(null,null)
u.a=C.a.j(x)
u.b=C.e.j(0)
w.push(u)
u=-y
w=a.d
if(v>=w.length)return H.c(w,v)
v=w[v]
w=new S.j(null,null)
w.a=C.e.j(0)
w.b=C.a.j(u)
v.push(w)
S.G(a,b,z,0,0,y,!0,C.b,!0,1)
S.G(a,b,0,y,x,0,!0,C.b,!0,1)
S.G(a,b,x,0,0,u,!0,C.b,!0,1)
S.G(a,b,0,u,z,0,!0,C.b,!0,1)},
aP:function(a,b,c,d,e,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=d/360*2*3.141592653589793
y=-0.5*b
x=-0.25*b
w=a.d
v=b-1
if(v<0||v>=w.length)return H.c(w,v)
w=w[v]
u=new S.j(null,null)
u.a=C.d.j(y)
u.b=C.d.j(x)
w.push(u)
u=0.25*b
w=a.d
if(v>=w.length)return H.c(w,v)
w=w[v]
t=new S.j(null,null)
t.a=C.d.j(y)
t.b=C.d.j(u)
w.push(t)
S.G(a,b,y,u,y,x,!0,e?C.q:C.b,!1,1)
s=Math.min(b,(b*0.5+Math.sin(z*c*0.5)/b*2)*0.5*b)
y=a.Q
if(v>=20)return H.c(y,v)
y[v]=s
for(y=c*0.5*z,x=0.5*b,r=0;r<=c;++r){q=y-r*z
p=Math.sin(q)*b
o=Math.cos(q)*b
w=a.d
if(v>=w.length)return H.c(w,v)
w=w[v]
t=new S.j(null,null)
t.a=C.a.j(o-x)
t.b=C.a.j(p)
w.push(t)
w=r===0
if(w){n=(o-b)*0.5
m=(p+u)*0.5
t=-n
l=a.e
if(v>=l.length)return H.c(l,v)
l=l[v]
k=new S.aH(C.b,null,0,null,null)
k.a=C.a.j(n)
k.b=C.a.j(m)
j=Math.sqrt(m*m+t*t)
i=new S.j(null,null)
i.a=C.d.j(m/j)
i.b=C.d.j(t/j)
k.d=i
i=a.e
if(v>=i.length)return H.c(i,v)
k.e=i[v].length
l.push(k)}else if(r===c){n=(o-b)*0.5
m=(p-u)*0.5
t=-n
l=a.e
if(v>=l.length)return H.c(l,v)
l=l[v]
k=new S.aH(C.b,null,0,null,null)
k.a=C.a.j(n)
k.b=C.a.j(m)
j=Math.sqrt(m*m+t*t)
i=new S.j(null,null)
i.a=C.d.j(m/j)
i.b=C.d.j(t/j)
k.d=i
i=a.e
if(v>=i.length)return H.c(i,v)
k.e=i[v].length
l.push(k)}if(!w){h=y-(r-1)*z
g=Math.sin(h)*b
f=Math.cos(h)*b
w=g-p
t=-(f-o)
l=a.e
if(v>=l.length)return H.c(l,v)
l=l[v]
k=new S.aH(a0,null,0,null,null)
k.a=C.a.j((o+f)*0.5-x)
k.b=C.a.j((p+g)*0.5)
j=Math.sqrt(w*w+t*t)
i=new S.j(null,null)
i.a=C.d.j(w/j)
i.b=C.d.j(t/j)
k.d=i
i=a.e
if(v>=i.length)return H.c(i,v)
k.e=i[v].length
l.push(k)}}},
eG:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q
z=b<=2
y=z?50:30
x=z?1:-1
w=z?0.32142857142857145:0.75
v=w*0.5
if(b===1)u=0.5957446808510638
else u=b===3?0.6666666666666666:1
z=a.Q
t=b-1
if(t<0||t>=20)return H.c(z,t)
z[t]=v*2*u
y=Math.tan(y/360*2*3.141592653589793)
z=-v
s=z*x*u
r=a.d
if(t>=r.length)return H.c(r,t)
r=r[t]
q=new S.j(null,null)
q.a=C.d.j(s)
q.b=C.d.j(0.5*u)
r.push(q)
q=a.d
if(t>=q.length)return H.c(q,t)
q=q[t]
r=new S.j(null,null)
r.a=C.d.j(s)
r.b=C.d.j(-0.5*u)
q.push(r)
r=v*x*u
y=0.5-w/y*x
q=a.d
if(t>=q.length)return H.c(q,t)
q=q[t]
s=new S.j(null,null)
s.a=C.d.j(r)
s.b=C.d.j(-y*u)
q.push(s)
s=a.d
if(t>=s.length)return H.c(s,t)
t=s[t]
s=new S.j(null,null)
s.a=C.d.j(r)
s.b=C.d.j(y*u)
t.push(s)
if(c!=null)a.bh(b,c,v*u,0)
a.aj(b,d,z*u,0,-1,0)},
eH:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p
z=b*0.5
y=b*c*0.5
x=y/Math.tan(d/350*3.141592653589793)
w=a.Q
v=b-1
if(v<0||v>=20)return H.c(w,v)
w[v]=y*2
w=-z
u=-y
t=a.d
if(v>=t.length)return H.c(t,v)
t=t[v]
s=new S.j(null,null)
s.a=C.a.j(w)
s.b=C.a.j(u)
t.push(s)
s=a.d
if(v>=s.length)return H.c(s,v)
s=s[v]
t=new S.j(null,null)
t.a=C.a.j(w)
t.b=C.a.j(y)
s.push(t)
t=z-x
s=a.d
if(v>=s.length)return H.c(s,v)
s=s[v]
r=new S.j(null,null)
r.a=C.a.j(t)
r.b=C.a.j(y)
s.push(r)
r=a.d
if(v>=r.length)return H.c(r,v)
r=r[v]
s=new S.j(null,null)
s.a=C.a.j(z)
s.b=C.e.j(0)
r.push(s)
s=a.d
if(v>=s.length)return H.c(s,v)
v=s[v]
s=new S.j(null,null)
s.a=C.a.j(t)
s.b=C.a.j(u)
v.push(s)
a.aj(b,C.j,w,0,-1,0)
q=e?C.i:C.j
p=e?C.i:C.j
w=-x*0.5
a.aj(b,q,w,u,0,-1)
a.aj(b,p,w,y,0,1)},
cz:function(a,b){var z,y,x,w
z="#"+a
y=document
x=y.querySelector(z)
w=y.querySelector("#"+b)
$.$get$cA().i(0,x,w)
S.qu(x)},
qt:function(){var z,y,x
for(z=$.$get$cA().gH(),z=z.gB(z);z.m();){y=z.gq()
x=$.$get$cA().h(0,y)
J.cH(y).an(0,"tabactive")
J.cH(x).S(0,"hidden")}},
k8:function(a){S.qt()
J.cH(a).S(0,"tabactive")
J.cH($.$get$cA().h(0,a)).an(0,"hidden")},
qu:function(a){J.be(a,"click",new S.qv(a),null)},
w:function(a,b,c){var z=H.o(a.ga6().h(0,b),"$isb5")
return z.x===!0&&z.aE()===!0&&z.cx.h(0,c)===!0},
u3:function(a,b,c,d){var z,y,x
z=H.o(a.a.h(0,b),"$isb5")
if(z.x===!0&&z.aE()===!0)for(y=0;y<2;++y){x=c[y]
if(z.cx.h(0,x)===!0)return!0}return!1},
aR:function(a){if(a==null)return!1
return H.Z(a,new S.un())!=null||H.Q(a,null,new S.uo())!=null},
ba:function(a,b){var z,y
z=document
z.querySelector("#alerttitle").textContent=a
z.querySelector("#alerttext").textContent=H.d(b)
y=z.querySelector("#alertbox").style
y.display="block"
z=z.querySelector("#alertbackground").style
z.display="block"},
cF:function(a,b,c,d,e){var z,y,x
z=document
z.querySelector("#confirmtitle").textContent=a
z.querySelector("#confirmtext").textContent=b
y=z.querySelector("#confirmbox").style
y.display="block"
y=z.querySelector("#alertbackground").style
y.display="block"
x=z.querySelector("#confirmbuttonyes")
x.textContent=c
y=new S.tZ(e,x)
$.dr=y
J.be(x,"click",y,null)
z.querySelector("#confirmbuttonno").textContent=d},
a_:function(a,b,c,d){var z,y
for(z=0;z<c;++z)a.F+="\t"
y=a.F+=b
if(d)a.F=y+"\r\n"},
fd:function(a,b){var z,y,x,w
z=J.fv(a,$.$get$kS())
for(y=z.length,x=0,w=0;w<z.length;z.length===y||(0,H.r)(z),++w)x+=Math.max(1,C.a.dS(J.aT(J.aL(z[w]),b)))
return x},
kN:[function(a){return C.a.bM(J.aT(J.dJ(a),6.283185307179586)*360,1)+"\xb0"},"$1","uw",2,0,32,1],
u9:function(){var z,y,x,w,v,u
z=H.Q(H.o(document.querySelector("#idreorderfield"),"$isi8").value,null,null)
y=P.x
x=new H.P(0,null,null,null,null,null,0,[y,y])
for(y=$.au.c,w=y.length,v=z,u=0;u<y.length;y.length===w||(0,H.r)(y),++u)v=S.kY(y[u].gT(),v,x)
for(y=$.au.c,w=y.length,u=0;u<y.length;y.length===w||(0,H.r)(y),++u)S.kX(y[u].gT(),x)
for(y=$.au.c,w=y.length,u=0;u<y.length;y.length===w||(0,H.r)(y),++u)y[u].a0()
for(y=$.$get$aQ(),w=y.length,u=0;u<y.length;y.length===w||(0,H.r)(y),++u)y[u].hM(x)},
kY:function(a,b,c){var z,y,x
z=a.ga6().h(0,"ident")
y=J.e(z)
if(y.gb0(z)===!0){c.i(0,y.gN(z),b)
y.sN(z,b)
b=J.B(b,1)
y=J.t(b)
if(y.O(b,200))b=y.n(b,16800)}x=a.ga6().h(0,"replicateBlock")
y=J.e(x)
return y.gb0(x)===!0&&y.gbH(x)===1&&x.gT()!=null?S.kY(x.gT(),b,c):b},
kX:function(a,b){var z,y
z=a.ga6().h(0,"replicateBlock")
y=J.e(z)
if(y.gb0(z)===!0)if(y.gbH(z)===1&&z.gT()!=null)S.kX(z.gT(),b)
else if(y.gbH(z)===0)if(b.I(z.gbv())){z.sbv(b.h(0,z.gbv()))
if(z.ge9()!=null)J.lq(z.ge9(),H.d(z.gbv()))}},
K:function(a,b){J.be(a,"click",new S.rM(b),null)},
c1:function(a){var z=J.bf(J.q(a,1000))/10
if(C.d.cg(z,1)===0)return C.d.bM(z,0)
return C.d.A(z)},
fx:{"^":"i;a,b,c,d,e",
dQ:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=a.length
if(z===0)return 1
y=Math.min(this.a,this.b)
b=Math.min(10,H.A(b))
for(x=2e9,w=-2e9,v=2e9,u=-2e9,t=0;t<a.length;a.length===z||(0,H.r)(a),++t){s=a[t]
r=J.e(s)
x=Math.min(x,H.A(r.gv(s)))
w=Math.max(w,H.A(r.gv(s)))
v=Math.min(v,H.A(r.gt(s)))
u=Math.max(u,H.A(r.gt(s)))}q=Math.max(Math.abs(w-x),Math.abs(u-v))*0.5
p=q>0?Math.min(y*0.75,(0.15*y+b*0.03*y)/q):1
if(c!=null){for(z=c.length,o=0,t=0;t<c.length;c.length===z||(0,H.r)(c),++t){s=c[t]
o=Math.max(Math.max(q,J.ai(J.dE(s.a))),J.ai(J.dE(s.b)))}n=y*0.5*0.9
z=o*p
if(z>n)p*=n/z}return p},
bx:function(a,b){return this.dQ(a,b,null)},
e0:function(a,b){var z,y,x,w,v,u,t,s,r,q
if(a==null||a.gah()<1)return
z=a.gbc()
y=b-1
if(y>>>0!==y||y>=z.length)return H.c(z,y)
x=z[y]
w=x.length===0?50:this.bx(x,b)
z=this.a
y=this.b
v=C.d.aG(z/w*0.5+0.5)*2
y=C.d.aG(y/w*0.5+0.5)
J.bh(this.d,"rgba(255,255,255,0.075)")
for(z=(v-1)*0.5,u=0;u<v;++u){t=C.a.aG(this.a*0.5+(u-z)*w)+0.5
s=this.d
r=J.e(s)
r.Y(s)
r.ad(s,t,0)
r.P(s,t,this.b)
r.a3(s)}for(z=(y*2-1)*0.5,u=0;u<v;++u){q=C.a.aG(this.b*0.5+(u-z)*w)+0.5
y=this.d
s=J.e(y)
s.Y(y)
s.ad(y,0,q)
s.P(y,this.a,q)
s.a3(y)}},
he:function(a){return this.e0(a,1)},
cV:function(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
if(a0==null||a0.gah()<1)return
z=J.M(a9)
if(z.ao(a9,a0.gah()))a0=$.$get$as()
y=a0.gbc()
x=z.ae(a9,1)
if(x>>>0!==x||x>=y.length)return H.c(y,x)
w=y[x]
x=a0.gcW()
y=z.ae(a9,1)
if(y>>>0!==y||y>=x.length)return H.c(x,y)
v=x[y]
if(a4==null)a4=a3
if(a7==null)a7=a3
if(w.length<=2)return
u=Math.min(this.a,this.b)
z=J.q(z.X(a9,0.03),u)
if(typeof z!=="number")return H.C(z)
t=0.15*u+z
if(b0===0)b0=this.bx(w,a9)
if(a8){for(z=w.length,s=2e9,r=-2e9,q=2e9,p=-2e9,o=0;o<w.length;w.length===z||(0,H.r)(w),++o){n=w[o]
y=J.e(n)
s=Math.min(s,H.A(y.gv(n)))
r=Math.max(r,H.A(y.gv(n)))
q=Math.min(q,H.A(y.gt(n)))
p=Math.max(p,H.A(y.gt(n)))}b1=J.J(b1,(s+r)*0.5)
b2=J.J(b2,(q+p)*0.5)}z=this.d
if(a3!==a4){y=this.a*0.5
x=this.b*0.5
m=J.l8(z,y-t,x-t,y+t,x+t)
m.addColorStop(0,a3)
m.addColorStop(1,a4)
J.bg(this.d,m)}else J.bg(z,a3)
J.bh(this.d,a7)
z=this.a
y=J.q(b1,b0)
if(typeof y!=="number")return H.C(y)
l=z*0.5+y
y=this.b
z=J.q(b2,b0)
if(typeof z!=="number")return H.C(z)
k=y*0.5+z
j=Math.sin(H.A(a1))
i=Math.cos(H.A(a1))
if(!a6){J.dF(this.d)
for(z=w.length,h=!0,o=0;o<w.length;w.length===z||(0,H.r)(w),++o){n=w[o]
y=J.e(n)
g=J.J(J.q(y.gv(n),i),J.q(y.gt(n),j))
f=J.B(J.q(y.gv(n),j),J.q(y.gt(n),i))
y=J.O(f)
x=this.d
e=J.O(g)
if(h){J.fs(x,J.B(e.X(g,b0),l),J.B(y.X(f,b0),k))
h=!1}else J.fq(x,J.B(e.X(g,b0),l),J.B(y.X(f,b0),k))}z=this.d
y=J.e(z)
y.a8(z)
y.av(z)
y.a3(z)}if(this.e)for(z=v.length,y=J.t(a5),o=0;o<v.length;v.length===z||(0,H.r)(v),++o){d=v[o]
x=J.e(d)
c=J.J(J.q(x.gv(d),i),J.q(x.gt(d),j))
b=J.B(J.q(x.gv(d),j),J.q(x.gt(d),i))
g=J.dG(J.B(J.q(c,b0),l))+0.5
f=J.dG(J.B(J.q(b,b0),k))+0.5
a=x.gR(d)
a.ge5()
x=this.d
e=J.e(x)
e.Y(x)
e.scm(x,a2?a.gdU():a.gfN())
e.eF(x,g-2,f-2,4,4)
if(y.O(a5,a)){x=this.d
e=J.e(x)
e.ad(x,g-3.5,f)
e.P(x,g-7.5,f)
e.ad(x,g+3.5,f)
e.P(x,g+7.5,f)
e.ad(x,g,f-3.5)
e.P(x,g,f-7.5)
e.ad(x,g,f+3.5)
e.P(x,g,f+7.5)}J.dN(this.d)}},
h8:function(a,b,c,d,e,f,g,h,i,j){return this.cV(a,b,!1,c,d,null,e,f,!1,g,h,i,j)},
h9:function(a,b){return this.cV(a,0,b,"#808080",null,null,!1,null,!1,1,0,0,0)},
ha:function(a,b,c,d,e,f,g,h){return this.cV(a,0,b,c,d,e,!1,f,g,h,0,0,0)},
h5:function(f5,f6,f7,f8,f9){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4
H.o(f5.ga6().h(0,"name"),"$isaN").ch
z=H.o(f5.ga6().h(0,"shape"),"$isd7")
y=H.o(f5.ga6().h(0,"scale"),"$isU")
x=H.o(f5.ga6().h(0,"fillColor"),"$isa4")
w=H.o(f5.ga6().h(0,"fillColor1"),"$isa4")
v=H.o(f5.ga6().h(0,"lineColor"),"$isa4")
u=H.o(f5.ga6().h(0,"features"),"$isb5")
t=H.o(f5.ga6().h(0,"shield"),"$iscl")
s=H.o(t.ch.a.h(0,"color"),"$isa4")
r=H.o(t.ch.a.h(0,"lineColor"),"$isa4")
q=$.$get$bC()
p=y.x===!0?y.ch:1
if(z.x===!0)q=z.ch
o=J.M(p)
if(o.ao(p,q.gah()))q=$.$get$as()
H.fc("module: "+H.d(J.a8(q))+" @ "+H.d(p))
n=x.x===!0?x.bZ():"#000000"
if(w.x===!0)m=w.bZ()
else m=x.x===!0?n:"#800080"
l=v.x===!0?v.bZ():"#FFFFFF"
k=s.x===!0?s.bZ():"#FFFFFF"
j=s.x===!0?"rgba("+s.ch+","+s.cx+","+s.cy+",0.0)":"rgba(255,255,255,0)"
if(r.x===!0)i=r.c_(!0)
else i=s.x===!0?s.c_(!0):"#FFFFFF"
h=q.gbc()
g=o.ae(p,1)
if(g>>>0!==g||g>=h.length)return H.c(h,g)
f=h[g]
if(f7===0)f7=this.bx(f,p)
e=u.x===!0&&u.cx.h(0,$.$get$e3())===!0
this.h8(q,f6,n,m,e,l,p,f7,f8,f9)
d=J.fo(f5)!=null&&u.x===!0&&u.cx.h(0,$.$get$cf())===!0
c=u.x===!0&&u.cx.h(0,$.$get$cj())===!0
b=u.x===!0&&u.cx.h(0,$.$get$ch())===!0
a=u.x===!0&&u.cx.h(0,$.$get$ay())===!0
a0=u.x===!0&&u.cx.h(0,$.$get$cW())===!0
if(u.x===!0)u.cx.h(0,$.$get$bS())
a1=u.x===!0&&u.cx.h(0,$.$get$bQ())===!0
a2=u.x===!0&&u.cx.h(0,$.$get$bx())===!0
a3=u.x===!0&&u.cx.h(0,$.$get$bR())===!0
a4=u.x===!0&&u.cx.h(0,$.$get$bO())===!0
a5=u.x===!0&&u.cx.h(0,$.$get$ci())===!0
if(d){c=!1
a=!1
a0=!1
a1=!1}if(a0)c=!1
if(e){d=!1
c=!1
b=!1
a=!1
a0=!1
a1=!1}if(a)a1=!1
Math.sin(H.A(f6))
Math.cos(H.A(f6))
h=q.ghE()
g=o.ae(p,1)
if(g>>>0!==g||g>=20)return H.c(h,g)
a6=h[g]
g=Math.sin(H.A(f6))
h=Math.cos(H.A(f6))
a7=q.geR()
a8=o.ae(p,1)
if(a8>>>0!==a8||a8>=20)return H.c(a7,a8)
a8=a7[a8]
if(typeof a8!=="number")return a8.X()
a9=a8*f7*0.5
a8=a6.a
a7=a6.b
b0=J.B(J.q(J.B(f8,J.J(J.q(a8,h),J.q(a7,g))),f7),this.a*0.5)
a7=a6.a
a8=a6.b
b1=J.B(J.q(J.B(f9,J.B(J.q(a7,g),J.q(a8,h))),f7),this.a*0.5)
J.bh(this.d,l)
b2=J.la(this.d)
if(d){b3="rgba("+x.ch+","+x.cx+","+x.cy+",0.25)"
b4="rgba("+w.ch+","+w.cx+","+w.cy+",0.25)"
b5=1/Math.sqrt(2)
b6=Math.sqrt(2)*0.5
for(a7=J.O(b0),a8=J.O(b1),b7=0*h,b8=0*g,b9=a9,c0=0;c0<3;++c0){c1=this.d
c2=J.e(c1)
c2.saP(c1,b3)
c2.sbO(c1,"lighter")
c2.Y(c1)
c3=-b9
c4=c3*b6
c5=c4*h
c4*=g
c2.ad(c1,a7.n(b0,c5-c4),a8.n(b1,c4+c5))
c6=b9*b6
c7=c6*g
c6*=h
c2.P(c1,a7.n(b0,c5-c7),a8.n(b1,c4+c6))
c2.P(c1,a7.n(b0,c6-c7),a8.n(b1,c7+c6))
c2.P(c1,a7.n(b0,c6-c4),a8.n(b1,c7+c5))
c2.a8(c1)
c2.av(c1)
c2.saP(c1,b4)
c2.sbO(c1,"source-over")
c2.Y(c1)
c5=c3*g
c3*=h
c2.ad(c1,a7.n(b0,b7-c5),a8.n(b1,b8+c3))
c7=b9*h
c4=b9*g
c2.P(c1,a7.n(b0,c7-b8),a8.n(b1,c4+b7))
c2.P(c1,a7.n(b0,b7-c4),a8.n(b1,b8+c7))
c2.P(c1,a7.n(b0,c3-b8),a8.n(b1,c5+b7))
c2.a8(c1)
c2.av(c1)
b9*=b5}}if(c){a7=this.d
a8=J.e(a7)
a8.Y(a7)
a8.ax(a7,b0,b1,a9*0.66,0,6.283185307179586)
a8.a8(a7)
a8.a3(a7)
a8.Y(a7)
a8.ax(a7,b0,b1,a9*0.33,0,6.283185307179586)
a8.a8(a7)
a8.a3(a7)
a8.Y(a7)
a8.ax(a7,b0,b1,a9*0.2,0,6.283185307179586)
a8.a8(a7)
a8.a3(a7)}if(a){a7=this.d
a8=J.e(a7)
a8.Y(a7)
b7=-a9
b8=b7*0.75
b7=b7*2/3
c1=b8*h
c2=J.O(b0)
b8*=g
c3=J.O(b1)
a8.ad(a7,c2.n(b0,c1-b7*g),c3.n(b1,b8+b7*h))
b7=a9*2/3
a8.P(a7,c2.n(b0,c1-b7*g),c3.n(b1,b8+b7*h))
b7=a9*0.75
a8.P(a7,c2.n(b0,b7*h-0*g),c3.n(b1,b7*g+0*h))
a8.a8(a7)
a8.a3(a7)}if(a0){b9=0.9*a9
b6=Math.sqrt(2)*0.5
a7=this.d
a8=J.e(a7)
a8.Y(a7)
b7=-b9
b8=0*h
c1=b7*g
c2=J.O(b0)
c3=0*g
c4=b7*h
c5=J.O(b1)
a8.ad(a7,c2.n(b0,b8-c1),c5.n(b1,c3+c4))
c6=b9*h
c7=b9*g
a8.P(a7,c2.n(b0,c6-c3),c5.n(b1,c7+b8))
a8.P(a7,c2.n(b0,b8-c7),c5.n(b1,c3+c6))
a8.P(a7,c2.n(b0,c4-c3),c5.n(b1,c1+b8))
a8.a8(a7)
a8.a3(a7)
a8.Y(a7)
b7*=b6
b8=b7*h
b7*=g
a8.ad(a7,c2.n(b0,b8-b7),c5.n(b1,b7+b8))
c1=b9*b6
c3=c1*g
c1*=h
a8.P(a7,c2.n(b0,b8-c3),c5.n(b1,b7+c1))
a8.P(a7,c2.n(b0,c1-c3),c5.n(b1,c3+c1))
a8.P(a7,c2.n(b0,c1-b7),c5.n(b1,c3+b8))
a8.a8(a7)
a8.a3(a7)}if(a1){a7=this.d
a8=J.e(a7)
a8.Y(a7)
if(typeof f6!=="number")return H.C(f6)
a8.ax(a7,b0,b1,a9*0.5,0.5235987755982988+f6,5.759586531581287+f6)
a8.a3(a7)
a8.Y(a7)
a8.ad(a7,b0,b1)
b7=a9*0.6
a8.P(a7,J.B(b0,b7*h-0*g),J.B(b1,b7*g+0*h))
a8.a8(a7)
a8.a3(a7)}if(b){J.bg(this.d,m)
a7=J.O(f6)
a8=a7.n(f6,2.0943951023931953)
b7=Math.sin(H.A(a8))
a8=Math.cos(H.A(a8))
a7=a7.ae(f6,2.0943951023931953)
b8=Math.sin(H.A(a7))
a7=Math.cos(H.A(a7))
c8=a9*0.8
c9=a9*0.3
c1=this.d
c2=J.e(c1)
c2.Y(c1)
c2.ad(c1,b0,b1)
c3=-c9
c4=c8*g
c5=J.O(b0)
c6=c8*h
c7=J.O(b1)
c2.P(c1,c5.n(b0,c3*h-c4),c7.n(b1,c3*g+c6))
c2.P(c1,c5.n(b0,c9*h-c4),c7.n(b1,c9*g+c6))
c2.a8(c1)
c2.av(c1)
c2.a3(c1)
c1=this.d
c2=J.e(c1)
c2.Y(c1)
c2.ad(c1,b0,b1)
c6=c8*b7
c4=c8*a8
c2.P(c1,c5.n(b0,c3*a8-c6),c7.n(b1,c3*b7+c4))
c2.P(c1,c5.n(b0,c9*a8-c6),c7.n(b1,c9*b7+c4))
c2.a8(c1)
c2.av(c1)
c2.a3(c1)
c1=this.d
c2=J.e(c1)
c2.Y(c1)
c2.ad(c1,b0,b1)
c4=c8*b8
b7=c8*a7
c2.P(c1,c5.n(b0,c3*a7-c4),c7.n(b1,c3*b8+b7))
c2.P(c1,c5.n(b0,c9*a7-c4),c7.n(b1,c9*b8+b7))
c2.a8(c1)
c2.av(c1)
c2.a3(c1)}if(a2&&a3&&!a4){d0=H.o(f5.ga6().h(0,"laser"),"$iscl")
d1=H.o(d0.ch.a.h(0,"damage"),"$isp")
d2=H.o(d0.ch.a.h(0,"range"),"$isp")
J.b3(d0.ch.a.h(0,"explosive"))
d3=H.o(d0.ch.a.h(0,"explodeRadius"),"$isp")
d4=d1.x===!0?d1.ch:1
d5=d2.x===!0?d2.ch:100
if(d3.x===!0)d3.ch
a7=J.O(d4)
d6=J.q(J.q(a7.X(d4,0.01),0.24242424242424243),f7)
d7=Math.abs(Math.min(H.A(d6),a9)*0.5)
d8=Math.abs(Math.min(H.A(J.q(d6,0.5)),a9))
if(typeof p!=="number")return H.C(p)
d9=Math.max(Math.max(f7*p*0.25,0.7777777777777778*a9),H.A(J.q(J.q(J.q(d5,0.001),0.6),f7)))
a8=this.d
b7=J.e(a8)
b7.saP(a8,b2)
b7.Y(a8)
b7.ax(a8,b0,b1,d7*2,0,6.283185307179586)
b7.a8(a8)
b7.av(a8)
b7.a3(a8)
if(a7.aJ(d4,0))J.bg(this.d,m)
a7=this.d
a8=J.e(a7)
a8.Y(a7)
b7=-d7
b8=-d8
c1=b7*h
c2=J.O(b0)
b7*=g
c3=J.O(b1)
a8.ad(a7,c2.n(b0,c1-b8*g),c3.n(b1,b7+b8*h))
a8.P(a7,c2.n(b0,c1-d8*g),c3.n(b1,b7+d8*h))
b7=d9*2-d7
a8.P(a7,c2.n(b0,b7*h-0*g),c3.n(b1,b7*g+0*h))
a8.a8(a7)
a8.av(a7)
a8.a3(a7)}if(a2&&a4&&!a3){e0=H.o(f5.ga6().h(0,"cannon"),"$iscl")
d1=H.o(e0.ch.a.h(0,"damage"),"$isp")
e1=H.o(e0.ch.a.h(0,"roundsPerSec"),"$isp")
e2=H.o(e0.ch.a.h(0,"muzzleVel"),"$isp")
e3=J.b3(e0.ch.a.h(0,"explosive"))
d3=H.o(e0.ch.a.h(0,"explodeRadius"),"$isp")
d4=d1.x===!0?d1.ch:1
e4=e1.x===!0?e1.ch:1
e5=e2.x===!0?e2.ch:100
e6=d3.x===!0?d3.ch:10
d6=Math.max(0,Math.sqrt(H.A(d4))/8*f7*0.5)
a7=e3===!0
if(a7)d6*=Math.max(1.4,0.31*Math.sqrt(H.A(e6)))
a8=Math.max(0.25*f7,d6)
b7=0.9*a9
b8=Math.min(a8,b7)
d8=Math.min(a8,0.9*Math.sqrt(2)*a9)*0.5
e7=Math.max(1,1+C.a.aG(J.aT(J.J(e4,2),4)))
e8=Math.max(1,Math.min(C.d.aG(0.675*a9*2/(d8*2.2)),e7))
d7=Math.max(b8*0.5,Math.min(b7*0.5,d8*(e8*2-1)*0.5))
if(e8>1){a8=e8*d8
e9=Math.max(Math.min(d8*2,d8*0.25+a8*0.05),(d7*0.8*2-a8)/(e8-1))}else e9=0
a8=d7*2
a7=a7?0.9:1
d9=Math.max(a8*a7,H.A(J.q(J.q(o.X(p,f7),0.5),J.aT(e5,1128.3))))
o=this.d
a7=J.e(o)
a7.saP(o,b2)
a7.Y(o)
a7.ax(o,b0,b1,a8,0,6.283185307179586)
a7.a8(o)
a7.av(o)
a7.a3(o)
f0=(e8*d8*2+(e8-1)*e9)*0.5-d8
for(o=d8*2+e9,a7=-d7,a8=-d8-f0,b7=J.O(b0),b8=J.O(b1),c1=d8-f0,c2=d9*2-d7,c3=a7*h,a7*=g,c4=c2*h,c2*=g,c0=0;c0<e8;++c0){b6=c0*o
c5=this.d
c6=J.e(c5)
c6.Y(c5)
c7=a8+b6
f1=c7*g
c7*=h
c6.ad(c5,b7.n(b0,c3-f1),b8.n(b1,a7+c7))
f2=c1+b6
f3=f2*g
f2*=h
c6.P(c5,b7.n(b0,c3-f3),b8.n(b1,a7+f2))
c6.P(c5,b7.n(b0,c4-f3),b8.n(b1,c2+f2))
c6.P(c5,b7.n(b0,c4-f1),b8.n(b1,c2+c7))
c6.a8(c5)
c6.av(c5)
c6.a3(c5)}}if(a5){f4=J.l9(this.d,b0,b1,0,b0,b1,a9)
f4.addColorStop(0,j)
f4.addColorStop(1,k)
o=this.d
h=J.e(o)
h.saP(o,f4)
h.scm(o,i)
h.sbO(o,"lighter")
h.Y(o)
h.ax(o,b0,b1,a9,0,6.283185307179586)
h.a8(o)
h.av(o)
h.a3(o)
h.sbO(o,"source-over")}},
cU:function(b8,b9,c0,c1,c2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7
z=H.E([],[S.j])
y=new S.iV(null,null)
y.a=Math.sin(b9)
y.b=Math.cos(b9)
for(x=b8.length,w=b9!==0,v=0,u=0,t=0,s=0,r=2e9,q=-2e9,p=2e9,o=-2e9,n=0;n<b8.length;b8.length===x||(0,H.r)(b8),++n){m=b8[n]
l=m.gT()
k=H.o(l.ga6().h(0,"shape"),"$isd7")
j=H.o(l.ga6().h(0,"scale"),"$isU")
i=H.o(l.ga6().h(0,"density"),"$isp")
h=j.x===!0?j.ch:1
g=$.$get$bC()
if(k.x===!0)g=k.a1()
f=J.M(h)
if(f.ao(h,g.gah()))g=$.$get$as()
e=i.x===!0?i.ch:0.1
d=m.gcL()
c=Math.sin(H.A(d))
d=Math.cos(H.A(d))
b=J.c4(g)
a=f.ae(h,1)
if(a>>>0!==a||a>=b.length)return H.c(b,a)
a0=Math.max(0.01,H.A(J.q(e,b[a])))
a=g.gfL()
b=f.ae(h,1)
if(b>>>0!==b||b>=20)return H.c(a,b)
a1=a[b]
s+=a0
b=J.e(m)
a=J.q(J.B(a1.a,b.gv(m)),a0)
if(typeof a!=="number")return H.C(a)
u+=a
a=J.q(J.B(a1.b,b.gt(m)),a0)
if(typeof a!=="number")return H.C(a)
t+=a
v=Math.max(H.A(h),v)
a=g.gbc()
f=f.ae(h,1)
if(f>>>0!==f||f>=a.length)return H.c(a,f)
f=a[f]
a=f.length
a2=0
for(;a2<f.length;f.length===a||(0,H.r)(f),++a2){a3=f[a2]
a4=J.e(a3)
a5=J.ai(a4.gv(a3))
a6=J.ai(a4.gt(a3))
a4=b.gv(m)
if(typeof a4!=="number")return H.C(a4)
a7=a5*d-a6*c+a4
a4=b.gt(m)
if(typeof a4!=="number")return H.C(a4)
a8=a5*c+a6*d+a4
if(w){a4=y.b
a9=y.a
b0=a7*a4-a8*a9
b1=a7*a9+a8*a4
a8=b1
a7=b0}a4=new S.j(null,null)
a4.a=C.a.j(a7)
a4.b=C.a.j(a8)
z.push(a4)
r=Math.min(r,a7)
q=Math.max(q,a7)
p=Math.min(p,a8)
o=Math.max(o,a8)}}b2=u/s
b3=t/s
if(c1){b2+=(r+q)*0.5
b3+=(p+o)*0.5}for(x=z.length,n=0;n<z.length;z.length===x||(0,H.r)(z),++n){a3=z[n]
a3.a=J.J(a3.a,b2)
a3.b=J.J(a3.b,b3)}if(c0!=null){l=c0.a
g=l.u("shape")
h=l.u("scale")
x=J.M(h)
f=(x.ao(h,g.gah())?$.$get$as():g).gbc()
x=x.ae(h,1)
if(x>>>0!==x||x>=f.length)return H.c(f,x)
b4=this.dQ(f[x],h,z)}else b4=this.bx(z,c2!=null?c2:v)
for(x=b8.length,b0=null,b1=null,n=0;n<b8.length;b8.length===x||(0,H.r)(b8),++n){m=b8[n]
f=J.e(m)
b5=J.J(f.gv(m),b2)
b6=J.J(f.gt(m),b3)
b7=m.gcL()
if(w){f=y.b
d=J.O(b5)
c=d.X(b5,f)
b=y.a
a=J.O(b6)
b0=J.J(c,a.X(b6,b))
b1=J.B(d.X(b5,b),a.X(b6,f))
b7=J.B(b7,b9)
b6=b1
b5=b0}this.h5(m.gT(),b7,b4,b5,b6)}},
h7:function(a,b,c,d){return this.cU(a,b,null,c,d)},
e_:function(a){return this.cU(a,0,null,!1,null)},
h6:function(a,b){return this.cU(a,0,b,!1,null)},
dd:function(a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z=[]
z.push(new S.bL(a4.gT(),0,0,0))
y=a4.gT().u("shape")
x=a4.gT().u("scale")
w=J.M(x)
if(w.ao(x,y.gah()))y=$.$get$as()
v=y.ge4()
u=w.ae(x,1)
if(u>>>0!==u||u>=20)return H.c(v,u)
if(!v[u].I(C.i))return z
t=H.o(a4.gT().ga6().h(0,"features"),"$isb5")
if(t.x===!0&&t.cx.h(0,$.$get$ay())===!0){s=a4.gT().u("replicateBlock")
if(s!=null){r=s.u("shape")
q=s.u("scale")
p=[C.j,C.q,C.b]
o=[]
v=y.gcW()
w=w.ae(x,1)
if(w>>>0!==w||w>=v.length)return H.c(v,w)
w=v[w]
v=w.length
n=0
for(;n<w.length;w.length===v||(0,H.r)(w),++n){m=w[n]
if(J.cI(m)===C.i)if(y.gd3())o.push(m)
else{if(J.b2(m.gau().a,-0.7072))continue
o.push(m)}}if(o.length===0)return z
l=[]
w=r.gcW()
v=J.J(q,1)
if(v>>>0!==v||v>=w.length)return H.c(w,v)
v=w[v]
w=v.length
n=0
for(;n<v.length;v.length===w||(0,H.r)(v),++n){m=v[n]
if(C.f.M(p,J.cI(m)))l.push(m)}if(l.length===0)return z
for(w=o.length,n=0;n<o.length;o.length===w||(0,H.r)(o),++n){m=o[n]
v=m.gau().b
u=m.gau().a
k=Math.atan2(H.A(v),H.A(u))
j=P.an()
i=[]
h=y.gd3()?m.gau().a:1
g=y.gd3()?J.fg(m.gau().b):0
for(v=l.length,u=k+3.141592653589793,f=J.O(h),e=J.O(g),d=0;d<l.length;l.length===v||(0,H.r)(l),++d){c=l[d]
b=c.gau().b
a=c.gau().a
a=u-Math.atan2(H.A(b),H.A(a))
b=Math.sin(a)
a0=J.J(f.X(h,Math.cos(a)),e.X(g,b))
if(J.b2(a0,-0.001))continue
j.i(0,c,a0)
i.push(c)}v=i.length
if(v===0)continue
f=new S.lv(j);--v
if(v-0<=32)H.k5(i,0,v,f)
else H.k4(i,0,v,f)
if(0>=i.length)return H.c(i,0)
c=i[0]
v=c.gau().b
f=c.gau().a
f=u-Math.atan2(H.A(v),H.A(f))
v=Math.sin(f)
u=Math.cos(f)
e=J.e(m)
b=e.gv(m)
a=J.e(c)
a1=a.gv(c)
a2=a.gt(c)
a3=J.J(b,J.J(J.q(a1,u),J.q(a2,v)))
e=e.gt(m)
a2=a.gv(c)
a=a.gt(c)
z.push(new S.bL(s,a3,J.J(e,J.B(J.q(a2,v),J.q(a,u))),f))}}}return z},
hb:function(a){var z,y,x,w,v,u,t,s
if(a.a==null)return
z=this.dd(a)
y=a.a
x=y.u("shape")
w=a.a.u("scale")
v=J.M(w)
if(v.ao(w,x.gah()))x=$.$get$as()
u=J.e(x)
P.c2("comp: "+H.d(u.gE(x))+" @ "+H.d(w))
t=x.gbc()
v=v.ae(w,1)
if(v>>>0!==v||v>=t.length)return H.c(t,v)
this.bx(t[v],w)
s=H.o(a.a.a.h(0,"features"),"$isb5")
if(s.x===!0&&s.cx.h(0,$.$get$ay())===!0)this.h6(z,new S.bL(y,0,0,0))
else this.e_(z)
if(u.O(x,$.$get$as())){y=this.d
v=J.e(y)
v.saP(y,"rgba(60,60,60,0.6)")
v.hh(y,0,0,this.a,this.b)
v.saP(y,"#DDDDDD")
v.sc4(y,""+C.d.aG(this.b/2)+"px Droid Sans Mono")
v.sd5(y,"center")
v.bm(y,"?",this.a/2,this.b/4*2.4)
v.sc4(y,""+C.d.aG(this.b/9)+"px Droid Sans Mono")
v.bm(y,"Missing shape",this.a/2,this.b/4*3.2)}},
hd:function(a,b,c,d){var z,y,x,w,v,u,t,s
z=[]
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.r)(a),++x){w=a[x]
v=this.dd(w.a)
for(u=v.length,t=0;t<v.length;v.length===u||(0,H.r)(v),++t){s=v[t]
s.aU(0,w.d)
s.hD(0,w.b,w.c)
z.push(s)}}this.h7(z,b,!0,d)},
hc:function(a,b,c){return this.hd(a,b,!0,c)},
eT:function(a,b){var z=W.dS(null,null)
z.width=this.a
z.height=this.b
this.c=z
this.d=C.u.cd(z,"2d")},
D:{
c8:function(a,b){var z=new S.fx(a,b,null,null,!0)
z.eT(a,b)
return z}}},
lv:{"^":"a:23;a",
$2:function(a,b){var z,y,x
z=J.e(a)
y=J.e(b)
if(z.gR(a).gca()!==y.gR(b).gca())return C.e.aM(y.gR(b).gca(),z.gR(a).gca())
x=this.a
if(J.b2(J.dE(J.J(x.h(0,b),x.h(0,a))),0.001))return J.bu(y.gaH(b),z.gaH(a))
return J.bu(x.h(0,b),x.h(0,a))}},
bL:{"^":"i;T:a<,v:b*,t:c*,cL:d<",
aU:function(a,b){var z,y,x,w
z=this.d
if(typeof b!=="number")return H.C(b)
this.d=z+b
y=Math.sin(b)
x=Math.cos(b)
z=this.b
if(typeof z!=="number")return H.C(z)
w=this.c
if(typeof w!=="number")return H.C(w)
this.b=x*z-y*w
this.c=y*z+x*w},
hD:function(a,b,c){this.b=J.B(this.b,b)
this.c=J.B(this.c,c)}},
lG:{"^":"i;a,v:b*,t:c*,cL:d<"},
fE:{"^":"i;T:a<,aO:b<,c9:c?,d,e,f,r,bI:x@,y",
J:function(){var z,y
z=S.dU(null)
y=this.a.J()
z.a=y
y.r=z
H.o(y.a.h(0,"ident"),"$isd6").ch=S.fF()
return z},
bQ:function(a){var z,y
this.r=!0
z=this.a.at(0)
y=this.a
y.K(y.x)
this.c.f.appendChild(z)
this.b.className="ui component selected"},
c2:function(){this.r=!1
this.a.ay()
this.b.className="ui component"},
at:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=document
y=z.createElement("div")
y.className="ui component"
C.c.C(y,"click",new S.lH(this),null)
this.b=y
y.appendChild(this.y.c)
x=z.createElement("span")
this.d=x
x.textContent="Block name"
x.className="componentname"
y.appendChild(x)
w=z.createElement("span")
this.e=w
w.textContent="Block info"
w.className="componentinfo"
y.appendChild(w)
v=z.createElement("div")
v.className="ui sortbutton sortleft"
C.c.L(v,'<i class="glyphicon glyphicon-menu-left"></i>')
v.title="Move this block left"
C.c.C(v,"click",new S.lI(this),null)
y.appendChild(v)
u=z.createElement("div")
u.className="ui sortbutton sortright"
C.c.L(u,'<i class="glyphicon glyphicon-menu-right"></i>')
u.title="Move this block right"
C.c.C(u,"click",new S.lJ(this),null)
y.appendChild(u)
t=z.createElement("div")
t.className="ui copybutton"
C.c.L(t,'<i class="glyphicon glyphicon-duplicate"></i>')
t.title="Duplicate this block."
C.c.C(t,"click",new S.lK(this),null)
y.appendChild(t)
s=z.createElement("div")
s.className="ui deletebutton"
C.c.L(s,'<i class="glyphicon glyphicon-trash"></i>')
s.title="Delete this block"
C.c.C(s,"click",new S.lL(this),null)
y.appendChild(s)
r=z.createElement("div")
r.className="deletescreen"
C.c.L(r,"Delete this block?<br/>")
C.c.C(r,"click",new S.lM(),null)
this.f=r
y.appendChild(r)
q=z.createElement("div")
q.className="deletescreenbutton deleteyes glyphicon glyphicon-ok"
q.title="Delete the block"
C.c.C(q,"click",new S.lN(this),null)
r.appendChild(q)
p=z.createElement("div")
p.className="deletescreenbutton deleteno glyphicon glyphicon-remove"
p.title="Keep the block"
C.c.C(p,"click",new S.lO(this),null)
r.appendChild(p)
z=this.a
z.K(z.x)},
aF:function(){this.a.ay()
var z=this.b;(z&&C.c).aA(z)
this.b=null},
en:function(a){var z,y,x,w,v,u,t,s,r,q
z=H.o(this.a.a.h(0,"name"),"$isaN")
y=this.a
H.d(y.ch?y.z:"?")
y=this.d
x=z.x===!0?J.cJ(z.ch,"\\n","<br/>"):"";(y&&C.k).L(y,x)
w="<span title='Faction # Block ID'>"+H.d(H.o(this.a.a.h(0,"group"),"$isU").ch)+"#"+H.d(H.o(this.a.a.h(0,"ident"),"$isU").ch)+"</span> <span title='Block Scale' class='blockscale glyphicon glyphicon-stop'>"+H.d(H.o(this.a.a.h(0,"scale"),"$isU").ch)+"</span>"
v=H.o(this.a.a.h(0,"features"),"$isb5")
if(v.x===!0)for(y=v.cx,x=y.gH(),x=x.gB(x),u=!1;x.m();){t=x.gq()
if(y.h(0,t)===!0){if(t.gc6()==null)continue
if(!u){w+="<br/>"
u=!0}w+="<span class='glyphicon glyphicon-"+H.d(t.gc6())+"' title='"+t.ge8()+"'></span>"}}y=$.$get$aQ()
x=y.length
r=0
while(!0){if(!(r<y.length)){s=!1
break}if(y[r].r.M(0,this.a.u("ident"))){s=!0
break}y.length===x||(0,H.r)(y);++r}if($.$get$aQ().length>0&&!s)w+="<br/><span class='glyphicon glyphicon-question-sign' title='This block is not used in any loaded ship design'></span>"
y=this.e;(y&&C.k).L(y,w)
q=H.o(this.a.a.h(0,"blurb"),"$isaN")
y=this.b
y.title=q.x===!0?q.ch:""
if(a){y=this.y
J.aD(y.d,0,0,y.a,y.b)
y.hb(this)}},
d7:function(){return this.en(!0)},
a0:function(){var z=this.a
z.K(z.x)},
aR:function(a,b,c){this.a.aR(0,b,c)},
eV:function(a){var z
this.y=S.c8(100,100)
z=this.a
if(z==null){z=S.bo(!1)
this.a=z}z.r=this},
D:{
dU:function(a){var z=new S.fE(a,null,null,null,null,null,!1,null,null)
z.eV(a)
return z},
fF:function(){var z,y,x,w,v
z=P.V(null,null,null,P.x)
for(y=$.au.c,x=y.length,w=0;w<y.length;y.length===x||(0,H.r)(y),++w)z.S(0,y[w].gT().u("ident"))
for(v=1;!0;)if(z.M(0,v))++v
else break
return v}}},
lH:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.e(a)
if(z.ga7(a)!==0)return
y=this.a
y.c.bR(0,y)
z.aS(a)
z.a2(a)
z.bJ(a)},null,null,2,0,null,0,"call"]},
lI:{"^":"a:0;a",
$1:[function(a){var z=J.e(a)
if(z.ga7(a)!==0)return
z.a2(a)
z=this.a
z.c.bS(z)},null,null,2,0,null,0,"call"]},
lJ:{"^":"a:0;a",
$1:[function(a){var z=J.e(a)
if(z.ga7(a)!==0)return
z.a2(a)
z=this.a
z.c.bT(z)},null,null,2,0,null,0,"call"]},
lK:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.e(a)
if(z.ga7(a)!==0)return
y=this.a
y.c.c0(y)
z.a2(a)},null,null,2,0,null,0,"call"]},
lL:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.e(a)
if(z.ga7(a)!==0)return
y=this.a.f.style
y.display="block"
z.a2(a)},null,null,2,0,null,0,"call"]},
lM:{"^":"a:0;",
$1:[function(a){var z=J.e(a)
z.a2(a)
z.aS(a)},null,null,2,0,null,0,"call"]},
lN:{"^":"a:0;a",
$1:[function(a){var z=this.a
z.c.bz(z)},null,null,2,0,null,0,"call"]},
lO:{"^":"a:0;a",
$1:[function(a){var z=this.a.f.style
z.display="none"},null,null,2,0,null,0,"call"]},
bi:{"^":"aM;aH:ch>,ec:cx<,cy,db,hn:dx<,aO:dy<,fr,fx,fy,go,id,c9:k1?,bI:k2@,a,b,c,d,e,f,r,x,y,z,Q",
at:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=document
y=z.createElement("div")
y.className="ui component"
C.c.C(y,"click",new S.lW(this),null)
this.dy=y
y.appendChild(this.id.c)
x=z.createElement("span")
this.fr=x
x.textContent="Shape name"
x.className="componentname"
y.appendChild(x)
w=z.createElement("span")
this.fx=w
w.textContent="Shape info"
w.className="componentinfo"
y.appendChild(w)
v=z.createElement("div")
v.className="ui sortbutton sortleft"
C.c.L(v,'<i class="glyphicon glyphicon-menu-left"></i>')
v.title="Move this shape left"
C.c.C(v,"click",new S.lX(this),null)
y.appendChild(v)
u=z.createElement("div")
u.className="ui sortbutton sortright"
C.c.L(u,'<i class="glyphicon glyphicon-menu-right"></i>')
u.title="Move this shape right"
C.c.C(u,"click",new S.lY(this),null)
y.appendChild(u)
t=z.createElement("div")
t.className="ui copybutton"
C.c.L(t,'<i class="glyphicon glyphicon-duplicate"></i>')
t.title="Duplicate this shape."
C.c.C(t,"click",new S.lZ(this),null)
y.appendChild(t)
s=z.createElement("div")
s.className="ui deletebutton"
C.c.L(s,'<i class="glyphicon glyphicon-trash"></i>')
s.title="Delete this shape"
C.c.C(s,"click",new S.m_(this),null)
y.appendChild(s)
r=z.createElement("div")
r.className="deletescreen"
C.c.L(r,"Delete this shape?<br/>")
C.c.C(r,"click",new S.m0(),null)
this.fy=r
y.appendChild(r)
q=z.createElement("div")
q.className="deletescreenbutton deleteyes glyphicon glyphicon-ok"
q.title="Delete the shape"
C.c.C(q,"click",new S.m1(this),null)
r.appendChild(q)
p=z.createElement("div")
p.className="deletescreenbutton deleteno glyphicon glyphicon-remove"
p.title="Keep the shape"
C.c.C(p,"click",new S.m2(this),null)
r.appendChild(p)
this.a0()},
bQ:function(a){this.go=!0
this.dy.className="ui component selected"},
c2:function(){this.go=!1
this.dy.className="ui component"},
aF:function(){var z=this.dy;(z&&C.c).aA(z)
this.dy=null},
J:function(){var z,y,x,w,v,u,t
z=S.dV(this.ch,!1)
z.b=this.b
z.cy=this.cy
z.db=this.db
z.c=this.c
for(y=0;y<this.b;++y){x=z.d
if(y>=x.length)return H.c(x,y)
x[y]=[]
x=this.d
if(y>=x.length)return H.c(x,y)
x=x[y]
w=x.length
v=0
for(;v<x.length;x.length===w||(0,H.r)(x),++v){u=x[v]
t=z.d
if(y>=t.length)return H.c(t,y)
t[y].push(u.J())}x=z.dx
if(y>=10)return H.c(x,y)
x[y]=[]
for(x=this.dx[y],w=x.length,v=0;v<x.length;x.length===w||(0,H.r)(x),++v){u=x[v]
z.dx[y].push(u.J())}}z.p()
return z},
a0:function(){var z,y,x
if(this.cy)this.d9()
else{this.p()
for(z=this.cx,y=z.length,x=0;x<z.length;z.length===y||(0,H.r)(z),++x)z[x].d9()}z=this.id
J.aD(z.d,0,0,z.a,z.b)
z.he(this)
z.h9(this,!0)
this.fr.textContent=this.a},
p:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
this.e=[]
for(z=0;z<this.b;++z){y=this.dx
if(z>=10)return H.c(y,z)
x=y[z]
w=[]
for(y=x.length,v=0;v<x.length;x.length===y||(0,H.r)(x),++v){u=x[v]
t=u.gck()
s=this.d
if(z>=s.length)return H.c(s,z)
if(J.ff(t,s[z].length))continue
t=this.d
if(z>=t.length)return H.c(t,z)
t=t[z]
s=u.gck()
if(s>>>0!==s||s>=t.length)return H.c(t,s)
r=t[s]
q=J.B(u.gck(),1)
t=this.d
if(z>=t.length)return H.c(t,z)
if(J.ff(q,t[z].length))q=0
t=this.d
if(z>=t.length)return H.c(t,z)
t=t[z]
if(q>>>0!==q||q>=t.length)return H.c(t,q)
p=t[q]
t=J.e(p)
s=J.e(r)
o=J.J(t.gv(p),s.gv(r))
n=J.J(t.gt(p),s.gt(r))
t=J.cI(u)
m=J.O(o)
l=J.B(s.gv(r),m.X(o,u.ge3()))
k=J.O(n)
s=J.B(s.gt(r),k.X(n,u.ge3()))
m=m.bP(o)
j=new S.aH(t,null,0,null,null)
j.a=J.ai(l)
j.b=J.ai(s)
s=J.O(m)
i=Math.sqrt(H.A(J.B(k.X(n,n),s.X(m,m))))
k=k.aI(n,i)
m=s.aI(m,i)
s=new S.j(null,null)
s.a=C.a.j(k)
s.b=C.a.j(m)
j.d=s
w.push(j)}y=this.e;(y&&C.f).S(y,w)}this.eG()},
hH:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=new Array(10)
z.fixed$length=Array
this.d=H.E(z,[[P.m,S.j]])
this.dx=H.E(new Array(10),[[P.m,S.cn]])
this.b=0
for(z=J.a7(J.dK(a));z.m();){y=z.gq();++this.b
x=[]
w=[]
if(y.I("verts")===!0&&!!J.t(J.a0(y,"verts")).$isF)for(v=J.a7(J.dK(J.a0(y,"verts")));v.m();){u=v.gq()
t=J.t(u)
if(!!t.$isF){s=P.kU(J.fm(t.ga5(u)),new S.m6())
r=P.kU(J.fn(t.ga5(u)),new S.m7())
t=J.q(s,0.1)
q=J.q(r,-0.1)
p=new S.j(null,null)
p.a=J.ai(t)
p.b=J.ai(q)
w.push(p)}}if(y.I("rwdk")===!0&&!!J.t(J.a0(y,"rwdk")).$isF)J.a0(y,"rwdk")
v=y.I("ports")===!0&&!!J.t(J.a0(y,"ports")).$isF
if(v)for(v=J.a7(J.dK(J.a0(y,"ports")));v.m();){o=v.gq()
t=J.t(o)
if(!!t.$isF){u=H.Q(t.h(o,"0"),null,new S.m8())
n=H.Z(t.h(o,"1"),new S.m9())
m=o.I("2")===!0?t.h(o,"2"):"NORMAL"
x.push(new S.cn(u,n,$.$get$eg().I(m)?$.$get$eg().h(0,m):C.b))}}v=this.dx
t=this.b-1
if(t>>>0!==t||t>=10)return H.c(v,t)
v[t]=x
v=this.d
if(t>=v.length)return H.c(v,t)
v[t]=w}},
d9:function(){var z,y,x,w,v,u,t
if(this.cy){this.d=[]
this.e=[]
this.b=this.db.gah()
for(z=0;z<this.b;++z){y=this.db.gbc()
if(z>=y.length)return H.c(y,z)
x=y[z]
w=[]
for(y=x.length,v=0;v<x.length;x.length===y||(0,H.r)(x),++v){u=x[v].J()
t=J.e(u)
t.st(u,J.fg(t.gt(u)))
w.push(u)}y=this.d;(y&&C.f).S(y,w)}for(z=0;z<this.b;++z){y=this.db.ghn()
if(z>=10)return H.c(y,z)
x=y[z]
w=[]
for(y=x.length,v=0;v<x.length;x.length===y||(0,H.r)(x),++v)w.push(x[v].J())
this.dx[z]=w}this.p()}},
aR:function(a,b,c){},
eW:function(a,b){this.id=S.c8(100,100)
this.ch=a
this.c=b},
D:{
dV:function(a,b){var z,y
z=H.E(new Array(10),[[P.m,S.cn]])
y=J.aF(a)
z=new S.bi(null,[],!1,null,z,null,null,null,null,!1,null,null,null,y,1,!1,null,null,null,null,null,null,null,null)
z.cp(y,1,!1)
z.eW(a,b)
return z},
m3:function(a){var z,y,x,w,v,u,t,s,r,q,p
for(z=J.a7(a.gH()),y=null,x=-1,w=!1,v=-1;z.m();){u=z.gq()
t=J.t(u)
if(t.O(u,"ident"))x=H.Q(a.h(0,u),null,new S.m4())
else if(t.O(u,"launcher_radial"))w=J.v(a.h(0,u),"true")&&!0
else if(t.O(u,"mirror_of"))v=H.Q(a.h(0,u),null,new S.m5())
else if(!!J.t(a.h(0,u)).$isF)y=a.h(0,u)}z=J.t(x)
if(z.O(x,-1)||y==null)return
if(!J.v(v,-1)){for(t=$.bb.c,s=t.length,r=0;r<t.length;t.length===s||(0,H.r)(t),++r){q=t[r]
if(J.v(J.dH(q),v)){t=H.E(new Array(10),[[P.m,S.cn]])
s=z.A(x)
t=new S.bi(null,[],!1,null,t,null,null,null,null,!1,null,null,null,s,1,!1,null,null,null,null,null,null,null,null)
t.cp(s,1,!1)
s=new S.fx(100,100,null,null,!0)
p=W.dS(null,null)
p.width=100
p.height=100
s.c=p
s.d=C.u.cd(p,"2d")
t.id=s
t.ch=x
t.c=!1
if(q!=null){t.db=q
t.cy=!0
q.gec().push(t)}else{t.cy=!1
z=t.db
if(z!=null)C.f.an(z.gec(),t)
t.db=null}t.d9()
return t}}return}z=S.dV(x,w)
z.hH(y)
z.p()
return z}}},
lW:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.e(a)
if(z.ga7(a)!==0)return
y=this.a
y.k1.bR(0,y)
z.aS(a)
z.a2(a)
z.bJ(a)},null,null,2,0,null,0,"call"]},
lX:{"^":"a:0;a",
$1:[function(a){var z=J.e(a)
if(z.ga7(a)!==0)return
z.a2(a)
z=this.a
z.k1.bS(z)},null,null,2,0,null,0,"call"]},
lY:{"^":"a:0;a",
$1:[function(a){var z=J.e(a)
if(z.ga7(a)!==0)return
z.a2(a)
z=this.a
z.k1.bT(z)},null,null,2,0,null,0,"call"]},
lZ:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.e(a)
if(z.ga7(a)!==0)return
y=this.a
y.k1.c0(y)
z.a2(a)},null,null,2,0,null,0,"call"]},
m_:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.e(a)
if(z.ga7(a)!==0)return
y=this.a.fy.style
y.display="block"
z.a2(a)},null,null,2,0,null,0,"call"]},
m0:{"^":"a:0;",
$1:[function(a){var z=J.e(a)
z.a2(a)
z.aS(a)},null,null,2,0,null,0,"call"]},
m1:{"^":"a:0;a",
$1:[function(a){var z=this.a
z.k1.bz(z)},null,null,2,0,null,0,"call"]},
m2:{"^":"a:0;a",
$1:[function(a){var z=this.a.fy.style
z.display="none"},null,null,2,0,null,0,"call"]},
m6:{"^":"a:7;",
$1:function(a){return 0}},
m7:{"^":"a:7;",
$1:function(a){return 0}},
m8:{"^":"a:7;",
$1:function(a){return 0}},
m9:{"^":"a:7;",
$1:function(a){return 0.5}},
m4:{"^":"a:7;",
$1:function(a){return-1}},
m5:{"^":"a:7;",
$1:function(a){return-1}},
cn:{"^":"i;ck:a<,e3:b<,R:c*",
J:function(){return new S.cn(this.a,this.b,this.c)}},
ao:{"^":"i;E:a>,dZ:b<,bw:c<,c6:d<,e8:e<",
A:function(a){var z,y,x
z=this.a
y=H.d(new H.cB(H.f8(this),null))+": "+z
x=this.b
return y+(x!==z?" ("+x+")":"")},
D:{"^":"wz<"}},
pZ:{"^":"a:13;",
$2:function(a,b){return J.bu(J.a8(a),J.a8(b))}},
q_:{"^":"a:13;",
$2:function(a,b){return J.bu(J.a8(a),J.a8(b))}},
q0:{"^":"a:13;",
$2:function(a,b){return J.bu(J.a8(a),J.a8(b))}},
ml:{"^":"ao;a,b,c,d,e",D:{"^":"ce<",
e0:function(a,b,c,d){var z=new S.ml(a,null,b,c,d)
z.b=a
return z}}},
mo:{"^":"ao;a,b,c,d,e",D:{"^":"e8<",
e7:function(a,b,c,d){var z=new S.mo(a,null,b,c,d)
z.b=a
return z}}},
mn:{"^":"ao;a,b,c,d,e",D:{"^":"e6<",
d_:function(a,b,c,d){var z=new S.mn(a,null,b,c,d)
z.b=a
return z}}},
mp:{"^":"ao;a,b,c,d,e",D:{"^":"ea<",
e9:function(a,b,c,d){var z=new S.mp(a,null,b,c,d)
z.b=a
return z}}},
mj:{"^":"ao;a,b,c,d,e",D:{"^":"e_<",
cc:function(a,b,c,d){var z=new S.mj(a,null,b,c,d)
z.b=a
return z}}},
mk:{"^":"ao;a,b,c,d,e",D:{"^":"cd<",
a3:function(a,b,c,d){var z=new S.mk(a,null,b,c,d)
z.b=a
return z}}},
mm:{"^":"ao;a,b,c,d,e",D:{"^":"cZ<",
D:function(a,b,c,d){var z=new S.mm(a,null,b,c,d)
z.b=a
return z}}},
mi:{"^":"ao;a,b,c,d,e",D:{"^":"dZ<",
bj:function(a,b,c,d){var z=new S.mi(a,null,b,c,d)
z.b=a
return z}}},
ms:{"^":"i;T:a<,aO:b<,c9:c?,d,e,f,r,bI:x@,y",
J:function(){var z,y
z=S.eb(null)
y=this.a.J()
z.a=y
y.r=z
return z},
aF:function(){this.a.ay()
var z=this.b;(z&&C.c).aA(z)
this.b=null},
bQ:function(a){var z,y
this.r=!0
z=this.a.at(0)
y=this.a
y.K(y.x)
this.c.f.appendChild(z)
this.b.className="ui component selected"},
c2:function(){this.r=!1
this.a.ay()
this.b.className="ui component"},
cR:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=document
y=z.createElement("div")
y.className="ui component"
C.c.C(y,"click",new S.mt(this),null)
this.b=y
y.appendChild(this.y.c)
x=z.createElement("span")
this.d=x
x.textContent="Faction name"
x.className="componentname"
y.appendChild(x)
w=z.createElement("span")
this.e=w
w.textContent="Faction info"
w.className="componentinfo"
y.appendChild(w)
v=z.createElement("div")
v.className="ui sortbutton sortleft"
C.c.L(v,'<i class="glyphicon glyphicon-menu-left"></i>')
v.title="Move this faction left"
C.c.C(v,"click",new S.mu(this),null)
y.appendChild(v)
u=z.createElement("div")
u.className="ui sortbutton sortright"
C.c.L(u,'<i class="glyphicon glyphicon-menu-right"></i>')
u.title="Move this faction right"
C.c.C(u,"click",new S.mv(this),null)
y.appendChild(u)
t=z.createElement("div")
t.className="ui copybutton"
C.c.L(t,'<i class="glyphicon glyphicon-duplicate"></i>')
t.title="Duplicate this faction."
C.c.C(t,"click",new S.mw(this),null)
y.appendChild(t)
s=z.createElement("div")
s.className="ui deletebutton"
C.c.L(s,'<i class="glyphicon glyphicon-trash"></i>')
s.title="Delete this faction"
C.c.C(s,"click",new S.mx(this),null)
y.appendChild(s)
r=z.createElement("div")
r.className="deletescreen"
C.c.L(r,"Delete this faction?<br/>")
C.c.C(r,"click",new S.my(),null)
this.f=r
y.appendChild(r)
q=z.createElement("div")
q.className="deletescreenbutton deleteyes glyphicon glyphicon-ok"
q.title="Delete the faction"
C.c.C(q,"click",new S.mz(this),null)
r.appendChild(q)
p=z.createElement("div")
p.className="deletescreenbutton deleteno glyphicon glyphicon-remove"
p.title="Keep the faction"
C.c.C(p,"click",new S.mA(this),null)
r.appendChild(p)
z=this.a
z.K(z.x)},
at:function(a){return this.cR(a,-1)},
d7:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=H.o(this.a.a.h(0,"name"),"$isaN")
y=this.d
x=z.x===!0?J.cJ(z.ch,"\\n","<br/>"):"";(y&&C.k).L(y,x)
w="<span title='Faction ID'>#"+H.d(H.o(this.a.a.h(0,"ident"),"$isU").ch)+"</span><br/>"
v=H.o(this.a.a.h(0,"aiflags"),"$isb5")
if(v.x===!0)for(y=v.cx,x=y.gH(),x=x.gB(x);x.m();){u=x.gq()
if(y.h(0,u)===!0){if(u.gc6()==null)continue
w+="<span class='glyphicon glyphicon-"+H.d(u.gc6())+"' title='"+u.ge8()+"'></span>"}}y=this.e;(y&&C.k).L(y,w)
y=this.y
J.aD(y.d,0,0,y.a,y.b)
t=[]
s=this.a.a.h(0,"primaries").a1()
r=$.d1.a.ga6().h(0,"fillColor")
q=$.d1.a.ga6().h(0,"lineColor")
r.sam(0)
r.sai(0)
r.sak(0)
q.sam(40)
q.sai(40)
q.sak(40)
p=$.d2.a.ga6().h(0,"fillColor")
o=$.d2.a.ga6().h(0,"lineColor")
p.sam(0)
p.sai(0)
p.sak(0)
o.sam(40)
o.sai(40)
o.sak(40)
n=$.d3.a.ga6().h(0,"fillColor")
m=$.d3.a.ga6().h(0,"lineColor")
n.sam(0)
n.sai(0)
n.sak(0)
m.sam(40)
m.sai(40)
m.sak(40)
y=J.M(s)
if(y.ao(s,0))t.push($.d1)
if(y.ao(s,1))t.push($.d2)
if(y.ao(s,2))t.push($.d3)
if(this.a.a.h(0,"color0").a1()!=null&&this.a.a.h(0,"color0").aE()===!0){l=this.a.a.h(0,"color0")
r.sam(l.gam())
r.sai(l.gai())
r.sak(l.gak())
q.sam(C.e.as(l.gam(),3))
q.sai(C.e.as(l.gai(),3))
q.sak(C.e.as(l.gak(),3))}k=this.a.a.h(0,"color1").a1()
if(y.ao(s,1)&&k!=null&&this.a.a.h(0,"color1").aE()===!0){j=this.a.a.h(0,"color1")
p.sam(j.gam())
p.sai(j.gai())
p.sak(j.gak())
o.sam(C.e.as(j.gam(),3))
o.sai(C.e.as(j.gai(),3))
o.sak(C.e.as(j.gak(),3))}i=this.a.a.h(0,"color2").a1()
if(y.ao(s,2)&&i!=null&&this.a.a.h(0,"color2").aE()===!0){h=this.a.a.h(0,"color2")
n.sam(h.gam())
n.sai(h.gai())
n.sak(h.gak())
m.sam(C.e.as(h.gam(),3))
m.sai(C.e.as(h.gai(),3))
m.sak(C.e.as(h.gak(),3))}this.y.e_(t)
$.aS.d8()
S.k3()},
a0:function(){var z=this.a
z.K(z.x)},
aR:function(a,b,c){this.a.aR(0,b,c)},
fH:function(){var z,y,x,w,v,u,t,s,r,q
z=this.a.a.h(0,"color0")
y=this.a.a.h(0,"color1")
x=this.a.a.h(0,"color2")
if(z.aE()===!0&&J.b3(z)===!0){w=z.a1()
v=J.L(w)
u=v.h(w,"r")
if(typeof u!=="number")return H.C(u)
t=0+u
u=v.h(w,"g")
if(typeof u!=="number")return H.C(u)
s=0+u
v=v.h(w,"b")
if(typeof v!=="number")return H.C(v)
r=0+v
q=1}else{t=0
s=0
r=0
q=0}if(y.aE()===!0&&J.b3(y)===!0){++q
w=y.a1()
v=J.L(w)
u=v.h(w,"r")
if(typeof u!=="number")return H.C(u)
t+=u
u=v.h(w,"g")
if(typeof u!=="number")return H.C(u)
s+=u
v=v.h(w,"b")
if(typeof v!=="number")return H.C(v)
r+=v}if(x.aE()===!0&&J.b3(x)===!0){++q
w=x.a1()
v=J.L(w)
u=v.h(w,"r")
if(typeof u!=="number")return H.C(u)
t+=u
u=v.h(w,"g")
if(typeof u!=="number")return H.C(u)
s+=u
v=v.h(w,"b")
if(typeof v!=="number")return H.C(v)
r+=v}if(q>0)return P.Y(["r",C.a.bg(t,q),"g",C.a.bg(s,q),"b",C.a.bg(r,q)])
return P.Y(["r",127,"g",127,"b",127])},
eY:function(a){var z=S.c8(100,100)
z.e=!1
this.y=z
z=this.a
if(z==null){z=S.eq()
this.a=z}z.r=this},
D:{
eb:function(a){var z=new S.ms(a,null,null,null,null,null,!1,null,null)
z.eY(a)
return z}}},
mt:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.e(a)
if(z.ga7(a)!==0)return
y=this.a
y.c.bR(0,y)
z.aS(a)
z.a2(a)
z.bJ(a)},null,null,2,0,null,0,"call"]},
mu:{"^":"a:0;a",
$1:[function(a){var z=J.e(a)
if(z.ga7(a)!==0)return
z.a2(a)
z=this.a
z.c.bS(z)},null,null,2,0,null,0,"call"]},
mv:{"^":"a:0;a",
$1:[function(a){var z=J.e(a)
if(z.ga7(a)!==0)return
z.a2(a)
z=this.a
z.c.bT(z)},null,null,2,0,null,0,"call"]},
mw:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.e(a)
if(z.ga7(a)!==0)return
y=this.a
y.c.c0(y)
z.a2(a)},null,null,2,0,null,0,"call"]},
mx:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.e(a)
if(z.ga7(a)!==0)return
y=this.a.f.style
y.display="block"
z.a2(a)},null,null,2,0,null,0,"call"]},
my:{"^":"a:0;",
$1:[function(a){var z=J.e(a)
z.a2(a)
z.aS(a)},null,null,2,0,null,0,"call"]},
mz:{"^":"a:0;a",
$1:[function(a){var z=this.a
z.c.bz(z)},null,null,2,0,null,0,"call"]},
mA:{"^":"a:0;a",
$1:[function(a){var z=this.a.f.style
z.display="none"},null,null,2,0,null,0,"call"]},
aa:{"^":"i;aO:a<,hq:b<,E:d>,bw:e<,aw:f*,dh:r@,b0:x*,c3:y@",
ag:["aT",function(){var z=document.createElement("div")
this.b=z
C.c.L(z,"<div class='field' >"+this.d+"</span>")
z.title=this.e
return this.b}],
at:function(a){var z,y,x,w,v
z=document
this.a=z.createElement("tr")
y=z.createElement("td")
x=W.ag("checkbox")
w=J.e(x)
w.sb7(x,this.x)
x.setAttribute("fieldid",""+this.Q)
if(this.y){this.x=!0
w.sb7(x,!0)
w.saC(x,!0)
x.title="Required field"}w.C(x,"change",new S.n2(),null)
this.c=x
y.appendChild(x)
v=z.createElement("td")
v.appendChild(this.ag())
z=this.a
z.appendChild(y)
z.appendChild(v)
return this.a},
ay:["co",function(){var z=this.a
if(z==null)return
C.I.aA(z)
this.a=null}],
aE:function(){var z=this.r
if(z==null)return!0
return z.$1(this)},
K:function(a){var z,y
z=this.z
if(z!==a)return
this.z=!z
this.aD(a)
if(this.a!=null){z=this.aE()
y=this.a
if(z===!0){z=y.style
z.display=""}else{z=y.style
z.display="none"}if(this.x===!0)y.className=""
else y.className="inactive"}z=this.f
if(z!=null)z.K(a)},
aD:["dl",function(a){}],
a0:function(){this.K(this.z)},
aF:["eH",function(){$.$get$h().i(0,this.Q,null)}],
ac:function(a,b){},
U:function(a,b,c,d){S.a_(b,(d?this.d+"=":"")+"=VALUE,",c,!0)
return!0},
aq:function(a,b,c){return this.U(a,b,c,!0)},
J:function(){return},
a1:function(){return},
a_:function(){var z=this.c
if(z!=null)J.dM(z,!0)
this.x=!0},
df:function(a){if(a)this.x=!0
this.y=a},
aW:function(){return this.df(!0)}},
n2:{"^":"a:4;",
$1:[function(a){var z,y,x
z=H.o(J.T(a),"$isfB")
y=H.Q(z.getAttribute("fieldid"),null,null)
x=$.$get$h().h(0,y)
J.cK(x,z.checked)
x.a0()},null,null,2,0,null,0,"call"]},
cl:{"^":"aa;T:ch<,cx,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y
z=this.aT()
y=this.ch
if(y!=null){y=S.c9(this.Q,y.at(0))
this.cx=y
z.appendChild(y.a)
if(this.x===!0)this.cx.bC(0)}return z},
ay:function(){var z=this.ch
if(z!=null)z.ay()
this.co()},
aD:["eI",function(a){var z=this.ch
if(z!=null)z.K(a)}],
aF:function(){var z=this.ch
if(z!=null)z.aF()
this.eH()},
ac:function(a,b){if(!!J.t(b).$isF&&this.ch!=null)this.ch.ac(0,b)},
U:function(a,b,c,d){if(this.ch!=null){S.a_(b,d?this.d+"=":"",c,!1)
this.ch.bq(0,b,c,!1)
return!0}return!1},
aq:function(a,b,c){return this.U(a,b,c,!0)},
J:function(){return S.bT(this.d,this.e,this.ch.J())},
a1:function(){if(this.x===!0&&this.ch!=null)return this.ch
return},
cr:function(a,b,c){var z=this.ch
if(z!=null)z.f=this},
D:{
bT:function(a,b,c){var z,y
z=$.b
$.b=z+1
y=new S.cl(c,null,null,null,null,a,b,null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
y.cr(a,b,c)
return y}}},
hW:{"^":"cl;cy,db,bv:dx@,bH:dy*,fr,e9:fx<,ch,cx,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y,x,w,v,u,t,s,r
z=document
y=z.createElement("div")
this.b=y
C.c.L(y,"<div class='field' >"+this.d+"</span>")
y.title=this.e
y=z.createElement("div")
y.className="enumreadout"
y.textContent="[No block specified]"
this.db=y
this.b.appendChild(y)
this.fr=z.createElement("div")
x=z.createElement("div")
w=W.ag("radio")
y=J.e(w)
y.sb7(w,!0)
v=this.Q
w.id="mode_0_"+v
y.sE(w,"mode_"+v)
y.sN(w,"0")
y.C(w,"change",new S.mB(),null)
u=z.createElement("label")
u.htmlFor="mode_0_"+v
u.textContent="Specify block ID:"
t=W.ag("number")
y=J.e(t)
y.saL(t,"1")
t.setAttribute("fieldid",""+v)
y.sN(t,H.d(this.dx))
y.C(t,"change",new S.mC(),null)
this.fx=t
s=W.ag("radio")
y=J.e(s)
y.sb7(s,!1)
s.id="mode_1_"+v
y.sE(s,"mode_"+v)
y.sN(s,"1")
y.C(s,"change",new S.mD(),null)
r=z.createElement("label")
r.htmlFor="mode_1_"+v
r.textContent="Define block below:"
x.appendChild(w)
x.appendChild(u)
x.appendChild(t)
x.appendChild(z.createElement("br"))
x.appendChild(s)
x.appendChild(r)
this.fr.appendChild(x)
z=this.ch
if(z!=null)this.fr.appendChild(z.at(0))
z=S.c9(v,this.fr)
this.cx=z
if(this.x===!0&&this.dy===1)z.bC(0)
this.b.appendChild(this.cx.a)
return this.b},
ac:function(a,b){var z,y
if(!!J.t(b).$isF){z=S.bo(!0)
this.ch=z
z.f=this
z.ac(0,b)
this.dy=1}else if(typeof b==="string"){this.dy=0
y=!S.aR(b)?"0":b
this.dx=H.Q(""+J.bf(H.Z(C.h.cl(y,"0x")?H.d(H.Q(C.h.b3(y,2),16,null)):y,null)),null,null)}},
aD:function(a){var z,y,x,w
this.eI(a)
z=this.fr
if(z!=null){y=this.Q
H.o(z.querySelector("#mode_0_"+y),"$isiT").checked=this.dy===0
H.o(this.fr.querySelector("#mode_1_"+y),"$isiT").checked=this.dy===1}if(this.dy===1&&this.ch==null){z=S.bo(!0)
this.ch=z
z.f=this
z.K(z.x)
z=this.fr
if(z!=null){z.appendChild(this.ch.at(0))
z=this.ch
z.K(z.x)}}z=this.db
if(z!=null)if(this.dy===0){x=H.Q(J.dJ(this.fx),null,null)
w=this.a1()
z=w!=null&&!J.v(w.u("name"),"")
y=this.db
if(z)y.textContent="[Block with ID "+H.d(x)+': "'+H.d(w.u("name"))+'"]'
else y.textContent="[Block with ID "+H.d(x)+"]"}else z.textContent="[Block defined inside"+(J.b3(this.ch.a.h(0,"name"))===!0?': "'+H.d(this.ch.u("name"))+'"':"")+"]"},
U:function(a,b,c,d){var z
if(this.dy===0){z=d?this.d+"=":""
S.a_(b,z+H.d(this.dx)+",",0,!0)
return!0}else if(this.ch!=null){S.a_(b,this.d+"=",c,!1)
this.ch.bq(0,b,c,!1)
return!0}return!1},
aq:function(a,b,c){return this.U(a,b,c,!0)},
J:function(){var z,y,x,w
z=this.d
y=this.e
x=$.b
$.b=x+1
w=new S.hW(!1,null,0,0,null,null,null,null,null,null,null,z,y,null,null,!1,!1,!1,x)
$.$get$h().i(0,x,w)
w.cr(z,y,null)
w.dy=this.dy
w.dx=this.dx
z=this.ch
if(z==null)z=null
else{z=z.J()
z.f=w}w.ch=z
return w},
a1:function(){var z,y
if(this.x===!0)if(this.dy===0){if(J.S(this.dx,0))for(z=$.au.b,z=z.ga5(z),z=z.gB(z);z.m();){y=z.gq()
if(y.gT()!=null&&J.v(y.gT().u("ident"),this.dx))return y.gT()}}else{z=this.ch
if(z!=null)return z}return}},
mB:{"^":"a:4;",
$1:[function(a){var z=$.$get$h().h(0,H.Q(J.cM(H.o(J.T(a),"$isN").id,7),null,null))
J.fu(z,0)
z.a0()},null,null,2,0,null,0,"call"]},
mC:{"^":"a:4;",
$1:[function(a){var z,y
z=H.o(J.T(a),"$isaI")
if(!S.aR(z.value))z.value="0"
z.value=""+J.bf(H.Z(z.value,null))
y=$.$get$h().h(0,H.Q(z.getAttribute("fieldid"),null,null))
y.sbv(H.Q(z.value,null,null))
y.a0()},null,null,2,0,null,0,"call"]},
mD:{"^":"a:4;",
$1:[function(a){var z=$.$get$h().h(0,H.Q(J.cM(H.o(J.T(a),"$isN").id,7),null,null))
J.fu(z,1)
z.a0()},null,null,2,0,null,0,"call"]},
ed:{"^":"aa;",
dL:function(){var z,y
z=this.ch
y=this.cS(z.length)
y.y=!0
y.x=!0
z.push(y)
return y},
dN:function(a){var z,y,x,w,v,u
if(this.cy!=null){z=document
y=z.createElement("div")
y.className="listcontainer"
x=z.createElement("div")
x.className="listoverlay"
x.textContent="Delete?"
x.title=""
w=z.createElement("span")
w.className="glyphicon glyphicon-ok"
w.title="Delete this item"
v=z.createElement("span")
v.className="glyphicon glyphicon-remove"
v.title="Keep this item"
x.appendChild(w)
S.K(w,new S.mU(this,a))
x.appendChild(v)
S.K(v,new S.mV(x))
y.appendChild(x)
u=z.createElement("div")
u.className="listbutton glyphicon glyphicon-trash"
u.title="Delete item"
S.K(u,new S.mW(x))
y.appendChild(u)
y.appendChild(a.ag())
this.cy.appendChild(y)}},
aD:function(a){this.dl(a)},
ag:function(){var z,y,x,w,v,u
z=this.aT()
y=document
x=y.createElement("div")
x.className="ui"
this.cy=x
w=y.createElement("div")
w.title="Add a new item to the list"
v=y.createElement("div")
v.className="listbutton glyphicon glyphicon-star"
S.K(v,new S.mX(this))
w.appendChild(v)
y=y.createElement("span")
x=y.style
x.marginRight="13px"
y.textContent=" Add new item"
w.appendChild(y)
this.cy.appendChild(w)
for(y=this.ch,x=y.length,u=0;u<y.length;y.length===x||(0,H.r)(y),++u)this.dN(y[u])
y=S.c9(this.Q,this.cy)
this.cx=y
z.appendChild(y.a)
if(this.x===!0)this.cx.bC(0)
return z},
cQ:function(a){var z,y,x,w,v
for(z=this.ch,y=z.length,x=0;x<z.length;z.length===y||(0,H.r)(z),++x){w=z[x]
v=w.J()
J.cK(v,J.b3(w))
v.sc3(w.gc3())
a.push(v)}},
a1:function(){var z,y,x,w
if(this.x===!0){z=[]
for(y=this.ch,x=y.length,w=0;w<y.length;y.length===x||(0,H.r)(y),++w)z.push(y[w].a1())
return z}return[]},
ac:function(a,b){var z,y
z=J.t(b)
if(!z.$isF)return
for(z=J.a7(z.ga5(b));z.m();){y=z.gq()
this.dL().ac(0,y)}},
U:function(a,b,c,d){var z,y,x,w
S.a_(b,(d?this.d+"=":"")+"{",c,!0)
for(z=this.ch,y=z.length,x=c+1,w=0;w<z.length;z.length===y||(0,H.r)(z),++w)J.ll(z[w],b,x,!1)
S.a_(b,"},",c,!0)
return!1},
aq:function(a,b,c){return this.U(a,b,c,!0)}},
mU:{"^":"a:0;a,b",
$1:function(a){var z=this.b
C.f.an(this.a.ch,z)
J.dL(z.ghq().parentElement)}},
mV:{"^":"a:0;a",
$1:function(a){var z=this.a.style
z.visibility="hidden"}},
mW:{"^":"a:0;a",
$1:function(a){var z=this.a.style
z.visibility="visible"}},
mX:{"^":"a:0;a",
$1:function(a){var z=this.a
z.dN(z.dL())
z.a_()
z.K(z.z)}},
ee:{"^":"ed;ch,cx,cy,a,b,c,d,e,f,r,x,y,z,Q",
cS:function(a){var z,y
z=this.d+" #"+a
y=$.b
$.b=y+1
z=new S.i3("",null,null,null,z,"Save name of a ship, minus the .lua file extension.",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
return z},
J:function(){var z,y,x,w
z=this.d
y=[]
x=$.b
$.b=x+1
w=new S.ee(y,null,null,null,null,null,z,this.e,null,null,!1,!1,!1,x)
$.$get$h().i(0,x,w)
this.cQ(y)
return w}},
i2:{"^":"ed;ch,cx,cy,a,b,c,d,e,f,r,x,y,z,Q",
cS:function(a){var z,y
z=$.b
$.b=z+1
y=new S.ee([],null,null,null,null,null,"Ship group","A list of ship save names",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
return y},
J:function(){var z,y,x,w
z=this.d
y=[]
x=$.b
$.b=x+1
w=new S.i2(y,null,null,null,null,null,z,this.e,null,null,!1,!1,!1,x)
$.$get$h().i(0,x,w)
this.cQ(y)
return w}},
hZ:{"^":"ed;ch,cx,cy,a,b,c,d,e,f,r,x,y,z,Q",
cS:function(a){var z,y
z=$.b
$.b=z+1
y=new S.hY(0,0,0,"Inner point weight",null,"Outer point weight",null,null,null,null,"Fleet","Faction id and fleet spawn weight in P for the region",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
return y},
J:function(){var z,y,x,w
z=this.d
y=[]
x=$.b
$.b=x+1
w=new S.hZ(y,null,null,null,null,null,z,this.e,null,null,!1,!1,!1,x)
$.$get$h().i(0,x,w)
this.cQ(y)
return w}},
d7:{"^":"aa;ch,cx,cy,db,dx,dy,fr,fx,fy,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y,x,w,v,u
z=document
y=z.createElement("div")
this.b=y
C.c.L(y,"<div class='field' >"+this.d+"</span>")
y.title=this.e
y=z.createElement("div")
y.className="enumreadout"
y.textContent="[No block selected!]"
this.dx=y
this.b.appendChild(y)
this.dy=z.createElement("div")
this.cx=H.o(this.f.a.h(0,"scale"),"$isU").ch
this.fx=H.E([],[S.iY])
x=H.E([],[S.aM])
C.f.ar(x,$.$get$di())
C.f.ar(x,H.v6($.bb.c,"$ism",[S.bi],"$asm"))
for(z=x.length,w=0;w<x.length;x.length===z||(0,H.r)(x),++w){v=x[w]
u=S.q8(v,this.cx,J.v(v,this.ch),150)
u.e=this
this.dy.appendChild(u.c)
this.fx.push(u)}z=S.c9(this.Q,this.dy)
this.fr=z
this.b.appendChild(z.a)
return this.b},
ac:function(a,b){var z,y
if(typeof b==="string"){this.fy=b
z=S.qc()
if(z.I(b))this.ch=z.h(0,b)
else{y=H.Q(b,null,new S.n_())
if(!J.v(y,-1)){this.cy=y
this.ch=$.$get$as()}else this.ch=$.$get$bC()}}},
aD:function(a){var z,y,x,w,v,u,t,s,r
this.dl(a)
z=this.ch
y=J.t(z)
if(!!y.$isbi||y.O(z,$.$get$as())){z=this.ch
if(z instanceof S.bi){if(!J.v(z.ch,this.cy))this.ch=$.$get$as()
else if(!C.f.M($.bb.c,this.ch))this.ch=$.$get$as()}else for(z=$.bb.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.r)(z),++x){w=z[x]
if(J.v(J.dH(w),this.cy)){this.ch=w
break}}}if(this.db){z=this.f.r
y=$.au.d
z=(z==null?y==null:z===y)&&this.b!=null}else z=!1
if(z){this.db=!1
v=this.fr.d
z=this.b
u=z.parentElement;(z&&C.c).aA(z)
this.b=null
u.appendChild(this.ag())
if(v)this.fr.bC(0)}if(this.dx!=null)if(J.v(this.ch,$.$get$as()))this.dx.textContent="[Missing custom shape ID: "+H.d(this.cy)+"]"
else{z=this.ch
y=J.t(z)
t=this.dx
if(!!y.$isbi)t.textContent="[Custom shape ID: "+H.d(z.ch)+"]"
else t.textContent="["+H.d(y.gE(z))+"]"}s=H.o(this.f.a.h(0,"scale"),"$isU")
if(!(s.x===!0&&!J.v(s.ch,this.cx)))z=s.x!==!0&&!J.v(this.cx,1)
else z=!0
if(z){this.cx=s.x===!0?s.ch:1
for(z=this.fx,y=z.length,x=0;x<z.length;z.length===y||(0,H.r)(z),++x){r=z[x]
r.d=this.cx
r.a0()}}},
es:function(a){var z,y,x,w,v
for(z=this.fx,y=z.length,x=0;x<z.length;z.length===y||(0,H.r)(z),++x){w=z[x]
v=a===w
if(w.f!==v){w.f=v
w.a0()}}z=a.a
this.ch=z
if(z instanceof S.bi)this.cy=z.ch
this.a_()
this.K(this.z)},
U:function(a,b,c,d){var z,y
z=this.ch
if(z!=null){y=d?this.d+"=":""
S.a_(b,y+H.d(J.a8(z))+",",c,!0)
return!0}return!1},
aq:function(a,b,c){return this.U(a,b,c,!0)},
J:function(){return S.i1(this.d,this.e,this.ch)},
a1:function(){if(this.x===!0){if(this.ch!=null)if(J.l1(this.f.u("scale"),this.ch.gah()))return this.ch
return $.$get$as()}return $.$get$bC()},
eZ:function(a,b,c){if(this.ch==null)this.ch=$.$get$bC()},
D:{
i1:function(a,b,c){var z,y
z=$.b
$.b=z+1
y=new S.d7(c,1,0,!0,null,null,null,[],"",null,null,null,a,b,null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
y.eZ(a,b,c)
return y}}},
n_:{"^":"a:7;",
$1:function(a){return-1}},
U:{"^":"aa;N:ch*,cx,cy,db,dx,dy,a,b,c,d,e,f,r,x,y,z,Q",
ag:["dm",function(){var z,y,x
z=this.aT()
y=W.ag("number")
x=J.e(y)
x.saL(y,"1")
x.sN(y,H.d(this.ch))
x.C(y,"change",new S.mT(this),null)
z.appendChild(y)
if(this.dx!=null){y.className="shortfield"
x=document.createElement("div")
x.className="inlineblock"
x.textContent=this.dx.$1(this)
this.dy=x
z.appendChild(x)}return z}],
ac:function(a,b){if(typeof b==="number"&&Math.floor(b)===b)this.ch=b
else if(typeof b==="string")this.ch=H.Q(b,null,null)},
U:function(a,b,c,d){var z=d?this.d+"=":""
S.a_(b,z+H.d(this.ch)+",",c,!0)
return!0},
aq:function(a,b,c){return this.U(a,b,c,!0)},
J:function(){var z,y,x,w
z=this.d
y=this.ch
x=$.b
$.b=x+1
w=new S.U(y,2147483647,-2147483647,0,null,null,null,null,null,z,this.e,null,null,!1,!1,!1,x)
$.$get$h().i(0,x,w)
w.db=w.ch
w.cx=this.cx
w.cy=this.cy
w.db=this.db
return w},
a1:function(){if(this.x===!0)return this.ch
return this.db},
aD:function(a){var z=this.dx
if(z!=null&&this.dy!=null)this.dy.textContent=z.$1(this)}},
mT:{"^":"a:4;a",
$1:[function(a){var z,y
z=H.o(J.T(a),"$isaI")
if(!S.aR(z.value))z.value="0"
y=this.a
z.value=H.d(C.e.cO(J.bf(H.Z(z.value,null)),y.cy,y.cx))
y.ch=H.Q(z.value,null,null)
y.a_()
y.K(y.z)},null,null,2,0,null,0,"call"]},
b6:{"^":"U;ch,cx,cy,db,dx,dy,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y
z=this.dm()
y=z.childNodes
if(1>=y.length)return H.c(y,1)
H.o(y[1],"$isaI").min="0"
return z},
J:function(){var z,y,x,w
z=this.d
y=this.ch
x=$.b
$.b=x+1
w=new S.b6(0,2147483647,-2147483647,0,null,null,null,null,null,z,this.e,null,null,!1,!1,!1,x)
$.$get$h().i(0,x,w)
w.db=w.ch
w.ch=y
w.db=y
w.cx=this.cx
w.cy=this.cy
w.db=this.db
return w}},
d6:{"^":"U;ch,cx,cy,db,dx,dy,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y
z=this.dm()
y=z.childNodes
if(1>=y.length)return H.c(y,1)
H.o(y[1],"$isaI").min="0"
return z},
U:function(a,b,c,d){S.a_(b,H.d(this.ch)+",",c,!0)
return!0},
aq:function(a,b,c){return this.U(a,b,c,!0)},
J:function(){var z,y,x,w
z=this.d
y=this.ch
x=$.b
$.b=x+1
w=new S.d6(0,2147483647,-2147483647,0,null,null,null,null,null,z,this.e,null,null,!1,!1,!1,x)
$.$get$h().i(0,x,w)
w.db=w.ch
w.ch=y
w.db=y
w.cx=this.cx
w.cy=this.cy
w.db=this.db
w.x=this.x
return w}},
p:{"^":"aa;N:ch*,cx,cy,db,dx,dy,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y,x
z=this.aT()
y=W.ag("number")
x=J.e(y)
x.saL(y,"0.01")
x.sN(y,H.d(this.ch))
x.C(y,"change",new S.mJ(this),null)
z.appendChild(y)
if(this.dx!=null){y.className="shortfield"
x=document.createElement("div")
x.className="inlineblock"
x.textContent=this.dx.$1(this)
this.dy=x
z.appendChild(x)}return z},
ac:function(a,b){if(typeof b==="number")this.ch=H.f6(b)
else if(typeof b==="string")this.ch=H.Z(b,null)},
U:function(a,b,c,d){var z=d?this.d+"=":""
S.a_(b,z+H.d(this.ch)+",",c,!0)
return!0},
aq:function(a,b,c){return this.U(a,b,c,!0)},
J:function(){var z,y,x,w
z=this.d
y=this.ch
x=$.b
$.b=x+1
w=new S.p(y,1/0,-1/0,0,null,null,null,null,null,z,this.e,null,null,!1,!1,!1,x)
$.$get$h().i(0,x,w)
w.db=w.ch
w.cx=this.cx
w.cy=this.cy
w.db=this.db
w.dx=this.dx
return w},
a1:function(){if(this.x===!0)return this.ch
return this.db},
aD:function(a){var z=this.dx
if(z!=null&&this.dy!=null)this.dy.textContent=z.$1(this)}},
mJ:{"^":"a:4;a",
$1:[function(a){var z,y
z=H.o(J.T(a),"$isaI")
if(!S.aR(z.value))z.value="0"
y=z.value
if(!J.aE(y,"."))z.value=y+".0"
y=this.a
z.value=H.d(J.l6(H.Z(z.value,null),y.cy,y.cx))
y.ch=H.Z(z.value,null)
y.a_()
y.K(y.z)},null,null,2,0,null,0,"call"]},
i_:{"^":"aa;ch,cx,cy,db,dx,dy,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y,x,w
z=this.aT()
y=W.ag("number")
x=J.e(y)
x.saL(y,"1")
y.className="pairfield"
x.sN(y,H.d(this.ch))
y.title=this.cy
x.C(y,"change",new S.mP(this),null)
w=W.ag("number")
x=J.e(w)
x.saL(w,"1")
w.className="pairfield"
x.sN(w,H.d(this.cx))
w.title=this.dx
x.C(w,"change",new S.mQ(this),null)
z.appendChild(W.cb(this.db,null,null))
z.appendChild(y)
z.appendChild(W.cb(this.dy,null,null))
z.appendChild(w)
return z},
ac:function(a,b){var z,y
z=J.t(b)
if(!!z.$isF){if(b.I("0")===!0)this.ch=H.Q(z.h(b,"0"),null,new S.mR())
if(b.I("1")===!0)this.cx=H.Q(z.h(b,"1"),null,new S.mS())}else if(typeof b==="string"){y=H.Q(b,null,null)
this.ch=y
this.cx=y}},
U:function(a,b,c,d){S.a_(b,(d?this.d+"=":"")+"{"+H.d(this.ch)+", "+H.d(this.cx)+"},",c,!0)
return!0},
aq:function(a,b,c){return this.U(a,b,c,!0)},
J:function(){var z,y,x,w
z=this.d
y=this.ch
x=this.cx
w=$.b
$.b=w+1
z=new S.i_(y,x,this.cy,this.db,this.dx,this.dy,null,null,null,z,this.e,null,null,!1,!1,!1,w)
$.$get$h().i(0,w,z)
return z},
a1:function(){if(this.x===!0)return P.Y(["val0",this.ch,"val1",this.cx])
return P.Y(["val0",0,"val1",0])}},
mP:{"^":"a:4;a",
$1:[function(a){var z,y
z=H.o(J.T(a),"$isaI")
if(!S.aR(z.value))z.value="0"
z.value=""+J.bf(H.Z(z.value,null))
y=this.a
y.ch=H.Q(z.value,null,null)
y.a_()
y.K(y.z)},null,null,2,0,null,0,"call"]},
mQ:{"^":"a:4;a",
$1:[function(a){var z,y
z=H.o(J.T(a),"$isaI")
if(!S.aR(z.value))z.value="0"
z.value=""+J.bf(H.Z(z.value,null))
y=this.a
y.cx=H.Q(z.value,null,null)
y.a_()
y.K(y.z)},null,null,2,0,null,0,"call"]},
mR:{"^":"a:7;",
$1:function(a){return 0}},
mS:{"^":"a:7;",
$1:function(a){return 0}},
d4:{"^":"aa;ch,cx,cy,db,dx,dy,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y,x,w
z=this.aT()
y=W.ag("number")
x=J.e(y)
x.saL(y,"0.01")
y.className="pairfield"
x.sN(y,H.d(this.ch))
y.title=this.cy
x.C(y,"change",new S.mF(this),null)
w=W.ag("number")
x=J.e(w)
x.saL(w,"0.01")
w.className="pairfield"
x.sN(w,H.d(this.cx))
w.title=this.dx
x.C(w,"change",new S.mG(this),null)
x=this.db
if(x!=null)z.appendChild(W.cb(x,null,null))
z.appendChild(y)
x=this.dy
if(x!=null)z.appendChild(W.cb(x,null,null))
z.appendChild(w)
return z},
ac:function(a,b){var z,y
z=J.t(b)
if(!!z.$isF){if(b.I("0")===!0)this.ch=H.Z(z.h(b,"0"),new S.mH())
if(b.I("1")===!0)this.cx=H.Z(z.h(b,"1"),new S.mI())}else if(typeof b==="string"){y=H.Z(b,null)
this.ch=y
this.cx=y}},
U:function(a,b,c,d){S.a_(b,(d?this.d+"=":"")+"{"+H.d(this.ch)+", "+H.d(this.cx)+"},",c,!0)
return!0},
aq:function(a,b,c){return this.U(a,b,c,!0)},
J:function(){var z,y,x,w
z=this.d
y=this.ch
x=this.cx
w=$.b
$.b=w+1
z=new S.d4(y,x,this.cy,this.db,this.dx,this.dy,null,null,null,z,this.e,null,null,!1,!1,!1,w)
$.$get$h().i(0,w,z)
return z},
a1:function(){if(this.x===!0)return P.Y(["0",this.ch,"1",this.cx])
return P.Y(["0",0,"1",0])}},
mF:{"^":"a:4;a",
$1:[function(a){var z,y
z=H.o(J.T(a),"$isaI")
if(!S.aR(z.value))z.value="0"
y=z.value
if(!J.aE(y,"."))z.value=y+".0"
y=this.a
y.ch=H.Z(z.value,null)
y.a_()
y.K(y.z)},null,null,2,0,null,0,"call"]},
mG:{"^":"a:4;a",
$1:[function(a){var z,y
z=H.o(J.T(a),"$isaI")
if(!S.aR(z.value))z.value="0"
y=z.value
if(!J.aE(y,"."))z.value=y+".0"
y=this.a
y.cx=H.Z(z.value,null)
y.a_()
y.K(y.z)},null,null,2,0,null,0,"call"]},
mH:{"^":"a:7;",
$1:function(a){return 0}},
mI:{"^":"a:7;",
$1:function(a){return 0}},
d5:{"^":"d4;ch,cx,cy,db,dx,dy,a,b,c,d,e,f,r,x,y,z,Q"},
ec:{"^":"i_;ch,cx,cy,db,dx,dy,a,b,c,d,e,f,r,x,y,z,Q"},
by:{"^":"d4;ch,cx,cy,db,dx,dy,a,b,c,d,e,f,r,x,y,z,Q",
a1:function(){if(this.x===!0)return P.Y(["0",this.ch,"1",this.cx])
return P.Y(["0",1,"1",0])}},
hY:{"^":"d4;fr,ch,cx,cy,db,dx,dy,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y,x,w,v,u,t,s,r
z=document
y=z.createElement("div")
this.b=y
y.title=this.e
x=W.ag("number")
y=J.e(x)
y.saL(x,"1")
x.className="pairfield"
y.sN(x,H.d(this.fr))
x.title="Faction"
y.C(x,"change",new S.mM(this),null)
w=W.ag("number")
y=J.e(w)
y.saL(w,"0.01")
w.className="pairfield"
y.sN(w,H.d(this.ch))
v=this.cy
w.title=v
y.C(w,"change",new S.mN(this),null)
u=W.ag("number")
y=J.e(u)
y.saL(u,"0.01")
u.className="pairfield"
y.sN(u,H.d(this.cx))
t=this.dx
u.title=t
y.C(u,"change",new S.mO(this),null)
y=this.b
s=z.createElement("span")
s.textContent="#"
s.title="Faction number"
r=s.style
r.fontWeight="bold"
r=s.style
r.marginLeft="8px"
y.appendChild(s)
this.b.appendChild(x)
y=this.b
s=z.createElement("span")
s.className="glyphicon glyphicon-record"
s.title=v
y.appendChild(s)
this.b.appendChild(w)
s=this.b
z=z.createElement("span")
z.className="glyphicon glyphicon-fullscreen"
z.title=t
s.appendChild(z)
this.b.appendChild(u)
return this.b},
ac:function(a,b){var z,y,x,w,v
z=J.t(b)
if(!!z.$isF){if(b.I("ident")===!0)this.fr=H.Q(z.h(b,"ident"),null,null)
for(z=J.a7(z.ga5(b));z.m();){y=z.gq()
x=J.t(y)
if(!!x.$isF)for(x=J.a7(x.ga5(y));x.m();){w=x.gq()
v=J.t(w)
if(!!v.$isF)if(v.gk(w)===2)if(w.I("0")===!0&&w.I("1")===!0){if(J.v(v.h(w,"0"),0))this.ch=J.ai(v.h(w,"1"))
if(J.v(v.h(w,"0"),1))this.cx=J.ai(v.h(w,"1"))}}}}},
U:function(a,b,c,d){S.a_(b,(d?this.d+"=":"")+"{"+H.d(this.fr)+", { {0, "+H.d(this.ch)+"}, {1, "+H.d(this.cx)+"} }},",c,!0)
return!0},
aq:function(a,b,c){return this.U(a,b,c,!0)},
J:function(){var z,y,x,w,v
z=this.d
y=this.fr
x=this.ch
w=this.cx
v=$.b
$.b=v+1
z=new S.hY(y,x,w,"Inner point weight",null,"Outer point weight",null,null,null,null,z,this.e,null,null,!1,!1,!1,v)
$.$get$h().i(0,v,z)
return z},
a1:function(){if(this.x===!0)return P.Y(["faction",this.fr,"0",this.ch,"1",this.cx])
return P.Y(["faction",0,"0",0,"1",0])}},
mM:{"^":"a:4;a",
$1:[function(a){var z,y
z=H.o(J.T(a),"$isaI")
if(!S.aR(z.value))z.value="0"
z.value=""+J.bf(H.Z(z.value,null))
y=this.a
y.fr=H.Q(z.value,null,null)
y.a_()
y.K(y.z)},null,null,2,0,null,0,"call"]},
mN:{"^":"a:4;a",
$1:[function(a){var z,y
z=H.o(J.T(a),"$isaI")
if(!S.aR(z.value))z.value="0"
y=z.value
if(!J.aE(y,"."))z.value=y+".0"
y=this.a
y.ch=H.Z(z.value,null)
y.a_()
y.K(y.z)},null,null,2,0,null,0,"call"]},
mO:{"^":"a:4;a",
$1:[function(a){var z,y
z=H.o(J.T(a),"$isaI")
if(!S.aR(z.value))z.value="0"
y=z.value
if(!J.aE(y,"."))z.value=y+".0"
y=this.a
y.cx=H.Z(z.value,null)
y.a_()
y.K(y.z)},null,null,2,0,null,0,"call"]},
aN:{"^":"aa;N:ch*,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y,x
z=this.aT()
y=W.ag("text")
x=J.e(y)
x.sN(y,this.ch)
x.C(y,"change",new S.n1(this),null)
z.appendChild(y)
return z},
ac:function(a,b){if(typeof b==="string")this.ch=b},
U:function(a,b,c,d){S.a_(b,(d?this.d+"=":"")+'"'+H.d(this.ch)+'",',c,!0)
return!0},
aq:function(a,b,c){return this.U(a,b,c,!0)},
J:function(){var z,y,x
z=this.d
y=this.ch
x=$.b
$.b=x+1
z=new S.aN(y,null,null,null,z,this.e,null,null,!1,!1,!1,x)
$.$get$h().i(0,x,z)
return z},
a1:function(){if(this.x===!0)return this.ch
return""}},
n1:{"^":"a:4;a",
$1:[function(a){var z=this.a
z.ch=H.o(J.T(a),"$iskc").value
z.a_()
z.K(z.z)},null,null,2,0,null,0,"call"]},
i3:{"^":"aN;ch,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y
z=document.createElement("div")
this.b=z
z.title=this.e
y=W.ag("text")
y.className="compacttext"
z=J.e(y)
z.sN(y,this.ch)
z.C(y,"change",new S.n0(this),null)
this.b.appendChild(y)
return this.b},
J:function(){var z,y,x
z=this.d
y=this.ch
x=$.b
$.b=x+1
z=new S.i3(y,null,null,null,z,this.e,null,null,!1,!1,!1,x)
$.$get$h().i(0,x,z)
return z}},
n0:{"^":"a:4;a",
$1:[function(a){var z=this.a
z.ch=H.o(J.T(a),"$iskc").value
z.a_()
z.K(z.z)},null,null,2,0,null,0,"call"]},
i0:{"^":"aN;ch,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y,x,w,v
z=document
y=z.createElement("div")
this.b=y
C.c.L(y,"<div class='field' >"+this.d+"</span>")
y.title=this.e
x=this.b
w=z.createElement("textarea")
w.rows=1
w.value=J.cJ(this.ch,"\\n","\n")
C.J.C(w,"change",new S.mY(this),null)
C.J.C(w,"input",new S.mZ(),null)
v=S.fd(w.value,43)
z=w.style
y=H.d(Math.max(1,v)*15+2)+"px"
z.height=y
x.appendChild(w)
return x},
J:function(){var z,y,x
z=this.d
y=this.ch
x=$.b
$.b=x+1
z=new S.i0("",null,null,null,z,this.e,null,null,!1,!1,!1,x)
$.$get$h().i(0,x,z)
z.ch=y
return z}},
mY:{"^":"a:4;a",
$1:[function(a){var z,y,x,w
z=H.o(J.T(a),"$isdk")
y=S.fd(z.value,43)
x=z.style
x.height="auto"
x=z.style
w=H.d(Math.max(1,y)*15+2)+"px"
x.height=w
x=this.a
w=z.value
w.toString
x.ch=H.dC(w,"\n","\\n")
x.a_()
x.K(x.z)},null,null,2,0,null,0,"call"]},
mZ:{"^":"a:4;",
$1:[function(a){var z,y,x,w
z=H.o(J.T(a),"$isdk")
y=S.fd(z.value,43)
x=z.style
x.height="auto"
x=z.style
w=H.d(Math.max(1,y)*15+2)+"px"
x.height=w},null,null,2,0,null,0,"call"]},
a4:{"^":"aa;am:ch@,ai:cx@,ak:cy@,db,dx,dy,fr,fx,fy,go,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y,x,w,v,u,t,s,r
z=this.aT()
y="colour_"+this.Q
x=W.ag("text")
x.id=y
document.querySelector("#haxbox").appendChild(x)
w=J.a0($.$get$f5(),"$").dO(["#"+y])
v=this.dx
u=this.c_(v)
t=v?"hex8":"hex"
s=v?"rwdk_alpha":"rwdk"
v=P.Y(["color",u,"preferredFormat",t,"showInput",!0,"showPalette",!0,"palette",new P.ij([],[null]),"localStorageKey",s,"showAlpha",v,"showButtons",!1,"maxSelectionSize",16])
w.bY("spectrum",[P.f3(P.nH(v))])
r=H.o(J.a0(w.bY("spectrum",["replacer"]),0),"$isdW")
w.bY("on",["change",new S.mE(this)])
J.dL(x)
z.appendChild(x);(r&&C.c).aA(r)
z.appendChild(r)
return z},
ay:function(){var z="colour_"+this.Q
J.a0($.$get$f5(),"$").dO(["#"+z]).bY("spectrum",["destroy"])
this.co()},
ac:function(a,b){if(typeof b==="string")this.dY(b,!0)},
dV:function(a){if(a)return(this.cy|this.cx<<8|this.ch<<16|this.db<<24)>>>0
return(this.cy|this.cx<<8|this.ch<<16)>>>0},
fO:function(){return this.dV(!1)},
dW:function(a){if(a)return C.h.ee(C.e.el(this.dV(!0),16),8,"0")
return C.h.ee(C.e.el(this.fO(),16),6,"0")},
fP:function(){return this.dW(!1)},
c_:function(a){if(a)return"rgba("+this.ch+","+this.cx+","+this.cy+","+H.d(this.db/255)+")"
return"#"+this.fP()},
bZ:function(){return this.c_(!1)},
dY:function(a,b){var z,y,x
z=0
if(J.cL(a,"#"))a="0x"+J.cM(a,1)
if(J.cL(a,"0x"))z=H.Q(a,null,null)
else try{y=this.fx
C.C.scP(y,"")
C.C.shZ(y,"")
z=H.Q(a,16,null)}catch(x){H.ah(x)
try{z=H.Q(a,null,null)}catch(x){H.ah(x)
z=2155905152}}if(J.aL(a)===6){if(b)this.db=255}else this.db=J.dD(z,24)&255
this.ch=J.dD(z,16)&255
this.cx=J.dD(z,8)&255
this.cy=J.l0(z,255)},
fY:function(a){return this.dY(a,!1)},
U:function(a,b,c,d){S.a_(b,(d?this.d+"=":"")+"0x"+this.dW(this.dx)+",",c,!0)
return!0},
aq:function(a,b,c){return this.U(a,b,c,!0)},
J:function(){var z,y,x
z=this.d
y=$.b
$.b=y+1
x=new S.a4(127,127,127,255,this.dx,null,null,null,null,null,null,null,null,z,this.e,null,null,!1,!1,!1,y)
$.$get$h().i(0,y,x)
x.ch=this.ch
x.cx=this.cx
x.cy=this.cy
x.db=this.db
return x},
a1:function(){if(this.x===!0)return P.Y(["r",this.ch,"g",this.cx,"b",this.cy,"a",this.db])
return}},
mE:{"^":"a:1;a",
$2:[function(a,b){var z=this.a
z.fY(J.aF(b))
z.a_()
z.K(z.z)},null,null,4,0,null,30,31,"call"]},
b5:{"^":"aa;ch,cx,cy,db,dx,a,b,c,d,e,f,r,x,y,z,Q",
ag:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=this.aT()
if(this.ch){y=document.createElement("select")
z.appendChild(y)
w=this.cx
v=w.gH()
v=v.gB(v)
while(!0){if(!v.m()){x=null
break}u=v.gq()
if(w.h(0,u)===!0){x=u
break}}if(x==null){v=w.gH()
x=v.gaa(v)
w.i(0,x,!0)}for(w=w.gH(),w=w.gB(w);w.m();){u=w.gq()
t=W.oU("","",null,!1)
t.value=J.a8(u)
t.textContent=u.gdZ()
t.title=u.gbw()
y.appendChild(t)}y.value=J.a8(x)
C.Y.C(y,"change",new S.mK(this,y),null)}else{w=document
s=w.createElement("div")
r=w.createElement("table")
s.appendChild(r)
for(v=this.cx,q=v.gH(),q=q.gB(q),p=this.Q;q.m();){u=q.gq()
o=w.createElement("tr")
n=w.createElement("td")
o.appendChild(n)
m=W.ag("checkbox")
m.setAttribute("fieldid",""+p)
l=J.e(m)
l.sb7(m,v.h(0,u))
k=J.e(u)
m.id="enum_"+p+"_"+H.d(k.gE(u))
l.C(m,"change",new S.mL(this,u),null)
n.appendChild(m)
j=w.createElement("td")
i=w.createElement("label")
i.className="enum"
i.textContent=u.gdZ()
i.title=u.gbw()
i.htmlFor="enum_"+p+"_"+H.d(k.gE(u))
j.appendChild(i)
o.appendChild(j)
r.appendChild(o)}w=w.createElement("div")
this.db=w
w.className="enumreadout"
z.appendChild(w)
p=S.c9(p,s)
this.dx=p
z.appendChild(p.a)}return z},
ay:function(){if(this.db!=null)this.db=null
this.co()},
aD:function(a){var z,y,x,w,v,u
if(!this.ch&&this.db!=null){for(z=this.cx,y=z.gH(),y=y.gB(y),x="[",w=!0,v=!1;y.m();){u=y.gq()
if(z.h(0,u)===!0){if(w)w=!1
else x+="|<wbr>"
x+="<span title='"+u.gbw()+"'>"+H.d(J.a8(u))+"</span>"
v=!0}}x+="]"
z=this.db;(z&&C.c).L(z,x)
if(!v){J.dM(this.c,!1)
this.x=!1}}},
ac:function(a,b){var z,y,x,w,v,u
if(typeof b!=="string")return
z=b.split("|")
for(y=z.length,x=this.cy,w=this.cx,v=0;v<z.length;z.length===y||(0,H.r)(z),++v){u=z[v]
if(x.I(u))w.i(0,x.h(0,u),!0)}},
U:function(a,b,c,d){var z,y,x,w,v,u
for(z=this.cx,y=z.gH(),y=y.gB(y),x="",w=!0,v=!1;y.m();){u=y.gq()
if(z.h(0,u)===!0){if(w)w=!1
else x+="|"
x=C.h.n(x,J.a8(u))
v=!0}}if(v){S.a_(b,(d?this.d+"=":"")+x+",",c,!0)
return!0}return!1},
aq:function(a,b,c){return this.U(a,b,c,!0)},
J:function(){var z,y,x,w,v,u
z=H.E([],[S.ao])
for(y=this.cx,x=y.gH(),x=x.gB(x);x.m();)z.push(x.gq())
w=S.aY(this.d,this.e,z,!1)
w.ch=this.ch
for(x=y.gH(),x=x.gB(x),v=w.cx;x.m();){u=x.gq()
v.i(0,u,y.h(0,u))}return w},
a1:function(){var z,y,x,w
if(this.x===!0)if(this.ch)for(z=this.cx,y=z.gH(),y=y.gB(y);y.m();){x=y.gq()
if(z.h(0,x)===!0)return x}else{w=[]
for(z=this.cx,y=z.gH(),y=y.gB(y);y.m();){x=y.gq()
if(z.h(0,x)===!0)w.push(x)}return w}return},
cq:function(a,b,c,d){var z,y,x,w,v
for(z=c.length,y=this.cx,x=this.cy,w=0;w<c.length;c.length===z||(0,H.r)(c),++w){v=c[w]
y.i(0,v,!1)
x.i(0,J.a8(v),v)}},
D:{
aY:function(a,b,c,d){var z,y
z=S.ao
y=$.b
$.b=y+1
z=new S.b5(d,new H.P(0,null,null,null,null,null,0,[z,P.bH]),new H.P(0,null,null,null,null,null,0,[P.y,z]),null,null,null,null,null,a,b,null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
z.cq(a,b,c,d)
return z}}},
mK:{"^":"a:4;a,b",
$1:[function(a){var z,y,x
for(z=this.a,y=z.cx,x=y.gH(),x=x.gB(x);x.m();)y.i(0,x.gq(),!1)
y.i(0,z.cy.h(0,this.b.value),!0)
z.a_()},null,null,2,0,null,0,"call"]},
mL:{"^":"a:4;a,b",
$1:[function(a){var z=this.a
z.cx.i(0,this.b,H.o(J.T(a),"$isfB").checked)
z.a_()
z.K(z.z)},null,null,2,0,null,0,"call"]},
hX:{"^":"b5;ch,cx,cy,db,dx,a,b,c,d,e,f,r,x,y,z,Q",
aD:function(a){var z,y,x,w,v,u
if(!this.ch&&this.db!=null){for(z=this.cx,y=z.gH(),y=y.gB(y),x="{ ",w=!0,v=!1;y.m();){u=y.gq()
if(z.h(0,u)===!0){if(w)w=!1
else x+=", "
x+="<span title='"+u.gbw()+"'>"+H.d(J.a8(u))+"</span>"
v=!0}}x+=" }"
z=this.db;(z&&C.c).L(z,x)
if(!v){J.dM(this.c,!1)
this.x=!1}}},
ac:function(a,b){var z,y,x,w
z=J.t(b)
if(!z.$isF)return
for(z=J.a7(z.ga5(b)),y=this.cy,x=this.cx;z.m();){w=J.aF(z.gq())
if(y.I(w))x.i(0,y.h(0,w),!0)}},
U:function(a,b,c,d){var z,y,x,w,v,u
for(z=this.cx,y=z.gH(),y=y.gB(y),x="",w=!0,v=!1;y.m();){u=y.gq()
if(z.h(0,u)===!0){if(w)w=!1
else x+=","
x=C.h.n(x,J.a8(u))
v=!0}}if(v){S.a_(b,(d?this.d+"=":"")+"{ "+x+" },",c,!0)
return!0}return!1},
aq:function(a,b,c){return this.U(a,b,c,!0)},
J:function(){var z,y,x,w,v,u,t,s,r
z=S.ao
y=H.E([],[z])
for(x=this.cx,w=x.gH(),w=w.gB(w);w.m();)y.push(w.gq())
w=this.d
v=this.e
u=new H.P(0,null,null,null,null,null,0,[z,P.bH])
t=$.b
$.b=t+1
s=new S.hX(!1,u,new H.P(0,null,null,null,null,null,0,[P.y,z]),null,null,null,null,null,w,v,null,null,!1,!1,!1,t)
$.$get$h().i(0,t,s)
s.cq(w,v,y,!1)
s.ch=this.ch
for(z=x.gH(),z=z.gB(z);z.m();){r=z.gq()
u.i(0,r,x.h(0,r))}return s}},
ux:{"^":"a:0;",
$1:function(a){var z,y
z=S.dU(null)
$.au.S(0,z)
H.o(z.a.a.h(0,"ident"),"$isU").ch=S.fF()
y=z.a
y.K(y.x)}},
uy:{"^":"a:0;",
$1:function(a){var z,y
z=document.querySelector("#blockloadinput")
y=z.style
y.visibility="visible"
y=J.e(z)
y.bn(z)
y.bk(z)
z=z.style
z.visibility="hidden"}},
uz:{"^":"a:0;",
$1:function(a){S.iW($.au,"blocks")}},
uK:{"^":"a:0;",
$1:function(a){var z,y
z=document
y=z.querySelector("#alertbackground").style
y.display="block"
z=z.querySelector("#idreorderbox").style
z.display="block"}},
uV:{"^":"a:0;",
$1:function(a){var z,y
S.u9()
z=document
y=z.querySelector("#alertbackground").style
y.display="none"
z=z.querySelector("#idreorderbox").style
z.display="none"}},
uW:{"^":"a:0;",
$1:function(a){var z,y
z=document
y=z.querySelector("#alertbackground").style
y.display="none"
z=z.querySelector("#idreorderbox").style
z.display="none"}},
uX:{"^":"a:0;",
$1:function(a){S.cF("Clear block palette","Are you sure you want to delete all blocks in the palette? This cannot be undone.","Delete","Cancel",new S.uv())}},
uv:{"^":"a:5;",
$0:function(){$.au.aB(0)}},
uY:{"^":"a:4;",
$1:[function(a){var z,y,x
z=H.o(J.T(a),"$iscm")
y=z.files
if(0>=y.length)return H.c(y,0)
x=y[0]
S.oW(x)
z.value=""},null,null,2,0,null,0,"call"]},
uZ:{"^":"a:0;",
$1:function(a){var z,y
z=S.dV(0,!1)
z.b=1
z.dx[0]=[]
y=z.d
if(0>=y.length)return H.c(y,0)
y[0]=[]
z.p()
$.bb.S(0,z)
z.a0()}},
v_:{"^":"a:0;",
$1:function(a){var z,y
z=document.querySelector("#shapeloadinput")
y=z.style
y.visibility="visible"
y=J.e(z)
y.bn(z)
y.bk(z)
z=z.style
z.visibility="hidden"}},
v0:{"^":"a:0;",
$1:function(a){}},
uA:{"^":"a:0;",
$1:function(a){S.cF("Clear shape palette","Are you sure you want to delete all shapes in the palette? This cannot be undone.","Delete","Cancel",new S.uu())}},
uu:{"^":"a:5;",
$0:function(){$.bb.aB(0)}},
uB:{"^":"a:4;",
$1:[function(a){var z,y,x
z=H.o(J.T(a),"$iscm")
y=z.files
if(0>=y.length)return H.c(y,0)
x=y[0]
S.p9(x)
z.value=""},null,null,2,0,null,0,"call"]},
uC:{"^":"a:0;",
$1:function(a){var z,y
z=S.eb(null)
$.bc.S(0,z)
y=z.a
y.K(y.x)}},
uD:{"^":"a:0;",
$1:function(a){var z,y
z=document.querySelector("#factionloadinput")
y=z.style
y.visibility="visible"
y=J.e(z)
y.bn(z)
y.bk(z)
z=z.style
z.visibility="hidden"}},
uE:{"^":"a:0;",
$1:function(a){S.iW($.bc,"factions")}},
uF:{"^":"a:0;",
$1:function(a){S.cF("Clear faction palette","Are you sure you want to delete all factions in the palette? This cannot be undone.","Delete","Cancel",new S.ut())}},
ut:{"^":"a:5;",
$0:function(){$.bc.aB(0)}},
uG:{"^":"a:4;",
$1:[function(a){var z,y,x
z=H.o(J.T(a),"$iscm")
y=z.files
if(0>=y.length)return H.c(y,0)
x=y[0]
S.p_(x)
z.value=""},null,null,2,0,null,0,"call"]},
uH:{"^":"a:0;",
$1:function(a){var z,y
z=S.eE(null)
$.aS.S(0,z)
y=z.a
y.K(y.x)}},
uI:{"^":"a:0;",
$1:function(a){var z,y
z=document.querySelector("#regionloadinput")
y=z.style
y.visibility="visible"
y=J.e(z)
y.bn(z)
y.bk(z)
z=z.style
z.visibility="hidden"}},
uJ:{"^":"a:0;",
$1:function(a){S.q2()}},
uL:{"^":"a:0;",
$1:function(a){S.cF("Clear region list","Are you sure you want to delete all regions in the list? This cannot be undone.","Delete","Cancel",new S.us())}},
us:{"^":"a:5;",
$0:function(){$.aS.aB(0)}},
uM:{"^":"a:4;",
$1:[function(a){var z,y,x
z=H.o(J.T(a),"$iscm")
y=z.files
if(0>=y.length)return H.c(y,0)
x=y[0]
S.p4(x)
z.value=""},null,null,2,0,null,0,"call"]},
uN:{"^":"a:0;",
$1:function(a){var z,y
z=document.querySelector("#shiploadinput")
y=z.style
y.visibility="visible"
y=J.e(z)
y.bn(z)
y.bk(z)
z=z.style
z.visibility="hidden"}},
uO:{"^":"a:0;",
$1:function(a){S.cF("Clear ship list","Are you sure you want to clear all ships in the list? Any unsaved id changes will be lost.","Clear","Cancel",new S.ur())}},
ur:{"^":"a:5;",
$0:function(){S.qi()}},
uP:{"^":"a:0;",
$1:function(a){S.qp()}},
uQ:{"^":"a:4;",
$1:[function(a){var z,y,x,w
z=H.o(J.T(a),"$iscm")
for(y=z.files,x=y.length,w=0;w<y.length;y.length===x||(0,H.r)(y),++w)S.pd(y[w])
z.value=""},null,null,2,0,null,0,"call"]},
uR:{"^":"a:0;",
$1:function(a){var z,y
z=document
y=z.querySelector("#alertbox").style
y.display="none"
y=z.querySelector("#alertbackground").style
y.display="none"
z.querySelector("#alerttext").textContent=""
z.querySelector("#alerttitle").textContent=""}},
uS:{"^":"a:0;",
$1:function(a){var z,y
z=document
y=z.querySelector("#confirmbox").style
y.display="none"
y=z.querySelector("#alertbackground").style
y.display="none"
z.querySelector("#confirmtext").textContent=""
z.querySelector("#confirmtitle").textContent=""
if($.dr!=null){z=z.querySelector("#confirmbuttonyes")
y=$.dr
z.toString
if(y!=null)J.fi(z,"click",y,null)}}},
uT:{"^":"a:16;",
$1:function(a){var z=$.au.d
if(z!=null)H.o(H.o(z,"$isfE").a.a.h(0,"shape"),"$isd7").db=!0
$.au.d8()}},
uU:{"^":"a:16;",
$1:function(a){$.aS.d8()
S.k3()}},
b8:{"^":"i;a6:a<,b,c,d,aO:e<,f,aw:r*,x,y",
at:function(a){var z,y,x,w,v,u,t
z=document
y=z.createElement("div")
this.e=y
y.className="ui"
x=z.createElement("table")
this.e.appendChild(x)
for(y=this.a,y=y.ga5(y),y=y.gB(y),w=this.b,v=this.c;y.m();){u=y.gq()
x.appendChild(J.l7(u))
if(w.M(0,u)){t=z.createElement("tr")
t.className="break"
C.I.L(t,"<td colspan='2'><div class='break'></div></td>")
x.appendChild(t)
v.push(t)}}return this.e},
ay:function(){if(this.e==null)return
for(var z=this.a,z=z.ga5(z),z=z.gB(z);z.m();)z.gq().ay()
z=this.e;(z&&C.c).aA(z)
this.e=null},
G:function(a,b){var z
if(a==null)return
z=J.e(a)
this.a.i(0,z.gE(a),a)
z.saw(a,this)
if(b!=null)a.sdh(b)
this.y=a},
l:function(a){return this.G(a,null)},
V:function(){var z=this.y
if(z==null)return
if(this.a.fQ(z))this.b.S(0,this.y)},
K:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.x
if(z!==a)return
this.x=!z
this.aD(a)
for(z=this.a,z=z.ga5(z),z=z.gB(z);z.m();)z.gq().K(a)
if(this.e!=null)for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.r)(z),++x){w=z[x]
v=this.e.children
if(0>=v.length)return H.c(v,0)
u=v[0]
v=J.e(u)
t=J.fp(v.gb8(u),w)
if(t!==0){r=t-1
while(!0){if(!(r>=0)){s=0
break}q=J.a0(v.gb8(u),r)
p=J.e(q)
if(J.aE(p.gcP(q),"break")){s=0
break}else if(p.gdk(q).display!=="none"){s=1
break}--r}}else s=0
if(t!==J.aL(v.gb8(u))-1){r=t+1
while(!0){if(!(r<J.aL(v.gb8(u)))){o=!1
break}q=J.a0(v.gb8(u),r)
p=J.e(q)
if(J.aE(p.gcP(q),"break")){o=!0
break}else if(p.gdk(q).display!=="none"){n=s+1
s=n
o=!1
break}++r}}else o=!1
v=s>0&&!o
p=w.style
if(v)p.display=""
else p.display="none"}z=this.f
if(z!=null)z.K(a)
z=this.r
if(z!=null)z.d7()},
aD:function(a){},
a0:function(){this.K(this.x)},
aF:function(){this.ay()
for(var z=this.a,z=z.ga5(z),z=z.gB(z);z.m();)z.gq().aF()},
ac:function(a,b){J.c3(b,new S.oP(this,b))
this.K(this.x)},
bq:function(a,b,c,d){var z,y,x,w,v,u,t
S.a_(b,"{",d?c:0,!0)
for(z=this.a,z=z.ga5(z),z=z.gB(z),y=c+1;z.m();){x=z.gq()
w=J.e(x)
if(w.gb0(x)===!0&&x.aE()===!0)w.aq(x,b,y)}z=this.d
if(z.ghu(z)){v="-- "+$.es+"={"
for(w=z.gH(),w=w.gB(w);w.m();){u=w.gq()
t=z.h(0,u)
H.fc(H.d(t)+", "+H.d(J.le(t)))
v+=H.d(u)+"="
v=typeof t==="string"?v+('"'+t+'",'):v+(H.d(t)+",")}S.a_(b,v+"},",y,!0)}S.a_(b,"},",c,!0)},
aR:function(a,b,c){return this.bq(a,b,c,!0)},
J:function(){var z,y
z=S.aa
y=new S.b8(new H.P(0,null,null,null,null,null,0,[P.y,z]),P.V(null,null,null,z),H.E([],[W.N]),P.an(),null,null,null,!1,null)
this.c1(y)
y.K(y.x)
return y},
c1:function(a){var z,y,x,w,v
for(z=this.a,y=z.gH(),y=y.gB(y),x=this.b;y.m();){w=z.h(0,y.gq())
v=w.J()
v.sc3(w.gc3())
J.cK(v,J.b3(w))
if(v!=null){a.G(v,w.gdh())
if(x.M(0,w))a.V()}}},
u:function(a){var z=this.a
if(z.I(a))return z.h(0,a).a1()
return},
aV:function(a){var z=this.u(a)
if(typeof z==="number")return z
return 0}},
oP:{"^":"a:11;a,b",
$2:function(a,b){var z,y,x,w,v
if($.$get$ex().I(a))a=$.$get$ex().h(0,a)
z=this.a
y=z.a
if(y.I(a)){J.cK(y.h(0,a),!0)
J.lg(y.h(0,a),b)}else if(J.v(a,$.es)&&!!J.t(J.a0(this.b,a)).$isF)for(y=this.b,x=J.L(y),w=J.a7(x.h(y,a).gH()),z=z.d;w.m();){v=w.gq()
z.i(0,v,J.a0(x.h(y,a),v))}}},
nS:{"^":"b8;fJ:z<,fX:Q<,ho:ch<,a,b,c,d,e,f,r,x,y",
dR:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=$.$get$cf()
y=S.w(this,"features",z)
x=this.u("durability")
w=this.u("shape")
v=J.t(w)
if(v.O(w,$.$get$as())){this.z=0
this.Q=0
this.ch=!1
return}u=Math.min(w.gah(),H.A(this.u("scale")))
v=v.gcM(w)
t=u-1
if(t>>>0!==t||t>=v.length)return H.c(v,t)
s=J.q(v[t],100)
v=J.M(x)
r=v.ao(x,4)?0+v.aI(x,10)*Math.max(100,H.A(s)):0+J.aT(v.X(x,1000),Math.max(100,H.A(s)))
if(S.w(this,"features",$.$get$e4()))r+=1e6
if(S.w(this,"features",$.$get$bO())){q=this.u("cannon")
if(S.w(this,"features",$.$get$bP())){v=this.u("chargeMaxTime")
if(typeof v!=="number")return H.C(v)
p=1/v}else p=q.u("roundsPerSec")
v=Math.min(400,H.A(q.u("damage")))
if(typeof p!=="number")return H.C(p)
t=Math.min(3000,H.A(q.u("range")))
o=H.f6(q.u("muzzleVel"))
if(typeof o!=="number")return o.aI()
o=C.d.cO(o/1400,0.5,2)
n=q.u("explosive")!=null?2*Math.max(1,q.aV("explodeRadius")/10):1
m=S.w(this,"features",$.$get$bx())?1:0.5
r+=15*v*p*(t/1200)*o*n*m}if(S.w(this,"features",$.$get$bR())){l=this.u("laser")
k=l.u("range")
j=Math.min(1500,H.A(k))/1000
if(J.b2(k,500))j/=3
v=H.f6(l.u("pulsesPerSec"))
if(typeof v!=="number")return v.ao()
if(v>0){v=l.u("pulseAvailability")
if(typeof v!=="number")return H.C(v)
j*=v}if(S.w(this,"features",$.$get$bx()))j*=3
if(S.w(this,"features",$.$get$bP()))j*=2
v=l.aV("damage")
t=l.u("immobilizeForce")
o=l.u("linearForce")
r+=j*Math.max(15*Math.abs(v),3*Math.sqrt(Math.max(H.A(t),H.A(o))))}if(S.w(this,"features",$.$get$cV())){i=this.u("cannonBoost")
v=H.o(i.u("damage"),"$isF").h(0,"1")
if(typeof v!=="number")return H.C(v)
t=H.o(i.u("roundsPerSec"),"$isF").h(0,"0")
if(typeof t!=="number")return H.C(t)
r=r+7.5*v+300*t+15*J.aT(H.o(i.u("range"),"$isF").h(0,"1"),100)*J.aT(H.o(i.u("muzzleVel"),"$isF").h(0,"1"),100)}if(S.w(this,"features",$.$get$cg()))r+=this.aV("explodeDamage")*Math.max(1,this.aV("explodeRadius")/10)
if(S.w(this,"features",$.$get$cX())){v=this.u("meleeDamage")
if(typeof v!=="number")return H.C(v)
r+=40*v}if(S.w(this,"features",$.$get$ay())){h=this.u("replicateBlock")
if(h==null){this.z=0
this.ch=!1
return}h.dR()
g=h.gfX()
g=S.w(h,"features",z)?g*1.5:g*0.5
z=this.u("replicateTime")
if(typeof z!=="number")return H.C(z)
r+=15*g/z}if(S.w(this,"features",$.$get$ci())){f=this.u("shield")
z=f.u("regen")
if(typeof z!=="number")return H.C(z)
v=f.u("strength")
if(typeof v!=="number")return H.C(v)
r+=(15*z+v)*(f.aV("radius")/50)}if(S.w(this,"features",$.$get$bl()))r+=2.5*Math.sqrt(this.aV("thrusterForce")*(Math.max(1,this.aV("thrusterBoost"))/2))
if(S.w(this,"features",$.$get$bQ()))if(!y){z=this.u("generatorCapacityPerSec")
if(typeof z!=="number")return H.C(z)
r+=30*z}if(S.w(this,"features",$.$get$cW()))r+=1e4
if(S.w(this,"features",$.$get$ch()))r+=this.aV("photosynthPerSec")*1000
if(J.v(this.u("lifetime"),-1)){if(y)r+=500
if(S.w(this,"features",$.$get$cj()))r+=500
S.w(this,"features",$.$get$e1())
S.w(this,"features",$.$get$bS())
S.w(this,"features",$.$get$cU())}this.Q=r
this.z=C.d.cb(r/100)
this.ch=!0},
aD:function(a){this.dR()},
J:function(){var z=S.bo(!1)
this.c1(z)
z.K(z.x)
return z},
f1:function(a){var z,y,x,w,v,u
z=$.b
$.b=z+1
y=new S.d6(0,2147483647,-2147483647,0,null,null,null,null,null,"ident","Block ID. Must be unique. Subject to relocation.",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
y.db=y.ch
y.ch=0
y.db=0
y.df(!a)
this.l(y)
y=$.b
$.b=y+1
z=new S.U(0,2147483647,-2147483647,0,null,null,null,null,null,"extends","Warning: in the M-RWDK, this does not affect rendering. Block ID of the block that this block will copy the features of. Anything that is redefined in this block will be different. If this block uses a different shape or scale to the block it extends, make sure firts block's durability is not 1, as health will not be recalculated.",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
z.db=z.ch
this.l(z)
z=$.b
$.b=z+1
y=new S.U(0,2147483647,-2147483647,0,null,null,null,null,null,"sort","Decides how blocks are sorted in the database and when they are unlocked. Unneeded for scales that do not show up in the database.",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
y.db=y.ch
this.l(y)
y=$.b
$.b=y+1
z=new S.U(0,2147483647,-2147483647,0,null,null,null,null,null,"group","Faction ID of the faction this block belongs to.",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
z.db=z.ch
this.l(z)
this.l(S.aY("features","Block features.",$.$get$cZ(),!1))
this.V()
z=$.b
$.b=z+1
y=new S.aN("",null,null,null,"name","Block name, displayed in-game.",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
this.l(y)
y=$.b
$.b=y+1
z=new S.i0("",null,null,null,"blurb","Block description, displayed in-game.",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
z.ch=""
this.l(z)
this.V()
this.l(S.i1("shape","The shape which the block will take in-game. Some shapes cannot use certain scales.",null))
z=$.b
$.b=z+1
y=new S.b6(0,2147483647,-2147483647,0,null,null,null,null,null,"scale","Block scale.",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
y.db=y.ch
y.ch=1
y.db=1
y.cy=1
y.cx=20
this.l(y)
y=$.b
$.b=y+1
z=new S.a4(127,127,127,255,!1,null,null,null,null,null,null,null,null,"fillColor","Primary block fill colour.",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
this.l(z)
z=$.b
$.b=z+1
y=new S.a4(127,127,127,255,!1,null,null,null,null,null,null,null,null,"fillColor1","Secondary block fill colour. Block colour cycles between fillColor and this. If left unspecified, defaults to the primary colour.",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
this.l(y)
y=$.b
$.b=y+1
z=new S.a4(127,127,127,255,!1,null,null,null,null,null,null,null,null,"lineColor","Block outline colour.",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
this.l(z)
this.V()
z=S.aa
y=[P.y,z]
x=[W.N]
w=new S.oH(new H.P(0,null,null,null,null,null,0,y),P.V(null,null,null,z),H.E([],x),P.an(),null,null,null,!1,null)
w.l(S.aY("flags","Command behaviour flags.",$.$get$cd(),!1))
v=$.b
$.b=v+1
u=new S.U(0,2147483647,-2147483647,0,null,null,null,null,null,"faction","Faction ID which this core will be assigned to when created.",null,null,!1,!1,!1,v)
$.$get$h().i(0,v,u)
u.db=u.ch
w.l(u)
u=$.b
$.b=u+1
v=new S.aN("",null,null,null,"blueprint","When specified, this type of core will only build into this blueprint. Filename minus extension (20_test.lua -> 20_test).",null,null,!1,!1,!1,u)
$.$get$h().i(0,u,v)
w.l(v)
w=S.bT("command","Command properties.",w)
w.aW()
this.G(w,new S.nT())
this.V()
w=$.b
$.b=w+1
v=new S.U(0,2147483647,-2147483647,0,new S.nU(),null,null,null,null,"points","Points value (P cost) of the block. Will be calculated by the game if set to 0 or not specified. The estimate is not 100% accurate, but close enough in nearly all cases.",null,null,!1,!1,!1,w)
$.$get$h().i(0,w,v)
v.db=v.ch
this.l(v)
v=$.b
$.b=v+1
w=new S.p(1,1/0,-1/0,0,new S.nV(),null,null,null,null,"durability","Health = durability * block area.",null,null,!1,!1,!1,v)
$.$get$h().i(0,v,w)
w.db=w.ch
this.l(w)
w=$.b
$.b=w+1
v=new S.p(0.1,1/0,-1/0,0,new S.o5(),null,null,null,null,"density","Mass = density * block area.",null,null,!1,!1,!1,w)
$.$get$h().i(0,w,v)
v.db=v.ch
this.l(v)
v=$.b
$.b=v+1
w=new S.p(3.3,1/0,-1/0,0,new S.og(),null,null,null,null,"growRate","Block regrowth rate. Higher = faster.",null,null,!1,!1,!1,v)
$.$get$h().i(0,v,w)
w.db=w.ch
this.l(w)
w=$.b
$.b=w+1
v=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"armor","Reduces incoming damage from non-explosive projectile weapons by the amount specified. Totally ineffective against any other damage source, making it useless against most weapons in the game. Use is not recommended as it leads to confusing and inconsistent behaviour. Included only for completeness.",null,null,!1,!1,!1,w)
$.$get$h().i(0,w,v)
v.db=v.ch
this.l(v)
v=$.b
$.b=v+1
w=new S.p(5,1/0,-1/0,0,null,null,null,null,null,"meleeDamage","Melee damage multiplier for melee blocks.",null,null,!1,!1,!1,v)
$.$get$h().i(0,v,w)
w.db=w.ch
this.G(w,new S.or())
w=$.b
$.b=w+1
v=new S.p(-1,1/0,-1/0,0,null,null,null,null,null,"lifetime","Time before the block deconstructs. -1 is infinite.",null,null,!1,!1,!1,w)
$.$get$h().i(0,w,v)
v.db=v.ch
this.l(v)
this.G(S.aY("bindingId","Weapon button binding. Only required if you wish to override the default binding behaviour.",$.$get$e_(),!0),new S.oy())
this.V()
v=$.b
$.b=v+1
w=new S.p(60,1/0,-1/0,0,null,null,null,null,null,"seedLifetime","Time before this seed expires when rooted. Checked instead of lifetime once the seed takes root.",null,null,!1,!1,!1,v)
$.$get$h().i(0,v,w)
w.db=w.ch
this.G(w,new S.oz())
w=$.b
$.b=w+1
v=new S.p(100,1/0,-1/0,0,null,null,null,null,null,"launchSpeed","",null,null,!1,!1,!1,w)
$.$get$h().i(0,w,v)
v.db=v.ch
this.G(v,new S.oA())
v=$.b
$.b=v+1
w=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"launchCapacity","",null,null,!1,!1,!1,v)
$.$get$h().i(0,v,w)
w.db=w.ch
this.G(w,new S.oB())
w=$.b
$.b=w+1
v=new S.p(-1,1/0,-1/0,0,null,null,null,null,null,"launchLifetime","",null,null,!1,!1,!1,w)
$.$get$h().i(0,w,v)
v.db=v.ch
this.G(v,new S.oC())
v=$.b
$.b=v+1
w=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"launchResources","",null,null,!1,!1,!1,v)
$.$get$h().i(0,v,w)
w.db=w.ch
this.G(w,new S.nW())
this.V()
w=$.b
$.b=w+1
v=new S.p(30,1/0,-1/0,0,null,null,null,null,null,"activatePower","Power per second needed to activate this block.",null,null,!1,!1,!1,w)
$.$get$h().i(0,w,v)
v.db=v.ch
this.G(v,new S.nX())
this.V()
w=new S.oO(new H.P(0,null,null,null,null,null,0,y),P.V(null,null,null,z),H.E([],x),P.an(),null,null,null,!1,null)
v=$.b
$.b=v+1
u=new S.p(100,1/0,-1/0,0,null,null,null,null,null,"strength","Shield health.",null,null,!1,!1,!1,v)
$.$get$h().i(0,v,u)
u.db=u.ch
w.l(u)
u=$.b
$.b=u+1
v=new S.p(20,1/0,-1/0,0,null,null,null,null,null,"regen","Health regenerated per second. Also power per second needed to regenerate.",null,null,!1,!1,!1,u)
$.$get$h().i(0,u,v)
v.db=v.ch
w.l(v)
v=$.b
$.b=v+1
u=new S.p(40,1/0,-1/0,0,null,null,null,null,null,"radius","Shield size.",null,null,!1,!1,!1,v)
$.$get$h().i(0,v,u)
u.db=u.ch
w.l(u)
u=$.b
$.b=u+1
v=new S.p(3,1/0,-1/0,0,null,null,null,null,null,"delay","Delay in seconds after collapse before a shield begins to regenerate.",null,null,!1,!1,!1,u)
$.$get$h().i(0,u,v)
v.db=v.ch
w.l(v)
v=$.b
$.b=v+1
u=new S.p(1,1/0,-1/0,0,null,null,null,null,null,"power","Power used per unit of health regenerated.",null,null,!1,!1,!1,v)
$.$get$h().i(0,v,u)
u.db=u.ch
w.l(u)
u=$.b
$.b=u+1
v=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"armor","Reduces incoming damage from non-explosive projectile weapons by the amount specified. Totally ineffective against any other damage source, making it useless against most weapons in the game. Use is not recommended as it leads to confusing and inconsistent behaviour. Included only for completeness.",null,null,!1,!1,!1,u)
$.$get$h().i(0,u,v)
v.db=v.ch
w.l(v)
w.V()
v=$.b
$.b=v+1
u=new S.a4(127,127,127,255,!0,null,null,null,null,null,null,null,null,"color","Shield colour when stable. Brighter colours appear more opaque.",null,null,!1,!1,!1,v)
$.$get$h().i(0,v,u)
w.l(u)
u=$.b
$.b=u+1
v=new S.a4(127,127,127,255,!0,null,null,null,null,null,null,null,null,"lineColor","Shield edge colour.",null,null,!1,!1,!1,u)
$.$get$h().i(0,u,v)
w.l(v)
v=$.b
$.b=v+1
u=new S.a4(127,127,127,255,!0,null,null,null,null,null,null,null,null,"damagedColor","Shield colour when taking damage. Brighter colours appear more opaque.",null,null,!1,!1,!1,v)
$.$get$h().i(0,v,u)
w.l(u)
w=S.bT("shield","Shield properties. Reliant upon the SHIELD feature.",w)
w.aW()
this.G(w,new S.nY())
this.V()
w=$.b
$.b=w+1
u=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"capacity","R capacity of the block.",null,null,!1,!1,!1,w)
$.$get$h().i(0,w,u)
u.db=u.ch
this.l(u)
u=$.b
$.b=u+1
w=new S.p(400,1/0,-1/0,0,null,null,null,null,null,"tractorRange","Resource collection range for tractor blocks.",null,null,!1,!1,!1,u)
$.$get$h().i(0,u,w)
w.db=w.ch
this.G(w,new S.nZ())
w=$.b
$.b=w+1
u=new S.p(1,1/0,-1/0,0,null,null,null,null,null,"photosynthPerSec","Resources generated per second by photosynth blocks.",null,null,!1,!1,!1,w)
$.$get$h().i(0,w,u)
u.db=u.ch
this.G(u,new S.o_())
u=$.b
$.b=u+1
w=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"generatorCapacityPerSec","Energy generated per second by generators.",null,null,!1,!1,!1,u)
$.$get$h().i(0,u,w)
w.db=w.ch
this.G(w,new S.o0())
w=$.b
$.b=w+1
u=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"powerCapacity","Energy capacity of generator blocks.",null,null,!1,!1,!1,w)
$.$get$h().i(0,w,u)
u.db=u.ch
this.G(u,new S.o1())
this.V()
u=$.b
$.b=u+1
w=new S.p(6,1/0,-1/0,0,new S.o2(),null,null,null,null,"rotatorSpeed","Rotational speed in radians per second. 1 radian ~= 57.3 degrees.",null,null,!1,!1,!1,u)
$.$get$h().i(0,u,w)
w.db=w.ch
this.G(w,new S.o3())
w=$.b
$.b=w+1
u=new S.p(45,1/0,-1/0,0,null,null,null,null,null,"rotatorLimit","DO NOT USED: VERY BUGGY. Rotational angle limit of the rotator. 1 radian ~= 57.3 degrees.",null,null,!1,!1,!1,w)
$.$get$h().i(0,w,u)
u.db=u.ch
this.G(u,new S.o4())
this.V()
u=$.b
$.b=u+1
w=new S.p(1e4,1/0,-1/0,0,null,null,null,null,null,"thrusterForce","Force exerted by thruster blocks. Does not automatically scale with block size.",null,null,!1,!1,!1,u)
$.$get$h().i(0,u,w)
w.db=w.ch
this.G(w,new S.o6())
w=$.b
$.b=w+1
u=new S.p(2,1/0,-1/0,0,null,null,null,null,null,"thrusterBoost","Thruster boost multiplier. Thrust is multiplied by this number for thrusterBoostTime seconds.",null,null,!1,!1,!1,w)
$.$get$h().i(0,w,u)
u.db=u.ch
this.G(u,new S.o7())
u=$.b
$.b=u+1
w=new S.p(0.2,1/0,-1/0,0,null,null,null,null,null,"thrusterBoostTime","Thruster boost time. Thrust is multiplied by thrusterBoost for this number of seconds.",null,null,!1,!1,!1,u)
$.$get$h().i(0,u,w)
w.db=w.ch
this.G(w,new S.o8())
w=$.b
$.b=w+1
u=new S.a4(127,127,127,255,!0,null,null,null,null,null,null,null,null,"thrusterColor","Primary thruster colour. Main trail is this colour.",null,null,!1,!1,!1,w)
$.$get$h().i(0,w,u)
this.G(u,new S.o9())
u=$.b
$.b=u+1
w=new S.a4(127,127,127,255,!0,null,null,null,null,null,null,null,null,"thrusterColor1","Secondary thruster colour. Flame immediately at the thruster is this colour. If left unspecified, defaults to thrusterColor.",null,null,!1,!1,!1,u)
$.$get$h().i(0,u,w)
this.G(w,new S.oa())
this.V()
w=$.b
$.b=w+1
u=new S.p(1e4,1/0,-1/0,0,null,null,null,null,null,"torquerTorque","Angular force applied by torquer blocks. Needs to be quite high to have any noticeable effect unless the ship is exceptionally light.",null,null,!1,!1,!1,w)
$.$get$h().i(0,w,u)
u.db=u.ch
this.G(u,new S.ob())
u=$.b
$.b=u+1
w=new S.p(4,1/0,-1/0,0,null,null,null,null,null,"teleporterPower","Energy per mass (calculated against total mass) required for teleport blocks to teleport a ship.",null,null,!1,!1,!1,u)
$.$get$h().i(0,u,w)
w.db=w.ch
this.G(w,new S.oc())
w=$.b
$.b=w+1
u=new S.p(400,1/0,-1/0,0,null,null,null,null,null,"teleporterRadius","Teleporter range.",null,null,!1,!1,!1,w)
$.$get$h().i(0,w,u)
u.db=u.ch
this.G(u,new S.od())
this.V()
u=S.bT("cannon","Cannon properties. Reliant upon the CANNON feature.",S.oE())
u.aW()
this.G(u,new S.oe())
w=new S.oF(new H.P(0,null,null,null,null,null,0,y),P.V(null,null,null,z),H.E([],x),P.an(),null,null,null,!1,null)
v=$.b
$.b=v+1
u=new S.by(1,0,"Multiplier value","<span class='glyphicon glyphicon-remove' title='Multiplier'></span>","Additive value","<span class='glyphicon glyphicon-plus' title='Addition'></span>",null,null,null,"damage","Projectile damage.",null,null,!1,!1,!1,v)
$.$get$h().i(0,v,u)
w.l(u)
u=$.b
$.b=u+1
v=new S.by(1,0,"Multiplier value","<span class='glyphicon glyphicon-remove' title='Multiplier'></span>","Additive value","<span class='glyphicon glyphicon-plus' title='Addition'></span>",null,null,null,"explodeRadius","Explosion radius. Only valid if 'explosive' is set.",null,null,!1,!1,!1,u)
$.$get$h().i(0,u,v)
w.l(v)
v=$.b
$.b=v+1
u=new S.by(1,0,"Multiplier value","<span class='glyphicon glyphicon-remove' title='Multiplier'></span>","Additive value","<span class='glyphicon glyphicon-plus' title='Addition'></span>",null,null,null,"muzzleVel","Projectile velocity.",null,null,!1,!1,!1,v)
$.$get$h().i(0,v,u)
w.l(u)
u=$.b
$.b=u+1
v=new S.by(1,0,"Multiplier value","<span class='glyphicon glyphicon-remove' title='Multiplier'></span>","Additive value","<span class='glyphicon glyphicon-plus' title='Addition'></span>",null,null,null,"power","Energy consumption per shot.",null,null,!1,!1,!1,u)
$.$get$h().i(0,u,v)
w.l(v)
v=$.b
$.b=v+1
u=new S.by(1,0,"Multiplier value","<span class='glyphicon glyphicon-remove' title='Multiplier'></span>","Additive value","<span class='glyphicon glyphicon-plus' title='Addition'></span>",null,null,null,"range","Projectile range.",null,null,!1,!1,!1,v)
$.$get$h().i(0,v,u)
w.l(u)
u=$.b
$.b=u+1
v=new S.by(1,0,"Multiplier value","<span class='glyphicon glyphicon-remove' title='Multiplier'></span>","Additive value","<span class='glyphicon glyphicon-plus' title='Addition'></span>",null,null,null,"roundsPerSec","Rounds fired per second.",null,null,!1,!1,!1,u)
$.$get$h().i(0,u,v)
w.l(v)
v=$.b
$.b=v+1
u=new S.by(1,0,"Multiplier value","<span class='glyphicon glyphicon-remove' title='Multiplier'></span>","Additive value","<span class='glyphicon glyphicon-plus' title='Addition'></span>",null,null,null,"spread","Maximum random deviation from weapon facing, measured in radians. 1 radian ~= 57.3 degrees.",null,null,!1,!1,!1,v)
$.$get$h().i(0,v,u)
w.l(u)
w=S.bT("cannonBoost","Cannon booster properties. Reliant upon the CANNON_BOOST feature. Additions are applied together before multipliers.",w)
w.aW()
this.G(w,new S.of())
z=new S.oM(new H.P(0,null,null,null,null,null,0,y),P.V(null,null,null,z),H.E([],x),P.an(),null,null,null,!1,null)
y=$.b
$.b=y+1
x=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"damage","Damage per second.",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,x)
x.db=x.ch
z.l(x)
x=$.b
$.b=x+1
y=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"power","Power consumed per second.",null,null,!1,!1,!1,x)
$.$get$h().i(0,x,y)
y.db=y.ch
z.l(y)
y=$.b
$.b=y+1
x=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"range","Length of beam.",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,x)
x.db=x.ch
z.l(x)
x=$.b
$.b=x+1
y=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"width","Beam width. Units not specified by game docs.",null,null,!1,!1,!1,x)
$.$get$h().i(0,x,y)
y.db=y.ch
z.l(y)
z.V()
y=$.b
$.b=y+1
x=new S.a4(127,127,127,255,!0,null,null,null,null,null,null,null,null,"color","Beam colour.",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,x)
z.l(x)
z.V()
x=$.b
$.b=x+1
y=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"linearForce","Directional force applied to targets along the direction of the beam. Positive pushes targets away, negative draws them closer.",null,null,!1,!1,!1,x)
$.$get$h().i(0,x,y)
y.db=y.ch
z.l(y)
y=$.b
$.b=y+1
x=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"immobilizeForce","Immobilisation force applied to targets, keeping them in the same relative position as when hit. Higher values must be countered with more thrust to escape.",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,x)
x.db=x.ch
x.cy=0
z.l(x)
z.V()
x=$.b
$.b=x+1
y=new S.p(0.35,1/0,-1/0,0,null,null,null,null,null,"decay","Fraction of time between shots that it takes for the laser to fade away.",null,null,!1,!1,!1,x)
$.$get$h().i(0,x,y)
y.db=y.ch
z.l(y)
y=$.b
$.b=y+1
x=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"pulsesPerSec","",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,x)
x.db=x.ch
z.l(x)
x=$.b
$.b=x+1
y=new S.b6(0,2147483647,-2147483647,0,null,null,null,null,null,"pulsesPerBurst","",null,null,!1,!1,!1,x)
$.$get$h().i(0,x,y)
y.db=y.ch
y.ch=1
y.db=1
z.l(y)
y=$.b
$.b=y+1
x=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"pulseAvailability","",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,x)
x.db=x.ch
z.l(x)
x=$.b
$.b=x+1
y=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"burstyness","",null,null,!1,!1,!1,x)
$.$get$h().i(0,x,y)
y.db=y.ch
z.l(y)
z.V()
z.l(S.aY("explosive","Explosive behaviour of the beam. For no explosion, leave this unchecked.",$.$get$ce(),!0))
y=$.b
$.b=y+1
x=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"explodeRadius","Explosion radius at the beam contact point when explosions are enabled in the cannon section.",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,x)
x.db=x.ch
z.l(x)
z=S.bT("laser","Laser properties. Reliant upon the LASER feature.",z)
z.aW()
this.G(z,new S.oh())
z=$.b
$.b=z+1
x=new S.p(6,1/0,-1/0,0,new S.oi(),null,null,null,null,"turretSpeed","Turret rotational speed in radians per second. 1 radian ~= 57.3 degrees.",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,x)
x.db=x.ch
this.G(x,new S.oj())
x=$.b
$.b=x+1
z=new S.p(45,1/0,-1/0,0,null,null,null,null,null,"turretLimit","Rotational angle limit of the turret. 1 radian ~= 57.3 degrees.",null,null,!1,!1,!1,x)
$.$get$h().i(0,x,z)
z.db=z.ch
this.G(z,new S.ok())
z=$.b
$.b=z+1
x=new S.p(1,1/0,-1/0,0,null,null,null,null,null,"chargeMaxTime","Time in seconds for charger weapons to achieve maximum charge.",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,x)
x.db=x.ch
this.G(x,new S.ol())
x=$.b
$.b=x+1
z=new S.p(0.1,1/0,-1/0,0,null,null,null,null,null,"chargeMin","Fraction of charge at which a charging weapon may fire.",null,null,!1,!1,!1,x)
$.$get$h().i(0,x,z)
z.db=z.ch
this.G(z,new S.om())
this.V()
z=$.b
$.b=z+1
x=new S.p(51,1/0,-1/0,0,null,null,null,null,null,"explodeDamage","Damage caused by blocks with the explode feature.",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,x)
x.db=x.ch
this.G(x,new S.on())
x=$.b
$.b=x+1
z=new S.p(30,1/0,-1/0,0,null,null,null,null,null,"explodeRadius","Blast radius for blocks with the explode feature.",null,null,!1,!1,!1,x)
$.$get$h().i(0,x,z)
z.db=z.ch
this.G(z,new S.oo())
this.V()
z=$.b
$.b=z+1
x=new S.hW(!1,null,0,0,null,null,null,null,null,null,null,"replicateBlock","Spawned block properties. Reliant upon the LAUNCHER feature.",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,x)
x.cr("replicateBlock","Spawned block properties. Reliant upon the LAUNCHER feature.",null)
x.aW()
this.G(x,new S.op())
x=$.b
$.b=x+1
z=new S.p(1,1/0,-1/0,0,new S.oq(),null,null,null,null,"replicateTime","Time required to build the launched block.",null,null,!1,!1,!1,x)
$.$get$h().i(0,x,z)
z.db=z.ch
this.G(z,new S.os())
z=$.b
$.b=z+1
x=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"launcherPower","Power required to build a single launched block.",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,x)
x.db=x.ch
this.G(x,new S.ot())
x=$.b
$.b=x+1
z=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"launcherSpeed","ONLY FOR TURRETED LAUNCHERS. Velocity of launched block.",null,null,!1,!1,!1,x)
$.$get$h().i(0,x,z)
z.db=z.ch
this.G(z,new S.ou())
z=$.b
$.b=z+1
x=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"launcherOutSpeed","ONLY FOR NON-TURRETED LAUNCHERS. Velocity of launched block.",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,x)
x.db=x.ch
this.G(x,new S.ov())
x=$.b
$.b=x+1
z=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"launcherAngVel","",null,null,!1,!1,!1,x)
$.$get$h().i(0,x,z)
z.db=z.ch
this.G(z,new S.ow())
this.V()
z=$.b
$.b=z+1
x=new S.p(100,1/0,-1/0,0,null,null,null,null,null,"finForce","How powerful the fin is.",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,x)
x.db=x.ch
this.G(x,new S.ox())
this.V()
x=$.b
$.b=x+1
z=new S.p(0.4,1/0,-1/0,0,null,null,null,null,null,"elasticity","How bouncy a block is.",null,null,!1,!1,!1,x)
$.$get$h().i(0,x,z)
z.db=z.ch
this.l(z)
this.V()
z=$.b
$.b=z+1
x=new S.p(100,1/0,-1/0,0,null,null,null,null,null,"health","For really specific cases when it is more reasonable to define health directly instead of using durability.",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,x)
x.db=x.ch
this.l(x)
x=$.b
$.b=x+1
z=new S.p(10,1/0,-1/0,0,null,null,null,null,null,"mass","For really specific cases when it is more reasonable to define mass directly instead of using density.",null,null,!1,!1,!1,x)
$.$get$h().i(0,x,z)
z.db=z.ch
this.l(z)},
D:{
bo:function(a){var z=S.aa
z=new S.nS(0,0,!1,new H.P(0,null,null,null,null,null,0,[P.y,z]),P.V(null,null,null,z),H.E([],[W.N]),P.an(),null,null,null,!1,null)
z.f1(a)
return z}}},
nT:{"^":"a:2;",
$1:function(a){var z,y
z=$.$get$cf()
y=$.$get$bk()
return S.u3(a.f,"features",[z,y],!1)}},
nU:{"^":"a:24;",
$1:[function(a){var z=J.fo(a)
return"Auto P cost: "+H.d(z.gho()?z.gfJ():"?")},null,null,2,0,null,1,"call"]},
nV:{"^":"a:10;",
$1:[function(a){var z,y,x,w,v
z=J.e(a)
y=z.gaw(a).u("shape")
x=Math.min(y.gah(),H.A(z.gaw(a).u("scale")))
z=z.gN(a)
w=J.c4(y)
v=x-1
if(v>>>0!==v||v>=w.length)return H.c(w,v)
return"Block health: "+J.dO(J.q(J.q(z,w[v]),100),0)},null,null,2,0,null,1,"call"]},
o5:{"^":"a:10;",
$1:[function(a){var z,y,x,w,v
z=J.e(a)
y=z.gaw(a).u("shape")
x=Math.min(y.gah(),H.A(z.gaw(a).u("scale")))
z=z.gN(a)
w=J.c4(y)
v=x-1
if(v>>>0!==v||v>=w.length)return H.c(w,v)
return"Block mass: "+J.dO(J.q(J.q(z,w[v]),100),2)},null,null,2,0,null,1,"call"]},
og:{"^":"a:10;",
$1:[function(a){var z,y,x,w,v
z=J.e(a)
y=z.gaw(a).u("shape")
x=Math.min(y.gah(),H.A(z.gaw(a).u("scale")))
z=z.gN(a)
if(typeof z!=="number")return H.C(z)
w=J.c4(y)
v=x-1
if(v>>>0!==v||v>=w.length)return H.c(w,v)
return"Growth time: "+C.d.bM(10/z*Math.sqrt(H.A(w[v])),1)+"sec"},null,null,2,0,null,1,"call"]},
or:{"^":"a:2;",
$1:function(a){var z=$.$get$cX()
return S.w(a.f,"features",z)}},
oy:{"^":"a:2;",
$1:function(a){var z=$.$get$bO()
if(!S.w(a.f,"features",z)){z=$.$get$bR()
if(!S.w(a.f,"features",z)){z=$.$get$ay()
z=S.w(a.f,"features",z)}else z=!0}else z=!0
return z}},
oz:{"^":"a:2;",
$1:function(a){var z=$.$get$bk()
return S.w(a.f,"features",z)}},
oA:{"^":"a:2;",
$1:function(a){var z=$.$get$bk()
return S.w(a.f,"features",z)}},
oB:{"^":"a:2;",
$1:function(a){var z=$.$get$bk()
return S.w(a.f,"features",z)}},
oC:{"^":"a:2;",
$1:function(a){var z=$.$get$bk()
return S.w(a.f,"features",z)}},
nW:{"^":"a:2;",
$1:function(a){var z=$.$get$bk()
return S.w(a.f,"features",z)}},
nX:{"^":"a:2;",
$1:function(a){var z=$.$get$cU()
return S.w(a.f,"features",z)}},
nY:{"^":"a:2;",
$1:function(a){var z=$.$get$ci()
return S.w(a.f,"features",z)}},
nZ:{"^":"a:2;",
$1:function(a){var z=$.$get$cj()
return S.w(a.f,"features",z)}},
o_:{"^":"a:2;",
$1:function(a){var z=$.$get$ch()
return S.w(a.f,"features",z)}},
o0:{"^":"a:2;",
$1:function(a){var z=$.$get$bQ()
return S.w(a.f,"features",z)}},
o1:{"^":"a:2;",
$1:function(a){var z=$.$get$bQ()
return S.w(a.f,"features",z)}},
o2:{"^":"a:10;",
$1:[function(a){return S.kN(a)+"/sec"},null,null,2,0,null,1,"call"]},
o3:{"^":"a:2;",
$1:function(a){var z=$.$get$bS()
return S.w(a.f,"features",z)}},
o4:{"^":"a:2;",
$1:function(a){var z=$.$get$bS()
return S.w(a.f,"features",z)}},
o6:{"^":"a:2;",
$1:function(a){var z=$.$get$bl()
return S.w(a.f,"features",z)}},
o7:{"^":"a:2;",
$1:function(a){var z=$.$get$bl()
return S.w(a.f,"features",z)}},
o8:{"^":"a:2;",
$1:function(a){var z=$.$get$bl()
return S.w(a.f,"features",z)}},
o9:{"^":"a:2;",
$1:function(a){var z=$.$get$bl()
return S.w(a.f,"features",z)}},
oa:{"^":"a:2;",
$1:function(a){var z=$.$get$bl()
return S.w(a.f,"features",z)}},
ob:{"^":"a:2;",
$1:function(a){var z=$.$get$e5()
return S.w(a.f,"features",z)}},
oc:{"^":"a:2;",
$1:function(a){var z=$.$get$cY()
return S.w(a.f,"features",z)}},
od:{"^":"a:2;",
$1:function(a){var z=$.$get$cY()
return S.w(a.f,"features",z)}},
oe:{"^":"a:2;",
$1:function(a){var z=$.$get$bO()
return S.w(a.f,"features",z)}},
of:{"^":"a:2;",
$1:function(a){var z=$.$get$cV()
return S.w(a.f,"features",z)}},
oh:{"^":"a:2;",
$1:function(a){var z=$.$get$bR()
return S.w(a.f,"features",z)}},
oi:{"^":"a:10;",
$1:[function(a){return S.kN(a)+"/sec"},null,null,2,0,null,1,"call"]},
oj:{"^":"a:2;",
$1:function(a){var z=$.$get$bx()
return S.w(a.f,"features",z)}},
ok:{"^":"a:2;",
$1:function(a){var z=$.$get$bx()
return S.w(a.f,"features",z)}},
ol:{"^":"a:2;",
$1:function(a){var z=$.$get$bP()
return S.w(a.f,"features",z)}},
om:{"^":"a:2;",
$1:function(a){var z=$.$get$bP()
return S.w(a.f,"features",z)}},
on:{"^":"a:2;",
$1:function(a){var z=$.$get$cg()
return S.w(a.f,"features",z)}},
oo:{"^":"a:2;",
$1:function(a){var z=$.$get$cg()
return S.w(a.f,"features",z)}},
op:{"^":"a:2;",
$1:function(a){var z=$.$get$ay()
return S.w(a.f,"features",z)}},
oq:{"^":"a:10;",
$1:[function(a){var z=J.dJ(a)
if(typeof z!=="number")return H.C(z)
return C.d.bM(1/z,1)+"/sec"},null,null,2,0,null,1,"call"]},
os:{"^":"a:2;",
$1:function(a){var z=$.$get$ay()
return S.w(a.f,"features",z)}},
ot:{"^":"a:2;",
$1:function(a){var z=$.$get$ay()
return S.w(a.f,"features",z)}},
ou:{"^":"a:2;",
$1:function(a){var z=$.$get$ay()
return S.w(a.f,"features",z)}},
ov:{"^":"a:2;",
$1:function(a){var z=$.$get$ay()
return S.w(a.f,"features",z)}},
ow:{"^":"a:2;",
$1:function(a){var z=$.$get$ay()
return S.w(a.f,"features",z)}},
ox:{"^":"a:2;",
$1:function(a){var z=$.$get$e2()
return S.w(a.f,"features",z)}},
oD:{"^":"b8;a,b,c,d,e,f,r,x,y",
f2:function(){var z,y
z=$.b
$.b=z+1
y=new S.p(0,1/0,-1/0,0,new S.oG(),null,null,null,null,"damage","Damage per round.",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
y.db=y.ch
this.l(y)
y=$.b
$.b=y+1
z=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"power","Power consumed per shot fired.",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
z.db=z.ch
this.l(z)
z=$.b
$.b=z+1
y=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"roundsPerSec","Shots fired per second.",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
y.db=y.ch
this.l(y)
y=$.b
$.b=y+1
z=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"muzzleVel","Velocity of fired rounds.",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
z.db=z.ch
this.l(z)
z=$.b
$.b=z+1
y=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"range","Weapon range. Rounds are destroyed when reaching this distance.",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
y.db=y.ch
this.l(y)
y=$.b
$.b=y+1
z=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"recoil","Amount of force experienced per shot fired.",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
z.db=z.ch
this.l(z)
z=$.b
$.b=z+1
y=new S.p(0,1/0,-1/0,0,S.uw(),null,null,null,null,"spread","Maximum random deviation from weapon facing, measured in radians. 1 radian ~= 57.3 degrees.",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
y.db=y.ch
this.l(y)
this.V()
y=$.b
$.b=y+1
z=new S.b6(0,2147483647,-2147483647,0,null,null,null,null,null,"roundsPerBurst","Number of rounds in each burst when burstyness is greater than zero.",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
z.db=z.ch
z.ch=1
z.db=1
this.l(z)
z=$.b
$.b=z+1
y=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"burstyness","Measures how tight burst fire is. Example: 3 rounds per burst, 1 round per second - 0.0 = one round every second. 0.5 = three rounds spaced half of a second apart, followed by a 1.5 second pause. 1.0 = all three shots at once, followed by a 3 second pause.",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
y.db=y.ch
this.l(y)
this.V()
y=$.b
$.b=y+1
z=new S.a4(127,127,127,255,!1,null,null,null,null,null,null,null,null,"color","Colour of rounds.",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
this.l(z)
this.V()
this.l(S.aY("explosive","Explosive behaviour of fired projectiles. For no explosion, leave this unchecked.",$.$get$ce(),!0))
z=$.b
$.b=z+1
y=new S.p(0,1/0,-1/0,0,null,null,null,null,null,"explodeRadius","Explode radius of the round when explosions are enabled.",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
y.db=y.ch
this.l(y)},
D:{
oE:function(){var z=S.aa
z=new S.oD(new H.P(0,null,null,null,null,null,0,[P.y,z]),P.V(null,null,null,z),H.E([],[W.N]),P.an(),null,null,null,!1,null)
z.f2()
return z}}},
oG:{"^":"a:10;",
$1:[function(a){var z,y
z=J.e(a)
y=z.gaw(a).u("roundsPerSec")
return"DPS: "+H.d(J.bf(J.q(J.q(z.gN(a),y),10))/10)},null,null,2,0,null,1,"call"]},
oM:{"^":"b8;a,b,c,d,e,f,r,x,y"},
oH:{"^":"b8;a,b,c,d,e,f,r,x,y"},
oF:{"^":"b8;a,b,c,d,e,f,r,x,y"},
oO:{"^":"b8;a,b,c,d,e,f,r,x,y"},
oI:{"^":"b8;a,b,c,d,e,f,r,x,y",
J:function(){var z=S.eq()
this.c1(z)
z.K(z.x)
return z},
bq:function(a,b,c,d){var z,y,x,w
z=this.a
y=H.d(z.h(0,"ident").a1())+" = {"
S.a_(b,y,d?c:0,!0)
for(z=z.ga5(z),z=z.gB(z),y=c+1;z.m();){x=z.gq()
w=J.e(x)
if(J.v(w.gE(x),"ident"))continue
if(w.gb0(x)===!0&&x.aE()===!0)w.aq(x,b,y)}S.a_(b,"},",c,!0)},
aR:function(a,b,c){return this.bq(a,b,c,!0)},
f3:function(){var z,y
z=$.b
$.b=z+1
y=new S.d6(0,2147483647,-2147483647,0,null,null,null,null,null,"ident","Faction id. Used in block 'group' fields and the start of ship file names to associate them with the faction.",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
y.db=y.ch
y.ch=0
y.db=0
y.aW()
this.l(y)
y=$.b
$.b=y+1
z=new S.aN("",null,null,null,"name","Faction name as it will appear in-game.",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
this.l(z)
this.l(S.aY("playable","Whether the faction is selectable by the player, and if it needs to be unlocked first.",$.$get$e8(),!0))
z=$.b
$.b=z+1
y=new S.aN("",null,null,null,"start","Starter ship blueprint. Filename minus extension (20_test.lua -> 20_test).",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
this.l(y)
y=$.b
$.b=y+1
z=new S.b6(0,2147483647,-2147483647,0,null,null,null,null,null,"primaries","Number of faction colours.",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
z.db=z.ch
z.ch=2
z.db=2
z.cy=0
z.cx=3
this.l(z)
z=$.b
$.b=z+1
y=new S.a4(127,127,127,255,!1,null,null,null,null,null,null,null,null,"color0","First faction colour",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
this.G(y,new S.oJ())
y=$.b
$.b=y+1
z=new S.a4(127,127,127,255,!1,null,null,null,null,null,null,null,null,"color1","Second faction colour",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
this.G(z,new S.oK())
z=$.b
$.b=z+1
y=new S.a4(127,127,127,255,!1,null,null,null,null,null,null,null,null,"color2","Third faction colour",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
this.G(y,new S.oL())
this.l(S.aY("aiflags","Ship behaviour flags. Applied to all ships on the side, added to by any flags set in individual command modules.",$.$get$cd(),!1))},
D:{
eq:function(){var z=S.aa
z=new S.oI(new H.P(0,null,null,null,null,null,0,[P.y,z]),P.V(null,null,null,z),H.E([],[W.N]),P.an(),null,null,null,!1,null)
z.f3()
return z}}},
oJ:{"^":"a:2;",
$1:function(a){return J.S(H.o(a.f.a.h(0,"primaries"),"$isb6").ch,0)}},
oK:{"^":"a:2;",
$1:function(a){return J.S(H.o(a.f.a.h(0,"primaries"),"$isb6").ch,1)}},
oL:{"^":"a:2;",
$1:function(a){return J.S(H.o(a.f.a.h(0,"primaries"),"$isb6").ch,2)}},
oN:{"^":"b8;a,b,c,d,e,f,r,x,y",
J:function(){var z=S.er()
this.c1(z)
z.K(z.x)
return z},
f4:function(){var z,y,x
z=$.b
$.b=z+1
y=new S.U(0,2147483647,-2147483647,0,null,null,null,null,null,"ident","Region ID",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
y.db=y.ch
y.aW()
this.l(y)
y=$.b
$.b=y+1
z=new S.a4(127,127,127,255,!1,null,null,null,null,null,null,null,null,"color","Region colour override. Defaults to an average of the controlling faction's colours.",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
this.l(z)
z=$.b
$.b=z+1
y=new S.U(0,2147483647,-2147483647,0,null,null,null,null,null,"faction","Controlling faction ID",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
y.db=y.ch
this.l(y)
y=$.b
$.b=y+1
z=new S.b6(0,2147483647,-2147483647,0,null,null,null,null,null,"count","Number of regions in the galaxy",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
z.db=z.ch
z.ch=0
z.db=0
this.l(z)
z=$.b
$.b=z+1
y=new S.d5(0.1,1,"Minimum value","<span class='glyphicon glyphicon-triangle-bottom' title='Minimum'></span>","Maximum value","<span class='glyphicon glyphicon-triangle-top' title='Maximum'></span>",null,null,null,"position","Positional range of the centre of the region. 0.0 = centre, 1.0 = edge",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
this.l(y)
y=$.b
$.b=y+1
z=new S.d5(0.1,0.15,"Minimum value","<span class='glyphicon glyphicon-triangle-bottom' title='Minimum'></span>","Maximum value","<span class='glyphicon glyphicon-triangle-top' title='Maximum'></span>",null,null,null,"radius","Size range of the region as a fraction of the map radius. 0.1 = 10%",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
this.l(z)
this.l(S.aY("type","Shape of this region when added to the map. Default is voronoi regions.",$.$get$ea(),!0))
this.V()
z=$.b
$.b=z+1
y=new S.hZ([],null,null,null,null,null,"fleets","Fleets which could spawn in the region. Faction ID paired with a P weight at the edge and centre of the region.",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
this.l(y)
y=$.b
$.b=y+1
z=new S.ec(8,15,"Minimum value","<span class='glyphicon glyphicon-triangle-bottom' title='Minimum'></span>","Maximum value","<span class='glyphicon glyphicon-triangle-top' title='Maximum'></span>",null,null,null,"fleetCount","Number of ships per fleet",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
this.l(z)
z=$.b
$.b=z+1
y=new S.p(0.75,1/0,-1/0,0,null,null,null,null,null,"fleetFraction","?",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
y.db=y.ch
this.l(y)
this.V()
y=$.b
$.b=y+1
z=new S.ee([],null,null,null,null,null,"fortress","Fortress designs. These ships will appear guarding deactivated stations in the region.",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
this.l(z)
z=$.b
$.b=z+1
y=new S.ec(3,6,"Minimum value","<span class='glyphicon glyphicon-triangle-bottom' title='Minimum'></span>","Maximum value","<span class='glyphicon glyphicon-triangle-top' title='Maximum'></span>",null,null,null,"fortressCount","Number of fortresses in the region",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
this.l(y)
y=$.b
$.b=y+1
z=new S.d5(500,500,"Minimum value","<span class='glyphicon glyphicon-triangle-bottom' title='Minimum'></span>","Maximum value","<span class='glyphicon glyphicon-triangle-top' title='Maximum'></span>",null,null,null,"fortressRadius","Distance from station markers to place fortresses.",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
this.l(z)
this.V()
z=$.b
$.b=z+1
y=new S.i2([],null,null,null,null,null,"unique","Unique groups of ships which may appear exactly as specified in the region.",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
this.l(y)
y=$.b
$.b=y+1
z=new S.p(0.25,1/0,-1/0,0,null,null,null,null,null,"uniqueFraction","?",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
z.db=z.ch
this.l(z)
this.V()
z=$.$get$e6()
y=S.ao
x=$.b
$.b=x+1
y=new S.hX(!1,new H.P(0,null,null,null,null,null,0,[y,P.bH]),new H.P(0,null,null,null,null,null,0,[P.y,y]),null,null,null,null,null,"ambient","The type of ambient plants which generate on ENVIRONMENTAL blocks in the region",null,null,!1,!1,!1,x)
$.$get$h().i(0,x,y)
y.cq("ambient","The type of ambient plants which generate on ENVIRONMENTAL blocks in the region",z,!1)
this.l(y)
y=$.b
$.b=y+1
z=new S.d5(0,0.4,"Minimum value","<span class='glyphicon glyphicon-triangle-bottom' title='Minimum'></span>","Maximum value","<span class='glyphicon glyphicon-triangle-top' title='Maximum'></span>",null,null,null,"asteroidDensity","Density of asteroids in the region. 0.0-1.0",null,null,!1,!1,!1,y)
$.$get$h().i(0,y,z)
this.l(z)
z=$.b
$.b=z+1
y=new S.ec(0,0,"Minimum value","<span class='glyphicon glyphicon-triangle-bottom' title='Minimum'></span>","Maximum value","<span class='glyphicon glyphicon-triangle-top' title='Maximum'></span>",null,null,null,"asteroidSize","Size in blocks of asteroids in the region",null,null,!1,!1,!1,z)
$.$get$h().i(0,z,y)
this.l(y)
this.l(S.aY("asteroidFlags","Properties for asteroids in the region. Not specifying any shape types will choose randomly.",$.$get$dZ(),!1))},
D:{
er:function(){var z=S.aa
z=new S.oN(new H.P(0,null,null,null,null,null,0,[P.y,z]),P.V(null,null,null,z),H.E([],[W.N]),P.an(),null,null,null,!1,null)
z.f4()
return z}}},
oX:{"^":"a:12;",
$2:function(a,b){var z,y
z=J.e(a)
y=z.gE(a).split(".")
if(0>=y.length)return H.c(y,0)
if(J.aE(y[0],"block")!==!0){S.ba("Warning!",'Selected file ("'+H.d(z.gE(a))+"\") is probably not a blocks file! Make sure the file name contains the word 'block' if you are sure it is a blocks file.")
return}if(b!=null)S.oY(b)}},
pa:{"^":"a:12;",
$2:function(a,b){var z,y
z=J.e(a)
y=z.gE(a).split(".")
if(0>=y.length)return H.c(y,0)
if(J.aE(y[0],"shapes")!==!0){S.ba("Warning!",'Selected file ("'+H.d(z.gE(a))+"\") is probably not a shapes file! Make sure the file name contains the word 'shapes' if you are sure it is a blocks file.")
return}if(b!=null)S.pb(b)}},
p0:{"^":"a:12;",
$2:function(a,b){var z,y
z=J.e(a)
y=z.gE(a).split(".")
if(0>=y.length)return H.c(y,0)
if(J.aE(y[0],"faction")!==!0){S.ba("Warning!",'Selected file ("'+H.d(z.gE(a))+"\") is probably not a factions file! Make sure the file name contains the word 'faction' if you are sure it is a factions file.")
return}if(b!=null)S.p1(b)}},
p5:{"^":"a:12;",
$2:function(a,b){var z,y
z=J.e(a)
y=z.gE(a).split(".")
if(0>=y.length)return H.c(y,0)
if(J.aE(y[0],"region")!==!0){S.ba("Warning!",'Selected file ("'+H.d(z.gE(a))+"\") is probably not a regions file! Make sure the file name contains the word 'region' if you are sure it is a blocks file.")
return}if(b!=null)S.p7(b)}},
p6:{"^":"a:7;",
$1:function(a){return"{"+H.d(a)+"}"}},
pe:{"^":"a:12;",
$2:function(a,b){var z=J.e(a)
if(!J.cL(z.gE(a),$.$get$iN())){S.ba("Warning!",'Selected file ("'+H.d(z.gE(a))+"\") is probably not a ship file! Make sure the file name starts with a number followed by '_' (e.g. 2_awesomefighter.lua) if you are sure it is a ship file.")
return}if(b!=null)S.pf(a,b)}},
p3:{"^":"a:25;a,b,c,d",
$1:[function(a){var z,y,x
z=J.ld(J.T(a))
y=this.c
if(y!=null)z=y.$1(z)
x=S.pk(z,this.d)
y=this.b
if(y!=null)y.$2(this.a,x)},null,null,2,0,null,32,"call"]},
pn:{"^":"a:6;",
$1:function(a){return""}},
po:{"^":"a:6;",
$1:function(a){return"\\\\"}},
pp:{"^":"a:6;",
$1:function(a){return'="'+H.d(a.Z(1))+'"'}},
pt:{"^":"a:6;a",
$1:function(a){var z,y,x,w,v,u,t
z='"'+this.a.a+++'":{"blockid":"'+H.d(a.Z(1))+'", "pos":{"0":'
z=z+H.d(a.Z(3)==null?0:a.Z(3))+',"1":'
y=z+H.d(a.Z(4)==null?0:a.Z(4))+"}"
if(a.gce()>=7)for(x=6;x<a.gce();++x){w=a.Z(x)
if(w!=null){v=J.fv(w,",")
for(z=v.length,u=0;u<v.length;v.length===z||(0,H.r)(v),++u){t=J.c5(v[u])
y=H.Z(t,new S.pm())!=null?y+(', "rotation":'+t):y+(", "+t)}}}return y+"}"}},
pm:{"^":"a:3;",
$1:function(a){return}},
pu:{"^":"a:6;",
$1:function(a){return H.d(a.Z(1))+","+H.d(a.Z(2))}},
pv:{"^":"a:6;",
$1:function(a){return'"'+H.d(a.Z(1))+'":'+H.d(a.Z(2))}},
pw:{"^":"a:6;",
$1:function(a){return'"'+H.d(a.Z(1))+'":"'+H.d(a.Z(2))+'",'}},
px:{"^":"a:6;",
$1:function(a){var z,y
z={}
y=a.Z(0)
z.a=0
return J.lj(y,$.$get$iF(),new S.pl(z))}},
pl:{"^":"a:6;a",
$1:function(a){var z,y
z=a.Z(0)
C.h.c8("[\\w_]+",z)
y='"'+this.a.a+++'":"'+H.d(z)+'"'
return y}},
py:{"^":"a:6;",
$1:function(a){if(J.v(a.Z(1),":"))return H.d(a.Z(1))+' { "ident":'+H.d(a.Z(2))+","
return H.d(a.Z(1))+' "'+H.d(a.Z(2))+'":{ "ident":"'+H.d(a.Z(2))+'",'}},
pz:{"^":"a:6;a",
$1:function(a){return H.d(a.Z(1))+' "'+this.a.b+++'":'}},
pA:{"^":"a:6;",
$1:function(a){return"}"}},
pq:{"^":"a:6;",
$1:function(a){return H.d(a.Z(1))+","}},
pr:{"^":"a:6;",
$1:function(a){return H.d(a.Z(1))+", "+H.d(a.Z(2))}},
ps:{"^":"a:6;",
$1:function(a){return"}"}},
oZ:{"^":"a:11;",
$2:function(a,b){var z,y
if(!!J.t(b).$isF){z=S.bo(!1)
z.ac(0,b)
y=S.dU(z)
$.au.S(0,y)}}},
pc:{"^":"a:11;",
$2:function(a,b){var z
if(!!J.t(b).$isF){z=S.m3(b)
$.bb.S(0,z)}}},
p2:{"^":"a:11;",
$2:function(a,b){var z,y,x
z=J.t(b)
if(!!z.$isF){z.i(b,"ident",a)
y=S.eq()
y.ac(0,b)
x=S.eb(y)
$.bc.S(0,x)}}},
p8:{"^":"a:11;",
$2:function(a,b){var z,y
if(!!J.t(b).$isF){z=S.er()
z.ac(0,b)
y=S.eE(z)
$.aS.S(0,y)}}},
pg:{"^":"a:3;",
$1:function(a){return-1}},
ph:{"^":"a:3;",
$1:function(a){return 0}},
pi:{"^":"a:3;",
$1:function(a){return 0}},
pj:{"^":"a:3;",
$1:function(a){return 0}},
ey:{"^":"i;a,b,c,d,e,f,r,x",
dK:function(a,b,c){var z=this.a++
this.b.i(0,z,b)
b.sc9(this)
b.at(0)
this.e.appendChild(b.gaO())
b.sbI(z)
z=this.c
if(c===-1)z.push(b)
else{C.f.bj(z,"insert")
if(c<0||c>z.length)H.R(P.bB(c,null,null))
z.splice(c,0,b)
this.d4()}z=this.r
if(z!=null)z.$1(this)},
S:function(a,b){return this.dK(a,b,-1)},
c0:function(a){var z,y
z=a.J()
y=C.f.bo(this.c,a)
this.dK(0,z,y+1)
z.a0()},
bS:function(a){var z,y,x,w,v
z=this.c
y=C.f.bo(z,a)
if(y<=0)return
x=y-1
w=z.length
if(x>=w)return H.c(z,x)
v=z[x]
z[x]=a
if(y>=w)return H.c(z,y)
z[y]=v
this.d4()},
bT:function(a){var z,y,x,w,v
z=this.c
y=C.f.bo(z,a)
if(y===-1||y>=z.length-1)return
x=y+1
w=z.length
if(x<0||x>=w)return H.c(z,x)
v=z[x]
z[x]=a
if(y<0||y>=w)return H.c(z,y)
z[y]=v
this.d4()},
bR:function(a,b){var z
if(!J.v(this.d,b)){for(z=this.b,z=z.ga5(z),z=z.gB(z);z.m();)z.gq().c2()
b.bQ(0)
this.d=b}},
aB:function(a){var z,y
for(z=this.c,y=z.length-1;y>=0;--y){if(y>=z.length)return H.c(z,y)
this.bz(z[y])}},
bz:function(a){var z
this.b.an(0,a.gbI())
C.f.an(this.c,a)
if(J.v(this.d,a))this.d=null
a.aF()
z=this.r
if(z!=null)z.$1(this)},
d4:function(){var z,y,x,w,v,u
z=H.E([],[W.z])
for(y=this.e.childNodes,x=y.length,w=0;w<y.length;y.length===x||(0,H.r)(y),++w){v=y[w]
if(v.nodeType===1)z.push(v)}J.ln(this.e,"")
for(y=this.c,x=y.length,w=0;w<y.length;y.length===x||(0,H.r)(y),++w){u=y[w]
this.e.appendChild(u.gaO())}},
a0:function(){var z=this.r
if(z!=null)z.$1(this)},
d8:function(){var z,y,x
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.r)(z),++x)z[x].a0()},
f5:function(a,b){var z,y
z="#"+a
y=document
this.e=y.querySelector(z)
this.f=y.querySelector("#"+b)},
D:{
dd:function(a,b){var z=new S.ey(0,P.an(),[],null,null,null,null,null)
z.f5(a,b)
return z}}},
pP:{"^":"i;T:a<,aO:b<,c9:c?,d,e,f,r,x,y,bI:z@,hL:Q<",
J:function(){var z,y
z=S.eE(null)
y=this.a.J()
z.a=y
y.r=z
return z},
aF:function(){var z,y,x,w
this.a.ay()
z=this.b;(z&&C.c).aA(z)
this.b=null
z=$.bJ
y=$.aS.d
x=z.c
w=z.a
J.aD(x,0,0,w,w)
z.be(0,5,16)
z.bA(y)},
bQ:function(a){var z,y,x,w
this.y=!0
z=this.a.at(0)
y=this.a
y.K(y.x)
this.c.f.appendChild(z)
this.b.className="ui regionbox selected"
y=$.bJ
x=y.c
w=y.a
J.aD(x,0,0,w,w)
y.be(0,5,16)
y.bA(this)},
c2:function(){this.y=!1
this.a.ay()
this.b.className="ui regionbox"},
cR:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=document
y=z.createElement("div")
y.className="ui regionbox"
C.c.C(y,"click",new S.pQ(this),null)
this.b=y
x=z.createElement("span")
x.className="regionname"
y.appendChild(x)
w=z.createElement("span")
this.d=w
w.textContent="0"
w.className="regionid"
x.appendChild(w)
v=z.createElement("span")
this.e=v
v.textContent="info"
v.className="regioninfo"
x.appendChild(v)
u=z.createElement("span")
this.x=u
u.textContent="Faction"
u.className="regionfaction"
y.appendChild(u)
t=z.createElement("div")
t.className="regioncolour"
y.appendChild(t)
this.r=t
s=z.createElement("div")
s.className="ui regionsortbutton"
C.c.L(s,'<i class="glyphicon glyphicon-menu-up"></i>')
s.title="Move this region up"
C.c.C(s,"click",new S.pR(this),null)
y.appendChild(s)
r=z.createElement("div")
r.className="ui regionsortbutton sortdown"
C.c.L(r,'<i class="glyphicon glyphicon-menu-down"></i>')
r.title="Move this region down"
C.c.C(r,"click",new S.pS(this),null)
y.appendChild(r)
q=z.createElement("div")
q.className="ui regioncopybutton"
C.c.L(q,'<i class="glyphicon glyphicon-duplicate"></i>')
q.title="Duplicate this faction."
C.c.C(q,"click",new S.pT(this),null)
y.appendChild(q)
p=z.createElement("div")
p.className="ui regiondeletebutton"
C.c.L(p,'<i class="glyphicon glyphicon-trash"></i>')
p.title="Delete this faction"
C.c.C(p,"click",new S.pU(this),null)
y.appendChild(p)
o=z.createElement("div")
o.className="regiondeletescreen"
C.c.L(o,"Delete this region? ")
C.c.C(o,"click",new S.pV(),null)
this.f=o
y.appendChild(o)
n=z.createElement("div")
n.className="regiondeletescreenbutton deleteyes glyphicon glyphicon-ok"
n.title="Delete the region"
C.c.C(n,"click",new S.pW(this),null)
o.appendChild(n)
m=z.createElement("div")
m.className="regiondeletescreenbutton deleteno glyphicon glyphicon-remove"
m.title="Keep the regtion"
C.c.C(m,"click",new S.pX(this),null)
o.appendChild(m)
z=this.a
z.K(z.x)},
at:function(a){return this.cR(a,-1)},
d7:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.a.u("ident")
y=J.b3(this.a.a.h(0,"faction"))
x=this.a.u("faction")
w=this.a.u("count")
v=this.a.u("position")
u=this.a.u("radius")
t=this.a.u("fleets")
if(y!==!0&&J.S(J.aL(t),0)){for(s=J.a7(t),r=-1,q=0;s.m();){p=s.gq()
o=J.L(p)
n=J.B(o.h(p,"0"),o.h(p,"1"))
if(J.S(n,q)){r=o.h(p,"faction")
q=n}}if(!J.v(r,-1)){x=r
y=!0}}m=this.a.u("color")
if(m==null&&y===!0)for(s=$.bc.c,o=s.length,l=0;l<s.length;s.length===o||(0,H.r)(s),++l){p=s[l]
if(J.v(p.gT().u("ident"),x)){m=p.fH()
break}}if(m!=null){this.Q=m
s=this.r.style
o=J.L(m)
o="rgb("+H.d(o.h(m,"r"))+","+H.d(o.h(m,"g"))+","+H.d(o.h(m,"b"))+")"
s.backgroundColor=o}else{this.Q=P.Y(["r",127,"g",127,"b",127])
s=this.r.style
s.backgroundColor="#808080"}if(y===!0){s=$.bc.c
o=s.length
l=0
while(!0){if(!(l<s.length)){k=!1
break}p=s[l]
if(J.v(p.gT().u("ident"),x)){j=p.gT().u("name")
if(J.dI(j)!==!0){this.x.textContent=j
k=!0}else k=!1
break}s.length===o||(0,H.r)(s);++l}if(!k)this.x.textContent="F"+H.d(x)}else this.x.textContent=""
s=J.L(v)
i=J.v(s.h(v,"0"),s.h(v,"1"))?S.c1(s.h(v,"0"))+"%":S.c1(s.h(v,"0"))+"-"+S.c1(s.h(v,"1"))+"%"
s=J.L(u)
h=J.v(s.h(u,"0"),s.h(u,"1"))?S.c1(s.h(u,"0"))+"%":S.c1(s.h(u,"0"))+"-"+S.c1(s.h(u,"1"))+"%"
g="x"+H.d(w)+", "+h+" @"+i
this.d.textContent=H.d(z)+" "
this.e.textContent=g
s=$.bJ
o=$.aS.d
f=s.c
e=s.a
J.aD(f,0,0,e,e)
s.be(0,5,16)
s.bA(o)},
a0:function(){var z=this.a
z.K(z.x)},
aR:function(a,b,c){this.a.aR(0,b,c)},
f6:function(a){var z=this.a
if(z==null){z=S.er()
this.a=z}z.r=this},
D:{
eE:function(a){var z=new S.pP(a,null,null,null,null,null,null,null,!1,null,P.Y(["r",127,"g",127,"b",127]))
z.f6(a)
return z}}},
pQ:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.e(a)
if(z.ga7(a)!==0)return
y=this.a
y.c.bR(0,y)
z.aS(a)
z.a2(a)
z.bJ(a)},null,null,2,0,null,0,"call"]},
pR:{"^":"a:0;a",
$1:[function(a){var z=J.e(a)
if(z.ga7(a)!==0)return
z.a2(a)
z=this.a
z.c.bS(z)},null,null,2,0,null,0,"call"]},
pS:{"^":"a:0;a",
$1:[function(a){var z=J.e(a)
if(z.ga7(a)!==0)return
z.a2(a)
z=this.a
z.c.bT(z)},null,null,2,0,null,0,"call"]},
pT:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.e(a)
if(z.ga7(a)!==0)return
y=this.a
y.c.c0(y)
z.a2(a)},null,null,2,0,null,0,"call"]},
pU:{"^":"a:0;a",
$1:[function(a){var z,y
z=J.e(a)
if(z.ga7(a)!==0)return
y=this.a.f.style
y.display="block"
z.a2(a)},null,null,2,0,null,0,"call"]},
pV:{"^":"a:0;",
$1:[function(a){var z=J.e(a)
z.a2(a)
z.aS(a)},null,null,2,0,null,0,"call"]},
pW:{"^":"a:0;a",
$1:[function(a){var z=this.a
z.c.bz(z)},null,null,2,0,null,0,"call"]},
pX:{"^":"a:0;a",
$1:[function(a){var z=this.a.f.style
z.display="none"},null,null,2,0,null,0,"call"]},
aM:{"^":"i;E:a>,ah:b<,d3:c<,bc:d<,cW:e<,fL:f<,hE:r<,cM:x>,e4:y<,z,eR:Q<",
w:function(a){var z
for(z=1;z<=this.b;++z)a.$2(this,z)},
aj:function(a,b,c,d,e,f){var z,y,x,w
z=this.e
y=a-1
if(y<0||y>=z.length)return H.c(z,y)
z=z[y]
x=S.i7(b,c,d,e,f)
w=this.e
if(y>=w.length)return H.c(w,y)
x.e=w[y].length
z.push(x)},
bh:function(a,b,c,d){return this.aj(a,b,c,d,1,0)},
p:["eG",function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
for(z=S.aO,y=[z,P.x],x=0;x<this.b;++x){w=this.r
if(x>=20)return H.c(w,x)
if(w[x]==null){v=new S.j(null,null)
v.a=C.e.j(0)
v.b=C.e.j(0)
w[x]=v}w=this.Q
if(w[x]==null)w[x]=x+1
u=new H.P(0,null,null,null,null,null,0,y)
t=P.V(null,null,null,z)
w=this.e
if(x>=w.length)return H.c(w,x)
w=w[x]
v=w.length
s=0
for(;s<w.length;w.length===v||(0,H.r)(w),++s){r=J.cI(w[s])
t.S(0,r)
r.ge5()
if(!u.I(r))u.i(0,r,0)
u.i(0,r,J.B(u.h(0,r),1))}this.y[x]=u
this.z[x]=t
q=new S.j(null,null)
q.a=C.e.j(0)
q.b=C.e.j(0)
p=0
o=1
while(!0){w=this.d
if(x>=w.length)return H.c(w,x)
w=w[x]
v=w.length
if(!(o<=v))break
n=w[o-1]
m=w[o%v]
w=J.e(n)
v=J.e(m)
l=J.J(J.q(w.gv(n),v.gt(m)),J.q(w.gt(n),v.gv(m)))
q.a=J.B(q.a,J.q(J.B(w.gv(n),v.gv(m)),l))
q.b=J.B(q.b,J.q(J.B(w.gt(n),v.gt(m)),l))
if(typeof l!=="number")return H.C(l)
p+=l;++o}p*=0.5
w=6*p
q.a=J.aT(q.a,w)
q.b=J.aT(q.b,w)
this.x[x]=Math.abs(p)
this.f[x]=q}this.hI()}],
hI:function(){var z,y,x,w,v,u,t,s
for(z=0;z<this.b;++z){y=this.r
if(z>=20)return H.c(y,z)
x=y[z]
y=this.d
if(z>=y.length)return H.c(y,z)
y=y[z]
w=y.length
v=0
for(;v<y.length;y.length===w||(0,H.r)(y),++v){u=y[v]
t=J.e(u)
t.sv(u,J.J(t.gv(u),x.a))
t.st(u,J.J(t.gt(u),x.b))}y=this.e
if(z>=y.length)return H.c(y,z)
y=y[z]
w=y.length
v=0
for(;v<y.length;y.length===w||(0,H.r)(y),++v){s=y[v]
t=J.e(s)
t.sv(s,J.J(t.gv(s),x.a))
t.st(s,J.J(t.gt(s),x.b))}y=this.f[z]
y.a=J.J(y.a,x.a)
y=this.f[z]
y.b=J.J(y.b,x.b)
x.a=0
x.b=0}},
eh:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=new S.iV(null,null)
z.a=Math.sin(H.A(b))
z.b=Math.cos(H.A(b))
for(y=c!=null,x=0;x<this.b;++x){if(y&&!C.f.M(c,x))continue
if(x>=20)return H.c(this.f,x)
w=this.d
if(x>=w.length)return H.c(w,x)
w=w[x]
v=w.length
u=0
for(;u<w.length;w.length===v||(0,H.r)(w),++u){t=w[u]
s=J.e(t)
r=s.gv(t)
q=s.gt(t)
p=z.b
r=J.q(r,p)
o=z.a
n=J.J(r,J.q(q,o))
q=s.gv(t)
r=s.gt(t)
m=J.B(J.q(q,o),J.q(r,p))
s.sv(t,n)
s.st(t,m)}w=this.e
if(x>=w.length)return H.c(w,x)
w=w[x]
v=w.length
u=0
for(;u<w.length;w.length===v||(0,H.r)(w),++u){l=w[u]
s=J.e(l)
r=s.gv(l)
q=s.gt(l)
p=z.b
r=J.q(r,p)
o=z.a
n=J.J(r,J.q(q,o))
q=s.gv(l)
r=s.gt(l)
m=J.B(J.q(q,o),J.q(r,p))
s.sv(l,n)
s.st(l,m)
s=l.gau().a
r=l.gau().b
n=J.J(J.q(s,p),J.q(r,o))
r=l.gau().a
s=l.gau().b
m=J.B(J.q(r,o),J.q(s,p))
l.gau().a=n
l.gau().b=m}k=this.r[x]
w=k.a
v=k.b
s=z.b
w=J.q(w,s)
r=z.a
n=J.J(w,J.q(v,r))
v=k.a
w=k.b
m=J.B(J.q(v,r),J.q(w,s))
k.a=n
k.b=m}},
aU:function(a,b){return this.eh(a,b,null)},
cp:function(a,b,c){var z,y,x,w,v
z=Math.min(20,this.b)
this.b=z
this.b=Math.min(20,z)
z=new Array(20)
z.fixed$length=Array
this.d=H.E(z,[[P.m,S.j]])
z=new Array(20)
z.fixed$length=Array
this.e=H.E(z,[[P.m,S.aH]])
z=[S.j]
this.f=H.E(new Array(20),z)
this.r=H.E(new Array(20),z)
y=[P.a6]
this.x=H.E(new Array(20),y)
this.y=H.E(new Array(20),[[P.F,S.aO,P.x]])
this.z=H.E(new Array(20),[[P.q5,S.aO]])
this.Q=H.E(new Array(20),y)
for(y=[S.aH],x=0;x<this.b;++x){w=this.d
v=H.E([],z)
if(x>=w.length)return H.c(w,x)
w[x]=v
v=this.e
w=H.E([],y)
if(x>=v.length)return H.c(v,x)
v[x]=w}},
D:{
u:function(a,b,c){var z=new S.aM(a,b,c,null,null,null,null,null,null,null,null)
z.cp(a,b,c)
return z}}},
j:{"^":"i;v:a*,t:b*",
J:function(){var z,y,x
z=this.a
y=this.b
x=new S.j(null,null)
x.a=J.ai(z)
x.b=J.ai(y)
return x}},
aH:{"^":"j;R:c*,au:d<,aH:e>,a,b",
J:function(){var z,y,x,w
z=this.c
y=this.a
x=this.b
w=this.d
return S.i7(z,y,x,w.a,w.b)},
f_:function(a,b,c,d,e){var z,y,x,w
z=J.O(d)
y=J.O(e)
x=Math.sqrt(H.A(J.B(z.X(d,d),y.X(e,e))))
z=z.aI(d,x)
y=y.aI(e,x)
w=new S.j(null,null)
w.a=C.a.j(z)
w.b=C.a.j(y)
this.d=w},
D:{
i7:function(a,b,c,d,e){var z=new S.aH(a,null,0,null,null)
z.a=J.ai(b)
z.b=J.ai(c)
z.f_(a,b,c,d,e)
return z}}},
aO:{"^":"i;ca:a<,fN:b<,dU:c<,E:d>,e7:e>,f,e5:r<"},
rS:{"^":"a:1;",
$2:function(a,b){return S.at(a,b,1,1,null,null,null,null,!1,!0)}},
rU:{"^":"a:1;",
$2:function(a,b){return S.aJ(a,b,4,!1,!1,C.b)}},
tU:{"^":"a:1;",
$2:function(a,b){return S.aJ(a,b,8,!0,!1,C.b)}},
tT:{"^":"a:8;",
$2:function(a,b){var z,y,x,w,v,u,t
z=1/(1+Math.sqrt(2))*b
y=0.55*b*0.5
x=a.Q
w=b-1
if(w<0||w>=20)return H.c(x,w)
x[w]=y*2
x=-y
v=-z
u=a.d
if(w>=u.length)return H.c(u,w)
u=u[w]
t=new S.j(null,null)
t.a=C.d.j(x)
t.b=C.d.j(v)
u.push(t)
t=a.d
if(w>=t.length)return H.c(t,w)
t=t[w]
u=new S.j(null,null)
u.a=C.d.j(x)
u.b=C.d.j(z)
t.push(u)
u=a.d
if(w>=u.length)return H.c(u,w)
u=u[w]
t=new S.j(null,null)
t.a=C.d.j(y)
t.b=C.d.j(z*0.5)
u.push(t)
t=a.d
if(w>=t.length)return H.c(t,w)
w=t[w]
t=new S.j(null,null)
t.a=C.d.j(y)
t.b=C.d.j(v*0.5)
w.push(t)
a.bh(b,C.m,y,0)
a.aj(b,C.n,x,0,-1,0)}},
tS:{"^":"a:8;",
$2:function(a,b){var z,y,x,w,v,u,t,s
z=b*0.25
y=z*0.5
if(C.e.cg(b,2)===1&&b!==1)z=(b+1)*0.25
x=-b
w=a.r
v=b-1
u=new S.j(null,null)
u.a=C.a.j(x*0.5)
u.b=C.e.j(0)
if(v<0||v>=20)return H.c(w,v)
w[v]=u
a.Q[v]=b*0.5
u=-z
w=a.d
if(v>=w.length)return H.c(w,v)
w=w[v]
t=new S.j(null,null)
t.a=C.e.j(x)
t.b=C.a.j(u)
w.push(t)
t=a.d
if(v>=t.length)return H.c(t,v)
t=t[v]
w=new S.j(null,null)
w.a=C.e.j(x)
w.b=C.a.j(z)
t.push(w)
w=a.d
if(v>=w.length)return H.c(w,v)
w=w[v]
t=new S.j(null,null)
t.a=C.e.j(0)
t.b=C.a.j(z)
w.push(t)
t=a.d
if(v>=t.length)return H.c(t,v)
t=t[v]
w=new S.j(null,null)
w.a=C.e.j(0)
w.b=C.a.j(y)
t.push(w)
w=a.d
if(v>=w.length)return H.c(w,v)
w=w[v]
t=new S.j(null,null)
t.a=C.e.j(b)
t.b=C.a.j(y)
w.push(t)
t=-y
w=a.d
if(v>=w.length)return H.c(w,v)
w=w[v]
s=new S.j(null,null)
s.a=C.e.j(b)
s.b=C.a.j(t)
w.push(s)
s=a.d
if(v>=s.length)return H.c(s,v)
s=s[v]
w=new S.j(null,null)
w.a=C.e.j(0)
w.b=C.a.j(t)
s.push(w)
w=a.d
if(v>=w.length)return H.c(w,v)
v=w[v]
w=new S.j(null,null)
w.a=C.e.j(0)
w.b=C.a.j(u)
v.push(w)
a.bh(b,C.l,b,0)
S.G(a,b,x,z,x,u,!0,C.b,!1,1)
S.G(a,b,x,u,0,u,!0,C.b,!1,1)
S.G(a,b,0,z,x,z,!0,C.b,!1,1)}},
tR:{"^":"a:1;",
$2:function(a,b){return S.eH(a,b,0.25,44,!1,!0)}},
tQ:{"^":"a:8;",
$2:function(a,b){switch(b){case 1:S.at(a,b,1,1-1/Math.sqrt(2),C.b,C.b,C.b,C.b,!0,!1)
break
case 2:S.at(a,b,1,0.5,C.b,C.b,C.b,C.b,!0,!1)
break
case 3:S.at(a,b,1,1/Math.sqrt(2),C.b,C.b,C.b,C.b,!0,!1)
break
case 4:S.at(a,b,2,2-2/Math.sqrt(2),C.b,C.b,C.b,C.b,!0,!1)
break
case 5:S.at(a,b,2,2/Math.sqrt(2),C.b,C.b,C.b,C.b,!0,!1)
break}}},
tP:{"^":"a:1;",
$2:function(a,b){return S.aJ(a,b,6,!1,!1,C.b)}},
tO:{"^":"a:1;",
$2:function(a,b){return S.aJ(a,b,3,!1,!1,C.b)}},
tN:{"^":"a:8;",
$2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=b*0.5
y=1/(1+Math.sqrt(2))*0.5*b
Math.sqrt(2)
x=-z
w=a.d
v=b-1
if(v<0||v>=w.length)return H.c(w,v)
w=w[v]
u=new S.j(null,null)
u.a=C.a.j(x)
u.b=C.a.j(x)
w.push(u)
u=a.d
if(v>=u.length)return H.c(u,v)
u=u[v]
w=new S.j(null,null)
w.a=C.a.j(x)
w.b=C.a.j(z)
u.push(w)
w=a.d
if(v>=w.length)return H.c(w,v)
w=w[v]
u=new S.j(null,null)
u.a=C.d.j(y)
u.b=C.a.j(z)
w.push(u)
u=a.d
if(v>=u.length)return H.c(u,v)
u=u[v]
w=new S.j(null,null)
w.a=C.a.j(z)
w.b=C.d.j(y)
u.push(w)
w=-y
u=a.d
if(v>=u.length)return H.c(u,v)
u=u[v]
t=new S.j(null,null)
t.a=C.a.j(z)
t.b=C.d.j(w)
u.push(t)
t=a.d
if(v>=t.length)return H.c(t,v)
t=t[v]
u=new S.j(null,null)
u.a=C.d.j(y)
u.b=C.a.j(x)
t.push(u)
S.G(a,b,x,z,x,x,!0,C.b,!1,1)
S.G(a,b,x,x,z,x,!0,C.b,!1,1)
S.G(a,b,z,x,z,z,!0,C.b,!1,1)
S.G(a,b,z,z,x,z,!0,C.b,!1,1)
s=[]
u=a.e
if(v>=u.length)return H.c(u,v)
u=u[v]
t=u.length
r=0
for(;r<u.length;u.length===t||(0,H.r)(u),++r){q=u[r]
p=J.e(q)
if(J.v(p.gt(q),x)||J.v(p.gt(q),z))if(J.S(p.gv(q),y))s.push(q)
if(J.v(p.gv(q),z))p=J.S(p.gt(q),y)||J.b2(p.gt(q),w)
else p=!1
if(p)s.push(q)}for(u=s.length,r=0;r<s.length;s.length===u||(0,H.r)(s),++r){q=s[r]
t=a.e
if(v>=t.length)return H.c(t,v)
t=t[v];(t&&C.f).an(t,q)}S.G(a,b,y,x,z,w,!0,C.b,!1,1)
S.G(a,b,z,y,y,z,!0,C.b,!1,1)}},
tL:{"^":"a:8;",
$2:function(a,b){var z,y,x,w,v,u
z=b*0.5
y=1/(1+Math.sqrt(2))*0.5*b
Math.sqrt(2)
x=-z
w=a.d
v=b-1
if(v<0||v>=w.length)return H.c(w,v)
w=w[v]
u=new S.j(null,null)
u.a=C.a.j(x)
u.b=C.a.j(x)
w.push(u)
u=a.d
if(v>=u.length)return H.c(u,v)
u=u[v]
w=new S.j(null,null)
w.a=C.a.j(x)
w.b=C.a.j(z)
u.push(w)
w=a.d
if(v>=w.length)return H.c(w,v)
w=w[v]
u=new S.j(null,null)
u.a=C.d.j(y)
u.b=C.a.j(z)
w.push(u)
u=a.d
if(v>=u.length)return H.c(u,v)
u=u[v]
w=new S.j(null,null)
w.a=C.a.j(z)
w.b=C.d.j(y)
u.push(w)
w=a.d
if(v>=w.length)return H.c(w,v)
w=w[v]
u=new S.j(null,null)
u.a=C.a.j(z)
u.b=C.d.j(-y)
w.push(u)
u=a.d
if(v>=u.length)return H.c(u,v)
v=u[v]
u=new S.j(null,null)
u.a=C.d.j(y)
u.b=C.a.j(x)
v.push(u)
a.aj(b,C.j,x,0,-1,0)
a.aj(b,C.j,0,x,0,-1)
a.aj(b,C.j,0,z,0,-1)}},
tK:{"^":"a:8;",
$2:function(a,b){var z,y,x,w,v,u,t
z=b*0.5
y=b*(1/(1+Math.sqrt(2)))*0.5
x=a.Q
w=b-1
if(w<0||w>=20)return H.c(x,w)
x[w]=0.5*b
x=a.r
v=new S.j(null,null)
v.a=C.e.j(0)
v.b=C.e.j(0)
x[w]=v
v=-z
x=-y
u=a.d
if(w>=u.length)return H.c(u,w)
u=u[w]
t=new S.j(null,null)
t.a=C.a.j(v)
t.b=C.a.j(x)
u.push(t)
t=a.d
if(w>=t.length)return H.c(t,w)
t=t[w]
u=new S.j(null,null)
u.a=C.a.j(v)
u.b=C.a.j(y)
t.push(u)
u=a.d
if(w>=u.length)return H.c(u,w)
u=u[w]
t=new S.j(null,null)
t.a=C.a.j(z)
t.b=C.a.j(z)
u.push(t)
t=a.d
if(w>=t.length)return H.c(t,w)
t=t[w]
u=new S.j(null,null)
u.a=C.e.j(0)
u.b=C.e.j(0)
t.push(u)
u=a.d
if(w>=u.length)return H.c(u,w)
w=u[w]
u=new S.j(null,null)
u.a=C.a.j(z)
u.b=C.a.j(v)
w.push(u)
S.G(a,b,v,y,v,x,!0,C.b,!1,1)}},
tJ:{"^":"a:8;",
$2:function(a,b){var z,y,x,w,v,u,t
z=b+1
y=-z*0.5
x=a.d
w=b-1
if(w<0||w>=x.length)return H.c(x,w)
x=x[w]
v=new S.j(null,null)
v.a=C.d.j(-0.25)
v.b=C.a.j(y)
x.push(v)
z*=0.5
v=a.d
if(w>=v.length)return H.c(v,w)
v=v[w]
x=new S.j(null,null)
x.a=C.d.j(-0.25)
x.b=C.a.j(z)
v.push(x)
x=b*0.5
v=a.d
if(w>=v.length)return H.c(v,w)
v=v[w]
u=new S.j(null,null)
u.a=C.d.j(0.25)
u.b=C.a.j(x)
v.push(u)
u=-b*0.5
v=a.d
if(w>=v.length)return H.c(v,w)
v=v[w]
t=new S.j(null,null)
t.a=C.d.j(0.25)
t.b=C.a.j(u)
v.push(t)
t=a.Q
if(w>=20)return H.c(t,w)
t[w]=0.5
w=x+0.25
a.aj(b,C.b,0,-w,1,-1)
a.aj(b,C.b,0,w,1,1)
S.G(a,b,-0.25,z,-0.25,y,!0,C.b,!1,1)
S.G(a,b,0.25,u,0.25,x,!0,C.b,!1,1)}},
tI:{"^":"a:1;",
$2:function(a,b){return S.aJ(a,b,5,!1,!1,C.b)}},
tH:{"^":"a:1;",
$2:function(a,b){return S.k2(a,b,108)}},
tG:{"^":"a:1;",
$2:function(a,b){return S.k2(a,b,36)}},
tF:{"^":"a:8;",
$2:function(a,b){var z,y,x,w,v,u,t,s
z=Math.cos(0.3141592653589793)*b*0.5
y=Math.sin(0.3141592653589793)
x=b*0.5
w=a.Q
v=b-1
if(v<0||v>=20)return H.c(w,v)
w[v]=x
w=z*0.5
u=a.d
if(v>=u.length)return H.c(u,v)
u=u[v]
t=new S.j(null,null)
t.a=C.a.j(w)
t.b=C.a.j(-x)
u.push(t)
t=-z*0.5
y=x+y*b*0.5
u=a.d
if(v>=u.length)return H.c(u,v)
u=u[v]
s=new S.j(null,null)
s.a=C.a.j(t)
s.b=C.a.j(-y)
u.push(s)
s=a.d
if(v>=s.length)return H.c(s,v)
s=s[v]
u=new S.j(null,null)
u.a=C.a.j(t)
u.b=C.a.j(y)
s.push(u)
u=a.d
if(v>=u.length)return H.c(u,v)
v=u[v]
u=new S.j(null,null)
u.a=C.a.j(w)
u.b=C.a.j(x)
v.push(u)
a.bh(b,C.m,w,0)
a.aj(b,C.n,t,0,-1,0)}},
tE:{"^":"a:1;",
$2:function(a,b){return S.eG(a,b,C.p,C.l)}},
tD:{"^":"a:1;",
$2:function(a,b){return S.eG(a,b,C.m,C.n)}},
tC:{"^":"a:8;",
$2:function(a,b){var z,y,x,w,v
z=b*0.5
y=-z
x=a.d
w=b-1
if(w<0||w>=x.length)return H.c(x,w)
x=x[w]
v=new S.j(null,null)
v.a=C.a.j(y)
v.b=C.a.j(y)
x.push(v)
v=a.d
if(w>=v.length)return H.c(v,w)
v=v[w]
x=new S.j(null,null)
x.a=C.a.j(y)
x.b=C.a.j(z)
v.push(x)
x=a.d
if(w>=x.length)return H.c(x,w)
x=x[w]
v=new S.j(null,null)
v.a=C.a.j(z)
v.b=C.a.j(z)
x.push(v)
v=a.r
x=new S.j(null,null)
x.a=C.d.j(y/3)
x.b=C.d.j(z/3)
if(w>=20)return H.c(v,w)
v[w]=x
a.Q[w]=b/2
S.G(a,b,y,z,y,y,!0,C.b,!1,1)
S.G(a,b,z,z,y,z,!0,C.b,!1,1)
S.G(a,b,y,y,z,z,!0,C.b,!1,1)}},
tA:{"^":"a:1;",
$2:function(a,b){return S.at(a,b,1,0.4,C.i,C.b,null,C.i,!1,!0)}},
tz:{"^":"a:1;",
$2:function(a,b){return S.at(a,b,1,0.5,C.b,C.b,C.l,C.b,!1,!0)}},
ty:{"^":"a:1;",
$2:function(a,b){return S.at(a,b,1,0.25,null,C.p,C.l,null,!1,!0)}},
tx:{"^":"a:1;",
$2:function(a,b){return S.at(a,b,1/b,1,C.b,C.b,C.b,C.b,!1,!1)}},
tw:{"^":"a:1;",
$2:function(a,b){return S.b0(a,b,72,!0,C.b,!1)}},
tv:{"^":"a:1;",
$2:function(a,b){return S.b0(a,b,36,!0,C.b,!1)}},
tu:{"^":"a:8;",
$2:function(a,b){var z,y,x,w,v,u
z=b*0.5
y=-b
x=a.d
w=b-1
if(w<0||w>=x.length)return H.c(x,w)
x=x[w]
v=new S.j(null,null)
v.a=C.a.j(z)
v.b=C.e.j(y)
x.push(v)
v=-z
x=a.d
if(w>=x.length)return H.c(x,w)
x=x[w]
u=new S.j(null,null)
u.a=C.a.j(v)
u.b=C.e.j(b)
x.push(u)
u=a.d
if(w>=u.length)return H.c(u,w)
u=u[w]
x=new S.j(null,null)
x.a=C.a.j(z)
x.b=C.e.j(b)
u.push(x)
x=a.r
u=new S.j(null,null)
u.a=C.d.j(z/3)
u.b=C.d.j(b/3)
if(w>=20)return H.c(x,w)
x[w]=u
a.Q[w]=2*b/3
S.G(a,b,v,b,z,y,!0,C.b,!1,1)
S.G(a,b,z,b,v,b,!0,C.b,!1,1)
S.G(a,b,z,y,z,b,!0,C.b,!1,1)}},
tt:{"^":"a:8;",
$2:function(a,b){var z,y,x,w,v,u
z=b*0.5
y=-z
x=-b
w=a.d
v=b-1
if(v<0||v>=w.length)return H.c(w,v)
w=w[v]
u=new S.j(null,null)
u.a=C.a.j(y)
u.b=C.e.j(x)
w.push(u)
u=a.d
if(v>=u.length)return H.c(u,v)
u=u[v]
w=new S.j(null,null)
w.a=C.a.j(y)
w.b=C.e.j(b)
u.push(w)
w=a.d
if(v>=w.length)return H.c(w,v)
w=w[v]
u=new S.j(null,null)
u.a=C.a.j(z)
u.b=C.e.j(b)
w.push(u)
u=a.r
w=new S.j(null,null)
w.a=C.d.j(y/3)
w.b=C.d.j(b/3)
if(v>=20)return H.c(u,v)
u[v]=w
a.Q[v]=2*b/3
S.G(a,b,y,b,y,x,!0,C.b,!1,1)
S.G(a,b,z,b,y,b,!0,C.b,!1,1)
S.G(a,b,y,x,z,b,!0,C.b,!1,1)}},
tp:{"^":"a:1;",
$2:function(a,b){return S.aP(a,b,1,45,!0,C.b)}},
to:{"^":"a:1;",
$2:function(a,b){return S.aP(a,b,2,30,!0,C.b)}},
tn:{"^":"a:1;",
$2:function(a,b){return S.aP(a,b,3,30,!0,C.b)}},
tm:{"^":"a:1;",
$2:function(a,b){return S.aP(a,b,4,30,!0,C.b)}},
ts:{"^":"a:1;",
$2:function(a,b){return S.at(a,b,0.45,0.3333333333333333*b,C.b,C.b,C.b,C.b,!0,!1)}},
tr:{"^":"a:1;",
$2:function(a,b){return S.at(a,b,1,0.75,C.b,C.b,C.i,C.b,!1,!0)}},
tl:{"^":"a:1;",
$2:function(a,b){return S.dh(a,b,22.5,!1)}},
tk:{"^":"a:1;",
$2:function(a,b){return S.dh(a,b,22.5,!0)}},
tj:{"^":"a:1;",
$2:function(a,b){return S.eG(a,b,null,C.j)}},
ti:{"^":"a:1;",
$2:function(a,b){return S.at(a,b,0.5/b,1,null,C.b,C.q,null,!1,!0)}},
th:{"^":"a:1;",
$2:function(a,b){return S.aP(a,b,1,45,!1,C.b)}},
tg:{"^":"a:1;",
$2:function(a,b){return S.aP(a,b,2,30,!1,C.b)}},
te:{"^":"a:1;",
$2:function(a,b){return S.aP(a,b,3,30,!1,C.b)}},
td:{"^":"a:1;",
$2:function(a,b){return S.aP(a,b,4,30,!1,C.b)}},
tc:{"^":"a:1;",
$2:function(a,b){return S.b0(a,b,25,!0,C.b,!1)}},
tb:{"^":"a:1;",
$2:function(a,b){return S.b0(a,b,25,!1,C.j,!0)}},
ta:{"^":"a:1;",
$2:function(a,b){return S.b0(a,b,13,!0,C.b,!1)}},
t9:{"^":"a:1;",
$2:function(a,b){return S.b0(a,b,13,!1,C.j,!0)}},
t8:{"^":"a:1;",
$2:function(a,b){return S.b0(a,b,6.428571428571429,!0,C.b,!1)}},
t7:{"^":"a:1;",
$2:function(a,b){return S.aJ(a,b,7,!0,!1,C.i)}},
t6:{"^":"a:1;",
$2:function(a,b){return S.aJ(a,b,7,!0,!1,C.b)}},
t5:{"^":"a:1;",
$2:function(a,b){return S.aP(a,b,2,30,!1,C.i)}},
t3:{"^":"a:1;",
$2:function(a,b){return S.aP(a,b,3,30,!1,C.i)}},
t2:{"^":"a:1;",
$2:function(a,b){return S.aP(a,b,4,30,!1,C.i)}},
t1:{"^":"a:1;",
$2:function(a,b){return S.at(a,b,0.25/b,0.25,C.b,C.b,C.b,C.b,!1,!1)}},
t0:{"^":"a:1;",
$2:function(a,b){return S.b0(a,b,3,!0,C.b,!1)}},
t_:{"^":"a:1;",
$2:function(a,b){return S.b0(a,b,25,!1,C.p,!0)}},
rZ:{"^":"a:1;",
$2:function(a,b){return S.aJ(a,b,9,!0,!1,C.b)}},
rY:{"^":"a:1;",
$2:function(a,b){return S.b0(a,b,80,!0,C.b,!1)}},
rX:{"^":"a:8;",
$2:function(a,b){var z,y,x,w,v,u,t,s
z=b*0.25
y=b*0.4936
x=b*0.0436
w=a.Q
v=b-1
if(v<0||v>=20)return H.c(w,v)
w[v]=y
w=-z
u=-y
t=a.d
if(v>=t.length)return H.c(t,v)
t=t[v]
s=new S.j(null,null)
s.a=C.a.j(w)
s.b=C.a.j(u)
t.push(s)
s=a.d
if(v>=s.length)return H.c(s,v)
s=s[v]
t=new S.j(null,null)
t.a=C.a.j(w)
t.b=C.a.j(y)
s.push(t)
t=a.d
if(v>=t.length)return H.c(t,v)
t=t[v]
s=new S.j(null,null)
s.a=C.a.j(z)
s.b=C.a.j(y-x)
t.push(s)
s=a.d
if(v>=s.length)return H.c(s,v)
v=s[v]
s=new S.j(null,null)
s.a=C.a.j(z)
s.b=C.a.j(u+x)
v.push(s)
a.bh(b,C.m,z,0)
a.aj(b,C.n,w,0,-1,0)}},
rW:{"^":"a:1;",
$2:function(a,b){return S.at(a,b,0.5,0.5,C.b,C.b,C.b,C.b,!1,!1)}},
rV:{"^":"a:1;",
$2:function(a,b){return S.aJ(a,b,4,!1,!1,C.i)}},
tX:{"^":"a:1;",
$2:function(a,b){return S.aJ(a,b,4,!1,!1,C.j)}},
tW:{"^":"a:1;",
$2:function(a,b){return S.dh(a,b,30,!1)}},
tV:{"^":"a:1;",
$2:function(a,b){return S.dh(a,b,30,!0)}},
tM:{"^":"a:1;",
$2:function(a,b){return S.aJ(a,b,8,!0,!0,C.b)}},
tB:{"^":"a:1;",
$2:function(a,b){return S.aJ(a,b,4,!1,!0,C.b)}},
tq:{"^":"a:8;",
$2:function(a,b){var z,y,x,w,v,u,t,s
z=b*0.25
y=z*0.25
x=-b
w=a.r
v=b-1
u=new S.j(null,null)
u.a=C.a.j(x*0.5)
u.b=C.e.j(0)
if(v<0||v>=20)return H.c(w,v)
w[v]=u
a.Q[v]=b*0.5
u=-z
w=a.d
if(v>=w.length)return H.c(w,v)
w=w[v]
t=new S.j(null,null)
t.a=C.e.j(x)
t.b=C.a.j(u)
w.push(t)
t=a.d
if(v>=t.length)return H.c(t,v)
t=t[v]
w=new S.j(null,null)
w.a=C.e.j(x)
w.b=C.a.j(z)
t.push(w)
w=a.d
if(v>=w.length)return H.c(w,v)
w=w[v]
t=new S.j(null,null)
t.a=C.e.j(b)
t.b=C.a.j(z)
w.push(t)
t=a.d
if(v>=t.length)return H.c(t,v)
t=t[v]
w=new S.j(null,null)
w.a=C.e.j(b)
w.b=C.a.j(y)
t.push(w)
w=a.d
if(v>=w.length)return H.c(w,v)
w=w[v]
t=new S.j(null,null)
t.a=C.e.j(0)
t.b=C.a.j(y)
w.push(t)
t=-y
w=a.d
if(v>=w.length)return H.c(w,v)
w=w[v]
s=new S.j(null,null)
s.a=C.e.j(0)
s.b=C.a.j(t)
w.push(s)
s=a.d
if(v>=s.length)return H.c(s,v)
s=s[v]
w=new S.j(null,null)
w.a=C.e.j(b)
w.b=C.a.j(t)
s.push(w)
w=a.d
if(v>=w.length)return H.c(w,v)
v=w[v]
w=new S.j(null,null)
w.a=C.e.j(b)
w.b=C.a.j(u)
v.push(w)
a.bh(b,C.l,0,0)
S.G(a,b,x,z,x,u,!0,C.b,!1,1)
S.G(a,b,x,u,b,u,!0,C.b,!1,1)
S.G(a,b,b,z,x,z,!0,C.b,!1,1)}},
tf:{"^":"a:1;",
$2:function(a,b){return S.eH(a,b,0.25,45,!0,!0)}},
t4:{"^":"a:1;",
$2:function(a,b){return S.eH(a,b,0.5,75.75,!1,!0)}},
qe:{"^":"a:26;",
$2:function(a,b){return J.bu(J.a8(a),J.a8(b))}},
qf:{"^":"i;aO:a<,b,c,d,e,f,r,x,E:y>,z,Q",
at:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=document
y=z.createElement("div")
y.className="ui shipbox"
x=z.createElement("div")
x.className="shipcanvascontainer"
y.appendChild(x)
w=z.createElement("div")
w.className="shipbgleft"
x.appendChild(w)
v=z.createElement("div")
v.className="shipbgmid"
x.appendChild(v)
u=z.createElement("div")
u.className="shipbgright"
x.appendChild(u)
x.appendChild(this.z.c)
t=z.createElement("span")
t.className="shipname"
t.textContent="Ship name"
this.b=t
x.appendChild(t)
s=z.createElement("span")
s.className="shipfaction"
s.textContent="Faction"
this.c=s
x.appendChild(s)
r=z.createElement("span")
r.className="shipdirty"
C.k.L(r,'<i class="glyphicon glyphicon-floppy-remove"></i>')
r.title="This ship has had some block IDs rearranged and needs to be saved to keep the changes"
this.d=r
x.appendChild(r)
q=z.createElement("div")
q.className="menu"
C.c.L(q,'<div class="menuicon"><i class="glyphicon glyphicon-floppy-disk"></i></div>Save')
S.K(q,new S.qk(this))
y.appendChild(q)
p=z.createElement("div")
p.className="menu"
C.c.L(p,'<div class="menuicon"><i class="glyphicon glyphicon-refresh"></i></div>Redraw')
S.K(p,new S.ql(this))
y.appendChild(p)
o=z.createElement("div")
o.className="menu"
C.c.L(o,'<div class="menuicon"><i class="glyphicon glyphicon-trash"></i></div>Remove')
S.K(o,new S.qm(this))
y.appendChild(o)
n=z.createElement("div")
n.className="shipoverlay"
C.c.L(n,"Remove this ship?<br/>Any unsaved id changes<br/>will be lost.<br/><br/>")
m=z.createElement("div")
m.className="deletescreenbutton deleteyes glyphicon glyphicon-ok"
m.title="Remove the ship"
S.K(m,new S.qn(this))
n.appendChild(m)
l=z.createElement("div")
l.className="deletescreenbutton deleteno glyphicon glyphicon-remove"
l.title="Keep the ship"
S.K(l,new S.qo(this))
n.appendChild(l)
this.e=n
y.appendChild(n)
this.a=y
z.querySelector("#shiplist").appendChild(y)
this.a0()
this.cT()
S.dj()},
a0:function(){var z,y,x,w,v,u
if(this.a!=null){this.b.textContent=this.y
y=$.bc.c
x=y.length
w=0
while(!0){if(!(w<y.length)){z=!1
break}v=y[w]
if(J.v(v.gT().u("ident"),this.x)){u=v.gT().u("name")
if(J.dI(u)!==!0){this.c.textContent=u
z=!0}else z=!1
break}y.length===x||(0,H.r)(y);++w}if(!z)this.c.textContent="F"+H.d(this.x)}y=this.Q
x=this.d
if(y){y=x.style
y.visibility="visible"}else{y=x.style
y.visibility="hidden"}},
hf:function(){var z,y,x,w,v,u,t
z=P.an()
for(y=$.au.c,x=y.length,w=this.r,v=0;v<y.length;y.length===x||(0,H.r)(y),++v){u=y[v]
t=u.gT().u("ident")
if(w.M(0,t))z.i(0,t,u)}return z},
cT:function(){var z,y,x,w,v,u,t
z=this.hf()
if(z.gk(z)!==this.r.a){y=this.z
J.aD(y.d,0,0,y.a,y.b)
y=this.z.d
x=J.e(y)
x.saP(y,"#A0A0A0")
x.sc4(y,""+C.a.aG(this.z.b*0.35)+"px Droid Sans Mono")
x.sd5(y,"center")
w=this.z
x.bm(y,"?",w.a*0.5,w.b*0.5)
x.sc4(y,"12px Droid Sans Mono")
w=this.z
x.bm(y,"Unable to draw ship",w.a*0.5,w.b*0.65)
w=this.z
x.bm(y,"due to missing blocks",w.a*0.5,w.b*0.65+18)
return}v=[]
for(y=this.f,x=y.length,u=0;u<y.length;y.length===x||(0,H.r)(y),++u){t=y[u]
v.push(new S.lG(z.h(0,t.a),J.q(t.b,0.1),J.q(t.c,0.1),t.d))}y=this.z
J.aD(y.d,0,0,y.a,y.b)
this.z.hc(v,-0.39269908169872414,10)},
hM:function(a){var z,y,x,w,v,u,t
z=this.r
z.aB(0)
for(y=this.f,x=y.length,w=!1,v=0;v<y.length;y.length===x||(0,H.r)(y),++v){u=y[v]
if(a.I(u.a)){t=u.a
if(!J.v(t,a.h(0,t))){u.a=a.h(0,u.a)
w=!0}}if(!z.M(0,u.a))z.S(0,u.a)}if(w){this.Q=!0
this.a0()}},
aF:function(){var z=this.a;(z&&C.c).aA(z)
C.f.an($.$get$aQ(),this)
S.dj()},
f8:function(a){var z,y,x,w,v,u,t
z=S.c8(190,190)
z.e=!1
this.z=z
if(J.aA(a).e2(a,".lua"))a=C.h.aX(a,0,a.length-4)
this.x=0
y=a.split("_")
if(y.length>0){x=H.Q(y[0],null,new S.qj())
if(!J.v(x,-1))this.x=x
C.f.bj(y,"removeAt")
z=y.length
if(0>=z)H.R(P.bB(0,null,null))
y.splice(0,1)[0]}for(z=y.length,w="",v=0;v<y.length;y.length===z||(0,H.r)(y),++v){u=y[v]
if(w.length!==0)w+=" "
t=J.L(u)
w=J.S(t.gk(u),1)?w+(t.aX(u,0,1).toUpperCase()+t.b3(u,1)):w+t.hT(u)}this.y=w
$.$get$aQ().push(this)
S.dj()},
D:{
qg:function(a){var z=new S.qf(null,null,null,null,null,[],P.V(null,null,null,P.x),null,null,null,!1)
z.f8(a)
return z},
qi:function(){var z,y,x,w
for(z=$.$get$aQ().length-1;z>=0;--z){y=$.$get$aQ()
if(z>=y.length)return H.c(y,z)
y=y[z]
x=y.a
w=x.parentNode
if(w!=null)w.removeChild(x)
C.f.an($.$get$aQ(),y)
S.dj()}},
qp:function(){var z,y,x
for(z=$.$get$aQ(),y=z.length,x=0;x<z.length;z.length===y||(0,H.r)(z),++x)z[x].cT()},
k3:function(){var z,y,x
for(z=$.$get$aQ(),y=z.length,x=0;x<z.length;z.length===y||(0,H.r)(z),++x)z[x].a0()},
dj:function(){var z,y,x
for(z=$.au.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.r)(z),++x)z[x].en(!1)}}},
qj:{"^":"a:3;",
$1:function(a){return-1}},
qk:{"^":"a:0;a",
$1:function(a){S.q3(this.a)}},
ql:{"^":"a:0;a",
$1:function(a){this.a.cT()}},
qm:{"^":"a:0;a",
$1:function(a){var z=this.a.e.style
z.visibility="visible"}},
qn:{"^":"a:0;a",
$1:function(a){this.a.aF()}},
qo:{"^":"a:0;a",
$1:function(a){var z=this.a.e.style
z.visibility="hidden"}},
qh:{"^":"i;aH:a>,v:b*,t:c*,d,e"},
qr:{"^":"i;a,b,c",
be:function(a,b,c){var z,y,x,w,v,u,t,s
z=this.a*0.5
y=z*0.95
x=y/b
J.bh(this.c,"#303030")
for(w=0;w<b;){J.dF(this.c);++w
J.l5(this.c,z,z,w*x,0,6.283185307179586)
J.dN(this.c)}J.dF(this.c)
v=6.283185307179586/c
for(w=0;w<c;++w){J.fs(this.c,z,z)
u=v*w
t=Math.sin(u)
s=Math.cos(u)
J.fq(this.c,z+t*y,z+s*y)}J.dN(this.c)},
hV:function(a){var z=this.a
J.aD(this.c,0,0,z,z)
this.be(0,5,16)
this.bA(a)},
a0:function(){return this.hV(null)},
bA:function(b1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0
z=$.aS.c.length
y=6.283185307179586/z
x=this.a
w=x*0.95*0.5
v=w*0.025
J.lo(this.c,"center")
u=[]
if(b1!=null){t=b1.gT().u("position")
s=t==null
r=s?0.1:J.a0(t,"0")
if(typeof r!=="number")return H.C(r)
q=w*r
s=s?1:J.a0(t,"1")
if(typeof s!=="number")return H.C(s)
p=w*s
J.bh(this.c,"rgba(255,255,0,0.25)")
J.bg(this.c,"rgba(255,255,0,0.025)")
s=this.c
r=J.e(s)
r.Y(s)
o=x*0.5
r.ax(s,o,o,q,0,6.283185307179586)
r.dP(s,o,o,p,0,6.283185307179586,!0)
r.a8(s)
r.av(s)
s=this.c
r=J.e(s)
r.Y(s)
r.ax(s,o,o,q,0,6.283185307179586)
r.a8(s)
r.a3(s)
s=this.c
r=J.e(s)
r.Y(s)
r.ax(s,o,o,p,0,6.283185307179586)
r.a8(s)
r.a3(s)}for(x*=0.5,s=J.t(b1),n=0;n<z;++n){r=$.aS.c
if(n>=r.length)return H.c(r,n)
m=r[n]
l=m.gT().u("ident")
k=m.gT().u("radius")
t=m.gT().u("position")
j=0.6283185307179586+y*n
r=t==null
o=r?0.1:J.a0(t,"0")
if(typeof o!=="number")return H.C(o)
q=w*o
o=r?1:J.a0(t,"1")
if(typeof o!=="number")return H.C(o)
p=w*o
o=r?0.1:J.a0(k,"0")
if(typeof o!=="number")return H.C(o)
r=r?0.15:J.a0(k,"1")
if(typeof r!=="number")return H.C(r)
i=Math.sin(j)
h=Math.cos(j)
g=i*q
f=h*q
e=i*p
d=h*p
c=x+(g+e)*0.5
b=x+(f+d)*0.5
a=m.ghL()
if(a!=null){a0=J.L(a)
a1="rgba("+H.d(a0.h(a,"r"))+","+H.d(a0.h(a,"g"))+","+H.d(a0.h(a,"b"))+",0.1)"
a2="rgba("+H.d(a0.h(a,"r"))+","+H.d(a0.h(a,"g"))+","+H.d(a0.h(a,"b"))+",0.75)"
H.d(a0.h(a,"r"))
H.d(a0.h(a,"g"))
H.d(a0.h(a,"b"))}else{a1="rgba(127,127,127,0.1)"
a2="rgba(127,127,127,0.75)"}J.bg(this.c,a1)
J.bh(this.c,a2)
a0=this.c
a3=J.e(a0)
a3.Y(a0)
a3.ax(a0,c,b,w*o,0,6.283185307179586)
a3.a8(a0)
a3.av(a0)
a3.a3(a0)
o=s.O(b1,m)
a0=this.c
if(o)J.bh(a0,"#FFFF00")
else J.bh(a0,a2)
o=this.c
a0=J.e(o)
a0.Y(o)
a0.ax(o,c,b,w*r,0,6.283185307179586)
a0.a8(o)
a0.av(o)
a0.a3(o)
o=this.c
a0=J.e(o)
a0.Y(o)
r=x+g
a3=h*v
a4=x+f
a5=i*v
a0.ad(o,r-a3,a4+a5)
a0.P(o,r+a3,a4-a5)
o=this.c
a0=x+e
a6=x+d
a7=J.e(o)
a7.ad(o,a0-a3,a6+a5)
a7.P(o,a0+a3,a6-a5)
a5=this.c
a3=J.e(a5)
a3.ad(a5,r,a4)
a3.P(a5,a0,a6)
a3.a3(a5)
if(!J.v(l,0))u.push(P.Y(["id",l,"x",c,"y",b,"fill",J.v(m,b1)?"#FFFF00":"#CCCCCC"]))}for(x=u.length,a8=0;a8<u.length;u.length===x||(0,H.r)(u),++a8){a9=u[a8]
c=a9.h(0,"x")
b=a9.h(0,"y")
l=a9.h(0,"id")
a1=a9.h(0,"fill")
b0=J.dG(J.B(b,3))+0.5
J.bg(this.c,"#000000")
s=J.M(c)
r=b0-1
J.bv(this.c,H.d(l),s.ae(c,1),r)
J.bv(this.c,H.d(l),s.n(c,1),r)
J.bv(this.c,H.d(l),s.ae(c,1),b0)
J.bv(this.c,H.d(l),s.n(c,1),b0)
r=b0+1
J.bv(this.c,H.d(l),s.ae(c,1),r)
J.bv(this.c,H.d(l),s.n(c,1),r)
J.bg(this.c,a1)
J.bv(this.c,H.d(l),c,b0)}}},
qv:{"^":"a:4;a",
$1:[function(a){S.k8(this.a)},null,null,2,0,null,0,"call"]},
lE:{"^":"i;aO:a<,b,a7:c>,d",
bC:function(a){var z
if(!this.d){this.d=!0
z=this.a.style
z.display="block"
z=this.b.style
z.display="block"
z=this.c
z.className="button glyphicon glyphicon-minus"
z.title="Collapse group"}},
eU:function(a,b){var z,y,x,w,v,u
z=document
y=z.createElement("table")
y.id="moduletable_"+a
y.className="inlineblock"
x=z.createElement("tr")
y.appendChild(x)
w=z.createElement("td")
x.appendChild(w)
v=z.createElement("div")
v.className="button glyphicon glyphicon-plus"
v.title="Expand group"
v.id="expand_"+a
C.c.C(v,"click",new S.lF(this),null)
w.appendChild(v)
this.c=v
u=z.createElement("td")
x.appendChild(u)
u.id="module_"+a
u.className="nodisplay"
u.appendChild(b)
this.b=u
this.a=y},
D:{
c9:function(a,b){var z=new S.lE(null,null,null,!1)
z.eU(a,b)
return z}}},
lF:{"^":"a:0;a",
$1:[function(a){var z,y,x,w
z=J.e(a)
if(z.ga7(a)!==0)return
y=J.cM(H.o(z.gb2(a),"$isN").id,7)
x="#moduletable_"+y
w=document
w.querySelector(x)
if(w.querySelector("#module_"+y)==null){P.c2("element not found")
return}x=this.a
if(x.d){x.d=!1
w=x.a.style
w.display="inline-block"
w=x.b.style
w.display="none"
x=x.c
x.className="button glyphicon glyphicon-plus"
x.title="Expand group"}else x.bC(0)
z.aS(a)},null,null,2,0,null,0,"call"]},
un:{"^":"a:3;",
$1:function(a){return}},
uo:{"^":"a:3;",
$1:function(a){return}},
tZ:{"^":"a:0;a,b",
$1:[function(a){var z,y,x
this.a.$0()
z=document
y=z.querySelector("#confirmbox").style
y.display="none"
y=z.querySelector("#alertbackground").style
y.display="none"
z.querySelector("#confirmtext").textContent=""
z.querySelector("#confirmtitle").textContent=""
z=$.dr
y=z!=null
if(y){x=this.b
x.toString
if(y)J.fi(x,"click",z,null)}},null,null,2,0,null,0,"call"]},
iY:{"^":"i;a,b,aO:c<,d,e,f,r,x,y",
a0:function(){var z,y,x,w,v,u,t,s,r,q,p
z=this.f
y=this.c
if(z)y.className="ui shapedisplay selected"
else y.className="ui shapedisplay"
z=this.b
J.aD(z.d,0,0,z.a,z.b)
x=Math.min(this.a.gah(),H.A(this.d))
this.b.e0(this.a,x)
this.b.ha(this.a,!0,"#606060","#202020",this.y,"#BBBBBB",!0,x)
z=J.S(this.d,this.a.gah())
y=this.r
if(z){z=y.style
z.display="block"}else{z=y.style
z.display="none"}z=this.a.ge4()
y=x-1
if(y>>>0!==y||y>=20)return H.c(z,y)
w=z[y]
z=J.c4(this.a)
if(y>=z.length)return H.c(z,y)
y="<span title='Area, used when calculating mass and health' class='glyphicon glyphicon-fullscreen'>"+J.dO(z[y],2)+"</span> <span title='Allowed block scales' class='glyphicon glyphicon-stats'>1"
v=y+(this.a.gah()===1?"":"-"+H.d(this.a.gah()))+"</span><br/>"
z=this.x;(z&&C.k).L(z,v)
for(z=w.gH(),z=z.gB(z);z.m();){u=z.gq()
y=this.x
t=document
s=t.createElement("span")
r=J.e(u)
s.className="glyphicon glyphicon-"+H.d(r.ge7(u))
q=s.style
p=u.gdU()
q.color=p
s.textContent=H.d(w.h(0,u))
s.title=H.d(r.gE(u))+" hardpoints"
C.k.C(s,"mouseenter",new S.qa(this,u),null)
C.k.C(s,"mouseleave",new S.qb(this),null)
y.appendChild(s)
this.x.appendChild(t.createElement("br"))}this.c.title=""},
f7:function(a,b,c,d){var z,y,x,w,v,u
z=document
y=z.createElement("div")
y.className="ui shapedisplay"
x=y.style
w=""+d+"px"
x.width=w
x=y.style
w=""+d+"px"
x.height=w
C.c.C(y,"click",new S.q9(this),null)
this.c=y
y=S.c8(d,d)
this.b=y
this.c.appendChild(y.c)
y=z.createElement("div")
y.className="shapeoverlay"
C.c.L(y,"<span>Scale too high!<br/>Max scale: "+H.d(this.a.gah())+"</span>")
this.r=y
this.c.appendChild(y)
y=this.c
x=z.createElement("span")
x.className="shapename"
w=this.a
v=J.t(w)
x.textContent=!!v.$isbi?"Custom: "+H.d(w.a):v.gE(w)
y.appendChild(x)
u=z.createElement("span")
this.x=u
u.textContent="Shape info"
u.className="componentinfo"
this.c.appendChild(u)
this.f=c
this.a0()},
D:{
q8:function(a,b,c,d){var z=new S.iY(a,null,null,b,null,!1,null,null,null)
z.f7(a,b,c,d)
return z},
iZ:function(a,b){if(!J.v(a.y,b)){a.y=b
a.a0()}}}},
q9:{"^":"a:4;a",
$1:[function(a){var z,y
z=this.a
y=z.e
if(y!=null)y.es(z)
return},null,null,2,0,null,0,"call"]},
qa:{"^":"a:4;a,b",
$1:[function(a){return S.iZ(this.a,this.b)},null,null,2,0,null,0,"call"]},
qb:{"^":"a:4;a",
$1:[function(a){return S.iZ(this.a,null)},null,null,2,0,null,0,"call"]},
iV:{"^":"i;a,b",
i_:[function(a,b,c){return J.J(J.q(b,this.b),J.q(c,this.a))},"$2","gv",4,0,17,2,11],
i0:[function(a,b,c){return J.B(J.q(b,this.a),J.q(c,this.b))},"$2","gt",4,0,17,2,11]},
rM:{"^":"a:0;a",
$1:[function(a){var z=J.e(a)
if(z.ga7(a)!==0)return
this.a.$1(a)
z.bJ(a)
z.a2(a)},null,null,2,0,null,0,"call"]}},1]]
setupProgram(dart,0)
J.t=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.id.prototype
return J.ic.prototype}if(typeof a=="string")return J.cq.prototype
if(a==null)return J.ie.prototype
if(typeof a=="boolean")return J.nx.prototype
if(a.constructor==Array)return J.co.prototype
if(typeof a!="object"){if(typeof a=="function")return J.cr.prototype
return a}if(a instanceof P.i)return a
return J.du(a)}
J.L=function(a){if(typeof a=="string")return J.cq.prototype
if(a==null)return a
if(a.constructor==Array)return J.co.prototype
if(typeof a!="object"){if(typeof a=="function")return J.cr.prototype
return a}if(a instanceof P.i)return a
return J.du(a)}
J.bI=function(a){if(a==null)return a
if(a.constructor==Array)return J.co.prototype
if(typeof a!="object"){if(typeof a=="function")return J.cr.prototype
return a}if(a instanceof P.i)return a
return J.du(a)}
J.M=function(a){if(typeof a=="number")return J.cp.prototype
if(a==null)return a
if(!(a instanceof P.i))return J.cC.prototype
return a}
J.O=function(a){if(typeof a=="number")return J.cp.prototype
if(typeof a=="string")return J.cq.prototype
if(a==null)return a
if(!(a instanceof P.i))return J.cC.prototype
return a}
J.aA=function(a){if(typeof a=="string")return J.cq.prototype
if(a==null)return a
if(!(a instanceof P.i))return J.cC.prototype
return a}
J.e=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.cr.prototype
return a}if(a instanceof P.i)return a
return J.du(a)}
J.B=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.O(a).n(a,b)}
J.l0=function(a,b){if(typeof a=="number"&&typeof b=="number")return(a&b)>>>0
return J.M(a).ep(a,b)}
J.aT=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.M(a).aI(a,b)}
J.v=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.t(a).O(a,b)}
J.ff=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>=b
return J.M(a).bp(a,b)}
J.S=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.M(a).ao(a,b)}
J.l1=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<=b
return J.M(a).cf(a,b)}
J.b2=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.M(a).aJ(a,b)}
J.q=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.O(a).X(a,b)}
J.fg=function(a){if(typeof a=="number")return-a
return J.M(a).bP(a)}
J.fh=function(a,b){return J.M(a).eC(a,b)}
J.dD=function(a,b){return J.M(a).di(a,b)}
J.J=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.M(a).ae(a,b)}
J.l2=function(a,b){if(typeof a=="number"&&typeof b=="number")return(a^b)>>>0
return J.M(a).eS(a,b)}
J.a0=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.um(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.L(a).h(a,b)}
J.be=function(a,b,c,d){return J.e(a).C(a,b,c,d)}
J.fi=function(a,b,c,d){return J.e(a).fu(a,b,c,d)}
J.l3=function(a,b,c){return J.e(a).fv(a,b,c)}
J.dE=function(a){return J.M(a).dJ(a)}
J.l4=function(a,b){return J.aA(a).cJ(a,b)}
J.l5=function(a,b,c,d,e,f){return J.e(a).ax(a,b,c,d,e,f)}
J.dF=function(a){return J.e(a).Y(a)}
J.l6=function(a,b,c){return J.M(a).cO(a,b,c)}
J.aD=function(a,b,c,d,e){return J.e(a).fM(a,b,c,d,e)}
J.bu=function(a,b){return J.O(a).aM(a,b)}
J.aE=function(a,b){return J.L(a).M(a,b)}
J.fj=function(a,b,c){return J.L(a).dX(a,b,c)}
J.l7=function(a){return J.e(a).at(a)}
J.l8=function(a,b,c,d,e){return J.e(a).fV(a,b,c,d,e)}
J.l9=function(a,b,c,d,e,f,g){return J.e(a).fW(a,b,c,d,e,f,g)}
J.cG=function(a,b){return J.bI(a).a9(a,b)}
J.fk=function(a,b){return J.aA(a).e2(a,b)}
J.bv=function(a,b,c,d){return J.e(a).bm(a,b,c,d)}
J.dG=function(a){return J.M(a).aG(a)}
J.c3=function(a,b){return J.bI(a).a4(a,b)}
J.b3=function(a){return J.e(a).gb0(a)}
J.c4=function(a){return J.e(a).gcM(a)}
J.fl=function(a){return J.e(a).gfG(a)}
J.cH=function(a){return J.e(a).gdT(a)}
J.la=function(a){return J.e(a).gaP(a)}
J.fm=function(a){return J.bI(a).gaa(a)}
J.aU=function(a){return J.t(a).gab(a)}
J.dH=function(a){return J.e(a).gaH(a)}
J.dI=function(a){return J.L(a).gW(a)}
J.a7=function(a){return J.bI(a).gB(a)}
J.fn=function(a){return J.bI(a).gal(a)}
J.aL=function(a){return J.L(a).gk(a)}
J.a8=function(a){return J.e(a).gE(a)}
J.lb=function(a){return J.e(a).ghC(a)}
J.fo=function(a){return J.e(a).gaw(a)}
J.lc=function(a){return J.e(a).ghF(a)}
J.ld=function(a){return J.e(a).gap(a)}
J.le=function(a){return J.t(a).gaf(a)}
J.T=function(a){return J.e(a).gb2(a)}
J.cI=function(a){return J.e(a).gR(a)}
J.dJ=function(a){return J.e(a).gN(a)}
J.dK=function(a){return J.e(a).ga5(a)}
J.fp=function(a,b){return J.L(a).bo(a,b)}
J.lf=function(a,b){return J.L(a).c8(a,b)}
J.fq=function(a,b,c){return J.e(a).P(a,b,c)}
J.lg=function(a,b){return J.e(a).ac(a,b)}
J.fr=function(a,b){return J.bI(a).b1(a,b)}
J.lh=function(a,b,c){return J.aA(a).d0(a,b,c)}
J.fs=function(a,b,c){return J.e(a).ad(a,b,c)}
J.li=function(a,b){return J.t(a).d1(a,b)}
J.dL=function(a){return J.bI(a).aA(a)}
J.cJ=function(a,b,c){return J.aA(a).hN(a,b,c)}
J.lj=function(a,b,c){return J.aA(a).hO(a,b,c)}
J.lk=function(a,b){return J.e(a).hP(a,b)}
J.bf=function(a){return J.M(a).cb(a)}
J.ft=function(a,b,c){return J.e(a).aR(a,b,c)}
J.ll=function(a,b,c,d){return J.e(a).U(a,b,c,d)}
J.bK=function(a,b){return J.e(a).ci(a,b)}
J.cK=function(a,b){return J.e(a).sb0(a,b)}
J.dM=function(a,b){return J.e(a).sb7(a,b)}
J.bg=function(a,b){return J.e(a).saP(a,b)}
J.lm=function(a,b){return J.e(a).sc5(a,b)}
J.ln=function(a,b){return J.e(a).sea(a,b)}
J.fu=function(a,b){return J.e(a).sbH(a,b)}
J.bh=function(a,b){return J.e(a).scm(a,b)}
J.lo=function(a,b){return J.e(a).sd5(a,b)}
J.lp=function(a,b){return J.e(a).sR(a,b)}
J.lq=function(a,b){return J.e(a).sN(a,b)}
J.fv=function(a,b){return J.aA(a).eD(a,b)}
J.cL=function(a,b){return J.aA(a).cl(a,b)}
J.dN=function(a){return J.e(a).a3(a)}
J.cM=function(a,b){return J.aA(a).b3(a,b)}
J.lr=function(a,b,c){return J.aA(a).aX(a,b,c)}
J.ai=function(a){return J.M(a).j(a)}
J.ls=function(a){return J.aA(a).hS(a)}
J.aF=function(a){return J.t(a).A(a)}
J.dO=function(a,b){return J.M(a).bM(a,b)}
J.c5=function(a){return J.aA(a).hU(a)}
I.bd=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.t=W.lt.prototype
C.A=W.dP.prototype
C.u=W.lx.prototype
C.c=W.dW.prototype
C.M=W.n3.prototype
C.N=J.n.prototype
C.f=J.co.prototype
C.d=J.ic.prototype
C.e=J.id.prototype
C.C=J.ie.prototype
C.a=J.cp.prototype
C.h=J.cq.prototype
C.U=J.cr.prototype
C.G=J.pB.prototype
C.Y=W.q4.prototype
C.k=W.qq.prototype
C.H=W.qw.prototype
C.I=W.qx.prototype
C.J=W.dk.prototype
C.z=J.cC.prototype
C.K=new P.oV()
C.L=new P.qH()
C.o=new P.re()
C.B=new P.aX(0)
C.p=new S.aO(6,"rgba(100,100,255,0.15)","rgba(150,150,30,0.9)","Cannonboost base","plus","WEAPON_IN",null)
C.l=new S.aO(5,"rgba(255,255,0,0.15)","rgba(255,255,0,0.9)","Boostable cannon","plus-sign","WEAPON_OUT",null)
C.m=new S.aO(3,"rgba(100,100,255,0.15)","rgba(80,80,200,0.9)","Thruster base","arrow-right","THRUSTER_IN",null)
C.i=new S.aO(0,"rgba(255,255,0,0.15)","rgba(200,30,30,0.9)","Launcher","log-out","LAUNCHER",null)
C.j=new S.aO(8,"rgba(100,100,255,0.15)","rgba(120,0,0,0.9)","Missile base","plane","MISSILE",null)
C.n=new S.aO(4,"rgba(255,255,0,0.15)","rgba(150,150,255,0.9)","Thruster head","share-alt","THRUSTER_OUT",null)
C.b=new S.aO(2,"rgba(255,255,255,0.15)","rgba(255,255,255,0.9)","Connector","link","NORMAL",null)
C.q=new S.aO(7,"rgba(255,255,0,0.15)","rgba(30,255,30,0.9)","Root","tree-conifer","ROOT",null)
C.O=function() {  var toStringFunction = Object.prototype.toString;  function getTag(o) {    var s = toStringFunction.call(o);    return s.substring(8, s.length - 1);  }  function getUnknownTag(object, tag) {    if (/^HTML[A-Z].*Element$/.test(tag)) {      var name = toStringFunction.call(object);      if (name == "[object Object]") return null;      return "HTMLElement";    }  }  function getUnknownTagGenericBrowser(object, tag) {    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";    return getUnknownTag(object, tag);  }  function prototypeForTag(tag) {    if (typeof window == "undefined") return null;    if (typeof window[tag] == "undefined") return null;    var constructor = window[tag];    if (typeof constructor != "function") return null;    return constructor.prototype;  }  function discriminator(tag) { return null; }  var isBrowser = typeof navigator == "object";  return {    getTag: getTag,    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,    prototypeForTag: prototypeForTag,    discriminator: discriminator };}
C.D=function(hooks) { return hooks; }
C.P=function(hooks) {  if (typeof dartExperimentalFixupGetTag != "function") return hooks;  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);}
C.Q=function(hooks) {  var getTag = hooks.getTag;  var prototypeForTag = hooks.prototypeForTag;  function getTagFixed(o) {    var tag = getTag(o);    if (tag == "Document") {      // "Document", so we check for the xmlVersion property, which is the empty      if (!!o.xmlVersion) return "!Document";      return "!HTMLDocument";    }    return tag;  }  function prototypeForTagFixed(tag) {    if (tag == "Document") return null;    return prototypeForTag(tag);  }  hooks.getTag = getTagFixed;  hooks.prototypeForTag = prototypeForTagFixed;}
C.R=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Firefox") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "GeoGeolocation": "Geolocation",    "Location": "!Location",    "WorkerMessageEvent": "MessageEvent",    "XMLDocument": "!Document"};  function getTagFirefox(o) {    var tag = getTag(o);    return quickMap[tag] || tag;  }  hooks.getTag = getTagFirefox;}
C.E=function getTagFallback(o) {  var s = Object.prototype.toString.call(o);  return s.substring(8, s.length - 1);}
C.S=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Trident/") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "HTMLDDElement": "HTMLElement",    "HTMLDTElement": "HTMLElement",    "HTMLPhraseElement": "HTMLElement",    "Position": "Geoposition"  };  function getTagIE(o) {    var tag = getTag(o);    var newTag = quickMap[tag];    if (newTag) return newTag;    if (tag == "Object") {      if (window.DataView && (o instanceof window.DataView)) return "DataView";    }    return tag;  }  function prototypeForTagIE(tag) {    var constructor = window[tag];    if (constructor == null) return null;    return constructor.prototype;  }  hooks.getTag = getTagIE;  hooks.prototypeForTag = prototypeForTagIE;}
C.T=function(getTagFallback) {  return function(hooks) {    if (typeof navigator != "object") return hooks;    var ua = navigator.userAgent;    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;    if (ua.indexOf("Chrome") >= 0) {      function confirm(p) {        return typeof window == "object" && window[p] && window[p].name == p;      }      if (confirm("Window") && confirm("HTMLElement")) return hooks;    }    hooks.getTag = getTagFallback;  };}
C.V=H.E(I.bd(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"]),[P.y])
C.v=I.bd([0,0,26498,1023,65534,34815,65534,18431])
C.W=I.bd(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"])
C.w=I.bd([])
C.x=H.E(I.bd(["bind","if","ref","repeat","syntax"]),[P.y])
C.y=H.E(I.bd(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"]),[P.y])
C.X=H.E(I.bd([]),[P.cy])
C.F=new H.lS(0,{},C.X,[P.cy,null])
C.Z=new H.eK("call")
C.a_=H.af("fA")
C.a0=H.af("ve")
C.a1=H.af("vK")
C.a2=H.af("vL")
C.a3=H.af("vS")
C.a4=H.af("vT")
C.a5=H.af("vU")
C.a6=H.af("ig")
C.a7=H.af("ix")
C.a8=H.af("y")
C.a9=H.af("wL")
C.aa=H.af("wM")
C.ab=H.af("wN")
C.ac=H.af("wO")
C.ad=H.af("bH")
C.ae=H.af("a6")
C.af=H.af("x")
C.ag=H.af("aC")
C.r=new P.qG(!1)
$.iQ="$cachedFunction"
$.iR="$cachedInvocation"
$.aW=0
$.bM=null
$.fy=null
$.f9=null
$.kI=null
$.kW=null
$.ds=null
$.dx=null
$.fa=null
$.bF=null
$.bY=null
$.bZ=null
$.f1=!1
$.bW=C.o
$.hV=0
$.b4=null
$.dY=null
$.fM=null
$.fL=null
$.fI=null
$.fJ=null
$.au=null
$.bb=null
$.bc=null
$.d1=null
$.d2=null
$.d3=null
$.b=0
$.es="rwdk"
$.aS=null
$.bJ=null
$.dr=null
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["cS","$get$cS",function(){return H.f7("_$dart_dartClosure")},"ek","$get$ek",function(){return H.f7("_$dart_js")},"i9","$get$i9",function(){return H.ns()},"ia","$get$ia",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.hV
$.hV=z+1
z="expando$key$"+z}return new P.mr(null,z,[P.x])},"kd","$get$kd",function(){return H.b1(H.dl({
toString:function(){return"$receiver$"}}))},"ke","$get$ke",function(){return H.b1(H.dl({$method$:null,
toString:function(){return"$receiver$"}}))},"kf","$get$kf",function(){return H.b1(H.dl(null))},"kg","$get$kg",function(){return H.b1(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"kk","$get$kk",function(){return H.b1(H.dl(void 0))},"kl","$get$kl",function(){return H.b1(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"ki","$get$ki",function(){return H.b1(H.kj(null))},"kh","$get$kh",function(){return H.b1(function(){try{null.$method$}catch(z){return z.message}}())},"kn","$get$kn",function(){return H.b1(H.kj(void 0))},"km","$get$km",function(){return H.b1(function(){try{(void 0).$method$}catch(z){return z.message}}())},"eO","$get$eO",function(){return P.qK()},"c_","$get$c_",function(){return[]},"kB","$get$kB",function(){return P.ae("^[\\-\\.0-9A-Z_a-z~]*$",!0,!1)},"kv","$get$kv",function(){return P.il(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],null)},"eU","$get$eU",function(){return P.an()},"fH","$get$fH",function(){return P.ae("^\\S+$",!0,!1)},"f5","$get$f5",function(){return P.f3(self)},"eP","$get$eP",function(){return H.f7("_$dart_dartObject")},"eZ","$get$eZ",function(){return function DartObject(a){this.o=a}},"hk","$get$hk",function(){return S.e0("ENABLED","Explode on contact",null,"")},"hm","$get$hm",function(){return S.e0("PROXIMITY","Explode when targets are near",null,"")},"hl","$get$hl",function(){return S.e0("FINAL","Explode on contact and expiration",null,"")},"ce","$get$ce",function(){return[$.$get$hk(),$.$get$hm(),$.$get$hl()]},"hR","$get$hR",function(){var z=S.e7("0","Cannot be unlocked for play. NPC only.",null,"")
z.b="Not playable"
return z},"hP","$get$hP",function(){var z=S.e7("1","Unlockable when killing a ship of the faction worth more than 1000P.",null,"")
z.b="Unlockable"
return z},"hQ","$get$hQ",function(){var z=S.e7("2","Available to players immediately without having to unlock.",null,"")
z.b="Always unlocked"
return z},"e8","$get$e8",function(){return[$.$get$hR(),$.$get$hP(),$.$get$hQ()]},"hN","$get$hN",function(){var z=S.d_("0","Green plants, randomly generated by the game",null,"")
z.b="Green plants"
return z},"hL","$get$hL",function(){var z=S.d_("1","Blue plants, randomly generated by the game",null,"")
z.b="Blue plants"
return z},"hO","$get$hO",function(){var z=S.d_("2","Pink plants, randomly generated by the game",null,"")
z.b="Pink plants"
return z},"hM","$get$hM",function(){var z=S.d_("-1","Designs sourced from the controlling faction which contain a root or seed block (e.g. bee city buildings, borg block structures, the spikey plants)",null,"")
z.b="Faction structures"
return z},"e6","$get$e6",function(){return[$.$get$hN(),$.$get$hL(),$.$get$hO(),$.$get$hM()]},"hU","$get$hU",function(){var z=S.e9("0","Regions where each point is assigned to the cell with the closest centre point",null,"")
z.b="Voronoi regions"
return z},"hT","$get$hT",function(){var z=S.e9("1","Irregular blob regions",null,"")
z.b="Splats"
return z},"hS","$get$hS",function(){var z=S.e9("2","Circular regions",null,"")
z.b="Circles"
return z},"ea","$get$ea",function(){return[$.$get$hU(),$.$get$hT(),$.$get$hS()]},"fW","$get$fW",function(){var z=S.cc("1","Left mouse button. Default for cannons/lasers.",null,"")
z.b="Left click"
return z},"fZ","$get$fZ",function(){var z=S.cc("2","Right mouse button. Default for launchers.",null,"")
z.b="Right click"
return z},"fX","$get$fX",function(){var z=S.cc("3","Middle mouse button. Not a default binding for anything. Defaults to ripple fire mode.",null,"")
z.b="Middle click"
return z},"fV","$get$fV",function(){var z=S.cc("4","Automatic targeting. Targets enemies you are aiming at or have locked. Not a default binding for anything.",null,"")
z.b="Autofire"
return z},"fY","$get$fY",function(){var z=S.cc("5","Point defence. Targets incoming destroyable projectiles first, then other enemies. Default for any weapon with the AUTOFIRE feature.",null,"")
z.b="Point defence"
return z},"e_","$get$e_",function(){return[$.$get$fW(),$.$get$fX(),$.$get$fZ(),$.$get$fV(),$.$get$fY()]},"h8","$get$h8",function(){return S.a3("METAMORPHOSIS","Ships with this tag will occasionally change design at their discretion.","random","NPC ships may change design")},"h4","$get$h4",function(){return S.a3("FLOCKING","Ships with this tag will tend to travel in groups, aligning their direction of travel.","th","Flocking behaviour")},"hd","$get$hd",function(){return S.a3("RECKLESS","Ships with this tag will flee less from combat.","exclamation-sign","Reckless AI")},"h_","$get$h_",function(){return S.a3("AGGRESSIVE","Ships with this tag are more eager to attack enemy targets.","fire","Aggressive AI")},"h2","$get$h2",function(){return S.a3("CAUTIOUS","Ships with this tag are less eager to attack enemy targets.","question-sign","Cautious AI")},"hg","$get$hg",function(){return S.a3("SOCIAL","Ships with this tag will call for help when under attack.","volume-up","Calls for help")},"hb","$get$hb",function(){return S.a3("PEACEFUL","Ships with this tag will not attack without provocation.","grain","Peaceful AI")},"hj","$get$hj",function(){return S.a3("WANDER","Ships with this tag will wander randomly in their spare time.","transfer","Wanders")},"h6","$get$h6",function(){return S.a3("HATES_PLANTS","Ships with this tag will attempt to kill plants if in range.","tree-conifer","Hates plants")},"h5","$get$h5",function(){return S.a3("FORGIVING","Ships with this tag will stop attacking more readily.","ok-circle","Forgiving AI")},"hi","$get$hi",function(){return S.a3("TRACTOR_TRANSIENT","Ships with this tag will collect spare blocks from wreckage to use.","repeat","NPC ships will reuse wrecked parts")},"h3","$get$h3",function(){return S.a3("DODGES","Ships with this tag will attempt to avoid projectiles if possible.","resize-horizontal","Will attempt to dodge projectiles")},"he","$get$he",function(){return S.a3("RIPPLE_FIRE","Ships with this tag will use ripple fire when firing their weapons.","equalizer","Uses ripple fire")},"hh","$get$hh",function(){return S.a3("SPREAD_FIRE","Ships with this tag will spread their fire around when attacking.","fullscreen","Uses spread fire")},"h1","$get$h1",function(){return S.a3("BAD_AIM","Ships with this tag are poor shots and will miss more often.","remove","Poor aim")},"hc","$get$hc",function(){return S.a3("POINT_DEFENSE","Ships with this tag will act as point defence drones.","record","Will act as point defence drones")},"h7","$get$h7",function(){return S.a3("INACTIVE","Ships with this tag will take no action at all. Not recommended.","ban-circle warning","")},"hf","$get$hf",function(){return S.a3("SMART_FIRE","Ships with this tag will spread their fire if the enemy is expected to dodge.","screenshot","Will attempt to spread fire if enemy dodges")},"ha","$get$ha",function(){return S.a3("NO_PARENT","Ships with this tag will not follow their parent. Particularly good for seed launchers.","home","Will not follow parent ships")},"h0","$get$h0",function(){return S.a3("ATTACK","Ships with this tag will blindly attack targets as if they were in tournament mode. Prevents most normal behaviour. Not recommended.","alert warningminor","Will attack enemies at any opportunity")},"h9","$get$h9",function(){return S.a3("MUTATE","Ships with this tag will deviate from their blueprint, randomly changing some blocks each generation. Experimental - use at your own risk.","refresh warningminor","Mutates between generations")},"cd","$get$cd",function(){return[$.$get$h8(),$.$get$h4(),$.$get$hd(),$.$get$h_(),$.$get$h2(),$.$get$hg(),$.$get$hb(),$.$get$hj(),$.$get$h6(),$.$get$h5(),$.$get$hi(),$.$get$h3(),$.$get$he(),$.$get$hh(),$.$get$h1(),$.$get$hc(),$.$get$h7(),$.$get$hf(),$.$get$ha(),$.$get$h0(),$.$get$h9()]},"cf","$get$cf",function(){return S.D("COMMAND","This block is a command module. Enables the command settings section.","star","Command")},"bl","$get$bl",function(){return S.D("THRUSTER","This block is a thruster.","arrow-right","Thruster")},"bQ","$get$bQ",function(){return S.D("GENERATOR","This blocks generates or stores power.","flash","Generator")},"bx","$get$bx",function(){return S.D("TURRET","Turreted weapon. Must be used with CANNON or LASER.","play-circle","Turreted")},"bO","$get$bO",function(){return S.D("CANNON","Projectile weapon. Enables the cannon settings section.","screenshot","Cannon")},"bR","$get$bR",function(){return S.D("LASER","Beam weapon. Enables the laser settings section.","screenshot","Laser")},"ci","$get$ci",function(){return S.D("SHIELD","Projects a round shield for blocking enemy fire. Enables the shield settings section.","record","Shield Generator")},"e5","$get$e5",function(){return S.D("TORQUER","Provides torque to let ships rotate without levering thrust.","repeat","Torquer")},"ay","$get$ay",function(){return S.D("LAUNCHER","Generates launchable blocks - missiles, seeds, mines, drones. Enables the replicateBlock section.","log-out","Launcher")},"cg","$get$cg",function(){return S.D("EXPLODE","Explodes on contact with enemies.",null,"")},"ho","$get$ho",function(){return S.D("ASSEMBLER","Allows the ship to regenerate and collect missing blocks from wreckage.",null,"")},"hG","$get$hG",function(){return S.D("REGROWER","Allows the ship to regenerate missing parts but NOT collect them from wreckage.",null,"")},"cV","$get$cV",function(){return S.D("CANNON_BOOST","Modifies attached cannon blocks. Enables the cannon_boost settings section.","plus-sign","Cannon Booster")},"e4","$get$e4",function(){return S.D("INVULNERABLE","Makes the block totally indestructible. NOT RECOMMENDED.","exclamation-sign warning","Invulnerable")},"hD","$get$hD",function(){return S.D("NOREGEN","Prevents the block from regenerating health or being replaced.",null,"")},"hs","$get$hs",function(){return S.D("ENVIRONMENTAL","Allows plants and other ROOT blocks to attach and grow.","tree-conifer","Environmental")},"cj","$get$cj",function(){return S.D("TRACTOR","Collects R packets.","magnet","Resource Collector")},"hH","$get$hH",function(){return S.D("ROOT","Can attach to asteroids and blocks marked ENVIRONMENTAL.",null,"")},"ch","$get$ch",function(){return S.D("PHOTOSYNTH","Generates resources over time.","leaf","Resource Generator")},"e1","$get$e1",function(){return S.D("AUTOLAUNCH","Weapon fires by itself without reason.",null,"")},"ht","$get$ht",function(){return S.D("FREERES","Does not drop resources when destroyed. Good for missiles and drones.",null,"")},"cW","$get$cW",function(){return S.D("FACTORY","Allows construction of other ships.","cog","Factory")},"bk","$get$bk",function(){return S.D("SEED","Can plant on ENVIRONMENTAL blocks and asteroids. Will thrust if also a THRUSTER. Enables the command settings section.",null,"")},"bP","$get$bP",function(){return S.D("CHARGING","Weapon must be charged before firing. Requires CANNON or LASER.",null,"")},"cX","$get$cX",function(){return S.D("MELEE","Does additional damage on contact with enemy blocks.","tint","Additional Melee Damage")},"hI","$get$hI",function(){return S.D("SELFFACTORY","Allows construction of ships, but only of the same blueprint.","cog","Self-Factory")},"hy","$get$hy",function(){return S.D("NOCLIP","Does not collide with objects.","random","Does not collide")},"e3","$get$e3",function(){return S.D("INVISIBLE","Does not render the block shape. Still renders turrets and shields.","eye-close warningminor","Invisible")},"cY","$get$cY",function(){return S.D("TELEPORTER","Allows the ship to teleport at a cost of energy per unit mass.","transfer","Teleporter")},"hr","$get$hr",function(){return S.D("DEACTIVATES","Deactivates instead of being destroyed. NOT RECOMMENDED.","exclamation-sign warning","Deactivates instead of being destroyed")},"hJ","$get$hJ",function(){return S.D("TELESPAWN","Like FACTORY, but created ships will teleport in fully built, for free. Requires a factory block on the ship to function. NOT RECOMMENDED.","cog warning","Teleport Factory")},"hp","$get$hp",function(){return S.D("AUTOFIRE","Weapon is bound to point defence by default and will be used as such by AI.",null,"")},"hu","$get$hu",function(){return S.D("INTLINES","Draws lines between adjacent blocks.",null,"")},"bS","$get$bS",function(){return S.D("ROTATOR","Like TURRET, but for thrusters.",null,"")},"cU","$get$cU",function(){return S.D("ACTIVATE","Block can be activated.",null,"")},"hF","$get$hF",function(){return S.D("PALETTE","Block does not need to be on a ship to show up in the player's database.",null,"")},"hB","$get$hB",function(){return S.D("NOPALETTE","Block will not show up in the player's database.",null,"")},"hK","$get$hK",function(){return S.D("UNIQUE","Used internally for blocks that cannot be deleted or copied in the editor. Never use.",null,"")},"hq","$get$hq",function(){return S.D("BUMPER","Invulnerability to melee damage.",null,"")},"hz","$get$hz",function(){return S.D("NOCLIP_ALLY","Does not collide with objects with the same faction.","random","Does not collide with allies")},"hE","$get$hE",function(){return S.D("ONEUSE","Block is destroyed after use.",null,"")},"hC","$get$hC",function(){return S.D("NORECOLOR","Block cannot be recolored.",null,"")},"hv","$get$hv",function(){return S.D("LAUNCHER_BARRAGE","Warning: inconsistent. Launcher regenerates all missiles before firing them all at once.",null,"")},"hA","$get$hA",function(){return S.D("NOICON","Block does not render icons. This includes turret circles.",null,"")},"hn","$get$hn",function(){return S.D("ALWAYSFIRE","Weapon fires by itself without reason and is ignored by the AI.",null,"")},"hw","$get$hw",function(){return S.D("NEVERFIRE","Weapon fires by itself without reason and is ignored by the AI.",null,"")},"hx","$get$hx",function(){return S.D("NEVERLAUNCH","Launches by itself without reason and is ignored by the AI.",null,"")},"e2","$get$e2",function(){return S.D("FIN","Block converts velocity in any direction to forward motion.",null,"")},"cZ","$get$cZ",function(){return[$.$get$cf(),$.$get$bl(),$.$get$bQ(),$.$get$bx(),$.$get$bO(),$.$get$bR(),$.$get$ci(),$.$get$e5(),$.$get$ay(),$.$get$cg(),$.$get$ho(),$.$get$hG(),$.$get$cV(),$.$get$e4(),$.$get$hD(),$.$get$hs(),$.$get$cj(),$.$get$hH(),$.$get$ch(),$.$get$ht(),$.$get$cW(),$.$get$bk(),$.$get$bP(),$.$get$cX(),$.$get$hI(),$.$get$hy(),$.$get$e3(),$.$get$cY(),$.$get$hr(),$.$get$hJ(),$.$get$hp(),$.$get$hu(),$.$get$e1(),$.$get$bS(),$.$get$cU(),$.$get$hF(),$.$get$hB(),$.$get$hK(),$.$get$hq(),$.$get$hz(),$.$get$hE(),$.$get$hC(),$.$get$hv(),$.$get$hA(),$.$get$hn(),$.$get$hw(),$.$get$e2(),$.$get$hx()]},"fN","$get$fN",function(){return S.bj("EXPLOSIVE","Red shapes which explode on contact",null,"")},"fQ","$get$fQ",function(){return S.bj("PENROSE","Penrose rhombus asteroid parts",null,"")},"fR","$get$fR",function(){return S.bj("SQUARE","Square asteroid parts",null,"")},"fO","$get$fO",function(){return S.bj("HEXAGON","Hexagonal asteroid parts",null,"")},"fS","$get$fS",function(){return S.bj("TRIANGLE","Triangular asteroid parts",null,"")},"fP","$get$fP",function(){return S.bj("OCTAGON","Octagonal asteroid parts",null,"")},"fT","$get$fT",function(){return S.bj("UNIFORM_SIZE","?",null,"")},"fU","$get$fU",function(){return S.bj("UNIFORM_TYPE","?",null,"")},"dZ","$get$dZ",function(){return[$.$get$fN(),$.$get$fQ(),$.$get$fR(),$.$get$fO(),$.$get$fS(),$.$get$fP(),$.$get$fT(),$.$get$fU()]},"h","$get$h",function(){return H.ik(P.x,S.aa)},"iA","$get$iA",function(){return P.ae('\\b([\\w|\\.]+)\\b[\\s\\n\\r]*=[\\s\\n\\r]*([^",;{}\\n\\r]+),*',!0,!1)},"iG","$get$iG",function(){return P.ae('\\b([\\w|\\.]+)\\b[\\s\\n\\r]*=[\\s\\n\\r]*([{"])',!0,!1)},"iH","$get$iH",function(){return P.ae("(.)[\\s\\n\\r]*{[\\s\\n\\r]*([\\d]+|0[xX][0-9a-fA-F]+)[\\s\\n\\r]*,",!0,!1)},"iI","$get$iI",function(){return P.ae("(--|#).*[\\n\\r]",!0,!1)},"ew","$get$ew",function(){return P.ae(",[\\s\\n\\r]*}",!0,!1)},"iJ","$get$iJ",function(){return P.ae('(["}])\\s*[\\n\\r]',!0,!1)},"iK","$get$iK",function(){return P.ae('{([\\s\\n\\r]*([-\\d\\.]+|"[\\w\\d\\s-^"]+"|[\\w_]+)[\\s\\n\\r]*,*)+[\\s\\n\\r]*}',!0,!1)},"iL","$get$iL",function(){return P.ae("(})[\\s\\n\\r]*([^,}])",!0,!1)},"iM","$get$iM",function(){return P.ae("(\\\\)",!0,!1)},"iB","$get$iB",function(){return P.ae('(=[\\s\\n\\r]*"[^"]*")([\\s\\n\\r]*[^,])',!0,!1)},"iC","$get$iC",function(){return P.ae('=\\s*_\\("(.*)"\\)',!0,!1)},"iD","$get$iD",function(){return P.ae("{([\\d]+|0[xX][0-9a-fA-F]+)(,\\s*{\\s*([-\\d\\.]+)\\s*,\\s*([-\\d\\.]+)\\s*})?,*\\s*(([-\\d\\.]+[^}]*,*)*|(\\w*=(.|{.*}),*)*)}",!0,!1)},"iE","$get$iE",function(){return P.ae("([^:\\s\\n\\r][\\s\\n\\r]*)(?={)",!0,!1)},"iF","$get$iF",function(){return P.ae('"[\\w\\d\\s-^"]+"|[-\\d\\.]+|[\\w_]+',!0,!1)},"ex","$get$ex",function(){return P.Y(["blockscale","scale","blockshape","shape"])},"iN","$get$iN",function(){return P.ae("\\d+_",!0,!1)},"eg","$get$eg",function(){return P.Y(["NORMAL",C.b,"LAUNCHER",C.i,"THRUSTER_IN",C.m,"THRUSTER_OUT",C.n,"WEAPON_IN",C.p,"WEAPON_OUT",C.l,"MISSILE",C.j,"ROOT",C.q])},"eI","$get$eI",function(){return H.ik(P.y,S.aM)},"as","$get$as",function(){var z=S.u("MISSING",20,!1)
z.w(new S.rS())
z.p()
return z},"bC","$get$bC",function(){var z=S.u("SQUARE",10,!1)
z.w(new S.rU())
z.p()
return z},"jv","$get$jv",function(){var z=S.u("OCTAGON",10,!1)
z.w(new S.tU())
z.p()
return z},"jZ","$get$jZ",function(){var z=S.u("THRUSTER",10,!1)
z.w(new S.tT())
z.p()
return z},"j0","$get$j0",function(){var z=S.u("CANNON",10,!1)
z.w(new S.tS())
z.p()
return z},"jr","$get$jr",function(){var z=S.u("MISSILE",10,!1)
z.w(new S.tR())
z.p()
return z},"jy","$get$jy",function(){var z=S.u("RECT",5,!1)
z.w(new S.tQ())
z.p()
return z},"jg","$get$jg",function(){var z=S.u("HEXAGON",10,!1)
z.w(new S.tP())
z.p()
return z},"k1","$get$k1",function(){var z=S.u("TRI",10,!1)
z.w(new S.tO())
z.p()
return z},"j2","$get$j2",function(){var z=S.u("COMMAND",10,!1)
z.w(new S.tN())
z.p()
return z},"j3","$get$j3",function(){var z=S.u("COMMAND_MISSILE",10,!1)
z.w(new S.tL())
z.p()
return z},"jU","$get$jU",function(){var z=S.u("SENSOR",10,!1)
z.w(new S.tK())
z.p()
return z},"j_","$get$j_",function(){var z=S.u("ADAPTER",10,!1)
z.w(new S.tJ())
z.p()
return z},"jx","$get$jx",function(){var z=S.u("PENTAGON",10,!1)
z.w(new S.tI())
z.p()
return z},"jI","$get$jI",function(){var z=S.u("RHOMBUS_72_108",10,!1)
z.w(new S.tH())
z.p()
return z},"jH","$get$jH",function(){var z=S.u("RHOMBUS_36_144",10,!1)
z.w(new S.tG())
z.p()
return z},"k_","$get$k_",function(){var z=S.u("THRUSTER_PENT",10,!1)
z.w(new S.tF())
z.p()
return z},"j6","$get$j6",function(){var z=S.u("DISH_WEAPON",4,!1)
z.w(new S.tE())
z.p()
return z},"j5","$get$j5",function(){var z=S.u("DISH_THRUSTER",4,!1)
z.w(new S.tD())
z.p()
return z},"jJ","$get$jJ",function(){var z=S.u("RIGHT_TRI",10,!1)
z.w(new S.tC())
z.aU(0,-2.356194490192345)
z.eh(0,3.9269908169872414,[0])
z.p()
return z},"jB","$get$jB",function(){var z=S.u("RECT_LAUNCHER",3,!1)
z.w(new S.tA())
z.p()
return z},"jz","$get$jz",function(){var z=S.u("RECT_CANNON",1,!1)
z.w(new S.tz())
z.p()
return z},"jA","$get$jA",function(){var z=S.u("RECT_CANNON_BOOST",1,!1)
z.w(new S.ty())
z.p()
return z},"jD","$get$jD",function(){var z=S.u("RECT_LONG",10,!1)
z.w(new S.tx())
z.p()
return z},"jp","$get$jp",function(){var z=S.u("ISOTRI_72",10,!1)
z.w(new S.tw())
z.p()
return z},"jn","$get$jn",function(){var z=S.u("ISOTRI_36",10,!1)
z.w(new S.tv())
z.p()
return z},"jK","$get$jK",function(){var z=S.u("RIGHT_TRI2L",10,!1)
z.w(new S.tu())
z.aU(0,-0.7853981633974483)
z.p()
return z},"jL","$get$jL",function(){var z=S.u("RIGHT_TRI2R",10,!1)
z.w(new S.tt())
z.aU(0,-2.356194490192345)
z.p()
return z},"jQ","$get$jQ",function(){var z=S.u("SEED_1",3,!1)
z.w(new S.tp())
z.p()
return z},"jR","$get$jR",function(){var z=S.u("SEED_2",3,!1)
z.w(new S.to())
z.p()
return z},"jS","$get$jS",function(){var z=S.u("SEED_3",3,!1)
z.w(new S.tn())
z.p()
return z},"jT","$get$jT",function(){var z=S.u("SEED_4",3,!1)
z.w(new S.tm())
z.p()
return z},"jE","$get$jE",function(){var z=S.u("RECT_LONG_NARROW",10,!1)
z.w(new S.ts())
z.p()
return z},"jC","$get$jC",function(){var z=S.u("RECT_LAUNCHER1",3,!1)
z.w(new S.tr())
z.p()
return z},"jM","$get$jM",function(){var z=S.u("RIGHT_TRI_22_5L",10,!1)
z.w(new S.tl())
z.aU(0,-0.7853981633974483)
z.p()
return z},"jN","$get$jN",function(){var z=S.u("RIGHT_TRI_22_5R",10,!1)
z.w(new S.tk())
z.aU(0,-2.356194490192345)
z.p()
return z},"j4","$get$j4",function(){var z=S.u("DISH_MISSILE",4,!1)
z.w(new S.tj())
z.p()
return z},"jG","$get$jG",function(){var z=S.u("RECT_ROOT",3,!1)
z.w(new S.ti())
z.p()
return z},"j7","$get$j7",function(){var z=S.u("GEM_1",3,!1)
z.w(new S.th())
z.p()
return z},"j8","$get$j8",function(){var z=S.u("GEM_2",3,!1)
z.w(new S.tg())
z.p()
return z},"ja","$get$ja",function(){var z=S.u("GEM_3",3,!1)
z.w(new S.te())
z.p()
return z},"jc","$get$jc",function(){var z=S.u("GEM_4",3,!1)
z.w(new S.td())
z.p()
return z},"jj","$get$jj",function(){var z=S.u("ISOTRI_25",10,!1)
z.w(new S.tc())
z.p()
return z},"jk","$get$jk",function(){var z=S.u("ISOTRI_25_MISSILE",10,!1)
z.w(new S.tb())
z.p()
return z},"jh","$get$jh",function(){var z=S.u("ISOTRI_13",10,!1)
z.w(new S.ta())
z.p()
return z},"ji","$get$ji",function(){var z=S.u("ISOTRI_13_MISSILE",10,!1)
z.w(new S.t9())
z.p()
return z},"jo","$get$jo",function(){var z=S.u("ISOTRI_6",10,!1)
z.w(new S.t8())
z.p()
return z},"jf","$get$jf",function(){var z=S.u("HEPTAGON_LAUNCHER",10,!0)
z.w(new S.t7())
z.p()
return z},"je","$get$je",function(){var z=S.u("HEPTAGON",10,!1)
z.w(new S.t6())
z.p()
return z},"j9","$get$j9",function(){var z=S.u("GEM_2_LAUNCHER",3,!0)
z.w(new S.t5())
z.p()
return z},"jb","$get$jb",function(){var z=S.u("GEM_3_LAUNCHER",3,!0)
z.w(new S.t3())
z.p()
return z},"jd","$get$jd",function(){var z=S.u("GEM_4_LAUNCHER",3,!0)
z.w(new S.t2())
z.p()
return z},"jF","$get$jF",function(){var z=S.u("RECT_QUARTER",10,!1)
z.w(new S.t1())
z.p()
return z},"jm","$get$jm",function(){var z=S.u("ISOTRI_3",10,!1)
z.w(new S.t0())
z.p()
return z},"jl","$get$jl",function(){var z=S.u("ISOTRI_25_WEAPON",10,!1)
z.w(new S.t_())
z.p()
return z},"ju","$get$ju",function(){var z=S.u("NONAGON",10,!1)
z.w(new S.rZ())
z.p()
return z},"jq","$get$jq",function(){var z=S.u("ISOTRI_80",10,!1)
z.w(new S.rY())
z.p()
return z},"k0","$get$k0",function(){var z=S.u("THRUSTER_RECT",10,!1)
z.w(new S.rX())
z.p()
return z},"jW","$get$jW",function(){var z=S.u("SQUARE_HALF",1,!1)
z.w(new S.rW())
z.p()
return z},"jX","$get$jX",function(){var z=S.u("SQUARE_LAUNCHER",10,!0)
z.w(new S.rV())
z.p()
return z},"jY","$get$jY",function(){var z=S.u("SQUARE_MISSILE",10,!1)
z.w(new S.tX())
z.p()
return z},"jO","$get$jO",function(){var z=S.u("RIGHT_TRI_30L",10,!1)
z.w(new S.tW())
z.aU(0,-0.7853981633974483)
z.p()
return z},"jP","$get$jP",function(){var z=S.u("RIGHT_TRI_30R",10,!1)
z.w(new S.tV())
z.aU(0,-2.356194490192345)
z.p()
return z},"jw","$get$jw",function(){var z=S.u("OCTAGON_1",10,!1)
z.w(new S.tM())
z.p()
return z},"jV","$get$jV",function(){var z=S.u("SQUARE_1",10,!1)
z.w(new S.tB())
z.p()
return z},"j1","$get$j1",function(){var z=S.u("CANNON2",10,!1)
z.w(new S.tq())
z.p()
return z},"js","$get$js",function(){var z=S.u("MISSILE_LAUNCHER",10,!1)
z.w(new S.tf())
z.p()
return z},"jt","$get$jt",function(){var z=S.u("MISSILE_SHORT",10,!1)
z.w(new S.t4())
z.p()
return z},"di","$get$di",function(){return[$.$get$bC(),$.$get$jv(),$.$get$jZ(),$.$get$j0(),$.$get$jr(),$.$get$jy(),$.$get$jg(),$.$get$k1(),$.$get$j2(),$.$get$j3(),$.$get$jU(),$.$get$j_(),$.$get$jx(),$.$get$jI(),$.$get$jH(),$.$get$k_(),$.$get$j6(),$.$get$j5(),$.$get$jJ(),$.$get$jB(),$.$get$jz(),$.$get$jA(),$.$get$jD(),$.$get$jp(),$.$get$jn(),$.$get$jK(),$.$get$jL(),$.$get$jE(),$.$get$jC(),$.$get$jQ(),$.$get$jR(),$.$get$jS(),$.$get$jT(),$.$get$jM(),$.$get$jN(),$.$get$j4(),$.$get$jG(),$.$get$j7(),$.$get$j8(),$.$get$ja(),$.$get$jc(),$.$get$jj(),$.$get$jk(),$.$get$jh(),$.$get$ji(),$.$get$jo(),$.$get$jf(),$.$get$je(),$.$get$j9(),$.$get$jb(),$.$get$jd(),$.$get$jF(),$.$get$jm(),$.$get$jl(),$.$get$ju(),$.$get$jq(),$.$get$k0(),$.$get$jW(),$.$get$jX(),$.$get$jY(),$.$get$jO(),$.$get$jP(),$.$get$jw(),$.$get$jV(),$.$get$j1(),$.$get$js(),$.$get$jt()]},"aQ","$get$aQ",function(){return[]},"cA","$get$cA",function(){return P.an()},"kS","$get$kS",function(){return P.ae("\r\n|\r|\n",!0,!1)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=["e","f","x","o","each",null,"invocation","element","attributeName","value","context","y","isolate","numberOfArguments","arg1","arg2","arg3","key","sender","_","a","b","attr","n","callback","captureThis","self","arguments","arg4","object","event","tinycolor","fe","closure"]
init.types=[{func:1,args:[W.et]},{func:1,args:[,,]},{func:1,args:[S.aa]},{func:1,args:[,]},{func:1,args:[W.aG]},{func:1},{func:1,args:[P.ct]},{func:1,args:[P.y]},{func:1,args:[S.aM,P.x]},{func:1,v:true},{func:1,args:[S.p]},{func:1,args:[P.y,,]},{func:1,args:[W.aw,P.F]},{func:1,args:[S.ao,S.ao]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,ret:P.y,args:[P.x]},{func:1,args:[S.ey]},{func:1,ret:P.a6,args:[P.aC,P.aC]},{func:1,ret:P.bH,args:[W.N,P.y,P.y,W.eT]},{func:1,args:[,P.y]},{func:1,args:[{func:1,v:true}]},{func:1,args:[P.cy,,]},{func:1,v:true,args:[W.z,W.z]},{func:1,args:[S.aH,S.aH]},{func:1,args:[S.U]},{func:1,args:[W.eC]},{func:1,args:[S.aM,S.aM]},{func:1,ret:P.y,args:[P.y]},{func:1,ret:P.x,args:[P.aj,P.aj]},{func:1,ret:P.x,args:[P.y]},{func:1,ret:P.a6,args:[P.y]},{func:1,ret:P.i,args:[,]},{func:1,ret:P.y,args:[S.p]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.v7(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.bd=a.bd
Isolate.ac=a.ac
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.kZ(S.kT(),b)},[])
else (function(b){H.kZ(S.kT(),b)})([])})})()