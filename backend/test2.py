import requests

base_url = "https://my-backend-1-s57s.onrender.com"
paths = [
    "/webhooks/flutterwave",
    "/api/webhooks/flutterwave", 
    "/webhook/flutterwave",
]

for path in paths:
    url = base_url + path
    try:
        resp = requests.post(url, json={"test": True}, timeout=5)
        print(f"✅ {path} -> {resp.status_code}")
    except Exception as e:
        print(f"❌ {path} -> {str(e)[:50]}")