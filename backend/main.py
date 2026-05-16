from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from routers import orders, webhooks

# Instantiate high-performance core app engine
app = FastAPI(
    title="Core Secure Commerce Order API", 
    version="2026.1.0",
    description="Production-ready asynchronous checkout interface managing Supabase & Flutterwave integrations."
)

# Configure Cross-Origin Resource Sharing (CORS) policies so Flutter/Web clients can interact freely
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In strict production setups, specify explicit production UI domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route Declarations Mounting Structure
app.include_router(orders.router)
app.include_router(webhooks.router)

@app.get("/", tags=["Health Verification Check"])
async def server_health_check():
    return {"status": "online", "engine": "FastAPI ASGI Architecture"}

if __name__ == "__main__":
    # Launch internal local process server configuration bindings
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)