(function(global) { "use strict";

    /**
     * Regex part used in the colors matcher
     * @type {String}
     */
    const REGEX_PART_COLORS = [
        "flash1:",
        "flash2:",
        "flash3:",
        "glow1:",
        "glow2:",
        "glow3:",
        "red:",   
        "cyan:",  
        "green:", 
        "yellow:",
        "purple:",
        "white:"  
    ].join("|");

    /**
     * Regex part used in the animations matcher
     * @type {String}
     */
    const REGEX_PART_ANIMATIONS = [
        "scroll:", 
        "slide:", 
        "shake:", 
        "wave:", 
        "wave2:"
    ].join("|");

    /**
     * Regex to match colour effects 
     * @type {RegExp}
     */
    const REGEX_FIND_COLOURS = new RegExp("^(?:"+ REGEX_PART_ANIMATIONS +")?("+ REGEX_PART_COLORS +").*");

    /**
     * Regex to match animation effects 
     * @type {RegExp}
     */
    const REGEX_FIND_ANIMATIONS = new RegExp("^(?:"+ REGEX_PART_COLORS +")?("+ REGEX_PART_ANIMATIONS +").*");


    /**
     * Get an element that contains a given piece of text 
     * @param {String} selector 
     * @param {String|RegExp} text 
     * @param {Object|null} parent 
     * @returns {Array}
     */
    function getElementContainingText(selector, text, parent)
    {
        return Array.prototype.filter.call((parent || document).querySelectorAll(selector), function(element) {
            return RegExp(text).test(element.textContent);
        });
    }

    /**
     * Get all paragraphs containing a given piece of text 
     * @param {String|RegExp} text 
     * @param {Object|null} parent 
     * @returns {Array}
     */
    function getParagraphsContainingText(text, parent)
    {
        return getElementContainingText("p", text, parent);
    }

    /**
     * Add a css class to the element if it does not exist 
     * @param {String} cssClass
     * @param {Object} element 
     * @returns {void}
     */
    function addClassIfNotExists(cssClass, element)
    {
        if (element.classList.contains(cssClass) == false) {
            element.classList.add(cssClass);
        } 
    }

    /**
     * Wrap every character of the element with a span 
     * Then update the text! 
     * @param {Object} element
     * @returns {void}
     */
    function spanifyElementText(element)
    {
        // Prevent us from doing this twice
        if (element.classList.contains("os-font-spanified") == false) {
            element.classList.add("os-font-spanified");
        } else {
            return;
        }

        // Data
        var html = false;
        var text_old = element.innerHTML;
        var text_new = "";

        // Loop through all of the text and add a span to every character (HTML safe!)
        for (var i = 0; i < text_old.length; i++)
        {
            if (text_old[i] == "<") {
                html = true;
            }
            if (text_old[i] == ">") {
                html = false;
            }
            if (html == false) {
                if (text_old[i] == " ") {
                    text_new += '<span>&nbsp;</span>';
                } else {
                    text_new += '<span>' + text_old[i] + '</span>';
                }
            } else {
                text_new += text_old[i];
            }
        }

        // Update the new text!
        element.innerHTML = text_new || "&nbsp;";
    }

    /**
     * Wrap the element text in a scrollable div 
     * @param {Object} element 
     * @returns {void}
     */
    function wrapElementText(element)
    {
        var wrapper  = '<div class="os-font-scrollable-wrapper">';
            wrapper +=     '<div class="os-font-scrollable">';
            wrapper +=         element.innerHTML;
            wrapper +=     '</div>';
            wrapper += '</div>';
            
        element.innerHTML = wrapper;
    }

    /**
     * Process a scroll animation 
     * @param {Object} element
     * @param {String} animation
     * @returns {void}
     */
    function processScrollAnimation(element, animation)
    {
        addClassIfNotExists("os-font", element);
        addClassIfNotExists("os-font-" + animation, element);
        stripEffectFromElement(element, animation);
        wrapElementText(element);
    }

    /**
     * Process a shake animation
     * @param {Object} element
     * @returns {void}
     */
    function processShakeAnimation(element)
    {
        // Cover the text with spans
        addClassIfNotExists("os-font", element);
        addClassIfNotExists("os-font-shake", element);
        stripEffectFromElement(element, "shake");
        spanifyElementText(element);

        // Fetch all spans 
        var spans = element.querySelectorAll("span");

        // Loop over all spans and add an animation
        spans.forEach((span, index) => {
            span.style["animation-delay"] = ((spans.length / 100) * index) / 100 + "s";
        });
    }

    /**
     * Process a wave animation
     * @param {Object} element
     * @param {String} animation
     * @returns {void}
     */
    function processWaveAnimation(element, animation)
    {
        // Cover the text with spans 
        addClassIfNotExists("os-font", element);
        addClassIfNotExists("os-font-" + animation, element);
        stripEffectFromElement(element, animation);
        spanifyElementText(element);

        // Loop over all spans and add an animation
        element.querySelectorAll("span").forEach((span, index) => {
            span.style["animation-delay"] = (0.075 * index) + "s";
        });
    }

    /**
     * Process the animations on certain elements 
     * @param {Object} element
     * @param {String} animation
     * @returns {void}
     */
    function processAnimationEffect(element, animation)
    {
        if (animation == "scroll" || animation == "slide") {
            processScrollAnimation(element, animation);
            return;
        }

        if (animation == "shake") {
            processShakeAnimation(element);
            return;
        }

        if (animation == "wave" || animation == "wave2") {
            processWaveAnimation(element, animation);
            return;
        }
    }

    /**
     * Strips an effect from an element 
     * @param {Object} element 
     * @param {String} effect
     */
    function stripEffectFromElement(element, effect)
    {
        element.innerHTML = element.innerHTML.replace(effect + ":", "");
    }

    /**
     * Process the color effect on a given element
     * @param {Object} element
     * @returns {void}
     */
    function processColorEffect(element, color)
    {
        stripEffectFromElement(element, color);
        addClassIfNotExists("os-font", element);
        addClassIfNotExists("os-font-" + color, element);
    }

    /**
     * Get an effect from an element's text content
     * To do this, a regex is passed and the first (1) instance is returned 
     * @param {Object} element 
     * @param {RegExp} regex 
     * @returns {String}
     */
    function getEffectFromElement(element, regex)
    {
        return element.textContent.match(regex)[1].replace(":", "").toLowerCase() || "";
    }

    /**
     * Main entry point of the script 
     * If no parent is given, the document will be assumed
     * @param {Object} parent
     * @returns {void}
     */
    function compile(parent)
    {
        getParagraphsContainingText(REGEX_FIND_COLOURS, parent).forEach(element => {
            processColorEffect(element, getEffectFromElement(element, REGEX_FIND_COLOURS));
        });

        getParagraphsContainingText(REGEX_FIND_ANIMATIONS, parent).forEach(element => {
            processAnimationEffect(element, getEffectFromElement(element, REGEX_FIND_ANIMATIONS));
        });
    }

    /**
     * Export OsFont to the global namespace
     * @type {Object}
     */
    global.OsFont = {
        compile: compile
    };
})(window);