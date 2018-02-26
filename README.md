# JET DevTools
This tools is very useful for developer to debug JET codes. And it supports JET 4.* syntax.

![Sidebar][Sidebar]

![Overall][Overall]

## Overview

<!-- MarkdownTOC autolink="true" bracket="round" markdown_preview="markdown" -->

- [Background](#background)
- [Jet Sidebar](#jet-sidebar)
- [API](#api)
    + [jetDebugger.dataFor](#jetdebuggerdatafor)
    + [jetDebugger.dataForToJs](#jetdebuggerdatafortojs)
    + [jetDebugger.contextFor](#jetdebuggercontextfor)
    + [jetDebugger.contextForToJs](#jetdebuggercontextfortojs)
    + [jetDebugger.getBindings](#jetdebuggergetbindings)
    + [jetDebugger.getBindingsToJs](#jetdebuggergetbindingstojs)
    + [jetDebugger.toJs](#jetdebuggertojs)
    + [jetDebugger.inspect](#jetdebuggerinspect)
- [Future Changes](#future-changes)

<!-- /MarkdownTOC -->

## Background
When we debug JET code, we can use knockout plugin, but it has below issues: 

1. Performance is bad. After we select one html element on page, it takes a long time to get the knockout binding result.
2. It's not working when chrome cannot expand html element correctly when the page becomes too big. We cannot see the html body in chrome devtools even after browser refresh.
3. Only observable value. It does not support unwrap value.
4. It cannot should binding. Only shows context and data.
For example:
```html
<div data-bind="text: label, visible: visibleFlg">Country</div>
```
Developer wants to know the bindings like below:
```javascript
{
    text: 'text',
    visible: true
}
```
But knockout plugin does not support it.
5. It's only for knockout. We need to tool that we can debug JET code. Especially for JET CCAs.

## JET Sidebar

In the JET sidebar of under Elements tab, you can find bindings, context and data detail for both observable and unwrap values.

## API

All APIs are under *jetDebugger* object.

### jetDebugger.dataFor

#### Syntax

jetDebugger.dataFor([selector])

#### Description 

It's used to return ko.dataFor. 

#### Usage:

1. Select one html element in Elements tab of chrome devTools. call this function with no argument in the console.
```javascript
jetDebugger.dataFor()
```

2. Call this function with one argument. The argument is selector. For example:
```javascript
jetDebugger.dataFor('oj-buttonset-one')
```

#### Return value

The binding data.

### jetDebugger.dataForToJs
Same with [jetDebugger.dataFor](#jetdebuggerdatafor). But difference is that the function unwrap all observables.

### jetDebugger.contextFor

#### Syntax

jetDebugger.context([selector])

#### Description 

It's used to return ko.contextFor. 

#### Usage:

1. Select one html element in Elements tab of chrome devTools. call this function with no argument in the console.
```javascript
jetDebugger.contextFor()
```

2. Call this function with one argument. The argument is selector. For example:
```javascript
jetDebugger.contextFor('oj-buttonset-one')
```

#### Return value

The binding context.

### jetDebugger.contextForToJs
Same with [jetDebugger.contextFor](#jetdebuggercontextfor). But difference is that the function unwrap all observables.

### jetDebugger.getBindings

#### Syntax

jetDebugger.getBindings([selector])

#### Description 

It's used to return the binding detail. It returns both knockout binding and JET binding. For JET binding, it supports JET attribute binding (e.g., :id, :style, :style.font-style)

#### Usage:

1. Select one html element in Elements tab of chrome devTools. call this function with no argument in the console.
```javascript
jetDebugger.getBindings()
```

2. Call this function with one argument. The argument is selector. For example:
```javascript
jetDebugger.getBindings('oj-buttonset-one')
```

#### Return value

The bindings.

### jetDebugger.getBindingsToJs
Same with [jetDebugger.getBindings](#jetdebuggergetbindings). But difference is that the function unwrap all observables.

### jetDebugger.toJs

#### Syntax

jetDebugger.toJs(obj)

#### Description 

It's similar with ko.toJS to unwrap observables in the object. But in case recursive loopping, this function only loop 20 levels deep.

#### Usage:

Pass in the object as the first parameter. 
```javascript
jetDebugger.toJs(obj)
```

#### Return value

The unwrapped object.

### jetDebugger.inspect

#### Syntax

jetDebugger.inspect(obj)

#### Description 

It's similar with inspect function in chrome console. But chrome inspect does not support selector. For example, chrome support `inspect(document.body)`, but does not support `inspect('#testBtn')`

#### Usage:

Pass in the object as the first parameter. 
```javascript
jetDebugger.inspect(obj)
```


#### Return value

The inspected item.

## Future Changes

- The _jetDebugger_ variable is hardcoded. In future, provide a way to customize. It may have name conflict.
- Support developer panel like knockout js panel. But more powerful.
    + Support search.
    + Support change value.

[Sidebar]: https://github.com/wenlz123/chromeextensions-jet-devtools/blob/master/wiki/sidebar.png
[Overall]: https://github.com/wenlz123/chromeextensions-jet-devtools/blob/master/wiki/overall.png