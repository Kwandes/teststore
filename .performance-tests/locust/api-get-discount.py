import time
from locust import HttpUser, task, constant

class QuickstartUser(HttpUser):
    # Wait 1 second between each request of the given user
    wait_time = constant(1)

    @task
    def hello_world(self):
        self.client.get("/api/discounts/discount-100")
