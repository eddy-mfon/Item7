import os
import sys
import urllib.request
import json

def diagnose():
    print("[*] --- TELEGRAM BOT DIAGNOSTIC UTILITY --- [*]\n")
    
    # 1. Try to load from pydantic settings first to see what the active server config sees
    try:
        from config import settings
        token = settings.TELEGRAM_BOT_TOKEN
        chat_id = settings.TELEGRAM_CHAT_ID
        print("[+] Successfully loaded credentials via Pydantic config.py Settings.")
    except Exception as e:
        print(f"[!] Could not load settings via config.py ({type(e).__name__}: {e})")
        print("[*] Falling back to direct os.environ lookup...")
        token = os.environ.get("TELEGRAM_BOT_TOKEN")
        chat_id = os.environ.get("TELEGRAM_CHAT_ID")
        
    # 2. Check if variables are set
    if not token:
        print("[-] ERROR: 'TELEGRAM_BOT_TOKEN' is not set in your environment variables!")
        sys.exit(1)
    if not chat_id:
        print("[-] ERROR: 'TELEGRAM_CHAT_ID' is not set in your environment variables!")
        sys.exit(1)
        
    print(f"[i] Raw Token Length: {len(token)} characters")
    print(f"[i] Chat ID: '{chat_id}'")
    
    # 3. Analyze token format
    has_issues = False
    
    # Check for quotes
    if token.startswith('"') or token.endswith('"') or token.startswith("'") or token.endswith("'"):
        print("[!] WARNING: Your token appears to contain surrounding quotes (e.g. \"token\" or 'token').")
        print("    This is a common issue when setting environment variables. Please remove quotes!")
        has_issues = True
        
    # Check for leading/trailing whitespaces
    if token.strip() != token:
        print("[!] WARNING: Your token contains leading or trailing whitespaces.")
        print("    Please ensure there are no spaces at the start or end of your environment variable.")
        has_issues = True
        
    # Check if user prefixed it with "bot"
    if token.lower().startswith("bot"):
        print("[!] WARNING: Your token starts with the word 'bot' (case-insensitive).")
        print("    The token from @BotFather should NOT include the 'bot' prefix when specified in your environment variables.")
        print("    Because the backend code constructs the URL using: f'https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/sendMessage'")
        print("    your URL is currently resolving to: https://api.telegram.org/botbot... (duplicated 'bot' prefix!).")
        print("    Please remove the 'bot' prefix from your environment variable.")
        has_issues = True

    # 4. Mask and print for confirmation
    masked_token = token
    if len(token) > 8:
        masked_token = f"{token[:4]}...{token[-4:]}"
    print(f"[i] Masked Token for verification: {masked_token}")
    
    # 5. Perform direct getMe test
    # Strip common problematic prefixes/wrapping for isolated testing suggestion
    clean_token = token.strip().replace('"', '').replace("'", "")
    if clean_token.lower().startswith("bot"):
        clean_token = clean_token[3:]
        
    url = f"https://api.telegram.org/bot{clean_token}/getMe"
    print(f"\n[*] Testing connection to Telegram API (getMe)...")
    print(f"[i] Querying: https://api.telegram.org/bot<masked_token>/getMe")
    
    try:
        req = urllib.request.Request(url, method="GET")
        with urllib.request.urlopen(req, timeout=5) as response:
            body = response.read().decode("utf-8")
            data = json.loads(body)
            if data.get("ok"):
                bot_info = data.get("result", {})
                print("\n[+] SUCCESS! Telegram Bot is fully authorized and functional!")
                print(f"[+] Bot Name: {bot_info.get('first_name')}")
                print(f"[+] Bot Username: @{bot_info.get('username')}")
                print("\n[*] What this means:")
                print("    If the diagnostic succeeded but your backend still fails, make sure you restart your backend server terminal")
                print("    to load the updated environment variables. Terminals do NOT automatically hot-reload system environment changes!")
            else:
                print(f"\n[-] FAILED: Telegram API rejected the clean token. Response: {body}")
    except urllib.error.HTTPError as e:
        status_code = e.code
        body = e.read().decode("utf-8")
        print(f"\n[-] HTTP ERROR {status_code} from Telegram:")
        print(f"    Body: {body}")
        
        # Analyze HTTP error details
        try:
            err_data = json.loads(body)
            desc = err_data.get("description", "")
            if status_code == 401:
                print("\n[i] EXPLANATION (401 Unauthorized):")
                print("    The token is rejected by Telegram. This means:")
                print("    1. You may have typed/copied it wrong.")
                print("    2. The bot might have been deleted or the token was revoked/regenerated in @BotFather.")
                print("    3. There might still be hidden characters in the token.")
        except Exception:
            pass
    except Exception as e:
        print(f"\n[-] CONNECTION ERROR: {e}")

if __name__ == "__main__":
    diagnose()
