# OSRS-Font-Parser
Make your website relive your nerdy childhood

## Live demo
Click [here](https://paradoxis.github.io/OSRS-Font-Parser/) for the live demo

## Installation 
This part separates the noobs from the maxed mains

1. Extract the contents of the zip file into a directory of choice.
2. Cope all the files from `src/` to a directory in your public webroot.
3. Make a link to `os-font.css` at the bottom of your `<head>` tag
4. Make a link to `os-font.js` at the bottom of your `<body>` tag
5. Initialize the OsFont library by calling `OsFont.compile()` after loading the library
    * To compile a specific element, pass a DOM node `OsFont.compile()` like so: `OsFont.compile(document.getElementById("nice"))`


## Example skeleton 
It's like botting, but without the risk of getting banned

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8"> 
        <title>OSRS Font Parser example</title>
        <link rel="stylesheet" href="os-font.css" />
    </head>
    <body>
        <p>flash2:wave:I'm now animating, nice</p>

        <script type="text/javascript" src="os-font.js"></script>
        <script type="text/javascript">
            OsFont.compile();
        </script>
    </body>
<html>
```
