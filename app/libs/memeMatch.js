function memeMatch(tags, probability, memes) {

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
          memeSimilarity += (100 / Math.abs(probHash[tag.Class] - tag.prob));
        }
    });
    if (memeSimilarity > relationVal) {
      relationVal = memeSimilarity;
      similarMeme = meme;
    }
  });
  if (Object.keys(similarMeme).length === 0 && similarMeme.constructor === Object) {
    similarMeme = memes[Math.floor(Math.random() * meme.length)];
  }
  return similarMeme;
}

module.exports = memeMatch;