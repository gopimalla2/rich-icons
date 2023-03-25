SEARCH_KEYWORD_PROCESSOR = (function() {
  var regexes = [
    [/^(global|automat|immun|organ|author|minim|maxim)is/, "$1iz"],
    [/^(ana|cata|dia)logu[e]?/, "$1log"],
    [/^(arm|col|fav|flav|hon|hum|lab)ou/, "$1o"],
    [/^(licen|advi)c/, "$1s"],
    [/^(account|animal|app|arrow|book|building|bullet|card|car|chart|check|coin|color|contact|customer|detail|document|drop|electron|element|event|file|flag|folder|form|game|gear|group|hand|house|icon|item|key|kid|ladie|letter|link|message|movie|node|note|number|object|page|part|person|photo|pill|product|report|result|rule|service|shape|song|step|task|thumb|tool|user|week|window)s$/, "$1"]
  ];
  
  var replaceMap = {   
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    "?": "question mark",
    "!": "exclamation mark",
    "+": "plus",
    "-": "minus",
    "#": "hash",
    "%": "percent",
    "\u20AC": "euro",
    "$": "dollar",
    "@": "at",
    adaptor: "adapter",
    ammo: "ammunition",
    approval: "approve",
    centre: "center",
    disapproval: "disapprove",
    foto: "photo",
    judgment: "judgement",
    metre: "meter",
    raquet: "racket",
    spectre: "specter",
    stats: "statistics",
    theatre: "theater",
    tyre: "tire",
    calender: "calendar",
    telefon: "telephone",
    lolly: "lollipop",
    // special
    marker: "mark",
    ladies: "lady",
    women: "woman",
    man: "men",
    secure: "security",
    private: "privacy",
    supply: "supplier",
    running: "run",
    gamble: "gambling",
    choice: "choose",
    // > tion
    animate: "animation",
    annotate: "annotation",
    calibrate: "calibration",
    celebrate: "celebration",
    calculate: "calculation",
    communicate: "communication",
    convert: "conversion",
    decide: "decision",
    diapprove: "disapproval",
    donate: "donation",
    educate: "education",
    execute: "execution",
    graduate: "graduation",
    immune: "immunization",
    innovate: "innovation",
    investigate: "investigation",
    navigate: "navigation",
    notify: "notification",
    operate: "operation",
    rotate: "rotation",
    verify: "verification",
    //ToDo
    // disc/disk
  };

  return function(keyword) {    
    for (var i = 0; i < regexes.length; i++) {
      keyword = keyword.replace(regexes[i][0], regexes[i][1]);
    }
    
    var mapEntry = replaceMap[keyword];
  
    return mapEntry ? mapEntry : keyword;
  }
})();