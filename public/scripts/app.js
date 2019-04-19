$(document).ready(function() {
  console.log('DOM Content Loaded');

    $("#composeTweet").click(function() {
    $(".new-tweet").slideToggle("slow")
    });

  function renderTweets(data) {
    data[0].tweets.forEach( (tweet) => {
      $('#tweets-container').prepend(createTweetElement(tweet));
    })
  }

  function createTweetElement(tweetData) {
    const tweet = tweetData.content.text;
    const name = tweetData.user.name;
    const avatarsImg = tweetData.user.avatars.small;
    const tweeHandle = tweetData.user.handle;

    const $createAvatar = $('<img>').addClass("avatar").attr("src",avatarsImg);
    const $createName = $('<div>').addClass("tweeterName").text(name);
    const $createTweet = $('<div>').addClass("tweeBody").text(tweet);
    const $createHandle = $('<p>').addClass("userTwee").text(tweeHandle);

    const $iconContainer = $('<div class="icons"></div>');
    const $flag = $('<i class="fas fa-flag"></i>');
    const $retweet = $('<i class="fas fa-retweet"></i>');
    const $heart = $('<i class="fas fa-heart"></i>');

    const tweets = $('<article class="tweets">').append($createAvatar).append($createName).append($createHandle).append($createTweet);
    return tweets
  }
  //renderTweets(data);

    $('#incomingTweet').submit( function () {
      var $button = $("#submitTweet");
      event.preventDefault();
      console.log("Button clicked");

      if(!$('textarea', this).val()){
       $(".error").slideDown("slow");
       $('#specific-message').text('Empty input');
      };

      if($('textarea', this).val().length > 140){
        $(".error").slideDown("slow");
      $('#specific-message').text('Too many characters')
      };

      if(($('textarea', this).val()) && ($('textarea', this).val().length < 140)){
      $(".error").slideUp("slow");
      let text =$(this).serialize();

          $.ajax({
          type: "POST",
          url: '/tweets',
          data: text,
          }).done(function(response){
          loadTweets();
          })

      }
    })
      function loadTweets () {
        $.ajax({
          type: 'GET',
          url: "/tweets",
          dataType: 'JSON'
        })
        .done( data => {
          console.log(data);
            renderTweets(data)
        })
      }
    loadTweets()
});
