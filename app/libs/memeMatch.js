function memeMatch(tags, probability, memes) {

  var tagList = [];
  var probList = [];
  tags.forEach(function(tag, index) {
    tagList.push(tag);
    probList.push(probability[index]);
  });

  var topMemes = [];
  memes.forEach(function(meme) {
    var memeSimilarity = 0;
    meme.tags.forEach(function(tag, index) {
      // console.log(tag);
        if (tagList.indexOf(tag) != -1) {
          console.log(tag.Class);
          memeSimilarity += (100 / Math.abs(probList[index] - tag.prob));
        }
    });
    console.log(memeSimilarity);
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