// Hate Speech Detection 

function setupUI() {
	$('#root').append(
		"<div class='col-md-8 mx-auto my-auto'>"
			+"<div class='container-fluid' id='main'>"
				+"<div class='jumbotron'>"
					+"<h1 class='display-4'>Hate Speech Detection Demo</h1>"
					+"<h3 class='display-5'>Jed Villanueva</h3>"
					+"<h5 class='display-6'>CMPE-297 Project</h5>"
					+"<p class='lead'>This is a simple application of a text classification model that uses Tensorflow with Keras to identify hateful and offensive speeches in social media applications. </p>"
					+"<hr class='my-4'>"
					+"<h4>To check if a text is hateful or offensive, use the form below.</h4>"
					+"<div id='result_message'></div>"
					+"<div class='form-group'>"
						+"<label for='speech_entry'>Enter text below:</label>"
						+"<textarea class='form-control' id='speech_entry' rows='5'></textarea>"
					+"</div>"
					+"<button type='button' class='btn btn-primary mr-1' onclick='process_speech();'>Submit</button>"
					+"<button type='button' class='btn btn-danger' onclick='clear_textarea();'>Clear</button>"
					+"<hr class='my-4'>"
					+"<h4>Example speeches:</h4>"
					+"<p><span class='text-danger'><b>Hateful</b></span>: <span id='hate'>\"@infidelpamelaLC I'm going to blame the black man, since they always blame \"whitey\" I'm an equal opportunity hater.\"</span>"
						+"<button class='btn' onclick='copy_to_clipboard(\"hate\");'><i class='far fa-copy text-secondary'></i></button></p>"
					+"<p><span class='text-warning'><b>Offensive</b></span>: <span id='offensive'>\"RT @AIanHangover: Be smart because you won't be pretty forever, bitch.\"</span>"
						+"<button class='btn' onclick='copy_to_clipboard(\"offensive\");'><i class='far fa-copy text-secondary'></i></button></p>"
					+"<p><span class='text-success'><b>Neither</b></span>: <span id='neither'>\"@theejustinholt the redskins are doing pretty good this year &#128514;&#128514;\"</span>"
						+"<button class='btn' onclick='copy_to_clipboard(\"neither\");'><i class='far fa-copy text-secondary'></i></button></p>"
				+"</div>"
			+"</div>"
		+"</div>"
	);
}

function clear_textarea() {
	$("#speech_entry").val('');
}

function copy_to_clipboard(speech) {
	console.log(speech);
	switch (speech) {
		case "hate":
			var text = document.getElementById('hate').innerHTML;
			console.log(text);
			document.getElementById('speech_entry').value = text;
			break;
		case "offensive":
			var text = document.getElementById('offensive').innerHTML;
			console.log(text);
			document.getElementById('speech_entry').value = text;
			break;
		case "neither":
			var text = document.getElementById('neither').innerHTML;
			console.log(text);
			document.getElementById('speech_entry').value = text;
			break;
		default:
	}
}

function process_speech() {
	$('.alert').alert('close');
	input_speech = encodeURI($('#speech_entry').val());
	console.log(input_speech);
	$.ajax({
		url: "http://<EXTERNALIP>/predict/predict?text="+input_speech,
		type: 'POST',
		context: "json"
	}).done(function(data) {
		console.log(data);
		if (data.label == "offensive") { 
			show_offensive_alert(); 
		} else if (data.label == "hate") {
			show_hate_alert();
		} else {
			show_neither_alert();
		}
	});
}

function show_hate_alert() {
	$('#result_message').append(
		"<div class='alert alert-danger alert-dismissible fade show' role='alert'>"
			+"<strong>Danger!</strong> What you have just entered is considered hateful! Please reflect on what you have just typed and reconsider your life choices. Would you still like to proceed?"
		+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
			+"<span aria-hidden='true'>&times;</span>"
		+"</button>"
		+"</div>"
	);
}

function show_offensive_alert() {
	$('#result_message').append(
		"<div class='alert alert-warning alert-dismissible fade show' role='alert'>"
			+"<strong>Warning!</strong> What you have just entered is considered offensive! It is only slightly better than being hateful which is still pretty bad. Would you still like to proceed?"
		+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
			+"<span aria-hidden='true'>&times;</span>"
		+"</button>"
		+"</div>"
	);
}

function show_neither_alert() {
	$('#result_message').append(
		"<div class='alert alert-success alert-dismissible fade show' role='alert'>"
			+"<strong>Awesome!</strong> What you have just entered is considered neither hateful nor offensive! You are a very good person and for that, I will submit your entry without any confirmations."
		+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
			+"<span aria-hidden='true'>&times;</span>"
		+"</button>"
		+"</div>"
	);
}

