from pydantic import BaseModel, Field
from typing import Optional

class OrderCreate(BaseModel):
    """
    Validates incoming data payload sent directly from the Frontend UI
    before any checkout session is initiated.
    """
    name: str = Field(..., min_length=1, description="Customer's legal name")
    phone: str = Field(..., description="Customer's phone number")
    username: Optional[str] = Field(None, description="Optional system username")
    location: str = Field(..., description="Delivery area or town")
    housenumber: str = Field(..., description="Specific apartment or house address")
    orderdetails: str = Field(..., description="Stringified summary of purchased items")
    amountpaid: float = Field(..., gt=0, description="The checkout price value")
    tx_ref: str = Field(..., description="Unique generated transaction reference string from the frontend")