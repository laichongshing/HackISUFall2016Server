//In larger apps this can be separated into multiple modules
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var sentencer = require('sentencer');
var Clarifai = require('clarifai');
var Meme = mongoose.model('Meme');
var Tag = mongoose.model('Tag');
var memeMatch = require('memes');

//REST routes
router.get('/api/captions', function(req, res, next) {
    res.send(sentencer.make("This test contains {{ a_noun }} and {{ an_adjective }} {{ noun }} in it."));
});

router.get('/api/dank/addMemes', function(req, res, next) {
    var memes = [
        {url : 'https://imgflip.com/s/meme/Aaaaand-Its-Gone.jpg', bottomText: "Aaaaaaand it's gone", topText: ''},
        {url : 'http://i1.kym-cdn.com/entries/icons/original/000/010/856/4fcdf2e118613355b500ba5d.jpg', bottomText: '', topText: 'Am I the only one'},
        {url : 'https://imgflip.com/s/meme/Ancient-Aliens.jpg', bottomText: 'Aliens', topText: ''},
        {url : 'https://cdn.meme.am/images/5959710.jpg', bottomText: '', topText: 'Why the fuck'},
        {url : 'https://imgflip.com/s/meme/Back-In-My-Day.jpg', bottomText: '', topText: 'https://imgflip.com/s/meme/Back-In-My-Day.jpg'},
        {url : 'https://imgflip.com/s/meme/Brace-Yourselves-X-is-Coming.jpg', bottomText: '', topText: 'Brace yourself'},
        {url : 'http://img.thedailywtf.com/images/remy/foreveralone.jpg', bottomText: 'Forever Alone', topText: ''},
        {url : 'http://i1.kym-cdn.com/entries/icons/original/000/011/495/jonah.jpg', bottomText: 'Fuck me, right?', topText: ''},
        {url : 'https://thenursingera.files.wordpress.com/2015/04/grindsmygears.png', bottomText: '', topText: 'you know what grinds my gears?'},
        {url : 'https://imgflip.com/s/meme/I-Should-Buy-A-Boat-Cat.jpg', bottomText: 'I should buy a boat', topText: ''},
        {url : 'https://imgflip.com/s/meme/One-Does-Not-Simply.jpg', bottomText: '', topText: 'One does not simply'},
        {url : 'https://i.ytimg.com/vi/JQCP85FngzE/maxresdefault.jpg', bottomText: 'Shut up and take my money', topText: ''},
        {url : 'https://memecrunch.com/meme/192B5/pepperidge-farm-remembers/image.png?w=448&c=1', bottomText: 'Pepperidge farm remembers', topText: ''},
        {url : 'http://img.pandawhale.com/post-37840-Flanders-meme-not-sure-if-didd-yA5B.jpeg', bottomText: 'Or Ding-Dang doodily', topText: 'Not sure if diddily'},
        {url : 'https://imgflip.com/s/meme/Too-Damn-High.jpg', bottomText: 'Is too damn high', topText: ''},
        {url : 'https://pbs.twimg.com/profile_images/2615957657/image.jpg', bottomText: '', topText: "I'll have you know"},
        {url : 'http://img.pandawhale.com/80615-Robin-Williams-what-year-is-it-OWzf.jpeg', bottomText: 'What year is it?', topText: ''},
        {url : 'http://vignette2.wikia.nocookie.net/mysims/images/2/2d/YUNO.png/revision/latest?cb=20111207025749', bottomText: '', topText: 'Y u no?'},
        {url : 'https://blog.hipchat.com/wp-content/uploads/2015/02/Bill-Thatd-be-great-300x168.png', bottomText: "Yeah that'd be great", topText: ''},
        {url : 'http://orig05.deviantart.net/11d4/f/2012/220/5/e/xzibit_yo_dawg_render_by_kernelpanicx-d5aa710.png', bottomText: 'Yo dawg', topText: ''},
        {url : 'https://memecrunch.com/image/4f8c4bf718613332e000680b.jpg?w=400', bottomText: "You're gonna have a bad time ", topText: ''},
        {url : 'http://i0.kym-cdn.com/photos/images/newsfeed/000/173/576/Wat8.jpg?1315930535', bottomText: 'Wat', topText: ''}
    ];

    for(var i = 0; i < memes.length; i++) {
        Clarifai.getTagsByUrl(memes[i].url).then(
            function success(res) {
                var meme = new Meme();
                meme.topText = memes[i].topText;
                meme.bottomText = memes[i].bottomText;
                for(var j = 0; j < res.results.result.tag.classes.length; i++) {
                    var tag = new Tag();
                    tag.Class = res.results.result.tag.classes[j];
                    tag.prob = res.results.result.tag.probs[j];
                    meme.tags.push(tag);
                }
                meme.save(function(err) {
                   if(err) {
                       return next(err);
                   }
                });
            },
            function error(err) {
                console.log(err);
                return next(err);
            }
        );
    }
});

module.exports = router;
