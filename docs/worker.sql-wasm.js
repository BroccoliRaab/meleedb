
// We are modularizing this manually because the current modularize setting in Emscripten has some issues:
// https://github.com/kripken/emscripten/issues/5820
// In addition, When you use emcc's modularization, it still expects to export a global object called `Module`,
// which is able to be used/called before the WASM is loaded.
// The modularization below exports a promise that loads and resolves to the actual sql.js module.
// That way, this module can't be used before the WASM is finished loading.

// We are going to define a function that a user will call to start loading initializing our Sql.js library
// However, that function might be called multiple times, and on subsequent calls, we don't actually want it to instantiate a new instance of the Module
// Instead, we want to return the previously loaded module

// TODO: Make this not declare a global if used in the browser
var initSqlJsPromise = undefined;

var initSqlJs = function (moduleConfig) {

    if (initSqlJsPromise){
      return initSqlJsPromise;
    }
    // If we're here, we've never called this function before
    initSqlJsPromise = new Promise(function (resolveModule, reject) {

        // We are modularizing this manually because the current modularize setting in Emscripten has some issues:
        // https://github.com/kripken/emscripten/issues/5820

        // The way to affect the loading of emcc compiled modules is to create a variable called `Module` and add
        // properties to it, like `preRun`, `postRun`, etc
        // We are using that to get notified when the WASM has finished loading.
        // Only then will we return our promise

        // If they passed in a moduleConfig object, use that
        // Otherwise, initialize Module to the empty object
        var Module = typeof moduleConfig !== 'undefined' ? moduleConfig : {};

        // EMCC only allows for a single onAbort function (not an array of functions)
        // So if the user defined their own onAbort function, we remember it and call it
        var originalOnAbortFunction = Module['onAbort'];
        Module['onAbort'] = function (errorThatCausedAbort) {
            reject(new Error(errorThatCausedAbort));
            if (originalOnAbortFunction){
              originalOnAbortFunction(errorThatCausedAbort);
            }
        };

        Module['postRun'] = Module['postRun'] || [];
        Module['postRun'].push(function () {
            // When Emscripted calls postRun, this promise resolves with the built Module
            resolveModule(Module);
        });

        // There is a section of code in the emcc-generated code below that looks like this:
        // (Note that this is lowercase `module`)
        // if (typeof module !== 'undefined') {
        //     module['exports'] = Module;
        // }
        // When that runs, it's going to overwrite our own modularization export efforts in shell-post.js!
        // The only way to tell emcc not to emit it is to pass the MODULARIZE=1 or MODULARIZE_INSTANCE=1 flags,
        // but that carries with it additional unnecessary baggage/bugs we don't want either.
        // So, we have three options:
        // 1) We undefine `module`
        // 2) We remember what `module['exports']` was at the beginning of this function and we restore it later
        // 3) We write a script to remove those lines of code as part of the Make process.
        //
        // Since those are the only lines of code that care about module, we will undefine it. It's the most straightforward
        // of the options, and has the side effect of reducing emcc's efforts to modify the module if its output were to change in the future.
        // That's a nice side effect since we're handling the modularization efforts ourselves
        module = undefined;

        // The emcc-generated code and shell-post.js code goes below,
        // meaning that all of it runs inside of this promise. If anything throws an exception, our promise will abort
var e;e||(e=typeof Module !== 'undefined' ? Module : {});
e.onRuntimeInitialized=function(){function a(h,m){this.Ma=h;this.db=m;this.La=1;this.cb=[]}function b(h){this.filename="dbfile_"+(4294967295*Math.random()>>>0);if(null!=h){var m=this.filename,q=m?k("//"+m):"/";m=ba(!0,!0);q=ca(q,(void 0!==m?m:438)&4095|32768,0);if(h){if("string"===typeof h){for(var v=Array(h.length),D=0,R=h.length;D<R;++D)v[D]=h.charCodeAt(D);h=v}da(q,m|146);v=l(q,"w");ea(v,h,0,h.length,0,void 0);fa(v);da(q,m)}}this.handleError(f(this.filename,c));this.db=p(c,"i32");rc(this.db);this.ab=
{};this.Sa={}}var c=t(4),d=e.cwrap,f=d("sqlite3_open","number",["string","number"]),g=d("sqlite3_close_v2","number",["number"]),n=d("sqlite3_exec","number",["number","string","number","number","number"]),u=d("sqlite3_changes","number",["number"]),w=d("sqlite3_prepare_v2","number",["number","string","number","number","number"]),r=d("sqlite3_prepare_v2","number",["number","number","number","number","number"]),C=d("sqlite3_bind_text","number",["number","number","number","number","number"]),E=d("sqlite3_bind_blob",
"number",["number","number","number","number","number"]),aa=d("sqlite3_bind_double","number",["number","number","number"]),B=d("sqlite3_bind_int","number",["number","number","number"]),Aa=d("sqlite3_bind_parameter_index","number",["number","string"]),ma=d("sqlite3_step","number",["number"]),sc=d("sqlite3_errmsg","string",["number"]),wb=d("sqlite3_data_count","number",["number"]),tc=d("sqlite3_column_double","number",["number","number"]),uc=d("sqlite3_column_text","string",["number","number"]),vc=
d("sqlite3_column_blob","number",["number","number"]),wc=d("sqlite3_column_bytes","number",["number","number"]),xc=d("sqlite3_column_type","number",["number","number"]),yc=d("sqlite3_column_name","string",["number","number"]),zc=d("sqlite3_reset","number",["number"]),Ac=d("sqlite3_clear_bindings","number",["number"]),Bc=d("sqlite3_finalize","number",["number"]),Cc=d("sqlite3_create_function_v2","number","number string number number number number number number number".split(" ")),Dc=d("sqlite3_value_type",
"number",["number"]),Ec=d("sqlite3_value_bytes","number",["number"]),Fc=d("sqlite3_value_text","string",["number"]),Gc=d("sqlite3_value_blob","number",["number"]),Hc=d("sqlite3_value_double","number",["number"]),Ic=d("sqlite3_result_double","",["number","number"]),xb=d("sqlite3_result_null","",["number"]),Jc=d("sqlite3_result_text","",["number","string","number","number"]),Kc=d("sqlite3_result_blob","",["number","number","number","number"]),Lc=d("sqlite3_result_int","",["number","number"]),yb=d("sqlite3_result_error",
"",["number","string","number"]),rc=d("RegisterExtensionFunctions","number",["number"]);a.prototype.bind=function(h){if(!this.Ma)throw"Statement closed";this.reset();return Array.isArray(h)?this.rb(h):this.sb(h)};a.prototype.step=function(){if(!this.Ma)throw"Statement closed";this.La=1;var h=ma(this.Ma);switch(h){case 100:return!0;case 101:return!1;default:return this.db.handleError(h)}};a.prototype.yb=function(h){null==h&&(h=this.La,this.La+=1);return tc(this.Ma,h)};a.prototype.zb=function(h){null==
h&&(h=this.La,this.La+=1);return uc(this.Ma,h)};a.prototype.getBlob=function(h){null==h&&(h=this.La,this.La+=1);var m=wc(this.Ma,h);var q=vc(this.Ma,h);var v=new Uint8Array(m);for(h=0;h<m;)v[h]=x[q+h],h+=1;return v};a.prototype.get=function(h){var m;null!=h&&this.bind(h)&&this.step();var q=[];h=0;for(m=wb(this.Ma);h<m;){switch(xc(this.Ma,h)){case 1:case 2:q.push(this.yb(h));break;case 3:q.push(this.zb(h));break;case 4:q.push(this.getBlob(h));break;default:q.push(null)}h+=1}return q};a.prototype.getColumnNames=
function(){var h;var m=[];var q=0;for(h=wb(this.Ma);q<h;)m.push(yc(this.Ma,q)),q+=1;return m};a.prototype.getAsObject=function(h){var m;var q=this.get(h);var v=this.getColumnNames();var D={};h=0;for(m=v.length;h<m;){var R=v[h];D[R]=q[h];h+=1}return D};a.prototype.run=function(h){null!=h&&this.bind(h);this.step();return this.reset()};a.prototype.vb=function(h,m){null==m&&(m=this.La,this.La+=1);h=ha(h);var q=ia(h);this.cb.push(q);this.db.handleError(C(this.Ma,m,q,h.length-1,0))};a.prototype.qb=function(h,
m){null==m&&(m=this.La,this.La+=1);var q=ia(h);this.cb.push(q);this.db.handleError(E(this.Ma,m,q,h.length,0))};a.prototype.ub=function(h,m){null==m&&(m=this.La,this.La+=1);this.db.handleError((h===(h|0)?B:aa)(this.Ma,m,h))};a.prototype.tb=function(h){null==h&&(h=this.La,this.La+=1);E(this.Ma,h,0,0,0)};a.prototype.jb=function(h,m){null==m&&(m=this.La,this.La+=1);switch(typeof h){case "string":this.vb(h,m);return;case "number":case "boolean":this.ub(h+0,m);return;case "object":if(null===h){this.tb(m);
return}if(null!=h.length){this.qb(h,m);return}}throw"Wrong API use : tried to bind a value of an unknown type ("+h+").";};a.prototype.sb=function(h){var m=this;Object.keys(h).forEach(function(q){var v=Aa(m.Ma,q);0!==v&&m.jb(h[q],v)});return!0};a.prototype.rb=function(h){var m;for(m=0;m<h.length;)this.jb(h[m],m+1),m+=1;return!0};a.prototype.reset=function(){return 0===Ac(this.Ma)&&0===zc(this.Ma)};a.prototype.freemem=function(){for(var h;void 0!==(h=this.cb.pop());)ja(h)};a.prototype.free=function(){var h=
0===Bc(this.Ma);delete this.db.ab[this.Ma];this.Ma=0;return h};b.prototype.run=function(h,m){if(!this.db)throw"Database closed";if(m){h=this.prepare(h,m);try{h.step()}finally{h.free()}}else this.handleError(n(this.db,h,0,0,c));return this};b.prototype.exec=function(h,m){if(!this.db)throw"Database closed";var q=ka();try{var v=la(h)+1,D=t(v);na(h,x,D,v);var R=D;var H=t(4);for(h=[];0!==p(R,"i8");){pa(c);pa(H);this.handleError(r(this.db,R,-1,c,H));var oa=p(c,"i32");R=p(H,"i32");if(0!==oa){var T=null;
var A=new a(oa,this);for(null!=m&&A.bind(m);A.step();)null===T&&(T={columns:A.getColumnNames(),values:[]},h.push(T)),T.values.push(A.get());A.free()}}return h}catch(N){throw A&&A.free(),N;}finally{qa(q)}};b.prototype.each=function(h,m,q,v){"function"===typeof m&&(v=q,q=m,m=void 0);h=this.prepare(h,m);try{for(;h.step();)q(h.getAsObject())}finally{h.free()}if("function"===typeof v)return v()};b.prototype.prepare=function(h,m){pa(c);this.handleError(w(this.db,h,-1,c,0));h=p(c,"i32");if(0===h)throw"Nothing to prepare";
var q=new a(h,this);null!=m&&q.bind(m);return this.ab[h]=q};b.prototype["export"]=function(){Object.values(this.ab).forEach(function(m){m.free()});Object.values(this.Sa).forEach(ra);this.Sa={};this.handleError(g(this.db));var h=sa(this.filename);this.handleError(f(this.filename,c));this.db=p(c,"i32");return h};b.prototype.close=function(){Object.values(this.ab).forEach(function(h){h.free()});Object.values(this.Sa).forEach(ra);this.Sa={};this.handleError(g(this.db));ta("/"+this.filename);this.db=null};
b.prototype.handleError=function(h){if(0===h)return null;h=sc(this.db);throw Error(h);};b.prototype.getRowsModified=function(){return u(this.db)};b.prototype.create_function=function(h,m){Object.prototype.hasOwnProperty.call(this.Sa,h)&&(ua.push(this.Sa[h]),delete this.Sa[h]);var q=va(function(v,D,R){for(var H,oa=[],T=0;T<D;T+=1){var A=p(R+4*T,"i32"),N=Dc(A);if(1===N||2===N)A=Hc(A);else if(3===N)A=Fc(A);else if(4===N){N=A;A=Ec(N);N=Gc(N);for(var Cb=new Uint8Array(A),Fa=0;Fa<A;Fa+=1)Cb[Fa]=x[N+Fa];
A=Cb}else A=null;oa.push(A)}try{H=m.apply(null,oa)}catch(Oc){yb(v,Oc,-1);return}switch(typeof H){case "boolean":Lc(v,H?1:0);break;case "number":Ic(v,H);break;case "string":Jc(v,H,-1,-1);break;case "object":null===H?xb(v):null!=H.length?(D=ia(H),Kc(v,D,H.length,-1),ja(D)):yb(v,"Wrong API use : tried to return a value of an unknown type ("+H+").",-1);break;default:xb(v)}});this.Sa[h]=q;this.handleError(Cc(this.db,h,m.length,1,0,q,0,0,0));return this};e.Database=b};var wa={},y;
for(y in e)e.hasOwnProperty(y)&&(wa[y]=e[y]);var xa="./this.program",ya=!1,za=!1,Ba=!1,Ca=!1;ya="object"===typeof window;za="function"===typeof importScripts;Ba="object"===typeof process&&"object"===typeof process.versions&&"string"===typeof process.versions.node;Ca=!ya&&!Ba&&!za;var z="",Da,Ea,Ga,Ha;
if(Ba)z=za?require("path").dirname(z)+"/":__dirname+"/",Da=function(a,b){Ga||(Ga=require("fs"));Ha||(Ha=require("path"));a=Ha.normalize(a);return Ga.readFileSync(a,b?null:"utf8")},Ea=function(a){a=Da(a,!0);a.buffer||(a=new Uint8Array(a));assert(a.buffer);return a},1<process.argv.length&&(xa=process.argv[1].replace(/\\/g,"/")),process.argv.slice(2),"undefined"!==typeof module&&(module.exports=e),process.on("unhandledRejection",F),e.inspect=function(){return"[Emscripten Module object]"};else if(Ca)"undefined"!=
typeof read&&(Da=function(a){return read(a)}),Ea=function(a){if("function"===typeof readbuffer)return new Uint8Array(readbuffer(a));a=read(a,"binary");assert("object"===typeof a);return a},"undefined"!==typeof print&&("undefined"===typeof console&&(console={}),console.log=print,console.warn=console.error="undefined"!==typeof printErr?printErr:print);else if(ya||za)za?z=self.location.href:document.currentScript&&(z=document.currentScript.src),z=0!==z.indexOf("blob:")?z.substr(0,z.lastIndexOf("/")+
1):"",Da=function(a){var b=new XMLHttpRequest;b.open("GET",a,!1);b.send(null);return b.responseText},za&&(Ea=function(a){var b=new XMLHttpRequest;b.open("GET",a,!1);b.responseType="arraybuffer";b.send(null);return new Uint8Array(b.response)});var Ia=e.print||console.log.bind(console),G=e.printErr||console.warn.bind(console);for(y in wa)wa.hasOwnProperty(y)&&(e[y]=wa[y]);wa=null;e.thisProgram&&(xa=e.thisProgram);function Ja(a){var b=I[Ka>>2];a=b+a+15&-16;a>J.length&&F();I[Ka>>2]=a;return b}
var ua=[];
function va(a){if(ua.length)var b=ua.pop();else{b=La.length;try{La.grow(1)}catch(g){if(!(g instanceof RangeError))throw g;throw"Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";}}try{La.set(b,a)}catch(g){if(!(g instanceof TypeError))throw g;assert(!0,"Missing signature argument to addFunction");if("function"===typeof WebAssembly.Function){for(var c={i:"i32",j:"i64",f:"f32",d:"f64"},d={parameters:[],results:[]},f=1;4>f;++f)d.parameters.push(c["viii"[f]]);a=new WebAssembly.Function(d,a)}else{c=[1,
0,1,96];d={i:127,j:126,f:125,d:124};c.push(3);for(f=0;3>f;++f)c.push(d["iii"[f]]);c.push(0);c[1]=c.length-2;f=new Uint8Array([0,97,115,109,1,0,0,0].concat(c,[2,7,1,1,101,1,102,0,0,7,5,1,1,102,0,0]));f=new WebAssembly.Module(f);a=(new WebAssembly.Instance(f,{e:{f:a}})).exports.f}La.set(b,a)}return b}function ra(a){ua.push(a)}var Ma;e.wasmBinary&&(Ma=e.wasmBinary);var noExitRuntime;e.noExitRuntime&&(noExitRuntime=e.noExitRuntime);"object"!==typeof WebAssembly&&G("no native wasm support detected");
function pa(a){var b="i32";"*"===b.charAt(b.length-1)&&(b="i32");switch(b){case "i1":x[a>>0]=0;break;case "i8":x[a>>0]=0;break;case "i16":Na[a>>1]=0;break;case "i32":I[a>>2]=0;break;case "i64":K=[0,(L=0,1<=+Oa(L)?0<L?(Pa(+Qa(L/4294967296),4294967295)|0)>>>0:~~+Ra((L-+(~~L>>>0))/4294967296)>>>0:0)];I[a>>2]=K[0];I[a+4>>2]=K[1];break;case "float":Sa[a>>2]=0;break;case "double":Ta[a>>3]=0;break;default:F("invalid type for setValue: "+b)}}
function p(a,b){b=b||"i8";"*"===b.charAt(b.length-1)&&(b="i32");switch(b){case "i1":return x[a>>0];case "i8":return x[a>>0];case "i16":return Na[a>>1];case "i32":return I[a>>2];case "i64":return I[a>>2];case "float":return Sa[a>>2];case "double":return Ta[a>>3];default:F("invalid type for getValue: "+b)}return null}var Ua,La=new WebAssembly.Table({initial:384,element:"anyfunc"}),Va=!1;function assert(a,b){a||F("Assertion failed: "+b)}
function Wa(a){var b=e["_"+a];assert(b,"Cannot call unknown function "+a+", make sure it is exported");return b}
function Xa(a,b,c,d){var f={string:function(r){var C=0;if(null!==r&&void 0!==r&&0!==r){var E=(r.length<<2)+1;C=t(E);na(r,J,C,E)}return C},array:function(r){var C=t(r.length);x.set(r,C);return C}},g=Wa(a),n=[];a=0;if(d)for(var u=0;u<d.length;u++){var w=f[c[u]];w?(0===a&&(a=ka()),n[u]=w(d[u])):n[u]=d[u]}c=g.apply(null,n);c=function(r){return"string"===b?M(r):"boolean"===b?!!r:r}(c);0!==a&&qa(a);return c}var Ya=0,Za=3;
function ia(a){var b=Ya;if("number"===typeof a){var c=!0;var d=a}else c=!1,d=a.length;var f;b==Za?f=g:f=[$a,t,Ja][b](Math.max(d,1));if(c){var g=f;assert(0==(f&3));for(a=f+(d&-4);g<a;g+=4)I[g>>2]=0;for(a=f+d;g<a;)x[g++>>0]=0;return f}a.subarray||a.slice?J.set(a,f):J.set(new Uint8Array(a),f);return f}var ab="undefined"!==typeof TextDecoder?new TextDecoder("utf8"):void 0;
function bb(a,b,c){var d=b+c;for(c=b;a[c]&&!(c>=d);)++c;if(16<c-b&&a.subarray&&ab)return ab.decode(a.subarray(b,c));for(d="";b<c;){var f=a[b++];if(f&128){var g=a[b++]&63;if(192==(f&224))d+=String.fromCharCode((f&31)<<6|g);else{var n=a[b++]&63;f=224==(f&240)?(f&15)<<12|g<<6|n:(f&7)<<18|g<<12|n<<6|a[b++]&63;65536>f?d+=String.fromCharCode(f):(f-=65536,d+=String.fromCharCode(55296|f>>10,56320|f&1023))}}else d+=String.fromCharCode(f)}return d}function M(a){return a?bb(J,a,void 0):""}
function na(a,b,c,d){if(!(0<d))return 0;var f=c;d=c+d-1;for(var g=0;g<a.length;++g){var n=a.charCodeAt(g);if(55296<=n&&57343>=n){var u=a.charCodeAt(++g);n=65536+((n&1023)<<10)|u&1023}if(127>=n){if(c>=d)break;b[c++]=n}else{if(2047>=n){if(c+1>=d)break;b[c++]=192|n>>6}else{if(65535>=n){if(c+2>=d)break;b[c++]=224|n>>12}else{if(c+3>=d)break;b[c++]=240|n>>18;b[c++]=128|n>>12&63}b[c++]=128|n>>6&63}b[c++]=128|n&63}}b[c]=0;return c-f}
function la(a){for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);55296<=d&&57343>=d&&(d=65536+((d&1023)<<10)|a.charCodeAt(++c)&1023);127>=d?++b:b=2047>=d?b+2:65535>=d?b+3:b+4}return b}"undefined"!==typeof TextDecoder&&new TextDecoder("utf-16le");function cb(a){var b=la(a)+1,c=$a(b);c&&na(a,x,c,b);return c}var db,x,J,Na,I,Sa,Ta;
function eb(a){db=a;e.HEAP8=x=new Int8Array(a);e.HEAP16=Na=new Int16Array(a);e.HEAP32=I=new Int32Array(a);e.HEAPU8=J=new Uint8Array(a);e.HEAPU16=new Uint16Array(a);e.HEAPU32=new Uint32Array(a);e.HEAPF32=Sa=new Float32Array(a);e.HEAPF64=Ta=new Float64Array(a)}var Ka=62896,fb=e.INITIAL_MEMORY||16777216;e.wasmMemory?Ua=e.wasmMemory:Ua=new WebAssembly.Memory({initial:fb/65536});Ua&&(db=Ua.buffer);fb=db.byteLength;eb(db);I[Ka>>2]=5305936;
function gb(a){for(;0<a.length;){var b=a.shift();if("function"==typeof b)b();else{var c=b.xb;"number"===typeof c?void 0===b.eb?e.dynCall_v(c):e.dynCall_vi(c,b.eb):c(void 0===b.eb?null:b.eb)}}}var hb=[],ib=[],jb=[],kb=[];function lb(){var a=e.preRun.shift();hb.unshift(a)}var Oa=Math.abs,Ra=Math.ceil,Qa=Math.floor,Pa=Math.min,mb=0,nb=null,ob=null;e.preloadedImages={};e.preloadedAudios={};
function F(a){if(e.onAbort)e.onAbort(a);Ia(a);G(a);Va=!0;throw new WebAssembly.RuntimeError("abort("+a+"). Build with -s ASSERTIONS=1 for more info.");}function pb(){var a=qb;return String.prototype.startsWith?a.startsWith("data:application/octet-stream;base64,"):0===a.indexOf("data:application/octet-stream;base64,")}var qb="sql-wasm.wasm";if(!pb()){var rb=qb;qb=e.locateFile?e.locateFile(rb,z):z+rb}
function sb(){try{if(Ma)return new Uint8Array(Ma);if(Ea)return Ea(qb);throw"both async and sync fetching of the wasm failed";}catch(a){F(a)}}function tb(){return Ma||!ya&&!za||"function"!==typeof fetch?new Promise(function(a){a(sb())}):fetch(qb,{credentials:"same-origin"}).then(function(a){if(!a.ok)throw"failed to load wasm binary file at '"+qb+"'";return a.arrayBuffer()}).catch(function(){return sb()})}var L,K;ib.push({xb:function(){ub()}});
function vb(a){return a.replace(/\b_Z[\w\d_]+/g,function(b){return b===b?b:b+" ["+b+"]"})}function zb(a,b){for(var c=0,d=a.length-1;0<=d;d--){var f=a[d];"."===f?a.splice(d,1):".."===f?(a.splice(d,1),c++):c&&(a.splice(d,1),c--)}if(b)for(;c;c--)a.unshift("..");return a}function k(a){var b="/"===a.charAt(0),c="/"===a.substr(-1);(a=zb(a.split("/").filter(function(d){return!!d}),!b).join("/"))||b||(a=".");a&&c&&(a+="/");return(b?"/":"")+a}
function Ab(a){var b=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);a=b[0];b=b[1];if(!a&&!b)return".";b&&(b=b.substr(0,b.length-1));return a+b}function Bb(a){if("/"===a)return"/";var b=a.lastIndexOf("/");return-1===b?a:a.substr(b+1)}function Db(a){e.___errno_location&&(I[e.___errno_location()>>2]=a)}
function Eb(){for(var a="",b=!1,c=arguments.length-1;-1<=c&&!b;c--){b=0<=c?arguments[c]:"/";if("string"!==typeof b)throw new TypeError("Arguments to path.resolve must be strings");if(!b)return"";a=b+"/"+a;b="/"===b.charAt(0)}a=zb(a.split("/").filter(function(d){return!!d}),!b).join("/");return(b?"/":"")+a||"."}var Fb=[];function Gb(a,b){Fb[a]={input:[],output:[],Xa:b};Hb(a,Ib)}
var Ib={open:function(a){var b=Fb[a.node.rdev];if(!b)throw new O(43);a.tty=b;a.seekable=!1},close:function(a){a.tty.Xa.flush(a.tty)},flush:function(a){a.tty.Xa.flush(a.tty)},read:function(a,b,c,d){if(!a.tty||!a.tty.Xa.nb)throw new O(60);for(var f=0,g=0;g<d;g++){try{var n=a.tty.Xa.nb(a.tty)}catch(u){throw new O(29);}if(void 0===n&&0===f)throw new O(6);if(null===n||void 0===n)break;f++;b[c+g]=n}f&&(a.node.timestamp=Date.now());return f},write:function(a,b,c,d){if(!a.tty||!a.tty.Xa.gb)throw new O(60);
try{for(var f=0;f<d;f++)a.tty.Xa.gb(a.tty,b[c+f])}catch(g){throw new O(29);}d&&(a.node.timestamp=Date.now());return f}},Jb={nb:function(a){if(!a.input.length){var b=null;if(Ba){var c=Buffer.pb?Buffer.pb(256):new Buffer(256),d=0;try{d=Ga.readSync(process.stdin.fd,c,0,256,null)}catch(f){if(-1!=f.toString().indexOf("EOF"))d=0;else throw f;}0<d?b=c.slice(0,d).toString("utf-8"):b=null}else"undefined"!=typeof window&&"function"==typeof window.prompt?(b=window.prompt("Input: "),null!==b&&(b+="\n")):"function"==
typeof readline&&(b=readline(),null!==b&&(b+="\n"));if(!b)return null;a.input=ha(b,!0)}return a.input.shift()},gb:function(a,b){null===b||10===b?(Ia(bb(a.output,0)),a.output=[]):0!=b&&a.output.push(b)},flush:function(a){a.output&&0<a.output.length&&(Ia(bb(a.output,0)),a.output=[])}},Kb={gb:function(a,b){null===b||10===b?(G(bb(a.output,0)),a.output=[]):0!=b&&a.output.push(b)},flush:function(a){a.output&&0<a.output.length&&(G(bb(a.output,0)),a.output=[])}},P={Qa:null,Ra:function(){return P.createNode(null,
"/",16895,0)},createNode:function(a,b,c,d){if(24576===(c&61440)||4096===(c&61440))throw new O(63);P.Qa||(P.Qa={dir:{node:{Pa:P.Ia.Pa,Oa:P.Ia.Oa,lookup:P.Ia.lookup,Ya:P.Ia.Ya,rename:P.Ia.rename,unlink:P.Ia.unlink,rmdir:P.Ia.rmdir,readdir:P.Ia.readdir,symlink:P.Ia.symlink},stream:{Ua:P.Ja.Ua}},file:{node:{Pa:P.Ia.Pa,Oa:P.Ia.Oa},stream:{Ua:P.Ja.Ua,read:P.Ja.read,write:P.Ja.write,ib:P.Ja.ib,Za:P.Ja.Za,$a:P.Ja.$a}},link:{node:{Pa:P.Ia.Pa,Oa:P.Ia.Oa,readlink:P.Ia.readlink},stream:{}},kb:{node:{Pa:P.Ia.Pa,
Oa:P.Ia.Oa},stream:Lb}});c=Mb(a,b,c,d);Q(c.mode)?(c.Ia=P.Qa.dir.node,c.Ja=P.Qa.dir.stream,c.Ha={}):32768===(c.mode&61440)?(c.Ia=P.Qa.file.node,c.Ja=P.Qa.file.stream,c.Na=0,c.Ha=null):40960===(c.mode&61440)?(c.Ia=P.Qa.link.node,c.Ja=P.Qa.link.stream):8192===(c.mode&61440)&&(c.Ia=P.Qa.kb.node,c.Ja=P.Qa.kb.stream);c.timestamp=Date.now();a&&(a.Ha[b]=c);return c},Hb:function(a){if(a.Ha&&a.Ha.subarray){for(var b=[],c=0;c<a.Na;++c)b.push(a.Ha[c]);return b}return a.Ha},Ib:function(a){return a.Ha?a.Ha.subarray?
a.Ha.subarray(0,a.Na):new Uint8Array(a.Ha):new Uint8Array(0)},lb:function(a,b){var c=a.Ha?a.Ha.length:0;c>=b||(b=Math.max(b,c*(1048576>c?2:1.125)|0),0!=c&&(b=Math.max(b,256)),c=a.Ha,a.Ha=new Uint8Array(b),0<a.Na&&a.Ha.set(c.subarray(0,a.Na),0))},Eb:function(a,b){if(a.Na!=b)if(0==b)a.Ha=null,a.Na=0;else{if(!a.Ha||a.Ha.subarray){var c=a.Ha;a.Ha=new Uint8Array(b);c&&a.Ha.set(c.subarray(0,Math.min(b,a.Na)))}else if(a.Ha||(a.Ha=[]),a.Ha.length>b)a.Ha.length=b;else for(;a.Ha.length<b;)a.Ha.push(0);a.Na=
b}},Ia:{Pa:function(a){var b={};b.dev=8192===(a.mode&61440)?a.id:1;b.ino=a.id;b.mode=a.mode;b.nlink=1;b.uid=0;b.gid=0;b.rdev=a.rdev;Q(a.mode)?b.size=4096:32768===(a.mode&61440)?b.size=a.Na:40960===(a.mode&61440)?b.size=a.link.length:b.size=0;b.atime=new Date(a.timestamp);b.mtime=new Date(a.timestamp);b.ctime=new Date(a.timestamp);b.wb=4096;b.blocks=Math.ceil(b.size/b.wb);return b},Oa:function(a,b){void 0!==b.mode&&(a.mode=b.mode);void 0!==b.timestamp&&(a.timestamp=b.timestamp);void 0!==b.size&&P.Eb(a,
b.size)},lookup:function(){throw Nb[44];},Ya:function(a,b,c,d){return P.createNode(a,b,c,d)},rename:function(a,b,c){if(Q(a.mode)){try{var d=Ob(b,c)}catch(g){}if(d)for(var f in d.Ha)throw new O(55);}delete a.parent.Ha[a.name];a.name=c;b.Ha[c]=a;a.parent=b},unlink:function(a,b){delete a.Ha[b]},rmdir:function(a,b){var c=Ob(a,b),d;for(d in c.Ha)throw new O(55);delete a.Ha[b]},readdir:function(a){var b=[".",".."],c;for(c in a.Ha)a.Ha.hasOwnProperty(c)&&b.push(c);return b},symlink:function(a,b,c){a=P.createNode(a,
b,41471,0);a.link=c;return a},readlink:function(a){if(40960!==(a.mode&61440))throw new O(28);return a.link}},Ja:{read:function(a,b,c,d,f){var g=a.node.Ha;if(f>=a.node.Na)return 0;a=Math.min(a.node.Na-f,d);if(8<a&&g.subarray)b.set(g.subarray(f,f+a),c);else for(d=0;d<a;d++)b[c+d]=g[f+d];return a},write:function(a,b,c,d,f,g){b.buffer===x.buffer&&(g=!1);if(!d)return 0;a=a.node;a.timestamp=Date.now();if(b.subarray&&(!a.Ha||a.Ha.subarray)){if(g)return a.Ha=b.subarray(c,c+d),a.Na=d;if(0===a.Na&&0===f)return a.Ha=
b.slice(c,c+d),a.Na=d;if(f+d<=a.Na)return a.Ha.set(b.subarray(c,c+d),f),d}P.lb(a,f+d);if(a.Ha.subarray&&b.subarray)a.Ha.set(b.subarray(c,c+d),f);else for(g=0;g<d;g++)a.Ha[f+g]=b[c+g];a.Na=Math.max(a.Na,f+d);return d},Ua:function(a,b,c){1===c?b+=a.position:2===c&&32768===(a.node.mode&61440)&&(b+=a.node.Na);if(0>b)throw new O(28);return b},ib:function(a,b,c){P.lb(a.node,b+c);a.node.Na=Math.max(a.node.Na,b+c)},Za:function(a,b,c,d,f,g,n){if(32768!==(a.node.mode&61440))throw new O(43);a=a.node.Ha;if(n&
2||a.buffer!==b.buffer){if(0<f||f+d<a.length)a.subarray?a=a.subarray(f,f+d):a=Array.prototype.slice.call(a,f,f+d);f=!0;n=b.buffer==x.buffer;d=$a(d);if(!d)throw new O(48);(n?x:b).set(a,d)}else f=!1,d=a.byteOffset;return{Db:d,bb:f}},$a:function(a,b,c,d,f){if(32768!==(a.node.mode&61440))throw new O(43);if(f&2)return 0;P.Ja.write(a,b,0,d,c,!1);return 0}}},Pb=null,Qb={},S=[],Rb=1,U=null,Sb=!0,V={},O=null,Nb={};
function W(a,b){a=Eb("/",a);b=b||{};if(!a)return{path:"",node:null};var c={mb:!0,hb:0},d;for(d in c)void 0===b[d]&&(b[d]=c[d]);if(8<b.hb)throw new O(32);a=zb(a.split("/").filter(function(n){return!!n}),!1);var f=Pb;c="/";for(d=0;d<a.length;d++){var g=d===a.length-1;if(g&&b.parent)break;f=Ob(f,a[d]);c=k(c+"/"+a[d]);f.Va&&(!g||g&&b.mb)&&(f=f.Va.root);if(!g||b.Ta)for(g=0;40960===(f.mode&61440);)if(f=Tb(c),c=Eb(Ab(c),f),f=W(c,{hb:b.hb}).node,40<g++)throw new O(32);}return{path:c,node:f}}
function Ub(a){for(var b;;){if(a===a.parent)return a=a.Ra.ob,b?"/"!==a[a.length-1]?a+"/"+b:a+b:a;b=b?a.name+"/"+b:a.name;a=a.parent}}function Vb(a,b){for(var c=0,d=0;d<b.length;d++)c=(c<<5)-c+b.charCodeAt(d)|0;return(a+c>>>0)%U.length}function Wb(a){var b=Vb(a.parent.id,a.name);if(U[b]===a)U[b]=a.Wa;else for(b=U[b];b;){if(b.Wa===a){b.Wa=a.Wa;break}b=b.Wa}}
function Ob(a,b){var c;if(c=(c=Xb(a,"x"))?c:a.Ia.lookup?0:2)throw new O(c,a);for(c=U[Vb(a.id,b)];c;c=c.Wa){var d=c.name;if(c.parent.id===a.id&&d===b)return c}return a.Ia.lookup(a,b)}function Mb(a,b,c,d){a=new Yb(a,b,c,d);b=Vb(a.parent.id,a.name);a.Wa=U[b];return U[b]=a}function Q(a){return 16384===(a&61440)}var Zb={r:0,rs:1052672,"r+":2,w:577,wx:705,xw:705,"w+":578,"wx+":706,"xw+":706,a:1089,ax:1217,xa:1217,"a+":1090,"ax+":1218,"xa+":1218};
function $b(a){var b=["r","w","rw"][a&3];a&512&&(b+="w");return b}function Xb(a,b){if(Sb)return 0;if(-1===b.indexOf("r")||a.mode&292){if(-1!==b.indexOf("w")&&!(a.mode&146)||-1!==b.indexOf("x")&&!(a.mode&73))return 2}else return 2;return 0}function ac(a,b){try{return Ob(a,b),20}catch(c){}return Xb(a,"wx")}function bc(a,b,c){try{var d=Ob(a,b)}catch(f){return f.Ka}if(a=Xb(a,"wx"))return a;if(c){if(!Q(d.mode))return 54;if(d===d.parent||"/"===Ub(d))return 10}else if(Q(d.mode))return 31;return 0}
function cc(a){var b=4096;for(a=a||0;a<=b;a++)if(!S[a])return a;throw new O(33);}function dc(a,b){ec||(ec=function(){},ec.prototype={});var c=new ec,d;for(d in a)c[d]=a[d];a=c;b=cc(b);a.fd=b;return S[b]=a}var Lb={open:function(a){a.Ja=Qb[a.node.rdev].Ja;a.Ja.open&&a.Ja.open(a)},Ua:function(){throw new O(70);}};function Hb(a,b){Qb[a]={Ja:b}}
function fc(a,b){var c="/"===b,d=!b;if(c&&Pb)throw new O(10);if(!c&&!d){var f=W(b,{mb:!1});b=f.path;f=f.node;if(f.Va)throw new O(10);if(!Q(f.mode))throw new O(54);}b={type:a,Jb:{},ob:b,Cb:[]};a=a.Ra(b);a.Ra=b;b.root=a;c?Pb=a:f&&(f.Va=b,f.Ra&&f.Ra.Cb.push(b))}function ca(a,b,c){var d=W(a,{parent:!0}).node;a=Bb(a);if(!a||"."===a||".."===a)throw new O(28);var f=ac(d,a);if(f)throw new O(f);if(!d.Ia.Ya)throw new O(63);return d.Ia.Ya(d,a,b,c)}function X(a,b){ca(a,(void 0!==b?b:511)&1023|16384,0)}
function hc(a,b,c){"undefined"===typeof c&&(c=b,b=438);ca(a,b|8192,c)}function ic(a,b){if(!Eb(a))throw new O(44);var c=W(b,{parent:!0}).node;if(!c)throw new O(44);b=Bb(b);var d=ac(c,b);if(d)throw new O(d);if(!c.Ia.symlink)throw new O(63);c.Ia.symlink(c,b,a)}
function ta(a){var b=W(a,{parent:!0}).node,c=Bb(a),d=Ob(b,c),f=bc(b,c,!1);if(f)throw new O(f);if(!b.Ia.unlink)throw new O(63);if(d.Va)throw new O(10);try{V.willDeletePath&&V.willDeletePath(a)}catch(g){G("FS.trackingDelegate['willDeletePath']('"+a+"') threw an exception: "+g.message)}b.Ia.unlink(b,c);Wb(d);try{if(V.onDeletePath)V.onDeletePath(a)}catch(g){G("FS.trackingDelegate['onDeletePath']('"+a+"') threw an exception: "+g.message)}}
function Tb(a){a=W(a).node;if(!a)throw new O(44);if(!a.Ia.readlink)throw new O(28);return Eb(Ub(a.parent),a.Ia.readlink(a))}function jc(a,b){a=W(a,{Ta:!b}).node;if(!a)throw new O(44);if(!a.Ia.Pa)throw new O(63);return a.Ia.Pa(a)}function kc(a){return jc(a,!0)}function da(a,b){var c;"string"===typeof a?c=W(a,{Ta:!0}).node:c=a;if(!c.Ia.Oa)throw new O(63);c.Ia.Oa(c,{mode:b&4095|c.mode&-4096,timestamp:Date.now()})}
function lc(a){var b;"string"===typeof a?b=W(a,{Ta:!0}).node:b=a;if(!b.Ia.Oa)throw new O(63);b.Ia.Oa(b,{timestamp:Date.now()})}function mc(a,b){if(0>b)throw new O(28);var c;"string"===typeof a?c=W(a,{Ta:!0}).node:c=a;if(!c.Ia.Oa)throw new O(63);if(Q(c.mode))throw new O(31);if(32768!==(c.mode&61440))throw new O(28);if(a=Xb(c,"w"))throw new O(a);c.Ia.Oa(c,{size:b,timestamp:Date.now()})}
function l(a,b,c,d){if(""===a)throw new O(44);if("string"===typeof b){var f=Zb[b];if("undefined"===typeof f)throw Error("Unknown file open mode: "+b);b=f}c=b&64?("undefined"===typeof c?438:c)&4095|32768:0;if("object"===typeof a)var g=a;else{a=k(a);try{g=W(a,{Ta:!(b&131072)}).node}catch(n){}}f=!1;if(b&64)if(g){if(b&128)throw new O(20);}else g=ca(a,c,0),f=!0;if(!g)throw new O(44);8192===(g.mode&61440)&&(b&=-513);if(b&65536&&!Q(g.mode))throw new O(54);if(!f&&(c=g?40960===(g.mode&61440)?32:Q(g.mode)&&
("r"!==$b(b)||b&512)?31:Xb(g,$b(b)):44))throw new O(c);b&512&&mc(g,0);b&=-641;d=dc({node:g,path:Ub(g),flags:b,seekable:!0,position:0,Ja:g.Ja,Gb:[],error:!1},d);d.Ja.open&&d.Ja.open(d);!e.logReadFiles||b&1||(nc||(nc={}),a in nc||(nc[a]=1,G("FS.trackingDelegate error on read file: "+a)));try{V.onOpenFile&&(g=0,1!==(b&2097155)&&(g|=1),0!==(b&2097155)&&(g|=2),V.onOpenFile(a,g))}catch(n){G("FS.trackingDelegate['onOpenFile']('"+a+"', flags) threw an exception: "+n.message)}return d}
function fa(a){if(null===a.fd)throw new O(8);a.fb&&(a.fb=null);try{a.Ja.close&&a.Ja.close(a)}catch(b){throw b;}finally{S[a.fd]=null}a.fd=null}function oc(a,b,c){if(null===a.fd)throw new O(8);if(!a.seekable||!a.Ja.Ua)throw new O(70);if(0!=c&&1!=c&&2!=c)throw new O(28);a.position=a.Ja.Ua(a,b,c);a.Gb=[]}
function pc(a,b,c,d,f){if(0>d||0>f)throw new O(28);if(null===a.fd)throw new O(8);if(1===(a.flags&2097155))throw new O(8);if(Q(a.node.mode))throw new O(31);if(!a.Ja.read)throw new O(28);var g="undefined"!==typeof f;if(!g)f=a.position;else if(!a.seekable)throw new O(70);b=a.Ja.read(a,b,c,d,f);g||(a.position+=b);return b}
function ea(a,b,c,d,f,g){if(0>d||0>f)throw new O(28);if(null===a.fd)throw new O(8);if(0===(a.flags&2097155))throw new O(8);if(Q(a.node.mode))throw new O(31);if(!a.Ja.write)throw new O(28);a.flags&1024&&oc(a,0,2);var n="undefined"!==typeof f;if(!n)f=a.position;else if(!a.seekable)throw new O(70);b=a.Ja.write(a,b,c,d,f,g);n||(a.position+=b);try{if(a.path&&V.onWriteToFile)V.onWriteToFile(a.path)}catch(u){G("FS.trackingDelegate['onWriteToFile']('"+a.path+"') threw an exception: "+u.message)}return b}
function sa(a){var b={encoding:"binary"};b=b||{};b.flags=b.flags||"r";b.encoding=b.encoding||"binary";if("utf8"!==b.encoding&&"binary"!==b.encoding)throw Error('Invalid encoding type "'+b.encoding+'"');var c,d=l(a,b.flags);a=jc(a).size;var f=new Uint8Array(a);pc(d,f,0,a,0);"utf8"===b.encoding?c=bb(f,0):"binary"===b.encoding&&(c=f);fa(d);return c}
function qc(){O||(O=function(a,b){this.node=b;this.Fb=function(c){this.Ka=c};this.Fb(a);this.message="FS error"},O.prototype=Error(),O.prototype.constructor=O,[44].forEach(function(a){Nb[a]=new O(a);Nb[a].stack="<generic error, no stack>"}))}var Mc;function ba(a,b){var c=0;a&&(c|=365);b&&(c|=146);return c}
function Nc(a,b,c){a=k("/dev/"+a);var d=ba(!!b,!!c);Pc||(Pc=64);var f=Pc++<<8|0;Hb(f,{open:function(g){g.seekable=!1},close:function(){c&&c.buffer&&c.buffer.length&&c(10)},read:function(g,n,u,w){for(var r=0,C=0;C<w;C++){try{var E=b()}catch(aa){throw new O(29);}if(void 0===E&&0===r)throw new O(6);if(null===E||void 0===E)break;r++;n[u+C]=E}r&&(g.node.timestamp=Date.now());return r},write:function(g,n,u,w){for(var r=0;r<w;r++)try{c(n[u+r])}catch(C){throw new O(29);}w&&(g.node.timestamp=Date.now());return r}});
hc(a,d,f)}var Pc,Y={},ec,nc,Qc={};
function Rc(a,b,c){try{var d=a(b)}catch(f){if(f&&f.node&&k(b)!==k(Ub(f.node)))return-54;throw f;}I[c>>2]=d.dev;I[c+4>>2]=0;I[c+8>>2]=d.ino;I[c+12>>2]=d.mode;I[c+16>>2]=d.nlink;I[c+20>>2]=d.uid;I[c+24>>2]=d.gid;I[c+28>>2]=d.rdev;I[c+32>>2]=0;K=[d.size>>>0,(L=d.size,1<=+Oa(L)?0<L?(Pa(+Qa(L/4294967296),4294967295)|0)>>>0:~~+Ra((L-+(~~L>>>0))/4294967296)>>>0:0)];I[c+40>>2]=K[0];I[c+44>>2]=K[1];I[c+48>>2]=4096;I[c+52>>2]=d.blocks;I[c+56>>2]=d.atime.getTime()/1E3|0;I[c+60>>2]=0;I[c+64>>2]=d.mtime.getTime()/
1E3|0;I[c+68>>2]=0;I[c+72>>2]=d.ctime.getTime()/1E3|0;I[c+76>>2]=0;K=[d.ino>>>0,(L=d.ino,1<=+Oa(L)?0<L?(Pa(+Qa(L/4294967296),4294967295)|0)>>>0:~~+Ra((L-+(~~L>>>0))/4294967296)>>>0:0)];I[c+80>>2]=K[0];I[c+84>>2]=K[1];return 0}var Sc=void 0;function Tc(){Sc+=4;return I[Sc-4>>2]}function Z(a){a=S[a];if(!a)throw new O(8);return a}var Uc={};
function Vc(){if(!Wc){var a={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:("object"===typeof navigator&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:xa||"./this.program"},b;for(b in Uc)a[b]=Uc[b];var c=[];for(b in a)c.push(b+"="+a[b]);Wc=c}return Wc}var Wc;na("GMT",J,62960,4);
function Xc(){function a(g){return(g=g.toTimeString().match(/\(([A-Za-z ]+)\)$/))?g[1]:"GMT"}if(!Yc){Yc=!0;I[Zc()>>2]=60*(new Date).getTimezoneOffset();var b=(new Date).getFullYear(),c=new Date(b,0,1);b=new Date(b,6,1);I[$c()>>2]=Number(c.getTimezoneOffset()!=b.getTimezoneOffset());var d=a(c),f=a(b);d=cb(d);f=cb(f);b.getTimezoneOffset()<c.getTimezoneOffset()?(I[ad()>>2]=d,I[ad()+4>>2]=f):(I[ad()>>2]=f,I[ad()+4>>2]=d)}}var Yc,bd;
Ba?bd=function(){var a=process.hrtime();return 1E3*a[0]+a[1]/1E6}:"undefined"!==typeof dateNow?bd=dateNow:bd=function(){return performance.now()};function cd(a){for(var b=bd();bd()-b<a/1E3;);}e._usleep=cd;function Yb(a,b,c,d){a||(a=this);this.parent=a;this.Ra=a.Ra;this.Va=null;this.id=Rb++;this.name=b;this.mode=c;this.Ia={};this.Ja={};this.rdev=d}
Object.defineProperties(Yb.prototype,{read:{get:function(){return 365===(this.mode&365)},set:function(a){a?this.mode|=365:this.mode&=-366}},write:{get:function(){return 146===(this.mode&146)},set:function(a){a?this.mode|=146:this.mode&=-147}}});qc();U=Array(4096);fc(P,"/");X("/tmp");X("/home");X("/home/web_user");
(function(){X("/dev");Hb(259,{read:function(){return 0},write:function(d,f,g,n){return n}});hc("/dev/null",259);Gb(1280,Jb);Gb(1536,Kb);hc("/dev/tty",1280);hc("/dev/tty1",1536);if("object"===typeof crypto&&"function"===typeof crypto.getRandomValues){var a=new Uint8Array(1);var b=function(){crypto.getRandomValues(a);return a[0]}}else if(Ba)try{var c=require("crypto");b=function(){return c.randomBytes(1)[0]}}catch(d){}b||(b=function(){F("random_device")});Nc("random",b);Nc("urandom",b);X("/dev/shm");
X("/dev/shm/tmp")})();X("/proc");X("/proc/self");X("/proc/self/fd");fc({Ra:function(){var a=Mb("/proc/self","fd",16895,73);a.Ia={lookup:function(b,c){var d=S[+c];if(!d)throw new O(8);b={parent:null,Ra:{ob:"fake"},Ia:{readlink:function(){return d.path}}};return b.parent=b}};return a}},"/proc/self/fd");function ha(a,b){var c=Array(la(a)+1);a=na(a,c,0,c.length);b&&(c.length=a);return c}
var ed={a:function(a,b,c,d){F("Assertion failed: "+M(a)+", at: "+[b?M(b):"unknown filename",c,d?M(d):"unknown function"])},z:function(a){try{return a=M(a),ta(a),0}catch(b){return"undefined"!==typeof Y&&b instanceof O||F(b),-b.Ka}},I:function(a,b){try{return a=M(a),da(a,b),0}catch(c){return"undefined"!==typeof Y&&c instanceof O||F(c),-c.Ka}},E:function(a,b){try{if(0===b)return-28;if(b<la("/")+1)return-68;na("/",J,a,b);return a}catch(c){return"undefined"!==typeof Y&&c instanceof O||F(c),-c.Ka}},G:function(a,
b,c,d,f,g){try{a:{g<<=12;var n=!1;if(0!==(d&16)&&0!==a%16384)var u=-28;else{if(0!==(d&32)){var w=dd(16384,b);if(!w){u=-48;break a}a=w;c=b;var r=0;a|=0;c|=0;var C;var E=a+c|0;r=(r|0)&255;if(67<=(c|0)){for(;0!=(a&3);)x[a>>0]=r,a=a+1|0;var aa=E&-4|0;var B=r|r<<8|r<<16|r<<24;for(C=aa-64|0;(a|0)<=(C|0);)I[a>>2]=B,I[a+4>>2]=B,I[a+8>>2]=B,I[a+12>>2]=B,I[a+16>>2]=B,I[a+20>>2]=B,I[a+24>>2]=B,I[a+28>>2]=B,I[a+32>>2]=B,I[a+36>>2]=B,I[a+40>>2]=B,I[a+44>>2]=B,I[a+48>>2]=B,I[a+52>>2]=B,I[a+56>>2]=B,I[a+60>>2]=
B,a=a+64|0;for(;(a|0)<(aa|0);)I[a>>2]=B,a=a+4|0}for(;(a|0)<(E|0);)x[a>>0]=r,a=a+1|0;n=!0}else{r=S[f];if(!r){u=-8;break a}E=g;aa=J;if(0!==(c&2)&&0===(d&2)&&2!==(r.flags&2097155))throw new O(2);if(1===(r.flags&2097155))throw new O(2);if(!r.Ja.Za)throw new O(43);var Aa=r.Ja.Za(r,aa,a,b,E,c,d);w=Aa.Db;n=Aa.bb}Qc[w]={Bb:w,Ab:b,bb:n,fd:f,flags:d,offset:g};u=w}}return u}catch(ma){return"undefined"!==typeof Y&&ma instanceof O||F(ma),-ma.Ka}},w:function(a,b,c){try{var d=S[a];if(!d)throw new O(8);if(0===(d.flags&
2097155))throw new O(28);mc(d.node,c);return 0}catch(f){return"undefined"!==typeof Y&&f instanceof O||F(f),-f.Ka}},e:function(a,b){try{return a=M(a),Rc(jc,a,b)}catch(c){return"undefined"!==typeof Y&&c instanceof O||F(c),-c.Ka}},j:function(a,b){try{return a=M(a),Rc(kc,a,b)}catch(c){return"undefined"!==typeof Y&&c instanceof O||F(c),-c.Ka}},h:function(a,b){try{var c=Z(a);return Rc(jc,c.path,b)}catch(d){return"undefined"!==typeof Y&&d instanceof O||F(d),-d.Ka}},d:function(){return 42},v:function(){return 0},
s:function(a){try{var b=S[a];if(!b)throw new O(8);lc(b.node);return 0}catch(c){return"undefined"!==typeof Y&&c instanceof O||F(c),-c.Ka}},r:function(a){try{return a=M(a),lc(a),0}catch(b){return"undefined"!==typeof Y&&b instanceof O||F(b),-b.Ka}},b:function(a,b,c){Sc=c;try{var d=Z(a);switch(b){case 0:var f=Tc();return 0>f?-28:l(d.path,d.flags,0,f).fd;case 1:case 2:return 0;case 3:return d.flags;case 4:return f=Tc(),d.flags|=f,0;case 12:return f=Tc(),Na[f+0>>1]=2,0;case 13:case 14:return 0;case 16:case 8:return-28;
case 9:return Db(28),-1;default:return-28}}catch(g){return"undefined"!==typeof Y&&g instanceof O||F(g),-g.Ka}},u:function(a,b,c){try{var d=Z(a);return pc(d,x,b,c)}catch(f){return"undefined"!==typeof Y&&f instanceof O||F(f),-f.Ka}},A:function(a,b){try{a=M(a);if(b&-8)var c=-28;else{var d;(d=W(a,{Ta:!0}).node)?(a="",b&4&&(a+="r"),b&2&&(a+="w"),b&1&&(a+="x"),c=a&&Xb(d,a)?-2:0):c=-44}return c}catch(f){return"undefined"!==typeof Y&&f instanceof O||F(f),-f.Ka}},i:function(a,b){try{return a=M(a),a=k(a),"/"===
a[a.length-1]&&(a=a.substr(0,a.length-1)),X(a,b),0}catch(c){return"undefined"!==typeof Y&&c instanceof O||F(c),-c.Ka}},x:function(a){try{a=M(a);var b=W(a,{parent:!0}).node,c=Bb(a),d=Ob(b,c),f=bc(b,c,!0);if(f)throw new O(f);if(!b.Ia.rmdir)throw new O(63);if(d.Va)throw new O(10);try{V.willDeletePath&&V.willDeletePath(a)}catch(g){G("FS.trackingDelegate['willDeletePath']('"+a+"') threw an exception: "+g.message)}b.Ia.rmdir(b,c);Wb(d);try{if(V.onDeletePath)V.onDeletePath(a)}catch(g){G("FS.trackingDelegate['onDeletePath']('"+
a+"') threw an exception: "+g.message)}return 0}catch(g){return"undefined"!==typeof Y&&g instanceof O||F(g),-g.Ka}},H:function(a,b,c){Sc=c;try{var d=M(a),f=Tc();return l(d,b,f).fd}catch(g){return"undefined"!==typeof Y&&g instanceof O||F(g),-g.Ka}},D:function(a,b,c){try{a=M(a);if(0>=c)var d=-28;else{var f=Tb(a),g=Math.min(c,la(f)),n=x[b+g];na(f,J,b,c+1);x[b+g]=n;d=g}return d}catch(u){return"undefined"!==typeof Y&&u instanceof O||F(u),-u.Ka}},F:function(a,b){try{if(-1===a||0===b)var c=-28;else{var d=
Qc[a];if(d&&b===d.Ab){var f=S[d.fd],g=d.flags,n=d.offset,u=J.slice(a,a+b);f&&f.Ja.$a&&f.Ja.$a(f,u,n,b,g);Qc[a]=null;d.bb&&ja(d.Bb)}c=0}return c}catch(w){return"undefined"!==typeof Y&&w instanceof O||F(w),-w.Ka}},J:function(a,b){try{var c=S[a];if(!c)throw new O(8);da(c.node,b);return 0}catch(d){return"undefined"!==typeof Y&&d instanceof O||F(d),-d.Ka}},m:function(a,b,c){J.copyWithin(a,b,b+c)},c:function(a){var b=J.length;if(2147418112<a)return!1;for(var c=1;4>=c;c*=2){var d=b*(1+.2/c);d=Math.min(d,
a+100663296);d=Math.max(16777216,a,d);0<d%65536&&(d+=65536-d%65536);a:{try{Ua.grow(Math.min(2147418112,d)-db.byteLength+65535>>16);eb(Ua.buffer);var f=1;break a}catch(g){}f=void 0}if(f)return!0}return!1},o:function(a,b){var c=0;Vc().forEach(function(d,f){var g=b+c;f=I[a+4*f>>2]=g;for(g=0;g<d.length;++g)x[f++>>0]=d.charCodeAt(g);x[f>>0]=0;c+=d.length+1});return 0},p:function(a,b){var c=Vc();I[a>>2]=c.length;var d=0;c.forEach(function(f){d+=f.length+1});I[b>>2]=d;return 0},f:function(a){try{var b=Z(a);
fa(b);return 0}catch(c){return"undefined"!==typeof Y&&c instanceof O||F(c),c.Ka}},n:function(a,b){try{var c=Z(a);x[b>>0]=c.tty?2:Q(c.mode)?3:40960===(c.mode&61440)?7:4;return 0}catch(d){return"undefined"!==typeof Y&&d instanceof O||F(d),d.Ka}},l:function(a,b,c,d,f){try{var g=Z(a);a=4294967296*c+(b>>>0);if(-9007199254740992>=a||9007199254740992<=a)return-61;oc(g,a,d);K=[g.position>>>0,(L=g.position,1<=+Oa(L)?0<L?(Pa(+Qa(L/4294967296),4294967295)|0)>>>0:~~+Ra((L-+(~~L>>>0))/4294967296)>>>0:0)];I[f>>
2]=K[0];I[f+4>>2]=K[1];g.fb&&0===a&&0===d&&(g.fb=null);return 0}catch(n){return"undefined"!==typeof Y&&n instanceof O||F(n),n.Ka}},C:function(a){try{var b=Z(a);return b.Ja&&b.Ja.fsync?-b.Ja.fsync(b):0}catch(c){return"undefined"!==typeof Y&&c instanceof O||F(c),c.Ka}},y:function(a,b,c,d){try{a:{for(var f=Z(a),g=a=0;g<c;g++){var n=ea(f,x,I[b+8*g>>2],I[b+(8*g+4)>>2],void 0);if(0>n){var u=-1;break a}a+=n}u=a}I[d>>2]=u;return 0}catch(w){return"undefined"!==typeof Y&&w instanceof O||F(w),w.Ka}},g:function(a){var b=
Date.now();I[a>>2]=b/1E3|0;I[a+4>>2]=b%1E3*1E3|0;return 0},k:function(a){Xc();a=new Date(1E3*I[a>>2]);I[15728]=a.getSeconds();I[15729]=a.getMinutes();I[15730]=a.getHours();I[15731]=a.getDate();I[15732]=a.getMonth();I[15733]=a.getFullYear()-1900;I[15734]=a.getDay();var b=new Date(a.getFullYear(),0,1);I[15735]=(a.getTime()-b.getTime())/864E5|0;I[15737]=-(60*a.getTimezoneOffset());var c=(new Date(a.getFullYear(),6,1)).getTimezoneOffset();b=b.getTimezoneOffset();a=(c!=b&&a.getTimezoneOffset()==Math.min(b,
c))|0;I[15736]=a;a=I[ad()+(a?4:0)>>2];I[15738]=a;return 62912},memory:Ua,t:function(a,b){if(0===a)return Db(28),-1;var c=I[a>>2];a=I[a+4>>2];if(0>a||999999999<a||0>c)return Db(28),-1;0!==b&&(I[b>>2]=0,I[b+4>>2]=0);return cd(1E6*c+a/1E3)},B:function(a){switch(a){case 30:return 16384;case 85:return 131068;case 132:case 133:case 12:case 137:case 138:case 15:case 235:case 16:case 17:case 18:case 19:case 20:case 149:case 13:case 10:case 236:case 153:case 9:case 21:case 22:case 159:case 154:case 14:case 77:case 78:case 139:case 80:case 81:case 82:case 68:case 67:case 164:case 11:case 29:case 47:case 48:case 95:case 52:case 51:case 46:case 79:return 200809;
case 27:case 246:case 127:case 128:case 23:case 24:case 160:case 161:case 181:case 182:case 242:case 183:case 184:case 243:case 244:case 245:case 165:case 178:case 179:case 49:case 50:case 168:case 169:case 175:case 170:case 171:case 172:case 97:case 76:case 32:case 173:case 35:return-1;case 176:case 177:case 7:case 155:case 8:case 157:case 125:case 126:case 92:case 93:case 129:case 130:case 131:case 94:case 91:return 1;case 74:case 60:case 69:case 70:case 4:return 1024;case 31:case 42:case 72:return 32;
case 87:case 26:case 33:return 2147483647;case 34:case 1:return 47839;case 38:case 36:return 99;case 43:case 37:return 2048;case 0:return 2097152;case 3:return 65536;case 28:return 32768;case 44:return 32767;case 75:return 16384;case 39:return 1E3;case 89:return 700;case 71:return 256;case 40:return 255;case 2:return 100;case 180:return 64;case 25:return 20;case 5:return 16;case 6:return 6;case 73:return 4;case 84:return"object"===typeof navigator?navigator.hardwareConcurrency||1:1}Db(28);return-1},
table:La,K:function(a){var b=Date.now()/1E3|0;a&&(I[a>>2]=b);return b},q:function(a,b){if(b){var c=1E3*I[b+8>>2];c+=I[b+12>>2]/1E3}else c=Date.now();a=M(a);try{b=c;var d=W(a,{Ta:!0}).node;d.Ia.Oa(d,{timestamp:Math.max(b,c)});return 0}catch(f){a=f;if(!(a instanceof O)){a+=" : ";a:{d=Error();if(!d.stack){try{throw Error();}catch(g){d=g}if(!d.stack){d="(no stack trace available)";break a}}d=d.stack.toString()}e.extraStackTrace&&(d+="\n"+e.extraStackTrace());d=vb(d);throw a+d;}Db(a.Ka);return-1}}},fd=
function(){function a(f){e.asm=f.exports;mb--;e.monitorRunDependencies&&e.monitorRunDependencies(mb);0==mb&&(null!==nb&&(clearInterval(nb),nb=null),ob&&(f=ob,ob=null,f()))}function b(f){a(f.instance)}function c(f){return tb().then(function(g){return WebAssembly.instantiate(g,d)}).then(f,function(g){G("failed to asynchronously prepare wasm: "+g);F(g)})}var d={a:ed};mb++;e.monitorRunDependencies&&e.monitorRunDependencies(mb);if(e.instantiateWasm)try{return e.instantiateWasm(d,a)}catch(f){return G("Module.instantiateWasm callback failed with error: "+
f),!1}(function(){if(Ma||"function"!==typeof WebAssembly.instantiateStreaming||pb()||"function"!==typeof fetch)return c(b);fetch(qb,{credentials:"same-origin"}).then(function(f){return WebAssembly.instantiateStreaming(f,d).then(b,function(g){G("wasm streaming compile failed: "+g);G("falling back to ArrayBuffer instantiation");c(b)})})})();return{}}();e.asm=fd;var ub=e.___wasm_call_ctors=function(){return(ub=e.___wasm_call_ctors=e.asm.L).apply(null,arguments)};
e._sqlite3_free=function(){return(e._sqlite3_free=e.asm.M).apply(null,arguments)};e.___errno_location=function(){return(e.___errno_location=e.asm.N).apply(null,arguments)};e._sqlite3_finalize=function(){return(e._sqlite3_finalize=e.asm.O).apply(null,arguments)};e._sqlite3_reset=function(){return(e._sqlite3_reset=e.asm.P).apply(null,arguments)};e._sqlite3_clear_bindings=function(){return(e._sqlite3_clear_bindings=e.asm.Q).apply(null,arguments)};
e._sqlite3_value_blob=function(){return(e._sqlite3_value_blob=e.asm.R).apply(null,arguments)};e._sqlite3_value_text=function(){return(e._sqlite3_value_text=e.asm.S).apply(null,arguments)};e._sqlite3_value_bytes=function(){return(e._sqlite3_value_bytes=e.asm.T).apply(null,arguments)};e._sqlite3_value_double=function(){return(e._sqlite3_value_double=e.asm.U).apply(null,arguments)};e._sqlite3_value_int=function(){return(e._sqlite3_value_int=e.asm.V).apply(null,arguments)};
e._sqlite3_value_type=function(){return(e._sqlite3_value_type=e.asm.W).apply(null,arguments)};e._sqlite3_result_blob=function(){return(e._sqlite3_result_blob=e.asm.X).apply(null,arguments)};e._sqlite3_result_double=function(){return(e._sqlite3_result_double=e.asm.Y).apply(null,arguments)};e._sqlite3_result_error=function(){return(e._sqlite3_result_error=e.asm.Z).apply(null,arguments)};e._sqlite3_result_int=function(){return(e._sqlite3_result_int=e.asm._).apply(null,arguments)};
e._sqlite3_result_int64=function(){return(e._sqlite3_result_int64=e.asm.$).apply(null,arguments)};e._sqlite3_result_null=function(){return(e._sqlite3_result_null=e.asm.aa).apply(null,arguments)};e._sqlite3_result_text=function(){return(e._sqlite3_result_text=e.asm.ba).apply(null,arguments)};e._sqlite3_step=function(){return(e._sqlite3_step=e.asm.ca).apply(null,arguments)};e._sqlite3_data_count=function(){return(e._sqlite3_data_count=e.asm.da).apply(null,arguments)};
e._sqlite3_column_blob=function(){return(e._sqlite3_column_blob=e.asm.ea).apply(null,arguments)};e._sqlite3_column_bytes=function(){return(e._sqlite3_column_bytes=e.asm.fa).apply(null,arguments)};e._sqlite3_column_double=function(){return(e._sqlite3_column_double=e.asm.ga).apply(null,arguments)};e._sqlite3_column_text=function(){return(e._sqlite3_column_text=e.asm.ha).apply(null,arguments)};e._sqlite3_column_type=function(){return(e._sqlite3_column_type=e.asm.ia).apply(null,arguments)};
e._sqlite3_column_name=function(){return(e._sqlite3_column_name=e.asm.ja).apply(null,arguments)};e._sqlite3_bind_blob=function(){return(e._sqlite3_bind_blob=e.asm.ka).apply(null,arguments)};e._sqlite3_bind_double=function(){return(e._sqlite3_bind_double=e.asm.la).apply(null,arguments)};e._sqlite3_bind_int=function(){return(e._sqlite3_bind_int=e.asm.ma).apply(null,arguments)};e._sqlite3_bind_text=function(){return(e._sqlite3_bind_text=e.asm.na).apply(null,arguments)};
e._sqlite3_bind_parameter_index=function(){return(e._sqlite3_bind_parameter_index=e.asm.oa).apply(null,arguments)};e._sqlite3_errmsg=function(){return(e._sqlite3_errmsg=e.asm.pa).apply(null,arguments)};e._sqlite3_exec=function(){return(e._sqlite3_exec=e.asm.qa).apply(null,arguments)};e._sqlite3_prepare_v2=function(){return(e._sqlite3_prepare_v2=e.asm.ra).apply(null,arguments)};e._sqlite3_changes=function(){return(e._sqlite3_changes=e.asm.sa).apply(null,arguments)};
e._sqlite3_close_v2=function(){return(e._sqlite3_close_v2=e.asm.ta).apply(null,arguments)};e._sqlite3_create_function_v2=function(){return(e._sqlite3_create_function_v2=e.asm.ua).apply(null,arguments)};e._sqlite3_open=function(){return(e._sqlite3_open=e.asm.va).apply(null,arguments)};var $a=e._malloc=function(){return($a=e._malloc=e.asm.wa).apply(null,arguments)},ja=e._free=function(){return(ja=e._free=e.asm.xa).apply(null,arguments)};
e._RegisterExtensionFunctions=function(){return(e._RegisterExtensionFunctions=e.asm.ya).apply(null,arguments)};
var ad=e.__get_tzname=function(){return(ad=e.__get_tzname=e.asm.za).apply(null,arguments)},$c=e.__get_daylight=function(){return($c=e.__get_daylight=e.asm.Aa).apply(null,arguments)},Zc=e.__get_timezone=function(){return(Zc=e.__get_timezone=e.asm.Ba).apply(null,arguments)},dd=e._memalign=function(){return(dd=e._memalign=e.asm.Ca).apply(null,arguments)},ka=e.stackSave=function(){return(ka=e.stackSave=e.asm.Da).apply(null,arguments)},t=e.stackAlloc=function(){return(t=e.stackAlloc=e.asm.Ea).apply(null,
arguments)},qa=e.stackRestore=function(){return(qa=e.stackRestore=e.asm.Fa).apply(null,arguments)};e.dynCall_vi=function(){return(e.dynCall_vi=e.asm.Ga).apply(null,arguments)};e.asm=fd;e.cwrap=function(a,b,c,d){c=c||[];var f=c.every(function(g){return"number"===g});return"string"!==b&&f&&!d?Wa(a):function(){return Xa(a,b,c,arguments)}};e.stackSave=ka;e.stackRestore=qa;e.stackAlloc=t;var gd;ob=function hd(){gd||id();gd||(ob=hd)};
function id(){function a(){if(!gd&&(gd=!0,e.calledRun=!0,!Va)){e.noFSInit||Mc||(Mc=!0,qc(),e.stdin=e.stdin,e.stdout=e.stdout,e.stderr=e.stderr,e.stdin?Nc("stdin",e.stdin):ic("/dev/tty","/dev/stdin"),e.stdout?Nc("stdout",null,e.stdout):ic("/dev/tty","/dev/stdout"),e.stderr?Nc("stderr",null,e.stderr):ic("/dev/tty1","/dev/stderr"),l("/dev/stdin","r"),l("/dev/stdout","w"),l("/dev/stderr","w"));gb(ib);Sb=!1;gb(jb);if(e.onRuntimeInitialized)e.onRuntimeInitialized();if(e.postRun)for("function"==typeof e.postRun&&
(e.postRun=[e.postRun]);e.postRun.length;){var b=e.postRun.shift();kb.unshift(b)}gb(kb)}}if(!(0<mb)){if(e.preRun)for("function"==typeof e.preRun&&(e.preRun=[e.preRun]);e.preRun.length;)lb();gb(hb);0<mb||(e.setStatus?(e.setStatus("Running..."),setTimeout(function(){setTimeout(function(){e.setStatus("")},1);a()},1)):a())}}e.run=id;if(e.preInit)for("function"==typeof e.preInit&&(e.preInit=[e.preInit]);0<e.preInit.length;)e.preInit.pop()();noExitRuntime=!0;id();


        // The shell-pre.js and emcc-generated code goes above
        return Module;
    }); // The end of the promise being returned

  return initSqlJsPromise;
} // The end of our initSqlJs function

