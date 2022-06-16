import * as React from "react"
import TweetInput from "./TweetInput"
import "./TweetBox.css"

export default function TweetBox({userProfile,setTweets,tweets, tweetText="", setTweetText}) {

  const handleOnTweetTextChange = (evt) => {
    // call settweettext with the new value of the textarea element
    setTweetText(evt.target.value)
  }
  const charactersCount = 140 - tweetText.length;
  // disable the button when user hasn't entered any text or 
  // they have more than 140 characters in their tweet
  const disable = tweetText.length === 0 || tweetText.length > 140;

  const handleOnSubmit = () => {
    // create a new object and store it in a variable named newtweet
    const newTweet = {
      name: userProfile.name,
      handle: userProfile.handle,
      text: tweetText,
      comments: 0,
      retweets: 0,
      likes: 0,
      // id: tweets.length
    }
    // call the setTweets function and update the tweets state array
    // to include the new tweet
    setTweets(tweets => [...tweets,{...newTweet, id:tweets.length }]);
    // reset the tweet text state variable to an empty
    setTweetText("")
  }
  return (
    <div className="tweet-box">
      <TweetInput value={tweetText} handleOnChange={handleOnTweetTextChange}/>

      <div className="tweet-box-footer">
        <TweetBoxIcons />
        <TweetCharacterCount tweetText={tweetText} charactersCount={charactersCount}/>
        <TweetSubmitButton disable = {disable} handleOnSubmit={handleOnSubmit}/>
      </div>
    </div>
  )
}

export function TweetBoxIcons() {
  return (
    <div className="tweet-box-icons">
      <i className="fas fa-image"></i>
      <i className="icon-gif">GIF</i>
      <i className="far fa-chart-bar"></i>
      <i className="fas fa-map-marker-alt"></i>
    </div>
  )
}

export function TweetCharacterCount(props) {
  // ADD CODE HERE
  if (props.tweetText.length > 140) {
    return <span className = "tweet-length red">{140 - props.tweetText.length}</span>
  } else if (props.tweetText.length === 0) {
    return <span className = "tweet-length "></span>
  }
  else {
    return <span className = "tweet-length">{140 - props.tweetText.length}</span>
  } 
  
}

export function TweetSubmitButton({handleOnSubmit, disable}) {
  return (
    <div className="tweet-submit">
      <i className="fas fa-plus-circle"></i>
      <button className="tweet-submit-button" disabled = {disable} onClick={handleOnSubmit}>Tweet</button>
    </div>
  )
}
