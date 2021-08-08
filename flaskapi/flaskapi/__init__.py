from flask import Flask, jsonify, request
import numpy as np
import PIL
from PIL import Image
from keras.models import load_model
import re
from autocorrect import Speller

spell = Speller(lang='en')

app = Flask(__name__)

model = load_model('/var/www/flaskapi/flaskapi/hate_speech_model_v1')

regrex_pattern = re.compile(pattern = "["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                           "]+", flags = re.UNICODE)

@app.route('/predict', methods=["POST"])
def predict_image():
	tweet = request.args['text']
	tweet = sanitize(tweet)

	print("Cleaned: {}".format(tweet))

	pred = model.predict([tweet,])

	digit = np.argmax(pred)
	prediction = {'label':get_label(int(digit))}
	print("Prediction: {}".format(prediction))
	return jsonify(prediction)
	#return jsonify("OK")

def sanitize(tweet):
	tweet = tweet.replace(r'[^\x00-\x7F]+', '')
	tweet = r'{}'.format(tweet.replace('"',"")) # removing double quotes
	tweet = r'{}'.format(tweet.replace('RT ','')) # removing twitter retweet
	tweet = re.sub(r"#(\w+)", ' ', tweet, flags=re.MULTILINE) # removing hashtags
	tweet = re.sub(r"@(\w+):? ?", ' ', tweet, flags=re.MULTILINE) # removing handles
	tweet = regrex_pattern.sub(r'',tweet) # removing emojis
	tweet = re.sub(r'https?:\/\/.*[\r\n]*', '', tweet, flags=re.MULTILINE) # remove all URLs
	tweet = re.sub(r'[-a-zA-Z0–9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0–9@:%_\+.~#?&//=]*)', '', tweet, flags=re.MULTILINE) # to remove other url links         
	tweet = re.sub('[^A-Za-z0-9 ]+', '', tweet) # final clean up to remove all other special characters
	tweet = tweet.strip() # remove leading and trailing whitespace
	tweet = ' '.join(tweet.split()) # replace multiple spaces to one
	tweet = ' '.join([spell(w) for w in tweet.split()])
	return tweet

def get_label(x):
	if x == 0:
		return "hate"
	elif x == 1:
		return "neither"
	elif x == 2:
		return "offensive"
	else:
		return "unknown"

if __name__ == "__main__":
        app.run('0.0.0.0')
