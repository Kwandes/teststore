# Stress and Performance testing with Locust

[Install locust via pip3 ](https://docs.locust.io/en/stable/installation.html)

If you're on Windows, mess around with the path to get the Locust script to be executable from anywhere. [How-to Guide](https://correlated.kayako.com/article/40-running-python-scripts-from-anywhere-under-windows)

Then simply navigate to the [.performance-tests/locust](.performance-tests/locust) and run any of the tests like so:

```sh
locust -f .\api-get-discount.py
```

Open http://localhost:8089/, specify concurrent users and increments, set the host to either http://localhost:3333 for the api or http://localhost:4200 for the frontend, and enjoy cool charts
