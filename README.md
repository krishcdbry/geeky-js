# GeekyJS [![NPM version](https://img.shields.io/npm/v/geeky-js.svg)](https://www.npmjs.com/package/geeky-js)
A simple javascript library like JQuery with some optimizations.

# Current Modules
1. Click Event binding
2. Adding Classes (One/Multiple comma seperated)
3. Removing classes (One/Multiple comma seperated)
4. Remove All
5. Supports method chaining.

## Installation

```bash
npm i geeky-js
```

## Usage
```HTML
<script src="dist/geeky.min.js"></script>
```

## Click Event

```javascript

  _$('#man').click(function() {
    // Stuff
  })

```

## Add Class
```javascript

  _$('#man')
      .addClass('classname1')
      .addClass('classname2')

  // OR

  _$('#man')
        .addClass('classname1, classname2, classname3');
  // Adds all three classes      
```

## Remove Class
```javascript

  _$('#man')
      .removeClass('classname1')
      .removeClass('classname2')

  // OR

  _$('#man')
        .removeClass('classname1, classname2, classname3');
  // Adds all three classes      
```

## Remove All
```javascript

  _$('#man')
      .removeAll()
  // Removes all classes      
```

## Author
Krishcdbry [krishcdbry@gmail.com]

## Licence
MIT @[krishcdbry](krishcdbry.com)
