

```javascript

// undocumented, sorry

``` 
















   

 


   
#### Class AST2HTML


- [createHtml](README.md#AST2HTML_createHtml)



   
    
##### trait events

- [on](README.md#_on)
- [removeListener](README.md#_removeListener)
- [trigger](README.md#_trigger)


    
    


   
      
    





   
# Class AST2HTML


The class has following internal singleton variables:
        
        
### <a name="AST2HTML_createHtml"></a>AST2HTML::createHtml(t)


```javascript

```

### AST2HTML::constructor( walker, options )
Prepare the walker
```javascript

this._walker = walker;
this._options = options;

var currentNode, currentCtx;
this._outHTML = "";
var me = this;

walker.on("node", function(w) {
   currentNode = w.node;
   currentCtx = w.ctx;
});

walker.on("newline", function() {
   me._outHTML+="</div>";
});
walker.on("startline", function() {
   me._outHTML+="<div class='code_line'><div class='code_line_number'>";
   me._outHTML+=walker.getLineNumber();
   me._outHTML+="</div>";
})

var keyWords = ["for", "function", "if", "Array", "arguments", "console", "typeof", "window", 
                "var", "return", "const", "this", "let"].reduce(function(prev,next) {
    prev[next] = next;
    return prev;
}, {});

walker.on("out", function(str) {
  // Special case for String literals...
  
  var visitCnt = currentNode._ecnt || 0;
  
  if(currentNode.type=="Literal") {
    if(currentNode.raw == str) {
      var classStr ="out_char ";
      if(typeof currentNode.value == "string") classStr+=" string_literal";
      me._outHTML+="<div class='"+classStr+"'>";
      me._outHTML+=str;
      me._outHTML+="</div>";  
      return;
    }
  }          
   var spaces = str.split(" ");
   spaces.forEach(
     function(a,i) {
       var classStr ="out_char ";
       
       if(keyWords[str.trim()]) classStr+=str.trim();
       classStr+=" "+currentNode.type;
       if(visitCnt==0) {
           classStr+=" notvisited ";
       } else {
           classStr+=" visited ";
       }
       if(visitCnt>10) classStr+=" plus10visits ";
       if(visitCnt>50) classStr+=" plus50visits ";
       if(visitCnt>100) classStr+=" plus100visits ";
       
       me._outHTML+="<div class='"+classStr+"' visitCnt='"+visitCnt+"'>";
       if(i>0) outHTML+="&nbsp;";
       me._outHTML+=a;
       me._outHTML+="</div>";               
     });
   
});
walker.on("tabs", function(cnt) {
   if(!cnt) return;
   while(cnt--) me._outHTML+="<div class='out_tab'></div>";
});

```
        


   
    
## trait events

The class has following internal singleton variables:
        
        
### <a name="_on"></a>::on(en, ef)
`en` Event name
 

Binds event name to event function
```javascript
if(!this._ev) this._ev = {};
if(!this._ev[en]) this._ev[en] = [];

this._ev[en].push(ef);
return this;
```

### <a name="_removeListener"></a>::removeListener(name, fn)


```javascript
if(!this._ev) return;
if(!this._ev[name]) return;

var list = this._ev[name];

for(var i=0; i<list.length; i++) {
    if(list[i]==fn) {
        list.splice(i,1);
        return;
    }
}

```

### <a name="_trigger"></a>::trigger(en, data, fn)

triggers event with data and optional function
```javascript

if(!this._ev) return;
if(!this._ev[en]) return;
var me = this;
this._ev[en].forEach( function(cb) { cb( data, fn) } );    
return this;
```


    
    


   
      
    