// This bit below is copied almost exactly from what you get when you use the MODULARIZE=1 flag with emcc
// However, we don't want to use the emcc modularization. See shell-pre.js
if (typeof exports === 'object' && typeof module === 'object'){
    module.exports = initSqlJs;
    // This will allow the module to be used in ES6 or CommonJS
    module.exports.default = initSqlJs;
}
else if (typeof define === 'function' && define['amd']) {
    define([], function() { return initSqlJs; });
}
else if (typeof exports === 'object'){
    exports["Module"] = initSqlJs;
}
/* global initSqlJs */
/* eslint-env worker */
/* eslint no-restricted-globals: ["error"] */
var db;

function onModuleReady(SQL) {
    "use strict";

    function createDb(data) {
        if (db != null) db.close();
        db = new SQL.Database(data);
        return db;
    }

    var buff; var data; var result;
    data = this["data"];
    switch (data && data["action"]) {
        case "open":
            buff = data["buffer"];
            createDb(buff && new Uint8Array(buff));
            return postMessage({
                id: data["id"],
                ready: true
            });
        case "exec":
            if (db === null) {
                createDb();
            }
            if (!data["sql"]) {
                throw "exec: Missing query string";
            }
            return postMessage({
                id: data["id"],
                results: db.exec(data["sql"], data["params"])
            });
        case "each":
            if (db === null) {
                createDb();
            }
            var callback = function callback(row) {
                return postMessage({
                    id: data["id"],
                    row: row,
                    finished: false
                });
            };
            var done = function done() {
                return postMessage({
                    id: data["id"],
                    finished: true
                });
            };
            return db.each(data["sql"], data["params"], callback, done);
        case "export":
            buff = db["export"]();
            result = {
                id: data["id"],
                buffer: buff
            };
            try {
                return postMessage(result, [result]);
            } catch (error) {
                return postMessage(result);
            }
        case "close":
            return db && db.close();
        default:
            throw new Error("Invalid action : " + (data && data["action"]));
    }
}

function onError(err) {
    "use strict";

    return postMessage({
        id: this["data"]["id"],
        error: err["message"]
    });
}

if (typeof importScripts === "function") {
    db = null;
    var sqlModuleReady = initSqlJs();
    self.onmessage = function onmessage(event) {
        "use strict";

        return sqlModuleReady
            .then(onModuleReady.bind(event))
            .catch(onError.bind(event));
    };
}
