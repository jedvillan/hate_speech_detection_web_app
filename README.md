# CMPE-297 Special Topics Project

This is the application part of my project. I exported my trained model from Colab and built a simple web API using Python Flask and Apache to make the API accessible on port 80. The main code for the application is in the "html" directory which is mainly built using jQuery and Bootstrap.

Setup Notes:
1. Enable Proxy and Proxy_http on Apache2
  ProxyPass /predict/ http://<local IP>:5000/
  ProxyPassReverse /predict/ http://<local IP>:5000/
  
2. Run the flask app with '0.0.0.0'. This will run the app with the local IP not localhost/127.0.0.1.
3. Change /etc/hosts -> "<local IP> localhost"
