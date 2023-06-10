/*  Iconexperience Search, version 2.1
 *
 *  (c) 2013 Incors GmbH
 *--------------------------------------------------------------------------*/

(function($) {

  /* path to image files */
  DEFAULT_STYLE = 'gradient';
  DEFAULT_COLOR_STYLE = 'gradient';
  STYLE = 'gradient';
  IMG_PATH = 'g_collection_png';


  STYLES = [
    'standard',
    'blue',
    'gradient'
  ];

  $.Incors.IconSearchConfig = $.extend($.Incors.IconSearchConfig, {
    imgKeywordSearchPreviewSize: 32,
    searchFieldOpacity: 1
  });

  HIDE_PLAIN_AND_SHADOW_IN_PATH = true;

  $.Incors.Template.resultListImgTmpl = function(vars) {
    return ['<li class="detail_link"><a href="#" onClick="return false;"><img src="', $.Incors.Image.imgPlainPath(vars.iconName, 32, STYLE) , '" name="' , vars.iconName , '" title="' , vars.iconName , '" icon_id="' , vars.iconId , '" style="width: 32px; height: 32px; background: ', vars.backgroundColor ,';"></a></li>'].join('');
  };

  $.Incors.Template.resultListImg2Tmpl = function(vars) {
    return ['<div class="icon_result_name"><div class="detail_link"><a href="#" onClick="return false;"><img src="' , $.Incors.Image.imgPlainPath(vars.iconName, 48, STYLE) , '" name="' , vars.iconName , '" title="' , vars.iconName , '" icon_id="' , vars.iconId , '" style="width: 48px; height: 48px; background: ', vars.backgroundColor ,';"></a></div><div>' , vars.iconNameHighlight , '</div></div>'].join('');
  };

  $.Incors.Template.detailsTmpl = function(vars) {
    return [
      '<div id="details_content" class="style_' + STYLE + '">' ,
      '<div id="details_icon_name">' , vars.name , '</div>' ,
      '<table id="details_table"><tr>' ,
      // '<td style="width: 50%;">' ,
      // '<div class="details_size">16x16</div>' ,
      // '<div class="details_icon"><img class="icon_preview" width="16" height="16" class="detail_img" style="position: relative; top: 4px; background: ', vars.background ,';" src="' , $.Incors.Image.imgPlainPath(vars.name, 16, STYLE) , '"></div>' ,
      // '</td>' ,
      // '<td style="width: 50%">' ,
      // '<div class="details_size">24x24</div>' ,
      // '<div class="details_icon"><img class="icon_preview" width="24" height="24" class="detail_img" style="background: ', vars.background ,';" src="' , $.Incors.Image.imgPlainPath(vars.name, 24, STYLE) , '"></div>' ,
      // '</td>' ,
      // '</tr><tr>' ,
      // '<td>' ,
      // '<div class="details_size">32x32</div>' ,
      // '<div class="details_icon"><img class="icon_preview" width="32" height="32" class="detail_img" style="position: relative; top: 8px; background: ', vars.background ,';" src="' , $.Incors.Image.imgPlainPath(vars.name, 32, STYLE) , '"></div>' ,
      // '</td>' ,
      // '<td>' ,
      // '<div class="details_size">48x48</div>' ,
      // '<div class="details_icon"><img class="icon_preview" width="48" height="48" class="detail_img" style="background: ', vars.background ,';" src="' , $.Incors.Image.imgPlainPath(vars.name, 48, STYLE) , '"></div>' ,
      // '</td>' ,
      // '</tr><tr>' ,
      // '<td>' ,
      // '<div class="details_size">64x64</div>' ,
      // '<div class="details_icon"><img class="icon_preview" width="64" height="64" class="detail_img" style="position: relative; top: 32px; background: ', vars.background ,';" src="' , $.Incors.Image.imgPlainPath(vars.name, 64, STYLE) , '"></div>' ,
      // '</td>' ,
      // '<td>' ,
      // '<div class="details_size">128x128</div>' ,
      // '<div class="details_icon"><img class="icon_preview" width="128" height="128" class="detail_img" style="background: ', vars.background ,';" src="' , $.Incors.Image.imgPlainPath(vars.name, 128, STYLE) , '"></div>' ,
      // '</td>' ,
      // '</tr><tr>' ,
      '<tr>' ,
      '<td colspan="2">' ,
      '<div class="details_size">256x256</div>' ,
      '<div class="details_icon"><img class="icon_preview" width="256" height="256" class="detail_img" style="background: ', vars.background ,';" src="' , $.Incors.Image.imgPlainPath(vars.name, 256, STYLE) , '"></div>' ,
      '</td>' ,
      // '</tr><tr>' ,
      // '<tr>' ,
      // '<td colspan="2">' ,
      // '<div class="details_size">512x512: <a href="#" onclick="$.Incors.IconSearch.openOtherFormat(512, \'' , vars.name , '\'); return false;">click here</a></div>' ,
      // '</td>' ,
      // '</tr><tr>' ,
      // '<td colspan="2">' ,
      // '<div class="details_size">SVG file (vector format): <a class="icon_link" href="g_collection_svg/', STYLE, '/', vars.name , '.svg" target="_blank">click here</a></div>' ,
      // '</td>' ,
      // '</tr><tr>' ,
      // '<td colspan="2">' ,
      // '<div class="details_size">ICO file: <a class="icon_link" href="g_collection_ico/' , STYLE , '/' , vars.name , '.ico" target="_blank">click here</a></div>' ,
      // '</td>' ,
      // '</tr><tr>' ,
      // '<td colspan="2">' ,
      // '<div class="details_size">ICO lagacy file: <a class="icon_link" href="g_collection_ico_legacy/' , STYLE , '/' , vars.name , '.ico" target="_blank">click here</a></div>' ,
      // '</td>' ,
      '</tr></table>',
      '<div class="details_keywords"><div style="font-size: 20px; padding: 10px 0;">Keywords:</div><div>' , vars.keywordLinks , '</div></div>' ,
      '</div>'
    ].join('');
  };

  /*$.Incors.IconSearch.changeStyle = function() {
    var changeStyle = function(style) {
      STYLE = style;
      $('#details_content').attr( "class", "style_" + STYLE);
    };

    $("#details_content .style_img > div").click(function(event) {
      var oldStyle = STYLE;
      var style = $(event.target).parent().attr("data-style");
      changeStyle(style);

      $("#details_content img.icon_preview").each(function() {
        this.src = this.src.replace(oldStyle, STYLE);
      });

      $("#details_content a.icon_link").each(function() {
        this.href = this.href.replace(oldStyle, STYLE);
      });
    });
  };*/

  var changeStyleHandler;

  $.Incors.IconSearch.changeStyle = function() {
    $('#icon_search').attr( "class", "style_" + STYLE);

    var changeStyle = function(style) {
      STYLE = style;
      DEFAULT_COLOR_STYLE = style;
      $('#icon_search').attr( "class", "style_" + STYLE);
    };

    changeStyleHandler && changeStyleHandler.off();

    changeStyleHandler = $("#icon_search .style_img > div").click(function(event) {
      var oldStyle = STYLE;
      var style = $(event.target).parent().attr("data-style");
      changeStyle(style);

      $("#details_content img.icon_preview").each(function() {
        this.src = this.src.replace(oldStyle, STYLE);
      });

      $('#results img').each(function() {
        this.src = this.src.replace(oldStyle, STYLE);
      });

      $("#details_content a.icon_link").each(function() {
        this.href = this.href.replace(oldStyle, STYLE);
      });
    });
  };

  $.Incors.IconSearch.openOtherFormat = function(size, name) {
    console.info(STYLE)
    $.colorbox({ html: '<div><div><img class="icon_preview" width="' + size + '" height="' + size + '" src="' + $.Incors.Image.imgPlainPath(name, 512, STYLE) + '" /></div></div> ' });
  };

  $.Incors.IconSearch.prototype.getHighlightedIconBorder = function() {
    return 'solid 2px #009688';
  };

  $.Incors.IconSearch.prototype.isShadow = function() {
    return false;
  };

  $.Incors.IconSearch.prototype.getBackgroundColorOnSelect = function(elem) {
    return elem.css('background-color');
  };

  $(document).ready(function() {
    $.Incors.IconSearch.changeStyle();
  });
})(jQuery);







