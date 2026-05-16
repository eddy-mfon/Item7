from fastapi import APIRouter, HTTPException, status
from schemas import OrderCreate
from database import supabase
from postgrest.exceptions import APIError

router = APIRouter(prefix="/orders", tags=["Orders Processing Pipeline"])

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_pending_order(order: OrderCreate):
    """
    Endpoint called by the Frontend UI to record an intent to buy.
    Saves the data securely in Supabase with a default status of 'pending'.
    """
    try:
        # Transform the incoming Pydantic object directly into a DB dictionary payload
        order_data = order.model_dump()
        
        # Insert raw record directly into Supabase. 'status' defaults to 'pending' on DB layer.
        response = supabase.table("orders").insert(order_data).execute()
        
        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, 
                detail="Failed to register pending order schema."
            )
            
        return {"status": "order_registered", "tx_ref": order.tx_ref}

    except APIError as db_err:
        # Catch duplicate key errors or schema validation errors gracefully
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Database Conflict encountered: {str(db_err.message)}"
        )