$(document).ready(function() {
  console.log('DOM Content Loaded');

    $("#composeTweet").click(function() {
    $(".new-tweet").slideToggle("slow")
    $(".textArea").focus();
    });

  function renderTweets(data) {
    $('#tweets-container').empty();
    data.forEach( (tweet) => {
      console.log("Here is my tweet",tweet);
      $('#tweets-container').prepend(createTweetElement(tweet));
    })
  }

  function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
      return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
      return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
      return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
      return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
      return interval + " minutes ago";
  }
  return Math.floor(seconds + 1) + " seconds ago";
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

    const $iconContainer = $("<div>").addClass("icons");
    const $flag = $("<i>").addClass("fas fa-flag");
    const $retweet = $("<i>").addClass("fas fa-retweet");
    const $heart = $("<i>").addClass("fas fa-heart");

    const $tweetData = $("<article>").addClass("tweet");
    const $header = $("<header>");
    const $footer = $("<footer>");
    const $content = $("<div>").addClass("content");
    const $dateOfTweet = $("<h6>").text(timeSince(tweetData['created_at']));

    $iconContainer.append($flag, $retweet, $heart);
    $header.append($createAvatar, $createName, $createHandle);
    $content.append($createTweet);
    $footer.append($iconContainer, $dateOfTweet);
    $tweetData.append($header, $content, $footer);


    return $tweetData;
  }
  //renderTweets(data);

    $('#incomingTweet').submit( function () {
      var $button = $("#submitTweet");
      event.preventDefault();
      console.log("Button clicked");

      if(!$('textarea', this).val()){
       $(".error").slideDown("slow");
       $('#specific-message').text('Error : Empty input');
      };

      if($('textarea', this).val().length > 140){
        $(".error").slideDown("slow");
      $('#specific-message').text('Error : Too many characters')
      };

      if(($('textarea', this).val()) && ($('textarea', this).val().length < 140)){
      $(".error").slideUp("slow");
      let text =$(this).serialize();

          $.ajax({
          type: "POST",
          url: '/tweets',
          data: text,
          }).done(function(response){
            console.log("Tweets are reloading", response);
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
