# CMPE-297 Special Topics Project

This is the application part of my project. I exported my trained model from Colab and built a simple web API using Python Flask and Apache to make the API accessible on port 80. The main code for the application is in the "html" directory which is mainly built using jQuery and Bootstrap.

Install the following:
with APT
python3-dev
python3-pip
pkg-config
net-tools

with PIP
numpy
pillow
autocorrect
tensorflow

NOTES:
GCP Compute instance provides two IPs. One INTERNAL and one EXTERNAL.
Follow the instructions with those addresses.

Setup Notes:
1. Enable Proxy and Proxy_http on Apache2

```
  ProxyPass /predict/ http://INTERNAL_IP:5000/
  ProxyPassReverse /predict/ http://INTERNAL_IP:5000/
```

2. Change in ui.js the IP address to the EXTERNAL IP 
```
        $.ajax({
                url: "http://34.72.49.90/predict/predict?text="+input_speech,
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
```

3. Run Flask app with '0.0.0.0'. This will run the app with the INTERNAL IP not localhost/127.0.0.1.

```app.run('0.0.0.0') ```

4. Change /etc/hosts

```INTERNAL_IP localhost```

5. Add account user and copy toxic-speech.service to /etc/systemd/system
6. ```sudo systemctl daemon-reload; sudo systemctl start toxic-speech; sudo systemctl status toxic-speech```
