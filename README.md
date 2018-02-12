# JET DevTools
This tools is very useful for developer to debug JET codes.

![Overall][Overall]

# JET DevTools

<!-- MarkdownTOC autolink="true" bracket="round" markdown_preview="markdown" -->

- [Background](#background)

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
5. It's only for knockout. We need to tool that we can debug JET code. 

## API

All APIs are under *jetDebugger* object.

### jetDebugger.dataFor([selector])

Description: It's used to return ko.dataFor. 

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



## Future Changes

[Overall]: https://github.com/wenlz123/chromeextensions-jet-devtools/blob/master/wiki/overall.png
