//Listen for form submit


document.getElementById('myForm').addEventListener('submit', saveBookmark);

  function saveBookmark(e){
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    var bookmark = {
      name: siteName,
      url: siteURL
    }

    /*
      //Local storage
      localStorage.setItem('test', "Hello world");
      console.log(localStorage.getItem('test'));
      localStorage.removeItem('test')
      console.log(localStorage.getItem('test'));
    */
    if (localStorage.getItem('bookmarks') === null){
      //If there is no bookmark init an array.
      var bookmarks = []
      bookmarks.push(bookmark)
      //Set bookmarks to local storage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    } else{ //Get bookmarks from localStorage
      var bookmarks = JSON.parse(localStorage.getItem('bookmarks',))
      //Add bookmark to array
      bookmarks.push(bookmark)
      //Re-set to localStorage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
    fetchBookmarks()


    //Grab bookmarks from local storage for use in the UI
};

    function deleteBookmark(url){
      var bookmarks = JSON.parse(localStorage.getItem('bookmarks',))
      for(var i=0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
          //remove from array
          bookmarks.splice(i, 1)
        }
      }
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

      fetchBookmarks()
    }
    //Grab bookmarks from local storage for use in the UI
    function fetchBookmarks(){ //Get bookmarks from local storage, Get the output ID, then build the output and append the results to the output shell
      var bookmarks = JSON.parse(localStorage.getItem('bookmarks',))

      var bookmarksResults = document.getElementById('bookmarksResults')

      bookmarksResults.innerHTML = ""
      for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResults.innerHTML += '<div class="well">' +
                                                              '<h3>' + name +
                                                              '  <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>' +
                                                              '  <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'
                                                              '</h3>' +
                                                              '</div>'

      }
    }
