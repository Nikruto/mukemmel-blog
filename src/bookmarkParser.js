const getBookmarkArray = () => {
  let bookmarkKey = localStorage.getItem('Bookmarks');
  if (!bookmarkKey) {
    localStorage.setItem('Bookmarks', '');
    bookmarkKey = '';
  }
  let bmArray = bookmarkKey !== '' ? bookmarkKey.split('|') : [];
  return bmArray;
};

const isBookmarked = name => {
  let bmArray = getBookmarkArray();
  if (!bmArray) return false;
  return bmArray.includes(name);
};

const removeBookmark = name => {
  let bmArray = getBookmarkArray();
  if (bmArray && bmArray.includes(name)) {
    bmArray = bmArray.filter(bm => bm != name);

    localStorage.setItem('Bookmarks', bmArray.join('|'));
  }
};

const addBookmark = name => {
  let bmArray = getBookmarkArray();
  if (bmArray && !bmArray.includes(name)) {
    bmArray.push(name);
    localStorage.setItem('Bookmarks', bmArray.join('|'));
  }
};

module.exports = {
  getBookmarkArray,
  isBookmarked,
  addBookmark,
  removeBookmark
};
