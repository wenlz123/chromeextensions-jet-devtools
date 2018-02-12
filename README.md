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

```html
<div data-bind="text: label, visible: visibleFlg">Country</div>
```


```javascript
{
    text: 'text',
    visible: true
}
```


## API

## Future Changes

[Overall]: https://github.com/wenlz123/chromeextensions-jet-devtools/blob/master/wiki/overall.png
