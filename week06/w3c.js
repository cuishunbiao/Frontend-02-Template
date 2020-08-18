//爬取 W3C 网站数据
// Array.prototype.slice
// .call(document.querySelector("#container").children)
// .filter((e) => e.getAttribute("data-tag").match(/css/))
// .map((e) => ({
//     name: e.children[1].innerText,
//     url: e.children[1].children[0].href,
//     tag: e.children[5].innerText.trim(),
// }));

let w3cLists = [
    {
        name: "Requirements for Chinese Text Layout中文排版需求",
        url: "https://www.w3.org/TR/2020/WD-clreq-20200801/",
        tag: "CSSGraphicsi18nXML",
    },
    {
        name: "Media Queries Level 5",
        url: "https://www.w3.org/TR/2020/WD-mediaqueries-5-20200731/",
        tag: "CSS",
    },
    {
        name: "Media Queries Level 4",
        url: "https://www.w3.org/TR/2020/CR-mediaqueries-4-20200721/",
        tag: "CSS",
    },
    {
        name: "CSS Lists Module Level 3",
        url: "https://www.w3.org/TR/2020/WD-css-lists-3-20200709/",
        tag: "CSSi18n",
    },
    {
        name: "CSS Inline Layout Module Level 3",
        url: "https://www.w3.org/TR/2020/WD-css-inline-3-20200618/",
        tag: "CSS",
    },
    {
        name: "CSS Overflow Module Level 3",
        url: "https://www.w3.org/TR/2020/WD-css-overflow-3-20200603/",
        tag: "CSS",
    },
    {
        name: "CSS Containment Module Level 2",
        url: "https://www.w3.org/TR/2020/WD-css-contain-2-20200603/",
        tag: "CSS",
    },
    {
        name: "Encoding",
        url: "https://www.w3.org/TR/2020/NOTE-encoding-20200602/",
        tag: "CSSHTMLi18n",
    },
    {
        name:
            "Requirements for Hangul Text Layout and Typography : 한국어 텍스트 레이아웃 및 타이포그래피를 위한 요구사항",
        url: "https://www.w3.org/TR/2020/NOTE-klreq-20200527/",
        tag: "CSSGraphicsi18nXML",
    },
    {
        name: "CSS Box Sizing Module Level 4",
        url: "https://www.w3.org/TR/2020/WD-css-sizing-4-20200526/",
        tag: "CSS",
    },
    {
        name: "Ethiopic Layout Requirements",
        url: "https://www.w3.org/TR/2020/WD-elreq-20200526/",
        tag: "CSSGraphicsi18nXML",
    },
    {
        name: "CSS Positioned Layout Module Level 3",
        url: "https://www.w3.org/TR/2020/WD-css-position-3-20200519/",
        tag: "CSS",
    },
    {
        name: "CSS Display Module Level 3",
        url: "https://www.w3.org/TR/2020/CR-css-display-3-20200519/",
        tag: "CSS",
    },
    {
        name: "CSS Text Decoration Module Level 4",
        url: "https://www.w3.org/TR/2020/WD-css-text-decor-4-20200506/",
        tag: "CSS",
    },
    {
        name: "CSS Text Module Level 3",
        url: "https://www.w3.org/TR/2020/WD-css-text-3-20200429/",
        tag: "CSSi18n",
    },
    {
        name: "CSS Ruby Layout Module Level 1",
        url: "https://www.w3.org/TR/2020/WD-css-ruby-1-20200429/",
        tag: "CSSi18n",
    },
    {
        name: "CSS Box Model Module Level 3",
        url: "https://www.w3.org/TR/2020/WD-css-box-3-20200421/",
        tag: "CSS",
    },
    {
        name: "CSS Box Model Module Level 4",
        url: "https://www.w3.org/TR/2020/WD-css-box-4-20200421/",
        tag: "CSS",
    },
    {
        name: "CSS Box Alignment Module Level 3",
        url: "https://www.w3.org/TR/2020/WD-css-align-3-20200421/",
        tag: "CSS",
    },
    {
        name: "CSS Color Adjustment Module Level 1",
        url: "https://www.w3.org/TR/2020/WD-css-color-adjust-1-20200402/",
        tag: "CSS",
    },
    {
        name: "CSS Speech Module",
        url: "https://www.w3.org/TR/2020/CR-css-speech-1-20200310/",
        tag: "CSSMedia",
    },
    {
        name: "CSS Conditional Rules Module Level 4",
        url: "https://www.w3.org/TR/2020/WD-css-conditional-4-20200303/",
        tag: "CSS",
    },
    {
        name: "CSS Transforms Module Level 2",
        url: "https://www.w3.org/TR/2020/WD-css-transforms-2-20200303/",
        tag: "CSS",
    },
    {
        name: "CSS Color Module Level 5",
        url: "https://www.w3.org/TR/2020/WD-css-color-5-20200303/",
        tag: "CSS",
    },
    {
        name: "Resize Observer",
        url: "https://www.w3.org/TR/2020/WD-resize-observer-1-20200211/",
        tag: "CSS",
    },
    {
        name: "CSS Scroll Anchoring Module Level 1",
        url: "https://www.w3.org/TR/2020/WD-css-scroll-anchoring-1-20200211/",
        tag: "CSS",
    },
    {
        name: "Timed Text Markup Language 2 (TTML2) (2nd Edition)",
        url: "https://www.w3.org/TR/2020/CR-ttml2-20200128/",
        tag: "AccessibilityCSSHTML",
    },
    {
        name: "CSS Basic User Interface Module Level 4",
        url: "https://www.w3.org/TR/2020/WD-css-ui-4-20200124/",
        tag: "CSS",
    },
    {
        name: "CSS Writing Modes Level 3",
        url: "https://www.w3.org/TR/2019/REC-css-writing-modes-3-20191210/",
        tag: "CSS",
    },
    {
        name: "CSS Grid Layout Module Level 2",
        url: "https://www.w3.org/TR/2019/WD-css-grid-2-20191203/",
        tag: "CSS",
    },
    {
        name: "CSS Spatial Navigation Level 1",
        url: "https://www.w3.org/TR/2019/WD-css-nav-1-20191126/",
        tag: "CSS",
    },
    {
        name: "CSS Containment Module Level 1",
        url: "https://www.w3.org/TR/2019/REC-css-contain-1-20191121/",
        tag: "CSS",
    },
    {
        name: "CSS Text Module Level 4",
        url: "https://www.w3.org/TR/2019/WD-css-text-4-20191113/",
        tag: "CSS",
    },
    {
        name: "CSS Fonts Module Level 4",
        url: "https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/",
        tag: "CSS",
    },
    {
        name: "CSS Color Module Level 4",
        url: "https://www.w3.org/TR/2019/WD-css-color-4-20191105/",
        tag: "CSS",
    },
    {
        name: "CSS Properties and Values API Level 1",
        url:
            "https://www.w3.org/TR/2019/WD-css-properties-values-api-1-20191025/",
        tag: "TabAtkinsJr.DanielGlazmanAlanStearnsGregWhitworthShaneStephens",
    },
    {
        name: "CSS Multi-column Layout Module Level 1",
        url: "https://www.w3.org/TR/2019/WD-css-multicol-1-20191015/",
        tag: "CSS",
    },
    {
        name: "CSS Images Module Level 3",
        url: "https://www.w3.org/TR/2019/CR-css-images-3-20191010/",
        tag: "CSS",
    },
    {
        name: "CSS Text Decoration Module Level 3",
        url: "https://www.w3.org/TR/2019/CR-css-text-decor-3-20190813/",
        tag: "CSS",
    },
    {
        name: "CSS Generated Content Module Level 3",
        url: "https://www.w3.org/TR/2019/WD-css-content-3-20190802/",
        tag: "CSS",
    },
    {
        name: "CSS Writing Modes Level 4",
        url: "https://www.w3.org/TR/2019/CR-css-writing-modes-4-20190730/",
        tag: "CSS",
    },
    {
        name: "CSS Table Module Level 3",
        url: "https://www.w3.org/TR/2019/WD-css-tables-3-20190727/",
        tag: "CSS",
    },
    {
        name: "CSS Syntax Module Level 3",
        url: "https://www.w3.org/TR/2019/CR-css-syntax-3-20190716/",
        tag: "CSS",
    },
    {
        name: "CSS Animation Worklet API",
        url: "https://www.w3.org/TR/2019/WD-css-animation-worklet-1-20190625/",
        tag: "CSS",
    },
    {
        name: "CSS Overscroll Behavior Module Level 1",
        url: "https://www.w3.org/TR/2019/WD-css-overscroll-1-20190606/",
        tag: "CSS",
    },
    {
        name: "CSS Values and Units Module Level 3",
        url: "https://www.w3.org/TR/2019/CR-css-values-3-20190606/",
        tag: "CSS",
    },
    {
        name: "CSS Intrinsic & Extrinsic Sizing Module Level 3",
        url: "https://www.w3.org/TR/2019/WD-css-sizing-3-20190522/",
        tag: "CSS",
    },
    {
        name: "CSS Easing Functions Level 1",
        url: "https://www.w3.org/TR/2019/CR-css-easing-1-20190430/",
        tag: "CSS",
    },
    {
        name: "TTML Media Type Definition and Profile Registry",
        url: "https://www.w3.org/TR/2019/NOTE-ttml-profile-registry-20190411/",
        tag: "AccessibilityCSSHTML",
    },
    {
        name: "WebVTT: The Web Video Text Tracks Format",
        url: "https://www.w3.org/TR/2019/CR-webvtt1-20190404/",
        tag: "CSSGraphicsHTML",
    },
    {
        name: "Non-element  Selectors  Module  Level 1",
        url: "https://www.w3.org/TR/2019/NOTE-selectors-nonelement-1-20190402/",
        tag: "CSS",
    },
    {
        name: "CSS Scroll Snap Module Level 1",
        url: "https://www.w3.org/TR/2019/CR-css-scroll-snap-1-20190319/",
        tag: "CSS",
    },
    {
        name: "CSS Pseudo-Elements Module Level 4",
        url: "https://www.w3.org/TR/2019/WD-css-pseudo-4-20190225/",
        tag: "CSS",
    },
    {
        name: "CSS Transforms Module Level 1",
        url: "https://www.w3.org/TR/2019/CR-css-transforms-1-20190214/",
        tag: "CSS",
    },
    {
        name: "CSS Values and Units Module Level 4",
        url: "https://www.w3.org/TR/2019/WD-css-values-4-20190131/",
        tag: "CSS",
    },
    {
        name: "CSS Snapshot 2018",
        url: "https://www.w3.org/TR/2019/NOTE-css-2018-20190122/",
        tag: "CSS",
    },
    {
        name: "CSS Fragmentation Module Level 4",
        url: "https://www.w3.org/TR/2018/WD-css-break-4-20181218/",
        tag: "CSS",
    },
    {
        name: "Filter Effects Module Level 1",
        url: "https://www.w3.org/TR/2018/WD-filter-effects-1-20181218/",
        tag: "CSSGraphics",
    },
    {
        name: "Motion Path Module Level 1",
        url: "https://www.w3.org/TR/2018/WD-motion-1-20181218/",
        tag: "CSSGraphics",
    },
    {
        name: "Geometry Interfaces Module Level 1",
        url: "https://www.w3.org/TR/2018/CR-geometry-1-20181204/",
        tag: "CSSGraphics",
    },
    {
        name: "CSS Fragmentation Module Level 3",
        url: "https://www.w3.org/TR/2018/CR-css-break-3-20181204/",
        tag: "CSS",
    },
    {
        name: "Selectors Level 4",
        url: "https://www.w3.org/TR/2018/WD-selectors-4-20181121/",
        tag: "CSS",
    },
    {
        name: "CSS Flexible Box Layout Module Level 1",
        url: "https://www.w3.org/TR/2018/CR-css-flexbox-1-20181119/",
        tag: "CSS",
    },
    {
        name: "CSS Shadow Parts",
        url: "https://www.w3.org/TR/2018/WD-css-shadow-parts-1-20181115/",
        tag: "CSS",
    },
    {
        name: "Selectors Level 3",
        url: "https://www.w3.org/TR/2018/REC-selectors-3-20181106/",
        tag: "CSS",
    },
    {
        name: "CSS Paged Media Module Level 3",
        url: "https://www.w3.org/TR/2018/WD-css-page-3-20181018/",
        tag: "CSS",
    },
    {
        name: "CSS Transitions",
        url: "https://www.w3.org/TR/2018/WD-css-transitions-1-20181011/",
        tag: "CSS",
    },
    {
        name: "CSS Animations Level 1",
        url: "https://www.w3.org/TR/2018/WD-css-animations-1-20181011/",
        tag: "CSS",
    },
    {
        name: "Web Animations",
        url: "https://www.w3.org/TR/2018/WD-web-animations-1-20181011/",
        tag:
            "BrianBirtlesRobertFlackStephenMcGruerAntoineQuintShaneStephensAlexDaniloTabAtkinsJr.",
    },
    {
        name: "CSS Scrollbars Module Level 1",
        url: "https://www.w3.org/TR/2018/WD-css-scrollbars-1-20180925/",
        tag: "CSS",
    },
    {
        name: "CSS Fonts Module Level 3",
        url: "https://www.w3.org/TR/2018/REC-css-fonts-3-20180920/",
        tag: "CSSi18n",
    },
    {
        name: "Cascading  Style  Sheets,  level 1",
        url: "https://www.w3.org/TR/2018/SPSD-CSS1-20180913/",
        tag: "CSS",
    },
    {
        name: "CSS Cascading and Inheritance Level 3",
        url: "https://www.w3.org/TR/2018/CR-css-cascade-3-20180828/",
        tag: "CSS",
    },
    {
        name: "CSS Cascading and Inheritance Level 4",
        url: "https://www.w3.org/TR/2018/CR-css-cascade-4-20180828/",
        tag: "CSS",
    },
    {
        name: "CSS Logical Properties and Values Level 1",
        url: "https://www.w3.org/TR/2018/WD-css-logical-1-20180827/",
        tag: "CSS",
    },
    {
        name: "CSS Painting API Level 1",
        url: "https://www.w3.org/TR/2018/CR-css-paint-api-1-20180809/",
        tag: "CSS",
    },
    {
        name: "CSS Basic User Interface Module Level 3 (CSS3 UI)",
        url: "https://www.w3.org/TR/2018/REC-css-ui-3-20180621/",
        tag: "CSS",
    },
    {
        name: "CSS Color Module Level 3",
        url: "https://www.w3.org/TR/2018/REC-css-color-3-20180619/",
        tag: "CSS",
    },
    {
        name: "DOMMatrix interface",
        url: "https://www.w3.org/TR/2018/NOTE-matrix-20180412/",
        tag: "CSSGraphics",
    },
    {
        name: "CSS Layout API Level 1",
        url: "https://www.w3.org/TR/2018/WD-css-layout-api-1-20180412/",
        tag: "CSS",
    },
    {
        name: "CSS Typed OM Level 1",
        url: "https://www.w3.org/TR/2018/WD-css-typed-om-1-20180410/",
        tag: "ShaneStephensTabAtkinsJr.NainaRaisinghani",
    },
    {
        name: "CSS Grid Layout Module Level 1",
        url: "https://www.w3.org/TR/2017/CR-css-grid-1-20171214/",
        tag: "CSS",
    },
    {
        name: "CSS Counter Styles Level 3",
        url: "https://www.w3.org/TR/2017/CR-css-counter-styles-3-20171214/",
        tag: "CSS",
    },
    {
        name: "CSS Backgrounds and Borders Module Level 3",
        url: "https://www.w3.org/TR/2017/CR-css-backgrounds-3-20171017/",
        tag: "CSS",
    },
    {
        name: "CSS Overflow Module Level 4",
        url: "https://www.w3.org/TR/2017/WD-css-overflow-4-20170613/",
        tag: "CSS",
    },
    {
        name: "CSS Image Values and Replaced Content Module Level 4",
        url: "https://www.w3.org/TR/2017/WD-css-images-4-20170413/",
        tag: "CSS",
    },
    {
        name: "CSS Fill and Stroke Module Level 3",
        url: "https://www.w3.org/TR/2017/WD-fill-stroke-3-20170413/",
        tag: "ElikaEtemadTabAtkinsJr.",
    },
    {
        name: "CSS Rhythmic Sizing",
        url: "https://www.w3.org/TR/2017/WD-css-rhythm-1-20170302/",
        tag: "CSS",
    },
    {
        name: "Ready-made Counter Styles",
        url:
            "https://www.w3.org/TR/2017/NOTE-predefined-counter-styles-20170216/",
        tag: "CSSi18nXML",
    },
    {
        name: "CSS Snapshot 2017",
        url: "https://www.w3.org/TR/2017/NOTE-css-2017-20170131/",
        tag: "CSS",
    },
    {
        name: "CSS Round Display Level 1",
        url: "https://www.w3.org/TR/2016/WD-css-round-display-1-20161222/",
        tag: "CSS",
    },
    {
        name: "Worklets Level 1",
        url: "https://www.w3.org/TR/2016/WD-worklets-1-20160607/",
        tag: "IanKilpatrick",
    },
    {
        name:
            "Cascading Style Sheets Level 2 Revision 2 (CSS 2.2) Specification",
        url: "https://www.w3.org/TR/2016/WD-CSS22-20160412/",
        tag: "CSS",
    },
    {
        name: "CSS Device Adaptation Module Level 1",
        url: "https://www.w3.org/TR/2016/WD-css-device-adapt-1-20160329/",
        tag: "CSS",
    },
    {
        name: "CSS Object Model (CSSOM)",
        url: "https://www.w3.org/TR/2016/WD-cssom-1-20160317/",
        tag: "CSS",
    },
    {
        name: "CSSOM View Module",
        url: "https://www.w3.org/TR/2016/WD-cssom-view-1-20160317/",
        tag: "CSS",
    },
    {
        name: "CSS Custom Properties for Cascading Variables Module Level 1",
        url: "https://www.w3.org/TR/2015/CR-css-variables-1-20151203/",
        tag: "CSS",
    },
    {
        name: "CSS Will Change Module Level 1",
        url: "https://www.w3.org/TR/2015/CR-css-will-change-1-20151203/",
        tag: "CSS",
    },
    {
        name: "CSS Snapshot 2015",
        url: "https://www.w3.org/TR/2015/NOTE-css-2015-20151013/",
        tag: "CSS",
    },
    {
        name: "CSS Page Floats",
        url: "https://www.w3.org/TR/2015/WD-css-page-floats-3-20150915/",
        tag: "CSS",
    },
    {
        name: "Priorities for CSS from the Digital Publishing Interest Group",
        url: "https://www.w3.org/TR/2015/WD-dpub-css-priorities-20150820/",
        tag: "CSS",
    },
    {
        name: "CSS Template Layout Module",
        url: "https://www.w3.org/TR/2015/NOTE-css-template-3-20150326/",
        tag: "CSS",
    },
    {
        name: "CSS Exclusions Module Level 1",
        url: "https://www.w3.org/TR/2015/WD-css3-exclusions-20150115/",
        tag: "CSS",
    },
    {
        name: "Compositing and Blending Level 1",
        url: "https://www.w3.org/TR/2015/CR-compositing-1-20150113/",
        tag: "RikCabanierNikosAndronikos",
    },
    {
        name: "Fullscreen",
        url: "https://www.w3.org/TR/2014/NOTE-fullscreen-20141118/",
        tag: "AnnevanKesterenTantekÇelik",
    },
    {
        name: "CSS  Marquee  Module  Level 3",
        url: "https://www.w3.org/TR/2014/NOTE-css3-marquee-20141014/",
        tag: "CSS",
    },
    {
        name: "CSS  TV  Profile 1.0",
        url: "https://www.w3.org/TR/2014/NOTE-css-tv-20141014/",
        tag: "CSSMedia",
    },
    {
        name: "The CSS ‘Reader’ Media Type",
        url: "https://www.w3.org/TR/2014/NOTE-css3-reader-20141014/",
        tag: "CSS",
    },
    {
        name: "Behavioral Extensions to CSS",
        url: "https://www.w3.org/TR/2014/NOTE-becss-20141014/",
        tag: "CSS",
    },
    {
        name: "CSS Presentation Levels Module",
        url: "https://www.w3.org/TR/2014/NOTE-css3-preslev-20141014/",
        tag: "CSS",
    },
    {
        name: "CSS  Mobile  Profile 2.0",
        url: "https://www.w3.org/TR/2014/NOTE-css-mobile-20141014/",
        tag: "CSS",
    },
    {
        name: "CSS3 Hyperlink Presentation Module",
        url: "https://www.w3.org/TR/2014/NOTE-css3-hyperlinks-20141014/",
        tag: "CSS",
    },
    {
        name: "CSS Regions Module Level 1",
        url: "https://www.w3.org/TR/2014/WD-css-regions-1-20141009/",
        tag: "CSS",
    },
    {
        name: "CSS Line Grid Module Level 1",
        url: "https://www.w3.org/TR/2014/WD-css-line-grid-1-20140916/",
        tag: "CSS",
    },
    {
        name: "CSS Masking Module Level 1",
        url: "https://www.w3.org/TR/2014/CR-css-masking-1-20140826/",
        tag: "DirkSchulzeBrianBirtlesTabAtkinsJr.",
    },
    {
        name: "CSS Font Loading Module Level 3",
        url: "https://www.w3.org/TR/2014/WD-css-font-loading-3-20140522/",
        tag: "CSS",
    },
    {
        name: "CSS Generated Content for Paged Media Module",
        url: "https://www.w3.org/TR/2014/WD-css-gcpm-3-20140513/",
        tag: "CSS",
    },
    {
        name: "SVG Integration",
        url: "https://www.w3.org/TR/2014/WD-svg-integration-20140417/",
        tag: "CSSGraphicsHTML",
    },
    {
        name: "CSS Scoping Module Level 1",
        url: "https://www.w3.org/TR/2014/WD-css-scoping-1-20140403/",
        tag: "CSS",
    },
    {
        name: "CSS Shapes Module Level 1",
        url: "https://www.w3.org/TR/2014/CR-css-shapes-1-20140320/",
        tag: "CSS",
    },
    {
        name: "CSS Namespaces Module Level 3",
        url: "https://www.w3.org/TR/2014/REC-css-namespaces-3-20140320/",
        tag: "CSS",
    },
    {
        name: "CSS Style Attributes",
        url: "https://www.w3.org/TR/2013/REC-css-style-attr-20131107/",
        tag: "CSSHTML",
    },
    {
        name: "Selectors  API  Level 2",
        url: "https://www.w3.org/TR/2013/NOTE-selectors-api2-20131017/",
        tag: "CSSWebAPI",
    },
    {
        name: "CSS Conditional Rules Module Level 3",
        url: "https://www.w3.org/TR/2013/CR-css3-conditional-20130404/",
        tag: "CSS",
    },
    {
        name: "CSS Print Profile",
        url: "https://www.w3.org/TR/2013/NOTE-css-print-20130314/",
        tag: "CSS",
    },
    {
        name: "Selectors API Level 1",
        url: "https://www.w3.org/TR/2013/REC-selectors-api-20130221/",
        tag: "CSSWebAPI",
    },
    {
        name: "Media Queries",
        url: "https://www.w3.org/TR/2012/REC-css3-mediaqueries-20120619/",
        tag: "CSS",
    },
    {
        name: "Requirements for Japanese Text Layout",
        url: "https://www.w3.org/TR/2012/NOTE-jlreq-20120403/",
        tag:
            "YasuhiroAnanHiroyukiChibaJunzaburoEdamotoRichardIshidaTatsuoKOBAYASHIToshiKobayashiKenzouOnozawaFelixSasakiSeiichiKatoHajimeShiozawa",
    },
    {
        name:
            "Cascading Style Sheets Level 2 Revision 1 (CSS 2.1) Specification",
        url: "https://www.w3.org/TR/2011/REC-CSS2-20110607/",
        tag: "CSS",
    },
    {
        name: "A MathML for CSS Profile",
        url: "https://www.w3.org/TR/2011/REC-mathml-for-css-20110607/",
        tag: "CSS",
    },
    {
        name: "Cascading Style Sheets (CSS) Snapshot 2010",
        url: "https://www.w3.org/TR/2011/NOTE-css-2010-20110512/",
        tag: "CSS",
    },
    {
        name: "Cascading Style Sheets (CSS) Snapshot 2007",
        url: "https://www.w3.org/TR/2011/NOTE-css-beijing-20110512/",
        tag: "CSS",
    },
    {
        name:
            "Associating Style Sheets with XML documents 1.0 (Second Edition)",
        url: "https://www.w3.org/TR/2010/REC-xml-stylesheet-20101028/",
        tag: "CSSXML",
    },
    {
        name: "Document Object Model (DOM) Level 2 Style Specification",
        url: "https://www.w3.org/TR/2000/REC-DOM-Level-2-Style-20001113/",
        tag: "CSSDOM",
    },
    {
        name: "CSS Techniques for Web Content Accessibility Guidelines 1.0",
        url: "https://www.w3.org/TR/2000/NOTE-WCAG10-CSS-TECHS-20001106/",
        tag: "AccessibilityCSS",
    },
    {
        name: "CSS Printing Extensions",
        url: "https://www.w3.org/TR/1999/WD-print-19990902",
        tag: "CSS",
    },
    {
        name: "Aural Cascading Style Sheets (ACSS) Specification",
        url: "https://www.w3.org/TR/1999/WD-acss-19990902",
        tag: "CSS",
    },
    {
        name: "Positioning HTML Elements with Cascading Style Sheets",
        url: "https://www.w3.org/TR/1999/WD-positioning-19990902",
        tag: "CSS",
    },
    {
        name: "List of suggested extensions to CSS",
        url: "https://www.w3.org/TR/1998/NOTE-CSS-potential-19981210",
        tag: "CSS",
    },
];


let iframe = document.createElement('iframe');

document.body.innerHTML = '';
document.body.appendChild(iframe);

let arrayAll = [];

function happenFn(element,event){
    return new Promise((resolve)=>{

        let handler = ()=>{
            resolve();
            element.removeEventListener(event, handler);
        }
        element.addEventListener(event,handler)

    })
}

void async function(){
    for( let item of w3cLists ){
        console.log(item);
        iframe.src = item.url;
        await happenFn(iframe,"load");
        arrayAll.push({
            title: item.name,
            lists: iframe.contentDocument.querySelectorAll('.propdef')
        })
        console.log(arrayAll);
    }
}()






