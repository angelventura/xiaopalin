# eslint-plugin-ejs

Parses out ejs declarations found in js and jsx files. Primarily designed for Redux CLI for parsing ejs syntax.

For example if you have a file like below, eslint will not be able to parse it normally due to the ejs markers. With this plugin, the linter is able to work normally. Note that whatever is inside the markers will remain.
```js
import React from 'react'

type Props = {

};
export class <%= pascalEntityName %> extends React.Component {
  props: Props;

  render () {
    return (
      <div></div>
    )
  }
}

export default <%= pascalEntityName %>
```

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm install eslint --save-dev
```

Next, install `eslint-plugin-ejs`:

```
$ npm install eslint-plugin-ejs --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-ejs` globally.

## Usage

Add `ejs` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "ejs"
    ]
}
```

## Tests
```
$ npm test
```

## Why a new version ?
This source code come originally from: https://www.npmjs.com/package/eslint-plugin-ejs/v/0.0.2, no Github repository found for this code. I saw similar code here: https://github.com/jtmthf/eslint-plugin-ejs

Now I'm moving from lint to ESlint And I'm having issues with code like
```
<%- include('../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

```

because tags <%- -%> are not supported by all the ESlint-plugin-ejs I found. This is the reason why I'm creating forking a new module.

Similar projects I'm currenly watching: 
* https://github.com/overlookmotel/eslint-plugin-ejs-js
* https://github.com/silesia-corporation/eslint-plugin-ejs
* https://github.com/jtmthf/eslint-plugin-ejs


## New Tags

Here the tags currenly supported: '<%= ', '<% ', ' %>', '<%- ', ' -%>','<%', '%>'
