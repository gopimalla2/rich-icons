(function($) {

$.Incors = $.Incors || {};

$.Incors.IconsColorbox = function(options) {
  this.options = $.extend({
    onOpen: function() {},
    onCleanup: function() {},
    onComplete: function() {},
    height: 570,
    width: 680
  }, options || {});


  this.hashChanged = false;

  this.isOpen = false;

  this.createIconsShadowboxOptions = {
    initialWidth: this.options.width,
    initialHeight: this.options.height,
    innerWidth: this.options.width,
    innerHeight: this.options.height,
    onOpen: this.options.onOpen,
    onComplete: $.proxy(function() {
      this.setupRelatedIcons();
      $('#show_shadows').change(function() {
        if ($('#show_shadows:checked').val() !== undefined) {
          // checked
          $('.icons_without_shadows').hide();
          $('.icons_with_shadows').show();
        } else {
          // not checked
          $('.icons_with_shadows').hide();
          $('.icons_without_shadows').show();
        }
        this.isOpen = true;
      });
      this.hashChanged = true;
      window.location.hash = $('#icon_preview_icon_name').text();
      this.options.onComplete();
    }, this),
    onCleanup: $.proxy(function() {
      this.hashChanged = true;
      window.location.hash = '';
      this.isOpen = false;
      this.options.onCleanup();
    }, this)
  };

  if (window.location.hash) {
    $.colorbox($.extend({ href: '../icons/?icon=' + window.location.hash.substr(1) }, this.createIconsShadowboxOptions));
  }

  /*window.onhashchange = function() {
    console.info('changed');
    if(this.hashChanged == false) {
      $.colorbox($.extend(this.createIconsShadowboxOptions, { href: '?icon=' + window.location.hash.substr(1) }));
    } else {
      this.hashChanged = false;
    }
  }*/
};

$.Incors.IconsColorbox.prototype = {
  createIconsShadowbox: function(options) {
    var options = $.extend({
      href: null,
      elems: null
    }, options || {});

    if (options.elems) {
      options.elems.colorbox($.extend(this.createIconsShadowboxOptions, options));
    } else if (options.href) {
      $.colorbox($.extend({}, this.createIconsShadowboxOptions, options));
    }
  },

  setupRelatedIcons: function() {
    var $this = this;
    $('.icons_related_icon_link').click(function(event) {
      $this.createIconsShadowbox({ href: $(this).attr("href") });
      return false;
    });
  }
}


$.Incors.loadCategorySprites = function(categories, category_to_img, img_path) {
  return;

  var loadQueue = [];

  var loadCategorySprite = function(pos) {
    if (pos < categories.length) {
      var category = categories[pos][0];
      var imgSrc = categories[pos][1];

      $('<img/>').attr('src', imgSrc).load(function() {
        category.children(':first').addClass('prev_icons');
        loadCategorySprite(++pos);
      });
    }
  };

  loadCategorySprite(0);

};


$.Incors.ScrollHandler = function(collectionSets, options) {
  $this = this;

  this.collectionSets = collectionSets;

  this.options = $.extend({
    style: null, // used in G-Collection
    colorStyle: null, // used in O-Collection
    appearance: null // used in I-Collection
  }, options || {});

  this.style = this.options.style;
  this.colorStyle = this.options.colorStyle;
  this.appearance = this.options.appearance;

  this.inScrollToAnimation = false;

  this.categoriesNavigation = $('#categories_navigation');
  this.showIcons = $('#show_icons');

  this.iconsContentScroll = $('#icons_content_scroll');
  this.iconsContentScrollHeight = $('#icons_content_scroll').height();

  this.scrollProxy = $.proxy(this.scroll, this);

  this.loadedCollectionImgs = {};

  if (collectionSets.length > 0) {
    $(collectionSets).each(function(i, collectionSet) {
      var collectionHeading = collectionSet[0];
      var collectionLink = collectionSet[1];

      collectionLink.click(function() {
        $this.inScrollToAnimation = true;
        $this.iconsContentScroll.animate({ scrollTop: collectionHeading.position().top + 1 }, 1000, 'easeInOutQuart', function() {
          $this.inScrollToAnimation = false;
          $this.triggerScroll();
        });
        return false;
      });
    });

    this.iconsContentScroll.scroll(this.scrollProxy);
    this.triggerScroll();
  }

  this.resizeContent();
  $(window).resize(function() {
    $this.resizeContent();
  });
};

$.Incors.ScrollHandler.prototype = {
  resizeContent: function() {
    if (!(this.scrollHeight)) {
      this.scrollHeight = this.iconsContentScroll.height();
      var scrollTopOffset = this.iconsContentScroll.offset().top;
      var categoriesTopOffest = this.categoriesNavigation.offset().top;
      this.minHeight = (categoriesTopOffest + this.categoriesNavigation.height()) - scrollTopOffset;
      this.offset = (scrollTopOffset + ($('html').height() - (this.showIcons.height() + this.showIcons.offset().top)));
    }

    var maxHeight = $(window).height() - this.offset;
    var height = this.minHeight > maxHeight ? this.minHeight : maxHeight;

    if (this.scrollHeight != height) {
      this.scrollHeight = height;
      this.iconsContentScroll.height(height);
    }
  },

  showCollectionImgs: function(collectionHeading) {
    var collectionHeadingId = collectionHeading.attr('id');

    var collectionKey = collectionHeadingId;
    if (this.style) {
      collectionKey += this.style;
    } else if (this.colorStyle) {
      collectionKey += this.colorStyle;
    } else if (this.appearance) {
      collectionKey += this.appearance;
    }

    if (!(this.loadedCollectionImgs[collectionKey])) {
      var showIconsClass = 'show_icons';
      if (this.style) {
        showIconsClass += '_' + this.style;
      } else if (this.colorStyle) {
        showIconsClass += '_' + this.colorStyle;
      } else if (this.appearance) {
        showIconsClass += '_' + this.appearance;
      }

      collectionHeading.find('.trigger_icons').addClass(showIconsClass);
      this.loadedCollectionImgs[collectionKey] = true;
    }
  },

  triggerScroll: function() {
    this.iconsContentScroll.trigger('scroll');
  },

  setStyle: function(style) {
    this.style = style;
    this.triggerScroll();
  },

  setColorStyle: function(colorStyle) {
    this.colorStyle = colorStyle;
    this.triggerScroll();
  },

  setAppearance: function(appearance) {
    this.appearance = appearance;
    this.triggerScroll();
  },

  scroll: function() {
    var scrollTop = this.iconsContentScroll.scrollTop();

    var firstCollectionHeading = this.collectionSets[0][0];
    var firstCollectionHeadingOffset = firstCollectionHeading.position().top;

    for (var i = this.collectionSets.length - 1; i >= 0; --i) {
      var collectionSet = this.collectionSets[i];
      var collectionHeading = collectionSet[0];
      var collectionLink = collectionSet[1];

      if (scrollTop + this.iconsContentScrollHeight >= collectionHeading.position().top - firstCollectionHeadingOffset) {
        if (!$this.inScrollToAnimation) {
          this.showCollectionImgs(collectionHeading);
        }

        if (i > 0) {
          var collectionSetPrev = this.collectionSets[i - 1];
          var collectionHeadingPrev = collectionSetPrev[0];
          var collectionLinkPrev = collectionSetPrev[1];

          if (scrollTop >= collectionHeading.position().top - firstCollectionHeadingOffset) {
            collectionLink.css({ opacity: 0 });
            collectionLinkPrev.css({ opacity: 1 });
          } else {
            if (!$this.inScrollToAnimation) {
              this.showCollectionImgs(collectionHeadingPrev);
            }

            var fac = ((scrollTop + this.iconsContentScrollHeight) - (collectionHeading.position().top - firstCollectionHeadingOffset)) / this.iconsContentScrollHeight;
            collectionLink.css({ opacity: 1 - fac });
            collectionLinkPrev.css({ opacity: fac });
          }

          for (var j = i - 2; j >= 0; --j) {
            var collectionSet = this.collectionSets[j];
            var collectionHeading = collectionSet[0];
            var collectionLink = collectionSet[1];

            collectionLink.css({ opacity: 1 });
          }
        } else {
          collectionLink.css({ opacity: 0 });
        }
        break;
      } else {
        collectionLink.css({ opacity: 1 });
      }
    }
  }
};

init512Hover = function() {
  $("#plain_512").hover(
    function() {
      $("#plain_img_512").stop().fadeIn();
    },
    function() {
      $("#plain_img_512").stop().fadeOut();
    }
  );

  $("#shadow_512").hover(
    function() {
      $("#shadow_img_512").stop().fadeIn();
    },
    function() {
      $("#shadow_img_512").stop().fadeOut();
    }
  );
};

})(jQuery);
