(function( window ) {
  window.videoCallback = function( data ) {
    var feed = data.feed,
        entries = feed.entry || {},
        entry,
        title,
        youtubeContainer,
        instances = [],
        occurences = {},
        script,
        id,
        entriesLeft = 0,
        searchTerms = "",
        hash,
        nextLeft = "0px",
        nextPos = "relative",
        thumbContainer,
        arrowContainer,
        tags = [],
        keywordElements,
        dataPanel,
        pie,
        bar,
        line,
        inter;

    function getTags() {
      var xmlhttp = new XMLHttpRequest();

      function change( data ) {
        if ( xmlhttp.readyState == 4 ) {
          var entry = JSON.parse( data.srcElement.response );
          var entries = entry.feed.entry;

          for ( var i = 0, l = entries.length; i < l; i++ ) {
            if ( instances[ i ] && entries[ i ].media$group.media$keywords.$t ) {
              instances[ i ].keywords = entries[ i ].media$group.media$keywords.$t;
            }
          }
          captionsComplete();
        }
      }

      xmlhttp.onreadystatechange = change;
      //xmlhttp.open( "GET", "http://gdata.youtube.com/feeds/api/videos?q=Tactical Storytelling&alt=json&format=5&author=LandofOpp&v=2.1", true );
      xmlhttp.open( "GET", "http://dcseifried.lop.jit.su/getkeywords", true );
      xmlhttp.send( null );
    }

    function captionsComplete() {
      var vals = [],
          callbacks = [
            function() {
              var data = new google.visualization.DataTable(),
                  rows = [],
                  options = {
                    "title": "Tactical Storytelling",
                    "width": 665,
                    "height": 300
                  },
                  chart;

              vals = {};

              data.addColumn( "string", "Issue" );
              data.addColumn( "number", "Occurences" );

              var tmpArr,
                  item;
              for ( var i = 0, l = instances.length; i < l; i++ ) {
                if ( instances[ i ].keywords && instances[ i ].keywords.indexOf( "graph-" ) > -1 ) {
                  tmpArr = instances[ i ].keywords.split( " " );
                  if ( tmpArr.indexOf( "graph-" ) > -1 ) {
                    item = tmpArr[ tmpArr.indexOf( "graph-" ) + 1 ];
                    if ( vals[ item ] ) {
                      vals[ item ]++;
                    } else {
                      vals[ item ] = 1;
                    }
                  }
                }
              }

              for ( var prop in vals ) {
                rows.push([ prop, vals[ prop ] ]);
              }

              data.addRows( rows );

              chart = new google.visualization.PieChart( pie );
              chart.draw( data, options );
            },
            function() {
              var data = new google.visualization.DataTable(),
                  rows = [],
                  options = {
                    "title": "Tactical Storytelling",
                    "width": 665,
                    "height": 300
                  },
                  chart;

              data.addColumn( "string", "Issue" );
              data.addColumn( "number", "Occurences" );

              var tmpArr,
                  item;
              for ( var i = 0, l = instances.length; i < l; i++ ) {
                if ( instances[ i ].keywords && instances[ i ].keywords.indexOf( "graph-" ) > -1 ) {
                  tmpArr = instances[ i ].keywords.split( " " );
                  if ( tmpArr.indexOf( "graph-" ) > -1 ) {
                    item = tmpArr[ tmpArr.indexOf( "graph-" ) + 1 ];
                    if ( vals[ item ] ) {
                      vals[ item ]++;
                    } else {
                      vals[ item ] = 1;
                    }
                  }
                }
              }

              for ( var prop in vals ) {
                rows.push([ prop, vals[ prop ] ]);
              }
              data.addRows( rows );

              chart = new google.visualization.BarChart( bar );
              chart.draw( data, options );
            }
          ],
          elems = [ pie, bar ],
          idx = 1;

      var data = new google.visualization.DataTable();
      function intervalFunc() {
        for ( var i = 0, l = elems.length; i < l; i++ ) {
          if ( i === idx ) {
            elems[ i ].classList.remove( "hide" );
            callbacks[ i ]();
          } else {
            elems[ i ].classList.add( "hide" );
          }
        }
        idx++;
        if ( idx > ( elems.length - 1 ) ) {
          idx = 0;
        }
      }

      bar.classList.add( "hide" );
      pie.classList.remove( "hide" );
      clearInterval( inter );
      idx = 1;
      callbacks[ 0 ]();
      inter = setInterval( intervalFunc, 4000);
    }

    google.load('visualization', '1.0', {'packages':['corechart']});
    google.setOnLoadCallback(captionsComplete);

    function checkOccurences( term ) {
      console.log( "ASDASDASD", term );
      var searchItems = term.split( "," );
      console.log( "ITEMS", searchItems );

      for ( var i = 0, l = searchItems.length; i < l; i++ ) {
        for ( var j = 0, jl = instances.length; j < jl; j++ ) {
          if ( instances[ j ].keywords && instances[ j ].keywords.indexOf( searchItems[ i ] ) > -1 ) {
            instances[ j ].element.classList.remove( "hide" );
            instances[ j ].disabled = false;
          } else {
            instances[ j ].element.classList.add( "hide" );
            instances[ j ].disabled = true;
          }
        }
      }
    }

    function parseCaptions( str ) {
      var items = str.split( "\n" ),
          arr= [],
          item,
          done = true,
          obj,
          data = {};

      data.tags = "";
      data.raw = str;

      for ( var i = 0, l = items.length; i < l; i++ ) {
        if ( items[ i ] ) {
          item = items[ i ];
          if ( done ) {
            arr.push({});
            obj = arr[ arr.length - 1 ];
            obj.text = "";
            done = false;
          }

          if ( +item[ 0 ] >= 0 ) {
            obj.start = item.split( "," )[ 0 ];
            obj.end = item.split( "," )[ 1 ];
          } else {
            /*for ( var issue in occurences ) {
              if ( item.indexOf( issue ) > -1 ) {
                if ( data.tags.indexOf( issue ) === -1 ) {
                  data.tags += issue + ",";
                }
                occurences[ issue ]++;
              }
            }*/
            obj.text += item + "\n";
          }
        } else {
          done = true;
        }
      }
      data.data = arr;
      return data;
    }

    document.addEventListener( "DOMContentLoaded", function( e ) {
      var hash = window.location.hash,
          mainVid = document.getElementById( "main_vid" ),
          transcriptContainer = document.getElementById( "transcript" ),
          thumbContainer = document.getElementById( "content_col_right" ),
          arrowContainer = document.getElementById( "arrow_container" ),
          thumbTemplate = document.createElement( "div" ),
          thumbInstance,
          curThumbInstance,
          search = document.getElementById( "lop_search" ),
          searchSubmit = document.getElementById( "lop_submit" ),
          showAll = document.getElementById( "show-all" ),
          logo = document.getElementById( "logo" );

      logo.addEventListener( "click", function( e ) {
        window.location = "http://dcseifried.lop.jit.su/";
      }, false);

      dataPanel = document.getElementById( "data_panel_trigger" );
      keywordElements = document.querySelectorAll( ".search-field" );
      pie = document.getElementById( "pie-graph" );
      bar = document.getElementById( "bar-graph" );
      line = document.getElementById( "line-graph" );

      dataPanel.addEventListener( "click", function() {
        dataPanel.querySelector( "ul" ).style.position = nextPos;
        nextPos = nextPos === "absolute" ? "relative" : "absolute";
        dataPanel.querySelector( "ul" ).style.left = nextLeft;
        nextLeft = nextLeft === "-9999px" ? "0px" : "-9999px";
      }, false);

      showAll.addEventListener( "click", function() {
        for ( var i = 0, l = instances.length; i < l; i++ ) {
          instances[ i ].disabled = false;
          instances[ i ].element.classList.remove( "hide" );
        }
        occurences = {};
        checkOccurences( search.value );
        captionsComplete();
      });

      for ( var i = 0, l = keywordElements.length; i < l; i++ ) {
        (function( elem ) {
          elem.addEventListener( "click", function() {
            for ( var i = 0, l = instances.length; i < l; i++ ) {
              if ( !instances[ i ].keywords || instances[ i ].keywords.toLowerCase().indexOf( elem.innerHTML.toLowerCase() ) === -1 ) {
                instances[ i ].element.classList.add( "hide" );
                instances[ i ].disabled = true;
              } else {
                instances[ i ].element.classList.remove( "hide" );
                instances[ i ].disabled = false;
              }
            }
            occurences = {};
            checkOccurences( elem.innerHTML );
            captionsComplete();
          }, false);
        })( keywordElements[ i ] );
      }

      searchSubmit.addEventListener( "click", function( e ) {
        occurences = {};
        checkOccurences( search.value );
        captionsComplete();
      }, false);
      thumbTemplate.classList.add( "thumbnail" );
      thumbTemplate.appendChild( document.createElement( "div" ) );
      thumbTemplate.appendChild( document.createElement( "div" ) );
      thumbTemplate.children[ 0 ].classList.add( "thumb_vid" );
      thumbTemplate.children[ 0 ].appendChild( document.createElement( "img" ) );
      thumbTemplate.children[ 1 ].appendChild( document.createElement( "strong" ) );
      thumbTemplate.children[ 1 ].appendChild( document.createElement( "p" ) );
      thumbTemplate.children[ 1 ].classList.add( "thumb_desc" );

      if ( hash ) {

          entriesLeft = entries.length - 1;
          for ( var i = 0; i < entries.length; i++ ) {
            entry = entries[ i ];
            title = entry.title.$t;
            if ( i === 0 ) {
              instances.push({
                "url": entry.link[ 0 ].href
              });
              Popcorn.youtube( mainVid, entry.link[ 0 ].href );
            } else {
              instances.push({
                "url": entry.link[ 0 ].href
              });
            }
              thumbInstance = thumbTemplate.cloneNode( true );

              var img = thumbInstance.children[ 0 ].children[ 0 ];
              img.src = entry.media$group.media$thumbnail[ 0 ].url;
              img.style.width = "100%";
              img.style.height = "100%";

              if ( i === 0 ) {
                curThumbInstance = thumbInstance;
                curThumbInstance.classList.add( "current_vid" );
              }

              instances[ instances.length - 1 ].element = thumbInstance;
              thumbInstance.children[ 1 ].children[ 0 ].innerHTML = entry.title.$t;
              (function( url, elem, instance ) {
                elem.addEventListener( "click", function( e ) {
                  curThumbInstance.classList.remove( "current_vid" );
                  curThumbInstance = elem;
                  elem.classList.add( "current_vid" );
                  for ( var i = 0, l = Popcorn.instances.length; i < l; i++ ) {
                    if ( !Popcorn.instances[ i ].isDestroyed ) {
                      Popcorn.instances[ i ].destroy();
                    } else {
                      Popcorn.instances[ i ].div.classList.remove( "current_vid" );
                    }
                  }
                  var p = Popcorn.youtube( mainVid, url );
                  if ( instance.captions ) {
                    for ( var i = 0, l = instance.captions.data.length; i < l; i++ ) {
                      (function( data, p ) {
                        var start = data.start.split( ":" ),
                            end = data.end.split( ":" );

                        p.text({
                          start: start[ 0 ] * ( 60 * 60 ) + start[ 1 ] * ( 60 ) + start[ 2 ],
                          end: end[ 0 ] * ( 60 * 60 ) + end[ 1 ] * ( 60 ) + end[ 2 ],
                          text: data.text,
                          target: "transcript"
                        });
                      })( instance.captions.data[ i ], p );
                    }
                  }
                }, false );
              })( entry.link[ 0 ].href, thumbInstance, instances[ instances.length - 1 ] );
              var items = entry.media$group.media$description.$t.split( " " ),
                  length = items.length;

              if ( length > 10 ) {
                items = items.slice( 0, 10 );
              }

              items = items.join( " " ) + ( length > 10 ? "..." : "" );
              thumbInstance.children[ 1 ].children[ 1 ].innerHTML = items;
              thumbContainer.appendChild( thumbInstance );

            id = entry.link[ 0 ].href.split( "v=" )[ 1 ].split( "&" ) [ 0 ];
            (function( id, idx ) {
              function request( qs, cb ) {
                var xmlhttp = new XMLHttpRequest();
                function change( data  ) {
                  if ( xmlhttp.readyState == 4 && xmlhttp.status === 200 ) {
                    cb && cb( data.srcElement.response );
                  }
                }
                xmlhttp.onreadystatechange = change;
                xmlhttp.open( "POST", "http://dcseifried.lop.jit.su/getcaptions" + qs, true );
                xmlhttp.send( null );
              }

              request( "?data=" + id + "&token=" + hash.split( "&" )[ 0 ].split( "=" )[ 1 ], function( data ) {
                var elem = document.createElement( "XML" );
                elem.innerHTML = "" + data;

                try {
                  request( "?data=" + id + "&token=" + hash.split( "&" )[ 0 ].split( "=" )[ 1 ] + "&caption_id=" + elem.querySelectorAll( "entry" )[ 0 ].querySelector( "id" ).innerHTML.split( "captions:" )[ 1 ], function( data ) {
                    instances[ idx ].captions = parseCaptions( data );
                    entriesLeft--;
                    if ( entriesLeft === 0 ) {
                      getTags();
                    }
                  });
                } catch( e ) {
                  entriesLeft--;
                  if ( entriesLeft === 0 ) {
                    getTags();
                  }
                }
              });
            })( id, instances.length - 1 );
          }
      } else {
        window.location = "https://accounts.google.com/o/oauth2/auth?client_id=228941994459.apps.googleusercontent.com&" +
                          "redirect_uri=http://dcseifried.lop.jit.su/oauth2callback&" +
                          "scope=https://gdata.youtube.com&" +
                          "response_type=token";
      }
    }, false);
  };
})( window );