/*
(function($) {
  DEFAULT_STYLE = 'standard';
  DEFAULT_COLOR_STYLE = 'standard';
  STYLE = 'standard';
  IMG_PATH = '/_img/g_collection_png';

  HIDE_PLAIN_AND_SHADOW_IN_PATH = true;

  $.Incors.IconSearchConfig = $.extend($.Incors.IconSearchConfig, {
    imgKeywordSearchPreviewSize: 32,
    searchFieldOpacity: 1
  });

  $.Incors.Template.resultListImgTmpl = function(vars) {
    return ['<li class="detail_link"><a href="#" onClick="return false;"><img src="', $.Incors.Image.imgPlainPath(vars.iconName, 32, STYLE) , '" name="' , vars.iconName , '" title="' , vars.iconName , '" icon_id="' , vars.iconId , '" style="width: 32px; height: 32px; background: ', vars.backgroundColor ,';"></a></li>'].join('');
  };

  $.Incors.Template.resultListImg2Tmpl = function(vars) {
    return ['<div class="icon_result_name"><div class="detail_link"><a href="#" onClick="return false;"><img src="' , $.Incors.Image.imgPlainPath(vars.iconName, 48, STYLE) , '" name="' , vars.iconName , '" title="' , vars.iconName , '" icon_id="' , vars.iconId , '" style="width: 48px; height: 48px; background: ', vars.backgroundColor ,';"></a></div><div>' , vars.iconNameHighlight , '</div></div>'].join('');
  };

  $.Incors.Template.detailsTmpl = function(vars) {
    return [
      '<div id="details_content">' ,
      '<div id="details_icon_name">' , vars.name , '</div>' ,
      '<table cellspacing="1" cellpadding="0" id="details_table"><tr>' ,
      '<td style="width: 50%;">' ,
      '<div class="details_size">16x16</div>' ,
      '<div class="details_icon"><img class="icon_preview" width="16" height="16" class="detail_img" style="position: relative; top: 4px; background: ', vars.background ,';" src="' , $.Incors.Image.imgPlainPath(vars.name, 16, STYLE) , '"></div>' ,
      '</td>' ,
      '<td style="width: 50%">' ,
      '<div class="details_size">24x24</div>' ,
      '<div class="details_icon"><img class="icon_preview" width="24" height="24" class="detail_img" style="background: ', vars.background ,';" src="' , $.Incors.Image.imgPlainPath(vars.name, 24, STYLE) , '"></div>' ,
      '</td>' ,
      '</tr><tr>' ,
      '<td>' ,
      '<div class="details_size">32x32</div>' ,
      '<div class="details_icon"><img class="icon_preview" width="32" height="32" class="detail_img" style="position: relative; top: 8px; background: ', vars.background ,';" src="' , $.Incors.Image.imgPlainPath(vars.name, 32, STYLE) , '"></div>' ,
      '</td>' ,
      '<td>' ,
      '<div class="details_size">48x48</div>' ,
      '<div class="details_icon"><img class="icon_preview" width="48" height="48" class="detail_img" style="background: ', vars.background ,';" src="' , $.Incors.Image.imgPlainPath(vars.name, 48, STYLE) , '"></div>' ,
      '</td>' ,
      '</tr><tr>' ,
      '<td>' ,
      '<div class="details_size">64x64</div>' ,
      '<div class="details_icon"><img class="icon_preview" width="64" height="64" class="detail_img" style="position: relative; top: 32px; background: ', vars.background ,';" src="' , $.Incors.Image.imgPlainPath(vars.name, 64, STYLE) , '"></div>' ,
      '</td>' ,
      '<td>' ,
      '<div class="details_size">128x128</div>' ,
      '<div class="details_icon"><img class="icon_preview" width="128" height="128" class="detail_img" style="background: ', vars.background ,';" src="' , $.Incors.Image.imgPlainPath(vars.name, 128, STYLE) , '"></div>' ,
      '</td>' ,
      '</tr><tr>' ,
      '<td colspan="2">' ,
      '<div class="details_size">256x256</div>' ,
      '<div class="details_icon"><img class="icon_preview" width="256" height="256" class="detail_img" style="background: ', vars.background ,';" src="' , $.Incors.Image.imgPlainPath(vars.name, 256, STYLE) , '"></div>' ,
      '</td>' ,
      '</tr>' ,
      '</tr></table>' ,
      '<div style="margin: 10px 0 0 0;">' ,
        '<div style="padding: 10px 0; font-size: 20px;">Other formats:</div>' ,
        '<div class="details_size">512x512: <a href="#" onclick="$.Incors.IconSearch.openOtherFormat(512, \'' , vars.name , '\'); return false;">click here</a></div>' ,
      '</div>' ,
      '<div class="details_keywords"><div style="font-size: 20px; padding: 10px 0;">Keywords:</div><div>' , vars.keywordLinks , '</div></div>' ,
      '</div>'
    ].join('');
  };

  $.Incors.IconSearch.openOtherFormat = function(size, name) {
    $.colorbox({ html: '<div><div><img class="icon_preview" width="' + size + '" height="' + size + '" src="' + $.Incors.Image.imgPlainPath(name, 512, STYLE) + '" /></div></div> ' });
  };

  $.Incors.IconSearch.prototype.getHighlightedIconBorder = function() {
    return 'solid 2px #009688';
  };

  $.Incors.IconSearch.prototype.isShadow = function() {
    return false;
  };

  $.Incors.IconSearch.prototype.getBackgroundColorOnSelect = function(elem) {
    return elem.css('background-color');
  };

  var changeStyleHandler;

  $.Incors.IconSearch.changeStyle = function() {
    $('#icon_search').attr( "class", "style_" + STYLE);

    var changeStyle = function(style) {
      STYLE = style;
      DEFAULT_COLOR_STYLE = style;
      $('#icon_search').attr( "class", "style_" + STYLE);
    };

    changeStyleHandler && changeStyleHandler.off();

    changeStyleHandler = $("#icon_search .style_img > div").click(function(event) {
      var oldStyle = STYLE;
      var style = $(event.target).parent().attr("data-style");
      changeStyle(style);

      $("#details_content img.icon_preview").each(function() {
        this.src = this.src.replace(oldStyle, STYLE);
      });

      $('#results img').each(function() {
        this.src = this.src.replace(oldStyle, STYLE);
      });
    });
  };

  $(document).ready(function() {
    $.Incors.IconSearch.changeStyle();
  });

})(jQuery);

*/
