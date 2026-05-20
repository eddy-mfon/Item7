import os
import sys

def view_paid_orders():
    print("[*] --- ITEM 7 SUCCESSFUL ORDERS RETRIEVAL --- [*]\n")
    
    try:
        from database import supabase
    except Exception as e:
        print(f"[-] ERROR: Could not import Supabase client. Make sure virtual env is activated. ({e})")
        sys.exit(1)
        
    try:
        print("[*] Connecting to Supabase database...")
        response = supabase.table("orders").select("*").eq("status", "paid").order("created_at", desc=True).execute()
        
        orders = response.data
        if not orders:
            print("[+] Connection successful! No paid orders found in database yet.")
            return
            
        print(f"[+] Success! Found {len(orders)} paid orders:\n")
        print("=" * 80)
        
        for idx, order in enumerate(orders, 1):
            name = order.get("name", "N/A")
            matric = order.get("matricNumber", "N/A")
            phone = order.get("phone", "N/A")
            address = order.get("address", "N/A")
            room = order.get("roomNumber", "N/A")
            details = order.get("orderDetails", "N/A")
            amount = order.get("amountpaid", "0")
            tx_ref = order.get("tx_ref", "N/A")
            created_at = order.get("created_at", "N/A")
            
            print(f"Order #{idx} | Date: {created_at}")
            print(f"👤 Name:       {name} (Matric: {matric})")
            print(f"📞 Phone:      {phone}")
            print(f"📍 Location:   {address} (Room: {room})")
            print(f"🍱 Items:      {details}")
            print(f"💰 Paid:       NGN {amount}")
            print(f"🆔 Ref:        {tx_ref}")
            print("=" * 80)
            
    except Exception as e:
        print(f"[-] ERROR during database fetch: {e}")

if __name__ == "__main__":
    view_paid_orders()
