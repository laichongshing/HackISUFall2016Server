function memeMatch(tags, probability, memes) {

  var tagHash = {};
  var probHash = {};
  tags.forEach(function(tag, index) {
    tagHash.tag = true;
    probHash.tag = probability[index];
  });

  var checkValue = function(tag, tagHash) {
    return tagHash.tag === true;
  };
  var topMemes = [];
  memes.forEach(function(meme) {
    var memeSimilarity = 0;
    meme.tags.forEach(function(tag) {
        if (checkValue(tag.Class, tagHash)) {
          memeSimilarity += (100 / Math.abs(probHash[tag.Class] - tag.prob));
        }
    });
    topMemes.push({meme: meme, memeSimilarity : memeSimilarity});
  });
  topMemes.sort(function(a, b) {
    if (a.memeSimilarity > b.memeSimilarity) {
      return 1;
    } else if (a.memeSimilarity == b.memeSimilarity) {
      return 0;
    } else {
      return -1;
    }
  });
  return topMemes.map(function(meme) {
      return meme.meme;
  });
}

module.exports = memeMatch;