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
  var topMemes = [];
  memes.forEach(function(meme) {
    var memeSimilarity = 0;
    meme.tags.forEach(function(tag) {
        if (checkValue(tag.tag)) {
          //
          memeSimilarity += (100 / Math.abs(probHash[tag.Class] - tag.prob));
        }
    });
    topMemes.push(memeSimilarity);
  });
  topMemes.sort(function(a, b) {
    if (a > b) {
      return 1;
    } else if (a == b) {
      return 0;
    } else {
      return -1;
    }
  });
  return topMemes;
}

module.exports = memeMatch;