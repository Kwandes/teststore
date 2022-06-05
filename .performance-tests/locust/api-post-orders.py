import time
from locust import HttpUser, task, constant

class QuickstartUser(HttpUser):
    # Wait 1 second between each request of the given user
    wait_time = constant(1)

    @task
    def hello_world(self):
        self.client.post("/api/orders", json={
    "email": "example@example.com",
    "items": [1,2,3],
    "total": 10.13,
    "subtotal": 666665.99,
    "deliveryType": "home_delivery",
    "discountId": "78c0a432-59f8-4a6c-b89d-57030a6628d9"
})
