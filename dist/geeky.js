(function () {

 var _this = this;

 /**
  @name addEvents
  @param {Array} itemArray
  @param {Function} function
  @description Adding click event to all the elements in the input array
  @return null
 **/
 function addEvents(itemArray, fun){
     for (var i = 0; i < itemArray.length; i++) {
       var data = itemArray[i].className;
       itemArray[i].addEventListener('click', fun);
   }
  }

 /**
  @name batchClass
  @param {Array} itemArray
  @param {String} classname
  @description Adding classes to all the elements in the input array
  @return null
 **/
 function batchClass(itemArray, classname) {
   for (var i = 0; i < itemArray.length; i++) {
     var data = itemArray[i].className;
     var classArr = data.split(" ");
     var Newclassname = classname
                  .split(",")
                  .map(function (item) {
                      return item.trim();
                   })
                  .filter(function(item, pos) {
                    return classArr.indexOf(item) === -1;
                  })
                  .join(" ");
   itemArray[i].className = (data.length > 0) ? data + " " + Newclassname : Newclassname;
   }
 }

 /**
  @name removeItems
  @param {Array} arr
  @param {String} item
  @description Removing items from the classes array
  @return Array
 **/
function removeItems (arr, item) {
   var itemArray = item.split(",")
                        .map(function(a) {
                            return a.trim();
                        });
   for (var i = 0 ; i < itemArray.length; i++) {
       var classIdx = arr.indexOf(itemArray[i]);
       if (classIdx > -1) {
        arr.splice(classIdx, 1);
       }
   }
  return arr;
}

 /**
  @name batchRemoveClass
  @param {Array} itemArray
  @param {String} classname
  @description removing classes accordingly to all the elements in the input array
  @return null
 **/
function batchRemoveClass(itemArray, classname) {
   for (var i = 0; i < itemArray.length; i++) {
    var data = itemArray[i].className;
      var classArr = data.split(" ");
      if (classname.length > 0) {
        classArr = removeItems(classArr, classname);
        itemArray[i].className = classArr.join(" ");
      }
     else {
       classArr = [];
       itemArray[i].removeAttribute('class');
     }
   }
 }

 /**
  @name isArray
  @param {} data
  @description finding the input is array or not
  @return true/false
 **/
 function isArray (data) {
   return (data != null && typeof data === 'object' && Object.prototype.toString.call(data) === '[object Array]');
 }

 /**
  @name isAObject
  @param {} data
  @description finding the input is object or not
  @return true/false
 **/
 function isAObject (data) {
   console.log(Object.prototype.toString.call(data));
   return (data !== null && typeof data === 'object' && Object.prototype.toString.call(data) === '[object Object]');
 }

 /**
  @name isHtmlElem
  @param {} data
  @description finding the input is HTML element or not
  @return true/false
 **/
 function isHtmlElem (data){
     return (data != null && typeof data === 'object' && Object.prototype.toString.call(data) !== '[object Array]');
 }

 /**
  @name isHtmlCollection
  @param {} data
  @description finding the input is HTMLCollection or not
  @return true/false
 **/
 function isHtmlCollection (data) {
     return (data != null && typeof data === 'object' && Object.prototype.toString.call(data) === '[object HTMLCollection]');
 }

 /**
  @name setCurrentElement
  @param {String} className
  @param {Function} callback
  @description setting the current element of _this
  @return null
 **/
 function setCurrentElement (className, callback) {
   var name = _this.currentElem;
   var elem = null;
   if (name && name.length > 0) {
     if (name.indexOf('.') > -1) {
       name = name.split(".")[1];
       _this.currentElem = document.getElementsByClassName(name);
       callback(className);
     }

     else if (name.indexOf('#') > -1) {
        name = name.split("#")[1];
        _this.currentElem = document.getElementById(name);
       callback(className);
     }

     else {
      _this.currentElem = document.getElementsByTagName(name);
       callback(className);
     }
   }

 }

 /**
  @name addClass
  @param {String} className
  @description adding the class according to find addClass
 **/
 function addClass(className) {
   if (isHtmlCollection(_this.currentElem)) {
     batchClass(_this.currentElem, className);
   }
   else if (isHtmlElem(_this.currentElem)) {
     batchClass([_this.currentElem], className);
   }
   else {
      setCurrentElement(className, addClass);
   }
   return _$(_this.currentElem);
 }

 /**
  @name addClass
  @param {String} className
  @description removing the class according to find addClass
 **/
 function removeAllClass (input) {
   var inputClass = (input) ? input : '';
   if (isHtmlCollection(_this.currentElem)) {
     batchRemoveClass(_this.currentElem, inputClass);
   }
   else if (isHtmlElem(_this.currentElem)) {
     batchRemoveClass([_this.currentElem], inputClass);
   }
   else {
      setCurrentElement(inputClass, removeAllClass);
   }
   return _$(_this.currentElem);
 }

/**
  @name click
  @param {Function} fun
  @description adding the event and callback
 **/
 function click (fun) {
   console.log(_this.currentElem);
   if (isHtmlCollection(_this.currentElem)) {
     addEvents(_this.currentElem, fun);
   }
   else if (isHtmlElem(_this.currentElem)) {
     addEvents([_this.currentElem], fun);
   }
   else {
     setCurrentElement(fun, click);
   }
   return _$(_this.currentElem);
 }


 /**
  @name _$
  @param {String} className
  @description Parent function
 **/
 function _$(name) {
   _this.currentElem = name;
   return {
     addClass : addClass.bind(_this)
     , removeClass : removeAllClass.bind(_this)
     , click : click.bind(_this)
   }
 }

 window._$ = _$;

})(window, document);
