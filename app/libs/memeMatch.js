function memeMatch(tags, probability) {
//  db.getmemeinfo
  var memes = [];
  var tagHash = {};
  var probHash = {};
  tags.forEach(function(tag, index) {
    tagHash.tags = true;
    probHash.tag = probability[index];
  });

  var checkValue = function(tag) {
    return tagHash[tag] === true;
  };
  var relationVal = 0;
  var similarMeme = {};
  memes.forEach(function(meme) {
    var memeSimilarity = 0;
    meme.tags.forEach(function(tag) {
        if (checkValue(tag.tag)) {
          //
          memeSimilarity += (100 / Math.abs(probHash[tag.tag] - tag.probability));
        }
    });
    if (memeSimilarity > relationVal) {
      relationVal = memeSimilarity;
      similarMeme = meme;
    }
  });
  return similarMeme;
}

module.exports = memeMatch;