This folder contains the Handlebar mail templates in HTML format.
Templates should be stored in Firebase, however ... inserting them using the Firebase UI
removes all newlines. This does not impact the outcome of the template but it seems like
this triggers the anti-spam filters in GMail.

The simple (and dirty) workaround right now is the use the endpoint in `public/manage_template.js`.
By default this endpoint is not enabled or published, you should remove the comment in index.js:
```javascript
// exports.updateTemplate = manageTemplate.updateTemplate;
```

A sample request can be found in `test/manage_template.http`

There's one tricky part, you also can't send newlines in JSON 😒 . So, you have to replace newlines
with newline control chars. So do a regex replace of `\n` with `\\n` before copy-pasting the template
into the JSON
