// The code template begins here
"use strict";

(function () {

  var __amdDefs__ = {};

  // The class definition is here...
  // let the private classes out

  var AST2HTML_prototype = function AST2HTML_prototype() {
    // Then create the traits and subclasses for this class here...

    // trait comes here...

    (function (_myTrait_) {

      // Initialize static variables here...

      /**
       * Binds event name to event function
       * @param string en  - Event name
       * @param float ef
       */
      _myTrait_.on = function (en, ef) {
        if (!this._ev) this._ev = {};
        if (!this._ev[en]) this._ev[en] = [];

        this._ev[en].push(ef);
        return this;
      };

      /**
       * @param float name
       * @param float fn
       */
      _myTrait_.removeListener = function (name, fn) {
        if (!this._ev) return;
        if (!this._ev[name]) return;

        var list = this._ev[name];

        for (var i = 0; i < list.length; i++) {
          if (list[i] == fn) {
            list.splice(i, 1);
            return;
          }
        }
      };

      /**
       * triggers event with data and optional function
       * @param string en
       * @param float data
       * @param float fn
       */
      _myTrait_.trigger = function (en, data, fn) {

        if (!this._ev) return;
        if (!this._ev[en]) return;
        var me = this;
        this._ev[en].forEach(function (cb) {
          cb(data, fn);
        });
        return this;
      };
    })(this);

    (function (_myTrait_) {

      // Initialize static variables here...

      /**
       * @param Object rawAST
       */
      _myTrait_.getHTML = function (rawAST) {
        if (!this._walker) return "No ASTWalker given as parameter to AST2HTML";

        this._outHTML = "";
        console.log("--> starting the walk to createHtml");
        try {
          this._walker.startWalk(rawAST, {
            functions: {},
            vars: {},
            variables: {}
          });
        } catch (e) {
          console.log(e);
        }
        console.log("--> finished the walk");
        return this._outHTML;
      };

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (walker, options) {

        this._walker = walker;
        this._options = options || {};

        var walker = this._walker;

        var currentNode, currentCtx;
        this._outHTML = "";
        var me = this;

        walker.on("node", function (w) {
          currentNode = w.node;
          currentCtx = w.ctx;
        });

        walker.on("newline", function () {
          me._outHTML += "</div>";
        });
        walker.on("startline", function () {
          me._outHTML += "<div class='code_line'><div class='code_line_number'>";
          me._outHTML += walker.getLineNumber();
          me._outHTML += "</div>";
        });

        var keyWords = ["for", "function", "if", "Array", "arguments", "console", "typeof", "window", "var", "return", "const", "this", "let"].reduce(function (prev, next) {
          prev[next] = next;
          return prev;
        }, {});

        walker.on("out", function (str) {
          // Special case for String literals...

          var visitCnt = currentNode._ecnt || 0;

          if (currentNode.type == "Literal") {
            if (currentNode.raw == str) {
              var classStr = "out_char ";
              if (typeof currentNode.value == "string") classStr += " string_literal";
              me._outHTML += "<div class='" + classStr + "'>";
              me._outHTML += str;
              me._outHTML += "</div>";
              return;
            }
          }
          var spaces = str.split(" ");
          spaces.forEach(function (a, i) {
            var classStr = "out_char ";

            if (keyWords[str.trim()]) classStr += str.trim();
            classStr += " " + currentNode.type;
            if (visitCnt == 0) {
              classStr += " notvisited ";
            } else {
              classStr += " visited ";
            }
            if (visitCnt >= 10) classStr += " plus10visits ";
            if (visitCnt >= 50) classStr += " plus50visits ";
            if (visitCnt >= 100) classStr += " plus100visits ";

            me._outHTML += "<div class='" + classStr + "' visitCnt='" + visitCnt + "'>";
            if (i > 0) me._outHTML += "&nbsp;";
            me._outHTML += a;
            me._outHTML += "</div>";
          });
        });
        walker.on("tabs", function (cnt) {
          if (!cnt) return;
          while (cnt--) me._outHTML += "<div class='out_tab'></div>";
        });
      });
    })(this);
  };

  var AST2HTML = function AST2HTML(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof AST2HTML) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == "function") {
          if (res._classInfo.name != AST2HTML._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == "function") m.init.apply(m, args);
      }
    } else return new AST2HTML(a, b, c, d, e, f, g, h);
  };
  // inheritance is here

  AST2HTML._classInfo = {
    name: "AST2HTML"
  };
  AST2HTML.prototype = new AST2HTML_prototype();

  (function () {
    if (typeof define !== "undefined" && define !== null && define.amd != null) {
      __amdDefs__["AST2HTML"] = AST2HTML;
      this.AST2HTML = AST2HTML;
    } else if (typeof module !== "undefined" && module !== null && module.exports != null) {
      module.exports["AST2HTML"] = AST2HTML;
    } else {
      this.AST2HTML = AST2HTML;
    }
  }).call(new Function("return this")());

  if (typeof define !== "undefined" && define !== null && define.amd != null) {
    define(__amdDefs__);
  }
}).call(new Function("return this")());