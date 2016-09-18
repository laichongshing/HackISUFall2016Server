//In larger apps this can be separated into multiple modules
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Sentencer = require('sentencer');
var Clarifai = require('clarifai');
var Meme = mongoose.model('Meme');
var Tag = mongoose.model('Tag');
var memeMatch = require('./libs/memeMatch');

Clarifai.initialize({
    'clientId': '4WNkAKGSNyXZDCW0mYep4OUBKX1nKIEEvWSqP-4_',
    'clientSecret': 'ROlSYiTX_cTqW-lW2x7Tq7_Fq1OB2QboUKjlLtE7'
});

//REST routes
router.post('/api/captions', function(req, res, next) {
    // res.send(sentencer.make("This test contains {{ a_noun }} and {{ an_adjective }} {{ noun }} in it."));
    if(!req.body) {
        return res.status(400).json({message: 'Please fill stuff'});
    }

    Meme.find({}, function(err, results) {
        if(err){
            console.log(err);
        }
        console.log(results);
        var memes = memeMatch(req.body.result.tag.classes, req.body.result.tag.probs, results);

        Sentencer.configure({
            nounList: req.body.result.tag.classes,
            actions: {
                verb: function(){
                    var verbs = [

                    ];
                    return verbs[Math.random() * (verbs.length)];
                }
            }
        });

        var captions = [];
        for(var i = 0; i < 3; i++) {
            for(var j = 0; j < 5; j++) {
                var topText = Sentencer.make(memes[i].topText);
                var bottomText = Sentencer.make(memes[i].bottomText);
                captions.push({topText: topText, bottomText: bottomText});
            }
        }
        res.json(captions);
    });
});

router.get('/api/dank/addMemes', function(req, res, next) {
    var memes = [
        {url : 'https://imgflip.com/s/meme/Aaaaand-Its-Gone.jpg', bottomText: "Aaaaaaand it's gone", topText: '{{adjective}} {{noun}}'},
        {url : 'http://i1.kym-cdn.com/entries/icons/original/000/010/856/4fcdf2e118613355b500ba5d.jpg', bottomText: 'Who is a {{adjective}} {{noun}}', topText: 'Am I the only one'},
        {url : 'https://imgflip.com/s/meme/Ancient-Aliens.jpg', bottomText: 'Aliens', topText: '{{nouns}} and {{nouns}}'},
        {url : 'https://cdn.meme.am/images/5959710.jpg', bottomText: 'is {{noun}} a thing', topText: 'Why the fuck'},
        {url : 'https://imgflip.com/s/meme/Back-In-My-Day.jpg', bottomText: 'a{{noun}} was a {{noun}}', topText: 'Back in my day'},
        {url : 'https://imgflip.com/s/meme/Brace-Yourselves-X-is-Coming.jpg', bottomText: '{{adjective}} {{noun}} is coming', topText: 'Brace yourself'},
        {url : 'http://img.thedailywtf.com/images/remy/foreveralone.jpg', bottomText: 'Forever Alone', topText: '{{adjective}} {{noun}}'},
        {url : 'http://i1.kym-cdn.com/entries/icons/original/000/011/495/jonah.jpg', bottomText: 'Fuck me, right?', topText: '{{adjective}} {{noun}} and {{adjective}} {{noun}}'},
        {url : 'https://thenursingera.files.wordpress.com/2015/04/grindsmygears.png', bottomText: '{{adjective}} {{nouns}}', topText: 'you know what grinds my gears?'},
        {url : 'https://imgflip.com/s/meme/I-Should-Buy-A-Boat-Cat.jpg', bottomText: 'I should buy a boat', topText: '{{adjective}} {{noun}}'},
        {url : 'https://imgflip.com/s/meme/One-Does-Not-Simply.jpg', bottomText: 'Creates dank memes with {{a_noun}}', topText: 'One does not simply'},
        {url : 'https://i.ytimg.com/vi/JQCP85FngzE/maxresdefault.jpg', bottomText: 'take my money', topText: 'shut up and'},
        {url : 'https://memecrunch.com/meme/192B5/pepperidge-farm-remembers/image.png?w=448&c=1', bottomText: 'Pepperidge farm remembers', topText: '{{adjective}} {{nouns}}'},
        {url : 'http://img.pandawhale.com/post-37840-Flanders-meme-not-sure-if-didd-yA5B.jpeg', bottomText: 'Or Ding-Dang doodily', topText: 'Not sure if diddily'},
        {url : 'https://imgflip.com/s/meme/Too-Damn-High.jpg', bottomText: 'Is too damn high', topText: '{{adjective}} {{noun}}'},
        {url : 'https://pbs.twimg.com/profile_images/2615957657/image.jpg', bottomText: 'I once cried about {{adjective}} {{nouns}} for 30 mins', topText: "I'll have you know"},
        {url : 'http://img.pandawhale.com/80615-Robin-Williams-what-year-is-it-OWzf.jpeg', bottomText: 'What year is it?', topText: '{{adjective}} {{nouns}} and {{adjective}} {{nouns}}'},
        {url : 'http://vignette2.wikia.nocookie.net/mysims/images/2/2d/YUNO.png/revision/latest?cb=20111207025749', bottomText: 'make more memes', topText: 'Y u no?'},
        // {url : 'https://blog.hipchat.com/wp-content/uploads/2015/02/Bill-Thatd-be-great-300x168.png', bottomText: "Yeah that'd be great", topText: ''},
        {url : 'http://orig05.deviantart.net/11d4/f/2012/220/5/e/xzibit_yo_dawg_render_by_kernelpanicx-d5aa710.png', bottomText: 'Yo dawg', topText: ''},
        {url : 'https://memecrunch.com/image/4f8c4bf718613332e000680b.jpg?w=400', bottomText: "You're gonna have a bad time ", topText: 'underestimate {{adjective}} {{nouns}}'},
        {url : 'http://i0.kym-cdn.com/photos/images/newsfeed/000/173/576/Wat8.jpg?1315930535', bottomText: 'Wat', topText: ''}
    ];

    memes.forEach(function(meme) {
        Clarifai.getTagsByUrl(meme.url).then(
            function success(res) {
                var newMeme = new Meme();
                newMeme.topText = meme.topText;
                newMeme.bottomText = meme.bottomText;
                for(var i = 0; i < res.results[0].result.tag.classes.length; i++) {
                    var tag = new Tag({Class: res.results[0].result.tag.classes[i], prob:  res.results[0].result.tag.probs[i], meme: newMeme});
                    tag.save(function(err) {
                        if(err) {
                            console.log(err);
                            return next(err);
                        }
                    });
                    newMeme.tags.push(tag);
                }
                newMeme.save(function(err) {
                   if(err) {
                       console.log(err);
                       return next(err);
                   }
                });
            },
            function error(err) {
                console.log(err);
                return next(err);
            }
        );
    });

    res.json('Success');
});

router.get('/api/test', function(req, res, next) {
    Meme.find({}, function (err, results) {
        if (err) {
            console.log(err);
        }
        res.json(results);
    });
});

module.exports = router;
