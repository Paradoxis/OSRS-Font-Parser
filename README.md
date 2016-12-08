# OSRS-Font-Parser
![Make your website relive your nerdy childhood](https://raw.githubusercontent.com/Paradoxis/OSRS-Font-Parser/master/images/preview.gif)

## Live demo
Click [here](https://paradoxis.github.io/OSRS-Font-Parser/) for the live demo

## Download method #1
Press this big ol' button

[![Download](https://raw.githubusercontent.com/Paradoxis/OSRS-Font-Parser/master/images/button.png)](https://github.com/Paradoxis/OS-Font/archive/master.zip)

## Download method #2
Clone the code using git, nice
    
    $ git clone git@github.com:Paradoxis/OS-Font.git
    
## Download method #3
Download the code using wget (linux, nice)

    $ wget https://github.com/Paradoxis/OS-Font/archive/master.zip
    
## Download method #4
Download the code using curl (we get it, you're a l33t hacker)

    $ curl -D OS-Font.zip https://github.com/Paradoxis/OS-Font/archive/master.zip

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
