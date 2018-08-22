# Clarifai Not Hotdog

"Machine learning" is one of the most popular buzz-words floating around in the tech world right now.  With wide-ranging applications including computer vision, robotics, speech and image recognition, machine learning is creeping into almost every industry. And with [major strides](https://deepmind.com/blog/alphago-zero-learning-scratch/) being made in areas like reinforcement learning and neural networks, that trend is only expected to continue.

However, as both a current student and practitioner of machine learning I've noticed that for many novice data scientists like myself, there can be a gap between performing Kaggle-style ML experiments in a Python Jupyter Notebook, and converting those to production-ready machine learning services that individuals or organizations can use to make data-driven decisions. Furthermore, it is not just the data scientists that face this challenge: often companies will invest massive resources into hiring data scientists and building machine learning models, and yet will fail to productionize the work in order to create real business value.

### Machine Learning with Clarifai

So with everything in context, this post is intended to serve as an introduction for how to productionize a basic machine learning microservice. As a nod to the infamous Not Hotdog application built by Jian-Yang on HBO's Silicon Valley, I'm going to walk through how to build a simple version of a Not Hotdog web app using Clarifai's image recognition API, Tornado Web Server, and a client interface with AngularJS. By the end of the article we'll have an app that allows you to submit an image URL, and it will predict whether the image contains either "Hotdog!" or "Not hotdog!" along with a confidence percentage.

Prerequisites for this tutorial are installed versions of Python3 and Node Package Manager. If you'd like to skip straight to the code, you can check out the project's [Github repository](https://github.com/basilvetas/clarifai-not-hotdog).

To start, create a new directory for the project:
```bash
mkdir clarifai-not-hotdog
cd clarifai-not-hotdog
```

You'll also need to get an API Key from Clarifai by [signing up](https://clarifai.com/developer/) on their developer page. Save your API Key in a file called key.txt. Next, install the client server globally:
```bash
npm install -g http-server
```

To retrieve image URLs to use as training data and save them in a file called hotdogs.txt, you can run the following command in your terminal:
```bash
curl https://www.flickr.com/search/?text=%22hot%20dog%22%20food | grep -o "img.src='[^']*'" | grep -o "'[^']*'" | sed "s/'//g" | perl -ne 'print "https:$_"' | sort -u > ./hotdogs.txt
```

### Building the Server

Next, let's create the server. Make a file called hotdog.py and copy in the following code:

```python
from clarifai import rest
from clarifai.rest import ClarifaiApp
from tornado.web import Application
from tornado.web import RequestHandler
from tornado.ioloop import IOLoop

class ModelHandler(RequestHandler):
	def initialize(self, app):
		self.app = app

	def set_default_headers(self):
		super(ModelHandler, self).set_default_headers()
		self.set_header('Access-Control-Allow-Origin', 'http://localhost:8080')
		self.set_header('Access-Control-Allow-Credentials', 'true')

	def post(self):
		self.set_header("Content-Type", "text/plain")
		url = self.get_body_argument('url')
		prediction = predictImage(self.app, url)
		label = lambda p: "Hotdog!" if p > .5 else "Not hotdog!"
		p = prediction['outputs'][0]['data']['concepts'][0]['value']
		print("Prediction: ", label(p), str(round(p*100, 2)) + "%")
		self.write(prediction)

def clearApp(app):
	app.inputs.delete_all()
	app.models.delete_all()
	return app

def trainModel(app):
	print("Training Model...") # train model
	file = open("hotdogs.txt")
	lines = file.readlines()

	for i, line in enumerate(lines):
		url = line.strip()
		app.inputs.create_image_from_url(url, image_id="id" + str(i), concepts=["hot dog"])

	model = app.models.create("hotdogs", concepts=["hot dog"])
	model = model.train()
	return app

def predictImage(app, url):
	print("Predicting Image...")
	model = app.models.get("hotdogs")
	pred = model.predict_by_url(url=url)
	return pred

def makeApp():
	app = ClarifaiApp(api_key=open("key.txt").read())
	app = clearApp(app)
	app = trainModel(app)
	print("Model Trained Successfully")
	return Application([
		(r"/predict/", ModelHandler, dict(app = app)),
	])

if __name__ == '__main__':
	app = makeApp()
	app.listen(7777)
	IOLoop.current().start()
```

Basically what we have in the code above is a Tornado web server running on port 7777 that exposes the endpoint "/predict/" and this endpoint is managed by the ModelHandler class, which contains logic for what to do when a POST request is made to the endpoint. When a POST is made to "/predict/" with an image URL, the "predictImage" function will be called which uses our trained Clarifai model to determine if the URL contains a hotdog. Model training occurs when the server is first started, when the "makeApp" function calls the "trainModel" function, which uses our images from hotdogs.txt to train a new image classification model using the Clarifai API. You can start the server simply by running the command:
```bash
python3 hotdog.py
```
### Building the Client

Now for the last step, we will create a simple client application with AngularJS that will allow us to interact with the server and submit images. Start by creating a file called index.html in the same directory as your other files. Then copy in the code below:

```html
<!DOCTYPE html>
<html lang="en" ng-app="hotdog">
	<head>
		<meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
	  <title>Hotdog or Not hotdog?</title>
	  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
	  <script>
	  	var app = angular.module('hotdog', []);
			app.controller('HotdogCtrl', ['$scope', '$http', '$httpParamSerializerJQLike',
			function HotdogCtrl($scope, $http, $httpParamSerializerJQLike) {
			  $scope.predict = function(url) {
			  	var req = {
					 method: 'POST',
					 url: 'http://localhost:7777/predict/',
					 headers: {
			      	'Content-Type': 'application/x-www-form-urlencoded',
			      	'Accept': 'application/json'
			    	},
					 data: $httpParamSerializerJQLike({url: url}),
					};
			  	$http(req).then(function(success) {
			  		var p = success.data.outputs[0].data.concepts[0].value
			  		$scope.prediction = ((p > 0.5) ? "Hotdog!" : "Not hotdog!");
			  		$scope.confidence = Math.round(p * 10000) / 100 + "%"
					}, function(failure) {});
			  }
			}]);
	  </script>
	  <link rel = "stylesheet" type = "text/css" href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
		<style type="text/css">
			body { padding: 50px 50px; text-align: center; }
			img {max-width: 50%}
		</style>
	</head>
	<body ng-controller="HotdogCtrl">
		<div class="col-md-12">
			<h1>Hotdog or Not Hotdog?</h1><h3>Enter image URL below:</h3>
			<form>
				<input type="text" ng-model="url" />
				<input type="submit" ng-click="predict(url)"/>
			</form>
		  <h3 ng-if="prediction">{{prediction}} <br />{{confidence}}</h3>
		  <div ng-if="prediction" class="row"><img ng-src="{{url}}" /></div>
		</div>
	</body>
</html>
```

In this file, we have a single-page AngularJS app that contains in the body element a simple form for submitting an image URL. When the form is submitted, this will execute the "predict" function in our Angular controller, which makes a POST request to the server we just wrote at http://localhost:7777/predict/ with the image URL as the body of the POST. A promise is used to asynchronously get the server response; once received we simply format the correct display as either "Hotdog!"" or "Not hotdog!" based on the prediction confidence, which is then shown on the main view. To start the client application, simply run:
```bash
http-server
```

To wrap up, you should now have a folder containing four files: key.txt, hotdogs.txt, hotdog.py and index.html. Try running both the client and server in two different terminal windows, and find some new hotdog images to test how well your model performs. And while enterprise-scale machine learning quickly becomes orders of magnitude more complex than this simple example, for the novice data scientist I hope the tutorial helps shed light on some foundational concepts for productionizing a machine learning service. If you'd like to go further and see how HBO's Silicon Valley built the real Not Hotdog app, check out this [awesome article](https://medium.com/@timanglade/how-hbos-silicon-valley-built-not-hotdog-with-mobile-tensorflow-keras-react-native-ef03260747f3)
